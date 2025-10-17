$(document).ready(function() { 
  let saveFileBM = JSON.parse(localStorage.getItem("saveFileBM"));
  /*
  The variables pbCountTable and aspCountTable are utilized to calculate
  the percentages of each cell type when the user performs a differential.
  The array syntax is as follows: ['cell type', 'character associated with
  the cell type', corresponding HTML ID number, cell type handler (explained 
  below), number of cells already counted for given cell type (baseline = 0)

  0 = No special type
  1 = Neutrophils and precursors on aspirate
  2 = Other myeloid cell for M:E ratio calculation
  3 = Erythroid cell for M:E ratio calculation
  4 = Circulating NRBC
  5 = Blast
  */
  
  let countTables = {
    'pbCountTable': {
      Blasts: {name: 'Blasts', character: 0, gridID: "pbLayout9", tableCellID: '#pbTableCell2', tableRowID: '#pbTableRow2', cellType: 5, count: 0, percent: 0, hidden: true},
      Neuts: {name: 'Neuts', character: 4, gridID: "pbLayout3", tableCellID: '#pbTableCell6', tableRowID: '#pbTableRow6', cellType: 0, count: 0, percent: 0, hidden: false},
      NRBCs: {name: 'NRBCs', character: 1, gridID: "pbLayout6", tableCellID: '#pbTableCell12', tableRowID: '#pbTableRow12', cellType: 4, count: 0, percent: 0, hidden: true},
      Lymphs: {name: 'Lymphs', character: 5, gridID: "pbLayout4", tableCellID: '#pbTableCell7', tableRowID: '#pbTableRow7', cellType: 0, count: 0, percent: 0, hidden: false},
      Monos: {name: 'Monos', character: 6, gridID: "pbLayout5", tableCellID: '#pbTableCell8', tableRowID: '#pbTableRow8', cellType: 0, count: 0, percent: 0, hidden: false},
      Metas: {name: 'Metas', character: 7, gridID: "pbLayout0", tableCellID: '#pbTableCell5', tableRowID: '#pbTableRow5', cellType: 0, count: 0, percent: 0, hidden: true},
      Myelo: {name: 'Myelo', character: 8, gridID: "pbLayout1", tableCellID: '#pbTableCell4', tableRowID: '#pbTableRow4', cellType: 0, count: 0, percent: 0, hidden: true},
      Promyelo: {name: 'Promyelo', character: 9, gridID: "pbLayout2", tableCellID: '#pbTableCell3', tableRowID: '#pbTableRow3', cellType: 0, count: 0, percent: 0, hidden: true},
      Plasma: {name: 'Plasma', character: -1, gridID: "", tableCellID: '#pbTableCell11', tableRowID: '#pbTableRow11', cellType: 0, count: 0, percent: 0, hidden: true},
      Eos: {name: 'Eos', character: 2, gridID: "pbLayout7", tableCellID: '#pbTableCell9', tableRowID: '#pbTableRow9', cellType: 0, count: 0, percent: 0, hidden: false},
      Basos: {name: 'Basos', character: 3, gridID: "pbLayout8", tableCellID: '#pbTableCell10', tableRowID: '#pbTableRow10', cellType: 0, count: 0, percent: 0, hidden: false},
      Atypical: {name: 'Atypical', character: -1, gridID: "", tableCellID: '#pbTableCell0', tableRowID: '#pbTableRow0', cellType: 0, count: 0, percent: 0, hidden: true},
      Other: {name: 'Other', character: -1, gridID: "", tableCellID: '#pbTableCell1', tableRowID: '#pbTableRow1', cellType: 0, count: 0, percent: 0, hidden: true},
    },
    'aspCountTable': {
      Blasts: {name: 'Blasts', character: 0, gridID: "aspLayout9", tableCellID: '#aspTableCell2', tableRowID: 'aspTableRow2', cellType: 5, count: 0, percent: 0, hidden: false},
      Neuts: {name: 'Neuts', character: 4, gridID: "aspLayout3", tableCellID: '#aspTableCell3', tableRowID: 'aspTableRow2', cellType: 1, count: 0, percent: 0, hidden: false},
      NRBCs: {name: 'NRBCs', character: 1, gridID: "aspLayout6", tableCellID: '#aspTableCell9', tableRowID: 'aspTableRow2', cellType: 3, count: 0, percent: 0, hidden: false},
      Lymphs: {name: 'Lymphs', character: 5, gridID: "aspLayout4", tableCellID: '#aspTableCell7', tableRowID: 'aspTableRow2', cellType: 0, count: 0, percent: 0, hidden: false},
      Monos: {name: 'Monos', character: 6, gridID: "aspLayout5", tableCellID: '#aspTableCell6', tableRowID: 'aspTableRow2', cellType: 2, count: 0, percent: 0, hidden: false},
      Metas: {name: 'Metas', character: 7, gridID: "aspLayout0", tableCellID: '#aspTableCell3', tableRowID: 'aspTableRow2', cellType: 1, count: 0, percent: 0, hidden: false},
      Promyelo: {name: 'Promyelo', character: ".", gridID: "aspLayout10", tableCellID: '#aspTableCell3', tableRowID: 'aspTableRow2', cellType: 1, count: 0, percent: 0, hidden: true},
      Myelo: {name: 'Myelo', character: 8, gridID: "aspLayout1", tableCellID: '#aspTableCell3', tableRowID: 'aspTableRow2', cellType: 1, count: 0, percent: 0, hidden: false},
      Plasma: {name: 'Plasma', character: 9, gridID: "aspLayout2", tableCellID: '#aspTableCell8', tableRowID: 'aspTableRow2', cellType: 0, count: 0, percent: 0, hidden: false},
      Eos: {name: 'Eos', character: 2, gridID: "aspLayout7", tableCellID: '#aspTableCell4', tableRowID: 'aspTableRow2', cellType: 2, count: 0, percent: 0, hidden: false},
      Basos: {name: 'Basos', character: 3, gridID: "aspLayout8", tableCellID: '#aspTableCell5', tableRowID: 'aspTableRow2', cellType: 2, count: 0, percent: 0, hidden: false},
      Atypical: {name: 'Atypical', character: -1, gridID: "", tableCellID: '#aspTableCell0', tableRowID: 'aspTableRow2', cellType: 0, count: 0, percent: 0, hidden: true},
      Other: {name: 'Other', character: -1, gridID: "", tableCellID: '#aspTableCell1', tableRowID: 'aspTableRow2', cellType: 0, count: 0, percent: 0, hidden: true},
    }
  };
  if (saveFileBM != null){
    if (saveFileBM.countTableBM != null){
      countTables = saveFileBM.countTableBM;
    }
  }

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
  let positiveLabel = 4;
  let negativeLabel = 5;

  window.keypressed = {};

  let patientAge = -1;
  let legalSex = -1;

  let cbcVar = ["WBC", "RBC", "HGB", "MCV", "MCHC", "PLT", "NRBC's", "Absolute Neutrophils", "Absolute Lymphocytes", "Absolute Monocytes", "Absolute Eosinophils", "Absolute Basophils", "Absolute NRBCs"];

  let cbcObject = {
    "WBC": {value: "", unit: "10ˆ3/µL"},
    "RBC": {value: "", unit: "10ˆ6/µL"},
    "HGB": {value: "", unit: "g/dL", low: "hgbLow", normal: "hgbNormal", high: "hgbHigh", mild: "hgbMild", marked: "hgbMarked", mildLowSetting: "cbcHgbLowMild", mildHighSetting: "cbcHgbHighMild"},
    "HCT": {value: "", unit: "%"},
    "MCV": {value: "", unit: "fL", low: "mcvLow", normal: "mcvNormal", high: "mcvHigh"},
    "MCH": {value: "", unit: "pg"},
    "MCHC": {value: "", unit: "g/dL", low: "hypochromic"},
    "PLT": {value: "", unit: "10ˆ3/µL", low: "pltLow", normal: "pltNormal", high: "pltHigh", mild: "pltMild", marked: "pltMarked", mildLowSetting: "cbcPltLowMild", mildHighSetting: "cbcPltHighMild"},
    "RDW": {value: "", unit: "%"},
    "NRBC's": {value: "", unit: "%", high: "nrbcPresent"},
    "Neutrophils": {value: "", unit: "%"},
    "Lymphocytes": {value: "", unit: "%"},
    "Monocytes": {value: "", unit: "%"},
    "Eosinophils": {value: "", unit: "%"},
    "Basophils": {value: "", unit: "%"},
    "Immature Granulocytes": {value: "", unit: "%"},
    "Absolute Neutrophils": {value: "", unit: "10ˆ3/µL", low: "neutLow", normal: "neutNormal", high: "neutHigh", mild: "neutMild", marked: "neutMarked", mildLowSetting: "cbcNeutLowMild", mildHighSetting: "cbcNeutHighMild"},
    "Absolute Lymphocytes": {value: "", unit: "10ˆ3/µL", low: "lymphLow", normal: "lymphNormal", high: "lymphHigh", mild: "lymphMild", marked: "lymphMarked", mildLowSetting: "cbcLymphLowMild", mildHighSetting: "cbcLymphHighMild"},
    "Absolute Monocytes": {value: "", unit: "10ˆ3/µL", low: "monosLow", high: "monosHigh", mild: "monosMild", marked: "monosMarked"},
    "Absolute Eosinophils": {value: "", unit: "10ˆ3/µL", high: "eosHigh"},
    "Absolute Basophils": {value: "", unit: "10ˆ3/µL", high: "basoHigh"},
    "Absolute NRBCs": {value: "", unit: "10ˆ3/µL", high: "nrbcPresent"},
    "Absolute Immature Granulocytes": {value: "", unit: "10ˆ3/µL", high: "immature"}
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
  const cd71Descriptors = {class: 'select', descriptors: ['','Adequate', 'Proliferation'], value: ['','Highlights adequate erythroid precursors.','Shows a proliferation of erythroid precursors.']}
  const mpoDescriptors = {class: 'select', descriptors: ['','Adequate', 'Proliferation'], value: ['','Highlights adequate myeloid precursors.','Shows a proliferation of myeloid precursors.']}
  const cd138Descriptors = {class: 'selectDualCount', descriptors: ['','Not increased', 'Increased'], value: ['','Shows no increase in plasma cells (***% of total cellularity).','Highlights increased plasma cells (***% of total cellularity).']}
  const kappalambdaDescriptors = {class: 'select', descriptors: ['','Polytypic', 'Kappa restriction', 'Lambda restriction'], value: ['','Highlights polytypic plasma cells.','Shows kappa restriction in plasma cells.','Shows lambda restriction in plasma cells.']}
  const cd5Descriptors = {class: 'select', descriptors: ['','Highlights T cells with no apparent coexpression in B cells','Negative in neoplastic B cells','Negative in B cells','Positive in neoplastic B cells'], value: ['','Highlights T cells with no apparent coexpression in B cells.','Negative in B cells.', 'Negative in neoplastic B cells.', 'Positive in neoplastic B cells.',]}

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
    "Small mature and large granular",
    "Predominantly large granular",
    "Polymorphous",
    "Reactive",
    "Predominantly CLL-like",
    "Subset CLL-like"
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
    "Hypolobated forms",
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
    "Hypersegmented forms",
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
    "CD5",
    "CD34",
    "CD61",
    "CD71",
    'CD138',
    'Kappa/Lambda ISH',
    "MPO",
    'Cytokeratin AE1/AE3',
  ]

  const layoutList = [
    "Numbers only",
    "Numbers and period",
    'Expanded'
  ]

  const cellularityList = [
    "100 minus patient's age",
    "Strict evidence based",
    "Hybrid"
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
    'CD5': {descriptorObject: cd5Descriptors},
    'CD34': {descriptorObject: cd34Descriptors, value: '', positive: 0, negative: 0, count: 0},
    'CD61': {descriptorObject: cd61Descriptors},
    'CD71': {descriptorObject: cd71Descriptors},
    'CD138': {descriptorObject: cd138Descriptors, value: '', positive: 0, negative: 0, count: 0},
    'Cytokeratin AE1/AE3': {descriptorObject: dualDescriptors},
    'Kappa/Lambda ISH': {descriptorObject: kappalambdaDescriptors},
    'MPO': {descriptorObject: mpoDescriptors},
  };

  const gridLayouts = {
    'Numbers only': [[-1,-1,-1],[7,8,9],[4,5,6],[1,2,3],[-1,0,-1]],
    'Numbers and period': [[-1,-1,-1],[7,8,9],[4,5,6],[1,2,3],[-1,0,"."]],
    'Expanded': [[-1,"/","*"],[7,8,9],[4,5,6],[1,2,3],[-1,0,"."]],
  }

  const selectMasterList = {
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
    diffLayoutSelect: layoutList,
    cellularityCalculationSelect: cellularityList
  };

  for (key in selectMasterList){
    fillOptions(key);
  }

  if (saveFileBM != null) {
    if (saveFileBM.settingArray != null){
      for (let i = 0; i < saveFileBM.settingArray.length; i++){
        $("#" + saveFileBM.settingArray[i][0]).val(saveFileBM.settingArray[i][1])
        }
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

  fillLayoutGrids();
  fillCounterGrids(); 

  function fillLayoutGrids(){
    $('.layoutGrid').each(function(){
      let layoutType = $(this).attr("data-type");
      let gridTemplate = gridLayouts[$(`#${layoutType}LayoutSelect`).val()];
      let gridHTML = "";
      let idCount = 0;
      for (i in gridTemplate){
        for (j in gridTemplate[i]){
          if (gridTemplate[i][j] == -1){
            gridHTML += "<div></div>";
          } else {
            gridHTML += `<div><b>${gridTemplate[i][j]}: </b><select class="counterTemplate" data-type="${layoutType}" data-character="${gridTemplate[i][j]}" id="${layoutType}Layout${idCount}"></select></div>`;
            idCount++;
          }
        }
      }
      $(this).html(gridHTML)
    })
    fillLayoutGridSelects();
  }

  $('.layoutBody').on('change','.counterTemplate',function(){
    checkDuplicate(this.className,this.id,$(this).val(),$(this).attr("data-type"));
  }
  );

  function checkDuplicate(thisClass,thisID,thisValue,thisType){
    $(`.${thisClass}`).each(function(){
      if($(this).attr("data-type") == thisType){
        if(thisValue == $(this).val() && thisID != this.id){
          $(this).val('');
          $(this).css('background-color','rgb(255, 95, 95)');
        } else if ($(this).val() != null){
          $(this).css('background-color','white');
        }
      }  
    })
  }

  function fillLayoutGridSelects(){
    $('.counterTemplate').each(function(){
      let countTable = countTables[`${$(this).attr("data-type")}CountTable`];
      let id = this.id;
      selectDetect = false;
      $.each(countTable, function (i) {
        if((this.gridID) == id){
          $(`#${id}`).append($('<option>', {value: i, text : i, selected: "selected"}))
          selectDetect = true;
        } else {
          $(`#${id}`).append($('<option>', {value: i, text: i}))
        };
      });
      if(!selectDetect){
        $(`#${id}`).val('');
        $(`#${id}`).css('background-color','rgb(255, 95, 95)');
      }
    });
  }

  function fillCounterGrids(){
    $('.counterGrid').each(function(){
      let counterType = $(this).attr("data-type");
      let gridTemplate = gridLayouts[$(`#${counterType}LayoutSelect`).val()];
      let countTable = countTables[`${counterType}CountTable`];
      let gridHTML = "";
      let idCount = 0;
      for (i in gridTemplate){
          for (j in gridTemplate[i]){
              let cellName = "";
              for (a in countTable){
                  if (gridTemplate[i][j] == countTable[a]["character"]){
                      cellName = countTable[a]["name"];
                  }
              }
              if (gridTemplate[i][j] == -1){
                  gridHTML += "<div></div>"
              } else {
              gridHTML += `<div class="gridCell"><b>${gridTemplate[i][j]}: ${cellName}</b><input class="${counterType}Counter" id="${counterType}Counter${idCount}" size="2"></div>`
              }
          }
      }
      $(this).html(gridHTML)
    })
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
    $('#specAll').prop("checked", true);
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
    let cbcList = {...cbcObject}
    let toggle = true;
    for (let i = 0; i < cbcLines.length; i++) {
      cbcFinal.push(cbcLines[i].split('\t'))
    }
    for (i in cbcFinal) {
      for (j in cbcList){
        if (cbcFinal[i][0] == j){
          cbcObject[j]["value"] = cbcFinal[i][1];
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
          if (cbcFinal[i][j].indexOf("Legal Sex: ")!= -1){
            legalSex = cbcFinal[i][j].split("Legal Sex: ")[1];
          }
        }
      }
    }
    fillInputs();
  });

  function fillSelectHTML(id){
    let selectedList = [...selectMasterList[id]];
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

  $('.diffLayoutSelect').change(function(){
    fillLayoutGrids();
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
      for(i in selectMasterList[id]){
        $(this).append(`<option>${selectMasterList[id][i]}</option>`);
      }
    })
  }

  $('.counter').keydown(function(e) {
    countNoise(e, $(this).attr("data-type"));
  })

  $('.counter').keyup(function(e) {
    window.keypressed[e.which] = false;
    countCells($(this).attr("data-type"));
  });

  function countNoise(e,type) {
    if (window.keypressed[e.which]) {
      e.preventDefault();
    } else {
      if (e.key == 7 || e.key == 8 || e.key == 9) {
        window.keypressed[e.which] = true;
        new Audio('https://diffpath.github.io/media/Count-Click-High2.mp3').play();
      } else if (e.key == 4 || e.key == 5 || e.key == 6) {
        window.keypressed[e.which] = true;
        new Audio('https://diffpath.github.io/media/Count-Click-Med.mp3').play();
      } else if (e.key == 1 || e.key == 2 || e.key == 3) {
        window.keypressed[e.which] = true;
        new Audio('https://diffpath.github.io/media/Count-Click-Low.mp3').play();
      } else if (e.key == 0) {
        window.keypressed[e.which] = true;
        new Audio('https://diffpath.github.io/media/Count-Click-Blast.mp3').play();
      }
      if ($(`#${type}LayoutSelect`).val() == "Numbers and period"){
        if (e.key == ".") {
          window.keypressed[e.which] = true;
          new Audio('https://diffpath.github.io/media/Count-Click-Blast.mp3').play();
        }
      } else if ($(`#${type}LayoutSelect`).val() == "Expanded"){
        if (e.key == "/" || e.key == "*") {
          window.keypressed[e.which] = true;
          new Audio('https://diffpath.github.io/media/Count-Click-High2.mp3').play();
        } else if (e.key == ".") {
          window.keypressed[e.which] = true;
          new Audio('https://diffpath.github.io/media/Count-Click-Blast.mp3').play();
        }
      }
    }
  }

  function countCells(e){
    let ccount = $(`#${e}CCount`).val();
    let dcount = $(`#${e}DCount`).val();
    if ($("#countExtra").prop('checked') == false && ccount == dcount){
      return;
    }
    let table = countTables[`${e}CountTable`];
    let countSum = 0, myeloidSum = 0, erythroidSum = 0, neutSum = 0;
    const totalCount = cellCounter(table, e);
    $(`#${e}CCount`).val(totalCount);
    if (totalCount != 0) {
      $('#diffCount').show();
      $(`#${e}TableDiv`).show();  
    if ($("#roundDesired").prop('checked')){
      for (const i in table){
        table[i]["percent"] = (Math.round((table[i]["count"] / totalCount) * dcount) / (dcount/100)).toFixed(1);
        if (table[i]["cellType"] != 4){
          countSum += parseFloat(table[i]["percent"]);
        }
      }
      while (parseFloat(countSum.toFixed(1)) != 100){
        let minDifference = 10;
        let minIndex = - 1; 
        if (countSum > 100){
          for (const i in table){
            if (table[i]["cellType"] != 4){
              let diff = (Math.abs(((100*table[i]["count"] / totalCount) - (parseFloat(table[i]["percent"]) - 100/dcount)))/ table[i]["count"]);
              if (diff < minDifference){
                minIndex = i;
                minDifference = diff;
              }
            }
          }
          table[minIndex]["percent"] = (parseFloat(table[minIndex]["percent"]) - 100/dcount).toFixed(1);
          countSum -= 100/dcount;
        } else {
          for (const i in table){
            if (table[i]["cellType"] != 4){
              let diff = (Math.abs(((100*table[i]["count"] / totalCount) - (parseFloat(table[i]["percent"]) + 100/dcount)))/ table[i]["count"]);
              if (diff < minDifference){
                minIndex = i;
                minDifference = diff;
              }
            }
          }
          table[minIndex]["percent"] = (parseFloat(table[minIndex]["percent"]) + 100/dcount).toFixed(1);
          countSum += 100/dcount;
        }
      }
    } else {
      for (const i in table){
        table[i]["percent"] = (Math.round((100*table[i]["count"]/totalCount)*10)/10).toFixed(1);
        if (table[i]["cellType"] != 4){
          countSum += parseFloat(table[i]["percent"]);
        }
      }
    }

    $(`#${e}TCount`).val(countSum.toFixed(1)+"%")
    
    for (const i in table){
      if (e == "asp" && table[i]["count"]>0){
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
        if (e == "asp"){
          if (table[i]["cellType"] == 1){
            $(table[i]["gridID"]).val(table[i]["percent"] + "%");
          } else {
            $(table[i]["gridID"]).val(table[i]["percent"] + "%");
            $(table[i]["tableCellID"]).html(table[i]["percent"] + "%");
          }
        } else {
          $(table[i]["gridID"]).val(table[i]["percent"] + "%");
          $(table[i]["tableCellID"]).html(table[i]["percent"] + "%");
        }
       
      } else if (totalCount > 0) {
        $(table[i]["gridID"]).val(table[i]["percent"]);
        $(table[i]["tableCellID"]).html(table[i]["percent"]);
      } else {
        $(table[i]["gridID"]).val("");
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

    if (e == "asp"){
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
    if (dcount == totalCount){
      new Audio('https://diffpath.github.io/media/Complete-Nice.mp3').play(); 
    } else if ((totalCount % 100) == 0){
      new Audio('https://diffpath.github.io/media/100-Soothing.mp3').play();
    } 
    $(rightPanelFinal).show();
    } else {
      for (const i in table){
        $(table[i]["gridID"]).val("");
        $(table[i]["tableCellID"]).html("");
      }
      if($('#pbCCount').val() == 0 && $('#aspCCount').val() == 0){
        $('#diffCount').hide();
      }
      $('#erythroidPredominance').prop('checked', false);
      $('#meRatio').val("");
      $(`#${e}TableDiv`).hide();
      fillReport();
    }
  };

  function cellCounter(x, y) {
    let totalCount = 0;
    for (var i in x){
      x[i]["count"] = ($(`#${y}Counter`).val().match(new RegExp(String(x[i]["character"]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g")) || []).length;
      if (x[i]["cellType"] != 4) {
        totalCount += x[i]["count"];
      }
    }
    return totalCount
  }

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
      if (showID != "" && this.id != showID){
        $(this).hide();
      } else if (showID == ""){
        $(this).show();
      }
    })
  })

  $('.cellularity').keyup(function(){
    fillCellularity()
  })

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

  $('.toggleDiv').click(function(){
    $(`#${$(this).attr('data-id')}`).toggle();
  })

  function fillInputs() {
    for (i in cbcObject){
      if (cbcObject[i]["value"].indexOf('High') != -1){
        $(`#${cbcObject[i]["high"]}`).prop('checked', true);
        if (parseFloat(cbcObject[i]["value"].split(" ")[0]) > parseFloat($(`#${cbcObject[i]["mildHighSetting"]}`))){
          $(`#${cbcObject[i]["mild"]}`).prop('checked', true);
        }
      } else if (cbcObject[i]["value"].indexOf('Low') != -1){
        $(`#${cbcObject[i]["low"]}`).prop('checked', true);
        if (parseFloat(cbcObject[i]["value"].split(" ")[0]) > parseFloat($(`#${cbcObject[i]["mildLowSetting"]}`))){
          $(`#${cbcObject[i]["mild"]}`).prop('checked', true);
        }
      } else if (cbcObject[i]["value"] != ""){
        $(`#${cbcObject[i]["normal"]}`).prop('checked', true);
      }
      if (cbcObject[i]["value"].indexOf('Panic') != -1){
        $(`#${cbcObject[i]["marked"]}`).prop('checked', true);
      }
    }
    if (parseFloat(cbcObject["NRBC's"]["value"].split(" ")[0]) > 0){
      if (parseFloat(cbcObject["Absolute NRBCs"]["value"].split(" ")[0]) > parseFloat($('#nrbcFrequentLimit').val())){
        $('#nrbcFrequent').prop('checked', true)
      } else if (parseFloat(cbcObject["Absolute NRBCs"]["value"].split(" ")[0]) > parseFloat($('#nrbcFrequentLimit').val())){
        $('#nrbcOccasional').prop('checked', true)
      } else {
        $('#nrbcRare').prop('checked', true)
      }
    }
    fillReport();
  }

  function fillReport(){
    let finalText = "";
    const specText = fillSpecimen();
    console.log('ho')
    const clinicalText = fillClinical();
    console.log('he')
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
    if(specText != '' || clinicalText != '' || finalText != '' || $('#pbTableDiv').is(':visible') || $('#aspTableDiv').is(':visible')){
      $(rightPanelFinal).show();
      if (specText != ''){
        $('#specDiv').html(specText);
      }
      if (clinicalText != ''){
        $('#clinicalDiv').html(clinicalText);
      }
      if (finalText != ''){
        $('#finalDiv').html(finalText);
      }
    } else {
      console.log('ho')
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

  function fillClinical() {
    let clinicalText = "";
    let clinicalTable = '<table class="templateTable" style="width:440px; font-size:10pt"><tr><th style="width:50%; text-align:left">Component</td><th style="width:17%; text-align:left">Result</td><th style="width:33%; text-align:left">Units</td></tr>';
    let toggle = false;

    if (patientAge != -1){
      if ($('#toggleClinical').is(':hidden')){
        clinicalText += "<b>Clinical Information</b><div id='toggleClinical' style='display: none'>The patient is";
      } else {
        clinicalText += "<b>Clinical Information</b><div id='toggleClinical'>The patient is";
      }
      if (patientAge == 1 || patientAge == 8 || patientAge == 11 || patientAge == 18 || (patientAge >= 80 && patientAge <90) || patientAge >= 100){
        clinicalText += " an";
      } else {
        clinicalText += " a";
      }
      clinicalText += ` ${patientAge}-year-old`;
      if (legalSex == "F"){
        clinicalText += ' female';
      } else if (legalSex == "M"){
        clinicalText += ' male'
      }
      if ($('#hgbLow').prop("checked") && $('#pltLow').prop("checked") && cbcObject["WBC"]["value"].indexOf('Low') != -1){
        clinicalText += ' presenting with pancytopenia.';
      } else if ($('#hgbLow').prop("checked")){
        clinicalText += ' presenting with anemia';
        if ($('#pltLow').prop("checked")){
          clinicalText += ' and thrombocytopenia.';
        } else {
          clinicalText += '.';
        }
      } else if ($('#pltLow').prop("checked")){
        clinicalText += ' presenting with thrombocytopenia.';
      }
      clinicalText += '<br><br>'
    }
    for (i in cbcObject){
      if (cbcObject[i]["value"] != ""){
        if (cbcObject[i]["value"].indexOf("Low") != -1){
        clinicalTable += `<tr style="background-color: lightblue"><td style="width:50%">${i}</td><td style="width:17%">${cbcObject[i]["value"].split(" ")[0]}</td><td style="width:33%">${cbcObject[i]["unit"]}</td></tr>`;
        } else if (cbcObject[i]["value"].indexOf("High") != -1){
        clinicalTable += `<tr style="background-color: lightcoral"><td style="width:50%">${i}</td><td style="width:17%">${cbcObject[i]["value"].split(" ")[0]}</td><td style="width:33%">${cbcObject[i]["unit"]}</td></tr>`;
        } else {
        clinicalTable += `<tr><td style="width:50%">${i}</td><td style="width:17%">${cbcObject[i]["value"].split(" ")[0]}</td><td style="width:33%">${cbcObject[i]["unit"]}</td></tr>`;
        }
        toggle = true;
      }
    }
    if (toggle){
      clinicalText += `<div class='toggleHeader'><b>CBC Results</b></div><div>${clinicalTable}</table></div>`;
    }
    clinicalText += '</div><br>';
    return clinicalText
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
        if ($('#lymphocyteSelect0').val() == "unremarkable") {
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
        pbText += " absolute lymphocytosis"
        if ($('#lymphocyteSelect0').val() == "Unremarkable"){
          pbText += ". Lymphocytes show unremarkable morphology. "
        } else if ($('#lymphocyteSelect0').val() == "Small mature"){
          pbText += " consisting of predominantly small mature lymphocytes. "
        } else if ($('#lymphocyteSelect0').val() == "Small mature and large granular"){
          pbText += " consisting of small mature lymphocytes and large granular lymphocytes. "
        } else if ($('#lymphocyteSelect0').val() == "Predominantly large granular"){
          pbText += " consisting of predominantly large granular lymphocytes. "
        } else if ($('#lymphocyteSelect0').val() == "Polymorphous"){
          pbText += " consisting of a polymorphous population of small mature lymphocytes, large granular lymphocytes, and reactive lymphocytes. "
        } else if ($('#lymphocyteSelect0').val() == "Reactive"){
          pbText += " consisting of predominantly reactive lymphocytes. "
        } else if ($('#lymphocyteSelect0').val() == "Predominantly CLL-like"){
          pbText += " consisting of predominantly small mature lymphocyte with clumped chromatin. "
        } else if ($('#lymphocyteSelect0').val() == "Predominantly CLL-like"){
          pbText += " with a subset of lymphocytes consisting of small mature forms with clumped chromatin. "
        } else {
          pbText += ". "
        }
      } 

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

  function fillCellularity(){
    let a = parseFloat($('#coreCellularity').val());
    let b = parseFloat($('#coreCellularityRangeHigh').val());
    let c = parseFloat($('#coreCellularityRangeLow').val());
    let toggle = false;
    $('.cellularity').each(function(){
      let x = $(this).val()
      if (x>100 || x<0 || (isNaN(x) && x != "")){
        $(this).css('background-color','rgb(255, 95, 95)');
        toggle = true;
      } else {
        $(this).css('background-color','white');
      }
    })
    if (c>b){
      $($('#coreCellularityRangeLow')).css('background-color','rgb(255, 95, 95)');
      $($('#coreCellularityRangeHigh')).css('background-color','rgb(255, 95, 95)');
      toggle = true;
    }
    if ((isNaN(a) && isNaN(b) && isNaN(c)) || toggle){
      $('#hypocellular').prop('checked', false);
      $('#normocellular').prop('checked', false);
      $('#hypercellular').prop('checked', false);
      $('#cellularityMarked').prop('checked', false);
      $('#cellularityMild').prop('checked', false);
    } else if (patientAge != -1){
      if($('#cellularitySelect').val() == "100 minus patient's age"){
        let x = 100-patientAge-a;
        let y = 100-patientAge-b;
        let z = 100-patientAge-c;
        if (x>=parseFloat($('#markedlyHypocellular').val()) || y>= parseFloat($('#markedlyHypocellular').val())){
          $('#hypocellular').prop('checked', true);
          $('#normocellular').prop('checked', false);
          $('#hypercellular').prop('checked', false);
          $('#cellularityMarked').prop('checked', true);
          $('#cellularityMild').prop('checked', false);
        } else if (x>=parseFloat($('#mildlyHypocellularMax').val()) || y>=parseFloat($('#mildlyHypocellularMax').val())){
          $('#hypocellular').prop('checked', true);
          $('#normocellular').prop('checked', false);
          $('#hypercellular').prop('checked', false);
          $('#cellularityMarked').prop('checked', false);
          $('#cellularityMild').prop('checked', false);      
        } else if (x>=parseFloat($('#mildlyHypocellularMin').val()) || y>=parseFloat($('#mildlyHypocellularMin').val())){
          $('#hypocellular').prop('checked', true);
          $('#normocellular').prop('checked', false);
          $('#hypercellular').prop('checked', false);
          $('#cellularityMarked').prop('checked', false);
          $('#cellularityMild').prop('checked', true);      
        } else if (x>=parseFloat($('#mildlyHypercellularMin').val())*-1 || z>=parseFloat($('#mildlyHypercellularMin').val())*-1){
          $('#hypocellular').prop('checked', false);
          $('#normocellular').prop('checked', true);
          $('#hypercellular').prop('checked', false);
          $('#cellularityMarked').prop('checked', false);
          $('#cellularityMild').prop('checked', false);      
        } else if (x>=parseFloat($('#mildlyHypercellularMax').val())*-1 || z>=parseFloat($('#mildlyHypercellularMax').val())*-1){
          $('#hypocellular').prop('checked', false);
          $('#normocellular').prop('checked', false);
          $('#hypercellular').prop('checked', true);
          $('#cellularityMarked').prop('checked', false);
          $('#cellularityMild').prop('checked', true);      
        } else if (x>=parseFloat($('#markedlyHypercellular').val())*-1 || z>=parseFloat($('#markedlyHypercellular').val())*-1){
          $('#hypocellular').prop('checked', false);
          $('#normocellular').prop('checked', false);
          $('#hypercellular').prop('checked', true);
          $('#cellularityMarked').prop('checked', false);
          $('#cellularityMild').prop('checked', false);      
        } else if (x<=parseFloat($('#markedlyHypercellular').val())*-1 || z<=parseFloat($('#markedlyHypercellular').val())*-1){
          $('#hypocellular').prop('checked', false);
          $('#normocellular').prop('checked', false);
          $('#hypercellular').prop('checked', true);
          $('#cellularityMarked').prop('checked', true);
          $('#cellularityMild').prop('checked', false);      
        }
      } else if ($('#cellularitySelect').val() == "Strict evidence based"){
        if (patientAge<20){
          if (a<45 || b<45){
            $('#hypocellular').prop('checked', true);
            $('#normocellular').prop('checked', false);
            $('#hypercellular').prop('checked', false);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          } else if (a>85 || c>85){
            $('#hypocellular').prop('checked', false);
            $('#normocellular').prop('checked', false);
            $('#hypercellular').prop('checked', true);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          } else {
            $('#hypocellular').prop('checked', false);
            $('#normocellular').prop('checked', true);
            $('#hypercellular').prop('checked', false);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          }
        } else if (patientAge<=40){
          if (a<40 || b<40){
            $('#hypocellular').prop('checked', true);
            $('#normocellular').prop('checked', false);
            $('#hypercellular').prop('checked', false);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          } else if (a>70 || c>70){
            $('#hypocellular').prop('checked', false);
            $('#normocellular').prop('checked', false);
            $('#hypercellular').prop('checked', true);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          } else {
            $('#hypocellular').prop('checked', false);
            $('#normocellular').prop('checked', true);
            $('#hypercellular').prop('checked', false);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          }
        } else if (patientAge<=60){
          if (a<35 || b<35){
            $('#hypocellular').prop('checked', true);
            $('#normocellular').prop('checked', false);
            $('#hypercellular').prop('checked', false);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          } else if (a>65 || c>65){
            $('#hypocellular').prop('checked', false);
            $('#normocellular').prop('checked', false);
            $('#hypercellular').prop('checked', true);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          } else {
            $('#hypocellular').prop('checked', false);
            $('#normocellular').prop('checked', true);
            $('#hypercellular').prop('checked', false);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          }
        } else if (patientAge>60){
          if (a<30 || b<30){
            $('#hypocellular').prop('checked', true);
            $('#normocellular').prop('checked', false);
            $('#hypercellular').prop('checked', false);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          } else if (a>60 || c>60){
            $('#hypocellular').prop('checked', false);
            $('#normocellular').prop('checked', false);
            $('#hypercellular').prop('checked', true);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          } else {
            $('#hypocellular').prop('checked', false);
            $('#normocellular').prop('checked', true);
            $('#hypercellular').prop('checked', false);
            $('#cellularityMarked').prop('checked', false);
            $('#cellularityMild').prop('checked', false);
          }
        }
      } else if ($('#cellularitySelect').val() == "Hybrid"){
        
      }
    }
    fillReport();
  };

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
      for (i in countTables){
        for (j in countTables[i]){
          let toggle = false;
          $('.counterTemplate').each(function(){
            if(String(i) == ($(this).attr("data-type")+"CountTable") && j == $(this).val()){
              countTables[i][j]["gridID"] = this.id;
              countTables[i][j]["character"] = $(this).attr("data-character");
              toggle = true;
            }
          })
          if (!toggle){
              countTables[i][j]["gridID"] = "";
              countTables[i][j]["character"] = -1;
          }
        }
      }
      countCells("pb");
      countCells("asp");
      fillCounterGrids();
      saveFileBM.countTableBM = countTables;
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
