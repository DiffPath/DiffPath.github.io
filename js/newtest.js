$(document).ready(function() {
  /*
    The variables pbCountTable and aspCountTable are utilized to calculate
    the percentages of each cell type when the user performs a differential.
    The array syntax is as follows: ['cell type', 'character associated with
    the cell type', corresponding HTML ID number, cell type handler (explained 
    below), number of cells already counted for given cell type (baseline = 0),
    row hidden value (1 = yes, 2 = no)]
  
    0 = No special type
    1 = Neutrophil/precursor for M:E ratio calculation
    2 = Other myeloid cell for M:E ratio calculation
    3 = Erythroid cell for M:E ratio calculation
    4 = Circulating NRBC
    5 = Blast
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

  let audioElement;

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
    let counterSaveFile = JSON.parse(localStorage.getItem("counterSaveFile"));
    if (counterSaveFile != null) {
      if (counterSaveFile.settingArray != null){
        for (let i = 0; i < counterSaveFile.settingArray.length; i++){
          $("#" + counterSaveFile.settingArray[i][0]).val(counterSaveFile.settingArray[i][1])
          }
      }
      if (counterSaveFile.cpbCountTable != null){
        pbCountTable = counterSaveFile.cpbCountTable;
      }  
      if (counterSaveFile.caspCountTable != undefined){
        aspCountTable = counterSaveFile.caspCountTable;
      } else {
        
      }
      if (counterSaveFile.settingObject != null) {
        $.each(counterSaveFile.settingObject,function(x,y){
          $('#'+x).prop('checked',y);
        });
      }
    };
    return [pbCountTable,aspCountTable];
  }

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

  $('#play').click(function(){
    console.log('hi')
  })

  $('.counter').click(function(){
    const audioContext = new AudioContext();
    audioElement = document.getElementById("med");
    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(audioContext.destination);
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
      $("#pbLabel" + pbCountTable[i]["character"]).html(pbCountTable[i]["character"] + ". " + pbCountTable[i]["name"]);
      $("#pbTemplate" + pbCountTable[i]["character"]).attr('placeholder', pbCountTable[i]["name"]);
    }
    for (const i in aspCountTable) {
      $("#aspLabel" + aspCountTable[i]["character"]).html(aspCountTable[i]["character"] + ". " + aspCountTable[i]["name"]);
      $("#aspTemplate" + aspCountTable[i]["character"]).attr('placeholder', aspCountTable[i]["name"]);
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
        audioElement.play();
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
  })

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

  $(".saveButton").click(function() {
    let saveFile = {};
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
      saveFile.cpbCountTable = pbCountTable;
      saveFile.caspCountTable = aspCountTable;
      saveFile.settingObject = settingObject;
      localStorage.setItem("counterSaveFile", JSON.stringify(saveFile));
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
