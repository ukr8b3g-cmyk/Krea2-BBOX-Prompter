import json
import unittest
from pathlib import Path

from nodes_element_framing import Krea2ElementFramingV1Canvas, _resolve_size


class CanvasSizeOverrideTests(unittest.TestCase):
    def setUp(self):
        self.canvas = Krea2ElementFramingV1Canvas()

    def execute(self, preset, width=640, height=480, **overrides):
        result = self.canvas.execute(
            width,
            height,
            preset,
            '{"boxes":[]}',
            '{}',
            'Thirds',
            **overrides,
        )[0]
        return json.loads(result)

    def test_existing_preset_behavior_is_unchanged(self):
        self.assertEqual(_resolve_size('1024 x 1344', 640, 480), (1024, 1344))

    def test_custom_size_uses_widget_values(self):
        self.assertEqual(_resolve_size('Custom', 768, 1152), (768, 1152))

    def test_both_overrides_replace_preset_dimensions(self):
        self.assertEqual(
            _resolve_size('1024 x 1024', 640, 480, 768, 1344),
            (768, 1344),
        )

    def test_width_only_override_keeps_preset_height(self):
        self.assertEqual(
            _resolve_size('1024 x 1344', 640, 480, width_override=2048),
            (2048, 1344),
        )

    def test_height_only_override_keeps_preset_width(self):
        self.assertEqual(
            _resolve_size('1344 x 1024', 640, 480, height_override=1536),
            (1344, 1536),
        )

    def test_framing_data_contains_resolved_dimensions(self):
        data = self.execute(
            '1024 x 1024',
            width_override=768,
            height_override=1344,
        )
        self.assertEqual((data['width'], data['height']), (768, 1344))

    def test_legacy_workflow_contract_remains_compatible(self):
        input_types = self.canvas.INPUT_TYPES()
        self.assertEqual(
            list(input_types['required']),
            [
                'width',
                'height',
                'preset',
                'layout_data',
                'camera_data',
                'grid_mode',
                'ui_language',
                'camera_set_data',
                'canvas_preset_data',
            ],
        )
        self.assertEqual(
            list(input_types['optional']),
            ['width_override', 'height_override'],
        )
        data = self.execute('1024 x 1024')
        self.assertEqual((data['width'], data['height']), (1024, 1024))

    def test_saved_workflow_keeps_legacy_widget_layout(self):
        workflow_path = (
            Path(__file__).resolve().parents[1]
            / 'workflow'
            / 'Krea2-BBOX-Node-Test.json'
        )
        workflow = json.loads(workflow_path.read_text(encoding='utf-8'))
        canvas_nodes = [
            node
            for node in workflow['nodes']
            if node.get('type') == 'Krea2ElementFramingV1Canvas'
        ]
        self.assertTrue(canvas_nodes)
        for node in canvas_nodes:
            self.assertEqual(len(node.get('widgets_values', [])), 9)
            self.assertEqual(node.get('inputs', []), [])


if __name__ == '__main__':
    unittest.main()
