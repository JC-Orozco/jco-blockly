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

window.jco_updateFactoryBlocks = function(){
  if (document.getElementById('format').value == 'Manual') {
    BlockFactory.mainWorkspace.clear();
    // var xml = Blockly.Xml.textToDom();
    // window.lastUpdatedBlock is set in FactoryUtils.getGeneratorStub
    var xml = buildBlockFactoryDef(window.lastUpdatedBlock)
    Blockly.Xml.domToWorkspace(xml, BlockFactory.mainWorkspace);
  }  
}

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
  return (block.tagName === 'STATEMENT' || block.tagName === 'XML' || block.tagName === 'VALUE')
}

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
    let align = 'LEFT' // This seems to be the default Blockly.ALIGN_LEFT
    if(input.align || input.align === 0){
      if(input.align === Blockly.ALIGN_CENTRE){
        align = 'CENTRE'
      } else if(input.align === Blockly.ALIGN_RIGHT){
        align = 'RIGHT'
      }
    }
    switch(input.type){
      case Blockly.INPUT_VALUE:
        input_value_xml(data,
          input.name, // NAME
          align,
          function(data){ 
            let src = data.src.current
            data.src.current = input.fieldRow
            parseFields(data)
            data.src.current = src
          }, // FIELDS
          function(data){}) // TYPE JCO TODO: How to get this type block
        break
      case Blockly.NEXT_STATEMENT:
        input_statement_xml(data,
          input.name, // NAME
          align,
          function(data){ 
            let src = data.src.current
            data.src.current = input.fieldRow
            parseFields(data)
            data.src.current = src
          }, // FIELDS
          function(data){}) // TYPE JCO TODO: How to get this type block
        break
      case Blockly.DUMMY_INPUT:
        input_dummy_xml(data,
          align,
          function(data){ 
            let src = data.src.current
            data.src.current = input.fieldRow
            parseFields(data)
            data.src.current = src
          }) // FIELDS
        break
    }
  }
}

var buildBlockFactoryDef = function(block){
  var data = {src: {root: block, current: block},
              dst: {}}
  data.dst.root = newNode('xml')
  data.dst.current = data.dst.root
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

  let colour_hue = Math.floor(goog.color.hexToHsv(data.src.current.colour_)[0]); // Convert to hue value 0-360 degrees
  let inline = 'AUTO' // When block.inputsInlineDefault === undefined
  if(block.inputsInlineDefault === true){
    inline = 'INT'
  } else if(block.inputsInlineDefault === false){
    inline = 'EXT'
  }   
  let connections = 'NONE'
  if(block.outputConnection){
    connections = 'LEFT'
  } else {
    if(block.prevConnection && block.nextConnection){
      connections = 'BOTH'
    } else {
      if(block.prevConnection){
        connections = 'TOP'
      }
      if(block.nextConnection){
        connections = 'BOTTOM'
      }
    }
  }
  //block.nextConnection null
  factory_base_xml(data, connections,
    block.type, //NAME
    inline, //INLINE
    connections, //CONNECTIONS
    function(data){
      let src = data.src.current
      data.src.current = data.src.current.inputList
      parseInputs(data)
      data.src.current = src
    }, //INPUTS
    function(data){text_xml(data, data.src.current.tooltip)}, //TOOLTIP
    function(data){text_xml(data, data.src.current.helpUrl)}, //HELPURL
    function(data){colour_hue_xml(data, data.src.current.colour_, colour_hue)}) //COLOUR JCO TODO: Convert second value to 0-360
  
  console.log(data.dst.root)
  return data.dst.root
}
