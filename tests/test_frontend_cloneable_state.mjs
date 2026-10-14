import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

const source = fs.readFileSync(process.env.KREA2_TEST_SOURCE || new URL("../web/krea2_element_framing_v1.js", import.meta.url), "utf8").replaceAll("\r\n", "\n");
const clone = (value) => JSON.parse(JSON.stringify(value));

function extract(name) {
  const start = source.indexOf(`function ${name}(`);
  assert(start >= 0, name);
  const end = source.indexOf("\n}", start);
  assert(end >= 0, name);
  return source.slice(start, end + 2);
}

test("canvas restores boxes before queued linked-size preview writes", () => {
  const boxes = [{ slot: "red", bbox: [28, 41, 612, 981] }];
  const layout = JSON.stringify({ boxes });
  const info = { widgets_values: [1024, 1344, "1024 x 1024", layout], properties: { k2cfCanvasState: { widgets_values: [1024, 1344, "1024 x 1024", layout], saved_at: 1 } } };
  const nodeType = function () {};
  const frames = [];
  const context = vm.createContext({
    nodeType, nodeData: { name: "Canvas" }, CANVAS_NODE: "Canvas",
    requestAnimationFrame: (callback) => frames.push(callback),
    k2cfHasMeaningfulState: (values) => Array.isArray(values) && values.length > 0,
  });
  vm.runInContext(extract("k2cfNormalizeNodeSize"), context);
  const start = source.indexOf("const oldConfigure = nodeType.prototype.onConfigure;");
  const end = source.indexOf("const oldCreated = nodeType.prototype.onNodeCreated;", start);
  assert(start >= 0 && end > start);
  vm.runInContext(source.slice(start, end), context);
  const node = new nodeType();
  node.properties = clone(info.properties);
  let visibleBoxes = [];
  node.__k2cfApplyConfiguredValues = () => {};
  node.__k2cfHydrateFromWidgets = () => {
    visibleBoxes = JSON.parse(node.properties.k2cfCanvasState.widgets_values[3]).boxes;
  };
  // Connection preview work is queued when LiteGraph reconnects the node.
  frames.push(() => {
    node.properties.k2cfCanvasState = { widgets_values: [1024, 1344, "1024 x 1024", JSON.stringify({ boxes: visibleBoxes })], saved_at: 2 };
  });
  node.onConfigure(info);
  while (frames.length) frames.shift()();
  assert.deepEqual(JSON.parse(node.properties.k2cfCanvasState.widgets_values[3]).boxes, boxes);
});

const functions = ["widget", "k2cfWidgetValues", "k2cfNormalizeNodeSize", "k2cfIsLegacyRedTestResidue", "k2cfSanitizePromptValues", "installNodePersistenceHooks"];

for (const kind of ["Canvas", "Prompt", "Effect"]) {
  test(`${kind}: serialized state stays cloneable with reactive properties`, () => {
    const prop = `k2cf${kind}State`;
    const values = ["a girl", '{"boxes":[{"slot":"red","bbox":[28,41,612,981]}]}'];
    const state = { version: kind === "Effect" ? "v16" : "v27", widgets_values: values.slice(), saved_at: 123 };
    if (kind === "Effect") state.text_heights = {};
    const node = {
      size: [830, 980],
      properties: { [prop]: new Proxy(state, {}), otherExtension: new Proxy({ nested: ["keep"] }, {}) },
      widgets: values.map((value, i) => ({ name: `value_${i}`, value })),
      __k2cfAllowDefaultOverwrite: true,
      onSerialize(data) { data.properties.previousHook = { keep: true }; },
    };
    assert.throws(() => structuredClone(node.properties), { name: "DataCloneError" });
    const before = clone(node.properties);
    const data = { properties: clone(node.properties), size: node.size.slice() };
    const originalProperties = data.properties;
    const context = vm.createContext({
      app: {}, window: {},
      k2cfBestSavedState: (savedNode) => savedNode.properties[prop],
      k2cfWriteLocalState() {},
    });
    const persistenceFunctions = source.includes("function k2cfStoreWidgetState(")
      ? ["k2cfStoreWidgetState", ...functions] : functions;
    vm.runInContext(persistenceFunctions.map(extract).join("\n"), context);
    context.installNodePersistenceHooks(node, null, ["value_0", "value_1"], `k2cf${kind}`);
    node.onSerialize(data);

    assert.doesNotThrow(() => structuredClone(data));
    assert.equal(data.properties, originalProperties);
    assert.deepEqual(clone(data.widgets_values), values);
    assert.deepEqual(clone(data.size), [830, 980]);
    assert.deepEqual(clone(data.properties[prop]), before[prop]);
    assert.deepEqual(clone(data.properties.otherExtension), before.otherExtension);
    assert.deepEqual(clone(data.properties.previousHook), { keep: true });
    assert.deepEqual(clone(node.properties), before);

    node.properties[prop].widgets_values[0] = "changed after serialization";
    node.properties.otherExtension.nested.push("live change");
    assert.deepEqual(clone(data.properties[prop]), before[prop]);
    assert.deepEqual(clone(data.properties.otherExtension), before.otherExtension);
  });
}
