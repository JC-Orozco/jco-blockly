// Copyright 2017 Juan Carlos Orozco Arena

//var jco_init = function(){
//  document.getElementById('factoryBlocksXml').addEventListener('click',
//      function() {
//        alert("Hello1")
//        //self.blockLibraryController.saveToBlockLibrary();
//      });
//  document.getElementById('previewBlockXml').addEventListener('click',
//      function() {
//        alert("Hello2")
//        //self.blockLibraryController.saveToBlockLibrary();
//      });  
//}
//
////jco_init();
//

window.jco_factoryBlocksXml = function(){
  var workspace = BlockFactory.mainWorkspace;
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  console.log(xmlText);
  alert("See console for factoryBlocks xml output");
}

window.jco_previewBlockXml = function(){
  var workspace = BlockFactory.previewWorkspace;
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  console.log(xmlText);
  alert("See console for preview block xml output");
}

window.jco_toolbarBlocksXml = function(){
  var blocks = {};
  var toolbar = document.getElementById('blockfactory_toolbox');
  
  for(let i = 0; i<toolbar.childElementCount; i++){
    for(let j = 0; j<toolbar.children[i].childElementCount; j++){
      blocks[toolbar.children[i].children[j].getAttribute('type')] = '';     
    }
  }
    
  //let block1 = Blockly.Blocks[Object.keys(blocks)[0]];
  
  for(key in Object.keys(blocks)){
    var previewBlock = BlockFactory.previewWorkspace.newBlock(Object.keys(blocks)[key]);

    //console.log(previewBlock);

    //console.log(toolbar);
    //console.log(blocks);

    var xmlDom = Blockly.Xml.blockToDom(previewBlock);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    console.log(xmlText);
  }
}

var newNode = function(name, attrs, text){
  var block1
  if(name === 'block'){
    block1 = goog.dom.createDom('block');
  } else {
    block1 = goog.dom.createDom(name);      
  }
  for(var key in attrs){
    block1.setAttribute(key, attrs[key]);
  }
  if(text) block1.append(text);
  return block1;
};
    
var firstStatement = function(block){
  return !(block.children.length>0 && block.lastElementChild.tagName === 'STATEMENT')
}

//<xml xmlns="http://www.w3.org/1999/xhtml">
//  <block type="factory_base" id="V2`TYO-edR/}W8uKL)?R" deletable="false" movable="false" x="0" y="0">
//    <mutation connections="NONE"></mutation>
//    <field name="NAME">block_type</field>
//    <field name="INLINE">AUTO</field>
//    <field name="CONNECTIONS">NONE</field>
//    <statement name="INPUTS">
//      <block type="input_value" id="[SFu}aUtb~])w]pr}F5(">
//        <field name="INPUTNAME">NAME</field>
//        <field name="ALIGN">LEFT</field>
//        <statement name="FIELDS">
//          <block type="field_dropdown" id="-$ShX[%~6Lr21Fu[e_mz">
//            <mutation options="[&quot;text&quot;,&quot;image&quot;,&quot;text&quot;,&quot;text&quot;]"></mutation>
//            <field name="FIELDNAME">NAME</field>
//            <field name="USER0">option</field>
//            <field name="CPU0">OPTIONNAME</field>
//            <field name="SRC1">https://www.gstatic.com/codesite/ph/images/star_on.gif</field>
//            <field name="WIDTH1">15</field>
//            <field name="HEIGHT1">15</field>
//            <field name="ALT1">*</field>
//            <field name="CPU1">OPTIONNAME</field>
//            <field name="USER2">option</field>
//            <field name="CPU2">OPTIONNAME</field>
//            <field name="USER3">option</field>
//            <field name="CPU3">OPTIONNAME</field>

// JCO: I had to do this function manually since the mutator changes can not be detected by the generator. 
var field_dropdown_xml2 = function(data, options, FIELDNAME) {
  var block1 = newNode('block', {type: 'field_dropdown'})
  var OPTIONS = '['
  
  if(!firstStatement(data.dst.current)){
    let nextBlock = newNode('next')
    data.dst.current.append(nextBlock)
    data.dst.current = nextBlock
  }
  data.dst.current.append(block1)
  data.dst.current = block1
  var mutation = newNode('mutation') 
  block1.append(mutation)
  block1.append(newNode('field', {name: 'FIELDNAME'}, FIELDNAME))
  for(let i=0; i<options.length; i++){
    let option = options[i]
    if(typeof option[0] === "string"){
      OPTIONS+='&quot;text&quot;,'
      block1.append(newNode('field', {name: 'USER'+i}, option[0]))
    } else {
      OPTIONS+='&quot;image&quot;,'
      block1.append(newNode('field', {name: 'SRC'+i}, option[0].src))
      block1.append(newNode('field', {name: 'WIDTH'+i}, option[0].width))
      block1.append(newNode('field', {name: 'HEIGHT'+i}, option[0].height))
      block1.append(newNode('field', {name: 'ALT'+i}, option[0].alt))
    }
    block1.append(newNode('field', {name: 'CPU'+i}, option[1]))
  }
  OPTIONS = OPTIONS.slice(0,-1) // Drop last comma 
  OPTIONS += ']'
  mutation.setAttribute('options', OPTIONS);
  return 0
}

var parseFields = function(data){
  for(let i=0; i<data.src.current.length; i++){
    let field = data.src.current[i]
    if(field instanceof Blockly.FieldLabel){
      field_static_xml(data, field.text_)
    } else if(field instanceof Blockly.FieldTextInput){
      field_input_xml(data, field.text_, field.name)
    } else if(field instanceof Blockly.FieldNumber){
      field_number_xml(data, field.text_, field.name, field.min_, field.max_, field.presicion_)
    } else if(field instanceof Blockly.FieldAngle){
      field_angle_xml(data, field.text_, field.name)
    } else if(field instanceof Blockly.FieldDropdown){
      field_dropdown_xml2(data, field.menuGenerator_, field.name)
    } else if(field instanceof Blockly.FieldCheckbox){
      field_checkbox_xml(data, field.state_ , field.name)
    } else if(field instanceof Blockly.FieldColour){
      field_colour_xml(data, field.colour_ , field.name)
    } else if(field instanceof Blockly.FieldVariable){
      field_variable_xml(data, field.text_, field.name)
    } else if(field instanceof Blockly.FieldImage){
      field_image_xml(data, field.src_, field.width_, field.height_, field.text_)
    }

  }
}

var parseInputs = function(data){
  for(let i=0; i<data.src.current.length; i++){
    let input = data.src.current[i]
    if(input instanceof Blockly.Input){
        input_value_xml(data,
          input.name, // NAME
          'left', // ALIGN JCO TODO: How to get this value
          function(data){ 
            let src = data.src.current
            data.src.current = input.fieldRow
            parseFields(data)
            data.src.current = src
          }, // FIELDS
          function(data){}) // TYPE JCO TODO: How to get this type block
    }
//  } else if(input instanceof B)      case Blockly.NEXT_STATEMENT:
//        break
//      default: // Dummy Input
//        
//    }
  }
}

var buildBlockFactoryDef = function(block){
  var data = {src: {root: block, current: block},
              dst: {}}
  data.dst.root = newNode('xml')
  data.dst.current = data.dst.root
  var f0 = function(){}
  var connections = "NONE"
  // JCO TODO: Assign value to connections according to the following cases:
  if(block.nextConnection){
    if(block.prevConnection){
    } else {
    }
  } else {
    if(block.prevConnection){ 
    }    
  }
//  var NAME = block.type
//  var INLINE = block.inputsInline
//  var CONNECTIONS = block.inputsInlineDefault
//  var INPUTS = function(){}
//  var TOOLTIP = function(){return block.tooltip}
//  var HELPURL = function(){return block.helpUrl}
//  var COLOUR = function(){return block.colour_}
//  factory_base_xml(data, connections, NAME, INLINE, CONNECTIONS, INPUTS, TOOLTIP, HELPURL, COLOUR)

  factory_base_xml(data, connections,
    block.type, //NAME
    block.inputsInline, //INLINE
    block.inputsInlineDefault, //CONNECTIONS
    function(data){
      let src = data.src.current
      data.src.current = data.src.current.inputList
      parseInputs(data)
      data.src.current = src
    }, //INPUTS
    function(data){text_xml(data, data.src.current.tooltip)}, //TOOLTIP
    function(data){text_xml(data, data.src.current.helpUrl)}, //HELPURL
    function(data){colour_hue_xml(data, data.src.current.colour_, data.src.current.colour_)}) //COLOUR JCO TODO: Convert second value to 0-360
  
  console.log(data.dst.root)
  
  // Generate getters for any fields or inputs.
//  for (var i = 0, input; input = block.inputList[i]; i++) {
//    for (var j = 0, field; field = input.fieldRow[j]; j++) {
//      var name = field.name;
//      if (!name) {
//        continue;
//      }
      //console.log(name)
//      if (field instanceof Blockly.FieldVariable) {
//        // Subclass of Blockly.FieldDropdown, must test first.
//        code.push(makeVar('variable', name) +
//                  " = Blockly." + language +
//                  ".variableDB_.getName(block.getFieldValue('" + name +
//                  "'), Blockly.Variables.NAME_TYPE);");
//      } else if (field instanceof Blockly.FieldAngle) {
//        // Subclass of Blockly.FieldTextInput, must test first.
//        code.push(makeVar('angle', name) +
//                  " = block.getFieldValue('" + name + "');");
//      } else if (Blockly.FieldDate && field instanceof Blockly.FieldDate) {
//        // Blockly.FieldDate may not be compiled into Blockly.
//        code.push(makeVar('date', name) +
//                  " = block.getFieldValue('" + name + "');");
//      } else if (field instanceof Blockly.FieldColour) {
//        code.push(makeVar('colour', name) +
//                  " = block.getFieldValue('" + name + "');");
//      } else if (field instanceof Blockly.FieldCheckbox) {
//        code.push(makeVar('checkbox', name) +
//                  " = block.getFieldValue('" + name + "') == 'TRUE';");
//      } else if (field instanceof Blockly.FieldDropdown) {
//        code.push(makeVar('dropdown', name) +
//                  " = block.getFieldValue('" + name + "');");
//      } else if (field instanceof Blockly.FieldNumber) {
//        code.push(makeVar('number', name) +
//                  " = block.getFieldValue('" + name + "');");
//      } else if (field instanceof Blockly.FieldTextInput) {
//        code.push(makeVar('text', name) +
//                  " = block.getFieldValue('" + name + "');");
//      }
//    }
//    var name = input.name;
//    if (name) {
//      if (input.type == Blockly.INPUT_VALUE) {
//        code.push(makeVar('value', name) +
//                  " = Blockly." + language + ".valueToCode(block, '" + name +
//                  "', Blockly." + language + ".ORDER_ATOMIC);");
//      } else if (input.type == Blockly.NEXT_STATEMENT) {
//        code.push(makeVar('statements', name) +
//                  " = Blockly." + language + ".statementToCode(block, '" +
//                  name + "');");
//      }
    }
  }
}
