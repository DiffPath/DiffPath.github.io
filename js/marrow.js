$(document).ready(function() {

  /*
    The variables pbCountTable and aspCountTable are utilized to calculate
    the percentages of each cell type when the user performs a differential.
    The array syntax is as follows: ['cell type', 'character associated with
    the cell type', corresponding HTML ID number, cell type handler (explained 
    below), number of cells already counted for given cell type (baseline = 0),
    row hidden value (1 = yes, 2 = no)]
  
    0 = No special type
    1 = Myeloid cell for M:E ratio calculation
    2 = Erythroid cell for M:E ratio calculation
    3 = Circulating NRBC
    4 = Blast
    */
  
  let headerObject = {
    templateTab: 'templatePanel',
    settingTab: 'settingPanel',
    helpTab: 'helpPanel',
    infoTab: 'infoPanel',
    refTab: 'refPanel',
    diffTab: 'diffPanel',
    specTab: 'specPanel',
    pbTab: 'pbPanel',
    aspTab: 'aspPanel',
    coreTab: 'corePanel',
    stainTab: 'stainPanel'    
  };

  let cbcObject = {}, radioObject = {};
  let pbCountTable = getSavedItems()[0];
  let aspCountTable = getSavedItems()[1];

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

  const cbcVariables = ["WBC", "RBC", "HGB", "MCV", "MCHC", "PLT", "NRBC", "Absolute Neutrophils", "Absolute Lymphocytes", "Absolute Monocytes", "Absolute Eosinophils", "Absolute Basophils", "Absolute NRBCs"];
  
  const quantDescriptors = {class: "radio", descriptors: ["Rare", "Occasional", "Frequent"], value: ["rare ", "occasional ", "frequent "]};
  const degreeDescriptors = {class: "radio", descriptors: ["Slight", "Mild", "Marked"], value: ["slight ", "mild", "marked "]};
  const altDegreeDescriptors = {class: "radio", descriptors: ["Slight", "Mild", "Marked"], value: ["a slight ", "a mild ", "a marked "]};
  const dualDescriptors = {class: 'radio', descriptors: ['Positive', 'Negative'], value: ['positive', 'negative']}
  const noneDescriptors = {class: "none", descriptors: "", value: []};
  const stopDescriptors = {class: "stop", descriptors: "", value: []};
  const ironDescriptors = {class: "iron", descriptors: {'Storage Iron': ['Increased', 'Adequate', 'Decreased', 'Inadequate'], 'Ring Sideroblasts': ['Present', 'Absent', 'Inadequate']}, value: {'Storage Iron': ['increased', 'adequate', 'decreased', 'inadequate'], 'Ring Sideroblasts': ['present', 'absent', 'inadequate rings']},};
  const reticulinDescriptors = {class: 'radio', descriptors: ['MF-0', 'MF-1', 'MF-2', 'MF-3'], value: ['MF-0', 'MF-1', 'MF-2', 'MF-3']}
  const cd3Descriptors = {class: 'select', descriptors: ['','Interstitially scattered','Interstitially scattered and focal clusters'], value: ['','Highights interstitially scattered small T cells.','Highlights interstitially scattered and focal clusters of small T cells.']}
  const cd20Descriptors = {class: 'select', descriptors: ['','Interstitially scattered','Interstitially scattered and focal clusters'], value: ['','Highights interstitially scattered small B cells.','Highlights interstitially scattered and focal clusters of small B cells.']}
  const cd34Descriptors = {class: 'select', descriptors: ['','Not increased','Increased'], value: ['','Shows no increase in blasts (*** of total cellularity).','Highlights increased blasts (*** of total cellularity).']}
  const cd61Descriptors = {class: 'select', descriptors: ['','Adequate, regularly destributed, unremarkable morphology','Increased, regularly destributed'], value: ['','Highlights adequate, regularly distributed megakaryocytes with unremarkable morphology.','Highlights increased but regularly distributed megakaryocytes with unremarkable morphology.']}

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
    "Monotypic"
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

  const megakaryocyteList = [
    "",
    "Widely separated nuclear lobes",
    "Separation of nuclear lobes",
    "Hypolobated forms",
    "Small hypolobated forms",
    "Micromegakaryocytes",
  ];

  const aspirateSpecialStainsList = [
    "",
    "Iron",
  ]

  const coreSpecialStainsList = [
    "",
    "Iron",
    "Reticulin",
    "Congo red",
    "GMS",
    "AFB"
  ]

  const clotSpecialStainsList = [
    "",
    "Iron",
    "Reticulin",
    "Congo red",
    "GMS",
    "AFB"
  ]

  const coreImmunostainsList = [
    "",
    "CD3",
    "CD20",
    "CD34",
    "CD61",
    "CD71",
    "MPO",
  ]

  const clotImmunostainsList = [
    "",
    "CD3",
    "CD20",
    "CD34",
    "CD61",
    "CD71",
    "MPO",
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
    "Sickle cells": {descriptorObject: quantDescriptors, templateText: "sickle cells"},
    "Target cells": {descriptorObject: quantDescriptors, templateText: "target cells"},
    "Teardrop cells": {descriptorObject: quantDescriptors, templateText: "teardrop cells"},
    "Teardrop forms": {descriptorObject: quantDescriptors, templateText: "teardrop forms"},
    "Hypogranular forms": {descriptorObject: quantDescriptors, templateText: "hypogranular forms"},
    "Hypolobated forms": {descriptorObject: quantDescriptors, templateText: "hypolobated forms"},
    "Hypersegmented forms": {descriptorObject: quantDescriptors, templateText: "hypogranular forms"}, 
    "Shift to immaturity": {descriptorObject: altDegreeDescriptors, templateText: "a shift to immaturity"},
    "Toxic changes": {descriptorObject: degreeDescriptors, templateText: "toxic changes"},
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
    "Crush artifact": {descriptorObject: noneDescriptors, templateText: "crush artifact"},
    "Aspiration artifact": {descriptorObject: noneDescriptors, templateText: "aspiration artifact"},
    "Fragmented": {descriptorObject: noneDescriptors, templateText: "fragmented"},
    "Subcortical": {descriptorObject: noneDescriptors, templateText: "subcortical"},
    "Predominantly subcortical": {descriptorObject: noneDescriptors, templateText: "predominantly subcortical"},
    "Small": {descriptorObject: noneDescriptors, templateText: "small"},
    'Iron': {descriptorObject: ironDescriptors},
    'Reticulin': {descriptorObject: reticulinDescriptors},
    'Congo red': {descriptorObject: dualDescriptors},
    'GMS': {descriptorObject: dualDescriptors},
    'AFB': {descriptorObject: dualDescriptors},
    'CD3': {descriptorObject: cd3Descriptors},
    'CD20': {descriptorObject: cd20Descriptors},
    'CD34': {descriptorObject: cd34Descriptors},
    'CD61': {descriptorObject: cd61Descriptors},
  };

  const masterList = {
    anisoSelect: anisoList,
    rbcSelect: rbcList,
    neutrophilSelect: neutrophilList,
    lymphocyteSelect: lymphocyteList,
    plateletSelect: plateletList,
    adequacySelect: adequacyList,
    coreAdequacySelect: coreAdequacyList,
    erythroidSelect: erythroidList,
    myeloidSelect: myeloidList,
    megakaryocyteSelect: megakaryocyteList,
    aspirateSpecialStainsSelect: aspirateSpecialStainsList,
    coreSpecialStainsSelect: coreSpecialStainsList,
    clotSpecialStainsSelect: clotSpecialStainsList,
    coreImmunostainsSelect: coreImmunostainsList,
    clotImmunostainsSelect: clotImmunostainsList,
    "pbCountTable": pbCountTable,
    "aspCountTable": aspCountTable
  };

  for (key in masterList){
    fillOptions(key);
  }

  function getSavedItems(){
    let pbCountTable = {
      Blasts: {name: 'Blasts', character: 0, tableID: 0, cellType: 5, count: 0, percent: 0, hidden: true},
      Neuts: {name: 'Neuts', character: 4, tableID: 4, cellType: 1, count: 0, percent: 0, hidden: false},
      NRBCs: {name: 'NRBCs', character: 1, tableID: 12, cellType: 4, count: 0, percent: 0, hidden: true},
      Lymphs: {name: 'Lymphs', character: 5, tableID: 5, cellType: 0, count: 0, percent: 0, hidden: false},
      Monos: {name: 'Monos', character: 6, tableID: 6, cellType: 2, count: 0, percent: 0, hidden: false},
      Metas: {name: 'Metas', character: 7, tableID: 3, cellType: 1, count: 0, percent: 0, hidden: true},
      Myelo: {name: 'Myelo', character: 8, tableID: 2, cellType: 1, count: 0, percent: 0, hidden: true},
      Promyelo: {name: 'Promyelo', character: -1, tableID: 1, cellType: 1, count: 0, percent: 0, hidden: true},
      Plasma: {name: 'Plasma', character: 9, tableID: 9, cellType: 0, count: 0, percent: 0, hidden: true},
      Eos: {name: 'Eos', character: 2, tableID: 7, cellType: 2, count: 0, percent: 0, hidden: false},
      Basos: {name: 'Basos', character: 3, tableID: 8, cellType: 2, count: 0, percent: 0, hidden: false},
      Atypical: {name: 'Atypical', character: -1, tableID: 10, cellType: 0, count: 0, percent: 0, hidden: true},
      Other: {name: 'Other', character: -1, tableID: 11, cellType: 0, count: 0, percent: 0, hidden: true},
    }
    let aspCountTable = {
      Blasts: {name: 'Blasts', character: 0, tableID: 10, cellType: 5, count: 0, percent: 0, hidden: false},
      Neuts: {name: 'Neuts', character: 4, tableID: 4, cellType: 1, count: 0, percent: 0, hidden: false},
      NRBCs: {name: 'NRBCs', character: 1, tableID: 9, cellType: 3, count: 0, percent: 0, hidden: false},
      Lymphs: {name: 'Lymphs', character: 5, tableID: 5, cellType: 0, count: 0, percent: 0, hidden: false},
      Monos: {name: 'Monos', character: 6, tableID: 6, cellType: 2, count: 0, percent: 0, hidden: false},
      Metas: {name: 'Metas', character: 7, tableID: 3, cellType: 1, count: 0, percent: 0, hidden: false},
      Promyelo: {name: 'Promyelo', character: -1, tableID: 1, cellType: 1, count: 0, percent: 0, hidden: true},
      Myelo: {name: 'Myelo', character: 8, tableID: 2, cellType: 1, count: 0, percent: 0, hidden: false},
      Plasma: {name: 'Plasma', character: 9, tableID: 0, cellType: 0, count: 0, percent: 0, hidden: false},
      Eos: {name: 'Eos', character: 2, tableID: 7, cellType: 2, count: 0, percent: 0, hidden: false},
      Basos: {name: 'Basos', character: 3, tableID: 8, cellType: 2, count: 0, percent: 0, hidden: false},
      Atypical: {name: 'Atypical', character: -1, tableID: 11, cellType: 0, count: 0, percent: 0, hidden: true},
      Other: {name: 'Other', character: -1, tableID: 12, cellType: 0, count: 0, percent: 0, hidden: true},
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
    $("#"+headerObject[this.id]).show();
    $(this).addClass("clicked")
    $(this).removeClass("unclicked")
  });

  $(".specimen").change(function() {
    $(specAll).prop("checked", false)
    radioObject.specAll = 0;
  });

  $('#specAll').click(function() {
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
    let cbcVar = [...cbcVariables];
    const cbcLines = $('#pbCBC').val().split("\n");
    let toggle = true;
    for (let i = 0; i < cbcLines.length; i++) {
      cbcFinal.push(cbcLines[i].split('\t'))
    }
    for (i in cbcFinal) {
      for (j in cbcVar){
        if (cbcFinal[i][0] == cbcVar[j]){
          cbcObject[cbcVar[j]] = {};
          cbcObject[cbcVar[j]]["min"] = parseFloat(cbcFinal[parseInt(i)+1][0].replace(/10\W3/g,'').replace(/10\W6/g,'').replace(/[^0-9.\-]/g, '').split('-')[0]);
          cbcObject[cbcVar[j]]["max"] = parseFloat(cbcFinal[parseInt(i)+1][0].replace(/10\W3/g,'').replace(/10\W6/g,'').replace(/[^0-9.\-]/g, '').split("-")[1]);
          cbcObject[cbcVar[j]]["value"] = parseFloat(cbcFinal[parseInt(i)+1][1]);
          delete cbcVar[j];
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
      let descriptorValue = "";
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
              selectHTML += "<div><textarea class='extend' id='pbCBC' rows='1' placeholder='Count Here'></textarea></div>"
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
    for (i in stringArray[0]){
      if (stringArray[0].length == 1){
        listString = `${stringArray[0][0]}${addCommas(stringArray[1][0])}`;
      } else if (stringArray[0].length == 2){
        if(stringArray[1][0].length == 1 && stringArray[1][1].length == 1){
          listString = `${stringArray[0][0]}${stringArray[1][0]} and ${stringArray[0][1]}${stringArray[1][1]}`;
        } else {
          listString = `${stringArray[0][0]}${addCommas(stringArray[1][0])} with ${stringArray[0][1]}${addCommas(stringArray[1][1])}`;
        }
      } else if (stringArray[0].length > 2){
        for (i in stringArray[0]){
          listString += `${stringArray[0][i]}${addCommas(stringArray[1][i])}`;
          if (i == 1){
            listString += ` with `;
          } else if (stringArray[0]){

          };
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
    let table = typeObject[id]["table"];
    let dcount =  $(typeObject[id]["dcountID"]).val();
    if (dcount == ""){
      dcount = parseInt($(typeObject[id]["dcountID"]).attr('placeholder'));
    }
    let ccount = $(typeObject[id]["ccountID"]).val();
    if($("#countExtra").prop('checked') == false && ccount == dcount){
      return;
    }
    let totalCount = cellCounter(table, id);
    let countSum = 0, myeloidSum = 0, erythroidSum = 0, neutSum = 0;
    if (totalCount != 0) {
      $(typeObject[id]["tableDivID"]).show();
    } else {
      $(typeObject[id]["tableDivID"]).hide();
    }

    for (const i in table){
      if($("#roundDesired").prop('checked')){
        table[i]["percent"] = (Math.round((table[i]["count"] / totalCount) * dcount) / (dcount/100)).toFixed(1);
      } else {
        table[i]["percent"] = (100*table[i]["count"]/totalCount).toFixed(1);
      }
      if (table[i]["cellType"] != 4){
        countSum += parseFloat(table[i]["percent"]);
      }
    }
    if (totalCount != 0){
      if (dcount == totalCount){
        new Audio('https://diffpath.github.io/media/Complete-Nice.mp3').play(); 
      } else if ((totalCount % 100) == 0){
        new Audio('https://diffpath.github.io/media/100-Soothing.mp3').play();
      }
    }   
    $(typeObject[id]["ccountID"]).val(totalCount);
    if($("#roundHundred").prop('checked')){
      if(countSum.toFixed(1) != 100 && ccount != dcount && totalCount > 0){
        while (countSum.toFixed(1) != 100){
          let x;
          if (countSum.toFixed(1) < 100){
            x = parseFloat((100/dcount).toFixed(1));
          } else {
            x = parseFloat(0-(100/dcount).toFixed(1));
          }
          if (Math.abs(100-countSum) < Math.abs(x*0.5)){
            break
          }
          let minDifference = 100;
          let minID;
          for (const i in table){
            if (table[i]["percent"]-(100*table[i]["count"]/totalCount)<minDifference && table[i]["percent"] != 0){
              minDifference = Math.abs(table[i]["percent"]-(100*table[i]["count"]/totalCount)-x);
              minID = i;
            }
          }
          table[minID]["percent"] = (parseFloat(table[minID]["percent"])+x).toFixed(1);
          countSum += x;
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
            $(typeObject[id]["tableID"] + table[i]["tableID"]).html(table[i]["percent"] + "%");
          }
        } else {
          $(typeObject[id]["characterID"] + table[i]["character"]).val(table[i]["percent"] + "%");
          $(typeObject[id]["tableID"] + table[i]["tableID"]).html(table[i]["percent"] + "%");
        }
       
      } else if (totalCount > 0) {
        $(typeObject[id]["characterID"] + table[i]["character"]).val(table[i]["percent"]);
        $(typeObject[id]["tableID"] + table[i]["tableID"]).html(table[i]["percent"]);
      } else {
        $(typeObject[id]["characterID"] + table[i]["character"]).val("");
        $(typeObject[id]["tableID"] + table[i]["tableID"]).html("");
      }
      if (table[i]["hidden"]) {
        if(table[i]["count"] > 0){
          $("#" + id + "_" + table[i]["name"].toLowerCase() + "_row").show();
        } else {
          $("#" + id + "_" + table[i]["name"].toLowerCase() + "_row").hide();
        }
      }
    }
    if (id == "asp"){
      if (erythroidSum != 0){
        $('#meRatio').val((myeloidSum/erythroidSum).toFixed(1) + ":1");
        $('#aspTable99').html((myeloidSum/erythroidSum).toFixed(1) + ":1");
      } else if (erythroidSum == 0){
        $('#meRatio').val("N/A");
        $('#aspTable99').html("N/A");
      }
      $('#aspTable4').html((neutSum).toFixed(1) + "%");
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
    checkDuplicate(this.className,this.id,$(this).val());
  }
  );

  $('.aspCounterTemplate').change(function(){
    checkDuplicate(this.className,this.id,$(this).val());
  }
  );

  $('#blastCheck').change(function(){
    countCells("asp");
  })

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
  });

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
    if (cbcObject["HGB"] !== undefined) {
      if (cbcObject["HGB"]["value"] > cbcObject["HGB"]["min"] && cbcObject["HGB"]["value"] < cbcObject["HGB"]["max"]) {
        $('#hgbNormal').prop("checked", true);
        $('#hgbMild').prop("checked", false);
        $('#hgbMarked').prop("checked", false);
      } else if (cbcObject["HGB"]["value"] < cbcObject["HGB"]["min"]) {
        $('#hgbLow').prop("checked", true);
        if (cbcObject["HGB"]["value"] < $("#cbcHgbLowMarked").val() && $("#cbcHgbLowMarked").val() != '') {
          $('#hgbMarked').prop("checked", true);
          $('#hgbMild').prop("checked", false);
        } else if (cbcObject["HGB"]["value"] > $("#cbcHgbLowMild").val() && $("#cbcHgbLowMild").val() != '') {
          $('#hgbMild').prop("checked", true);
          $('#hgbMarked').prop("checked", false);
        } else {
          $('#hgbMild').prop("checked", false);
          $('#hgbMarked').prop("checked", false);
        }
      } else if (cbcObject["HGB"]["value"] > cbcObject["HGB"]["max"]) {
        $('#hgbHigh').prop("checked", true);
        if (cbcObject["HGB"]["value"] > $("#cbcHgbHighMarked").val() && $("#cbcHgbHighMarked").val() != '') {
          $('#hgbMarked').prop("checked", true);
          $('#hgbMild').prop("checked", false);
        } else if (cbcObject["HGB"]["value"] < $("#cbcHgbHighMild").val() && $("#cbcHgbHighMild").val() != '') {
          $('#hgbMild').prop("checked", true);
          $('#hgbMarked').prop("checked", false);
        } else {
          $('#hgbMild').prop("checked", false);
          $('#hgbMarked').prop("checked", false);
        }
      }
    }
    if (cbcObject["MCV"] !== undefined) {
      if (cbcObject["MCV"]["value"] > cbcObject["MCV"]["min"] && cbcObject["MCV"]["value"] < cbcObject["MCV"]["max"]) {
        $('#mcvNormal').prop("checked", true);
      } else if (cbcObject["MCV"]["value"] < cbcObject["MCV"]["min"]) {
        $('#mcvLow').prop("checked", true);
      } else if (cbcObject["MCV"]["value"] > cbcObject["MCV"]["max"]) {
        $('#mcvHigh').prop("checked", true);
      }
    }
    if (cbcObject["Absolute Neutrophils"] !== undefined) {
      if (cbcObject["Absolute Neutrophils"]["value"] > cbcObject["Absolute Neutrophils"]["min"] && cbcObject["Absolute Neutrophils"]["value"] < cbcObject["Absolute Neutrophils"]["max"]) {
        $('#neutNormal').prop("checked", true);
        $('#neutMild').prop("checked", false);
        $('#neutMarked').prop("checked", false);
      } else if (cbcObject["Absolute Neutrophils"]["value"] < cbcObject["Absolute Neutrophils"]["min"]) {
        $('#neutLow').prop("checked", true);
        if (cbcObject["Absolute Neutrophils"]["value"] < $("#cbcNeutLowMarked").val() && $("#cbcNeutLowMarked").val() != '') {
          $('#neutMarked').prop("checked", true);
          $('#neutMild').prop("checked", false);
        } else if (cbcObject["Absolute Neutrophils"]["value"] > $("#cbcNeutLowMild").val() && $("#cbcNeutLowMild").val() != '') {
          $('#neutMild').prop("checked", true);
          $('#neutMarked').prop("checked", false);
        } else {
          $('#neutMild').prop("checked", false);
          $('#neutMarked').prop("checked", false);
        }
      } else if (cbcObject["Absolute Neutrophils"]["value"] > cbcObject["Absolute Neutrophils"]["max"]) {
        $('#neutHigh').prop("checked", true);
        if (cbcObject["Absolute Neutrophils"]["value"] > $("#cbcNeutHighMarked").val() && $("#cbcNeutHighMarked").val() != '') {
          $('#neutMarked').prop("checked", true);
          $('#neutMild').prop("checked", false);
        } else if (cbcObject["Absolute Neutrophils"]["value"] < $("#cbcNeutHighMild").val() && $("#cbcNeutHighMild").val() != '') {
          $('#neutMild').prop("checked", true);
          $('#neutMarked').prop("checked", false);
        } else {
          $('#neutMild').prop("checked", false);
          $('#neutMarked').prop("checked", false);
        }
      }
    }
    if (cbcObject["Absolute Lymphocytes"] !== undefined) {
      if (cbcObject["Absolute Lymphocytes"]["value"] >= cbcObject["Absolute Lymphocytes"]["min"] && cbcObject["Absolute Lymphocytes"]["value"] <= cbcObject["Absolute Lymphocytes"]["max"]) {
        $('#lymphNormal').prop("checked", true);
        $('#lymphMild').prop("checked", false);
        $('#lymphMarked').prop("checked", false);
      } else if (cbcObject["Absolute Lymphocytes"]["value"] < cbcObject["Absolute Lymphocytes"]["min"]) {
        $('#lymphLow').prop("checked", true);
        if (cbcObject["Absolute Lymphocytes"]["value"] < $("#cbcLymphLowMarked").val() && $("#cbcLymphLowMarked").val() != '') {
          $('#lymphMarked').prop("checked", true);
          $('#lymphMild').prop("checked", false);
        } else if (cbcObject["Absolute Lymphocytes"]["value"] > $("#cbcLymphLowMild").val() && $("#cbcLymphLowMild").val() != '') {
          $('#lymphMild').prop("checked", true);
          $('#lymphMarked').prop("checked", false);
        } else {
          $('#lymphMild').prop("checked", false);
          $('#lymphMarked').prop("checked", false);
        }
      } else if (cbcObject["Absolute Lymphocytes"]["value"] > cbcObject["Absolute Lymphocytes"]["max"]) {
        $('#lymphHigh').prop("checked", true);
        if (cbcObject["Absolute Lymphocytes"]["value"] > $("#cbcLymphHighMarked").val() && $("#cbcLymphHighMarked").val() != '') {
          $('#lymphMarked').prop("checked", true);
          $('#lymphMild').prop("checked", false);
        } else if (cbcObject["Absolute Lymphocytes"]["value"] < $("#cbcLymphHighMild").val() && $("#cbcLymphHighMild").val() != '') {
          $('#lymphMild').prop("checked", true);
          $('#lymphMarked').prop("checked", false);
        } else {
          $('#lymphMild').prop("checked", false);
          $('#lymphMarked').prop("checked", false);
        }
      }
    }
    if (cbcObject["Absolute Eosinophils"] !== undefined) {
      if (cbcObject["Absolute Eosinophils"]["value"] >= cbcObject["Absolute Eosinophils"]["min"] && cbcObject["Absolute Eosinophils"]["value"] <= cbcObject["Absolute Eosinophils"]["max"]) {
        $('#eosNormal').prop("checked", true);
        $('#eosMild').prop("checked", false);
        $('#eosMarked').prop("checked", false);
      } else if (cbcObject["Absolute Eosinophils"]["value"] < cbcObject["Absolute Eosinophils"]["min"]) {
        $('#eosLow').prop("checked", true);
        if (cbcObject["Absolute Eosinophils"]["value"] > $("#cbcEosHighMarked").val()) {
          $('#eosMarked').prop("checked", true);
          $('#eosMild').prop("checked", false);
        } else if (cbcObject["Absolute Eosinophils"]["value"] < $("#cbcEosHighMild").val()) {
          $('#eosMild').prop("checked", true);
          $('#eosMarked').prop("checked", false);
        } else {
          $('#eosMild').prop("checked", false);
          $('#eosMarked').prop("checked", false);
        }
      } else if (cbcObject["Absolute Eosinophils"]["value"] > cbcObject["Absolute Eosinophils"]["max"]) {
        $('#eosHigh').prop("checked", true);
        if (cbcObject["Absolute Eosinophils"]["value"] > $("#cbcEosHighMarked").val()) {
          $('#eosMarked').prop("checked", true);
          $('#eosMild').prop("checked", false);
        } else if (cbcObject["Absolute Eosinophils"]["value"] < $("#cbcEosHighMild").val()) {
          $('#eosMild').prop("checked", true);
          $('#eosMarked').prop("checked", false);
        } else {
          $('#eosMild').prop("checked", false);
          $('#eosMarked').prop("checked", false);
        }
      }
    }
    if (cbcObject["Absolute Basophils"] !== undefined) {
      if (cbcObject["Absolute Basophils"]["value"] >= cbcObject["Absolute Basophils"]["min"] && cbcObject["Absolute Basophils"]["value"] <= cbcObject["Absolute Basophils"]["max"]) {
        $('#basoNormal').prop("checked", true);
        $('#basoMild').prop("checked", false);
        $('#basoMarked').prop("checked", false);
      } else if (cbcObject["Absolute Basophils"]["value"] < cbcObject["Absolute Basophils"]["min"]) {
        $('#basoLow').prop("checked", true);
        if (cbcObject["Absolute Basophils"]["value"] > $("#cbcBasoHighMarked").val()) {
          $('#basoMarked').prop("checked", true);
          $('#basoMild').prop("checked", false);
        } else if (cbcObject["Absolute Basophils"]["value"] < $("#cbcBasoHighMild").val()) {
          $('#basoMild').prop("checked", true);
          $('#basoMarked').prop("checked", false);
        } else {
          $('#basoMild').prop("checked", false);
          $('#basoMarked').prop("checked", false);
        }
      } else if (cbcObject["Absolute Basophils"]["value"] > cbcObject["Absolute Basophils"]["max"]) {
        $('#basoHigh').prop("checked", true);
        if (cbcObject["Absolute Basophils"]["value"] > $("#cbcBasoHighMarked").val()) {
          $('#basoMarked').prop("checked", true);
          $('#basoMild').prop("checked", false);
        } else if (cbcObject["Absolute Basophils"]["value"] < $("#cbcBasoHighMild").val()) {
          $('#basoMild').prop("checked", true);
          $('#basoMarked').prop("checked", false);
        } else {
          $('#basoMild').prop("checked", false);
          $('#basoMarked').prop("checked", false);
        }
      }
    }

    if (cbcObject["Absolute NRBCs"]["value"] > 0) {
      if (cbcObject["Absolute NRBCs"]["value"] > $("#nrbcFrequent").val()){
        $('#rbc_Nucleated_RBCs_Frequent').prop("checked", true);
        $('#rbc_Nucleated_RBCs_Occasional').prop("checked", false);
        $('#rbc_Nucleated_RBCs_Rare').prop("checked", false);
      } else if (cbcObject["Absolute NRBCs"]["value"] > $("#nrbcOccasional").val()){
        $('#rbc_Nucleated_RBCs_Frequent').prop("checked", false);
        $('#rbc_Nucleated_RBCs_Occasional').prop("checked", true);
        $('#rbc_Nucleated_RBCs_Rare').prop("checked", false);
      } else if ($("#nrbcOccasional").val() != "" && $("#nrbcOccasional").val() != ""){
        $('#rbc_Nucleated_RBCs_Frequent').prop("checked", false);
        $('#rbc_Nucleated_RBCs_Occasional').prop("checked", false);
        $('#rbc_Nucleated_RBCs_Rare').prop("checked", true);
      }
    }
    
    if (cbcObject.PLT !== undefined) {
      if (cbcObject["PLT"]["value"] > cbcObject["PLT"]["min"] && cbcObject["PLT"]["value"] < cbcObject["PLT"]["max"]) {
        $('#pltNormal').prop("checked", true);
        $('#pltMild').prop("checked", false);
        $('#pltMarked').prop("checked", false);
      } else if (cbcObject["PLT"]["value"] < cbcObject["PLT"]["min"]) {
        $('#pltLow').prop("checked", true);
        if (cbcObject["PLT"]["value"] < parseFloat($("#cbcPltLowMarked").val())) {
          $('#pltMarked').prop("checked", true);
          $('#pltMild').prop("checked", false);
        } else if (cbcObject["PLT"]["value"] > parseFloat($("#cbcPltLowMild").val())) {
          $('#pltMild').prop("checked", true);
          $('#pltMarked').prop("checked", false);
        } else {
          $('#pltMild').prop("checked", false);
          $('#pltMarked').prop("checked", false);
        }
      } else if (cbcObject["PLT"]["value"] > cbcObject["PLT"]["max"]) {
        $('#pltHigh').prop("checked", true);
        if (cbcObject["PLT"]["value"] > parseFloat($("#cbcPltHighMarked").val())) {
          $('#pltMarked').prop("checked", true);
          $('#pltMild').prop("checked", false);
        } else if (cbcObject["PLT"]["value"] < parseFloat($("#cbcPltHighMild").val())) {
          $('#pltMild').prop("checked", true);
          $('#pltMarked').prop("checked", false);
        } else {
          $('#pltMild').prop("checked", false);
          $('#pltMarked').prop("checked", false);
        }
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

      if ($("#circulatingPlasma").prop("checked")){
        pbText += "No circulating plasma cells are identified. "
      }

    return pbText
  }

  function fillAsp() {
    let aspText = "";
    const adequacyListString = listText("adequacySelect");
    const erythroidListString = listText("erythroidSelect").toLowerCase();
    const myeloidListString = listText("myeloidSelect").toLowerCase();
    const megakaryocyteListString = listText("megakaryocyteSelect").toLowerCase();

    if (erythroidListString != ""){
      $("#erythroid_unremarkable").prop("checked", false);
    }

    if (myeloidListString != ""){
      $("#myeloid_unremarkable").prop("checked", false);
    }

    if (megakaryocyteListString != ""){
      $("#megakaryocyte_unremarkable").prop("checked", false);
    }
    
    if ($('#asp_adequate').prop("checked") && adequacyListString == "") {
      aspText += "The bone marrow aspirate smears are cellular and adequate for interpretation. ";
    } else if ($('#asp_adequate').prop("checked")) {
      aspText += "The bone marrow aspirate smears are " + adequacyListString + " but overall adequate for interpretation. ";
    } else if ($('#asp_inadequate').prop("checked") && adequacyListString == "") {
      aspText += "The bone marrow aspirate smears are inadequate for interpretation. ";
    } else if ($('#asp_inadequate').prop("checked")) {
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
      aspText += "Blasts are not increased. ";
    } else if ($('#blast_increased').prop("checked")){
      aspText += "Blasts are significantly increased. ";
    }

    return aspText;
  }

  function fillTouch(){
    let touchText = "";
    if ($('#touchSimilar').prop("checked")){
      touchText += "The bone marrow touch preparations are cellular and show findings similar to the aspirate smears.";
    }

    return touchText;
  }

  function fillCore(){
    let coreText = "";
    const adequacyListString = listText("coreAdequacySelect");
    if ($('#coreAdequate').prop("checked") && adequacyListString == "") {
      coreText += "The bone marrow core biopsy is adequate for interpretation. ";
    } else if ($('#coreAdequate').prop("checked")) {
      coreText += "The bone marrow core biopsy is " + adequacyListString + " but overall adequate for interpretation. ";
    } else if ($('#coreInadequate').prop("checked") && adequacyListString == "") {
      coreText += "The bone marrow core biopsy is inadequate for interpretation. ";
    } else if ($('#coreInadequate').prop("checked")) {
      coreText += "The bone marrow core biopsy is " + adequacyListString + " and overall inadequate for interpretation. ";
    }

    if ($('#hypocellular').prop('checked')){
      coreText += "The marrow is hypocellular for age"
    } else if ($('#normocellular').prop('checked')){
      coreText += "The marrow is normocellular for age"
    } else if ($('#hypercellular').prop('checked')){
      coreText += "The marrow is hypercellular for age"
    }
    
    if ($('#hypocellular').prop('checked') || $('#normocellular').prop('checked') || $('#hypercellular').prop('checked')){
      if ($.isNumeric($('#coreCellularity').val())){
        coreText += " (" + $('#coreCellularity').val() + "% cellular). ";
      } else {
        coreText += ". ";
      }
    }
    
    if ($('#coreMEUnremarkable').prop('checked')){
      coreText += "Myeloid and erythroid precursors show progressive maturation. "
    }   

    if ($('#coreMegUnremarkable').prop('checked')){
      coreText += "Megakaryocytes are adequate and regularly distributed. "
    }

    return coreText;
  }

  function fillClot(){
    let clotText = "";
    if ($('#clotSimilar').prop("checked")){
      clotText += "The bone marrow particle clot shows multiple marrow particles with findings similar to the core biopsy.";
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
              descriptorText += 'Ring sideroblasts are identified. '
            } else if (descriptorArray.indexOf('absent') != -1){
              descriptorText += 'No ring sideroblasts are identified. '
            } else if (descriptorArray.indexOf('inadequate rings') != -1 && descriptorArray.indexOf('inadequate') == -1){
              descriptorText += 'There are too few erythroid precursors for assessment of ring sideroblasts. '
            }
          } else if ($(this).val() == 'Reticulin'){
            if (descriptorArray[0] == 'MF-0'){
              descriptorText = 'There is no increase in fibrosis (MF-0).';
            } else if (descriptorArray[0] == 'MF-1'){
              descriptorText = 'There is mildly increased fibrosis (MF-1).';
            } else if (descriptorArray[0] == 'MF-2'){
              descriptorText = 'There is moderately increased fibrosis (MF-2).';
            } else if (descriptorArray[0] == 'MF-3'){
              descriptorText = 'There is markedly increased fibrosis (MF-3).';
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
          let descriptorText = '';
          $(`.${this.id}`).each(function(){
            descriptorText = $(this).val();
          })
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
