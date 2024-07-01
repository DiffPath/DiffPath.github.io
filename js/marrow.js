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
  };

  let cbc_object = {}, radioObject = {};
  let pbCountTable = getSavedItems()[0];
  let aspCountTable = getSavedItems()[1];

  let objectType = {
    pbCounter: 'pb',
    aspCounter: 'asp',
    pbCounterTemplate: 'pb',
    aspCounterTemplate: 'asp',
  }

  let typeObject = {
    'pb': {counterID: "#pbCounter", characterID: "#pbCount", tableID: "#pbTable", dcountID: "#pbDCount", ccountID: "#pbCCount", tcountID: "#pbTCount", tableDivID: "#pb_table_div", table: pbCountTable},
    'asp': {counterID: "#aspCounter", characterID: "#aspCount", tableID: "#aspTable", dcountID: "#aspDCount", ccountID: "#aspCCount", tcountID: "#aspTCount", tableDivID: "#asp_table_div", table: aspCountTable}
  }

  window.keypressed = {};

  let cbc_variables = ["WBC", "RBC", "HGB", "MCV", "MCHC", "PLT", "NRBC", "Absolute Neutrophils", "Absolute Lymphocytes", "Absolute Monocytes", "Absolute Eosinophils", "Absolute Basophils", "Absolute NRBCs"];
  let cbc_header = ["Component", "Value", "Units", "Ref. Range", "Ref Range & Units"]
  var header_code = {
    "Component": -1,
    "Value": -1,
    "Units": -1,
    "Ref. Range": -1,
    "Ref Range & Units": -1,
  }
  var rbc_list = [
    ["", 0],
    ["Unremarkable", 0],
    ["Predominantly unremarkable", 0],
    ["Anisopoikilocytosis", 2],
    ["Hypochromasia", 4],
    ["Polychromasia", 2],
    ["Nucleated RBCs", 1]    
  ];
  var aniso_list = [
    ["", 0],
    ["Acanthocytes", 1],
    ["Basophilic stippling", 1],
    ["Bite cells", 1],
    ["Blister cells", 1],
    ["Burr cells", 1],
    ["Echinocytes", 1],
    ["Elliptocytes", 1],
    ["Howell-Jolly bodies", 1],
    ["Macrocytes", 1],
    ["Macroovalocytes", 1],
    ["Microcytes", 1],
    ["Ovalocytes", 1],
    ["Schistocytes", 1],
    ["Sickle cells", 1],
    ["Spherocytes", 1],
    ["Target cells", 1],
    ["Teardrop cells", 1],
    ["Teardrop forms", 1]
  ];
  var neutrophil_list = [
    ["", 0],
    ["Hypogranular forms", 1],
    ["Hypolobated forms", 1],
    ["Hypersegmented forms", 1],
    ["Shift to immaturity", 3],
    ["Toxic changes", 2]
  ];
  var lymphocyte_list = [
    ["", 0],
    ["Unremarkable", 0],
    ["Small mature and large granular", 5],
    ["Small mature, large granular, and reactive", 5],
    ["Small to medium-sized with clumped chromatin", 5]
  ];
  var platelet_list = [
    ["", 0],
    ["Hypogranular platelets", 1],
    ["Large platelets", 1],
    ["Giant platelets", 1],
  ];
  var adequacy_list = [
    ["", 0],
    ["Hemodilute", 0],
    ["Hypocellular", 0],
    ["Paucicellular", 0],
    ["Virtually acellular", 0],
    ["Paucispicular", 0],
    ["Aspicular", 0]
  ];
  var erythroid_list = [
    ["", 0],
    ["Nuclear budding", 1],
    ["Nuclear contour irregularity", 1],
    ["Multinucleation", 1],
    ["Megaloblastoid changes", 0],
    ["Shift to immaturity", 3]
  ];
  var myeloid_list = [
    ["", 0],
    ["Hypogranular forms", 1],
    ["Monolobated forms", 1],
    ["Hyposegmented forms", 1],
    ["Hypersegmented forms", 1],
    ["Shift to immaturity", 3]
  ];
  var megakaryocyte_list = [
    ["", 0],
    ["Widely separated nuclear lobes", 1],
    ["Hypolobated forms", 1],
    ["Small hypolobated forms", 1],
    ["Micromegakaryocytes", 1],
  ];

  var quant_descriptors = ["Frequent", "Occasional", "Rare"];
  var degree_descriptors = ["Slight", "Mild", "Marked"]
  var master_descriptors = {
    0: [],
    1: quant_descriptors,
    2: degree_descriptors,
    3: degree_descriptors,
    4: [],
    5: []
  }
  
  var master_list = {
    "aniso": aniso_list,
    "aniso_strings": [],
    "rbc": rbc_list,
    "rbc_strings": [],
    "neutrophil": neutrophil_list,
    "neutrophil_strings": [],
    "lymphocyte": lymphocyte_list,
    "lymphocyte_strings": [],
    "platelet": platelet_list,
    "platelet_strings": [],
    "adequacy": adequacy_list,
    "adequacy_strings": [],
    "erythroid": erythroid_list,
    "erythroid_strings": [],
    "myeloid": myeloid_list,
    "myeloid_strings": [],
    "megakaryocyte": megakaryocyte_list,
    "megakaryocyte_strings": [],
    "pbCountTable": pbCountTable,
    "aspCountTable": aspCountTable
  };

  add_dropdowns("rbc");
  add_dropdowns("aniso");
  add_dropdowns("neutrophil");
  add_dropdowns("platelet");
  add_dropdowns("adequacy");
  add_dropdowns("erythroid");
  add_dropdowns("myeloid");
  add_dropdowns("megakaryocyte");
  fillCounterLabels();

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
    if (saveFileBM.settingObjectBM != null) {
      $.each(saveFileBM.settingObjectBM,function(x,y){
        $('#'+x).prop('checked',y);
      });
    }  
  };
  return [pbCountTable,aspCountTable];
  };

  fillCounterLabels();
  fillSelects();
  
  function fillSelects(){
    $(".pbCounterTemplate").each(function(){
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
    $(".aspCounterTemplate").each(function(){
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
    b.volume = 0;
    c.volume = 0;
    d.volume = 0;
    e.volume = 0;
    f.volume = 0.01;
    a.play();
    b.play();
    c.play();
    d.play();
    e.play();
    f.play();
  })

  function fillCounterLabels(){
    for (const i in pbCountTable) {
      $("#pbLabel" + pbCountTable[i]["character"]).html(pbCountTable[i]["character"] + ". " + pbCountTable[i]["name"]);
      $("#pbTemplate" + pbCountTable[i]["character"]).val(pbCountTable[i]["name"]);
    }
    for (const i in aspCountTable) {
      $("#aspLabel" + aspCountTable[i]["character"]).html(aspCountTable[i]["character"] + ". " + aspCountTable[i]["name"]);
      $("#aspTemplate" + aspCountTable[i]["character"]).val(aspCountTable[i]["name"]);
    }
  }

  $(".navbarIcon").click(function(){
    $("#navbar").toggle();
    $("#overlay").toggle();
  });

  $("#overlay").click(function(){
    $("#navbar").hide();
    $("#overlay").hide();
  });

  $(".headerTab").click(function() {
    $("."+this.className.split(" ")[0]).each(function() {
      $(this).removeClass("clicked");
      $(this).addClass("unclicked");
      $("#"+headerObject[this.id]).hide();
    });
    $("#"+headerObject[this.id]).show();
    $(this).addClass("clicked")
    $(this).removeClass("unclicked")
  });

  $(".specimen").change(function() {
    $(spec_all).prop("checked", false)
    radioObject.spec_all = 0;
  });

  $(spec_all).click(function() {
    if ($(spec_all).prop('checked')) {
      $(".specimen").each(function() {
        $(this).prop("checked", true);
      });
    } else {
      $(".specimen").each(function() {
        $(this).prop("checked", false);
      });
    }
    fill_specimen();
  });

  $('#pb_cbc').bind('input', function() {
    var cbc_final = [];
    var cbc_var = [...cbc_variables];
    var cbc_lines = $('#pb_cbc').val().split("\n");
    var toggle = 0;
    for (let i = 0; i < cbc_lines.length; i++) {
      cbc_final.push(cbc_lines[i].split("\t"))
    }
    for (let i = 0; i < cbc_final.length; i++) {
      for (let j = 0; j < cbc_final[i].length; j++) {
        for (let k = 0; k < cbc_header.length; k++) {
          if (cbc_final[i][j].replace(/\s+/g, '') == cbc_header[k].replace(/\s+/g, '')) {
            header_code[cbc_header[k]] = j;
            toggle = 1;
          }
        }
        if (toggle == 1) {
          for (let k = 0; k < cbc_var.length; k++) {
            if (cbc_final[i][j].replace(/\s+/g, '') == cbc_var[k].replace(/\s+/g, '')) {
              cbc_object[cbc_var[k]] = {};
              if (header_code["Value"] != -1) {
                cbc_object[cbc_var[k]]["value"] = parseFloat(cbc_final[i][header_code["Value"]].replace(/[^\d.-]/g, ''));
              }
              if (header_code["Ref. Range"] != -1) {
                cbc_object[cbc_var[k]]["min"] = parseFloat(cbc_final[i][header_code["Ref. Range"]].replace(/[^0-9.\-]/g, '').split("-")[0]);
                cbc_object[cbc_var[k]]["max"] = parseFloat(cbc_final[i][header_code["Ref. Range"]].replace('10ˆ3','').replace('10ˆ6','').replace(/[^0-9.\-]/g, '').split("-")[1]);
              } else if (header_code["Ref Range & Units"] != -1) {
                cbc_object[cbc_var[k]]["min"] = parseFloat(cbc_final[i][header_code["Ref Range & Units"]].replace(/[^0-9.\-]/g, '').split("-")[0]);
                cbc_object[cbc_var[k]]["max"] = parseFloat(cbc_final[i][header_code["Ref Range & Units"]].replace('10ˆ3','').replace('10ˆ6','').replace(/[^0-9.\-]/g, '').split("-")[1]);
                cbc_object[cbc_var[k]]["value"] = parseFloat(cbc_final[i][header_code["Ref Range & Units"]+1].replace(/[^\d.-]/g, ''));
              }
              cbc_var.shift();
            }
          }
        }
      }
    }
    fill_inputs();
  });

  $('.counter').keydown(function(e) {
    countNoise(e);
  })

  $('.counter').keyup(function(e) {
    window.keypressed[e.which] = false;
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

  $(".counter").keyup(function() {
    countCells(objectType[this.id]);
  })

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
    $(right_panel_final).show();
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
    let table = typeObject[type]["table"];
    let idNum = parseInt(id.match(/\d+/g));
    $.each(table,function(i){
      if (i == val){
        $("#"+type+"Template"+idNum).css("background-color","white");
        if (table[val]["character"] != -1){
          $("#"+type+"Template"+this.character).val(" ");
          $("#"+type+"Template"+this.character).css("background-color","rgb(255, 95, 95)");
        } else {
          countCells(type);
        } 
        this.character = idNum;
      } else if (this.character == idNum){
        this.character = -1;
      }
    })

    if (thisClass == "pbCounterTemplate"){
      pbCountTable[val]["character"] = idNum;
    } else if (thisClass == "aspCounterTemplate"){
      aspCountTable[val]["character"] = idNum;
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

  $('#lymphocyte_select').change(function(){
    fill_pb();
  });

  $('.sub_checked').change(function() {
    if ($(this).prop("checked")) {
      add_dropdowns(this.id)
      $("#" + this.id + "_select_div").show();
    } else {
      $("#" + this.id + "_select_div").hide();
    }
  });

  $('.dropdown_div').on('change', '.select', function() {
    add_dropdowns(this.id.split("_")[0]);
    fillReport();
  });

  $('.dropdown_div').on('change', '.descriptor', function() {
    find_selected(this.id.split("_")[0]);
    fillReport();
  });

  $('input:radio').on('click', function() {
    var currentButton = this.id
    $("[name='"+this.name+"']").each(function() {
      if (this.id != currentButton) {
        radioObject[this.id] = 0;
      }
    });
    if (radioObject[this.id] == 1) {
      radioObject[this.id] = 0;
      $(this).prop("checked", false);
    } else {
      radioObject[this.id] = 1;
    }
    fillReport();
  });

  $('.dropdown_div').on('click', '.descriptor', function() {
    var currentButton = this.id
    $("[name='"+this.name+"']").each(function() {
      if (this.id != currentButton) {
        console.log(this.id)
        radioObject[this.id] = 0;
      }
    });
    if (radioObject[this.id] == 1) {
      radioObject[this.id] = 0;
      $(this).prop("checked", false);
    } else {
      radioObject[this.id] = 1;
    }
    fillReport();
  });

  $('.unremarkable').click(function(){
    const x = this.id;
    const y = x.split('_')[0];
    $('#'+ y+"_select_div").html('<select id="'+ y + '" class="select"></select>');
    add_dropdowns(y);
  });

  $('input:checkbox').on('change', function() {
    $(this).siblings('input[type="checkbox"]').prop('checked', false);
  });

  $('.form').change(function() {
    fillReport();
  });


  $('.copyButton').click(function(){
    let element = "#" + this.id + "_div";
    if($(element).is(":visible")){
      let temp = document.createElement("div");
      temp.setAttribute("contentEditable", true);
      temp.innerHTML = $(element).html();
      temp.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
      document.getElementById('copyDiv').appendChild(temp);
      temp.focus();
      document.execCommand("copy");
      document.getElementById('copyDiv').removeChild(temp);
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
})
  function fillReport(){
    fill_specimen();
    fill_pb();
    fill_asp();
  }

  function add_dropdowns(id) {
    let selected_array = find_selected(id);
    var div_id = "#" + id + "_select_div";
    var select_list = selected_array[0];
    var descriptor_list = selected_array[1];
    var option_list = [...master_list[id]];
    var id_counter = 0;
    $(div_id).empty();
    for (let i = 0; i < select_list.length; i++) {
      var type_index;
      $(div_id).append("<div class='flex' id='temp_id'><select id='temp_id2' class='select form descriptor'></select></div>");
      $("#temp_id").attr({
        id: id + "_div_" + id_counter,
      });
      $("#temp_id2").attr({
        id: id.replace(/ /g, "_") + "_" + id_counter,
        class: id.replace(/ /g, "_") + "_item select descriptor",
        style: "width: 200px"
      });
      for (let j = 0; j < option_list.length; j++) {
        if (select_list[i] == option_list[j][0]) {
          $("#" + id + "_" + id_counter).append($('<option>', {
            text: option_list[j][0],
            selected: true
          }));
          type_index = option_list[j][1];
          option_list.splice(j, 1);
          j--;

        } else {
          $("#" + id + "_" + id_counter).append($('<option>', {
            text: option_list[j][0],
          }));
        }
      }
      add_descriptors("#" + id + "_div_" + id_counter, id, select_list[i], descriptor_list[i], type_index)
      id_counter++;
    }
    $(div_id).append("<div><select id='temp_id' class='select form descriptor'></select></div>")
    $("#temp_id").attr({
      id: id.replace(/ /g, "_") + "_" + id_counter,
      class: id.replace(/ /g, "_") + "_item select descriptor",
      style: "width: 200px"
    });
    for (let i = 0; i < option_list.length; i++) {
      $("#" + id.replace(/ /g, "_") + "_" + id_counter).append($('<option>', {
        text: option_list[i][0]
      }));
    }
  }

  function find_selected(id) {
    var select_list = [];
    var descriptor_list = [];
    var string_id = id + "_strings"
    var type_index;
    var final_list = [];
    $("." + id + "_item").each(function() {
      if (select_list.indexOf($(this).val()) == -1 && $(this).val() != "") {
        for (let i = 0; i < master_list[id].length; i++) {
          if (master_list[id][i][0] == $(this).val()) {
            type_index = master_list[id][i][1];
          }
        }
        if (type_index == 3 && $('input[name=' + $(this).val().replace(/ /g, "_") + '_descriptor]:checked').val() != undefined) {
          final_list.push(["a " + $('input[name=' + $(this).val().replace(/ /g, "_") + '_descriptor]:checked').val(), $(this).val(), type_index]);
        } else if (type_index == 3) {
          final_list.push([$('input[name=' + $(this).val().replace(/ /g, "_") + '_descriptor]:checked').val(), "a " + $(this).val(), type_index]);
        } else {
          final_list.push([$('input[name=' + $(this).val().replace(/ /g, "_") + '_descriptor]:checked').val(), $(this).val(), type_index]);
        }
        select_list.push($(this).val());
        descriptor_list.push($('input[name=' + $(this).val().replace(/ /g, "_") + '_descriptor]:checked').val());
      }
    });
    master_list[string_id] = final_list;
    return [select_list, descriptor_list]
  }

  function add_descriptors(a, b, c, d, e) {
    let x = '<div class="flex">'
    for (let i = 0; i < master_descriptors[e].length; i++) {
      x += '<div><input type="radio"'
      x += ' id="' + b + '_' + c.replace(/ /g, '_') + '_' + master_descriptors[e][i] + '"';
      x += ' class="' + c.replace(/ /g, '_') + '_descriptor ' + 'descriptor"';
      x += ' name="' + c.replace(/ /g, '_') + '_descriptor"';
      x += ' value="' + master_descriptors[e][i] +'"';
      if (d == master_descriptors[e][i]) {
        x += ' checked'
      } 
      x += "><label for='" + b + "_" + c.replace(/ /g, "_") + "_" + master_descriptors[e][i] + "'>" + master_descriptors[e][i] + "</label></div>"
    }
    x += '</div>';
    $(a).append(x)
  }

  function fill_inputs() {
    if (cbc_object["HGB"] !== undefined) {
      if (cbc_object["HGB"]["value"] > cbc_object["HGB"]["min"] && cbc_object["HGB"]["value"] < cbc_object["HGB"]["max"]) {
        $('#hgbNormal').prop("checked", true);
        $('#hgbMild').prop("checked", false);
        $('#hgbMarked').prop("checked", false);
      } else if (cbc_object["HGB"]["value"] < cbc_object["HGB"]["min"]) {
        $('#hgbLow').prop("checked", true);
        if (cbc_object["HGB"]["value"] < $("#cbcHgbLowMarked").val()) {
          $('#hgbMarked').prop("checked", true);
          $('#hgbMild').prop("checked", false);
        } else if (cbc_object["HGB"]["value"] > $("#cbcHgbLowMild").val()) {
          $('#hgbMild').prop("checked", true);
          $('#hgbMarked').prop("checked", false);
        } else {
          $('#hgbMild').prop("checked", false);
          $('#hgbMarked').prop("checked", false);
        }
      } else if (cbc_object["HGB"]["value"] > cbc_object["HGB"]["max"]) {
        $('#hgbHigh').prop("checked", true);
        if (cbc_object["HGB"]["value"] > $("#cbcHgbHighMarked").val()) {
          $('#hgbMarked').prop("checked", true);
          $('#hgbMild').prop("checked", false);
        } else if (cbc_object["HGB"]["value"] < $("#cbcHgbHighMild").val()) {
          $('#hgbMild').prop("checked", true);
          $('#hgbMarked').prop("checked", false);
        } else {
          $('#hgbMild').prop("checked", false);
          $('#hgbMarked').prop("checked", false);
        }
      }
    }
    if (cbc_object["MCV"] !== undefined) {
      if (cbc_object["MCV"]["value"] > cbc_object["MCV"]["min"] && cbc_object["MCV"]["value"] < cbc_object["MCV"]["max"]) {
        $('#mcvNormal').prop("checked", true);
      } else if (cbc_object["MCV"]["value"] < cbc_object["MCV"]["min"]) {
        $('#mcvLow').prop("checked", true);
      } else if (cbc_object["MCV"]["value"] > cbc_object["MCV"]["max"]) {
        $('#mcvHigh').prop("checked", true);
      }
    }
    if (cbc_object["Absolute Neutrophils"] !== undefined) {
      if (cbc_object["Absolute Neutrophils"]["value"] > cbc_object["Absolute Neutrophils"]["min"] && cbc_object["Absolute Neutrophils"]["value"] < cbc_object["Absolute Neutrophils"]["max"]) {
        $('#neutNormal').prop("checked", true);
        $('#neutMild').prop("checked", false);
        $('#neutMarked').prop("checked", false);
      } else if (cbc_object["Absolute Neutrophils"]["value"] < cbc_object["Absolute Neutrophils"]["min"]) {
        $('#neutLow').prop("checked", true);
        if (cbc_object["Absolute Neutrophils"]["value"] > $("#cbcNeutHighMarked").val()) {
          $('#neutMarked').prop("checked", true);
          $('#neutMild').prop("checked", false);
        } else if (cbc_object["Absolute Neutrophils"]["value"] < $("#cbcNeutHighMild").val()) {
          $('#neutMild').prop("checked", true);
          $('#neutMarked').prop("checked", false);
        } else {
          $('#neutMild').prop("checked", false);
          $('#neutMarked').prop("checked", false);
        }
      } else if (cbc_object["Absolute Neutrophils"]["value"] > cbc_object["Absolute Neutrophils"]["max"]) {
        $('#neutHigh').prop("checked", true);
        if (cbc_object["Absolute Neutrophils"]["value"] > $("#cbcNeutHighMarked").val()) {
          $('#neutMarked').prop("checked", true);
          $('#neutMild').prop("checked", false);
        } else if (cbc_object["Absolute Neutrophils"]["value"] < $("#cbcNeutHighMild").val()) {
          $('#neutMild').prop("checked", true);
          $('#neutMarked').prop("checked", false);
        } else {
          $('#neutMild').prop("checked", false);
          $('#neutMarked').prop("checked", false);
        }
      }
    }
    if (cbc_object["Absolute Lymphocytes"] !== undefined) {
      if (cbc_object["Absolute Lymphocytes"]["value"] >= cbc_object["Absolute Lymphocytes"]["min"] && cbc_object["Absolute Lymphocytes"]["value"] <= cbc_object["Absolute Lymphocytes"]["max"]) {
        $('#lymphNormal').prop("checked", true);
        $('#lymphMild').prop("checked", false);
        $('#lymphMarked').prop("checked", false);
      } else if (cbc_object["Absolute Lymphocytes"]["value"] < cbc_object["Absolute Lymphocytes"]["min"]) {
        $('#lymphLow').prop("checked", true);
        if (cbc_object["Absolute Lymphocytes"]["value"] > $("#cbcLymphHighMarked").val()) {
          $('#lymphMarked').prop("checked", true);
          $('#lymphMild').prop("checked", false);
        } else if (cbc_object["Absolute Lymphocytes"]["value"] < $("#cbcLymphHighMild").val()) {
          $('#lymphMild').prop("checked", true);
          $('#lymphMarked').prop("checked", false);
        } else {
          $('#lymphMild').prop("checked", false);
          $('#lymphMarked').prop("checked", false);
        }
      } else if (cbc_object["Absolute Lymphocytes"]["value"] > cbc_object["Absolute Lymphocytes"]["max"]) {
        $('#lymphHigh').prop("checked", true);
        if (cbc_object["Absolute Lymphocytes"]["value"] > $("#cbcLymphHighMarked").val()) {
          $('#lymphMarked').prop("checked", true);
          $('#lymphMild').prop("checked", false);
        } else if (cbc_object["Absolute Lymphocyte"]["value"] < $("#cbcLymphHighMild").val()) {
          $('#lymphMild').prop("checked", true);
          $('#lymphMarked').prop("checked", false);
        } else {
          $('#lymphMild').prop("checked", false);
          $('#lymphMarked').prop("checked", false);
        }
      }
    }
    if (cbc_object["Absolute Eosinophils"] !== undefined) {
      if (cbc_object["Absolute Eosinophils"]["value"] >= cbc_object["Absolute Eosinophils"]["min"] && cbc_object["Absolute Eosinophils"]["value"] <= cbc_object["Absolute Eosinophils"]["max"]) {
        $('#eosNormal').prop("checked", true);
        $('#eosMild').prop("checked", false);
        $('#eosMarked').prop("checked", false);
      } else if (cbc_object["Absolute Eosinophils"]["value"] < cbc_object["Absolute Eosinophils"]["min"]) {
        $('#eosLow').prop("checked", true);
        if (cbc_object["Absolute Eosinophils"]["value"] > $("#cbcEosHighMarked").val()) {
          $('#eosMarked').prop("checked", true);
          $('#eosMild').prop("checked", false);
        } else if (cbc_object["Absolute Eosinophils"]["value"] < $("#cbcEosHighMild").val()) {
          $('#eosMild').prop("checked", true);
          $('#eosMarked').prop("checked", false);
        } else {
          $('#eosMild').prop("checked", false);
          $('#eosMarked').prop("checked", false);
        }
      } else if (cbc_object["Absolute Eosinophils"]["value"] > cbc_object["Absolute Eosinophils"]["max"]) {
        $('#eosHigh').prop("checked", true);
        if (cbc_object["Absolute Eosinophils"]["value"] > $("#cbcEosHighMarked").val()) {
          $('#eosMarked').prop("checked", true);
          $('#eosMild').prop("checked", false);
        } else if (cbc_object["Absolute Eosinophils"]["value"] < $("#cbcEosHighMild").val()) {
          $('#eosMild').prop("checked", true);
          $('#eosMarked').prop("checked", false);
        } else {
          $('#eosMild').prop("checked", false);
          $('#eosMarked').prop("checked", false);
        }
      }
    }
    if (cbc_object["Absolute Basophils"] !== undefined) {
      if (cbc_object["Absolute Basophils"]["value"] >= cbc_object["Absolute Basophils"]["min"] && cbc_object["Absolute Basophils"]["value"] <= cbc_object["Absolute Basophils"]["max"]) {
        $('#basoNormal').prop("checked", true);
        $('#basoMild').prop("checked", false);
        $('#basoMarked').prop("checked", false);
      } else if (cbc_object["Absolute Basophils"]["value"] < cbc_object["Absolute Basophils"]["min"]) {
        $('#basoLow').prop("checked", true);
        if (cbc_object["Absolute Basophils"]["value"] > $("#cbcBasoHighMarked").val()) {
          $('#basoMarked').prop("checked", true);
          $('#basoMild').prop("checked", false);
        } else if (cbc_object["Absolute Basophils"]["value"] < $("#cbcBasoHighMild").val()) {
          $('#basoMild').prop("checked", true);
          $('#basoMarked').prop("checked", false);
        } else {
          $('#basoMild').prop("checked", false);
          $('#basoMarked').prop("checked", false);
        }
      } else if (cbc_object["Absolute Basophils"]["value"] > cbc_object["Absolute Basophils"]["max"]) {
        $('#basoHigh').prop("checked", true);
        if (cbc_object["Absolute Basophils"]["value"] > $("#cbcBasoHighMarked").val()) {
          $('#basoMarked').prop("checked", true);
          $('#basoMild').prop("checked", false);
        } else if (cbc_object["Absolute Basophils"]["value"] < $("#cbcBasoHighMild").val()) {
          $('#basoMild').prop("checked", true);
          $('#basoMarked').prop("checked", false);
        } else {
          $('#basoMild').prop("checked", false);
          $('#basoMarked').prop("checked", false);
        }
      }
    }

    if (cbc_object["Absolute NRBCs"]["value"] > 0) {
      let toggle = false;
      let counter = -1;
      ($(".rbc_item").each(function(){
        if($(this).val() == "Nucleated RBCs"){
          toggle = true;
        }
        counter++
      })
      )
      if (!toggle){
        $('#rbc_'+counter).val('Nucleated RBCs')
        add_dropdowns('rbc');
      }
      console.log([cbc_object["Absolute NRBCs"]["value"], $("#nrbcFrequent").val()])
      if (cbc_object["Absolute NRBCs"]["value"] > $("#nrbcFrequent").val()){
        $('#rbc_Nucleated_RBCs_Frequent').prop("checked", true);
        $('#rbc_Nucleated_RBCs_Occasional').prop("checked", false);
        $('#rbc_Nucleated_RBCs_Rare').prop("checked", false);
      } else if (cbc_object["Absolute NRBCs"]["value"] > $("#nrbcOccasional").val()){
        $('#rbc_Nucleated_RBCs_Frequent').prop("checked", false);
        $('#rbc_Nucleated_RBCs_Occasional').prop("checked", true);
        $('#rbc_Nucleated_RBCs_Rare').prop("checked", false);
      } else if ($("#nrbcOccasional").val() != "" && $("#nrbcOccasional").val() != ""){
        $('#rbc_Nucleated_RBCs_Frequent').prop("checked", false);
        $('#rbc_Nucleated_RBCs_Occasional').prop("checked", false);
        $('#rbc_Nucleated_RBCs_Rare').prop("checked", true);
      }
    }
    

    if (cbc_object.PLT !== undefined) {
      if (cbc_object["PLT"]["value"] > cbc_object["PLT"]["min"] && cbc_object["PLT"]["value"] < cbc_object["PLT"]["max"]) {
        $('#pltNormal').prop("checked", true);
        $('#pltMild').prop("checked", false);
        $('#pltMarked').prop("checked", false);
      } else if (cbc_object["PLT"]["value"] < cbc_object["PLT"]["min"]) {
        $('#pltLow').prop("checked", true);
        if (cbc_object["PLT"]["value"] < parseFloat($("#cbcPltLowMarked").val())) {
          $('#pltMarked').prop("checked", true);
          $('#pltMild').prop("checked", false);
        } else if (cbc_object["PLT"]["value"] > parseFloat($("#cbcPltLowMild").val())) {
          $('#pltMild').prop("checked", true);
          $('#pltMarked').prop("checked", false);
        } else {
          $('#pltMild').prop("checked", false);
          $('#pltMarked').prop("checked", false);
        }
      } else if (cbc_object["PLT"]["value"] > cbc_object["PLT"]["max"]) {
        $('#pltHigh').prop("checked", true);
        if (cbc_object["PLT"]["value"] > parseFloat($("#cbcPltHighMarked").val())) {
          $('#pltMarked').prop("checked", true);
          $('#pltMild').prop("checked", false);
        } else if (cbc_object["PLT"]["value"] < parseFloat($("#cbcPltHighMild").val())) {
          $('#pltMild').prop("checked", true);
          $('#pltMarked').prop("checked", false);
        } else {
          $('#pltMild').prop("checked", false);
          $('#pltMarked').prop("checked", false);
        }
      }
    }
    fill_pb();
  }

  function rbc_list_adjust(a) {
    let b = [...a];
    let aniso = false
    for (let i = 0; i < b.length; i++){
      if (b[i][1] == "Nucleated RBCs"){
        b.splice(i,1);
        i--;
      } else if (b[i][1] == "Hypochromasia"){
        b.splice(i,1);
        i--;
      } else if (b[i][1] == "Anisopoikilocytosis"){
        aniso = true
      }
    }
    if (aniso){
      for (let i in b){
        if (b[i][1] == "Anisopoikilocytosis"){
          b.push(b.splice(i, 1)[0]);
        }
      }
      
    }
    return b
  }

  function list_text(a) {
    var b = [...a]
    var descriptor_final = [];
    var final_string = "";
    while (b.length > 0) {
      var descriptors = [b[0][1]];
      var descriptor_string = b[0][0];
      var descriptor_index = b[0][2];
      b.splice(0, 1);
      var toggle = 1;
      for (let i = 0; i < b.length; i++) {
        if (b[i][0] == undefined && toggle == 1 && b[i][2] == descriptor_index) {
          descriptors.push(b[i][1]);
          b.splice(i, 1);
          i--;
        } else if (b[i][0] == descriptor_string) {
          descriptors.push(b[i][1]);
          b.splice(i, 1);
          i--;
        } else {
          toggle = 0;
        }
      }
      descriptor_final.push([descriptor_string, descriptor_index, descriptors])
      descriptor_string = "";
      descriptor_index = "";
      descriptors = [];
    }

    for (let i = 0; i < descriptor_final.length; i++) {
        if (i == 1 && (descriptor_final.length > 2 || descriptor_final[i][2].length > 1)) {
          final_string += " with ";
        } else if (i >= 1) {
          final_string += " and ";
        }
        if (descriptor_final[i][0] != undefined) {
          final_string += descriptor_final[i][0] + " ";
        }
        if (descriptor_final[i][2].length == 1) {
          final_string += descriptor_final[i][2][0];
        } else if (descriptor_final[i][2].length == 2) {
          final_string += descriptor_final[i][2][0] + " and " + descriptor_final[i][2][1];
        } else if (descriptor_final[i][2].length > 2) {
          for (let j = 0; j < descriptor_final[i][2].length; j++) {
            final_string += descriptor_final[i][2][j];
            if (j < descriptor_final[i][2].length - 2) {
              final_string += ", ";
            } else if (j == descriptor_final[i][2].length - 2) {
              final_string += ", and "
            }
          }
        }
      }
    return final_string
  }

  function fill_specimen() {
    var spec_text = "";
    var spec_array = [];
    if ($('#spec_pb').prop("checked")) {
      spec_array.push("peripheral blood smear");
    }
    if ($('#spec_asp').prop("checked")) {
      spec_array.push("bone marrow aspirate");
    }
    if ($('#spec_tp').prop("checked")) {
      spec_array.push("touch preparations");
    }
    if ($('#spec_pc').prop("checked")) {
      spec_array.push("particle clot");
    }
    if ($('#spec_cb').prop("checked")) {
      if ($('#lat_left').prop("checked")) {
        spec_array.push("left posterior iliac crest bone marrow core biopsy");
      } else if ($('#lat_right').prop("checked")) {
        spec_array.push("right posterior iliac crest bone marrow core biopsy");
      } else if ($('#lat_bilateral').prop("checked")) {
        spec_array.push("bilateral posterior iliac crest bone marrow core biopsies");
      } else if ($('#lat_notspecified').prop("checked")) {
        spec_array.push("posterior iliac crest bone marrow core biopsy");
      }
    }

    if (spec_array.length == 1) {
      spec_text = spec_array[0];
    } else if (spec_array.length == 2) {
      spec_text += spec_array[0] + " and " + spec_array[1];
    } else if (spec_array.length > 2) {
      spec_text += spec_array[0] + ", " + spec_array[1];
      for (let i = 2; i < spec_array.length; i++) {
        if (i == spec_array.length - 1) {
          spec_text += ", and " + spec_array[i];
        } else {
          spec_text += ", " + spec_array[i];
        }
      }
    }

    if (spec_text != "") {
      $(spec_div).html("<b>A,B: " + spec_text.charAt(0).toUpperCase() + spec_text.slice(1) + ":</b><br><br>")
      $(right_panel_final).show();
    } else {
      $(spec_div).html("")
    }
  }

  function fill_pb() {
    var pb_text = "";
    var rbc_list_array = [];
    var rbc_list_string = list_text(rbc_list_adjust(master_list.rbc_strings)).toLowerCase();
    var aniso_list_string = list_text(master_list.aniso_strings).toLowerCase();
    var neut_list_string = list_text(master_list.neutrophil_strings).toLowerCase();
    var plt_list_string = list_text(master_list.platelet_strings).toLowerCase();
    
    if (master_list.rbc_strings.length > 0) {
      for (let i = 0; i < master_list.rbc_strings.length; i++) {
        if (master_list.rbc_strings)
        rbc_list_array.push(master_list.rbc_strings[i][1]);
      }
    }

    if ($('#hgbNormal').prop("checked")) {
      $("#hgbMildMarked").hide();
      pb_text += "The peripheral blood smear shows adequate hemoglobin. ";
    } else if ($('#hgbLow').prop("checked")) {
      $("#hgbMildMarked").show();
      pb_text += "The peripheral blood smear shows";
      if ($('#hgbMarked').prop("checked")) {
        pb_text += " marked";
      } else if ($('#hgbMild').prop("checked")) {
        pb_text += " mild";
      }
      if ($('#mcvLow').prop("checked")) {
        pb_text += " microcytic";
      } else if ($('#mcvNormal').prop("checked")) {
        pb_text += " normocytic";
      } else if ($('#mcvHigh').prop("checked")) {
        pb_text += " macrocytic";
      }
      if (rbc_list_array.indexOf("Hypochromasia") != -1 && ($('#mcvLow').prop("checked") || $('#mcvNormal').prop("checked") || $('#mcvHigh').prop("checked"))) {
        pb_text += ", hypochromic";
      } else if (rbc_list_array.indexOf("Hypochromsia") != -1) {
        pb_text += " hypochromic";
      }
      pb_text += " anemia. "
    } else if ($('#hgbHigh').prop("checked")) {
      $("#hgbMildMarked").show();
      pb_text += "The peripheral blood smear shows";
      if ($('#hgbMarked').prop("checked")) {
        pb_text += " marked";
      } else if ($('#hgbMild').prop("checked")) {
        pb_text += " mild";
      }
      pb_text += " polycythemia. ";
    }

    if (rbc_list_array.indexOf("Anisopoikilocytosis") != -1) {
      $('#aniso_div').show();
      $('#aniso_select_div').show();
    } else {
      $('#aniso_div').hide();
      $('#aniso_select_div').hide();
    }

    if (rbc_list_array.indexOf("Unremarkable") != -1 && rbc_list_array.indexOf("Predominantly unremarkable") != -1) {
      pb_text += " *** INCOMPATIBLE RBC DESCRIPTORS *** ";
    } else if ((rbc_list_array.indexOf("Unremarkable") != -1 || rbc_list_array.indexOf("Predominantly unremarkable") != -1) && (rbc_list_array.indexOf("Anisopoikilocytosis") != -1 || rbc_list_array.indexOf("Polychromasia") != -1)) {
      pb_text += " *** INCOMPATIBLE RBC DESCRIPTORS *** ";
    } else if (rbc_list_array.indexOf("Anisopoikilocytosis") != -1) {
      if (aniso_list_string == "") {
        pb_text += "Red blood cells show " + rbc_list_string.slice(0, rbc_list_string.indexOf("anisopoikilocytosis")) + "nonspecific " + rbc_list_string.slice(rbc_list_string.indexOf("anisopoikilocytosis")) + ". ";
      } else {
        pb_text += "Red blood cells show " + rbc_list_string + " including " + aniso_list_string + ". ";
      }
    } else if (rbc_list_array.indexOf("Polychromasia") != -1) {
        pb_text += "Red blood cells show " + rbc_list_string + ". ";   
    } else if (rbc_list_array.indexOf("Predominantly unremarkable") != -1) {
      pb_text += "Red blood cells show predominantly unremarkable morphology. "
    } else if (rbc_list_array.indexOf("Unremarkable") != -1) {
      pb_text += "Red blood cells show unremarkable morphology. "
    }

    if (rbc_list_array.indexOf("Nucleated RBCs") != -1) {
      for (const i in master_list.rbc_strings){
        if (master_list.rbc_strings[i][1] == "Nucleated RBCs"){
          if (master_list.rbc_strings[i][0] != null){
            pb_text += master_list.rbc_strings[i][0].charAt(0).toUpperCase() + master_list.rbc_strings[i][0].slice(1) + " nucleated red blood cells are identified. ";
          } else {
            pb_text += "Nucleated red blood cells are identified. ";
          }
        }
      }
    }
    
    
      if ($("#neutLow").prop("checked")) {
        $("#neutMildMarked").show();
        pb_text += "There is"
        if ($('#neutMarked').prop("checked")) {
          pb_text += " marked";
        } else if ($('#neutMild').prop("checked")) {
          pb_text += " mild";
        }
        if (neut_list_string == "") {
          pb_text += " absolute neutropenia. Neutrophils show unremarkable morphology. ";
        } else {
          pb_text += " absolute neutropenia. Neutrophils show " + neut_list_string.toLowerCase() + ". ";
        }
      } else if ($("#neutNormal").prop("checked")) {
        $("#neutMildMarked").hide();
        if (neut_list_string == "") {
          pb_text += "Neutrophils are adequate and show unremarkable morphology. ";
        } else {
          pb_text += " Neutrophils are adequate. Neutrophils show " + neut_list_string.toLowerCase() + ". ";
        }
      } else if ($("#neutHigh").prop("checked")) {
        $("#neutMildMarked").show();
        pb_text += "There is";
        if ($('#neutMarked').prop("checked")) {
          pb_text += " marked";
        } else if ($('#neutMild').prop("checked")) {
          pb_text += " mild";
        }
        if (neut_list_string == "") {
        pb_text += " absolute neutrophilia. Neutrophils show unremarkable morphology. ";
        } else {
          pb_text += " absolute neutrophilia. Neutrophils show " + neut_list_string.toLowerCase() + ". ";
        }
      }

      if ($("#lymphLow").prop("checked")) {
        $("#lymphMildMarked").show();
        pb_text += "There is"
        if ($('#lymphMarked').prop("checked")) {
          pb_text += " marked";
        } else if ($('#lymphMild').prop("checked")) {
          pb_text += " mild";
        }
        pb_text += " absolute lymphopenia. "
        if ($('#lymphocyte_select').val() == "unremarkable") {
          pb_text += "Lymphocytes show unremarkable morphology. ";
        }
      } else if ($("#lymphNormal").prop("checked") && $('#lymphocyte_select').val() == "unremarkable") {
        $("#lymphMildMarked").hide();
        pb_text += "Lymphocytes are adequate and show unremarkable morphology. ";
      } else if ($("#lymphHigh").prop("checked")) {
        $("#lymphMildMarked").show();
        pb_text += "There is";
        if ($('#lymphMarked').prop("checked")) {
          pb_text += " marked";
        } else if ($('#lymphMild').prop("checked")) {
          pb_text += " mild";
        }
        pb_text += " absolute lymphocytosis."
      } else {
/*         pb_text += " Lymphocytes show " + lymph_list_string.toLowerCase() + ". ";
 */      }

      if ($("#eosHigh").prop("checked") && $("#basoHigh").prop("checked")) {
        pb_text += "There is absolute eosinophilia and basophilia. ";
      } else if ($("#eosHigh").prop("checked")){
        pb_text += "There is absolute eosinophilia. ";
      } else if ($("#basoHigh").prop("checked")){
        pb_text += "There is absolute basophilia. ";
      }

      if ($("#pltLow").prop("checked")) {
        $("#pltMildMarked").show();
        pb_text += "Platelets are";
        if ($("#pltMild").prop("checked")) {
          pb_text += " mildly";
        } else if ($("#pltMarked").prop("checked")) {
          pb_text += " markedly";
        }
        if (plt_list_string == "") {
          pb_text += " decreased with unremarkable morphology. "
        } else {
          pb_text += " decreased with " + plt_list_string + ". ";
        }
      } else if ($("#pltNormal").prop("checked")) {
        $("#pltMildMarked").hide();
        if (plt_list_string == "") {
          pb_text += "Platelets are adequate with unremarkable morphology. ";
        } else {
          pb_text += "Platelets are adequate with " + plt_list_string + ". ";  
        }
      } else if ($("#pltHigh").prop("checked")) {
        $("#pltMildMarked").show();
        pb_text += "Platelets are";
        if ($("#pltMild").prop("checked")) {
          pb_text += " mildly";
        } else if ($("#pltMarked").prop("checked")) {
          pb_text += " markedly";
        }
        if (plt_list_string == "") {
        pb_text += " increased with unremarkable morphology. ";
        } else {
        pb_text += " increased with " + plt_list_string + ". ";
        }
      } else if (plt_list_string != ""){
        pb_text += plt_list_string.charAt(0).toUpperCase() + plt_list_string.slice(1) + " are seen."
      }

    if (pb_text != "") {
      $(pb_div).html("<b>Peripheral blood</b><br>" + pb_text + "<br>");
      $(pb_div).show();
      $(right_panel_final).show();
    } else {
      $(pb_div).hide();
    }
  }

  function fill_asp() {
    let asp_text = "";
    const adequacy_list_string = list_text(master_list.adequacy_strings).toLowerCase();
    const erythroidListString = list_text(master_list.erythroid_strings).toLowerCase();
    const myeloidListString = list_text(master_list.myeloid_strings).toLowerCase();
    const megakaryocyteListString = list_text(master_list.megakaryocyte_strings).toLowerCase();

    if (erythroidListString != ""){
      $("#erythroid_unremarkable").prop("checked", false);
    }

    if (myeloidListString != ""){
      $("#myeloid_unremarkable").prop("checked", false);
    }

    if (megakaryocyteListString != ""){
      $("#megakaryocyte_unremarkable").prop("checked", false);
    }
    
    if ($('#asp_adequate').prop("checked") && adequacy_list_string == "") {
      asp_text += "The bone marrow aspirate smears are cellular and adequate for interpretation. ";
    } else if ($('#asp_adequate').prop("checked")) {
      asp_text += "The bone marrow aspirate smears are " + adequacy_list_string + " but overall adequate for interpretation. ";
    } else if ($('#asp_inadequate').prop("checked") && adequacy_list_string == "") {
      asp_text += "The bone marrow aspirate smears are inadequate for interpretation. ";
    } else if ($('#asp_inadequate').prop("checked")) {
      asp_text += "The bone marrow aspirate smears are " + adequacy_list_string + " precluding a meaningful marrow differential. ";
    }

    if ($('#erythroid_unremarkable').prop("checked") && $('#myeloid_unremarkable').prop("checked")) {
      asp_text += "Myeloid and erythroid precursors show progressive maturation with unremarkable morphology. ";
    } else {
      if ($('#erythroid_unremarkable').prop("checked")){
        asp_text += "Erythroid precursors show progressive maturation with unremarkable morphology. ";
      } else if (erythroidListString != ""){
        asp_text += "Erythroid precursors show " + erythroidListString + ". ";
      }
      if ($('#myeloid_unremarkable').prop("checked")){
        asp_text += "Myeloid precursors show progressive maturation with unremarkable morphology. ";
      } else if (myeloidListString != ""){
        asp_text += "Myeloid precursors show " + myeloidListString + ". ";
      }
    };

    if ($('#megakaryocyte_unremarkable').prop("checked")) {
      asp_text += "Megakaryocytes appear adequate with unremarkable morphology. ";
    } else if (megakaryocyteListString != ""){
      asp_text += "Megakaryocytes show " + megakaryocyteListString + ". ";
    }

    if ($('#blast_adequate').prop("checked")) {
      asp_text += "Blasts are not increased. ";
    } else if ($('#blast_increased').prop("checked")){
      asp_text += "Blasts are significantly increased. ";
    }

    if (asp_text != "" && $(pb_div).html() != "") {
      $(asp_div).html("<br><b>Aspirate smear/Touch preparation</b><br>" + asp_text);
      $(asp_div).show();
      $("#rightTemplate").show();
    } else if (asp_text != "") {
      $(asp_div).html("<b>Aspirate smear/Touch preparation</b><br>" + asp_text);
      $(asp_div).show();
      $(right_panel_final).show();
    } else {
      $(asp_div).hide();
    }
  }


  $(".saveButton").click(function() {
    let saveFileBM = {};
    let aspToggle = false;
    let pbToggle = false;
    let errorDescriptor = "";
    let settingObject = {};
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
      settingObject[this.id] = $(this).prop('checked');
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
      saveFileBM.settingObjectBM = settingObject;
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
