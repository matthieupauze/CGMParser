meta:
  id: cgm
  title: CGM (Computer Graphics Metafile) file
  file-extension:
    - cgm
  xref:
    iso: 8632-3:1999
    justsolve:
      - CGM
  license: MIT
  ks-version: 0.9
  endian: be
doc: |
  Nothing here for now
seq:
  - id: chunks
    type: chunk
    repeat: until
    repeat-until: _io.eof

instances:
  name_precision:
    value: 16
  vdc_width:
    value: "vdc::integer"
  integer_precision:
    value: 16
  vdc_integer_precision:
    value: 16
  colour_index_precision:
    value: 16
  direct_colour_precision:
    value: 8

types:
  chunk:
    seq:
      - id: cmd
        type: command
      - id: body
        size: cmd.len
        type:
          switch-on: cmd.type
          cases:
            "chunk_type::no_op": no_op
            "chunk_type::begin_metafile": begin_metafile
            "chunk_type::end_metafile": end_metafile
            "chunk_type::begin_picture": begin_picture
            "chunk_type::begin_picture_body": begin_picture_body
            "chunk_type::end_picture": end_picture
            "chunk_type::begin_segment": begin_segment
            "chunk_type::end_segment": end_segment
            "chunk_type::begin_figure": begin_figure
            "chunk_type::end_figure": end_figure
            "chunk_type::begin_protection_region": begin_protection_region
            "chunk_type::end_protection_region": end_protection_region
            "chunk_type::begin_compound_line": begin_compound_line
            "chunk_type::end_compound_line": end_compound_line
            "chunk_type::begin_compound_text_path": begin_compound_text_path
            "chunk_type::end_compound_text_path": end_compound_text_path
            "chunk_type::begin_tile_array": begin_tile_array
            "chunk_type::end_tile_array": end_tile_array
            "chunk_type::begin_application_structure": begin_application_structure
            "chunk_type::begin_application_structure_body": begin_application_structure_body
            "chunk_type::end_application_structure": end_application_structure
            "chunk_type::metafile_version": metafile_version
            "chunk_type::metafile_description": metafile_description
            "chunk_type::vdc_type": vdc_type
            "chunk_type::integer_precision": integer_precision
            "chunk_type::real_precision": real_precision
            "chunk_type::index_precision": index_precision
            "chunk_type::colour_precision": colour_precision
            "chunk_type::color_index_precision": color_index_precision
            "chunk_type::max_color_index": max_color_index
            "chunk_type::color_value_extent": color_value_extent
            "chunk_type::metafile_element_list": metafile_element_list
            "chunk_type::metafile_defaults_replacement": metafile_defaults_replacement
            "chunk_type::font_list": font_list
            "chunk_type::character_set_list": character_set_list
            "chunk_type::character_coding_announcer": character_coding_announcer
            "chunk_type::name_precision": name_precision
            "chunk_type::maximum_vdc_extent": maximum_vdc_extent
            "chunk_type::segment_priority_extent": segment_priority_extent
            "chunk_type::color_model": color_model
            "chunk_type::color_calibration": color_calibration
            "chunk_type::font_properties": font_properties
            "chunk_type::glyph_mapping": glyph_mapping
            "chunk_type::symbol_library_list": symbol_library_list
            "chunk_type::picture_directory": picture_directory
            "chunk_type::scaling_mode": scaling_mode
            "chunk_type::color_selection_mode": color_selection_mode
            "chunk_type::line_width_spec_mode": line_width_spec_mode
            "chunk_type::marker_size_spec_mode": marker_size_spec_mode
            "chunk_type::edge_width_spec_mode": edge_width_spec_mode
            "chunk_type::vdc_extent": vdc_extent
            "chunk_type::background_color": background_color
            "chunk_type::device_viewport": device_viewport
            "chunk_type::device_viewport_spec_mode": device_viewport_spec_mode
            "chunk_type::device_viewport_mapping": device_viewport_mapping
            "chunk_type::line_representation": line_representation
            "chunk_type::marker_representation": marker_representation
            "chunk_type::text_representation": text_representation
            "chunk_type::fill_representation": fill_representation
            "chunk_type::edge_representation": edge_representation
            "chunk_type::interior_style_spec_mode": interior_style_spec_mode
            "chunk_type::line_and_edge_type_definition": line_and_edge_type_definition
            "chunk_type::hatch_style_definition": hatch_style_definition
            "chunk_type::geometric_pattern_definition": geometric_pattern_definition
            "chunk_type::application_structure_directory": application_structure_directory
            "chunk_type::vdc_integer_precision": vdc_integer_precision
            "chunk_type::vdc_real_precision": vdc_real_precision
            "chunk_type::auxiliary_color": auxiliary_color
            "chunk_type::transparency": transparency
            "chunk_type::clip_rectangle": clip_rectangle
            "chunk_type::clip_indicator": clip_indicator
            "chunk_type::line_clipping_mode": line_clipping_mode
            "chunk_type::marker_clipping_mode": marker_clipping_mode
            "chunk_type::edge_clipping_mode": edge_clipping_mode
            "chunk_type::new_region": new_region
            "chunk_type::save_primitive_context": save_primitive_context
            "chunk_type::restore_primitive_context": restore_primitive_context
            "chunk_type::protection_region_indicator": protection_region_indicator
            "chunk_type::generalized_text_path_mode": generalized_text_path_mode
            "chunk_type::mitre_limit": mitre_limit
            "chunk_type::transparent_cell_color": transparent_cell_color
            "chunk_type::polyline": polyline
            "chunk_type::disjoint_polyline": disjoint_polyline
            "chunk_type::polymarker": polymarker
            "chunk_type::text": text
            "chunk_type::restricted_text": restricted_text
            "chunk_type::append_text": append_text
            "chunk_type::polygon": polygon
            "chunk_type::polygon_set": polygon_set
            "chunk_type::cell_array": cell_array
            "chunk_type::generalized_drawing_primitive": generalized_drawing_primitive
            "chunk_type::rectangle": rectangle
            "chunk_type::circle": circle
            "chunk_type::circular_arc3_point": circular_arc3_point
            "chunk_type::circular_arc3_point_close": circular_arc3_point_close
            "chunk_type::circular_arc_center": circular_arc_center
            "chunk_type::circular_arc_center_close": circular_arc_center_close
            "chunk_type::ellipse": ellipse
            "chunk_type::elliptical_arc": elliptical_arc
            "chunk_type::elliptical_arc_close": elliptical_arc_close
            "chunk_type::circular_arc_center_reversed": circular_arc_center_reversed
            "chunk_type::connecting_edge": connecting_edge
            "chunk_type::hyperbolic_arc": hyperbolic_arc
            "chunk_type::parabolic_arc": parabolic_arc
            "chunk_type::non_uniform_b_spline": non_uniform_b_spline
            "chunk_type::non_uniform_rational_b_spline": non_uniform_rational_b_spline
            "chunk_type::poly_bezier": poly_bezier
            "chunk_type::poly_symbol": poly_symbol
            "chunk_type::bitonal_tile": bitonal_tile
            "chunk_type::tile": tile
            "chunk_type::line_bundle_index": line_bundle_index
            "chunk_type::line_type": line_type
            "chunk_type::line_width": line_width
            "chunk_type::line_color": line_color
            "chunk_type::marker_bundle_index": marker_bundle_index
            "chunk_type::marker_type": marker_type
            "chunk_type::marker_size": marker_size
            "chunk_type::marker_color": marker_color
            "chunk_type::text_bundle_index": text_bundle_index
            "chunk_type::text_font_index": text_font_index
            "chunk_type::text_precision": text_precision
            "chunk_type::character_expansion_factor": character_expansion_factor
            "chunk_type::character_spacing": character_spacing
            "chunk_type::text_color": text_color
            "chunk_type::character_height": character_height
            "chunk_type::character_orientation": character_orientation
            "chunk_type::text_path": text_path
            "chunk_type::text_alignment": text_alignment
            "chunk_type::character_set_index": character_set_index
            "chunk_type::alternate_character_set_index": alternate_character_set_index
            "chunk_type::fill_bundle_index": fill_bundle_index
            "chunk_type::interior_style": interior_style
            "chunk_type::fill_color": fill_color
            "chunk_type::hatch_index": hatch_index
            "chunk_type::pattern_index": pattern_index
            "chunk_type::edge_bundle_index": edge_bundle_index
            "chunk_type::edge_type": edge_type
            "chunk_type::edge_width": edge_width
            "chunk_type::edge_color": edge_color
            "chunk_type::edge_visibility": edge_visibility
            "chunk_type::fill_reference_point": fill_reference_point
            "chunk_type::pattern_table": pattern_table
            "chunk_type::pattern_size": pattern_size
            "chunk_type::color_table": color_table
            "chunk_type::aspect_source_flags": aspect_source_flags
            "chunk_type::pick_identifier": pick_identifier
            "chunk_type::line_cap": line_cap
            "chunk_type::line_join": line_join
            "chunk_type::line_type_continuation": line_type_continuation
            "chunk_type::line_type_initial_offset": line_type_initial_offset
            "chunk_type::text_score_type": text_score_type
            "chunk_type::restricted_text_type": restricted_text_type
            "chunk_type::interpolated_interior": interpolated_interior
            "chunk_type::edge_cap": edge_cap
            "chunk_type::edge_join": edge_join
            "chunk_type::edge_type_continuation": edge_type_continuation
            "chunk_type::edge_type_initial_offset": edge_type_initial_offset
            "chunk_type::symbol_library_index": symbol_library_index
            "chunk_type::symbol_color": symbol_color
            "chunk_type::symbol_size": symbol_size
            "chunk_type::symbol_orientation": symbol_orientation
            "chunk_type::escape": escape
            "chunk_type::message": message
            "chunk_type::application_data": application_data
            "chunk_type::copy_segment": copy_segment
            "chunk_type::inheritance_filter": inheritance_filter
            "chunk_type::clip_inheritance": clip_inheritance
            "chunk_type::segment_transformation": segment_transformation
            "chunk_type::segment_highlighting": segment_highlighting
            "chunk_type::segment_display_priority": segment_display_priority
            "chunk_type::segment_pick_priority": segment_pick_priority
            "chunk_type::application_structure_attribute": application_structure_attribute

  command:
    seq:
      - id: padding
        type: b8
        if: _io.pos % 2 == 1
      - id: word
        type: u2
      - id: partition
        type: b1
        if: base_len == 31
      - id: ext_len
        type: b15
        if: base_len == 31
    instances:
      type:
        value: word & 0xFFE0
        enum: chunk_type
      base_len:
        value: word & 0x1F
      len:
        value: "base_len == 31 ? ext_len : base_len"

  str_with_len:
    seq:
      - id: len
        type: u1
      - id: value
        type: str
        encoding: UTF-8
        size: len

  read_vdc:
    seq:
      - id: value
        type:
          switch-on: _root.vdc_width
          cases:
            "vdc::integer": si(_root.vdc_integer_precision)
            "vdc::real": f4

  # Dependant on direct colour precision
  direct_colour_value:
    seq:
      - id: r
        type: u1
      - id: g
        type: u1
      - id: b
        type: u1

  char_set:
    seq:
      - id: char_set_type
        enum: char_set_type
        type: s2
      - id: name
        type: str_with_len

  name:
    seq:
      - id: name_id
        type: si(_root.name_precision)

  color_index:
    seq:
      - id: colour_index
        type: ui(_root.colour_index_precision)

  # TODO: Support 24-bit numbers
  si:
    params:
      - id: len
        type: u1
    seq:
      - id: value
        type:
          switch-on: len
          cases:
            8: s1
            16: s2
            32: s4

  ui:
    params:
      - id: len
        type: u1
    seq:
      - id: value
        type:
          switch-on: len
          cases:
            8: u1
            16: u2
            32: u4

  point:
    seq:
      - id: x
        type: u2
      - id: y
        type: u2

  no_op: {}
  begin_metafile:
    seq:
      - id: metafile_name
        type: str_with_len
  end_metafile: {}
  begin_picture:
    seq:
      - id: picture_name
        type: str_with_len
  begin_picture_body: {}
  end_picture: {}
  begin_segment:
    seq:
      - id: segment_identifier
        type: name
  end_segment: {}
  begin_figure: {}
  end_figure: {}
  begin_protection_region:
    seq:
      - id: metafile_name
        type: str_with_len
  end_protection_region: {}
  begin_compound_line: {}
  end_compound_line: {}
  begin_compound_text_path: {}
  end_compound_text_path: {}
  begin_tile_array: {}
  end_tile_array: {}
  begin_application_structure: {}
  begin_application_structure_body: {}
  end_application_structure: {}
  metafile_version: {}
  metafile_description:
    seq:
      - id: description
        type: str_with_len
  vdc_type:
    seq:
      - id: width
        type: s2
        enum: vdc
  integer_precision: {}
  real_precision: {}
  index_precision: {}
  colour_precision: {}
  color_index_precision: {}
  max_color_index:
    seq:
      - id: value
        type: color_index
  color_value_extent:
    seq:
      - id: min_colour_value
        type: direct_colour_value
      - id: max_colour_value
        type: direct_colour_value
  metafile_element_list: {}
  metafile_defaults_replacement: {}
  font_list:
    seq:
      - id: fonts
        type: str_with_len
        repeat: eos
  character_set_list:
    seq:
      - id: char_sets
        type: char_set
        repeat: eos
  character_coding_announcer: {}
  name_precision: {}
  maximum_vdc_extent: {}
  segment_priority_extent: {}
  color_model: {}
  color_calibration: {}
  font_properties: {}
  glyph_mapping: {}
  symbol_library_list: {}
  picture_directory: {}
  scaling_mode: {}
  color_selection_mode:
    seq:
      - id: value
        enum: colour_selection_mode
        type: u2
  line_width_spec_mode: {}
  marker_size_spec_mode: {}
  edge_width_spec_mode: {}
  vdc_extent: {}
  background_color:
    seq:
      - id: value
        type: direct_colour_value
  device_viewport: {}
  device_viewport_spec_mode: {}
  device_viewport_mapping: {}
  line_representation: {}
  marker_representation: {}
  text_representation: {}
  fill_representation: {}
  edge_representation: {}
  interior_style_spec_mode: {}
  line_and_edge_type_definition: {}
  hatch_style_definition: {}
  geometric_pattern_definition: {}
  application_structure_directory: {}
  vdc_integer_precision: {}
  vdc_real_precision: {}
  auxiliary_color: {}
  transparency: {}
  clip_rectangle: {}
  clip_indicator: {}
  line_clipping_mode: {}
  marker_clipping_mode: {}
  edge_clipping_mode: {}
  new_region: {}
  save_primitive_context: {}
  restore_primitive_context: {}
  protection_region_indicator: {}
  generalized_text_path_mode: {}
  mitre_limit: {}
  transparent_cell_color: {}
  polyline:
    seq:
      - id: points
        type: point
        repeat: eos
  disjoint_polyline: {}
  polymarker: {}
  text:
    seq:
      - id: location
        type: point
      - id: finality
        enum: finality
        type: u2
      - id: content
        type: str_with_len
  restricted_text: {}
  append_text: {}
  polygon: {}
  polygon_set: {}
  cell_array: {}
  generalized_drawing_primitive: {}
  rectangle: {}
  circle: {}
  circular_arc3_point: {}
  circular_arc3_point_close: {}
  circular_arc_center: {}
  circular_arc_center_close: {}
  ellipse: {}
  elliptical_arc: {}
  elliptical_arc_close: {}
  circular_arc_center_reversed: {}
  connecting_edge: {}
  hyperbolic_arc: {}
  parabolic_arc: {}
  non_uniform_b_spline: {}
  non_uniform_rational_b_spline: {}
  poly_bezier: {}
  poly_symbol: {}
  bitonal_tile: {}
  tile: {}
  line_bundle_index: {}
  line_type: {}
  line_width:
    {}
    # seq:
    #   - id: width
    #     type: read_vdc
  line_color: {}
  marker_bundle_index: {}
  marker_type: {}
  marker_size: {}
  marker_color: {}
  text_bundle_index: {}
  text_font_index: {}
  text_precision: {}
  character_expansion_factor: {}
  character_spacing: {}
  text_color: {}
  character_height: {}
  character_orientation:
    seq:
      - id: x_up
        type: read_vdc
      - id: y_up
        type: read_vdc
      - id: x_base
        type: read_vdc
      - id: y_base
        type: read_vdc
  text_path: {}
  text_alignment: {}
  character_set_index: {}
  alternate_character_set_index: {}
  fill_bundle_index: {}
  interior_style: {}
  fill_color: {}
  hatch_index: {}
  pattern_index: {}
  edge_bundle_index: {}
  edge_type: {}
  edge_width: {}
  edge_color: {}
  edge_visibility: {}
  fill_reference_point: {}
  pattern_table: {}
  pattern_size: {}
  color_table: {}
  aspect_source_flags: {}
  pick_identifier: {}
  line_cap: {}
  line_join: {}
  line_type_continuation: {}
  line_type_initial_offset: {}
  text_score_type: {}
  restricted_text_type: {}
  interpolated_interior: {}
  edge_cap: {}
  edge_join: {}
  edge_type_continuation: {}
  edge_type_initial_offset: {}
  symbol_library_index: {}
  symbol_color: {}
  symbol_size: {}
  symbol_orientation: {}
  escape: {}
  message: {}
  application_data: {}
  copy_segment: {}
  inheritance_filter: {}
  clip_inheritance: {}
  segment_transformation: {}
  segment_highlighting: {}
  segment_display_priority: {}
  segment_pick_priority: {}
  application_structure_attribute: {}

enums:
  finality:
    0: not_final
    1: final

  colour_selection_mode:
    0: indexed
    1: direct

  vdc:
    0: integer
    1: real

  char_set_type:
    0: c_94_char_g_set
    1: c_96_char_g_set
    2: c_94_char_multibyte_g_set
    3: c_96_char_multibyte_g_set
    4: complete_code

  chunk_type:
    0: no_op
    0x0020: begin_metafile
    0x0040: end_metafile
    0x0060: begin_picture
    0x0080: begin_picture_body
    0x00A0: end_picture
    0x00C0: begin_segment
    0x00E0: end_segment
    0x0100: begin_figure
    0x0120: end_figure
    0x01A0: begin_protection_region
    0x01C0: end_protection_region
    0x01E0: begin_compound_line
    0x0200: end_compound_line
    0x0220: begin_compound_text_path
    0x0240: end_compound_text_path
    0x0260: begin_tile_array
    0x0280: end_tile_array
    0x02A0: begin_application_structure
    0x02C0: begin_application_structure_body
    0x02E0: end_application_structure
    0x1020: metafile_version
    0x1040: metafile_description
    0x1060: vdc_type
    0x1080: integer_precision
    0x10A0: real_precision
    0x10C0: index_precision
    0x10E0: colour_precision
    0x1100: color_index_precision
    0x1120: max_color_index
    0x1140: color_value_extent
    0x1160: metafile_element_list
    0x1180: metafile_defaults_replacement
    0x11A0: font_list
    0x11C0: character_set_list
    0x11E0: character_coding_announcer
    0x1200: name_precision
    0x1220: maximum_vdc_extent
    0x1240: segment_priority_extent
    0x1260: color_model
    0x1280: color_calibration
    0x12A0: font_properties
    0x12C0: glyph_mapping
    0x12E0: symbol_library_list
    0x1300: picture_directory
    0x2020: scaling_mode
    0x2040: color_selection_mode
    0x2060: line_width_spec_mode
    0x2080: marker_size_spec_mode
    0x20A0: edge_width_spec_mode
    0x20C0: vdc_extent
    0x20E0: background_color
    0x2100: device_viewport
    0x2120: device_viewport_spec_mode
    0x2140: device_viewport_mapping
    0x2160: line_representation
    0x2180: marker_representation
    0x21A0: text_representation
    0x21C0: fill_representation
    0x21E0: edge_representation
    0x2200: interior_style_spec_mode
    0x2220: line_and_edge_type_definition
    0x2240: hatch_style_definition
    0x2260: geometric_pattern_definition
    0x2280: application_structure_directory
    0x3020: vdc_integer_precision
    0x3040: vdc_real_precision
    0x3060: auxiliary_color
    0x3080: transparency
    0x30A0: clip_rectangle
    0x30C0: clip_indicator
    0x30E0: line_clipping_mode
    0x3100: marker_clipping_mode
    0x3120: edge_clipping_mode
    0x3140: new_region
    0x3160: save_primitive_context
    0x3180: restore_primitive_context
    0x3220: protection_region_indicator
    0x3240: generalized_text_path_mode
    0x3260: mitre_limit
    0x3280: transparent_cell_color
    0x4020: polyline
    0x4040: disjoint_polyline
    0x4060: polymarker
    0x4080: text
    0x40A0: restricted_text
    0x40C0: append_text
    0x40E0: polygon
    0x4100: polygon_set
    0x4120: cell_array
    0x4140: generalized_drawing_primitive
    0x4160: rectangle
    0x4180: circle
    0x41A0: circular_arc3_point
    0x41C0: circular_arc3_point_close
    0x41E0: circular_arc_center
    0x4200: circular_arc_center_close
    0x4220: ellipse
    0x4240: elliptical_arc
    0x4260: elliptical_arc_close
    0x4280: circular_arc_center_reversed
    0x42A0: connecting_edge
    0x42C0: hyperbolic_arc
    0x42E0: parabolic_arc
    0x4300: non_uniform_b_spline
    0x4320: non_uniform_rational_b_spline
    0x4340: poly_bezier
    0x4360: poly_symbol
    0x4380: bitonal_tile
    0x43A0: tile
    0x5020: line_bundle_index
    0x5040: line_type
    0x5060: line_width
    0x5080: line_color
    0x50A0: marker_bundle_index
    0x50C0: marker_type
    0x50E0: marker_size
    0x5100: marker_color
    0x5120: text_bundle_index
    0x5140: text_font_index
    0x5160: text_precision
    0x5180: character_expansion_factor
    0x51A0: character_spacing
    0x51C0: text_color
    0x51E0: character_height
    0x5200: character_orientation
    0x5220: text_path
    0x5240: text_alignment
    0x5260: character_set_index
    0x5280: alternate_character_set_index
    0x52A0: fill_bundle_index
    0x52C0: interior_style
    0x52E0: fill_color
    0x5300: hatch_index
    0x5320: pattern_index
    0x5340: edge_bundle_index
    0x5360: edge_type
    0x5380: edge_width
    0x53A0: edge_color
    0x53C0: edge_visibility
    0x53E0: fill_reference_point
    0x5400: pattern_table
    0x5420: pattern_size
    0x5440: color_table
    0x5460: aspect_source_flags
    0x5480: pick_identifier
    0x54A0: line_cap
    0x54C0: line_join
    0x54E0: line_type_continuation
    0x5500: line_type_initial_offset
    0x5520: text_score_type
    0x5540: restricted_text_type
    0x5560: interpolated_interior
    0x5580: edge_cap
    0x55A0: edge_join
    0x55C0: edge_type_continuation
    0x55E0: edge_type_initial_offset
    0x5600: symbol_library_index
    0x5620: symbol_color
    0x5640: symbol_size
    0x5660: symbol_orientation
    0x6020: escape
    0x7020: message
    0x7040: application_data
    0x8020: copy_segment
    0x8040: inheritance_filter
    0x8060: clip_inheritance
    0x8080: segment_transformation
    0x80A0: segment_highlighting
    0x80C0: segment_display_priority
    0x80E0: segment_pick_priority
    0x9020: application_structure_attribute
