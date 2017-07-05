var factory_base_xml = function(data, connections, NAME, INLINE, CONNECTIONS, INPUTS, TOOLTIP, HELPURL, COLOUR) {
  var block1 = newNode('block', {type: 'factory_base'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('mutation', {connections:connections}))
  block1.append(newNode('field', {name: 'NAME'}, NAME))
  block1.append(newNode('field', {name: 'INLINE'}, INLINE))
  block1.append(newNode('field', {name: 'CONNECTIONS'}, CONNECTIONS))
  block1.append(data.dst.current = newNode('statement', {name: 'INPUTS'}))
  INPUTS(data)
data.dst.current = block1
  block1.append(data.dst.current = newNode('value', {name: 'TOOLTIP'}))
  TOOLTIP(data)
data.dst.current = block1
  block1.append(data.dst.current = newNode('value', {name: 'HELPURL'}))
  HELPURL(data)
data.dst.current = block1
  block1.append(data.dst.current = newNode('value', {name: 'COLOUR'}))
  COLOUR(data)
data.dst.current = block1
  return 0
}
var input_dummy_xml = function(data, ALIGN, FIELDS) {
  var block1 = newNode('block', {type: 'input_dummy'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'ALIGN'}, ALIGN))
  block1.append(data.dst.current = newNode('statement', {name: 'FIELDS'}))
  FIELDS(data)
data.dst.current = block1
  return 0
}
var input_statement_xml = function(data, INPUTNAME, ALIGN, FIELDS, TYPE) {
  var block1 = newNode('block', {type: 'input_statement'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'INPUTNAME'}, INPUTNAME))
  block1.append(newNode('field', {name: 'ALIGN'}, ALIGN))
  block1.append(data.dst.current = newNode('statement', {name: 'FIELDS'}))
  FIELDS(data)
data.dst.current = block1
  block1.append(data.dst.current = newNode('value', {name: 'TYPE'}))
  TYPE(data)
data.dst.current = block1
  return 0
}
var input_value_xml = function(data, INPUTNAME, ALIGN, FIELDS, TYPE) {
  var block1 = newNode('block', {type: 'input_value'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'INPUTNAME'}, INPUTNAME))
  block1.append(newNode('field', {name: 'ALIGN'}, ALIGN))
  block1.append(data.dst.current = newNode('statement', {name: 'FIELDS'}))
  FIELDS(data)
data.dst.current = block1
  block1.append(data.dst.current = newNode('value', {name: 'TYPE'}))
  TYPE(data)
data.dst.current = block1
  return 0
}
var field_static_xml = function(data, TEXT) {
  var block1 = newNode('block', {type: 'field_static'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'TEXT'}, TEXT))
  return 0
}
var field_input_xml = function(data, TEXT, FIELDNAME) {
  var block1 = newNode('block', {type: 'field_input'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'TEXT'}, TEXT))
  block1.append(newNode('field', {name: 'FIELDNAME'}, FIELDNAME))
  return 0
}
var field_number_xml = function(data, VALUE, FIELDNAME, MIN, MAX, PRECISION) {
  var block1 = newNode('block', {type: 'field_number'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'VALUE'}, VALUE))
  block1.append(newNode('field', {name: 'FIELDNAME'}, FIELDNAME))
  block1.append(newNode('field', {name: 'MIN'}, MIN))
  block1.append(newNode('field', {name: 'MAX'}, MAX))
  block1.append(newNode('field', {name: 'PRECISION'}, PRECISION))
  return 0
}
var field_angle_xml = function(data, ANGLE, FIELDNAME) {
  var block1 = newNode('block', {type: 'field_angle'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'ANGLE'}, ANGLE))
  block1.append(newNode('field', {name: 'FIELDNAME'}, FIELDNAME))
  return 0
}
var field_dropdown_xml = function(data, options, FIELDNAME, USER0, CPU0, USER1, CPU1, USER2, CPU2) {
  var block1 = newNode('block', {type: 'field_dropdown'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('mutation', {options:options}))
  block1.append(newNode('field', {name: 'FIELDNAME'}, FIELDNAME))
  block1.append(newNode('field', {name: 'USER0'}, USER0))
  block1.append(newNode('field', {name: 'CPU0'}, CPU0))
  block1.append(newNode('field', {name: 'USER1'}, USER1))
  block1.append(newNode('field', {name: 'CPU1'}, CPU1))
  block1.append(newNode('field', {name: 'USER2'}, USER2))
  block1.append(newNode('field', {name: 'CPU2'}, CPU2))
  return 0
}
var field_checkbox_xml = function(data, CHECKED, FIELDNAME) {
  var block1 = newNode('block', {type: 'field_checkbox'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'CHECKED'}, CHECKED))
  block1.append(newNode('field', {name: 'FIELDNAME'}, FIELDNAME))
  return 0
}
var field_colour_xml = function(data, COLOUR, FIELDNAME) {
  var block1 = newNode('block', {type: 'field_colour'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'COLOUR'}, COLOUR))
  block1.append(newNode('field', {name: 'FIELDNAME'}, FIELDNAME))
  return 0
}
var field_variable_xml = function(data, TEXT, FIELDNAME) {
  var block1 = newNode('block', {type: 'field_variable'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'TEXT'}, TEXT))
  block1.append(newNode('field', {name: 'FIELDNAME'}, FIELDNAME))
  return 0
}
var field_image_xml = function(data, SRC, WIDTH, HEIGHT, ALT) {
  var block1 = newNode('block', {type: 'field_image'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'SRC'}, SRC))
  block1.append(newNode('field', {name: 'WIDTH'}, WIDTH))
  block1.append(newNode('field', {name: 'HEIGHT'}, HEIGHT))
  block1.append(newNode('field', {name: 'ALT'}, ALT))
  return 0
}
var type_group_xml = function(data, types) {
  var block1 = newNode('block', {type: 'type_group'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('mutation', {types:types}))
  return 0
}
var type_null_xml = function(data) {
  var block1 = newNode('block', {type: 'type_null'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  return 0
}
var type_boolean_xml = function(data) {
  var block1 = newNode('block', {type: 'type_boolean'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  return 0
}
var type_number_xml = function(data) {
  var block1 = newNode('block', {type: 'type_number'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  return 0
}
var type_string_xml = function(data) {
  var block1 = newNode('block', {type: 'type_string'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  return 0
}
var type_list_xml = function(data) {
  var block1 = newNode('block', {type: 'type_list'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  return 0
}
var type_other_xml = function(data, TYPE) {
  var block1 = newNode('block', {type: 'type_other'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'TYPE'}, TYPE))
  return 0
}
var colour_hue_xml = function(data, colour, HUE) {
  var block1 = newNode('block', {type: 'colour_hue'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('mutation', {colour:colour}))
  block1.append(newNode('field', {name: 'HUE'}, HUE))
  return 0
}
var text_xml = function(data, TEXT) {
  var block1 = newNode('block', {type: 'text'})

  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  block1.append(newNode('field', {name: 'TEXT'}, TEXT))
  return 0
}
//  block_factory_curated_xml.js:206:3
