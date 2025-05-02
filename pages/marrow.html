$(document).ready(function() { 
  let headerObject = {
    templateTab: 'templatePanel',
    settingTab: 'settingPanel',
    helpTab: 'helpPanel',
    infoTab: 'infoPanel',
    differentialSettingsTab: 'differentialSettingsPanel',
    bloodSettingsTab: 'bloodSettingsPanel',
    aspSettingsTab: 'aspSettingsPanel',
    coreSettingsTab: 'coreSettingsPanel',
    specTab: 'specPanel',
    pbTab: 'pbPanel',
    aspTab: 'aspPanel',
    coreTab: 'corePanel',
    stainTab: 'stainPanel'    
  };

  let radioObject = {};
  let pbCountTable = getSavedItems()[0];
  let aspCountTable = getSavedItems()[1];
  let positiveLabel = 4;
  let negativeLabel = 5;

  const objectType = {
    pbCounter: 'pb',
    aspCounter: 'asp',
    pbCounterTemplate: 'pb',
    aspCounterTemplate: 'asp',
  }

  const typeObject = {
    'pb': {counterID: "#pbCounter", characterID: "#pbCount", tableID: "#pbTable", dcountID: "#pbDCount", ccountID: "#pbCCount", tcountID: "#pbTCount", tableDivID: "#pbTableDiv", table: pbCountTable},
    'asp': {counterID: "#aspCounter", characterID: "#aspCount", tableID: "#aspTable", dcountID: "#aspDCount", ccountID: "#aspCCount", tcountID: "#aspTCount", tableDivID: "#aspTableDiv", table: aspCountTable}
  }

  window.keypressed = {};

  let patientAge = -1;

  let cbcVar = ["WBC", "RBC", "HGB", "MCV", "MCHC", "PLT", "NRBC's", "Absolute Neutrophils", "Absolute Lymphocytes", "Absolute Monocytes", "Absolute Eosinophils", "Absolute Basophils", "Absolute NRBCs"];

  let cbcObject = {
    "WBC": {value: ""},
    "RBC": {value: ""},
    "HGB": {value: "", low: "hgbLow", normal: "hgbNormal", high: "hgbHigh"},
    "MCV": {value: "", low: "mcvLow", normal: "mcvNormal", high: "mcvHigh"},
    "MCHC": {value: "", low: "hypochromic"},
    "PLT": {value: "", low: "pltLow", normal: "pltNormal", high: "pltHigh"},
    "NRBC's": {value: "", high: "nrbcPresent"},
    "Absolute Neutrophils": {value: "", low: "neutLow", normal: "neutNormal", high: "neutHigh"},
    "Absolute Lymphocytes": {value: "", low: "lymphLow", normal: "lymphNormal", high: "lymphHigh"},
    "Absolute Monocytes": {value: "", low: "monosLow", high: "monosHigh"},
    "Absolute Eosinophils": {value: "", high: "eosHigh"},
    "Absolute Basophils": {value: "", high: "basoHigh"},
    "Absolute NRBCs": {value: "", high: "nrbcPresent"}
  }

  const quantDescriptors = {class: "radio", descriptors: ["Rare", "Occasional", "Frequent"], value: ["rare ", "occasional ", "frequent "]};
  const degreeDescriptors = {class: "radio", descriptors: ["Slight", "Mild", "Marked"], value: ["slight ", "mild", "marked "]};
  const altDegreeDescriptors = {class: "radio", descriptors: ["Slight", "Mild", "Marked"], value: ["a slight ", "a mild ", "a marked "]};
  const dualDescriptors = {class: 'radio', descriptors: ['Positive', 'Negative'], value: ['positive', 'negative']}
  const noneDescriptors = {class: "none", descriptors: [], value: []};
  const stopDescriptors = {class: "stop", descriptors: [], value: []};
  const isDescriptors = {class: "hidden", descriptors: ['Is'], value: ['is ']};
  const showsDescriptors = {class: "hidden", descriptors: ['Shows'], value: ['shows ']};
  const ironDescriptors = {class: "iron", descriptors: {'Storage Iron': ['Increased', 'Adequate', 'Decreased', 'Inadequate'], 'Ring Sideroblasts': ['Present', 'Absent', 'Inadequate']}, value: {'Storage Iron': ['increased', 'adequate', 'decreased', 'inadequate'], 'Ring Sideroblasts': ['present', 'absent', 'inadequate rings']},};
  const reticulinDescriptors = {class: 'radio', descriptors: ['MF-0', 'MF-1', 'MF-2', 'MF-3'], value: ['MF-0', 'MF-1', 'MF-2', 'MF-3']}
  const cd3Descriptors = {class: 'select', descriptors: ['','Interstitially scattered','Interstitially scattered and focal loose aggregates','Interstitially scattered and focal aggregates','Interstitially scattered and focal clusters','Interstitially scattered and clusters'], value: ['','Highlights interstitially scattered small T cells.','Highlights interstitially scattered and focal loose aggregates of small T cells.','Highlights interstitially scattered and focal aggregates of small T cells.','Highlights interstitially scattered and focal clusters of small T cells.','Highlights interstitially scattered and clusters of small T cells.']}
  const cd20Descriptors = {class: 'selectDualCount', descriptors: ['','Interstitially scattered','Interstitially scattered and focal loose aggregates','Interstitially scattered and focal aggregates','Interstitially scattered and focal clusters','Interstitially scattered and clusters','Diffuse infiltrate of small B cells'], value: ['','Highlights interstitially scattered small B cells.','Highlights interstitially scattered and focal loose aggregates of small B cells.','Highlights interstitially scattered and focal aggregates of small B cells.','Highlights interstitially scattered and focal clusters of small B cells.','Highlights interstitially scattered and clusters of small B cells.','A diffuse infiltrate of small B cells (***% of total cellularity)']}
  const cd34Descriptors = {class: 'selectDualCount', descriptors: ['','Not increased','Increased'], value: ['','Shows no increase in blasts (***% of total cellularity).','Highlights increased blasts (***% of total cellularity).']}
  const cd61Descriptors = {class: 'select', descriptors: ['','Adequate, regularly destributed','Increased, regularly destributed'], value: ['','Highlights adequate, regularly distributed megakaryocytes.','Highlights increased but regularly distributed megakaryocytes with unremarkable morphology.']}
  const cd71Descriptors = {class: 'select', descriptors: ['','Adequate', 'Proliferation'], value: ['','Highlights adequate erythroid precurosrs.','Shows a proliferation of erythroid precursors.']}
  const mpoDescriptors = {class: 'select', descriptors: ['','Adequate', 'Proliferation'], value: ['','Highlights adequate myeloid precurosrs.','Shows a proliferation of myeloid precursors.']}
  const cd138Descriptors = {class: 'selectDualCount', descriptors: ['','Not increased', 'Increased'], value: ['','Shows no increase in plasma cells (***% of total cellularity).','Highlights increased plasma cells (***% of total cellularity).']}
  const kappalambdaDescriptors = {class: 'select', descriptors: ['','Polytypic', 'Kappa restriction', 'Lambda restriction'], value: ['','Highlights polytypic plasma cells.','Shows kappa restriction in plasma cells.','Shows lambda restriction in plasma cells.']}

  const rbcList = [
    "",
    "Unremarkable",
    "Predominantly unremarkable",
    "Anisopoikilocytosis",
    "Hypochromasia",
    "Polychromasia"
  ];

  const anisoList = [
    "",
    "Acanthocytes",
    "Basophilic stippling",
    "Bite cells",
    "Blister cells",
    "Burr cells",
    "Echinocytes",
    "Elliptocytes",
    "Howell-Jolly bodies",
    "Macroovalocytes",
    "Ovalocytes",
    "Schistocytes",
    "Sickle cells",
    "Spherocytes",
    "Target cells",
    "Teardrop cells",
    "Teardrop forms"
  ];

  const neutrophilList = [
    "",
    "Hypogranular forms",
    "Hypolobated forms",
    "Hypersegmented forms",
    "Shift to immaturity",
    "Toxic changes"
  ];

  const lymphocyteList = [
    "",
    "Unremarkable",
    "Small mature",
    "Large granular",
    "Reactive",
    "CLL-like"
  ];

  const monocyteList = [
    "",
    "Mature-appearing morphology",
    "Shift to immaturity",
  ];

  const plateletList = [
    "",
    "Hypogranular platelets",
    "Large platelets",
    "Giant platelets",
  ];

  const adequacyList = [
    "",
    "Hemodilute",
    "Paucicellular",
    "Virtually acellular",
    "Paucispicular",
    "Aspiculate"
  ];

  const coreAdequacyList = [
    "",
    "Crush artifact",
    "Aspiration artifact",
    "Fragmented",
    "Subcortical",
    "Predominantly subcortical",
    "Small",
  ];
  
  const erythroidList = [
    "",
    "Nuclear budding",
    "Nuclear contour irregularity",
    "Multinucleation",
    "Megaloblastoid changes",
    "Shift to immaturity"
  ];

  const myeloidList = [
    "",
    "Hypogranular forms",
    "Monolobated forms",
    "Hyposegmented forms",
    "Hypersegmented forms",
    "Shift to immaturity"
  ];

  const aspMegList = [
    "",
    "Widely separated nuclear lobes",
    "Separation of nuclear lobes",
    "Hypolobated forms",
    "Small hypolobated forms",
    "Micromegakaryocytes",
    "Large hypersegmented forms"
  ];

  const aspPlasmaList = [
    "",
    "Large, atypical forms with prominent nucleoli"
  ];

  const coreMegList = [
    "",
    "Widely separated nuclear lobes",
    "Separation of nuclear lobes",
    "Hypolobated forms",
    "Small hypolobated forms",
    "Micromegakaryocytes",
    "Large hypersegmented forms"
  ];

  const aspirateSpecialStainsList = [
    "",
    "Iron",
  ]

  const specialStainsList = [
    "",
    "Iron",
    "Reticulin",
    "Congo red",
    "GMS",
    "AFB"
  ]

  const immunostainsList = [
    "",
    "CD3",
    "CD20",
    "CD34",
    "CD61",
    "CD71",
    'CD138',
    'Kappa/Lambda ISH',
    "MPO",
    'Cytokeratin AE1/AE3'
  ]

  const descriptorList = {
    "Unremarkable": {descriptorObject: stopDescriptors, templateText: "unremarkable"},
    "Predominantly unremarkable": {descriptorObject: stopDescriptors, templateText: "predominantly unremarkable"},
    "Anisopoikilocytosis": {descriptorObject: noneDescriptors, templateText: "Anisopoikilocytosis"},
    "Hypochromasia": {descriptorObject: noneDescriptors, templateText: "hypochromasia"},
    "Polychromasia": {descriptorObject: noneDescriptors, templateText: "polychromasia"},
    "Acanthocytes": {descriptorObject: quantDescriptors, templateText: "acanthocytes"},
    "Basophilic stippling": {descriptorObject: quantDescriptors, templateText: "basophilic stippling"},
    "Bite cells": {descriptorObject: quantDescriptors, templateText: "bite cells"},
    "Blister cells": {descriptorObject: quantDescriptors, templateText: "blister cells"},
    "Burr cells": {descriptorObject: quantDescriptors, templateText: "burr cells"},
    "Echinocytes": {descriptorObject: quantDescriptors, templateText: "echinocytes"},
    "Elliptocytes": {descriptorObject: quantDescriptors, templateText: "elliptocytes"},
    "Howell-Jolly bodies": {descriptorObject: quantDescriptors, templateText: "Howell-Jolly bodies"},
    "Macroovalocytes": {descriptorObject: quantDescriptors, templateText: "macroovalocytes"},
    "Ovalocytes": {descriptorObject: quantDescriptors, templateText: "ovalocytes"},
    "Schistocytes": {descriptorObject: quantDescriptors, templateText: "schistocytes"},
    "Spherocytes": {descriptorObject: quantDescriptors, templateText: "spherocytes"},
    "Sickle cells": {descriptorObject: quantDescriptors, templateText: "sickle cells"},
    "Target cells": {descriptorObject: quantDescriptors, templateText: "target cells"},
    "Teardrop cells": {descriptorObject: quantDescriptors, templateText: "teardrop cells"},
    "Teardrop forms": {descriptorObject: quantDescriptors, templateText: "teardrop forms"},
    "Hypogranular forms": {descriptorObject: quantDescriptors, templateText: "hypogranular forms"},
    "Hypolobated forms": {descriptorObject: quantDescriptors, templateText: "hypolobated forms"},
    "Hypersegmented forms": {descriptorObject: quantDescriptors, templateText: "hypogranular forms"}, 
    "Shift to immaturity": {descriptorObject: altDegreeDescriptors, templateText: "shift to immaturity"},
    "Toxic changes": {descriptorObject: degreeDescriptors, templateText: "toxic changes"},
    "Small mature": {descriptorObject: quantDescriptors, templateText: "small, mature lymphocytes"},
    "Large granular": {descriptorObject: quantDescriptors, templateText: "large granular lymphocytes"},
    "Reactive": {descriptorObject: quantDescriptors, templateText: "reactive lymphocytes"},
    "CLL-like": {descriptorObject: quantDescriptors, templateText: "small, mature lymphocytes with clumped chromatin"},
    "Mature-appearing morphology": {descriptorObject: noneDescriptors, templateText: "mature-appearing morphology"}, 
    "Hypogranular platelets": {descriptorObject: quantDescriptors, templateText: "hypogranular platelets"},
    "Large platelets": {descriptorObject: quantDescriptors, templateText: "large platelets"},
    "Giant platelets": {descriptorObject: quantDescriptors, templateText: "giant platelets"},
    "Hemodilute": {descriptorObject: noneDescriptors, templateText: "hemodilute"},
    "Paucicellular": {descriptorObject: noneDescriptors, templateText: "paucicellular"},
    "Virtually acellular": {descriptorObject: noneDescriptors, templateText: "virtually acellular"},
    "Paucispicular": {descriptorObject: noneDescriptors, templateText: "paucispicular"},
    "Aspiculate": {descriptorObject: noneDescriptors, templateText: "aspiculate"},
    "Nuclear budding": {descriptorObject: quantDescriptors, templateText: "nuclear budding"},
    "Nuclear contour irregularity": {descriptorObject: quantDescriptors, templateText: "nuclear contour irregularity"},
    "Multinucleation": {descriptorObject: quantDescriptors, templateText: "multinucleation"},
    "Megaloblastoid changes": {descriptorObject: quantDescriptors, templateText: "megaloblastoid changes"},
    "Widely separated nuclear lobes": {descriptorObject: quantDescriptors, templateText: "widely separated nuclear lobes"},
    "Separation of nuclear lobes": {descriptorObject: quantDescriptors, templateText: "separation of nuclear lobes"},
    "Small hypolobated forms": {descriptorObject: quantDescriptors, templateText: "small hypolobated forms"},
    "Micromegakaryocytes": {descriptorObject: quantDescriptors, templateText: "micromegakaryocytes"},
    "Large hypersegmented forms": {descriptorObject: quantDescriptors, templateText: "large hypersegmented forms"},
    "Large, atypical forms with prominent nucleoli": {descriptorObject: quantDescriptors, templateText: "large, atypical forms with prominent nucleoli"},
    "Crush artifact": {descriptorObject: showsDescriptors, templateText: "crush artifact"},
    "Aspiration artifact": {descriptorObject: showsDescriptors, templateText: "aspiration artifact"},
    "Fragmented": {descriptorObject: isDescriptors, templateText: "fragmented"},
    "Subcortical": {descriptorObject: isDescriptors, templateText: "subcortical"},
    "Predominantly subcortical": {descriptorObject: isDescriptors, templateText: "predominantly subcortical"},
    "Small": {descriptorObject: isDescriptors, templateText: "small"},
    'Iron': {descriptorObject: ironDescriptors, value: '', positive: 0, negative: 0, count: 0},
    'Reticulin': {descriptorObject: reticulinDescriptors},
    'Congo red': {descriptorObject: dualDescriptors},
    'GMS': {descriptorObject: dualDescriptors},
    'AFB': {descriptorObject: dualDescriptors},
    'CD3': {descriptorObject: cd3Descriptors},
    'CD20': {descriptorObject: cd20Descriptors, value: '', positive: 0, negative: 0, count: 0},
    'CD34': {descriptorObject: cd34Descriptors, value: '', positive: 0, negative: 0, count: 0},
    'CD61': {descriptorObject: cd61Descriptors},
    'CD71': {descriptorObject: cd71Descriptors},
    'CD138': {descriptorObject: cd138Descriptors, value: '', positive: 0, negative: 0, count: 0},
    'Cytokeratin AE1/AE3': {descriptorObject: dualDescriptors},
    'Kappa/Lambda ISH': {descriptorObject: kappalambdaDescriptors},
    'MPO': {descriptorObject: mpoDescriptors},
  };

  const masterList = {
    anisoSelect: anisoList,
    rbcSelect: rbcList,
    neutrophilSelect: neutrophilList,
    lymphocyteSelect: lymphocyteList,
    monocyteSelect: monocyteList,
    plateletSelect: plateletList,
    adequacySelect: adequacyList,
    coreAdequacySelect: coreAdequacyList,
    erythroidSelect: erythroidList,
    myeloidSelect: myeloidList,
    aspMegSelect: aspMegList,
    plasmaSelect: aspPlasmaList,
    coreMegSelect: coreMegList,
    aspirateSpecialStainsSelect: aspirateSpecialStainsList,
    coreSpecialStainsSelect: specialStainsList,
    clotSpecialStainsSelect: specialStainsList,
    coreImmunostainsSelect: immunostainsList,
    clotImmunostainsSelect: immunostainsList,
    "pbCountTable": pbCountTable,
    "aspCountTable": aspCountTable
  };

  for (key in masterList){
    fillOptions(key);
  }

  function getSavedItems(){
      /*
    The variables pbCountTable and aspCountTable are utilized to calculate
    the percentages of each cell type when the user performs a differential.
    The array syntax is as follows: ['cell type', 'character associated with
    the cell type', corresponding HTML ID number, cell type handler (explained 
    below), number of cells already counted for given cell type (baseline = 0),
    row hidden value (1 = yes, 2 = no)]
  
    0 = No special type
    1 = Neutrophils and precursors on aspirate
    2 = Other myeloid cell for M:E ratio calculation
    3 = Erythroid cell for M:E ratio calculation
    4 = Circulating NRBC
    5 = Blast
    */

    let pbCountTable = {
      Blasts: {name: 'Blasts', character: 0, tableCellID: '#pbTableCell2', tableRowID: '#pbTableRow2', cellType: 5, count: 0, percent: 0, hidden: true},
      Neuts: {name: 'Neuts', character: 4, tableCellID: '#pbTableCell6', tableRowID: '#pbTableRow6', cellType: 0, count: 0, percent: 0, hidden: false},
      NRBCs: {name: 'NRBCs', character: 1, tableCellID: '#pbTableCell12', tableRowID: '#pbTableRow12', cellType: 4, count: 0, percent: 0, hidden: true},
      Lymphs: {name: 'Lymphs', character: 5, tableCellID: '#pbTableCell7', tableRowID: '#pbTableRow7', cellType: 0, count: 0, percent: 0, hidden: false},
      Monos: {name: 'Monos', character: 6, tableCellID: '#pbTableCell8', tableRowID: '#pbTableRow8', cellType: 0, count: 0, percent: 0, hidden: false},
      Metas: {name: 'Metas', character: 7, tableCellID: '#pbTableCell5', tableRowID: '#pbTableRow5', cellType: 0, count: 0, percent: 0, hidden: true},
      Myelo: {name: 'Myelo', character: 8, tableCellID: '#pbTableCell4', tableRowID: '#pbTableRow4', cellType: 0, count: 0, percent: 0, hidden: true},
      Promyelo: {name: 'Promyelo', character: 9, tableCellID: '#pbTableCell3', tableRowID: '#pbTableRow3', cellType: 0, count: 0, percent: 0, hidden: true},
      Plasma: {name: 'Plasma', character: -1, tableCellID: '#pbTableCell11', tableRowID: '#pbTableRow11', cellType: 0, count: 0, percent: 0, hidden: true},
      Eos: {name: 'Eos', character: 2, tableCellID: '#pbTableCell9', tableRowID: '#pbTableRow9', cellType: 0, count: 0, percent: 0, hidden: false},
      Basos: {name: 'Basos', character: 3, tableCellID: '#pbTableCell10', tableRowID: '#pbTableRow10', cellType: 0, count: 0, percent: 0, hidden: false},
      Atypical: {name: 'Atypical', character: -1, tableCellID: '#pbTableCell0', tableRowID: '#pbTableRow0', cellType: 0, count: 0, percent: 0, hidden: true},
      Other: {name: 'Other', character: -1, tableCellID: '#pbTableCell1', tableRowID: '#pbTableRow1', cellType: 0, count: 0, percent: 0, hidden: true},
    }
    let aspCountTable = {
      Blasts: {name: 'Blasts', character: 0, tableCellID: '#aspTableCell2', tableRowID: 'pbTableRow2', cellType: 5, count: 0, percent: 0, hidden: false},
      Neuts: {name: 'Neuts', character: 4, tableCellID: '#aspTableCell3', tableRowID: 'pbTableRow2', cellType: 1, count: 0, percent: 0, hidden: false},
      NRBCs: {name: 'NRBCs', character: 1, tableCellID: '#aspTableCell9', tableRowID: 'pbTableRow2', cellType: 3, count: 0, percent: 0, hidden: false},
      Lymphs: {name: 'Lymphs', character: 5, tableCellID: '#aspTableCell7', tableRowID: 'pbTableRow2', cellType: 0, count: 0, percent: 0, hidden: false},
      Monos: {name: 'Monos', character: 6, tableCellID: '#aspTableCell6', tableRowID: 'pbTableRow2', cellType: 2, count: 0, percent: 0, hidden: false},
      Metas: {name: 'Metas', character: 7, tableCellID: '#aspTableCell3', tableRowID: 'pbTableRow2', cellType: 1, count: 0, percent: 0, hidden: false},
      Promyelo: {name: 'Promyelo', character: -1, tableCellID: '#aspTableCell3', tableRowID: 'pbTableRow2', cellType: 1, count: 0, percent: 0, hidden: true},
      Myelo: {name: 'Myelo', character: 8, tableCellID: '#aspTableCell3', tableRowID: 'pbTableRow2', cellType: 1, count: 0, percent: 0, hidden: false},
      Plasma: {name: 'Plasma', character: 9, tableCellID: '#aspTableCell8', tableRowID: 'pbTableRow2', cellType: 0, count: 0, percent: 0, hidden: false},
      Eos: {name: 'Eos', character: 2, tableCellID: '#aspTableCell4', tableRowID: 'pbTableRow2', cellType: 2, count: 0, percent: 0, hidden: false},
      Basos: {name: 'Basos', character: 3, tableCellID: '#aspTableCell5', tableRowID: 'pbTableRow2', cellType: 2, count: 0, percent: 0, hidden: false},
      Atypical: {name: 'Atypical', character: -1, tableCellID: '#aspTableCell0', tableRowID: 'pbTableRow2', cellType: 0, count: 0, percent: 0, hidden: true},
      Other: {name: 'Other', character: -1, tableCellID: '#aspTableCell1', tableRowID: 'pbTableRow2', cellType: 0, count: 0, percent: 0, hidden: true},
    };
    let saveFileBM = JSON.parse(localStorage.getItem("saveFileBM"));
  if (saveFileBM != null) {
    if (saveFileBM.settingArray != null){
      for (let i = 0; i < saveFileBM.settingArray.length; i++){
        $("#" + saveFileBM.settingArray[i][0]).val(saveFileBM.settingArray[i][1])
        }
    }
    if (saveFileBM.pbCountTableBM != null){
      pbCountTable = saveFileBM.pbCountTableBM;
    }    
    if (saveFileBM.aspCountTableBM != null){
      aspCountTable = saveFileBM.aspCountTableBM;
    }
    if (saveFileBM.checkedObjectBM != null) {
      $.each(saveFileBM.checkedObjectBM,function(x,y){
        $(`#${x}`).prop('checked',y);
      });
    }
    if (saveFileBM.inputObjectBM != null) {
      $.each(saveFileBM.inputObjectBM,function(x,y){
        $(`#${x}`).val(y);
      });
    }  
  };
  return [pbCountTable,aspCountTable];
  };
  fillCounterLabels();
  fillSelects();
  
  function fillSelects(){
    $('.pbCounterTemplate').each(function(){
      id = this.id;
      $.each(pbCountTable, function (i) {
        if(this.character != parseInt(id.match(/\d+/g))){
          $("#"+id).append($('<option>', { 
            value: i,
            text : i,
        }))
        } else {
          $("#"+id).append($('<option>', { 
            value: i,
            text: i,
            selected: "selected"
        }))
        };
    });
    });
    $('.aspCounterTemplate').each(function(){
      id = this.id;
      $.each(aspCountTable, function (i) {
        if(this.character != parseInt(id.match(/\d+/g))){
          $("#"+id).append($('<option>', { 
            value: i,
            text : i,
        }))
        } else {
          $("#"+id).append($('<option>', { 
            value: i,
            text: i,
            selected: "selected"
        }))
        };
    });
    });
  }
 
  $('.counter').click(function(){
    let a = new Audio('https://diffpath.github.io/media/Count-Click-High2.mp3');
    let b = new Audio('https://diffpath.github.io/media/Count-Click-Med.mp3');
    let c = new Audio('https://diffpath.github.io/media/Count-Click-Low.mp3');
    let d = new Audio('https://diffpath.github.io/media/Count-Click-Blast.mp3');
    let e = new Audio('https://diffpath.github.io/media/Complete-Nice.mp3');
    let f = new Audio('https://diffpath.github.io/media/100-Soothing.mp3');
    a.volume = 0;
    b.volume = 0.01;
    c.volume = 0;
    d.volume = 0;
    e.volume = 0;
    f.volume = 0;
    a.play();
    b.play();
    c.play();
    d.play();
    e.play();
    f.play();
  })

  function fillCounterLabels(){
    for (const i in pbCountTable) {
      $(`#pbLabel${pbCountTable[i]['character']}`).html(`${pbCountTable[i]['character']}. ${pbCountTable[i]['name']}`);
      $(`#pbTemplate${pbCountTable[i]['character']}`).val(pbCountTable[i]['name']);
    }
    for (const i in aspCountTable) {
      $(`#aspLabel${aspCountTable[i]['character']}`).html(`${aspCountTable[i]['character']}. ${aspCountTable[i]['name']}`);
      $(`#aspTemplate${aspCountTable[i]['character']}`).val(aspCountTable[i]['name']);
    }
  }

  $('.navbarIcon').click(function(){
    $("#navbar").toggle();
    $("#overlay").toggle();
  });

  $('#overlay').click(function(){
    $("#navbar").hide();
    $("#overlay").hide();
  });

  $('.headerTab').click(function() {
    $(`.${this.className.split(" ")[0]}`).each(function() {
      $(this).removeClass("clicked");
      $(this).addClass("unclicked");
      $("#"+headerObject[this.id]).hide();
    });
    $(`#${headerObject[this.id]}`).show();
    $(this).addClass("clicked")
    $(this).removeClass("unclicked")
  });

  $(".laterality").change(function() {
    $(".specimen").each(function() {
      $(this).prop("checked", true);
    });
  });

  $(".specimen").change(function() {
    $(specAll).prop("checked", false)
    radioObject.specAll = 0;
  });

  $('#specAll').change(function() {
    if ($(specAll).prop('checked')) {
      $(".specimen").each(function() {
        $(this).prop("checked", true);
      });
    } else {
      $(".specimen").each(function() {
        $(this).prop("checked", false);
      });
    }
    fillSpecimen();
  });

  $('#pbCBC').bind('input', function() {
    let cbcFinal = [];
    const cbcLines = $('#pbCBC').val().split("\n");
    let cbcList = [...cbcVar]
    let toggle = true;
    for (let i = 0; i < cbcLines.length; i++) {
      cbcFinal.push(cbcLines[i].split('\t'))
    }
    for (i in cbcFinal) {
      for (j in cbcList){
        if (cbcFinal[i][0] == cbcList[j]){
          cbcObject[cbcList[j]]["value"] = cbcFinal[i][1];
          if(cbcFinal[i][1] != ""){
            delete cbcList[j];
          }
        }
      } 
      if (toggle){
        for (let j = 0; j < cbcFinal[i].length; j++){
          if (cbcFinal[i][j].indexOf("DOB:")!= -1){
            let dob = new Date(cbcFinal[i][j].slice(cbcFinal[i][j].indexOf("DOB:")).slice(5,cbcFinal[i][j].slice(cbcFinal[i][j].indexOf("DOB:")).indexOf(",")));
            let month = Date.now() - dob.getTime();
            let age_dt = new Date(month);
            let year = age_dt.getUTCFullYear();    
            patientAge = Math.abs(year - 1970);
            toggle = false;
          }
        }
      }
    }
    fillInputs();
  });

  function fillSelectHTML(id){
    let selectedList = [...masterList[id]];
    let selectHTML = "";
    let count = 0;
    let addBlank = true;
    $("."+ id).each(function(){
      let descriptorValue = '';
      if ($(this).val() != "" && selectedList.includes($(this).val())){
        selectHTML += `<div class='flex'><div><select id='${id}${count}' class='select ${id}'>`;
        const descriptorObject = descriptorList[$(this).val()]["descriptorObject"];
        const dClass = descriptorObject.class;
        for(i in selectedList){
          if (selectedList[i] == $(this).val()){
            selectHTML += `<option selected>${selectedList[i]}</option>`;
            delete selectedList[i];
          } else {
            selectHTML += `<option>${selectedList[i]}</option>`;
          }
        }
        selectHTML += "</select></div><div>";
          if (dClass == 'radio' || dClass == 'checkbox'){
            $(`.${this.id}`).each(function(){
              if ($(this).prop('checked')){
                descriptorValue = $(this).val();
              }
            })
            for (i in descriptorObject.descriptors){
              const descriptor = descriptorObject["descriptors"][i];
              const value = descriptorObject["value"][i];
              if (value != descriptorValue){
                selectHTML += `<label><input type="${dClass}" class="descriptor ${id}${count}" id="${id}${count}${descriptor}" name="${id}${count}" value="${value}">${descriptor}</label>`;
              } else {
                selectHTML += `<label><input type="${dClass}" class="descriptor ${id}${count}" id="${id}${count}${descriptor}" name="${id}${count}" value="${value}" checked>${descriptor}</label>`;
              }
            }
          } else if (dClass == 'stop'){
            
            addBlank = false;
          } else if (dClass == 'iron'){
            for (key in descriptorObject['descriptors']){
              $(`.${this.id}${key[0]}`).each(function(){
                if ($(this).prop('checked')){
                  descriptorValue = $(this).val();
                }
              })
              selectHTML += `<div><b>${key}:</b> `;
              for (i in descriptorObject['descriptors'][key]){
                const descriptor = descriptorObject["descriptors"][key][i];
                const value = descriptorObject["value"][key][i];
                if (value != descriptorValue){
                  selectHTML += `<label><input type="radio" class="descriptor ${id}${count} ${id}${count}${key[0]}" id="${id}${count}${descriptor}${key[0]}" name="${id}${count}${key}" value="${value}">${descriptor}</label>`;
                } else {
                  selectHTML += `<label><input type="radio" class="descriptor ${id}${count} ${id}${count}${key[0]}" id="${id}${count}${descriptor}${key[0]}" name="${id}${count}${key}" value="${value}" checked>${descriptor}</label>`;
                }
              }
              selectHTML += '</div>'
            }
            if (descriptorValue == 'present' && id == 'aspirateSpecialStainsSelect'){
              selectHTML += `<div><textarea class='dualCounter Iron extend' id='ironCounter' rows='1' placeholder='Count Here'>${descriptorList.Iron.value}</textarea></div>`;
              selectHTML += `<div id='ironCounterResults'><b>${positiveLabel}. Positive:&nbsp</b>${descriptorList.Iron.positive}<b>&nbsp${negativeLabel}. Negative:&nbsp</b>${descriptorList.Iron.negative}<b>&nbspTotal:&nbsp</b>${descriptorList.Iron.count}</div>`
            }
          } else if (dClass == 'select'){
            const descriptorSelect = descriptorList[$(this).val()]['descriptorObject']['descriptors'];
            const value = descriptorList[$(this).val()]['descriptorObject']['value']
            selectHTML += `<select id='${id}${count}select' class='selectDescriptor ${id}${count}' value='${value}'>`;
            for(i in descriptorSelect){
              if (value[i] == $(`#${id}${count}select`).val()){
                selectHTML += `<option value='${value[i]}' selected>${descriptorSelect[i]}</option>`;
              } else {
                selectHTML += `<option value='${value[i]}'>${descriptorSelect[i]}</option>`;
              }
            }
            selectHTML += '</select>';
          } else if (dClass == 'selectDualCount'){
            const descriptorSelect = descriptorList[$(this).val()]['descriptorObject']['descriptors'];
            const value = descriptorList[$(this).val()]['descriptorObject']['value'];
            selectHTML += `<select id='${id}${count}select' class='selectDescriptor ${id}${count}' value='${value}'>`;
            for(i in descriptorSelect){
              if (value[i] == $(`#${id}${count}select`).val()){
                selectHTML += `<option value='${value[i]}' selected>${descriptorSelect[i]}</option>`;
              } else {
                selectHTML += `<option value='${value[i]}'>${descriptorSelect[i]}</option>`;
              }
            }
            selectHTML += '</select>';
            selectHTML += `<div><textarea class='dualCounter ${$(this).val()} extend' id='${$(this).val()}Counter' rows='1' placeholder='Count Here'>${descriptorList[$(this).val()]['value']}</textarea></div>`;
            selectHTML += `<div id='${$(this).val()}CounterResults'><b>${positiveLabel}. Positive:&nbsp</b>${descriptorList[$(this).val()]['positive']}<b>&nbsp${negativeLabel}. Negative:&nbsp</b>${descriptorList[$(this).val()]['negative']}<b>&nbspTotal:&nbsp</b>${descriptorList[$(this).val()]['count']}</div>`         
          } else if (dClass == 'hidden'){
            const descriptor = descriptorObject["descriptors"][0];
            const value = descriptorObject["value"][0];
            selectHTML += `<label  style ="display: none" ><input type="${dClass}" class="descriptor ${id}${count}" id="${id}${count}${descriptor}" name="${id}${count}" value="${value}" checked>${descriptor}</label>`;
          }
          selectHTML += "</div></div>";
        }
        count++;
      })
    if (selectedList.filter(Boolean).length > 0 && addBlank){
      selectHTML += `<div><select id='${id}${count}' class='select ${id}'>`;
      for(i in selectedList){
        selectHTML += `<option>${selectedList[i]}</option>`;
      }
      selectHTML += "</select></div>"; 
    }
    $(`#${id}`).html(selectHTML);
  }

  $('.selectDiv').on('click', '.descriptor', function(){
    unClickRadio(this.id, this.name);
    fillSelectHTML(this.className.split(' ')[1].replace(/[0-9]/g, ''));
    fillReport();
  })

  $('.selectDiv').on('change', '.select', function(){
    fillSelectHTML(this.className.split(' ')[1]);
    fillReport();
  })

  $('.selectDiv').on('change', '.selectDescriptor', function(){
    fillReport();
  })

  $('.selectDiv').on('keydown', '.dualCounter', function(e){
    countNoise(e);
  })

  $('.selectDiv').on('keyup', '.dualCounter', function(e){
    window.keypressed[e.which] = false;
    countDual(this.className.split(' ')[1],this.id);
    fillReport();
  })

  $('.diffSetting').change(function(){
    countCells("pb");
    countCells("asp");
  })

  function countDual(counterClass, counterId) {
    descriptorList[counterClass]['value'] = $(`#${counterId}`).val();
    let positiveCount = ($(`#${counterId}`).val().match(new RegExp(positiveLabel, "g")) || []).length;
    let negativeCount = ($(`#${counterId}`).val().match(new RegExp(negativeLabel, "g")) || []).length;
    let totalCount = positiveCount + negativeCount;
    $(`#${counterId}Results`).html(`<div><b>${positiveLabel}. Positive:&nbsp</b>${positiveCount}<b>&nbsp${negativeLabel}. Negative:&nbsp</b>${negativeCount}<b>&nbspTotal:&nbsp</b>${totalCount}</div>`)
    descriptorList[counterClass]['positive'] = positiveCount;
    descriptorList[counterClass]['negative'] = negativeCount;
    descriptorList[counterClass]['count'] = totalCount;
  }
  
  function listText(id) {
    let listString = "";
    let stringArray = [];
    let descriptorString = "";
    let descriptorClass = "";
    let descriptorSelected = false;
    $(`.${id}`).each(function(){
      if ($(this).val()!=""){
        let prevClass = descriptorClass;
        let selectedValue = descriptorList[$(this).val()]["templateText"];
        $(`.${this.id}`).each(function(){
          if ($(this).prop('checked')){
            descriptorString = $(this).val();
            descriptorSelected = true;
          }
          descriptorClass = this.className.split(" ")[2];
        })
        if (stringArray.length == 0){
          stringArray = [[descriptorString], [[selectedValue]]];
        } else {
          if (stringArray[0].indexOf(descriptorString) == -1){
            stringArray[0].push(descriptorString)
            stringArray[1].push([selectedValue])
          } else if (descriptorClass != prevClass){
            if (descriptorSelected){
              stringArray[0].push(descriptorString)
              stringArray[1].push([selectedValue])
            } else {
              stringArray[0].push("")
              stringArray[1].push([selectedValue])
            }
          } else {
            for (i in stringArray[0]){
              if (stringArray[0][i] == descriptorString){
                stringArray[1][i].push(selectedValue)
              }
            }
          }         
        }
      }
      descriptorSelected = false;
    })
    let semicolon = false;
    for (i in stringArray[1]){
      if (stringArray[1][i].length > 1){
        semicolon = true;
        break
      }
    }
    for (i in stringArray[0]){
      if (stringArray[0].length == 1){
        listString = `${stringArray[0][0]}${addCommas(stringArray[1][0])}`;
      } else if (stringArray[0].length == 2){
        if(stringArray[1][0].length == 1 && stringArray[1][1].length == 1){
          listString = `${stringArray[0][0]}${stringArray[1][0]} and ${stringArray[0][1]}${stringArray[1][1]}`;
        } else if (id == 'coreAdequacySelect'){
          listString = `${stringArray[0][0]}${addCommas(stringArray[1][0])} and ${stringArray[0][1]}${addCommas(stringArray[1][1])}`
        } else {
          listString = `${stringArray[0][0]}${addCommas(stringArray[1][0])} with ${stringArray[0][1]}${addCommas(stringArray[1][1])}`;
        }
      } else if (stringArray[0].length > 2){
        if (i < stringArray[0].length - 1){
          if (semicolon){
            listString += `${stringArray[0][i]}${addCommas(stringArray[1][i])}; `;
          } else {
            listString += `${stringArray[0][i]}${addCommas(stringArray[1][i])}, `;
          }
        } else if (i == stringArray[0].length - 1){
          listString += `and ${stringArray[0][i]}${addCommas(stringArray[1][i])}`;
        }
      }
    }
    return listString;
  }

  function addCommas(array) {
    const length = array.length;
    let commaString = "";
    if (length == 1){
      commaString = array[0];
    } else if (length == 2){
      commaString = `${array[0]} and ${array[1]}`;
    } else if (length > 2){
      for (i in array){
        if (i < length - 1){
          commaString += `${array[i]}, `;
        } else if (i == length - 1){
          commaString += `and ${array[i]}`;
        }
      }
    }
    return commaString;
  }

  function fillOptions (id){
    $(`.${id}`).each(function(){
      for(i in masterList[id]){
        $(this).append(`<option>${masterList[id][i]}</option>`);
      }
    })
  }

  $('.counter').keydown(function(e) {
    countNoise(e);
  })

  $('.counter').keyup(function(e) {
    window.keypressed[e.which] = false;
    countCells(objectType[this.id]);
  });

  function countNoise(e) {
    if (window.keypressed[e.which]) {
      e.preventDefault();
    } else {
      if (e.which == 55 || e.which == 56 || e.which == 57 || e.which == 103 || e.which == 104 || e.which == 105) {
        window.keypressed[e.which] = true;
        new Audio('https://diffpath.github.io/media/Count-Click-High2.mp3').play();
      } else if (e.which == 52 || e.which == 53 || e.which == 54 || e.which == 100 || e.which == 101 || e.which == 102) {
        window.keypressed[e.which] = true;
        new Audio('https://diffpath.github.io/media/Count-Click-Med.mp3').play();
      } else if (e.which == 49 || e.which == 50 || e.which == 51 || e.which == 97 || e.which == 98 || e.which == 99) {
        window.keypressed[e.which] = true;
        new Audio('https://diffpath.github.io/media/Count-Click-Low.mp3').play();
      } else if (e.which == 48 || e.which == 96) {
        window.keypressed[e.which] = true;
        new Audio('https://diffpath.github.io/media/Count-Click-Blast.mp3').play();
      }
    }
  }

  function countCells(id){
    let ccount = parseInt($(typeObject[id]["ccountID"]).val());
    let dcount = parseInt($(typeObject[id]["dcountID"]).val());
    if ($("#countExtra").prop('checked') == false && ccount == dcount){
      return;
    }
    let table = typeObject[id]["table"];
    let countSum = 0, myeloidSum = 0, erythroidSum = 0, neutSum = 0;
    const totalCount = cellCounter(table, id);
    $(typeObject[id]["ccountID"]).val(totalCount);

    if (totalCount != 0) {
      $('#diffCount').show();
      $(typeObject[id]["tableDivID"]).show();
    } else {
      if($('#pbCCount').val() == 0 && $('#aspCCount').val() == 0){
        $('#diffCount').hide();
      }
      $(typeObject[id]["tableDivID"]).hide();
    }
    
    if ($("#roundDesired").prop('checked')){
      let differenceArray = [];
      for (const i in table){
        table[i]["percent"] = (Math.round((table[i]["count"] / totalCount) * dcount) / (dcount/100)).toFixed(1);
        if (table[i]["cellType"] != 4){
          countSum += parseFloat(table[i]["percent"]);
        }
      }
      let countDifference = (countSum - 100);
      if (countDifference > 0){
        while ((countDifference).toFixed(1) != 0){
          for (const i in table){
            if (table[i]["count"] > 0){
              let differenceFactor = ((table[i]["count"] / totalCount) * 100 - table[i]["percent"] + 100/dcount) / table[i]["count"];
              differenceArray.push({cellType: i, difference: differenceFactor})
            }
          }
          for (i in differenceArray){
            differenceArray.sort((a, b) => a.difference - b.difference);
          }
          table[differenceArray[0]["cellType"]]["percent"] = parseFloat((table[differenceArray[0]["cellType"]]["percent"]-100/dcount)).toFixed(1);
          countDifference -= 100/dcount;
          countSum -= 100/dcount;
        }
      } else if (countDifference < 0){
        while ((countDifference).toFixed(1) != 0){
          for (const i in table){
            if (table[i]["count"] > 0){
              let differenceFactor = ((table[i]["count"] / totalCount) * 100 - table[i]["percent"] - 100/dcount) / table[i]["count"];
              differenceArray.push({cellType: i, difference: differenceFactor})
            }
          }
          for (i in differenceArray){
            differenceArray.sort((a, b) => b.difference - a.difference);
          }
          table[differenceArray[0]["cellType"]]["percent"] = parseFloat((table[differenceArray[0]["cellType"]]["percent"]+100/dcount)).toFixed(1);
          countDifference += 100/dcount;
          countSum += 100/dcount;
        }
      }
    } else {
      for (const i in table){
        table[i]["percent"] = (Math.round((100*table[i]["count"]/totalCount)*10)/10).toFixed(1);
        if (table[i]["cellType"] == 0 || table[i]["cellType"] == 5){
          countSum += parseFloat(table[i]["percent"]);
        } else if (table[i]["cellType"] == 1){
          countSum += parseFloat(table[i]["percent"]);
          myeloidSum += parseFloat(table[i]["percent"]);
          neutSum += parseFloat(table[i]["percent"]);
        } else if (table[i]["cellType"] == 2){
          countSum += parseFloat(table[i]["percent"]);
          myeloidSum += parseFloat(table[i]["percent"]);
        } else if (table[i]["cellType"] == 3){
          countSum += parseFloat(table[i]["percent"]);
          erythroidSum += parseFloat(table[i]["percent"]);
        }
      }
    }
     
    $(typeObject[id]["tcountID"]).val(countSum.toFixed(1)+"%")

    for (const i in table){
      if (id == "asp" && table[i]["percent"]>0){
        if (table[i]['cellType'] == 5 && $('#blastCheck').prop('checked')){
          myeloidSum += parseFloat(table[i]["percent"]);
        }
        if (table[i]['cellType'] == 1 || table[i]['cellType'] == 2){
          myeloidSum += parseFloat(table[i]["percent"]);
          if (table[i]['cellType'] == 1){
            neutSum += parseFloat(table[i]["percent"]);
          }
        } else if (table[i]['cellType'] == 3){
          erythroidSum += parseFloat(table[i]["percent"]);
        }
      }
      if (table[i]["cellType"] != 4 && totalCount > 0) {
        if (id == "asp"){
          if (table[i]["cellType"] == 1){
            $(typeObject[id]["characterID"] + table[i]["character"]).val(table[i]["percent"] + "%");
          } else {
            $(typeObject[id]["characterID"] + table[i]["character"]).val(table[i]["percent"] + "%");
            $(table[i]["tableCellID"]).html(table[i]["percent"] + "%");
          }
        } else {
          $(typeObject[id]["characterID"] + table[i]["character"]).val(table[i]["percent"] + "%");
          $(table[i]["tableCellID"]).html(table[i]["percent"] + "%");
        }
       
      } else if (totalCount > 0) {
        $(typeObject[id]["characterID"] + table[i]["character"]).val(table[i]["percent"]);
        $(table[i]["tableCellID"]).html(table[i]["percent"]);
      } else {
        $(typeObject[id]["characterID"] + table[i]["character"]).val("");
        $(table[i]["tableCellID"]).html("");
      }
      if (table[i]['hidden']) {
        if(table[i]['count'] > 0){
          $(table[i]['tableRowID']).show();
        } else {
          $(table[i]['tableRowID']).hide();
        }
      }
    }
    if (id == "asp"){
      if (erythroidSum != 0){
        const meRatio = (Math.round((myeloidSum/erythroidSum)*10)/10).toFixed(1);
        $('#meRatio').val(`${meRatio}:1`);
        $('#aspTableCell99').html(`${meRatio}:1`);
        if ($('#erythroidPredomSetting').val() != '' && meRatio < parseFloat($('#erythroidPredomSetting').val())){
          $('#myeloidPredominance').prop('checked', false);
          $('#erythroidPredominance').prop('checked', true);
          fillReport();
        } else if ($('#myeloidPredomSetting').val() != '' && meRatio > parseFloat($('#myeloidPredomSetting').val())){
          $('#myeloidPredominance').prop('checked', true);
          $('#erythroidPredominance').prop('checked', false);
          fillReport();
        } else if ($('#erythroidPredomSetting').val() != '' && $('#myeloidPredomSetting').val() != ''){
          $('#myeloidPredominance').prop('checked', false);
          $('#erythroidPredominance').prop('checked', false);
          fillReport();
        }
      } else if (erythroidSum == 0){
        $('#meRatio').val("N/A");
        $('#aspTableCell99').html("N/A");
        $('#myeloidPredominance').prop('checked', false);
          $('#erythroidPredominance').prop('checked', false);
          fillReport();
      }
      $('#aspTableCell3').html((neutSum).toFixed(1) + "%");
    }
    if (totalCount != 0){
      if (dcount == totalCount){
        new Audio('https://diffpath.github.io/media/Complete-Nice.mp3').play(); 
      } else if ((totalCount % 100) == 0){
        new Audio('https://diffpath.github.io/media/100-Soothing.mp3').play();
      }
    }   
    $(rightPanelFinal).show();
  };

  function cellCounter(x, y) {
    let totalCount = 0;
    for (var i in x){
      x[i]["count"] = ($(typeObject[y]["counterID"]).val().match(new RegExp(x[i]["character"], "g")) || []).length;
      if (x[i]["cellType"] != 4) {
        totalCount += x[i]["count"];
      }
    }
    return totalCount
  }

  $('.pbCounterTemplate').change(function(){
    checkDuplicate(this.className.split(' ')[0],this.id,$(this).val());
  }
  );

  $('.aspCounterTemplate').change(function(){
    checkDuplicate(this.className.split(' ')[0],this.id,$(this).val());
  }
  );

  function checkDuplicate(thisClass,id,val){
    let type = objectType[thisClass];
    let table = typeObject[type]['table'];
    let idNum = parseInt(id.match(/\d+/g));
    $.each(table,function(i){
      if (i == val){
        $(`#${type}Template${idNum}`).css('background-color','white');
        if (table[val]["character"] != -1){
          $(`#${type}Template${this.character}`).val(' ');
          $(`#${type}Template${this.character}`).css('background-color','rgb(255, 95, 95)');
        } else {
          countCells(type);
        } 
        this.character = idNum;
      } else if (this.character == idNum){
        this.character = -1;
      }
    })

    if (thisClass == 'pbCounterTemplate'){
      pbCountTable[val]['character'] = idNum;
    } else if (thisClass == 'aspCounterTemplate'){
      aspCountTable[val]['character'] = idNum;
    }
    fillCounterLabels();
  };

  $('#pbDCount').change(function(){
    $("#pbTableCountHeader").html("Peripheral Blood (" + $(this).val() + " cells)");
    countCells("pb");
  });

  $('#aspDCount').change(function(){
    if ($('#tpCheck').prop('checked')){
      $("#aspTableCountHeader").html("Touch Preparation (" + $(this).val() + " cells)")
    } else {
      $("#aspTableCountHeader").html("Aspirate Smear (" + $(this).val() + " cells)")
    }
    countCells("asp");
  });

  $('#tpCheck').click(function(){
    let dcount;
    if ($('#aspDCount').val() == ""){
      dcount = $('#aspDCount').attr('placeholder');
    } else {
      dcount = $('#aspDCount').val();
    }
    if ($('#tpCheck').prop('checked')){
      $("#aspTableCountHeader").html("Touch Preparation (" + dcount + " cells)")
    } else {
      $("#aspTableCountHeader").html("Aspirate Smear (" + dcount + " cells)")
    }
    fillReport();
  });

  $('#blastCheck').change(function(){
    countCells("asp");
  })

  $('input:radio').on('click', function() {
    unClickRadio(this.id, this.name);
    fillReport();
  });

  function unClickRadio (id, name){
    $(`[name='${name}']`).each(function() {
      if (this.id != id) {
        radioObject[this.id] = 0;
      }
    });
    if (radioObject[id] == 1) {
      radioObject[id] = 0;
      $(`#${id}`).prop("checked", false);
    } else {
      radioObject[id] = 1;
    }
  }
  
  $('input:checkbox').on('change', function() {
    $(this).siblings('input[type="checkbox"]').prop('checked', false);
  });

  $('.form').change(function() {
    fillReport();
  });

  $('.cellularityDiv').keyup(function(){
    let showID = "";
    $(this).children().each(function(){
      if (this.value != ""){
        showID = $(this).parent().attr('id');
      }
    });  
    $('.cellularityDiv').each(function(){
      console.log(this.id + " " + showID)
      if (showID != "" && this.id != showID){
        $(this).hide();
      } else if (showID == ""){
        $(this).show();
      }
    })
  })


  $('.cellularity').keyup(function() {
    if ($('#coreCellularity').val() == '' && $('#coreCellularityRangeLow').val() == '' && $('#coreCellularityRangeHigh').val() == ''){
      $('#hypocellular').prop('checked', false);
      $('#normocellular').prop('checked', false);
      $('#hypercellular').prop('checked', false);
      $('#cellularityMarked').prop('checked', false);
      $('#cellularityMild').prop('checked', false);
    } else if (patientAge != -1){
      if ($('#markedlyHypocellular').val() != '' && (100-patientAge-$('#coreCellularity').val())>=parseFloat($('#markedlyHypocellular').val())){
        $('#hypocellular').prop('checked', true);
        $('#normocellular').prop('checked', false);
        $('#hypercellular').prop('checked', false);
        $('#cellularityMarked').prop('checked', true);
        $('#cellularityMild').prop('checked', false);
      } else if ($('#mildlyHypocellularMax').val() != '' && (100-patientAge-$('#coreCellularity').val())>=parseFloat($('#mildlyHypocellularMax').val())){
        $('#hypocellular').prop('checked', true);
        $('#normocellular').prop('checked', false);
        $('#hypercellular').prop('checked', false);
        $('#cellularityMarked').prop('checked', false);
        $('#cellularityMild').prop('checked', false);      
      } else if ($('#mildlyHypocellularMin').val() != '' && (100-patientAge-$('#coreCellularity').val())>=parseFloat($('#mildlyHypocellularMin').val())){
        $('#hypocellular').prop('checked', true);
        $('#normocellular').prop('checked', false);
        $('#hypercellular').prop('checked', false);
        $('#cellularityMarked').prop('checked', false);
        $('#cellularityMild').prop('checked', true);      
      } else if ($('#mildlyHypercellularMin').val() != '' && 100-patientAge-$('#coreCellularity').val()>=parseFloat($('#mildlyHypercellularMin').val())*-1){
        $('#hypocellular').prop('checked', false);
        $('#normocellular').prop('checked', true);
        $('#hypercellular').prop('checked', false);
        $('#cellularityMarked').prop('checked', false);
        $('#cellularityMild').prop('checked', false);      
      } else if ($('#mildlyHypercellularMax').val() != '' && 100-patientAge-$('#coreCellularity').val()>=parseFloat($('#mildlyHypercellularMax').val())*-1){
        $('#hypocellular').prop('checked', false);
        $('#normocellular').prop('checked', false);
        $('#hypercellular').prop('checked', true);
        $('#cellularityMarked').prop('checked', false);
        $('#cellularityMild').prop('checked', true);      
      } else if ($('#markedlyHypercellular').val() != '' && 100-patientAge-$('#coreCellularity').val()>=parseFloat($('#markedlyHypercellular').val())*-1){
        $('#hypocellular').prop('checked', false);
        $('#normocellular').prop('checked', false);
        $('#hypercellular').prop('checked', true);
        $('#cellularityMarked').prop('checked', false);
        $('#cellularityMild').prop('checked', false);      
      } else if ($('#markedlyHypercellular').val() != '' && 100-patientAge-$('#coreCellularity').val()<=parseFloat($('#markedlyHypercellular').val())*-1){
        $('#hypocellular').prop('checked', false);
        $('#normocellular').prop('checked', false);
        $('#hypercellular').prop('checked', true);
        $('#cellularityMarked').prop('checked', true);
        $('#cellularityMild').prop('checked', false);      
      }
    }
    fillReport();
  });

  $('.copyButton').click(function(){
    const element = document.getElementById(this.className.split(' ')[1]);
    if($(element).is(":visible")){
    const tempElement = document.createElement('div');
    const clonedElement = element.cloneNode(true);
    tempElement.appendChild(clonedElement);
    document.body.appendChild(tempElement);
    const selection = document.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(tempElement);
    selection.addRange(range);
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    if($('#copyAlert').is(":hidden")){
      $('#copyAlert').html('Text copied.');
      $('#copyAlert').css("background-color", "rgb(100, 255, 95)")
      $('#copyAlert').show().animate({bottom: '20px'},700).animate({bottom: '20px'},1000).animate({bottom: '-5%'},1000,function(){
      $('#copyAlert').hide();
      });
    }
  } else {
    if($('#copyAlert').is(":hidden")){
      $('#copyAlert').html('No text to copy.');
      $('#copyAlert').css("background-color", "rgb(255, 95, 95)")
      $('#copyAlert').show().animate({bottom: '20px'},700).animate({bottom: '20px'},1000).animate({bottom: '-5%'},1000,function(){
      $('#copyAlert').hide();
      });
    }
  }
  });

  function fillInputs() {
  console.log(cbcObject)
    for (i in cbcObject){
      if (cbcObject[i]["value"].indexOf('High') != -1){
        $(`#${cbcObject[i]["high"]}`).prop('checked', true);
      } else if (cbcObject[i]["value"].indexOf('Low') != -1){
        $(`#${cbcObject[i]["low"]}`).prop('checked', true);
      } else {
        $(`#${cbcObject[i]["normal"]}`).prop('checked', true);
      }
    }
    fillReport();
  }

  function fillReport(){
    let finalText = "";
    const specText = fillSpecimen();
    const pb = fillPB();
    const asp = fillAsp();
    const touch = fillTouch();
    const core = fillCore();
    const clot = fillClot();
    const specialStains = fillSpecialStains();
    const immunostains = fillImmunostains();

    if (pb != ""){
      finalText += "<b>Peripheral Blood Smear</b><br>" + pb;
    }

    if (finalText != ""){
      if (asp != ""){
        finalText += "<br><br><b>Aspirate Smear";
        if (touch != ""){
          finalText += "/Touch Preparation</b><br>" + asp + "<br><br>" + touch;
        } else {
          finalText += "</b><br>" + asp;
        }
      } else if (touch != ""){
        finalText += "<br><br><b>Touch Preparation</b><br>" + touch;
      }
    } else {
      if (asp != ""){
        finalText += "<b>Aspirate Smear";
        if (touch != ""){
          finalText += "/Touch Preparation</b><br>" + asp + "<br><br>" + touch;
        } else {
          finalText += "</b><br>" + asp;
        }
      } else if (touch != ""){
        finalText += "<b>Touch Preparation</b><br>" + touch;
      }
    }

    if (finalText != ""){
      if (core != ""){
        finalText += "<br><br><b>Core Biopsy";
        if (clot != ""){
          finalText += "/Particle Clot</b><br>" + core + "<br><br>" + clot;
        } else {
          finalText += "</b><br>" + core;
        }
      } else if (clot != ""){
        finalText += "<br><br><b>Particle Clot</b><br>" + clot;
      }
    } else {
      if (core != ""){
        finalText += "<b>Core Biopsy";
        if (clot != ""){
          finalText += "/Particle Clot</b><br>" + core + "<br><br>" + clot;
        } else {
          finalText += "</b><br>" + core;
        }
      } else if (clot != ""){
        finalText += "<b>Particle Clot</b><br>" + clot;
      }
    }

    if (finalText != ""){
      if (specialStains != ""){
        finalText += `<br><br><b>Special Stains</b><br>${specialStains}`;
      } 
    } else if (specialStains != ""){
      finalText += `<b>Special Stains</b><br>${specialStains}`;
    }

    if (finalText != ""){
      if (immunostains != ""){
        if (specialStains == ''){
          finalText += '<br>'
        }
        finalText += `<br><b>Immunohistochemical Stains</b><br>${immunostains}`;
      } 
    } else if (immunostains != ""){
      finalText += `<b>Immunohistochemical Stains</b><br>${immunostains}`;
    }
    if(finalText != '' || specText != ''){
      $(rightPanelFinal).show();
      if (finalText != ''){
        $('#finalDiv').html(finalText);
      }
      if (specText != ''){
        $('#specDiv').html(specText);
      }
    } else {
      $(rightPanelFinal).hide();
      $('#specDiv').html(specText);
      $('#finalDiv').html(finalText);
    }
  }

  function fillSpecimen() {
    var specText = '';
    var specArray = [];
    if ($('#specPB').prop("checked")) {
      specArray.push("peripheral blood smear");
    }
    if ($('#specAsp').prop("checked")) {
      specArray.push("bone marrow aspirate");
    }
    if ($('#specTP').prop("checked")) {
      specArray.push("touch preparations");
    }
    if ($('#specPC').prop("checked")) {
      specArray.push("particle clot");
    }
    if ($('#specCB').prop("checked")) {
      if ($('#latLeft').prop("checked")) {
        specArray.push("left posterior iliac crest bone marrow core biopsy");
      } else if ($('#latRight').prop("checked")) {
        specArray.push("right posterior iliac crest bone marrow core biopsy");
      } else if ($('#latBilateral').prop("checked")) {
        specArray.push("bilateral posterior iliac crest bone marrow core biopsies");
      } else {
        specArray.push("posterior iliac crest bone marrow core biopsy");
      }
    }
    specText = addCommas(specArray);
    if (specText != ''){
      specText = `<b>A, B: ${specText.charAt(0).toUpperCase()}${specText.slice(1)}:</b><br><br>`;
    }
    return specText;
  }

  function fillPB() {
    let pbText = "";
    const neutListString = listText("neutrophilSelect");
    const anisoListString = listText('anisoSelect');
    const pltListString = listText("plateletSelect");
    const monoListString = listText('monocyteSelect');
    
    if ($('#hgbNormal').prop("checked")) {
      $("#hgbMildMarked").hide();
      pbText += "The peripheral blood smear shows adequate hemoglobin. ";
    } else if ($('#hgbLow').prop("checked")) {
      $("#hgbMildMarked").show();
      pbText += "The peripheral blood smear shows";
      if ($('#hgbMarked').prop("checked")) {
        pbText += " marked";
      } else if ($('#hgbMild').prop("checked")) {
        pbText += " mild";
      }
      if ($('#mcvLow').prop("checked")) {
        pbText += " microcytic";
      } else if ($('#mcvNormal').prop("checked")) {
        pbText += " normocytic";
      } else if ($('#mcvHigh').prop("checked")) {
        pbText += " macrocytic";
      }
      if ($('#hypochromic').prop("checked") && ($('#mcvLow').prop("checked") || $('#mcvNormal').prop("checked") || $('#mcvHigh').prop("checked"))) {
        pbText += ", hypochromic";
      } else if ($('#hypochromic').prop("checked")) {
        pbText += " hypochromic";
      }
      pbText += " anemia. "
    } else if ($('#hgbHigh').prop("checked")) {
      $("#hgbMildMarked").show();
      pbText += "The peripheral blood smear shows";
      if ($('#hgbMarked').prop("checked")) {
        pbText += " marked";
      } else if ($('#hgbMild').prop("checked")) {
        pbText += " mild";
      }
      pbText += " polycythemia. ";
    }

    if ($("#anisoPresent").prop("checked") || $("#anisoMild").prop("checked") || $("#anisoMarked").prop("checked")) {
      ($('#anisoDiv').show());
      ($('#anisoSelect').show());
    } else if ($("#anisoAbsent").prop("checked")){
      ($('#anisoDiv').hide());
      ($('#anisoSelect').hide());
    }

    if ($("#polyPresent").prop("checked") || $("#polySlight").prop("checked") || $("#polyMarked").prop("checked")) {
      pbText += "Red blood cells show ";
      if ($("#polyPresent").prop("checked")){
        pbText += 'polychromasia';
      } else if ($("#polySlight").prop("checked")){
        pbText += 'slight polychromasia';
      } else if ($("#polyMarked").prop("checked")){
        pbText += 'marked polychromasia';
      }
      if ($("#anisoAbsent").prop("checked")){
        pbText += '. ';
      } else if (anisoListString != ''){
        if ($("#anisoPresent").prop("checked")){
          pbText += ` and anisopoikilocytosis including ${anisoListString}. `;
        } else if ($("#anisoMild").prop("checked")){
          pbText += ` and mild anisopoikilocytosis including ${anisoListString}. `;
        } else if ($("#anisoMarked").prop("checked")){
          pbText += ` and marked anisopoikilocytosis including ${anisoListString}. `;
        }
      } else {
        if ($("#anisoPresent").prop("checked")){
          pbText += ' and nonspecific anisopoikilocytosis. ';
        } else if ($("#anisoMild").prop("checked")){
          pbText += ' and mild nonspecific anisopoikilocytosis. ';
        } else if ($("#anisoMarked").prop("checked")){
          pbText += ' and marked nonspecific anisopoikilocytosis. ';
        } else {
          pbText += '. ';
        }
      }
    } else if ($("#anisoAbsent").prop("checked")){
      pbText += 'Red blood cells show unremarkable morphology. '
    } else {
        if (anisoListString != ''){
        if ($("#anisoPresent").prop("checked")){
          pbText += `Red blood cells show anisopoikilocytosis including ${anisoListString}. `;
        } else if ($("#anisoMild").prop("checked")){
          pbText += `Red blood cells show mild anisopoikilocytosis including ${anisoListString}. `;
        } else if ($("#anisoMarked").prop("checked")){
          pbText += `Red blood cells show marked anisopoikilocytosis including ${anisoListString}. `;
        }
      } else {
        if ($("#anisoPresent").prop("checked")){
          pbText += 'Red blood cells show nonspecific anisopoikilocytosis. ';
        } else if ($("#anisoMild").prop("checked")){
          pbText += 'Red blood cells show mild nonspecific anisopoikilocytosis. ';
        } else if ($("#anisoMarked").prop("checked")){
          pbText += 'Red blood cells show marked nonspecific anisopoikilocytosis. ';
        } else if ($("#anisoAbsent").prop("checked")){
        }
      }
    }

    if ($("#nrbcRare").prop("checked")) {
      pbText += "Rare nucleated red blood cells are identified. ";
    } else if ($("#nrbcOccasional").prop("checked")){
      pbText += "Occasional nucleated red blood cells are identified. ";
    } else if ($("#nrbcFrequent").prop("checked")) {
      pbText += "Frequent nucleated red blood cells are identified. ";
    } else if ($("#nrbcPresent").prop("checked")) {
      pbText += "Nucleated red blood cells are identified. ";
    }
    
      if ($("#neutLow").prop("checked")) {
        $("#neutMildMarked").show();
        pbText += "There is"
        if ($('#neutMarked').prop("checked")) {
          pbText += " marked";
        } else if ($('#neutMild').prop("checked")) {
          pbText += " mild";
        }
        if (neutListString == "") {
          pbText += " absolute neutropenia. Neutrophils show unremarkable morphology. ";
        } else {
          pbText += " absolute neutropenia. Neutrophils show " + neutListString + ". ";
        }
      } else if ($("#neutNormal").prop("checked")) {
        $("#neutMildMarked").hide();
        if (neutListString == "") {
          pbText += "Neutrophils are adequate and show unremarkable morphology. ";
        } else {
          pbText += " Neutrophils are adequate. Neutrophils show " + neutListString + ". ";
        }
      } else if ($("#neutHigh").prop("checked")) {
        $("#neutMildMarked").show();
        pbText += "There is";
        if ($('#neutMarked').prop("checked")) {
          pbText += " marked";
        } else if ($('#neutMild').prop("checked")) {
          pbText += " mild";
        }
        if (neutListString == "") {
          pbText += " absolute neutrophilia. Neutrophils show unremarkable morphology. ";
        } else {
          pbText += " absolute neutrophilia. Neutrophils show " + neutListString + ". ";
        }
      } else if (neutListString != ""){
        pbText += `Neutrophils show ${neutListString}. `;
      }

      if ($("#lymphLow").prop("checked")) {
        $("#lymphMildMarked").show();
        pbText += "There is"
        if ($('#lymphMarked').prop("checked")) {
          pbText += " marked";
        } else if ($('#lymphMild').prop("checked")) {
          pbText += " mild";
        }
        pbText += " absolute lymphopenia. "
        if ($('#lymphocyte_select').val() == "unremarkable") {
          pbText += "Lymphocytes show unremarkable morphology. ";
        }
      } else if ($("#lymphNormal").prop("checked") && $('#lymphocyte_select').val() == "unremarkable") {
        $("#lymphMildMarked").hide();
        pbText += "Lymphocytes are adequate and show unremarkable morphology. ";
      } else if ($("#lymphHigh").prop("checked")) {
        $("#lymphMildMarked").show();
        pbText += "There is";
        if ($('#lymphMarked').prop("checked")) {
          pbText += " marked";
        } else if ($('#lymphMild').prop("checked")) {
          pbText += " mild";
        }
        pbText += " absolute lymphocytosis. "
      } else {
/*         pbText += " Lymphocytes show " + lymph_list_string.toLowerCase() + ". ";
 */      }

      if ($("#monosLow").prop("checked")) {
        $("#monosMildMarked").show();
        pbText += "There is"
        if ($('#monosMarked').prop("checked")) {
          pbText += " marked";
        } else if ($('#monosMild').prop("checked")) {
          pbText += " mild";
        }
        pbText += " absolute monocytopenia. "
      } else if ($("#monosHigh").prop("checked")) {
        $("#monosMildMarked").show();
        pbText += "There is";
        if ($('#monosMarked').prop("checked")) {
          pbText += " marked";
        } else if ($('#monosMild').prop("checked")) {
          pbText += " mild";
        }
        if (monoListString == "") {
          pbText += " absolute monocytosis. Monocytes show mature-appearing morphology. ";
        } else {
          pbText += " absolute monocytosis. Monocytes show " + monoListString + ". ";
        }
      } else if (monoListString != ""){
        pbText += `Monocytes show ${monoListString}. `;
      }

      if ($("#eosHigh").prop("checked") && $("#basoHigh").prop("checked")) {
        pbText += "There is absolute eosinophilia and basophilia. ";
      } else if ($("#eosHigh").prop("checked")){
        pbText += "There is absolute eosinophilia. ";
      } else if ($("#basoHigh").prop("checked")){
        pbText += "There is absolute basophilia. ";
      }

      if ($("#pltLow").prop("checked")) {
        $("#pltMildMarked").show();
        pbText += "Platelets are";
        if ($("#pltMild").prop("checked")) {
          pbText += " mildly";
        } else if ($("#pltMarked").prop("checked")) {
          pbText += " markedly";
        }
        if (pltListString == "") {
          pbText += " decreased with unremarkable morphology. "
        } else {
          pbText += " decreased with " + pltListString + ". ";
        }
      } else if ($("#pltNormal").prop("checked")){
        $("#pltMildMarked").hide();
        if (pltListString == "") {
          pbText += "Platelets are adequate with unremarkable morphology. ";
        } else {
          pbText += "Platelets are adequate with " + pltListString + ". ";  
        }
      } else if ($("#pltHigh").prop("checked")){
        $("#pltMildMarked").show();
        pbText += "Platelets are";
        if ($("#pltMild").prop("checked")){
          pbText += " mildly";
        } else if ($("#pltMarked").prop("checked")) {
          pbText += " markedly";
        }
        if (pltListString == ""){
          pbText += " increased with unremarkable morphology. ";
        } else {
          pbText += " increased with " + pltListString + ". ";
        }
      } else if (pltListString != ""){
        pbText += pltListString.charAt(0).toUpperCase() + pltListString.slice(1) + " are seen. "
      }
      if ($("#circulatingBlast").prop("checked")){
        if ($("#circulatingPlasma").prop("checked")){
          pbText += "No circulating blasts or plasma cells are identified. "
        } else {
          pbText += "No circulating blasts are identified. "
        }
      } else if ($("#circulatingPlasma").prop("checked")){
        pbText += "No circulating plasma cells are identified. "
      }

    return pbText
  }

  function fillAsp() {
    let aspText = "";
    const adequacyListString = listText("adequacySelect");
    const erythroidListString = listText("erythroidSelect").toLowerCase();
    const myeloidListString = listText("myeloidSelect").toLowerCase();
    const megakaryocyteListString = listText("aspMegSelect").toLowerCase();
    const plasmaListString = listText("plasmaSelect").toLowerCase();

    if (erythroidListString != ""){
      $("#erythroid_unremarkable").prop("checked", false);
    }

    if (myeloidListString != ""){
      $("#myeloid_unremarkable").prop("checked", false);
    }

    if (megakaryocyteListString != ""){
      $("#megakaryocyte_unremarkable").prop("checked", false);
    }
    
    if ($('#aspAdequate').prop("checked") && adequacyListString == "") {
      aspText += "The bone marrow aspirate smears are cellular and adequate for interpretation. ";
    } else if ($('#aspAdequate').prop("checked")) {
      aspText += "The bone marrow aspirate smears are " + adequacyListString + " but overall adequate for interpretation. ";
    } else if ($('#aspSuboptimal').prop("checked")) {
      if (adequacyListString == ""){
        aspText += "The bone marrow aspirate smears are suboptimal for evaluation, limiting the accuracy of a differential count. ";
      } else {
        aspText += "The bone marrow aspirate smears are " + adequacyListString + " limiting the accuracy of a differential count. "
      }
      if ($('#tpCheck').prop('checked')){
        aspText += "The bone marrow touch preparations are cellular, and therefore, a ";
        if ($('#aspDCount').val()>0 && $('#aspDCount').val()<500){
          aspText += "limited ";
        }
        aspText += "differential count was performed on the touch preparations. "
        tpMentioned = true;
      } else if ($('#aspCCount').val()>0){
        aspText += "Nevertheless, a "
        if ($('#aspDCount').val()>0 && $('#aspDCount').val()<500){
          aspText += "limited ";
        }
        aspText += "differential count was performed on the aspirate smears. "
      }
    } else if ($('#aspInadequate').prop("checked") && adequacyListString == "") {
      aspText += "The bone marrow aspirate smears are inadequate for interpretation. ";
    } else if ($('#aspInadequate').prop("checked")) {
      aspText += "The bone marrow aspirate smears are " + adequacyListString + " precluding a meaningful marrow differential. ";
    }

    if ($('#erythroidPredominance').prop("checked")){
      aspText += "There is an erythroid predominance. ";
    } else if ($('#myeloidPredominance').prop("checked")){
      aspText += "There is a myeloid predominance. ";
    }

    if ($('#erythroid_unremarkable').prop("checked") && $('#myeloid_unremarkable').prop("checked")) {
      aspText += "Myeloid and erythroid precursors show progressive maturation with unremarkable morphology. ";
    } else {
      if ($('#erythroid_unremarkable').prop("checked")){
        aspText += "Erythroid precursors show progressive maturation with unremarkable morphology. ";
      } else if (erythroidListString != ""){
        aspText += "Erythroid precursors show " + erythroidListString + ". ";
      }
      if ($('#myeloid_unremarkable').prop("checked")){
        aspText += "Myeloid precursors show progressive maturation with unremarkable morphology. ";
      } else if (myeloidListString != ""){
        aspText += "Myeloid precursors show " + myeloidListString + ". ";
      }
    };

    if ($('#megakaryocyte_unremarkable').prop("checked")) {
      aspText += "Megakaryocytes appear adequate with unremarkable morphology. ";
    } else if (megakaryocyteListString != ""){
      aspText += "Megakaryocytes show " + megakaryocyteListString + ". ";
    }

    if ($('#blast_adequate').prop("checked")) {
      if ($('#plasmaAdequate').prop("checked")){
        aspText += "Blasts and plasma cells are not increased. ";
      } else {
        aspText += "Blasts are not increased. ";
      }
    } else if ($('#blast_increased').prop("checked")){
      aspText += "Blasts are significantly increased. ";
    }

    if ($('#plasmaAdequate').prop("checked") && !$('#blast_adequate').prop("checked")) {
      aspText += "Plasma cells are not increased. ";
    } else if ($('#plasmaIncreased').prop("checked")){
      aspText += "Plasma cells are significantly increased";
      if (plasmaListString != ''){
        aspText += ` and show ${plasmaListString}`;
        $('#plasmaUnremarkable').prop("checked", false)
      } else if ($('#plasmaUnremarkable').prop("checked")){
        aspText += ' but show unremarkable morphology'
      }
      aspText += '. '
    }

    return aspText;
  }

  function fillTouch(){
    let touchText = "";
    if ($('#touchSimilar').prop("checked")){
      if ($('#touchPaucicellular').prop("checked") && $('#aspAdequate').prop("checked")){
        touchText += "The bone marrow touch preparations are paucicellular but show findings otherwise similar to the aspirate smears.";
      } else if ($('#touchPaucicellular').prop("checked")){
        touchText += "The bone marrow touch preparations are paucicellular and show findings similar to the aspirate smears.";
      } else {
        touchText += "The bone marrow touch preparations are cellular and show findings similar to the aspirate smears.";
      }
    }
    return touchText;
  }

  function fillCore(){
    let coreText = "";
    const adequacyListString = listText("coreAdequacySelect");
    if ($('#coreAdequate').prop("checked") && adequacyListString == "") {
      coreText += "The bone marrow core biopsy is adequate for interpretation. ";
    } else if ($('#coreAdequate').prop("checked")) {
      coreText += "The bone marrow core biopsy " + adequacyListString + " but is overall adequate for interpretation. ";
    } else if ($('#coreInadequate').prop("checked") && adequacyListString == "") {
      coreText += "The bone marrow core biopsy is inadequate for interpretation. ";
    } else if ($('#coreInadequate').prop("checked")) {
      coreText += "The bone marrow core biopsy " + adequacyListString + " and is overall inadequate for interpretation. ";
    }

    if ($.isNumeric($('#coreCellularityVariableLow').val()) && $.isNumeric($('#coreCellularityVariableHigh').val()) && parseFloat($('#coreCellularityVariableHigh').val()) > parseFloat($('#coreCellularityVariableLow').val())){
      coreText += `The marrow is variably cellular (ranging from ${$('#coreCellularityVariableLow').val()}-${$('#coreCellularityVariableHigh').val()}% cellular) `;
      if ($('#hypocellular').prop('checked')){
        $('#cellularityMildMarked').show();
        coreText += 'and overall '
        if ($('#cellularityMild').prop('checked')){
          coreText += 'mildly ';
        } else if ($('#cellularityMarked').prop('checked')){
          coreText += 'markedly ';
        }
        coreText += 'hypocellular for age'
      } else if ($('#normocellular').prop('checked')){
        coreText += "and overall normocellular for age"
        $('#cellularityMildMarked').hide();
      } else if ($('#hypercellular').prop('checked')){
        $('#cellularityMildMarked').show();
        coreText += 'and overall ';
        if ($('#cellularityMild').prop('checked')){
          coreText += 'mildly ';
        } else if ($('#cellularityMarked').prop('checked')){
          coreText += 'markedly ';
        }
        coreText += 'hypercellular for age'
      }
    } else {
      if ($('#hypocellular').prop('checked')){
        $('#cellularityMildMarked').show();
        coreText += 'The marrow is '
        if ($('#cellularityMild').prop('checked')){
          coreText += 'mildly ';
        } else if ($('#cellularityMarked').prop('checked')){
          coreText += 'markedly ';
        }
        coreText += 'hypocellular for age'
      } else if ($('#normocellular').prop('checked')){
        coreText += "The marrow is normocellular for age"
        $('#cellularityMildMarked').hide();
      } else if ($('#hypercellular').prop('checked')){
        $('#cellularityMildMarked').show();
        coreText += 'The marrow is ';
        if ($('#cellularityMild').prop('checked')){
          coreText += 'mildly ';
        } else if ($('#cellularityMarked').prop('checked')){
          coreText += 'markedly ';
        }
        coreText += 'hypercellular for age'
      }
    }
    
    if ($('#hypocellular').prop('checked') || $('#normocellular').prop('checked') || $('#hypercellular').prop('checked')){   
      if ($.isNumeric($('#coreCellularity').val())){
        coreText += ` (~${$('#coreCellularity').val()}% cellular). `;
      } else if ($.isNumeric($('#coreCellularityRangeLow').val()) && $.isNumeric($('#coreCellularityRangeHigh').val()) && parseFloat($('#coreCellularityRangeHigh').val()) > parseFloat($('#coreCellularityRangeLow').val())){
        coreText += ` (${$('#coreCellularityRangeLow').val()}-${$('#coreCellularityRangeHigh').val()}% cellular). `;
      }
    }
    
    if ($('#coreMEUnremarkable').prop('checked')){
      coreText += "Myeloid and erythroid precursors show progressive maturation. "
    }   

    if ($('#coreMegUnremarkable').prop('checked')){
      coreText += "Megakaryocytes are adequate, regularly distributed, and show unremarkable morphology. "
    }

    return coreText;
  }

  function fillClot(){
    let clotText = "";
    if ($('#clotSimilar').prop("checked")){
      clotText += "The bone marrow particle clot shows multiple marrow particles with findings similar to the core biopsy.";
    } else if ($('#clotRare').prop("checked")){
      clotText += "The bone marrow particle clot shows only rare marrow particles for evaluation.";
    } else if ($('#clotNone').prop("checked")){
      clotText += "The bone marrow particle clot shows no marrow particles for evaluation.";
    }
    return clotText;
  }

  function fillSpecialStains(){
    let stainText = '';
    let classObject = {
      aspirateSpecialStainsSelect: 'Bone Marrow Aspirate', 
      coreSpecialStainsSelect: 'Bone Marrow Core Biopsy', 
      clotSpecialStainsSelect: 'Bone Marrow Particle Clot'
    };

    for (key in classObject){
      let stainArray = [];
      $(`.${key}`).each(function(){
        if ($(this).val() != ''){
          let descriptorArray = [];
          let descriptorText = '';
          $(`.${this.id}`).each(function(){
            if ($(this).prop('checked')){
              descriptorArray.push($(this).val());
            }
          })
          if ($(this).val() == 'Iron'){
            if (descriptorArray.indexOf('adequate') != -1){
              descriptorText += 'There is adequate storage iron. '
            } else if (descriptorArray.indexOf('decreased') != -1){
              descriptorText += 'There is decreased storage iron. '
            } else if (descriptorArray.indexOf('increased') != -1){
              descriptorText += 'There is increased storage iron. '
            } else if (descriptorArray.indexOf('inadequate') != -1 && descriptorArray.indexOf('inadequate rings') == -1){
              descriptorText += 'There are too few spicules for assessment of storage iron. '
            } else if (descriptorArray.indexOf('inadequate') != -1 && descriptorArray.indexOf('inadequate rings') != -1){
              descriptorText += 'There are too few spicules for assessment of storage iron and too few erythroid precursors for assessment of ring sideroblasts. '
            }
            if (descriptorArray.indexOf('present') != -1){
              descriptorText += 'Ring sideroblasts are identified'
              if (descriptorList.Iron.positive != 0){
                let positivePercent = (100 * descriptorList.Iron.positive / (descriptorList.Iron.positive + descriptorList.Iron.negative)).toFixed(0);
                descriptorText += ` (~${positivePercent}% of erythroid precursors)`;
              };
              descriptorText += '. ';
            } else if (descriptorArray.indexOf('absent') != -1){
              descriptorText += 'No ring sideroblasts are identified. '
            } else if (descriptorArray.indexOf('inadequate rings') != -1 && descriptorArray.indexOf('inadequate') == -1){
              descriptorText += 'There are too few erythroid precursors for assessment of ring sideroblasts. '
            }
          } else if ($(this).val() == 'Reticulin'){
            if (descriptorArray[0] == 'MF-0'){
              descriptorText = 'There is no increase in fibrosis (MF-0).';
            } else if (descriptorArray[0] == 'MF-1'){
              descriptorText = 'Shows mildly increased fibrosis (MF-1).';
            } else if (descriptorArray[0] == 'MF-2'){
              descriptorText = 'Shows moderately increased fibrosis (MF-2).';
            } else if (descriptorArray[0] == 'MF-3'){
              descriptorText = 'Shows markedly increased fibrosis (MF-3).';
            }
          } else if ($(this).val() == 'Congo red'){
            if (descriptorArray[0] == 'negative'){
              descriptorText = 'Negative for amyloid.';
            } else if (descriptorArray[0] == 'positive'){
              descriptorText = 'Positive for amyloid.';
            }
          } else if ($(this).val() == 'GMS'){
            if (descriptorArray[0] == 'negative'){
              descriptorText = 'Negative for fungal organisms.';
            } else if (descriptorArray[0] == 'positive'){
              descriptorText = 'Positive for fungal organisms.';
            }
          } else if ($(this).val() == 'AFB'){
            if (descriptorArray[0] == 'negative'){
              descriptorText = 'Negative for acid-fast bacteria.';
            } else if (descriptorArray[0] == 'positive'){
              descriptorText = 'Positive for acid-fast bacteria.';
            }
          }
          stainArray.push([$(this).val(), descriptorText]);
        }
      })
      if (stainArray.length != 0){
        if (stainText != ''){
          stainText += '<br>'
        }
        stainText += stainTable(stainArray, classObject[key])
      }
    }
    return stainText;
  }

  function fillImmunostains(){
    let stainText = '';
    let classObject = {
      coreImmunostainsSelect: 'Bone Marrow Core Biopsy', 
      clotImmunostainsSelect: 'Bone Marrow Particle Clot'
    };

    for (key in classObject){
      let stainArray = [];
      $(`.${key}`).each(function(){
        if ($(this).val() != ''){
          if ($(this).val() == 'Cytokeratin AE1/AE3'){
            let descriptorText = '';
            let descriptor = ''
            $(`.${this.id}`).each(function(){
              if ($(this).prop('checked')){
                descriptor = $(this).val();
              }
            })
            if (descriptor == 'negative'){
              descriptorText = 'Negative for metastatic carcinoma.';
            } else if (descriptor == 'positive'){
              descriptorText = 'Positive for metastatic carcinoma.';
            }
            stainArray.push([$(this).val(), descriptorText]);
          } else {
            let descriptorText = '';
            $(`.${this.id}`).each(function(){
              descriptorText = $(this).val();
            })
            if (descriptorText.indexOf('***') != -1){
              if (descriptorList[$(this).val()]['positive'] != 0){
                let positivePercent = (100 * descriptorList[$(this).val()]['positive'] / (descriptorList[$(this).val()]['positive'] + descriptorList[$(this).val()]['negative'])).toFixed(0);
                descriptorText = descriptorText.replace('***', positivePercent)
              }
            }
            stainArray.push([$(this).val(), descriptorText]);
          } 
        }
      })
      if (stainArray.length != 0){
        if (stainText != ''){
          stainText += '<br>'
        }
        stainText += stainTable(stainArray, classObject[key])
      }
    }
    return stainText;
  }

  function stainTable(array, label){
    let stainText = `${label}<br><table class="templateTable" style="width:600px; font-size:11pt">`
      for (i in array){
        stainText += `<tr><td style="width:30%">${array[i][0]}</td><td style="width:70%">${array[i][1]} </td></tr>`
      }
      stainText += '</table>'
    return stainText;
  }

  $(".saveButton").click(function() {
    let saveFileBM = {};
    let aspToggle = false;
    let pbToggle = false;
    let errorDescriptor = "";
    let checkedObject = {};
    let inputObject = {};
    $('.pbCounterTemplate').each(function(){
      if ($(this).css("background-color") == "rgb(255, 95, 95)"){
        pbToggle = true;
        errorDescriptor = "peripheral blood layout.";
      }
    })
    $('.aspCounterTemplate').each(function(){
      if ($(this).css("background-color") == "rgb(255, 95, 95)"){
        aspToggle = true;
        if (pbToggle){
          errorDescriptor = "peripheral blood and aspirate layouts.";
        } else {
          errorDescriptor = "aspirate layout.";
        }
      }
    })
    $('.diffSetting').each(function(){
      checkedObject[this.id] = $(this).prop('checked');
    })

    $('.saveInput').each(function(){
      inputObject[this.id] = $(this).val();
    })

    if (aspToggle || pbToggle){
      if($('#copyAlert').is(":hidden")){
        $('#copyAlert').html('Could not save. Incompatible '+ errorDescriptor);
        $('#copyAlert').css("background-color", "rgb(255, 95, 95)")
        $('#copyAlert').show().animate({bottom: '20px'},700).animate({bottom: '20px'},1000).animate({bottom: '-5%'},1000,function(){
        $('#copyAlert').hide();
        })
      };
    } else {
      saveFileBM.pbCountTableBM = pbCountTable;
      saveFileBM.aspCountTableBM = aspCountTable;
      saveFileBM.checkedObjectBM = checkedObject;
      saveFileBM.inputObjectBM = inputObject;
      localStorage.setItem("saveFileBM", JSON.stringify(saveFileBM));
      if($('#copyAlert').is(":hidden")){
        $('#copyAlert').html('Settings have been saved.');
        $('#copyAlert').css("background-color", "rgb(100, 255, 95)")
        $('#copyAlert').show().animate({bottom: '20px'},700).animate({bottom: '20px'},1000).animate({bottom: '-5%'},1000,function(){
        $('#copyAlert').hide();
        })
      };
    }    
  })
});
