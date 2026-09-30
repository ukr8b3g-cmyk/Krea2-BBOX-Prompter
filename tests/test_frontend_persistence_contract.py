import unittest
from pathlib import Path


class FrontendPersistenceContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source = (
            Path(__file__).resolve().parents[1]
            / "web"
            / "krea2_element_framing_v1.js"
        ).read_text(encoding="utf-8")
        start = cls.source.index("function installNodePersistenceHooks")
        end = cls.source.index("function k2cfSnapshotAllPromptUi", start)
        cls.hook = cls.source[start:end]

    def test_on_serialize_is_read_only(self):
        on_serialize = self.hook[self.hook.index("const oldOnSerialize") :]
        self.assertIn("applyCurrentStateToSerializedData(data)", on_serialize)
        self.assertNotIn("snapshot()", on_serialize)
        self.assertNotIn("saved_at: Date.now()", on_serialize)

    def test_node_serialize_is_not_double_wrapped(self):
        self.assertNotIn("node.serialize = function", self.hook)
        self.assertNotIn("applySnapshotToSerializedData", self.hook)


if __name__ == "__main__":
    unittest.main()
