import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

const source = fs.readFileSync(process.env.KREA2_TEST_SOURCE || new URL("../web/krea2_element_framing_v1.js", import.meta.url), "utf8").replaceAll("\r\n", "\n");
const plain = (value) => JSON.parse(JSON.stringify(value));
function extract(name) {
  const start = source.indexOf(`function ${name}(`);
  assert(start >= 0, name);
  return source.slice(start, source.indexOf("\n}", start) + 2);
}
function storage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), values };
}
const helpers = [
  "k2cfCreateWorkflowStorageId", "k2cfSetWorkflowStorageId", "k2cfWorkflowStorageId", "k2cfNodeStorageKey",
  "k2cfNodeFallbackStorageKey", "k2cfIsWorkflowLoading", "k2cfReadStorageJson", "k2cfReadSessionJson",
  "k2cfReadBrowserLocalJson", "k2cfPickLatestState", "k2cfHasEffectTextHeights", "k2cfLocalStateKeys",
  "k2cfReadLocalState", "k2cfWriteLocalState", "k2cfBestSavedState", "k2cfHasMeaningfulState",
  "k2cfReadJsonObject", "k2cfLooksLikePromptUiState",
  "k2cfNormalizeNodeSize", "k2cfSameNodeSize", "k2cfNodeSizeProp", "k2cfReadNodeSizeState",
  "k2cfSavedOrConfiguredNodeSize", "k2cfPreferredNodeSize", "k2cfGuardNodeAutoSize", "k2cfNodeAutoSizeGuarded",
  "k2cfLikelyManualNodeResize", "k2cfCommitNodeSizeState", "k2cfSaveNodeSize", "k2cfApplyNodeSize",
  "k2cfScheduleNodeSizeRestore", "k2cfInstallNodeSizePersistence", "k2cfInstallWorkflowLoadHook",
  "widget", "k2cfNormalizeEffectValues", "applyConfiguredValuesToWidgets", "k2cfWidgetValues", "k2cfPersistWidgetSnapshot",
  "k2cfIsEffectDefaultValue", "k2cfMergeEffectWithPrevious",
];
function harness(extra = {}) {
  const frames = [];
  const timers = [];
  const app = { graph: { extra: { k2cf_state_id: "workflow-A" }, _nodes: [] } };
  const context = vm.createContext({
    app, window: {}, localStorage: storage(), sessionStorage: storage(), console,
    requestAnimationFrame: (fn) => frames.push(fn), setTimeout: (fn) => timers.push(fn),
    setInterval() {}, clearInterval() {},
    CANVAS_NODE: "Canvas", PROMPT_NODE: "Prompt", DEFAULT_PRESET: "1024 x 1024", K2CF_CANVAS_DEFAULT_SIZE: [830, 980], K2CF_PROMPT_DEFAULT_SIZE: [540, 990],
    ...extra,
  });
  vm.runInContext(helpers.filter((name) => source.includes(`function ${name}(`)).map(extract).join("\n"), context);
  const flush = () => {
    for (let i = 0; frames.length || timers.length; i++) {
      assert(i < 100, "callbacks must settle");
      (frames.length ? frames.shift() : timers.shift())();
    }
  };
  return { context, frames, timers, flush };
}
function installConfigure(context, name) {
  context.nodeType = function () {};
  context.nodeData = { name };
  const start = source.indexOf("const oldConfigure = nodeType.prototype.onConfigure;");
  const end = source.indexOf("const oldCreated = nodeType.prototype.onNodeCreated;", start);
  vm.runInContext(source.slice(start, end), context);
  return new context.nodeType();
}
const effectValues = (preset) => ["input prompt", false, "Photo", preset, "Preset", "", ""];

test("embedded Effect and node size beat newer browser state", () => {
  const { context: c } = harness();
  const effect = { widgets_values: effectValues("Cinematic Photo"), text_heights: { preview: 100 }, saved_at: 10 };
  const size = { size: [540, 990], saved_at: 10 };
  const node = { id: 140, type: "Effect", graph: c.app.graph, properties: { k2cfEffectState: effect, k2cfPromptNodeSize: size } };
  for (const store of [c.localStorage, c.sessionStorage]) {
    store.setItem(c.k2cfNodeStorageKey(node, "effect"), JSON.stringify({ widgets_values: effectValues("Realistic Photo"), saved_at: 999 }));
    store.setItem(c.k2cfNodeStorageKey(node, "prompt_node_size"), JSON.stringify({ size: [400, 572], saved_at: 999 }));
  }
  assert.equal(c.k2cfBestSavedState(node, "effect"), effect);
  assert.equal(c.k2cfReadNodeSizeState(node, "prompt"), size);
});

test("type + node ID cache is ignored and unattached/default configuration cannot import old state", () => {
  const { context: c } = harness();
  const node = { id: 140, type: "Effect", graph: c.app.graph, properties: {} };
  const stale = { widgets_values: effectValues("Realistic Photo"), saved_at: 999 };
  c.localStorage.setItem("krea2_element_framing_v1_effect_Effect_140", JSON.stringify(stale));
  assert.equal(c.k2cfReadLocalState(node, "effect"), null);
  const scopedKey = c.k2cfNodeStorageKey(node, "effect");
  c.localStorage.setItem(scopedKey, JSON.stringify(stale));
  assert.deepEqual(plain(c.k2cfReadLocalState(node, "effect")), stale);
  node.__k2cfWorkflowConfigured = true;
  assert.equal(c.k2cfReadLocalState(node, "effect"), null);
  node.__k2cfWorkflowConfigured = false;
  node.graph = null;
  assert.equal(c.k2cfReadLocalState(node, "effect"), null);
  c.k2cfWriteLocalState(node, "effect", { saved_at: 1000 });
  assert.deepEqual(JSON.parse(c.localStorage.getItem(scopedKey)), stale);
});

test("async workflow load isolates storage until the new graph identity is available", async () => {
  const { context: c } = harness();
  const graph = c.app.graph;
  c.k2cfSetWorkflowStorageId(graph);
  let complete;
  c.app.loadGraphData = () => new Promise((resolve) => { complete = resolve; });
  c.k2cfInstallWorkflowLoadHook();
  const pending = c.app.loadGraphData();
  const node = { id: 140, graph, properties: {} };
  c.k2cfWriteLocalState(node, "effect", { saved_at: 1 });
  assert.equal(c.localStorage.values.size, 0);
  graph.extra = { k2cf_state_id: "workflow-B" };
  assert.equal(c.k2cfReadLocalState(node, "effect"), null);
  complete("loaded");
  assert.equal(await pending, "loaded");
  assert.equal(c.app.__k2cfWorkflowLoadDepth, 0);
  assert.equal(c.k2cfWorkflowStorageId(node), "workflow-B");
  graph.extra = {};
  assert.notEqual(c.k2cfWorkflowStorageId(node), "workflow-B");
});

test("nested synchronous loads preserve return values and failed loads release the storage guard", async () => {
  const { context: c } = harness();
  c.app.loadGraph = function () { this.graph.extra = { k2cf_state_id: "workflow-B" }; return 42; };
  c.app.loadGraphData = function () { return this.loadGraph(); };
  c.app.loadWorkflow = () => Promise.reject(new Error("invalid workflow"));
  c.k2cfInstallWorkflowLoadHook();
  assert.equal(c.app.loadGraphData(), 42);
  assert.equal(c.app.graph.__k2cfStateId, "workflow-B");
  await assert.rejects(c.app.loadWorkflow(), /invalid workflow/);
  assert.equal(c.app.__k2cfWorkflowLoadDepth, 0);
});

for (const cachedAt of [50, 999]) {
test(`configure discards a creation-time cached size (saved_at=${cachedAt}) and cancels old restore callbacks`, () => {
  const { context: c, flush } = harness();
  const node = installConfigure(c, "Prompt");
  Object.assign(node, { id: 77, graph: c.app.graph, size: [400, 572], pos: [100, 200], properties: {}, setSize(size) { this.size = size.slice(); } });
  c.app.graph._nodes.push(node);
  c.localStorage.setItem(c.k2cfNodeStorageKey(node, "prompt_node_size"), JSON.stringify({ size: [400, 572], saved_at: cachedAt }));
  c.k2cfInstallNodeSizePersistence(node, "prompt", [540, 990]);
  c.k2cfScheduleNodeSizeRestore(node, "prompt");
  node.size = [540, 990];
  node.properties = { k2cfPromptNodeSize: { size: [540, 990], saved_at: 100 } };
  node.onConfigure({ size: [540, 990], widgets_values: [], properties: plain(node.properties) });
  node.size = [400, 572]; // ComfyUI's post-configure automatic fit.
  flush();
  assert.deepEqual(plain(node.size), [540, 990]);
  assert.deepEqual(node.pos, [100, 200]);
  c.k2cfScheduleNodeSizeRestore(node, "prompt");
  c.app.canvas = { resizing_node: node };
  node.setSize([600, 1100]);
  flush();
  assert.deepEqual(plain(node.size), [600, 1100], "a later user resize must win");
});
}

test("legacy 11-value Effect state maps to the seven named inputs without shifting booleans or changing the source", () => {
  const { context: c } = harness();
  const names = ["prompt_in", "enable_effect", "category", "preset", "mode", "custom_preset", "style_boost"];
  const values = [true, "Photo", "35mm Film", "Preset", null, "", "", null, null, null, ""];
  const node = installConfigure(c, "Effect");
  node.inputs = [{ name: "prompt_in", link: 307 }];
  node.widgets = names.map((name) => ({ name, value: "" }));
  node.__k2cfApplyConfiguredValues = (saved) => c.applyConfiguredValuesToWidgets(node, names, saved);
  const expected = ["", true, "Photo", "35mm Film", "Preset", "", ""];
  c.applyConfiguredValuesToWidgets(node, names, values);
  assert.deepEqual(node.widgets.map((w) => w.value), expected);
  node.onConfigure({ widgets_values: values });
  assert.deepEqual(plain(node.__k2cfConfiguredWidgetValues), expected);
  assert.deepEqual(node.widgets.map((w) => w.value), expected);
  assert.deepEqual(values, [true, "Photo", "35mm Film", "Preset", null, "", "", null, null, null, ""]);
  const current = ["literal prompt", false, "Photo", "Cinematic Photo", "Custom", "custom text", "Anime"];
  c.applyConfiguredValuesToWidgets(node, names, current);
  assert.deepEqual(node.widgets.map((w) => w.value), current);
  assert.equal(node.inputs[0].link, 307);
});

class Element {
  constructor(tag) {
    this.tagName = tag; this.children = []; this.dataset = {}; this.value = "";
    this.style = { setProperty() {} };
    this.classList = { add() {}, remove() {}, toggle() {} };
  }
  append(...children) { this.children.push(...children); }
  appendChild(child) { this.append(child); return child; }
  addEventListener() {}
  setAttribute() {}
}

for (const backgroundOnly of [false, true]) {
  test(`${backgroundOnly ? "Background" : "Prompt"} Effect restores embedded-only values/heights before pending preset requests finish`, async () => {
    let ready;
    const presetsReady = new Promise((resolve) => { ready = resolve; });
    const elements = [];
    const names = ["prompt_in", "enable_effect", "category", "preset", "mode", "custom_preset", "style_boost"];
    const presets = [{ name: "Realistic Photo", category: "Photo", text: "photo" }, { name: "Cinematic Photo", category: "Photo", text: "cinematic" }, { name: "35mm Film", category: "Photo", text: "film" }, { name: "Classroom", category: "Background", text: "classroom" }];
    const { context: c } = harness({
      document: { createElement(tag) { const el = new Element(tag); elements.push(el); return el; } },
      EFFECT_WIDGETS: names, EFFECT_MAIN_CATEGORIES: ["All", "Photo", "Custom"], EFFECT_BACKGROUND_CATEGORIES: ["Background", "Custom"],
      EFFECT_PRESET_ALIASES: {}, EFFECT_STYLE_BOOST_TEXT: {}, EFFECT_THUMB_SIZE_KEY: "thumbSize", EFFECT_CUSTOM_PRESET_API: "/custom",
      k2fxExternalBackgroundPresets: [], k2fxEffectPresets: () => presets, k2fxThumbnailUrls: () => ["/thumb.png"],
      k2fxLoadBackgroundPresets: () => presetsReady, Image: class {}, stop() {}, hideWidget() {},
      k2cfAttachPyssssAutocomplete() {}, installNodePersistenceHooks() {}, option: () => new Element("option"),
      fetch: async () => ({ ok: true, json: async () => ({ presets: [] }) }),
    });
    vm.runInContext(extract("setupEffectNode"), c);
    const node = installConfigure(c, "Effect");
    Object.assign(node, { id: 140, graph: c.app.graph, properties: {}, widgets: names.map((name, i) => ({ name, value: effectValues("Realistic Photo")[i] })), addDOMWidget() {} });
    c.localStorage.setItem(c.k2cfNodeStorageKey(node, "effect"), JSON.stringify({ widgets_values: effectValues("Realistic Photo"), text_heights: { preview: 350, custom: 300 }, saved_at: 999 }));
    c.setupEffectNode(node, { backgroundOnly });
    const selected = backgroundOnly ? "Classroom" : "Cinematic Photo";
    const values = effectValues(selected);
    values[2] = backgroundOnly ? "Background" : "Photo";
    const info = { size: [540, 990], properties: { k2cfEffectState: { widgets_values: values, text_heights: { preview: 100 }, saved_at: 10 } } };
    node.properties = plain(info.properties);
    node.onConfigure(info);
    ready();
    await presetsReady;
    await Promise.resolve();
    assert.equal(node.widgets.find((w) => w.name === "preset").value, selected);
    assert.equal(node.widgets.find((w) => w.name === "enable_effect").value, false);
    assert.deepEqual(plain(node.properties.k2cfEffectState.text_heights), { preview: 100 });
    assert.equal(elements.find((el) => el.className === "k2fx-preview").style.height, "100px");
    assert.equal(elements.find((el) => el.className === "k2fx-custom").style.height, "");
    if (!backgroundOnly) {
      node.properties = {};
      node.onConfigure({ widgets_values: [true, "Photo", "35mm Film", "Preset", null, "", "", null, null, null, ""] });
      await Promise.resolve();
      assert.deepEqual(plain(node.properties.k2cfEffectState.widgets_values), ["", true, "Photo", "35mm Film", "Preset", "", ""]);
      assert.deepEqual(plain(node.properties.k2cfEffectState.text_heights), {});
    }
  });
}

test("Prompt UI chooses workflow state before browser cache on creation and hydration", () => {
  const workflow = { saved_at: 10, scenePreset: "workflow", textHeights: { red_prompt: 100 } };
  const cached = { saved_at: 999, scenePreset: "old browser", textHeights: { red_prompt: 350 } };
  const { context: c } = harness({
    node: { properties: { k2cfPromptUiState: workflow } }, widgets: {},
    k2cfReadJsonObject: () => null, k2cfPromptUiHasMeaningfulState: (state) => Boolean(state),
    mergePromptUiState: (state) => { c.merged = state; },
  });
  c.k2cfReadLocalState = () => cached;
  const start = source.indexOf("  const promptUiWidgetState =");
  const end = source.indexOf("  const promptUiState = defaultPromptUiState();", start);
  vm.runInContext(`${source.slice(start, end)}\nglobalThis.selected = storedPromptUiState;`, c);
  assert.equal(c.selected, workflow);
  const refresh = source.indexOf("  function refreshPromptUiState() {");
  const refreshEnd = source.indexOf("  function readPresetList(", refresh);
  vm.runInContext(source.slice(refresh, refreshEnd), c);
  c.refreshPromptUiState();
  assert.equal(c.merged, workflow);
});
