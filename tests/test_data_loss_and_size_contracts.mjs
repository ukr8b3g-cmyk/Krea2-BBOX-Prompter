import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

const source = fs.readFileSync(process.env.KREA2_TEST_SOURCE || new URL("../web/krea2_element_framing_v1.js", import.meta.url), "utf8");
const plain = (value) => JSON.parse(JSON.stringify(value));

function harness() {
  const frames = [];
  const storage = () => { const data = new Map(); return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }; };
  class Element {
    constructor(tag = "DIV") {
      this.tagName = tag.toUpperCase(); this.children = []; this.dataset = {}; this.value = "";
      this.style = { setProperty() {}, removeProperty() {} }; this.listeners = new Map();
      this.classList = { add() {}, remove() {}, toggle() {}, contains() { return false; } };
      this.clientWidth = 500; this.clientHeight = 500; this.isConnected = true;
    }
    append(...items) { for (const item of items) { item.parentElement = this; this.children.push(item); } }
    appendChild(item) { this.append(item); return item; }
    prepend(...items) { for (const item of items) item.parentElement = this; this.children.unshift(...items); }
    set innerHTML(value) { this.children = []; }
    get options() { return this.children; }
    addEventListener(name, fn) { if (!this.listeners.has(name)) this.listeners.set(name, new Set()); this.listeners.get(name).add(fn); }
    removeEventListener(name, fn) { this.listeners.get(name)?.delete(fn); }
    emit(name, data = {}) {
      const ev = { target: this, button: 0, preventDefault() { this.defaultPrevented = true; }, stopPropagation() {}, ...data };
      for (const fn of [...(this.listeners.get(name) || [])]) fn(ev);
      return ev;
    }
    contains(target) { return target === this || this.children.some((child) => child.contains(target)); }
    focus() { document.activeElement = this; }
    blur() { if (document.activeElement === this) document.activeElement = null; }
    setAttribute() {}
    querySelectorAll(selector) { return this.children.flatMap((child) => [...(selector === "textarea" && child.tagName === "TEXTAREA" ? [child] : []), ...child.querySelectorAll(selector)]); }
    querySelector() { return null; }
    getBoundingClientRect() { return { left: 0, top: 0, right: 500, bottom: 500, width: 500, height: 500 }; }
    getContext() { return new Proxy({}, { get: (_, key) => key === "measureText" ? () => ({ width: 10 }) : () => ({ addColorStop() {} }) }); }
    setPointerCapture() {}
  }
  const document = new Element(); document.head = new Element(); document.body = new Element();
  document.createElement = (tag) => new Element(tag); document.getElementById = () => null;
  document.createTextNode = (text) => { const el = new Element("text"); el.textContent = text; return el; };
  const app = { graph: { extra: { k2cf_state_id: "test" }, _nodes: [], setDirtyCanvas() {} }, registerExtension() {} };
  const window = new Element(); window.comfyAPI = { app: { app } };
  const context = vm.createContext({ document, window, console, localStorage: storage(), sessionStorage: storage(),
    requestAnimationFrame: (fn) => { frames.push(fn); return frames.length; }, cancelAnimationFrame() {}, setTimeout() {}, clearTimeout() {}, setInterval() {}, clearInterval() {},
    getComputedStyle: () => ({ height: "125px", width: "500px", getPropertyValue: () => "" }),
    fetch: async () => ({ ok: true, json: async () => ({ presets: [] }) }), Image: class {},
  });
  vm.runInContext(source, context);
  vm.runInContext("k2cfAttachPyssssAutocomplete = () => {};", context);
  function node(kind, values = {}) {
    context.namesKind = kind;
    const names = vm.runInContext(kind === "canvas" ? "CANVAS_WIDGETS" : "PROMPT_WIDGETS", context);
    const n = { id: app.graph._nodes.length + 1, graph: app.graph, properties: {}, size: [830, 990], pos: [0, 0],
      widgets: names.map((name) => ({ name, value: values[name] ?? "", options: {} })),
      setSize(size) { this.size = size; }, addDOMWidget(name, type, element) { this.ui = element; return {}; } };
    n.__k2cfConfiguredWidgetValues = n.widgets.map((w) => w.value);
    n.__k2cfWorkflowConfigured = true;
    app.graph._nodes.push(n);
    context.testNode = n;
    vm.runInContext(kind === "canvas" ? "setupCanvasNode(testNode)" : "setupPromptNode(testNode)", context);
    return n;
  }
  const walk = (el) => [el, ...el.children.flatMap(walk)];
  const widget = (n, name) => n.widgets.find((w) => w.name === name);
  const canvas = (extra = {}) => node("canvas", { width: 1024, height: 1024, preset: "Custom", layout_data: JSON.stringify({ boxes: [] }), ...extra });
  return { node, canvas, app, document, Element, walk, widget, context, frames };
}

test("background stays visible and survives edits, serialization values and rehydration", () => {
  const h = harness();
  const n = h.node("prompt", { scene: "scene", background: "saved background" });
  const texts = h.walk(n.ui).filter((el) => el.tagName === "TEXTAREA");
  const background = texts.find((el) => el.value === "saved background");
  assert(background, "background textarea must be attached to the node DOM");
  const scene = texts.find((el) => el.value === "scene");
  scene.value = "new scene"; scene.emit("input");
  assert.equal(h.widget(n, "background").value, "saved background");
  background.value = "edited background"; background.emit("input");
  for (const el of texts.filter((el) => el !== background)) { el.value = "slot or scene edit"; el.emit("input"); }
  assert.equal(h.widget(n, "background").value, "edited background");
  const values = Object.fromEntries(n.widgets.map((w) => [w.name, w.value]));
  const reloaded = h.node("prompt", plain(values));
  assert(h.walk(reloaded.ui).some((el) => el.tagName === "TEXTAREA" && el.value === "edited background"));
  reloaded.__k2cfHydrateFromWidgets();
  assert.equal(h.widget(reloaded, "background").value, "edited background");
});

test("Delete is restricted to the focused Canvas and removed nodes release listeners", () => {
  const h = harness();
  const box = { id: "a", slot: "red", x1: 256, y1: 256, x2: 768, y2: 768 };
  const a = h.canvas({ layout_data: JSON.stringify({ boxes: [box] }) });
  const b = h.canvas({ layout_data: JSON.stringify({ boxes: [box] }) });
  const overlay = (n) => h.walk(n.ui).find((el) => el.className === "k2cf-overlay");
  const oa = overlay(a), ob = overlay(b);
  for (const el of [oa, ob]) el.emit("pointerdown", { clientX: 250, clientY: 250, pointerId: 1 });
  ob.emit("pointerup");
  oa.emit("keydown", { key: "Delete" });
  assert.equal(JSON.parse(h.widget(a, "layout_data").value).boxes.length, 1);
  ob.emit("keydown", { key: "Delete" });
  h.document.emit("keydown", { key: "Delete", target: ob });
  assert.equal(JSON.parse(h.widget(b, "layout_data").value).boxes.length, 0);
  assert.equal(JSON.parse(h.widget(a, "layout_data").value).boxes.length, 1);
  oa.focus();
  const input = new h.Element("input");
  oa.emit("keydown", { key: "Backspace", target: input });
  assert.equal(JSON.parse(h.widget(a, "layout_data").value).boxes.length, 1);
  h.document.emit("pointerdown", { target: input });
  assert.equal(h.document.activeElement, null);
  oa.emit("keydown", { key: "Delete" });
  assert.equal(JSON.parse(h.widget(a, "layout_data").value).boxes.length, 1);
  oa.focus(); h.app.graph = { _nodes: [] };
  oa.emit("keydown", { key: "Delete" });
  assert.equal(JSON.parse(h.widget(a, "layout_data").value).boxes.length, 1);
  a.onRemoved(); b.onRemoved();
  assert.equal(h.document.listeners.get("pointerdown").size, 0);
  assert.equal(oa.listeners.get("keydown").size, 0);
  assert.equal(ob.listeners.get("keydown").size, 0);
});

test("Save Custom sends Custom and dimensions while preserving the User selection after reload", () => {
  const h = harness(), n = h.canvas({ width: 800, height: 1200 });
  const elements = h.walk(n.ui);
  const save = elements.find((el) => el.textContent === "Save Custom");
  save.emit("click");
  assert.equal(h.widget(n, "preset").value, "Custom");
  assert.equal(JSON.parse(h.widget(n, "layout_data").value).sizePreset, "User:800x1200");
  const saved = Object.fromEntries(n.widgets.map((w) => [w.name, w.value]));
  const loaded = h.canvas(saved);
  const preset = h.walk(loaded.ui).find((el) => el.title === "Choose the latent canvas size preset.");
  assert.equal(preset.value, "User:800x1200");
  assert.equal(h.widget(loaded, "preset").value, "Custom");
  preset.emit("change");
  assert.equal(h.widget(loaded, "preset").value, "Custom");
  assert.equal(h.widget(loaded, "width").value, 800);
  assert.equal(h.widget(loaded, "height").value, 1200);
});

test("legacy User widget values migrate without mutating the supplied workflow", () => {
  const h = harness();
  const old = { width: 800, height: 1200, preset: "User:800x1200", layout_data: JSON.stringify({ boxes: [] }) };
  const n = h.canvas(old);
  assert.equal(h.widget(n, "preset").value, "Custom");
  assert.equal(h.walk(n.ui).find((el) => el.title === "Choose the latent canvas size preset.").value, "User:800x1200");
  assert.equal(old.preset, "User:800x1200");
  const data = { properties: plain(n.properties) };
  n.onSerialize(data);
  assert.equal(data.widgets_values[2], "Custom");
});

for (const predictable of [false, true]) {
  test(`linked size preview records its coordinate space (predictable=${predictable})`, () => {
    const h = harness();
    const box = { id: "a", slot: "red", bbox: [256, 256, 768, 768], x1: 256, y1: 256, x2: 768, y2: 768, nx1: .25, ny1: .25, nx2: .75, ny2: .75 };
    const n = h.canvas({ layout_data: JSON.stringify({ width: 1024, height: 1024, boxes: [box] }) });
    n.inputs = [{ name: "width_override", link: 1 }];
    h.app.graph.links = { 1: { origin_id: 99, origin_slot: 0 } };
    h.app.graph.getNodeById = () => ({ outputs: [{ name: "width" }], widgets: predictable ? [{ name: "width", value: 2048 }] : [] });
    n.onConnectionsChange();
    let count = 0;
    while (h.frames.length) { assert(++count < 100); h.frames.shift()(); }
    const layout = JSON.parse(h.widget(n, "layout_data").value);
    assert.equal(layout.width, predictable ? 2048 : 1024);
    assert.equal(layout.height, 1024);
    assert.deepEqual(layout.boxes[0].bbox, predictable ? [512, 256, 1536, 768] : [256, 256, 768, 768]);
    assert.equal(layout.boxes[0].nx1, .25);
    assert.equal(h.widget(n, "width").value, 1024, "connected preview must not overwrite the local width");
  });
}
