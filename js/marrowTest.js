document.addEventListener('DOMContentLoaded', function() {
    let saveFileBM = JSON.parse(localStorage.getItem("saveFileBM"));

const audioCtx = new (window.AudioContext || window.webkitAudioContext)({
    latencyHint: 'interactive'
});
const audioBuffers = {};
let audioUnlocked = false;

async function loadAudio(name, url) {
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        audioBuffers[name] = audioBuffer;
    } catch (error) {
        console.error("Error loading audio:", error);
    }
}

loadAudio('high', 'https://diffpath.github.io/media/Count-Click-High2.mp3');
loadAudio('med', 'https://diffpath.github.io/media/Count-Click-Med.mp3');
loadAudio('low', 'https://diffpath.github.io/media/Count-Click-Low.mp3');
loadAudio('blast', 'https://diffpath.github.io/media/Count-Click-Blast.mp3');
loadAudio('complete','https://diffpath.github.io/media/Complete-Nice.mp3');
loadAudio('hundred','https://diffpath.github.io/media/100-Soothing.mp3');

if (saveFileBM !== null) {
    if (saveFileBM.countTableBM != null) {
        countTables = saveFileBM.countTableBM;
    }
}

window.keypressed = {};

for (let key in selectMasterList) {
    if (selectMasterList.hasOwnProperty(key)) {
        fillOptions(key);
    }
}

function fillOptions(key) {
    document.querySelectorAll(`[data-selectType="${key}"]`).forEach(function(el) {
        for (let i in selectMasterList[key]) {
            if (selectMasterList[key].hasOwnProperty(i)) {
                let option = document.createElement('option');
                option.textContent = selectMasterList[key][i];
                el.appendChild(option);
            }
        }
    });
}

if (saveFileBM !== null) {
    if (saveFileBM.settingArray != null) {
        for (let i = 0; i < saveFileBM.settingArray.length; i++) {
            let el = document.getElementById(saveFileBM.settingArray[i][0]);
            if (el) el.value = saveFileBM.settingArray[i][1];
        }
    }
    
    if (saveFileBM.checkedObjectBM != null) {
        for (let x in saveFileBM.checkedObjectBM) {
            if (saveFileBM.checkedObjectBM.hasOwnProperty(x)) {
                let el = document.getElementById(x);
                if (el) el.checked = saveFileBM.checkedObjectBM[x];
            }
        }
    }
    
    if (saveFileBM.inputObjectBM != null) {
        for (let x in saveFileBM.inputObjectBM) {
            if (saveFileBM.inputObjectBM.hasOwnProperty(x)) {
                let el = document.getElementById(x);
                if (el) el.value = saveFileBM.inputObjectBM[x];
            }
        }
    }  
}

fillLayoutGrids();
fillCounterGrids(); 

function fillLayoutGrids() {
    document.querySelectorAll('.layoutGrid').forEach(function(el) {
        let layoutType = el.getAttribute("data-type");
        let layoutSelect = document.getElementById(`${layoutType}LayoutSelect`);
        let layoutSelectVal = layoutSelect ? layoutSelect.value : "";
        
        let gridTemplate = gridLayouts[layoutSelectVal];
        let gridHTML = "";
        let idCount = 0;
        
        for (let i in gridTemplate) {
            if (!gridTemplate.hasOwnProperty(i)) continue;
            for (let j in gridTemplate[i]) {
                if (!gridTemplate[i].hasOwnProperty(j)) continue;
                if (gridTemplate[i][j] == -1) {
                    gridHTML += "<div></div>";
                } else {
                    gridHTML += `<div><b>${gridTemplate[i][j]}: </b><select class="counterTemplate" data-type="${layoutType}" data-character="${gridTemplate[i][j]}" data-counter="${layoutType}Counter${idCount}" id="${layoutType}Layout${idCount}"></select></div>`;
                    idCount++;
                }
            }
        }
        el.innerHTML = gridHTML;
    });
    fillLayoutGridSelects();
}

document.querySelectorAll('.layoutBody').forEach(function(body) {
    body.addEventListener('change', function(e) {
        if (e.target.matches('.counterTemplate')) {
            checkDuplicate(e.target.className, e.target.id, e.target.value, e.target.getAttribute("data-type"));
        }
    });
});

const duplicateCache = new Map();

function checkDuplicate(thisClass, thisID, thisValue, thisType) {
    let inputs = document.getElementsByClassName(thisClass);
    for (let i = 0; i < inputs.length; i++) {
        let el = inputs[i];
        if (el.getAttribute("data-type") === thisType) {
            if (thisValue !== "" && thisValue === el.value && thisID !== el.id) {
                el.value = '';
                el.style.backgroundColor = 'rgb(255, 95, 95)';
            } else {
                if (el.value !== "") {
                    el.style.backgroundColor = 'white';
                }
            }
        }
    }
}

function fillLayoutGridSelects() {
    document.querySelectorAll('.counterTemplate').forEach(function(el) {
        let countTable = countTables[`${el.getAttribute("data-type")}CountTable`];
        let id = el.id;
        let selectDetect = false;
        
        for (let i in countTable) {
            if (!countTable.hasOwnProperty(i)) continue;
            
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            
            if (countTable[i].layoutGridID === id) {
                option.selected = true;
                selectDetect = true;
            }
            
            el.appendChild(option);
        }
        
        if (!selectDetect) {
            el.value = '';
            el.style.backgroundColor = 'rgb(255, 95, 95)';
        }
    });
}

function fillCounterGrids() {
    document.querySelectorAll('.counterGrid').forEach(function(el) {
        let counterType = el.getAttribute("data-type");
        let layoutSelect = document.getElementById(`${counterType}LayoutSelect`);
        let layoutSelectVal = layoutSelect ? layoutSelect.value : "";
        
        let gridTemplate = gridLayouts[layoutSelectVal];
        let countTable = countTables[`${counterType}CountTable`];
        let gridHTML = "";
        let idCount = 0;
        
        for (let i in gridTemplate) {
            if (!gridTemplate.hasOwnProperty(i)) continue;
            for (let j in gridTemplate[i]) {
                if (!gridTemplate[i].hasOwnProperty(j)) continue;
                
                let cellName = "";
                for (let a in countTable) {
                    if (!countTable.hasOwnProperty(a)) continue;
                    if (gridTemplate[i][j] == countTable[a]["character"]) {
                        cellName = countTable[a]["name"];
                    }
                }
                
                if (gridTemplate[i][j] == -1) {
                    gridHTML += "<div></div>";
                } else {
                    gridHTML += `<div class="gridCell"><b>${gridTemplate[i][j]}: ${cellName}</b><input class="${counterType}Counter" id="${counterType}Counter${idCount}" size="2"></div>`;
                    idCount++;
                }
            }
        }
        el.innerHTML = gridHTML;
    });
}

document.addEventListener('mousedown', wakeUpAudio); 
window.addEventListener('focus', wakeUpAudio);       
document.addEventListener('visibilitychange', () => { 
    if (document.visibilityState === 'visible') {
        wakeUpAudio();
    }
});

document.querySelectorAll('.navbarIcon').forEach(function(el) {
    el.addEventListener('click', function() {
        let nav = document.getElementById('navbar');
        let overlay = document.getElementById('overlay');
        if (nav) nav.classList.toggle('open');
        if (overlay) overlay.classList.toggle('open');
    });
});

document.getElementById('overlay')?.addEventListener('click', function() {
    let nav = document.getElementById('navbar');
    
    if (nav) nav.classList.remove('open');
    this.classList.remove('open');
});

document.querySelectorAll('.headerTab').forEach(function(el) {
    el.addEventListener('click', function() {
        let rootClass = this.className.split(" ")[0];
        document.querySelectorAll(`.${rootClass}`).forEach(function(tab) {
            tab.classList.remove("clicked");
            tab.classList.add("unclicked");
            let targetDiv = document.getElementById(headerObject[tab.id]);
            if (targetDiv) targetDiv.style.display = 'none';
        });
        
        let activeDiv = document.getElementById(headerObject[this.id]);
        if (activeDiv) activeDiv.style.display = 'block';
        this.classList.add("clicked");
        this.classList.remove("unclicked");
    });
});

document.querySelectorAll('.laterality').forEach(function(el) {
    el.addEventListener('change', function() {
        document.querySelectorAll('.specimen').forEach(function(spec) {
            spec.checked = true;
        });
        let specAll = document.getElementById('specAll');
        if (specAll) specAll.checked = true;
    });
});

document.querySelectorAll('.specimen').forEach(function(el) {
    el.addEventListener('change', function() {
        let specAll = document.getElementById('specAll');
        if (specAll) specAll.checked = false;
        if (typeof radioObject !== 'undefined') radioObject.specAll = 0;
    });
});

document.getElementById('specAll')?.addEventListener('change', function() {
    let isChecked = this.checked;
    document.querySelectorAll('.specimen').forEach(function(spec) {
        spec.checked = isChecked;
    });
    if (typeof fillSpecimen === 'function') fillSpecimen();
});

document.getElementById('pbCBC')?.addEventListener('input', function() {
    let cbcFinal = [];
    const cbcLines = this.value.split("\n");
    let cbcList = { ...cbcObject };
    let toggle = true;
    
    for (let i = 0; i < cbcLines.length; i++) {
        cbcFinal.push(cbcLines[i].split('\t'));
    }
    
    for (let i = 0; i < cbcFinal.length; i++) {
        for (let j in cbcList) {
            if (cbcFinal[i][0] === j) {
                cbcObject[j]["value"] = cbcFinal[i][1];
                if (cbcFinal[i][1] !== "") {
                    delete cbcList[j];
                }
            }
        } 
        if (toggle) {
            for (let j = 0; j < cbcFinal[i].length; j++) {
                if (cbcFinal[i][j].indexOf("DOB:") !== -1) {
                    let dateStr = cbcFinal[i][j].slice(cbcFinal[i][j].indexOf("DOB:")).slice(5, cbcFinal[i][j].slice(cbcFinal[i][j].indexOf("DOB:")).indexOf(","));
                    let dob = new Date(dateStr);
                    let month = Date.now() - dob.getTime();
                    let age_dt = new Date(month);
                    let year = age_dt.getUTCFullYear();    
                    patientAge = Math.abs(year - 1970);
                    toggle = false;
                }
                if (cbcFinal[i][j].indexOf("Legal Sex: ") !== -1) {
                    legalSex = cbcFinal[i][j].split("Legal Sex: ")[1];
                }
            }
        }
    }
    if (typeof fillInputs === 'function') fillInputs();
});


function fillSelectHTML(selectType, parentID) {
    let selectDivHTML = "";
    let optionList = [...selectMasterList[selectType]];
    let counter = 0;
    let addBlank = true;
    
    document.querySelectorAll(`[data-parentID="${parentID}"]`).forEach(function(el) {
        if (el.value !== '' && optionList.includes(el.value)) {
            const descriptorObject = descriptorList[el.value]["descriptorObject"];
            const id = descriptorList[el.value]["id"];
            selectDivHTML += `<div class='flex'><div><select id="${parentID}${counter}" class="select" data-selectType="${selectType}" data-parentID="${parentID}">`;
            
            for (let i = 0; i < optionList.length; i++) {
                if (optionList[i] === el.value) {
                    selectDivHTML += `<option selected>${optionList[i]}</option>`;
                } else {
                    selectDivHTML += `<option>${optionList[i]}</option>`;
                }
            }
            
            optionList = optionList.filter(item => item !== el.value);
            selectDivHTML += "</select></div>";
            
            if (descriptorObject.class === "radio") {
                for (let i = 0; i < descriptorObject.descriptors.length; i++) {
                    let isChecked = document.getElementById(`${parentID}${id}${i}`)?.checked ? "checked" : "";
                    selectDivHTML += `<label><input type="${descriptorObject.class}" id="${parentID}${id}${i}" class="descriptor" name="${parentID}${id}" value="${descriptorObject.value[i]}" data-parentID="${parentID}${counter}" ${isChecked}>${descriptorObject.descriptors[i]}</label>`;
                }
            } else if (descriptorObject.class === "select" || descriptorObject.class === "selectDualCount") {
                selectDivHTML += `<div><select id='${parentID}${id}' class='selectDescriptor' data-parentID="${parentID}${counter}">`;
                for (let i = 0; i < descriptorObject.descriptors.length; i++) {
                    let isSelected = document.getElementById(`${parentID}${id}`)?.value === descriptorObject.descriptors[i] ? "selected" : "";
                    selectDivHTML += `<option ${isSelected}>${descriptorObject.descriptors[i]}</option>`;
                }
                selectDivHTML += '</select>';
                
                if (descriptorObject.class === "selectDualCount") {
                    selectDivHTML += `<div style="margin-bottom: 5px;">
                        <label style="font-size: 0.9em;">Manual percentage: 
                            <input type="number" class="manualStainInput" id="${parentID}${id}ManualMin" style="width: 50px;" min="0" max="100" placeholder="Min">
                            to 
                            <input type="number" class="manualStainInput" id="${parentID}${id}ManualMax" style="width: 50px;" min="0" max="100" placeholder="Max">
                        </label>
                    </div>`;
                    selectDivHTML += `<div id='${parentID}${id}CounterResults'><b>${positiveLabel}. Positive:&nbsp</b>${descriptorList[el.value]['positive']}<b>&nbsp${negativeLabel}. Negative:&nbsp</b>${descriptorList[el.value]['negative']}<b>&nbspTotal:&nbsp</b>${descriptorList[el.value]['count']}</div>`;
                    selectDivHTML += `<div><textarea class='dualCounter extend' id='${parentID}${id}Counter' rows='1' placeholder='Count here or choose percentage manually above' data-stain="${el.value}">${descriptorList[el.value]['value']}</textarea></div>`;
                }
                selectDivHTML += '</div>';
            } else if (descriptorObject.class === "iron") {
                selectDivHTML += '<div>';
                for (let i in descriptorObject.descriptors) {
                    if (!descriptorObject.descriptors.hasOwnProperty(i)) continue;
                    selectDivHTML += `<div><b>${i}:</b> `;
                    for (let j = 0; j < descriptorObject.descriptors[i]["labels"].length; j++) {
                        let isChecked = document.getElementById(`${parentID}${id}${descriptorObject.descriptors[i]['id']}${j}`)?.checked ? "checked" : "";
                        selectDivHTML += `<label><input type="radio" class="descriptor" id="${parentID}${id}${descriptorObject.descriptors[i]['id']}${j}" name="${parentID}${id}${i}" value="${descriptorObject.descriptors[i]['value'][j]}" data-parentID="${parentID}${counter}" ${isChecked}>${descriptorObject.descriptors[i]['labels'][j]}</label>`;
                    }
                    selectDivHTML += '</div>';
                }
                if (document.getElementById(`${parentID}ironringSideroblasts0`)?.checked && parentID === "aspirateSpecialStainsSelectDiv") {
                    selectDivHTML += `<div><div><textarea class='dualCounter extend' id='ironCounter' rows='1' placeholder='Count Here' data-stain="Iron">${descriptorList.Iron.value}</textarea></div>`;
                    selectDivHTML += `<div id='ironCounterResults'><b>${positiveLabel}. Positive:&nbsp</b>${descriptorList.Iron.positive}<b>&nbsp${negativeLabel}. Negative:&nbsp</b>${descriptorList.Iron.negative}<b>&nbspTotal:&nbsp</b>${descriptorList.Iron.count}</div></div>`;
                }
                selectDivHTML += '</div>';
            } else if (descriptorObject.class === 'hidden') {
                selectDivHTML += `<label style="display: none"><input type="${descriptorObject.class}" id="${parentID}${id}" class="descriptor" name="${parentID}${id}" value="${descriptorObject.value}" data-parentID="${parentID}${counter}" checked>${descriptorObject.descriptors[0]}</label>`;
            } else if (descriptorObject.class === "stop") {
                addBlank = false;
            }
            selectDivHTML += "</div>";
            counter++;
        }
    });
    
    if (optionList.length > 1 && addBlank) {
        selectDivHTML += `<div class='flex'><div><select id="${parentID}${counter}" class="select" data-selectType="${selectType}" data-parentID="${parentID}">`;
        for (let i = 0; i < optionList.length; i++) {
            selectDivHTML += `<option>${optionList[i]}</option>`;
        }
        selectDivHTML += "</select></div></div>";
    }
    
    let parentEl = document.getElementById(parentID);
    if (parentEl) parentEl.innerHTML = selectDivHTML;   
}

document.querySelectorAll('.selectDiv').forEach(function(div) {
    div.addEventListener('click', function(e) {
        if (e.target.matches('.descriptor')) {
            let parentDataId = e.target.getAttribute("data-parentID");
            let parentEl = document.getElementById(parentDataId);
            if (parentEl) {
                fillSelectHTML(parentEl.getAttribute("data-selectType"), parentEl.getAttribute("data-parentID"));
            }
            fillReport();
        }
    });

div.addEventListener('change', function(e) {
        if (e.target.matches('.select')) {
            fillSelectHTML(e.target.getAttribute("data-selectType"), e.target.getAttribute("data-parentID"));
            fillReport();
        } else if (e.target.matches('.selectDescriptor')) {
            fillReport();
        } else if (e.target.matches('.manualStainInput')) { 
            if (typeof fillReport === 'function') fillReport();
        }
    });

    div.addEventListener('keydown', function(e) {
        if (e.target.matches('.dualCounter')) {
            countNoise(e);
        }
    });

div.addEventListener('keyup', function(e) {
        if (e.target.matches('.dualCounter')) {
            window.keypressed[e.which] = false;
            countDual(e.target.getAttribute('data-stain'), e.target.id, e.target.value);
            if (typeof fillReport === 'function') fillReport();
        } else if (e.target.matches('.manualStainInput')) {
            if (typeof fillReport === 'function') fillReport();
        }
    });
});

document.querySelectorAll('[data-selectType="diffLayout"]').forEach(function(el) {
    el.addEventListener('change', function() {
        if (typeof fillLayoutGrids === 'function') fillLayoutGrids();
        if (typeof fillCounterGrids === 'function') fillCounterGrids(); 
    });
});

document.querySelectorAll('.diffSetting').forEach(function(el) {
    el.addEventListener('change', function() {
        countCells("pb");
        countCells("asp");
    });
});

function countDual(counterClass, counterId, value) {
    descriptorList[counterClass]['value'] = value;
    let positiveCount = (value.match(new RegExp(positiveLabel, "g")) || []).length;
    let negativeCount = (value.match(new RegExp(negativeLabel, "g")) || []).length;
    let totalCount = positiveCount + negativeCount;
    let resultsDiv = document.getElementById(`${counterId}Results`);
    if (resultsDiv) {
        resultsDiv.innerHTML = `<div><b>${positiveLabel}. Positive:&nbsp</b>${positiveCount}<b>&nbsp${negativeLabel}. Negative:&nbsp</b>${negativeCount}<b>&nbspTotal:&nbsp</b>${totalCount}</div>`;
    }
    descriptorList[counterClass]['positive'] = positiveCount;
    descriptorList[counterClass]['negative'] = negativeCount;
    descriptorList[counterClass]['count'] = totalCount;
}

document.querySelectorAll('.counter').forEach(function(el) {
    el.addEventListener('keydown', function(e) {
        countNoise(e, this.getAttribute("data-type"));
    });
    el.addEventListener('keyup', function(e) {
        window.keypressed[e.which] = false;
        countCells(this.getAttribute("data-type"));
    });
});

function wakeUpAudio() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }    
    if (!audioUnlocked) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        gain.gain.value = 0.00001; 
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();  
        audioUnlocked = true;
    }
}

function playSound(name) {
    if (!audioBuffers[name]) return; 
    
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffers[name];
    source.connect(audioCtx.destination);
    source.start(0); 
}

function countNoise(e, type) {
    if (window.keypressed[e.which]) {
        e.preventDefault();
    } else {
        if (e.key == 7 || e.key == 8 || e.key == 9) { 
            window.keypressed[e.which] = true; 
            playSound('high');
        } else if (e.key == 4 || e.key == 5 || e.key == 6) { 
            window.keypressed[e.which] = true; 
            playSound('med');
        } else if (e.key == 1 || e.key == 2 || e.key == 3) { 
            window.keypressed[e.which] = true; 
            playSound('low');
        } else if (e.key == 0) { 
            window.keypressed[e.which] = true; 
            playSound('blast');
        }
        
        let layoutSelect = document.getElementById(`${type}LayoutSelect`)?.value;
        if (layoutSelect === "Numbers and period") {
            if (e.key === ".") {
                window.keypressed[e.which] = true;
                playSound('blast');
            }
        } else if (layoutSelect === "Expanded") {
            if (e.key === "/" || e.key === "*") {
                window.keypressed[e.which] = true;
                playSound('high');
            } else if (e.key === ".") {
                window.keypressed[e.which] = true;
                playSound('blast');
            }
        }
    }
}

function countCells(e) {
    let ccountEl = document.getElementById(`${e}CCount`);
    let dcountEl = document.getElementById(`${e}DCount`);
    let ccount = ccountEl ? ccountEl.value : 0;
    let dcount = dcountEl ? dcountEl.value : 0;
    
    if (!document.getElementById("countExtra")?.checked && ccount == dcount) {
        return;
    }
    
    let table = countTables[`${e}CountTable`];
    let countSum = 0, myeloidSum = 0, erythroidSum = 0, neutSum = 0;
    const totalCount = cellCounter(table, e);
    
    if (ccountEl && ccountEl.value != totalCount) ccountEl.value = totalCount;

    let diffCount = document.getElementById('diffCount');
    let tableDiv = document.getElementById(`${e}TableDiv`);

    if (totalCount > 0) {
        if (diffCount && diffCount.style.display !== 'block') diffCount.style.display = 'block';
        if (tableDiv && tableDiv.style.display !== 'block') tableDiv.style.display = 'block';  
        if (document.getElementById("roundDesired")?.checked) {
            for (const i in table) {
                if (!table.hasOwnProperty(i)) continue;
                table[i]["percent"] = (Math.round((table[i]["count"] / totalCount) * dcount) / (dcount / 100)).toFixed(1);
                if (table[i]["cellType"] != 4) {
                    countSum += parseFloat(table[i]["percent"]);
                }
            }
            while (parseFloat(countSum.toFixed(1)) !== 100) {
                let minDifference = 10;
                let minIndex = -1; 
                if (countSum > 100) {
                    for (const i in table) {
                        if (!table.hasOwnProperty(i)) continue;
                        if (table[i]["cellType"] != 4) {
                            let diff = (Math.abs(((100 * table[i]["count"] / totalCount) - (parseFloat(table[i]["percent"]) - 100 / dcount))) / table[i]["count"]);
                            if (diff < minDifference) {
                                minIndex = i;
                                minDifference = diff;
                            }
                        }
                    }
                    table[minIndex]["percent"] = (parseFloat(table[minIndex]["percent"]) - 100 / dcount).toFixed(1);
                    countSum -= 100 / dcount;
                } else {
                    for (const i in table) {
                        if (!table.hasOwnProperty(i)) continue;
                        if (table[i]["cellType"] != 4) {
                            let diff = (Math.abs(((100 * table[i]["count"] / totalCount) - (parseFloat(table[i]["percent"]) + 100 / dcount))) / table[i]["count"]);
                            if (diff < minDifference) {
                                minIndex = i;
                                minDifference = diff;
                            }
                        }
                    }
                    table[minIndex]["percent"] = (parseFloat(table[minIndex]["percent"]) + 100 / dcount).toFixed(1);
                    countSum += 100 / dcount;
                }
            }
        } else {
            for (const i in table) {
                if (!table.hasOwnProperty(i)) continue;
                table[i]["percent"] = (Math.round((100 * table[i]["count"] / totalCount) * 10) / 10).toFixed(1);
                if (table[i]["cellType"] != 4) {
                    countSum += parseFloat(table[i]["percent"]);
                }
            }
        }

        let tCountEl = document.getElementById(`${e}TCount`);
        let newCountSumStr = countSum.toFixed(1) + "%";
        if (tCountEl && tCountEl.value !== newCountSumStr) tCountEl.value = newCountSumStr;
        
        let blastChecked = document.getElementById('blastCheck')?.checked;

        for (const i in table) {
            if (!table.hasOwnProperty(i)) continue;
            if (table[i]['character'] != -1) {
                if (e === "asp" && table[i]["count"] > 0) {
                    if ((table[i]['cellType'] == 5 && blastChecked) || table[i]['cellType'] == 1 || table[i]['cellType'] == 2) {
                        myeloidSum += parseFloat(table[i]["percent"]);
                        if (table[i]['cellType'] == 1) {
                            neutSum += parseFloat(table[i]["percent"]);
                        }
                    } else if (table[i]['cellType'] == 3) {
                        erythroidSum += parseFloat(table[i]["percent"]);
                    }
                }

                let counterGridEl = document.querySelector(table[i]["counterGridID"]);
                let tableCellEl = document.querySelector(table[i]["tableCellID"]);
                let tableRowEl = document.querySelector(table[i]["tableRowID"]);

                let formattedPercentStr = "";
                let formattedCellStr = "";
                if (table[i]["cellType"] == 4) {
                    formattedPercentStr = table[i]["percent"];
                    formattedCellStr = table[i]["percent"];
                } else if (table[i]["cellType"] == 1) {
                    formattedPercentStr = table[i]["percent"] + "%";
                } else {
                    formattedPercentStr = table[i]["percent"] + "%";
                    formattedCellStr = table[i]["percent"] + "%";
                }

                if (counterGridEl && counterGridEl.value !== formattedPercentStr) {
                    counterGridEl.value = formattedPercentStr;
                }
                
                if (tableCellEl && table[i]["cellType"] != 1) {
                    if (tableCellEl.innerHTML !== formattedCellStr) {
                        tableCellEl.innerHTML = formattedCellStr;
                    }
                }

                if (tableRowEl) {
                    let targetDisplay = (table[i]['hidden'] && table[i]['count'] > 0) ? 'table-row' : (table[i]['hidden'] ? 'none' : '');
                    if (targetDisplay !== '' && tableRowEl.style.display !== targetDisplay) {
                        tableRowEl.style.display = targetDisplay;
                    }
                }
            }
        }

        if (e === "asp") {
            let meRatioEl = document.getElementById('meRatio');
            let aspTableCell99 = document.getElementById('aspTableCell99');
            let myeloidPredom = document.getElementById('myeloidPredominance');
            let erythroidPredom = document.getElementById('erythroidPredominance');
            let erythroidPredomSetting = document.getElementById('erythroidPredomSetting')?.value;
            let myeloidPredomSetting = document.getElementById('myeloidPredomSetting')?.value;

            if (erythroidSum !== 0) {
                const meRatio = (Math.round((myeloidSum / erythroidSum) * 10) / 10).toFixed(1);
                let meRatioStr = `${meRatio}:1`;
                
                if (meRatioEl && meRatioEl.value !== meRatioStr) meRatioEl.value = meRatioStr;
                if (aspTableCell99 && aspTableCell99.innerHTML !== meRatioStr) aspTableCell99.innerHTML = meRatioStr;
                
                if (erythroidPredomSetting !== '' && meRatio < parseFloat(erythroidPredomSetting)) {
                    if (myeloidPredom && myeloidPredom.checked) myeloidPredom.checked = false;
                    if (erythroidPredom && !erythroidPredom.checked) erythroidPredom.checked = true;
                } else if (myeloidPredomSetting !== '' && meRatio > parseFloat(myeloidPredomSetting)) {
                    if (myeloidPredom && !myeloidPredom.checked) myeloidPredom.checked = true;
                    if (erythroidPredom && erythroidPredom.checked) erythroidPredom.checked = false;
                } else if (erythroidPredomSetting !== '' && myeloidPredomSetting !== '') {
                    if (myeloidPredom && myeloidPredom.checked) myeloidPredom.checked = false;
                    if (erythroidPredom && erythroidPredom.checked) erythroidPredom.checked = false;
                }
            } else if (erythroidSum === 0) {
                if (meRatioEl && meRatioEl.value !== "N/A") meRatioEl.value = "N/A";
                if (aspTableCell99 && aspTableCell99.innerHTML !== "N/A") aspTableCell99.innerHTML = "N/A";
                if (myeloidPredom && myeloidPredom.checked) myeloidPredom.checked = false;
                if (erythroidPredom && erythroidPredom.checked) erythroidPredom.checked = false;
            }
            
            let aspTableCell3 = document.getElementById('aspTableCell3');
            let neutSumStr = neutSum.toFixed(1) + "%";
            if (aspTableCell3 && aspTableCell3.innerHTML !== neutSumStr) aspTableCell3.innerHTML = neutSumStr;
        }

        if (dcount == totalCount) {
            playSound('complete');
        } else if ((totalCount % 100) === 0) {
            playSound('hundred');
        } 
        
        let rpFinalNode = (typeof rightPanelFinal === 'string') ? document.querySelector(rightPanelFinal) : rightPanelFinal;
        if (!rpFinalNode) rpFinalNode = document.getElementById('rightPanelFinal');
        if (rpFinalNode && rpFinalNode.style.display !== 'block') rpFinalNode.style.display = 'block';

    } else {
        for (const i in table) {
            if (!table.hasOwnProperty(i)) continue;
            
            let gridID = table[i]["counterGridID"];
            let cellID = table[i]["tableCellID"];
            
            let counterGridEl = gridID ? document.querySelector(gridID) : null;
            let tableCellEl = cellID ? document.querySelector(cellID) : null;
            
            if (counterGridEl && counterGridEl.value !== "") counterGridEl.value = "";
            if (tableCellEl && tableCellEl.innerHTML !== "") tableCellEl.innerHTML = "";
        }
        
        if (ccountEl && ccountEl.value !== "") ccountEl.value = "";
        let tCountEl = document.getElementById(`${e}TCount`);
        if (tCountEl && tCountEl.value !== "") tCountEl.value = "";
        
        if (document.getElementById('pbCCount')?.value == 0 && document.getElementById('aspCCount')?.value == 0) {
            if (diffCount && diffCount.style.display !== 'none') diffCount.style.display = 'none';
        }
        
        let erythroidPredom = document.getElementById('erythroidPredominance');
        if (erythroidPredom && erythroidPredom.checked) erythroidPredom.checked = false;
        
        let meRatioEl = document.getElementById('meRatio');
        if (meRatioEl && meRatioEl.value !== "") meRatioEl.value = "";
        
        if (tableDiv && tableDiv.style.display !== 'none') tableDiv.style.display = 'none';
    }

if (e === "pb") {
        const wbcString = cbcObject["WBC"] ? cbcObject["WBC"]["value"] : null;
        const wbcFloat = wbcString ? parseFloat(wbcString.split(" ")[0]) : null;
        const hasWbc = wbcFloat !== null && !isNaN(wbcFloat);

        const bFreqLimit = parseFloat(document.getElementById('blastFrequentLimit')?.value) || 1.0;
        const bOccLimit = parseFloat(document.getElementById('blastOccasionalLimit')?.value) || 0.3;
        
        const pFreqLimit = parseFloat(document.getElementById('plasmaFrequentLimit')?.value) || 1.0;
        const pOccLimit = parseFloat(document.getElementById('plasmaOccasionalLimit')?.value) || 0.3;

        const nFreqLimit = parseFloat(document.getElementById('nrbcFrequentLimit')?.value) || 1.0;
        const nOccLimit = parseFloat(document.getElementById('nrbcOccasionalLimit')?.value) || 0.3;

        let pbBlastsPercent = countTables['pbCountTable'].Blasts.percent; 
        if (pbBlastsPercent > 0) {
            if (!hasWbc) {
                let el = document.getElementById('blastPresent');
                if (el && !el.checked) el.checked = true;
            } else {
                let absBlasts = (pbBlastsPercent / 100) * wbcFloat;
                if (absBlasts >= bFreqLimit) {
                    let el = document.getElementById('blastFrequent');
                    if (el && !el.checked) el.checked = true;
                } else if (absBlasts >= bOccLimit) {
                    let el = document.getElementById('blastOccasional');
                    if (el && !el.checked) el.checked = true;
                } else {
                    let el = document.getElementById('blastRare');
                    if (el && !el.checked) el.checked = true;
                }
            }
        } else {
            ['blastPresent', 'blastRare', 'blastOccasional', 'blastFrequent'].forEach(id => {
                let el = document.getElementById(id);
                if (el) el.checked = false;
            });
        }

        let pbPlasmaPercent = countTables['pbCountTable'].Plasma.percent; 
        if (pbPlasmaPercent > 0) {
            if (!hasWbc) {
                let el = document.getElementById('plasmaPresent');
                if (el && !el.checked) el.checked = true;
            } else {
                let absPlasma = (pbPlasmaPercent / 100) * wbcFloat;
                if (absPlasma >= pFreqLimit) {
                    let el = document.getElementById('plasmaFrequent');
                    if (el && !el.checked) el.checked = true;
                } else if (absPlasma >= pOccLimit) {
                    let el = document.getElementById('plasmaOccasional');
                    if (el && !el.checked) el.checked = true;
                } else {
                    let el = document.getElementById('plasmaRare');
                    if (el && !el.checked) el.checked = true;
                }
            }
        } else {
            ['plasmaPresent', 'plasmaRare', 'plasmaOccasional', 'plasmaFrequent'].forEach(id => {
                let el = document.getElementById(id);
                if (el) el.checked = false;
            });
        }

        let pbNrbcPercent = parseFloat(countTables['pbCountTable'].NRBCs.percent) || 0; 
        if (pbNrbcPercent > 0) {
            let presentEl = document.getElementById('nrbcPresent');
            if (presentEl && !presentEl.checked) presentEl.checked = true;
            
            if (hasWbc) {
                let absNrbcs = (pbNrbcPercent / 100) * wbcFloat;
                if (absNrbcs >= nFreqLimit) {
                    let el = document.getElementById('nrbcFrequent');
                    if (el && !el.checked) el.checked = true;
                } else if (absNrbcs >= nOccLimit) {
                    let el = document.getElementById('nrbcOccasional');
                    if (el && !el.checked) el.checked = true;
                } else {
                    let el = document.getElementById('nrbcRare');
                    if (el && !el.checked) el.checked = true;
                }
            }
        } else {
            ['nrbcPresent', 'nrbcRare', 'nrbcOccasional', 'nrbcFrequent'].forEach(id => {
                let el = document.getElementById(id);
                if (el) el.checked = false;
            });
        }
        
        let pbPromyeloPercent = parseFloat(countTables['pbCountTable'].Promyelo.percent) || 0;
        let pbMyeloPercent = parseFloat(countTables['pbCountTable'].Myelo.percent) || 0;
        let pbMetasPercent = parseFloat(countTables['pbCountTable'].Metas.percent) || 0;
        let immatureSum = pbPromyeloPercent + pbMyeloPercent + pbMetasPercent;

        if (immatureSum >= 1.0) {
            let neutSelects = document.querySelectorAll('#neutrophilSelectDiv .select');
            let emptySelect = null;
            let alreadySelected = false;
            
            neutSelects.forEach(sel => {
                if (sel.value.toLowerCase() === "shift to immaturity") {
                    alreadySelected = true;
                }
                if (sel.value === "") {
                    if (!emptySelect) emptySelect = sel; 
                }
            });
            
            if (!alreadySelected && emptySelect) {
                emptySelect.value = "Shift to immaturity"; 
                emptySelect.dispatchEvent(new Event('change', { bubbles: true })); 
            }
            
            if (immatureSum < 3.0) {
                let slightEl = document.getElementById('neutrophilSelectDivshiftToImmaturity0');
                if (slightEl) slightEl.checked = true;
            } else if (immatureSum < 10.0) {
                let slightEl = document.getElementById('neutrophilSelectDivshiftToImmaturity0');
                let mildEl = document.getElementById('neutrophilSelectDivshiftToImmaturity1'); // Assumes 1 is your middle modifier
                let markedEl = document.getElementById('neutrophilSelectDivshiftToImmaturity2');
                
                if (slightEl) slightEl.checked = false;
                if (mildEl) mildEl.checked = false;
                if (markedEl) markedEl.checked = false;
            } else if (immatureSum >= 10.0) {
                let markedEl = document.getElementById('neutrophilSelectDivshiftToImmaturity2');
                if (markedEl) markedEl.checked = true;
            }
        } else if (immatureSum === 0) {
            let neutSelects = document.querySelectorAll('#neutrophilSelectDiv .select');
            neutSelects.forEach(sel => {
                if (sel.value.toLowerCase() === "shift to immaturity") {
                    sel.value = "";
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
    }
    
    if (typeof fillReport === 'function') fillReport();
}

function cellCounter(x, y) {
    let totalCount = 0;
    let counterInput = document.getElementById(`${y}Counter`);
    let counterVal = counterInput ? counterInput.value : "";

    for (let i in x) {
        if (!x.hasOwnProperty(i)) continue;
        x[i]["count"] = (counterVal.match(new RegExp(String(x[i]["character"]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g")) || []).length;
        if (x[i]["cellType"] != 4) {
            totalCount += x[i]["count"];
        }
    }
    return totalCount;
}

function showAlert(actionType, customMessage = "") {
    let alertEl = document.getElementById('alert');
    let alertIcon = document.getElementById('alertIcon');
    let alertText = document.getElementById('alertText');
    if (!alertEl) return;

    alertEl.classList.remove('error');
    if (alertIcon) alertIcon.style.color = '#28a745';

    if (actionType === 'success') {
        if (alertIcon) alertIcon.className = 'fas fa-check-circle';
        if (alertText) alertText.textContent = customMessage;   
    } else if (actionType === 'error') {
        alertEl.classList.add('error');
        if (alertIcon) {
            alertIcon.className = 'fas fa-exclamation-circle';
            alertIcon.style.color = '#dc3545';
        }
        if (alertText) alertText.textContent = customMessage;
    }

    alertEl.classList.remove('show');
    void alertEl.offsetWidth;
    alertEl.classList.add('show');

    if (window.alertTimeout) clearTimeout(window.alertTimeout);
    window.alertTimeout = setTimeout(() => {
        alertEl.classList.remove('show');
    }, 3000);
}

document.getElementById('pbDCount')?.addEventListener('change', function() {
    let header = document.getElementById("pbTableCountHeader");
    if (header) header.innerHTML = "Peripheral Blood (" + this.value + " cells)";
    countCells("pb");
});

document.getElementById('aspDCount')?.addEventListener('change', function() {
    let header = document.getElementById("aspTableCountHeader");
    if (document.getElementById('tpCheck')?.checked) {
        if (header) header.innerHTML = "Touch Preparation (" + this.value + " cells)";
    } else {
        if (header) header.innerHTML = "Aspirate Smear (" + this.value + " cells)";
    }
    countCells("asp");
});

document.getElementById('tpCheck')?.addEventListener('click', function() {
    let dcount;
    let aspDCountEl = document.getElementById('aspDCount');
    if (aspDCountEl?.value === "") {
        dcount = aspDCountEl.getAttribute('placeholder');
    } else {
        dcount = aspDCountEl?.value;
    }
    
    let header = document.getElementById("aspTableCountHeader");
    if (this.checked) {
        if (header) header.innerHTML = "Touch Preparation (" + dcount + " cells)";
    } else {
        if (header) header.innerHTML = "Aspirate Smear (" + dcount + " cells)";
    }
    if (typeof fillReport === 'function') fillReport();
});

document.getElementById('blastCheck')?.addEventListener('change', function() {
    countCells("asp");
});

let radioStateBeforeClick = false;
let clickedRadio = null;

document.addEventListener('mousedown', function(e) {
    let target = e.target;
    clickedRadio = null; 

    if (target.matches('input[type="radio"]')) {
        clickedRadio = target;
    } 
    else if (target.closest('label')) {
        let label = target.closest('label');
        if (label.htmlFor) {
            clickedRadio = document.getElementById(label.htmlFor);
        } else {
            clickedRadio = label.querySelector('input[type="radio"]');
        }
    }

    if (clickedRadio) {
        radioStateBeforeClick = clickedRadio.checked;
    }
});

document.addEventListener('click', function(e) {
    if (e.target.matches('input[type="radio"]')) {
        let radio = e.target;
        if (radio === clickedRadio && radioStateBeforeClick === true) {
            radio.checked = false;
        }
        if (typeof fillReport === 'function') {
            setTimeout(fillReport, 0);
        }
        
        clickedRadio = null; 
    }
}, true);

document.querySelectorAll('.onPairedOn').forEach(function(el) {
    el.addEventListener('change', function() {
        let rbcUnrem = document.getElementById('rbcUnremarkable');
        if (rbcUnrem) rbcUnrem.checked = false;
        
        if (this.checked) {
            let pairedEl = document.getElementById(this.getAttribute('data-paired'));
            if (pairedEl) pairedEl.checked = true;
        }
    });
});

document.querySelectorAll('.offPairedOff').forEach(function(el) {
    el.addEventListener('change', function() {
        let rbcUnrem = document.getElementById('rbcUnremarkable');
        if (rbcUnrem) rbcUnrem.checked = false;
        
        if (!this.checked) {
            document.querySelectorAll(`.${this.getAttribute('data-paired')}`).forEach(function(pairedEl) {
                pairedEl.checked = false;
            });
        }
    });
});

document.querySelectorAll('.onPairedOff').forEach(function(el) {
    el.addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll(`.${this.getAttribute('data-paired')}`).forEach(function(pairedEl) {
                pairedEl.checked = false;
                document.querySelectorAll(`.${pairedEl.getAttribute('data-paired')}`).forEach(function(nestedPairedEl) {
                    nestedPairedEl.checked = false;
                });
            });
        }
    });
});

document.querySelectorAll('input[type="checkbox"]').forEach(function(el) {
    el.addEventListener('change', function() {
        if (this.parentNode) {
            let siblings = Array.from(this.parentNode.children).filter(child => child !== this && child.type === 'checkbox');
            siblings.forEach(sibling => sibling.checked = false);
        }
    });
});

document.querySelectorAll('.form').forEach(function(el) {
    el.addEventListener('change', function() {
        if (typeof fillReport === 'function') fillReport();
    });
});

document.querySelectorAll('.cellularityDiv').forEach(function(el) {
    el.addEventListener('keyup', function() {
        let showID = "";
        Array.from(this.children).forEach(function(child) {
            if (child.value !== "") {
                showID = child.parentNode.id;
            }
        });  
        document.querySelectorAll('.cellularityDiv').forEach(function(div) {
            if (showID !== "" && div.id !== showID) {
                div.style.display = 'none';
            } else if (showID === "") {
                div.style.display = 'block';
            }
        });
    });
});

document.querySelectorAll('.cellularity').forEach(function(el) {
    el.addEventListener('keyup', function() {
        if (typeof fillCellularity === 'function') fillCellularity();
    });
});

document.querySelectorAll('.copyButton').forEach(function(el) {
    el.addEventListener('click', async function() {
        const targetId = this.className.split(' ')[1];
        const originalElement = document.getElementById(targetId);
        
        let isVisible = false;
        if (originalElement) {
            const style = window.getComputedStyle(originalElement);
            isVisible = (originalElement.offsetParent !== null && style.display !== 'none');
        }

        if (isVisible) {
            try {
                const clone = originalElement.cloneNode(true);

                // 1. Remove ANY hidden elements (including empty table rows) from the clone
                const originalEls = originalElement.querySelectorAll('*');
                const clonedEls = clone.querySelectorAll('*');
                
                for (let i = 0; i < originalEls.length; i++) {
                    const style = window.getComputedStyle(originalEls[i]);
                    if (style.display === 'none') {
                        // If it's hidden in the browser, permanently remove it from the clone
                        if (clonedEls[i]) clonedEls[i].remove();
                    }
                }

                // 2. Remove entire tables if no cells were counted
                const pbCountEl = document.getElementById('pbCCount');
                const aspCountEl = document.getElementById('aspCCount');
                const pbCount = pbCountEl ? parseInt(pbCountEl.value) || 0 : 0;
                const aspCount = aspCountEl ? parseInt(aspCountEl.value) || 0 : 0;

                if (pbCount === 0) {
                    const pbTable = clone.querySelector('#pbTableDiv'); // Replace with your actual ID
                    if (pbTable) pbTable.remove();
                }

                if (aspCount === 0) {
                    const aspTable = clone.querySelector('#aspTableDiv'); // Replace with your actual ID
                    if (aspTable) aspTable.remove();
                }

                const htmlBlob = new Blob([clone.outerHTML], { type: 'text/html' });
                const textBlob = new Blob([clone.innerText], { type: 'text/plain' });

                const clipboardItem = new ClipboardItem({
                    'text/html': htmlBlob,
                    'text/plain': textBlob
                });

                await navigator.clipboard.write([clipboardItem]);
                
                if (typeof showToast === 'function') { showToast('copy'); } 
                else if (typeof showAlert === 'function') { showAlert('success', 'Text copied'); }
            } catch (err) {
                console.error('Failed to copy text: ', err);
                if (typeof showAlert === 'function') showAlert('error', 'Failed to copy formatting');
            }
        } else {
            if (typeof showAlert === 'function') showAlert('error', 'No text to copy');
        }
    });
});

document.querySelectorAll('.toggleDiv').forEach(function(el) {
    el.addEventListener('click', function() {
        let targetId = this.getAttribute('data-id');
        let targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.style.display = (targetEl.style.display === 'none' || targetEl.style.display === '') ? 'block' : 'none';
        }
        if (typeof fillReport === 'function') fillReport();
    });
});

document.querySelectorAll('.saveButton').forEach(function(btn) {
    btn.addEventListener('click', function() {
        let saveFileBM = {};
        let aspToggle = false;
        let pbToggle = false;
        let errorDescriptor = "";
        let checkedObject = {};
        let inputObject = {};

        const hasError = (el) => {
            let isRed = el.style.backgroundColor.replace(/\s/g, '') === "rgb(255,95,95)";
            let isEmpty = el.value.trim() === "";
            return isRed || isEmpty;
        };

        document.querySelectorAll('.counterTemplate[data-type="pb"]').forEach(function(el) {
            if (hasError(el)) {
                pbToggle = true;
                errorDescriptor = "peripheral blood layout";
            }
        });

        document.querySelectorAll('.counterTemplate[data-type="asp"]').forEach(function(el) {
            if (hasError(el)) {
                aspToggle = true;
                if (pbToggle) {
                    errorDescriptor = "peripheral blood and aspirate layout";
                } else {
                    errorDescriptor = "aspirate layout";
                }
            }
        });

        document.querySelectorAll('.diffSetting').forEach(function(el) {
            checkedObject[el.id] = el.checked;
        });

        document.querySelectorAll('.saveInput').forEach(function(el) {
            inputObject[el.id] = el.value;
        });

        if (aspToggle || pbToggle) {
            showAlert('error', `Incompatible ${errorDescriptor} settings`);
        } else {
            for (let i in countTables) {
                if (!countTables.hasOwnProperty(i)) continue;
                for (let j in countTables[i]) {
                    if (!countTables[i].hasOwnProperty(j)) continue;
                    let toggle = false;
                    
                    document.querySelectorAll('.counterTemplate').forEach(function(el) {
                        if (String(i) === (el.getAttribute("data-type") + "CountTable") && j === el.value) {
                            countTables[i][j]["layoutGridID"] = el.id;
                            countTables[i][j]["counterGridID"] = "#" + el.getAttribute("data-counter");
                            countTables[i][j]["character"] = el.getAttribute("data-character");
                            toggle = true;
                        }
                    });

                    if (!toggle) {
                        countTables[i][j]["layoutGridID"] = "";
                        countTables[i][j]["counterGridID"] = "";
                        countTables[i][j]["character"] = -1;
                    }
                }
            }
            if (typeof fillCounterGrids === 'function') fillCounterGrids();
            countCells("pb");
            countCells("asp");
            
            saveFileBM.countTableBM = countTables;
            saveFileBM.checkedObjectBM = checkedObject;
            saveFileBM.inputObjectBM = inputObject;
            localStorage.setItem("saveFileBM", JSON.stringify(saveFileBM));
            
            showAlert('success', 'Settings saved successfully');
        }    
    });
});

document.addEventListener('click', function(e) {
    if (e.target.closest('.cbcTable')) { 
        cbcTableVisible = !cbcTableVisible; 
        if (typeof fillReport === 'function') fillReport(); 
    }
});

document.addEventListener('change', function(e) {
    
    // 1. If "Unremarkable" is checked, properly wipe the dropdowns & descriptors
    if (e.target.matches('.unremarkableMorphology')) { // <-- CHANGED CLASS HERE
        if (e.target.checked) {
            let targetDivId = e.target.getAttribute('data-selectdiv');
            let selectDiv = document.getElementById(targetDivId);
            
            if (selectDiv) {
                let firstSelect = selectDiv.querySelector('.select');
                
                if (firstSelect) {
                    let selectType = firstSelect.getAttribute('data-selectType');
                    let parentID = firstSelect.getAttribute('data-parentID');
                    
                    selectDiv.querySelectorAll('.select').forEach(sel => sel.value = "");
                    
                    if (typeof fillSelectHTML === 'function') {
                        fillSelectHTML(selectType, parentID);
                    }
                }
            }
        }
        fillReport();
    }

 // 2. If the user selects a dropdown item, uncheck "Unremarkable"
    if (e.target.matches('.select')) {
        let parentDiv = e.target.closest('.selectDiv');
        
        if (parentDiv && e.target.value !== "") {
            let checkbox = document.querySelector(`.unremarkableMorphology[data-selectdiv="${parentDiv.id}"]`); 
            
            if (checkbox && checkbox.checked) {
                checkbox.checked = false; 
                fillReport(); 
            }
        }
    }
}, true);

document.getElementById('diagnosisTab').addEventListener('click', function() {
    let currentlySelectedText = null;
    let checkedRadio = document.querySelector('input[name="diagnosisCommentSelection"]:checked');
    if (checkedRadio) {
        currentlySelectedText = checkedRadio.value;
    }

    function evaluateCondition(rule) {
        let conditionMet = false;
        let op = rule.operator || "==";

        switch (rule.ruleType) {
            case 'inputChecked':
                let el = document.getElementById(rule.targetID);
                if (el && (el.type === 'radio' || el.type === 'checkbox')) {
                    if (op === "==" && el.checked === rule.targetValue) {
                        conditionMet = true;
                    } else if (op === "!=" && el.checked !== rule.targetValue) {
                        conditionMet = true;
                    }
                }
                break;

            case 'diffCount':
                if (typeof countTables !== 'undefined' && 
                    countTables[rule.targetID] && 
                    countTables[rule.targetID][rule.targetValue]) {
                    
                    let currentPercent = parseFloat(countTables[rule.targetID][rule.targetValue].percent) || 0;
                    let targetPercent = parseFloat(rule.expectedValue);

                    switch (op) {
                        case '>':  conditionMet = (currentPercent > targetPercent); break;
                        case '>=': conditionMet = (currentPercent >= targetPercent); break;
                        case '<':  conditionMet = (currentPercent < targetPercent); break;
                        case '<=': conditionMet = (currentPercent <= targetPercent); break;
                        case '==': conditionMet = (currentPercent === targetPercent); break;
                    }
                }
                break;

            case 'selectGroup':
                let parentEl = document.getElementById(rule.targetID);
                if (parentEl) {
                    let selects = parentEl.querySelectorAll('select');
                    for (let i = 0; i < selects.length; i++) {
                        let selectValue = selects[i].value.trim().toLowerCase();
                        let targetValue = rule.targetValue.trim().toLowerCase();
                        
                        if (op === "==" && selectValue === targetValue) {
                            conditionMet = true;
                            break; 
                        } else if (op === "!=" && selectValue !== targetValue) {
                            conditionMet = true; 
                            break; 
                        }
                    }
                }
                break;
            
            case 'cbcData':
                if (typeof cbcObject !== 'undefined' && cbcObject[rule.targetID]) {
                    let currentValue = parseFloat(cbcObject[rule.targetID].value);
                    let targetValue = parseFloat(rule.targetValue);

                    if (!isNaN(currentValue)) {
                        switch (op) {
                            case '>':  conditionMet = (currentValue > targetValue); break;
                            case '>=': conditionMet = (currentValue >= targetValue); break;
                            case '<':  conditionMet = (currentValue < targetValue); break;
                            case '<=': conditionMet = (currentValue <= targetValue); break;
                            case '==': conditionMet = (currentValue === targetValue); break;
                            case '!=': conditionMet = (currentValue !== targetValue); break;
                        }
                    }
                }
                break;
            
            case 'demographics':
                let currentDemoValue = (rule.targetID === "patientAge") ? patientAge : (rule.targetID === "legalSex" ? legalSex : null);

                if (currentDemoValue !== null && currentDemoValue !== -1 && currentDemoValue !== "") {
                    
                    if (rule.targetID === "patientAge") {
                        let ageNum = parseFloat(currentDemoValue);
                        let targetAge = parseFloat(rule.targetValue);
                        
                        switch (op) {
                            case '>':  conditionMet = (ageNum > targetAge); break;
                            case '>=': conditionMet = (ageNum >= targetAge); break;
                            case '<':  conditionMet = (ageNum < targetAge); break;
                            case '<=': conditionMet = (ageNum <= targetAge); break;
                            case '==': conditionMet = (ageNum === targetAge); break;
                            case '!=': conditionMet = (ageNum !== targetAge); break;
                        }
                    } 
                    else if (rule.targetID === "legalSex") {
                        let sexStr = String(currentDemoValue).trim().toLowerCase();
                        let expectedSex = String(rule.targetValue).trim().toLowerCase();
                        
                        if (op === "==" && sexStr === expectedSex) {
                            conditionMet = true;
                        } else if (op === "!=" && sexStr !== expectedSex) {
                            conditionMet = true;
                        }
                    }
                }
                break;

            case 'selectWithDescriptor':
                let allPageSelects = document.querySelectorAll('select');
                
                for (let i = 0; i < allPageSelects.length; i++) {
                    let selectEl = allPageSelects[i];
                    let isScopedMatch = false;

                    let currentEl = selectEl;
                    while (currentEl && currentEl !== document) {
                        if (currentEl.id && typeof currentEl.id === 'string' && currentEl.id.includes(rule.targetID)) {
                            isScopedMatch = true;
                            break;
                        }
                        currentEl = currentEl.parentNode;
                    }

                    if (isScopedMatch) {
                        let selectValue = selectEl.value.trim().toLowerCase();
                        let targetValue = rule.targetValue.trim().toLowerCase();
                        
                        if (selectValue === targetValue || selectValue.includes(targetValue)) {
                            let rowContainer = selectEl.closest('.flex') || selectEl.parentNode.parentNode;
                            if (rowContainer) {
                                let checkedInputs = rowContainer.querySelectorAll('input:checked');
                                for (let j = 0; j < checkedInputs.length; j++) {
                                    let descValue = checkedInputs[j].value.trim().toLowerCase();
                                    let expectedDesc = rule.descriptorValue.trim().toLowerCase();
                                    
                                    if (op === "==" && (descValue === expectedDesc || descValue.includes(expectedDesc))) {
                                        conditionMet = true;
                                        break;
                                    } else if (op === "!=" && !descValue.includes(expectedDesc)) {
                                        conditionMet = true;
                                        break;
                                    }
                                }

                                if (!conditionMet) {
                                    let siblingSelects = rowContainer.querySelectorAll('select');
                                    for (let j = 0; j < siblingSelects.length; j++) {
                                        if (siblingSelects[j] !== selectEl) {
                                            let descValue = siblingSelects[j].value.trim().toLowerCase();
                                            let expectedDesc = rule.descriptorValue.trim().toLowerCase();
                                            
                                            if (op === "==" && (descValue === expectedDesc || descValue.includes(expectedDesc))) {
                                                conditionMet = true;
                                                break;
                                            } else if (op === "!=" && !descValue.includes(expectedDesc)) {
                                                conditionMet = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (conditionMet) break;
                }
                break;
        }
        return conditionMet;
    }

    let scoredComments = [];

    comments.forEach(comment => {
        let score = 0;     
        if (comment.rules) {
            comment.rules.forEach(rule => {
                if (rule.logic && rule.conditions) {
                    let parsedLogic = rule.logic;
                    for (const [key, conditionObj] of Object.entries(rule.conditions)) {
                        let result = evaluateCondition(conditionObj);
                        let regex = new RegExp(`\\b${key}\\b`, 'g');
                        parsedLogic = parsedLogic.replace(regex, result);
                    }
                    parsedLogic = parsedLogic.replace(/\bAND\b/gi, '&&').replace(/\bOR\b/gi, '||');
                    try {
                        let finalResult = new Function('return ' + parsedLogic)();
                        if (finalResult) {
                            score += (rule.points || 0);
                        }
                    } catch (e) {
                        console.error(`Logic parsing error in comment ID ${comment.id}:`, e);
                    }
                } 
                else {
                    if (evaluateCondition(rule)) {
                        score += (rule.points || 0);
                    }
                }
            });
        }

        scoredComments.push({ text: comment.text, score: score, id: comment.id });
    });
    scoredComments.sort((a, b) => b.score - a.score);
    let suggestionsContainer = document.getElementById('diagnosisSuggestionsContainer');
    suggestionsContainer.innerHTML = ''; 

    scoredComments.forEach((comment, index) => {
        let wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'flex-start';
        wrapper.style.marginBottom = '8px';

        let radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'diagnosisCommentSelection';
        radioBtn.id = 'suggestedComment_' + index;
        radioBtn.value = comment.text;
        
        radioBtn.style.flexShrink = '0';
        radioBtn.style.marginTop = '4px'; 
        
        if (comment.text === currentlySelectedText) {
            radioBtn.checked = true;
        }
        
        let label = document.createElement('label');
        label.htmlFor = radioBtn.id;
        label.textContent = `[${comment.score} pts] ${comment.text}`;
        label.style.marginLeft = '8px';
        label.style.cursor = 'pointer';

        wrapper.appendChild(radioBtn);
        wrapper.appendChild(label);
        suggestionsContainer.appendChild(wrapper);
    });
});

document.getElementById('diagnosisSuggestionsContainer').addEventListener('change', function(e) {
    if (e.target.name === 'diagnosisCommentSelection') {
        fillReport();
    }
});

});
