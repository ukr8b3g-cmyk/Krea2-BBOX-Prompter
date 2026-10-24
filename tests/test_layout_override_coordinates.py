import copy
import json
import unittest

from nodes_element_framing import Krea2ElementFramingV1Canvas, Krea2ElementJSONExportV1


class LayoutOverrideCoordinatesTests(unittest.TestCase):
    def setUp(self):
        self.canvas = Krea2ElementFramingV1Canvas()
        self.export = Krea2ElementJSONExportV1()
        self.prompt = json.dumps({'scene': 'scene', 'background': 'saved background', 'slots': {'red': {'type': 'obj', 'prompt': 'subject'}}})

    def execute(self, layout, width=1024, height=1024, **override):
        framing = self.canvas.execute(width, height, 'Custom', json.dumps(layout), '{}', 'Thirds', **override)[0]
        return json.loads(framing)

    def test_normalized_and_legacy_boxes_keep_relative_position_for_all_overrides(self):
        for normalized in (False, True):
            for explicit_size in (False, True):
                for w, h in ((1024, 1024), (2048, 1024), (1024, 512), (512, 256)):
                    with self.subTest(normalized=normalized, explicit_size=explicit_size, size=(w, h)):
                        box = {'slot': 'red', 'bbox': [256, 256, 768, 768]}
                        if normalized:
                            box.update(nx1=.25, ny1=.25, nx2=.75, ny2=.75)
                        layout = {'boxes': [box]}
                        if explicit_size:
                            layout.update(width=1024, height=1024)
                        original = copy.deepcopy(layout)
                        data = self.execute(layout, width_override=w, height_override=h)
                        for mode, expected in [('normalized_1000', [250, 250, 750, 750]), ('pixel', [w // 4, h // 4, w * 3 // 4, h * 3 // 4])]:
                            output, ow, oh = self.export.execute(json.dumps(data), self.prompt, bbox_mode=mode)
                            output = json.loads(output)
                            self.assertEqual((ow, oh), (w, h))
                            self.assertEqual(output['compositional_deconstruction']['elements'][0]['bbox'], expected)
                            self.assertIn('center area', output['compositional_deconstruction']['elements'][0]['desc'])
                            self.assertEqual(output['compositional_deconstruction']['background'], 'saved background')
                        self.assertEqual(layout, original)

    def test_frontend_remapped_coordinates_are_not_scaled_twice(self):
        for normalized in (False, True):
            box = {'slot': 'red', 'bbox': [512, 256, 1536, 768]}
            if normalized:
                box.update(nx1=.25, ny1=.25, nx2=.75, ny2=.75)
            data = self.execute({'width': 2048, 'height': 1024, 'boxes': [box]}, width_override=2048)
            self.assertEqual(data['layout']['boxes'][0]['bbox'], [512, 256, 1536, 768])
            repeated = self.execute(data['layout'], width_override=2048)
            self.assertEqual(repeated['layout'], data['layout'])

    def test_repeated_api_overrides_use_the_last_layout_coordinate_space(self):
        first = self.execute({'boxes': [{'slot': 'red', 'bbox': [256, 256, 768, 768]}]}, width_override=2048)
        second = self.execute(first['layout'], width_override=512, height_override=2048)
        self.assertEqual(second['layout']['boxes'][0]['bbox'], [128, 512, 384, 1536])

    def test_invalid_partial_normalized_data_falls_back_to_legacy_pixels(self):
        for value in (None, '', float('nan'), float('inf'), True):
            box = {'slot': 'red', 'bbox': [256, 256, 768, 768], 'nx1': value, 'ny1': .25, 'nx2': .75, 'ny2': .75}
            data = self.execute({'boxes': [box]}, width_override=2048)
            self.assertEqual(data['layout']['boxes'][0]['bbox'], [512, 256, 1536, 768])


if __name__ == '__main__':
    unittest.main()
