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
  //console.log(xmlText);
  confirm(xmlText);
}

window.jco_previewBlockXml = function(){
  var workspace = BlockFactory.previewWorkspace;
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  //console.log(xmlText);
  alert(xmlText);
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
  
  console.log(convertXmlToCode(input_value_xmlTxt))
}

var newNode = function(name, attrs, text, ast_node){
  var block1
  if(name === 'block'){
    block_loc[id] = ast_node.loc
    console.log(id+' '+ast_node.loc.start.line);
    attrs.id = id;
    id += 1;
    block1 = goog.dom.createDom('block');

    let comm1
    let first = true
    let i = last_comment
    while(i<comments.length && comments[i].loc.start.line <= ast_node.loc.start.line){
      if(first){
        first = false
        comm1 = goog.dom.createDom("comment")
        comm1.setAttribute('pinned', 'false')
        comm1.append(comments[i].value)
        block1.append(comm1)
      } else {
        comm1.append('\n'+comments[i].value)
      }
      i += 1
    }
    last_comment = i
  } else {
    block1 = goog.dom.createDom(name);      
  }
  for(var key in attrs){
    block1.setAttribute(key, attrs[key]);
  }
  if(text) block1.append(text);
  return block1;
};


//Chained statements
//<block type="input_value" id="=:Z^4G;c`TDGLme@(-[x">
//  <field name="INPUTNAME">NAME</field>
//  <field name="ALIGN">RIGHT</field>
//  <statement name="FIELDS">
//    <block type="field_static" id="=g|MM*UR]Gtc+`r+bwbG">
//      <field name="TEXT">fields</field>
//      <next>
//        <block type="field_variable" id="yXph)m9N:~3{?R!=d)B|">
//          <field name="TEXT">item</field>
//          <field name="FIELDNAME">NAME</field>
//        </block>
//      </next>
//    </block>
//  </statement>
//  <value name="TYPE">
//    <shadow type="type_null" id="Fvt^^jUh$_tu,c%Dnuw["></shadow>
//  </value>
//</block>

var convertXmlToCode = function(xmlTxt){
  var parser = new DOMParser();
  var xml = parser.parseFromString(xmlTxt,"text/xml").children[0];
  var blockType = xml.getAttribute('type');
  var childList = []
  var parameters = ''
  for(let i=0; i<xml.childElementCount; i++){
    let child = xml.children[i]
    let name = child.getAttribute('name')
    childList.push([child.tagName, name])
    parameters += name+' ,'
  }
  parameters = parameters.slice(0,-2)
  console.log(childList)
  var code = 'var '+blockType+'_xml('+parameters+') {\n'
  code += "  var base_block\n"
  code += "  var block1 = newNode('block', {type: '" + blockType +"'})\n"
  // JCO TODO: The next code applies for statements, needs expression case.
  code += `
  if(firstStatement(prev_block)){
    base_block = prev_block
  } else {
    let nextBlock = newNode('next')
    prev_block.append(nextBlock)
    base_block = nextBlock
  }
  base_block.append(block1)\n`
  for(i in childList){
    let child = childList[i]
    switch(child[0]){
      case 'field':
        code += "  block1.append(newNode('field', {name: '"+ child[1] +"'}, "+ child[1] +"))\n"
        break;
      case 'statement':
      case 'value':
        code += "  block1.append(newNode('"+ child[0] +"', {name: '"+ child[1] +"'}))\n"
        code += "  "+ child[1] +"()\n"
        break;
    }
  }
  code += '  return(base_block)\n' + 
          '}'
  return code
}

var input_value_xmlTxt = `
<block type="input_value">
  <field name="INPUTNAME">NAME</field>
  <field name="ALIGN">RIGHT</field>
  <statement name="FIELDS">
    <block type="field_static">
      <field name="TEXT">fields</field>
      <next>
        <block type="field_variable">
          <field name="TEXT">item</field>
          <field name="FIELDNAME">NAME</field>
        </block>
      </next>
    </block>
  </statement>
  <value name="TYPE">
    <shadow type="type_null"></shadow>
  </value>
</block>`


                      
    
var firstStatement = function(block){
  return (block.children && block.lastElementChild.tagName === 'STATEMENT')
}

// JCO This is an example of a statement block constructor.
// We need to do an expression block constructor too
var input_value_xml = function(prev_block, INPUTNAME, ALIGN, FIELDS, TYPE){
  var base_block
  var block1 = newNode('block', {type: 'input_value'})
  if(firstStatement(prev_block)){
    base_block = prev_block
  } else {
    let nextBlock = newNode('next')
    prev_block.append(nextBlock)
    base_block = nextBlock
  }
  base_block.append(block1)
  block1.append(newNode('field', {name: 'INPUTNAME'}, INPUTNAME))
  block1.append(newNode('field', {name: 'ALIGN'}, ALIGN))
  block1.append(newNode('statement', {name: 'FIELDS'}))
  FIELDS()
  block1.append(newNode('value', {name: 'TYPE'}))
  TYPE()
  return(base_block)
}

