  let countTables = {
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
    6 = Circulating Blast
    */
    'pbCountTable': {
      Blasts: {name: 'Blasts', character: 0, counterGridID: "#pbCounter9", layoutGridID: "pbLayout9", tableCellID: '#pbTableCell2', tableRowID: '#pbTableRow2', cellType: 6, count: 0, percent: 0, hidden: true},
      Neuts: {name: 'Neuts', character: 4, counterGridID: "#pbCounter3", layoutGridID: "pbLayout3", tableCellID: '#pbTableCell6', tableRowID: '#pbTableRow6', cellType: 0, count: 0, percent: 0, hidden: false},
      NRBCs: {name: 'NRBCs', character: 1, counterGridID: "#pbCounter6", layoutGridID: "pbLayout6", tableCellID: '#pbTableCell12', tableRowID: '#pbTableRow12', cellType: 4, count: 0, percent: 0, hidden: true},
      Lymphs: {name: 'Lymphs', character: 5, counterGridID: "#pbCounter4", layoutGridID: "pbLayout4", tableCellID: '#pbTableCell7', tableRowID: '#pbTableRow7', cellType: 0, count: 0, percent: 0, hidden: false},
      Monos: {name: 'Monos', character: 6, counterGridID: "#pbCounter5", layoutGridID: "pbLayout5", tableCellID: '#pbTableCell8', tableRowID: '#pbTableRow8', cellType: 0, count: 0, percent: 0, hidden: false},
      Metas: {name: 'Metas', character: 7, counterGridID: "#pbCounter0", layoutGridID: "pbLayout0", tableCellID: '#pbTableCell5', tableRowID: '#pbTableRow5', cellType: 0, count: 0, percent: 0, hidden: true},
      Myelo: {name: 'Myelo', character: 8, counterGridID: "#pbCounter1", layoutGridID: "pbLayout1", tableCellID: '#pbTableCell4', tableRowID: '#pbTableRow4', cellType: 0, count: 0, percent: 0, hidden: true},
      Promyelo: {name: 'Promyelo', character: 9, counterGridID: "#pbCounter2", layoutGridID: "pbLayout2", tableCellID: '#pbTableCell3', tableRowID: '#pbTableRow3', cellType: 0, count: 0, percent: 0, hidden: true},
      Plasma: {name: 'Plasma', character: -1, counterGridID: "", layoutGridID: "", tableCellID: '#pbTableCell11', tableRowID: '#pbTableRow11', cellType: 0, count: 0, percent: 0, hidden: true},
      Eos: {name: 'Eos', character: 2, counterGridID: "#pbCounter7", layoutGridID: "pbLayout7", tableCellID: '#pbTableCell9', tableRowID: '#pbTableRow9', cellType: 0, count: 0, percent: 0, hidden: false},
      Basos: {name: 'Basos', character: 3, counterGridID: "#pbCounter8", layoutGridID: "pbLayout8", tableCellID: '#pbTableCell10', tableRowID: '#pbTableRow10', cellType: 0, count: 0, percent: 0, hidden: false},
      Atypical: {name: 'Atypical', character: -1, counterGridID: "", layoutGridID: "", tableCellID: '#pbTableCell0', tableRowID: '#pbTableRow0', cellType: 0, count: 0, percent: 0, hidden: true},
      Other: {name: 'Other', character: -1, counterGridID: "", layoutGridID: "", tableCellID: '#pbTableCell1', tableRowID: '#pbTableRow1', cellType: 0, count: 0, percent: 0, hidden: true},
    },
    'aspCountTable': {
      Blasts: {name: 'Blasts', character: 0, counterGridID: "#aspCounter9", layoutGridID: "aspLayout9", tableCellID: '#aspTableCell2', tableRowID: 'aspTableRow2', cellType: 5, count: 0, percent: 0, hidden: false},
      Neuts: {name: 'Neuts', character: 4, counterGridID: "#aspCounter3", layoutGridID: "aspLayout3", tableCellID: '#aspTableCell3', tableRowID: 'aspTableRow2', cellType: 1, count: 0, percent: 0, hidden: false},
      NRBCs: {name: 'NRBCs', character: 1, counterGridID: "#aspCounter6", layoutGridID: "aspLayout6", tableCellID: '#aspTableCell9', tableRowID: 'aspTableRow2', cellType: 3, count: 0, percent: 0, hidden: false},
      Lymphs: {name: 'Lymphs', character: 5, counterGridID: "#aspCounter4", layoutGridID: "aspLayout4", tableCellID: '#aspTableCell7', tableRowID: 'aspTableRow2', cellType: 0, count: 0, percent: 0, hidden: false},
      Monos: {name: 'Monos', character: 6, counterGridID: "#aspCounter5", layoutGridID: "aspLayout5", tableCellID: '#aspTableCell6', tableRowID: 'aspTableRow2', cellType: 2, count: 0, percent: 0, hidden: false},
      Metas: {name: 'Metas', character: 7, counterGridID: "#aspCounter0", layoutGridID: "aspLayout0", tableCellID: '#aspTableCell3', tableRowID: 'aspTableRow2', cellType: 1, count: 0, percent: 0, hidden: false},
      Promyelo: {name: 'Promyelo', character: ".", counterGridID: "#aspCounter10", layoutGridID: "aspLayout10", tableCellID: '#aspTableCell3', tableRowID: 'aspTableRow2', cellType: 1, count: 0, percent: 0, hidden: true},
      Myelo: {name: 'Myelo', character: 8, counterGridID: "#aspCounter1", layoutGridID: "aspLayout1", tableCellID: '#aspTableCell3', tableRowID: 'aspTableRow2', cellType: 1, count: 0, percent: 0, hidden: false},
      Plasma: {name: 'Plasma', character: 9, counterGridID: "#aspCounter2", layoutGridID: "aspLayout2", tableCellID: '#aspTableCell8', tableRowID: 'aspTableRow2', cellType: 0, count: 0, percent: 0, hidden: false},
      Eos: {name: 'Eos', character: 2, counterGridID: "#aspCounter7", layoutGridID: "aspLayout7", tableCellID: '#aspTableCell4', tableRowID: 'aspTableRow2', cellType: 2, count: 0, percent: 0, hidden: false},
      Basos: {name: 'Basos', character: 3, counterGridID: "#aspCounter8", layoutGridID: "aspLayout8", tableCellID: '#aspTableCell5', tableRowID: 'aspTableRow2', cellType: 2, count: 0, percent: 0, hidden: false},
      Atypical: {name: 'Atypical', character: -1, counterGridID: "", layoutGridID: "", tableCellID: '#aspTableCell0', tableRowID: 'aspTableRow2', cellType: 0, count: 0, percent: 0, hidden: true},
      Other: {name: 'Other', character: -1, counterGridID: "", layoutGridID: "", tableCellID: '#aspTableCell1', tableRowID: 'aspTableRow2', cellType: 0, count: 0, percent: 0, hidden: true},
    }
  };

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
    stainTab: 'stainPanel',
    diagnosisTab: 'diagnosisPanel'  
  };

  let cbcTableVisible = true;
  let positiveLabel = 4;
  let negativeLabel = 5;

  let patientAge = -1;
  let legalSex = -1;

  let cbcObject = {
    "WBC": {value: "", unit: "10ˆ3/µL"},
    "RBC": {value: "", unit: "10ˆ6/µL"},
    "HGB": {value: "", unit: "g/dL", low: "hgbLow", normal: "hgbNormal", high: "hgbHigh", mild: "hgbMild", marked: "hgbMarked", mildLowSetting: "cbcHgbLowMild", markedLowSetting: "cbcHgbLowMarked", mildHighSetting: "cbcHgbHighMild", markedHighSetting: "cbcHgbHighMarked"},
    "HCT": {value: "", unit: "%"},
    "MCV": {value: "", unit: "fL", low: "mcvLow", normal: "mcvNormal", high: "mcvHigh"},
    "MCH": {value: "", unit: "pg"},
    "MCHC": {value: "", unit: "g/dL", low: "hypochromic"},
    "PLT": {value: "", unit: "10ˆ3/µL", low: "pltLow", normal: "pltNormal", high: "pltHigh", mild: "pltMild", marked: "pltMarked", mildLowSetting: "cbcPltLowMild", markedLowSetting: "cbcPltLowMarked", mildHighSetting: "cbcPltHighMild", markedHighSetting: "cbcPltHighMarked"},
    "RDW": {value: "", unit: "%"},
    "NRBC's": {value: "", unit: "%", high: "nrbcPresent"},
    "Neutrophils": {value: "", unit: "%"},
    "Lymphocytes": {value: "", unit: "%"},
    "Monocytes": {value: "", unit: "%"},
    "Eosinophils": {value: "", unit: "%"},
    "Metamyelocytes": {value: "", unit: "%"},
    "Myelocytes": {value: "", unit: "%"},
    "Promyelocytes": {value: "", unit: "%"},
    "Blasts": {value: "", unit: "%"},
    "Immature Granulocytes": {value: "", unit: "%"},
    "Absolute Neutrophils": {value: "", unit: "10ˆ3/µL", low: "neutLow", normal: "neutNormal", high: "neutHigh", mild: "neutMild", marked: "neutMarked", mildLowSetting: "cbcNeutLowMild", markedLowSetting: "cbcNeutLowMarked", mildHighSetting: "cbcNeutHighMild", markedHighSetting: "cbcNeutHighMarked"},
    "Absolute Lymphocytes": {value: "", unit: "10ˆ3/µL", low: "lymphLow", normal: "lymphNormal", high: "lymphHigh", mild: "lymphMild", marked: "lymphMarked", mildLowSetting: "cbcLymphLowMild", markedLowSetting: "cbcLymphLowMarked", mildHighSetting: "cbcLymphHighMild", markedHighSetting: "cbcLymphHighMarked"},
    "Absolute Monocytes": {value: "", unit: "10ˆ3/µL", low: "monosLow", high: "monosHigh", mild: "monosMild", marked: "monosMarked", mildHighSetting: "cbcMonosHighMild", markedHighSetting: "cbcMonosHighMarked"},    "Absolute Eosinophils": {value: "", unit: "10ˆ3/µL", high: "eosHigh", mild: "eosMild", marked: "eosMarked", mildHighSetting: "cbcEosHighMild", markedHighSetting: "cbcEosHighMarked"},
    "Absolute Basophils": {value: "", unit: "10ˆ3/µL", high: "basoHigh", mild: "basoMild", marked: "basoMarked", mildHighSetting: "cbcBasoHighMild", markedHighSetting: "cbcBasoHighMarked"},
    "Absolute NRBCs": {value: "", unit: "10ˆ3/µL", high: "nrbcPresent"},
    "Absolute Metamyelocytes": {value: "", unit: "10ˆ3/µL"},
    "Absolute Myelocytes": {value: "", unit: "10ˆ3/µL"},
    "Absolute Promyelocytes": {value: "", unit: "10ˆ3/µL"},
    "Absolute Blasts": {value: "", unit: "10ˆ3/µL"},  
    "Absolute Immature Granulocytes": {value: "", unit: "10ˆ3/µL"},
  }

  const quantDescriptors = {class: "radio", descriptors: ["Rare", "Occasional", "Frequent"], value: ["rare ", "occasional ", "frequent "]};
  const degreeDescriptors = {class: "radio", descriptors: ["Slight", "Mild", "Marked"], value: ["slight ", "mild ", "marked "]};
  const dualDescriptors = {class: 'radio', descriptors: ['Positive', 'Negative'], value: ['positive', 'negative']}
  const noneDescriptors = {class: "none", descriptors: [], value: []};
  const stopDescriptors = {class: "stop", descriptors: [], value: []};
  const isDescriptors = {class: "hidden", descriptors: 'Is', value: 'is '};
  const showsDescriptors = {class: "hidden", descriptors: 'Shows', value: 'shows '};
  const ironDescriptors = {class: "iron", descriptors: {'Storage Iron': {labels: ['Increased', 'Adequate', 'Decreased', 'Inadequate'], value: ['increased', 'adequate', 'decreased', 'inadequate'], id: "storageIron"}, 'Ring Sideroblasts': {labels: ['Present', 'Absent', 'Inadequate'], value: ['present', 'absent', 'inadequate rings'], id: 'ringSideroblasts'}}};
  const reticulinDescriptors = {class: 'select', descriptors: ['','No increase in fibrosis', 'Focal, mildly increased fibrosis (MF-0 to MF-1)', 'Mildly increased fibrosis (MF-1)', 'Mild to moderately increased fibrosis (MF-1 to MF-2)','Moderately increased fibrosis (MF-2)','Moderate to severely increased fibrosis (MF-2 to MF-3)','Severely increased fibrosis (MF-3)'], value: ['','Shows no increase in marrow fibrosis.', 'Shows focal, mildly increased marrow fibrosis (MF-0 to MF-1).','Shows mildly increased marrow fibrosis (MF-1)','Shows mild to moderately increased marrow fibrosis (MF-1 to MF-2).','Shows moderately increased marrow fibrosis (MF-2).','Shows moderate to severely increased marrow fibrosis (MF-2 to MF-3).','Shows severely increased marrow fibrosis (MF-3).']}
  const cd3Descriptors = {class: 'select', descriptors: ['','Interstitially scattered','Interstitially scattered and focal loose aggregates','Interstitially scattered and focal aggregates','Interstitially scattered and focal clusters','Interstitially scattered and clusters'], value: ['','Highlights interstitially scattered small T cells.','Highlights interstitially scattered and focal loose aggregates of small T cells.','Highlights interstitially scattered and focal aggregates of small T cells.','Highlights interstitially scattered and focal clusters of small T cells.','Highlights interstitially scattered and clusters of small T cells.']}
  const cd20Descriptors = {class: 'selectDualCount', descriptors: ['','Interstitially scattered','Interstitially scattered and focal loose aggregates','Interstitially scattered and focal aggregates','Interstitially scattered and focal clusters','Interstitially scattered and clusters','Diffuse infiltrate of small B cells'], value: ['','Highlights interstitially scattered small B cells.','Highlights interstitially scattered and focal loose aggregates of small B cells.','Highlights interstitially scattered and focal aggregates of small B cells.','Highlights interstitially scattered and focal clusters of small B cells.','Highlights interstitially scattered and clusters of small B cells.','A diffuse infiltrate of small B cells (~***% of total cellularity)']}
  const cd34Descriptors = {class: 'selectDualCount', descriptors: ['','Not increased','Increased'], value: ['','Shows no increase in blasts (~***% of total cellularity).','Highlights increased blasts (~***% of total cellularity).']}
  const cd61Descriptors = {class: 'select', descriptors: ['','Adequate, regularly destributed','Increased, regularly destributed'], value: ['','Highlights adequate, regularly distributed megakaryocytes.','Highlights increased but regularly distributed megakaryocytes with unremarkable morphology.']}
  const cd71Descriptors = {class: 'select', descriptors: ['','Adequate', 'Proliferation'], value: ['','Highlights adequate erythroid precursors.','Shows a proliferation of erythroid precursors.']}
  const mpoDescriptors = {class: 'select', descriptors: ['','Adequate', 'Proliferation'], value: ['','Highlights adequate myeloid precursors.','Shows a proliferation of myeloid precursors.']}
  const cd138Descriptors = {class: 'selectDualCount', descriptors: ['','Not increased', 'Increased'], value: ['','Shows no increase in plasma cells (~***% of total cellularity).','Highlights increased plasma cells (~***% of total cellularity).']}
  const kappalambdaDescriptors = {class: 'select', descriptors: ['','Polytypic', 'Kappa restriction', 'Lambda restriction'], value: ['','Highlights polytypic plasma cells.','Shows kappa restriction in plasma cells.','Shows lambda restriction in plasma cells.']}
  const cd5Descriptors = {class: 'select', descriptors: ['','Highlights T cells with no apparent coexpression in B cells','Negative in neoplastic B cells','Negative in B cells','Positive in neoplastic B cells'], value: ['','Highlights T cells with no apparent coexpression in B cells.','Negative in B cells.', 'Negative in neoplastic B cells.', 'Positive in neoplastic B cells.',]}
  const ae1ae3Descriptors = {class: "radio", descriptors: ["Positive", "Negative"], value: ["Positive for metastatic carcinoma.", "Negative for metastatic carcinoma."]};

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
    "Microspherocytes",
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
    "Subset CLL-like",
    "Marginal zone-like",
    "Hairy cell-like"
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
    "Unremarkable": {descriptorObject: stopDescriptors, templateText: "unremarkable", id: "unremarkable"},
    "Predominantly unremarkable": {descriptorObject: stopDescriptors, templateText: "predominantly unremarkable", id: "predominantlyUnremarkable"},
    "Anisopoikilocytosis": {descriptorObject: noneDescriptors, templateText: "anisopoikilocytosis", id: "anisopoikilocytosis"},
    "Hypochromasia": {descriptorObject: noneDescriptors, templateText: "hypochromasia", id: "hypochromasia"},
    "Polychromasia": {descriptorObject: noneDescriptors, templateText: "polychromasia", id: "polychromasia"},
    "Acanthocytes": {descriptorObject: quantDescriptors, templateText: "acanthocytes", id: "acanthocytes"},
    "Basophilic stippling": {descriptorObject: quantDescriptors, templateText: "basophilic stippling", id: "basophilicStippling"},
    "Bite cells": {descriptorObject: quantDescriptors, templateText: "bite cells", id: "biteCells"},
    "Blister cells": {descriptorObject: quantDescriptors, templateText: "blister cells", id: "blisterCells"},
    "Burr cells": {descriptorObject: quantDescriptors, templateText: "burr cells", id: "burrCells"},
    "Echinocytes": {descriptorObject: quantDescriptors, templateText: "echinocytes", id: "echinocytes"},
    "Elliptocytes": {descriptorObject: quantDescriptors, templateText: "elliptocytes", id: "elliptocytes"},
    "Howell-Jolly bodies": {descriptorObject: quantDescriptors, templateText: "Howell-Jolly bodies", id: "howellJolly"},
    "Macroovalocytes": {descriptorObject: quantDescriptors, templateText: "macroovalocytes", id: "macroovalocytes"},
    "Ovalocytes": {descriptorObject: quantDescriptors, templateText: "ovalocytes", id: "ovalocytes"},
    "Schistocytes": {descriptorObject: quantDescriptors, templateText: "schistocytes", id: "schistocytes"},
    "Spherocytes": {descriptorObject: quantDescriptors, templateText: "spherocytes", id: "spherocytes"},
    "Sickle cells": {descriptorObject: quantDescriptors, templateText: "sickle cells", id: "sickleCells"},
    "Target cells": {descriptorObject: quantDescriptors, templateText: "target cells", id: "targetCells"},
    "Teardrop cells": {descriptorObject: quantDescriptors, templateText: "teardrop cells", id: "teardropCells"},
    "Teardrop forms": {descriptorObject: quantDescriptors, templateText: "teardrop forms", id: "teardropForms"},
    "Hypogranular forms": {descriptorObject: quantDescriptors, templateText: "hypogranular forms", id: "hypogranularForms"},
    "Hypolobated forms": {descriptorObject: quantDescriptors, templateText: "hypolobated forms", id: "hypolobatedForms"},
    "Hypersegmented forms": {descriptorObject: quantDescriptors, templateText: "hypersegmented forms", id: "hypersegmentedForms"}, 
    "Shift to immaturity": {descriptorObject: degreeDescriptors, templateText: "shift to immaturity", id: "shiftToImmaturity", prefix: "a "},
    "Toxic changes": {descriptorObject: degreeDescriptors, templateText: "toxic changes", id: "toxicChanges"},
    "Small mature": {descriptorObject: quantDescriptors, templateText: "small, mature lymphocytes", id: "smallMature"},
    "Large granular": {descriptorObject: quantDescriptors, templateText: "large granular lymphocytes", id: "largeGranular"},
    "Reactive": {descriptorObject: quantDescriptors, templateText: "reactive lymphocytes", id: "reactive"},
    "CLL-like": {descriptorObject: noneDescriptors, templateText: "small, mature lymphocytes with clumped chromatin", id: "cllLike"},
    "Mature-appearing morphology": {descriptorObject: noneDescriptors, templateText: "mature-appearing morphology", id: "matureMorphology"}, 
    "Hypogranular platelets": {descriptorObject: quantDescriptors, templateText: "hypogranular platelets", id: "hypogranularPlatelets"},
    "Large platelets": {descriptorObject: quantDescriptors, templateText: "large platelets", id: "largePlatelets"},
    "Giant platelets": {descriptorObject: quantDescriptors, templateText: "giant platelets", id: "giantPlatelets"},
    "Hemodilute": {descriptorObject: noneDescriptors, templateText: "hemodilute", id: "hemodilute"},
    "Paucicellular": {descriptorObject: noneDescriptors, templateText: "paucicellular", id: "paucicellular"},
    "Virtually acellular": {descriptorObject: noneDescriptors, templateText: "virtually acellular", id: "virtuallyAcellular"},
    "Paucispicular": {descriptorObject: noneDescriptors, templateText: "paucispicular", id: "paucispicular"},
    "Aspiculate": {descriptorObject: noneDescriptors, templateText: "aspiculate", id: "aspiculate"},
    "Nuclear budding": {descriptorObject: quantDescriptors, templateText: "nuclear budding", id: "nuclearBudding"},
    "Nuclear contour irregularity": {descriptorObject: quantDescriptors, templateText: "nuclear contour irregularity", id: "nuclearContourIrregularity"},
    "Multinucleation": {descriptorObject: quantDescriptors, templateText: "multinucleation", id: "multinucleation"},
    "Megaloblastoid changes": {descriptorObject: quantDescriptors, templateText: "megaloblastoid changes", id: "megaloblastoid"},
    "Widely separated nuclear lobes": {descriptorObject: quantDescriptors, templateText: "widely separated nuclear lobes", id: "widelySeparatedNuclearLobes"},
    "Separation of nuclear lobes": {descriptorObject: quantDescriptors, templateText: "separation of nuclear lobes", id: "separationNuclearLobes"},
    "Small hypolobated forms": {descriptorObject: quantDescriptors, templateText: "small hypolobated forms", id: "smallHypolobated"},
    "Micromegakaryocytes": {descriptorObject: quantDescriptors, templateText: "micromegakaryocytes", id: "micromegakaryocytes"},
    "Large hypersegmented forms": {descriptorObject: quantDescriptors, templateText: "large hypersegmented forms", id: "largeHypersegmented"},
    "Large, atypical forms with prominent nucleoli": {descriptorObject: quantDescriptors, templateText: "large, atypical forms with prominent nucleoli", id: "largeAtypical"},
    "Crush artifact": {descriptorObject: showsDescriptors, templateText: "crush artifact", id: "crushArtifact", prefix: "a "},
    "Aspiration artifact": {descriptorObject: showsDescriptors, templateText: "aspiration artifact", id: "aspirationArtifact", prefix: "an "},
    "Fragmented": {descriptorObject: isDescriptors, templateText: "fragmented", id: "fragmented"},
    "Subcortical": {descriptorObject: isDescriptors, templateText: "subcortical", id: "subcortical"},
    "Predominantly subcortical": {descriptorObject: isDescriptors, templateText: "predominantly subcortical", id: "predominantlySubcortical"},
    "Small": {descriptorObject: isDescriptors, templateText: "small", id: "small"},
    'Iron': {descriptorObject: ironDescriptors, value: '', positive: 0, negative: 0, count: 0, id: "iron"},
    'Reticulin': {descriptorObject: reticulinDescriptors, id: "reticulin"},
    'Congo red': {descriptorObject: dualDescriptors, id: "congoRed"},
    'GMS': {descriptorObject: dualDescriptors, id: "gms"},
    'AFB': {descriptorObject: dualDescriptors, id: "afb"},
    'CD3': {descriptorObject: cd3Descriptors, id: "cd3"},
    'CD20': {descriptorObject: cd20Descriptors, value: '', positive: 0, negative: 0, count: 0, id: "cd20"},
    'CD5': {descriptorObject: cd5Descriptors, id: "cd5"},
    'CD34': {descriptorObject: cd34Descriptors, value: '', positive: 0, negative: 0, count: 0, id: "cd34"},
    'CD61': {descriptorObject: cd61Descriptors, id: "cd61"},
    'CD71': {descriptorObject: cd71Descriptors, id: "cd71"},
    'CD138': {descriptorObject: cd138Descriptors, value: '', positive: 0, negative: 0, count: 0, id: "cd138"},
    'Cytokeratin AE1/AE3': {descriptorObject: ae1ae3Descriptors, id: "ckAE1AE3"},
    'Kappa/Lambda IHC': {descriptorObject: kappalambdaDescriptors, id: "kappalambdaIHC"},
    'Kappa/Lambda ISH': {descriptorObject: kappalambdaDescriptors, id: "kappalambdaISH"},
    'MPO': {descriptorObject: mpoDescriptors, id: "mpo"},
  };

const comments = [
    {
      id: "comm_pancytopenia_myeloid_negative",
      text: "The morphologic and immunophenotypic findings show no definitive evidence of a myeloid neoplasm. In the context of the patient's cytopenias, the marrow findings are non-specific. Clinical correlation is recommended to evaluate for non-clonal or secondary etiologies, which may include nutritional deficiencies (e.g., vitamin B12, folate, copper), medication or toxin effects, viral infections, immune-mediated peripheral destruction, or systemic autoimmune disorders. Correlation with concurrent cytogenetic and molecular studies is recommended to further definitively exclude an occult clonal process.",
      rules: [
        {
          logic: "",
          points: 10,

        }
      ]
    },
    {
      id: "comm_mgus_less_than_10",
      text: "The bone marrow shows a slightly increased plasma cell population (<10% of marrow cellularity) with clonal restriction. In a patient with a known history of MGUS, these findings are consistent with a plasma cell neoplasm. Clinical correlation is required to exclude multiple myeloma.",
      rules: [
          {
            logic: "A AND B AND (C or D or E or F)",
            conditions: {
                A: { ruleType: "diffCount", targetID: "aspCountTable", targetValue: "Plasma", operator: ">", expectedValue: 2 },
                B: { ruleType: "diffCount", targetID: "aspCountTable", targetValue: "Plasma", operator: "<", expectedValue: 10},
                C: { ruleType: "selectGroup", targetID: "coreImmunostainsSelectDiv", targetValue: "Kappa restriction" },
                D: { ruleType: "selectGroup", targetID: "clotImmunostainsSelectDiv", targetValue: "Lambda restriction" },
                E: { ruleType: "selectGroup", targetID: "clotImmunostainsSelectDiv", targetValue: "Kappa restriction" },
                F: { ruleType: "selectGroup", targetID: "clotImmunostainsSelectDiv", targetValue: "Lambda restriction" },
                points: 10,
            }
          }
      ]
    },
    {
        id: "comm_mgus_greater_than_10",
        text: "The bone marrow shows an elevated clonal plasma cell population (≥10% of marrow cellularity). These findings are diagnostic of a plasma cell neoplasm. Depending on the presence or absence of myeloma-defining events or end-organ damage (CRAB features), this may represent smoldering multiple myeloma or overt multiple myeloma.",
        rules: [
            {
                logic: "A AND B AND ((C AND (D or E)) or (F and (G or H)))",
                conditions: {
                    A: { ruleType: "diffCount", targetID: "aspCountTable", targetValue: "Plasma", operator: ">=", expectedValue: 10 },
                    B: { ruleType: "diffCount", targetID: "aspCountTable", targetValue: "Plasma", operator: "<", expectedValue: 60},
                    C: { ruleType: "selectGroup", targetID: "coreImmunostainsSelectDiv", targetValue: "Kappa/Lambda ISH" },
                    D: { ruleType: "selectGroup", targetID: "coreImmunostainsSelectDiv", targetValue: "Kappa restriction" },
                    E: { ruleType: "selectGroup", targetID: "coreImmunostainsSelectDiv", targetValue: "Kappa/Lambda ISH" },
                    F: { ruleType: "selectGroup", targetID: "clotImmunostainsSelectDiv", targetValue: "Lambda restriction" },
                    G: { ruleType: "selectGroup", targetID: "clotImmunostainsSelectDiv", targetValue: "Kappa restriction" },
                    H: { ruleType: "selectGroup", targetID: "clotImmunostainsSelectDiv", targetValue: "Lambda restriction" },
                    points: 10,
                }
            }
        ]
    },
    {
        id: "comm_cml",
        text: "The findings are consistent with chronic myeloid leukemia.",
        rules: [
            { ruleType: "selectGroup", targetID: "neutrophilSelectDiv", targetValue: "Shift to immaturity", points: 5 },
            { ruleType: "inputChecked", targetID: "hypercellular", targetValue: true, points: 5 },
            { ruleType: "inputChecked", targetID: "cellularityMarked", targetValue: true, points: 5 },
        ]
    },
    {
        id: "comm_mpn",
        text: "The findings are consistent with a myeloproliferative neoplasm.",
        rules: [
            { ruleType: "cbcData", targetID: "PLT", operator: ">=", targetValue: 450, points: 10 }
        ]
    },
    {
        id: "comm_older_male",
        text: "The patient is an older male.",
        rules: [
            {
                points: 10,
                logic: "A AND B",
                conditions: {
                    A: { ruleType: "demographics", targetID: "patientAge", operator: ">=", targetValue: 65 },
                    B: { ruleType: "demographics", targetID: "legalSex", operator: "==", targetValue: "M" }
                }
            }
        ]
    },
    {
        id: "comm_frequent_immaturity",
        text: "There is a prominent left shift in the myeloid lineage.",
        rules: [
            { ruleType: "selectWithDescriptor", targetID: "neutrophilSelectDiv", targetValue: "shift to immaturity", descriptorValue: "marked", points: 10 }
        ]
    }
];

  const gridLayouts = {
    'Numbers only': [[-1,-1,-1],[7,8,9],[4,5,6],[1,2,3],[-1,0,-1]],
    'Numbers and period': [[-1,-1,-1],[7,8,9],[4,5,6],[1,2,3],[-1,0,"."]],
    'Expanded': [[-1,"/","*"],[7,8,9],[4,5,6],[1,2,3],[-1,0,"."]],
  };

  const selectMasterList = {
    aniso: anisoList,
    rbc: rbcList,
    neutrophil: neutrophilList,
    lymphocyte: lymphocyteList,
    monocyte: monocyteList,
    platelet: plateletList,
    adequacy: adequacyList,
    coreAdequacy: coreAdequacyList,
    erythroid: erythroidList,
    myeloid: myeloidList,
    aspMeg: aspMegList,
    plasma: aspPlasmaList,
    coreMeg: coreMegList,
    aspirateSpecialStains: aspirateSpecialStainsList,
    specialStains: specialStainsList,
    immunostains: immunostainsList,
    diffLayout: layoutList,
    cellularityCalculation: cellularityList
  };
