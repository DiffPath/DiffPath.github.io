function listText(id) {
    const descriptorMap = new Map();
    const parentElements = document.querySelectorAll(`[data-parentID="${id}"]`);
    const allPotentialChildren = Array.from(document.querySelectorAll('[data-parentID]'));

    let lastSeenDescriptor = "";
    let lastSeenDescriptorGroup = "";

    parentElements.forEach(function(parentEl) {
        if (parentEl.value !== "") {
            let selectedItem = descriptorList[parentEl.value];
            let selectedValue = selectedItem["templateText"];
            let prefix = selectedItem["prefix"] || ""; 
            
            let currentDescriptor = "";
            const childElements = allPotentialChildren.filter(el => el.getAttribute('data-parentID') === parentEl.id);
            let currentDescriptorGroup = childElements.map(el => el.value).sort().join('|');
            
            childElements.forEach(function(childEl) {
                if (childEl.checked) {
                    currentDescriptor = childEl.value;
                }
            });

            if (currentDescriptor !== "") {
                lastSeenDescriptor = currentDescriptor;
                lastSeenDescriptorGroup = currentDescriptorGroup;
            } else {
                if (currentDescriptorGroup === lastSeenDescriptorGroup) {
                    currentDescriptor = lastSeenDescriptor;
                } else {
                    lastSeenDescriptor = "";
                    lastSeenDescriptorGroup = currentDescriptorGroup;
                }
            }

            let mapKey = currentDescriptor;
            let mapValue = selectedValue;

            if (prefix !== "") {
                let trimmedPrefix = prefix.trim().toLowerCase();
                let nextWord = currentDescriptor !== "" ? currentDescriptor : selectedValue;
                
                if (trimmedPrefix === "a" || trimmedPrefix === "an") {
                    let firstLetter = nextWord.trim().charAt(0).toLowerCase();
                    if (['a', 'e', 'i', 'o', 'u'].includes(firstLetter)) {
                        prefix = "an ";
                    } else {
                        prefix = "a ";
                    }
                }

                if (currentDescriptor !== "") {
                    mapValue = `${prefix}${currentDescriptor} ${selectedValue}`;
                } else {
                    mapValue = `${prefix}${selectedValue}`;
                }

                mapKey = `prefixed_${currentDescriptor}`; 
            }

            if (!descriptorMap.has(mapKey)) {
                descriptorMap.set(mapKey, []);
            }
            descriptorMap.get(mapKey).push(mapValue);
        }
    });

    if (descriptorMap.size === 0) return "";

    let phrases = [];
    let hasComplexSet = false; 
    
    descriptorMap.forEach((items, descriptor) => {
        if (items.length >= 2) {
            hasComplexSet = true;
        }

        let combinedItems = addCommas(items);
        
        if (descriptor.startsWith("prefixed_")) {
            phrases.push(combinedItems);
        } else if (descriptor !== "") {
            phrases.push(`${descriptor} ${combinedItems}`);
        } else {
            phrases.push(combinedItems);
        }
    });

    if (phrases.length === 1) {
        return phrases[0];
    }

    if (hasComplexSet) {
        if (phrases.length === 2) {
            return `${phrases[0]} with ${phrases[1]}`;
        } else {
            let semicolonString = "";
            for (let i = 0; i < phrases.length; i++) {
                if (i < phrases.length - 1) {
                    semicolonString += `${phrases[i]}; `;
                } else {
                    semicolonString += `and ${phrases[i]}`;
                }
            }
            return semicolonString;
        }
    } else {
        return addCommas(phrases);
    }
}

function addCommas(array) {
    if (!array || array.length === 0) return "";   
    if (array.length === 1) return array[0];
    if (array.length === 2) return `${array[0]} and ${array[1]}`;
    let commaString = "";
    for (let i = 0; i < array.length; i++) {
        if (i < array.length - 1) {
            commaString += `${array[i]}, `;
        } else {
            commaString += `and ${array[i]}`;
        }
    }
    return commaString;
}

function fillInputs() {
    for (let i in cbcObject) {
        if (!cbcObject.hasOwnProperty(i)) continue;

        let valString = cbcObject[i]["value"];
        if (!valString) continue;

        let valFloat = parseFloat(valString.split(" ")[0]);

        let isAbsLymph = (i.toLowerCase() === 'absolute lymphocytes' || i.toLowerCase() === 'absolute lymphs');
        
        if (isAbsLymph && valFloat >= 0.2 && valFloat <= 4.0) {
            continue; 
        }

        let mildEl = document.getElementById(cbcObject[i]["mild"]);
        let markedEl = document.getElementById(cbcObject[i]["marked"]);

        if (valString.indexOf('High') !== -1) {
            let highEl = document.getElementById(cbcObject[i]["high"]);
            if (highEl) highEl.checked = true;
                        
            let mildSetting = parseFloat(document.getElementById(cbcObject[i]["mildHighSetting"])?.value);
            let markedSetting = parseFloat(document.getElementById(cbcObject[i]["markedHighSetting"])?.value);

            if (valFloat < mildSetting) {
                if (mildEl) mildEl.checked = true;
                if (markedEl) markedEl.checked = false;
            } else if (valFloat > markedSetting) {
                if (mildEl) mildEl.checked = false;
                if (markedEl) markedEl.checked = true;
            } else {
                if (mildEl) mildEl.checked = false;
                if (markedEl) markedEl.checked = false;
            }
        } else if (valString.indexOf('Low') !== -1) {
            let lowEl = document.getElementById(cbcObject[i]["low"]);
            if (lowEl) lowEl.checked = true;
            
            let mildSetting = parseFloat(document.getElementById(cbcObject[i]["mildLowSetting"])?.value);
            let markedSetting = parseFloat(document.getElementById(cbcObject[i]["markedLowSetting"])?.value);

            if (valFloat > mildSetting) {
                if (mildEl) mildEl.checked = true;
                if (markedEl) markedEl.checked = false;
            } else if (valFloat < markedSetting) {
                if (mildEl) mildEl.checked = false;
                if (markedEl) markedEl.checked = true;
            } else {
                if (mildEl) mildEl.checked = false;
                if (markedEl) markedEl.checked = false;
            }
        } else if (valString !== "") {
            let normalEl = document.getElementById(cbcObject[i]["normal"]);
            if (normalEl) normalEl.checked = true;
        }

        if (valString.indexOf('Panic') !== -1) {
            if (markedEl) markedEl.checked = true;
        }
    }

    let absNrbcKey = Object.keys(cbcObject).find(k => k.toLowerCase() === 'absolute nrbcs' || k.toLowerCase() === 'absolute nrbc');
    let nrbcCheckbox = document.getElementById('nrbcPresent');

    if (cbcObject["NRBC's"] && absNrbcKey && cbcObject[absNrbcKey]) {
        let nrbcValString = cbcObject["NRBC's"]["value"];
        let absNrbcValString = cbcObject[absNrbcKey]["value"];
        
        if (nrbcValString && absNrbcValString) {
            let nrbcFloat = parseFloat(nrbcValString.split(" ")[0]);
            let absNrbcFloat = parseFloat(absNrbcValString.split(" ")[0]);
            
            if (nrbcFloat > 0 || absNrbcFloat > 0) {
                if (nrbcCheckbox) nrbcCheckbox.checked = true;

                let freqLimit = parseFloat(document.getElementById('nrbcFrequentLimit')?.value);
                let occLimit = parseFloat(document.getElementById('nrbcOccasionalLimit')?.value);

                if (absNrbcFloat > freqLimit) {
                    let freqEl = document.getElementById('nrbcFrequent');
                    if (freqEl) freqEl.checked = true;
                } else if (absNrbcFloat > occLimit) {
                    let occEl = document.getElementById('nrbcOccasional');
                    if (occEl) occEl.checked = true;
                } else {
                    let rareEl = document.getElementById('nrbcRare');
                    if (rareEl) rareEl.checked = true;
                }
            }
        }
    } else if (absNrbcKey && cbcObject[absNrbcKey]) {
        let absNrbcValString = cbcObject[absNrbcKey]["value"];
        if (absNrbcValString && parseFloat(absNrbcValString.split(" ")[0]) > 0) {
            if (nrbcCheckbox) nrbcCheckbox.checked = true;
        }
    }

    let keysToCheck = ['immature granulocytes', 'metamyelocytes', 'myelocytes', 'promyelocytes'];
    let shiftToImmaturityTriggered = false;

    for (let i = 0; i < keysToCheck.length; i++) {
        let actualKey = Object.keys(cbcObject).find(k => k.toLowerCase() === keysToCheck[i]);
        if (actualKey && cbcObject[actualKey]) {
            let valString = cbcObject[actualKey]["value"];
            if (valString) {
                let valFloat = parseFloat(valString.split(" ")[0]);
                if (valFloat > 1.0) { // Checks if the value is > 1%
                    shiftToImmaturityTriggered = true;
                    break; // Stop checking once we find one that exceeds 1%
                }
            }
        }
    }

    if (shiftToImmaturityTriggered) {
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
    }

    if (typeof fillReport === 'function') {
        fillReport();
    }
}

function fillReport() {
    const specText = fillSpecimen();
    let commentText = fillComment();
    let clinicalText = fillClinical();
    const microscopicText = fillMicroscopic();

    let toggleClinical = document.getElementById('toggleClinical');
    let isClinicalHidden = false;

    if (commentText != "") {
        commentText += "<br><br>";
    }

    if (toggleClinical) {
        const style = window.getComputedStyle(toggleClinical);
        isClinicalHidden = (toggleClinical.offsetParent === null || style.display === 'none');
    }

    if (clinicalText != "" && isClinicalHidden) {
        clinicalText += "<br>";
    }

    let specDiv = document.getElementById('specDiv');
    let commentDiv = document.getElementById('commentDiv');
    let clinicalDiv = document.getElementById('clinicalDiv');
    let microscopicDiv = document.getElementById('microscopicDiv');
    let pbCCount = document.getElementById('pbCCount').value;
    let aspCCount = document.getElementById('aspCCount').value;

    let rpFinalNode;
    if (typeof rightPanelFinal === 'string') {
        rpFinalNode = document.querySelector(rightPanelFinal) || document.getElementById(rightPanelFinal.replace('#', ''));
    } else if (typeof rightPanelFinal !== 'undefined') {
        rpFinalNode = rightPanelFinal;
    }
    
    if (!rpFinalNode) {
        rpFinalNode = document.getElementById('rightPanelFinal');
    }

    if (specText != "" || clinicalText != "" || commentText != "" || microscopicText != "" || pbCCount != "" || aspCCount != "") {
        if (specDiv) specDiv.innerHTML = specText;
        if (clinicalDiv) clinicalDiv.innerHTML = clinicalText;
        if (microscopicDiv) microscopicDiv.innerHTML = microscopicText;
        if (commentDiv) commentDiv.innerHTML = commentText;

        if (rpFinalNode) rpFinalNode.style.display = 'block';
    } else {
        if (rpFinalNode) rpFinalNode.style.display = 'none';
    }
}

function fillSpecimen() {
    let specText = '';
    let finalText = typeof fillFinal === 'function' ? fillFinal() : "***";
    let specArray = [];
    let htmlOutput = '';
    
    if (document.getElementById('specPB')?.checked) {
        specArray.push("peripheral blood smear");
    }
    if (document.getElementById('specAsp')?.checked) {
        specArray.push("bone marrow aspirate");
    }
    if (document.getElementById('specTP')?.checked) {
        specArray.push("touch preparations");
    }
    if (document.getElementById('specPC')?.checked) {
        specArray.push("particle clot");
    }
    
    if (document.getElementById('specCB')?.checked) {
        if (document.getElementById('latLeft')?.checked) {
            specArray.push("left posterior iliac crest bone marrow core biopsy");
        } else if (document.getElementById('latRight')?.checked) {
            specArray.push("right posterior iliac crest bone marrow core biopsy");
        } else if (document.getElementById('latBilateral')?.checked) {
            specArray.push("bilateral posterior iliac crest bone marrow core biopsies");
        } else {
            specArray.push("posterior iliac crest bone marrow core biopsy");
        }
    }

    specText = addCommas(specArray);
    let specContainer = document.getElementById('specContainer');

    if (specText !== '') {
        htmlOutput = `
        <p style="margin-top:0in; margin-right:0in; margin-bottom:8.0pt; margin-left:0in; line-height:115%; font-size:10.0pt; font-family:'Aptos',sans-serif;">
            <b>A, B: ${specText.charAt(0).toUpperCase()}${specText.slice(1)}:</b>
        </p>`;
        if (finalText && finalText.trim() !== '') {
            htmlOutput += `
        <ul style="margin-top:0in; margin-bottom:8.0pt; padding-left: 0.5in; list-style-type: disc; font-size:10.0pt; font-family:'Aptos',sans-serif;">
            <li style="margin-bottom:0in; line-height:115%;">${finalText}</li>
        </ul>`;
        }

        specContainer.style.display = 'block'; 
    } else {
        specContainer.style.display = 'none'; 
    }
    
    return htmlOutput;
}

function fillFinal() {
    let finalDx = '';
    
    document.querySelectorAll('.cellQual').forEach(function(el) {
        if (el.checked) {
            finalDx += `<b>${el.value.charAt(0).toUpperCase()+el.value.slice(1)} bone marrow`;
            
            let coreCellularity = document.getElementById('coreCellularity')?.value;
            let coreLow = document.getElementById('coreCellularityRangeLow')?.value;
            let coreHigh = document.getElementById('coreCellularityRangeHigh')?.value;

            if (coreCellularity && coreCellularity !== '') {
                finalDx += ` (~${coreCellularity}% cellular)`;
            } else if (coreLow && coreLow !== '' && coreHigh && coreHigh !== '') {
                finalDx += ` (${coreLow}-${coreHigh}% cellular)`;
            }
            
            finalDx += ' with trilineage hematopoiesis';
            
            if (descriptorList && descriptorList.CD34) {
                let posVal = descriptorList.CD34.positive;
                let negVal = descriptorList.CD34.negative;

                if (posVal !== '' || negVal !== '') {
                    let pos = parseInt(posVal) || 0;
                    let neg = parseInt(negVal) || 0;
                    let total = pos + neg;

                    if (total > 0) {
                        let blastPercentage = parseInt(100 * pos / total);
                        
                        if (blastPercentage === 0) {
                            finalDx += ` and no increase in blasts (<1%)`;
                        } else if (blastPercentage < 5) {
                            finalDx += ` and no increase in blasts (~${blastPercentage}%)`;
                        } else if (blastPercentage < 20) {
                            finalDx += ` and increased blasts (~${blastPercentage}%)`;
                        }
                    }
                }
            }
            finalDx += '.</b>';
        }
    });

    return finalDx;
}

function fillComment() {
    const selectedComment = document.querySelector('input[name="diagnosisCommentSelection"]:checked');
    let commentContainer = document.getElementById('commentContainer');

    if (selectedComment) {
        commentContainer.style.display = 'block';
    } else {
        commentContainer.style.display = 'none';
    }

    return selectedComment ? selectedComment.value : "";
}

function fillClinical() {
    let clinicalText = '';
    
    let tbodyStyle = cbcTableVisible ? '' : 'display: none;';

    let mainThStyle = "border: 1px solid black; padding: 2px 6px; background-color: #e0e0e0; text-align: center;";
    let subThStyle = "border: 1px solid black; padding: 2px 6px; background-color: #e0e0e0; text-align: left;";
    let tdStyle = "border: 1px solid black; padding: 2px 6px; text-align: left;";
    
    let clinicalTable = `<table class="templateTable cbcTable" style="width:440px; font-size:10pt; border-collapse: collapse; margin-top: 10px; cursor: pointer; user-select: none;">
        <thead>
            <tr>
                <th colspan="3" style="${mainThStyle}" title="Click to hide/show">CBC Data (Click to hide/show)</th>
            </tr>
        </thead>
        <tbody style="${tbodyStyle}">
            <tr>
                <th style="${subThStyle} width:50%;">Component</th>
                <th style="${subThStyle} width:17%;">Result</th>
                <th style="${subThStyle} width:33%;">Units</th>
            </tr>`;
    
    let toggle = false;

    let pbCBC = document.getElementById('pbCBC');
    let pbCBCVal = pbCBC ? pbCBC.value : "";

    if (patientAge !== -1 && pbCBCVal !== "") {
        let toggleClinical = document.getElementById('toggleClinical');
        let isHidden = false;
        if (toggleClinical) {
            isHidden = (window.getComputedStyle(toggleClinical).display === 'none');
        }

        if (isHidden) {
            clinicalText += "<b>Clinical Information</b><div id='toggleClinical' style='display: none;'>The patient is";
        } else {
            clinicalText += "<b>Clinical Information</b><div id='toggleClinical'>The patient is";
        }
        
        if (patientAge === 8 || patientAge === 11 || patientAge === 18 || (patientAge >= 80 && patientAge < 90)) {
            clinicalText += " an";
        } else {
            clinicalText += " a";
        }
        
        clinicalText += ` ${patientAge}-year-old`;
        
        if (legalSex === "F") {
            clinicalText += ' female';
        } else if (legalSex === "M") {
            clinicalText += ' male';
        }

        let isHgbLow = document.getElementById('hgbLow')?.checked;
        let isPltLow = document.getElementById('pltLow')?.checked;
        let isWbcLow = cbcObject["WBC"] && cbcObject["WBC"]["value"].indexOf('Low') !== -1;

        if (isHgbLow && isPltLow && isWbcLow) {
            clinicalText += ' presenting with pancytopenia.';
        } else if (isHgbLow) {
            clinicalText += ' presenting with anemia';
            if (isPltLow) {
                clinicalText += ' and thrombocytopenia.';
            } else {
                clinicalText += '.';
            }
        } else if (isPltLow) {
            clinicalText += ' presenting with thrombocytopenia.';
        }
        
        clinicalText += '<br><br>';
        
        for (let i in cbcObject) {
            if (!cbcObject.hasOwnProperty(i)) continue;

            if (cbcObject[i]["value"] !== "") {
                let bg = "";
                if (cbcObject[i]["value"].indexOf("Low") !== -1) {
                    bg = "background-color: lightblue;";
                } else if (cbcObject[i]["value"].indexOf("High") !== -1) {
                    bg = "background-color: lightcoral;";
                }

                clinicalTable += `<tr style="${bg}"><td style="${tdStyle} width:50%">${i}</td><td style="${tdStyle} width:17%">${cbcObject[i]["value"].split(" ")[0]}</td><td style="${tdStyle} width:33%">${cbcObject[i]["unit"]}</td></tr>`;
                toggle = true;
            }
        }
        
        if (toggle) {
            clinicalTable += `</tbody></table>`;
            clinicalText += `<div>${clinicalTable}</div>`;
        }
        clinicalText += '</div><br>';
    }

    let clinicalContainer = document.getElementById('clinicalContainer');
    if (clinicalContainer) {
        if (clinicalText !== '') {
            clinicalContainer.style.display = 'block';
        } else {
            clinicalContainer.style.display = 'none';
        }
    }

    return clinicalText;
}

function fillMicroscopic() {
    const pb = fillPB();
    const asp = fillAsp();
    const touch = fillTouch();
    const core = fillCore();
    const clot = fillClot();
    const specialStains = fillSpecialStains();
    const immunostains = fillImmunostains();
    let microscopicText = "";

    if (pb != "") {
        microscopicText += "<b>Peripheral Blood Smear</b><br>" + pb;
    }

    if (microscopicText != "") {
        if (asp != "") {
            microscopicText += "<br><br><b>Aspirate Smear";
            if (touch != "") {
                microscopicText += "/Touch Preparation</b><br>" + asp + "<br><br>" + touch;
            } else {
                microscopicText += "</b><br>" + asp;
            }
        } else if (touch != "") {
            microscopicText += "<br><br><b>Touch Preparation</b><br>" + touch;
        }
    } else {
        if (asp != "") {
            microscopicText += "<b>Aspirate Smear";
            if (touch != "") {
                microscopicText += "/Touch Preparation</b><br>" + asp + "<br><br>" + touch;
            } else {
                microscopicText += "</b><br>" + asp;
            }
        } else if (touch != "") {
            microscopicText += "<b>Touch Preparation</b><br>" + touch;
        }
    }

    if (microscopicText != "") {
        if (core != "") {
            microscopicText += "<br><br><b>Core Biopsy";
            if (clot != "") {
                microscopicText += "/Particle Clot</b><br>" + core + "<br><br>" + clot;
            } else {
                microscopicText += "</b><br>" + core;
            }
        } else if (clot != "") {
            microscopicText += "<br><br><b>Particle Clot</b><br>" + clot;
        }
    } else {
        if (core != "") {
            microscopicText += "<b>Core Biopsy";
            if (clot != "") {
                microscopicText += "/Particle Clot</b><br>" + core + "<br><br>" + clot;
            } else {
                microscopicText += "</b><br>" + core;
            }
        } else if (clot != "") {
            microscopicText += "<b>Particle Clot</b><br>" + clot;
        }
    }

    if (microscopicText != "") {
        if (specialStains != "") {
            microscopicText += `<br><br><b>Special Stains</b><br>${specialStains}`;
        }
    } else if (specialStains != "") {
        microscopicText += `<b>Special Stains</b><br>${specialStains}`;
    }

    if (microscopicText != "") {
        if (immunostains != "") {
            if (specialStains == '') {
                microscopicText += '<br>';
            }
            microscopicText += `<br><b>Immunohistochemical Stains</b><br>${immunostains}`;
        }
    } else if (immunostains != "") {
        microscopicText += `<b>Immunohistochemical Stains</b><br>${immunostains}`;
    }
    
    return microscopicText;
}

function fillPB() {
    let pbText = "";
    let pbBlast = "";
    let pbPlasma = "";
    let neutListString = listText("neutrophilSelectDiv");
    const anisoListString = listText('anisoSelectDiv');
    const pltListString = listText("plateletSelectDiv");
    const monoListString = listText('monocyteSelectDiv');
    const lymphListString = listText("lymphocyteSelectDiv"); 
    
    const hgbMildMarked = document.getElementById("hgbMildMarked");
    if (hgbMildMarked) hgbMildMarked.style.display = "none";

    if (document.getElementById('hgbLow')?.checked || document.getElementById('hgbHigh')?.checked) {
        if (hgbMildMarked) hgbMildMarked.style.display = "block";
        let toggle = false;
        pbText += "The peripheral blood smear shows ";
        
        document.querySelectorAll('.hgbMildMarked').forEach(function(el) {
            if (el.checked) {
                pbText += `${el.value} `;
            }
        });
        
        document.querySelectorAll('.mcvQual').forEach(function(el) {
            if (el.checked) {
                pbText += `${el.value}`;
                toggle = true;
            }
        });
        
        if (document.getElementById('hypochromic')?.checked) {
            if (toggle) {
                pbText += ", hypochromic";
            } else {
                pbText += " hypochromic";
            }
        }
        
        document.querySelectorAll('.hgbQual').forEach(function(el) {
            if (el.checked) {
                pbText += ` ${el.value}. `;
            }
        });
    } else if (document.getElementById('hgbNormal')?.checked) {
        pbText += "The peripheral blood smear shows adequate hemoglobin. ";
    }

    const anisoDiv = document.getElementById('anisoDiv');
    const anisoSelectDiv = document.getElementById('anisoSelectDiv');
    
    if (document.getElementById("anisoPresent")?.checked || 
        document.getElementById("anisoMild")?.checked || 
        document.getElementById("anisoMarked")?.checked) {
        if (anisoDiv) anisoDiv.style.display = "block";
        if (anisoSelectDiv) anisoSelectDiv.style.display = "block";
    } else {
        if (anisoDiv) anisoDiv.style.display = "none";
        if (anisoSelectDiv) anisoSelectDiv.style.display = "none";
    }

    if (document.getElementById("rbcUnremarkable")?.checked) {
        pbText += "Red blood cells show unremarkable morphology. ";
    }

    if (document.getElementById("polyPresent")?.checked) {
        let toggle = false;
        pbText += "Red blood cells show ";
        
        document.querySelectorAll('.polyQual').forEach(function(el) {
            if (el.checked) {
                pbText += `${el.value} `;
            }
        });
        
        pbText += "polychromasia";
        
        if (document.getElementById("anisoPresent")?.checked) {
            pbText += " and ";
            document.querySelectorAll('.aniso').forEach(function(el) {
                if (el.checked) {
                    pbText += `${el.value} `;
                }
            });
            if (anisoListString != "") {
                pbText += `anisopoikilocytosis including ${anisoListString}. `;
            } else {
                pbText += `nonspecific anisopoikilocytosis. `;
            }
        } else {
            pbText += ". ";
        }
    } else if (document.getElementById("anisoPresent")?.checked) {
        pbText += "Red blood cells show ";
        document.querySelectorAll('.aniso').forEach(function(el) {
            if (el.checked) {
                pbText += `${el.value} `;
            }
        });
        if (anisoListString != "") {
            pbText += `anisopoikilocytosis including ${anisoListString}. `;
        } else {
            pbText += `nonspecific anisopoikilocytosis. `;
        }
    }

    if (document.getElementById("nrbcPresent")?.checked) {
        let toggle = false;
        document.querySelectorAll(".nrbcQual").forEach(function(el) {
            if (el.checked) {
                pbText += `${el.value} `;
                toggle = true;
            }
        });
        
        if (toggle) {
            pbText += "nucleated red blood cells ";
        } else {
            pbText += "Nucleated red blood cells ";
        }
        
        if (document.getElementById("rouleauxPresent")?.checked) {
            pbText += "and ";
            document.querySelectorAll(".rouleaux").forEach(function(el) {
                if (el.checked) {
                    pbText += `${el.value.toLowerCase()} `;
                }
            });
            pbText += "rouleaux formation are identified. ";
        } else {
            pbText += "are identified. ";
        }
    } else if (document.getElementById("rouleauxPresent")?.checked) {
        let toggle = false;
        document.querySelectorAll(".rouleaux").forEach(function(el) {
            if (el.checked) {
                pbText += `${el.value} `;
                toggle = true;
            }
        });
        if (toggle) {
            pbText += "rouleaux formation is present. ";
        } else {
            pbText += "Rouleaux formation is present. ";
        }
    }

    const neutMildMarked = document.getElementById("neutMildMarked");

    let shiftSelected = /shift to immaturity/i.test(neutListString);

    if (shiftSelected) {
        let currentBlast = "";
        if (document.getElementById("blastPresent")?.checked) currentBlast = "Present";
        else if (document.getElementById("blastRare")?.checked) currentBlast = "Rare";
        else if (document.getElementById("blastOccasional")?.checked) currentBlast = "Occasional";
        else if (document.getElementById("blastFrequent")?.checked) currentBlast = "Frequent";

        if (currentBlast !== "") {
            let blastModifier = currentBlast === "Present" ? "" : currentBlast.toLowerCase() + " ";
            let replacementText = `shift to immaturity including ${blastModifier}blasts`;
                        neutListString = neutListString.replace(/shift to immaturity/i, replacementText);
        }
    }

    if (document.getElementById("neutLow")?.checked) {
        if (neutMildMarked) neutMildMarked.style.display = "block";
        pbText += "There is";
        if (document.getElementById('neutMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('neutMild')?.checked) {
            pbText += " mild";
        }
        if (document.getElementById("neutrophil_unremarkable")?.checked){
            pbText += " absolute neutropenia. Neutrophils show unremarkable morphology. ";
        } else if (neutListString != "") {
            pbText += ` absolute neutropenia. Neutrophils show ${neutListString}. `;
        } else {
            pbText += " absolute neutropenia. ";
        }
    } else if (document.getElementById("neutNormal")?.checked) {
        if (neutMildMarked) neutMildMarked.style.display = "none";
        if (document.getElementById("neutrophil_unremarkable")?.checked){
            pbText += "Neutrophils are adequate and show unremarkable morphology. ";
        } else if (neutListString != "") {
            pbText += `Neutrophils are adequate. Neutrophils show ${neutListString}. `;
        } else {
            pbText += `Neutrophils are adequate. `;
        }
    } else if (document.getElementById("neutHigh")?.checked) {
        if (neutMildMarked) neutMildMarked.style.display = "block";
        pbText += "There is";
        if (document.getElementById('neutMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('neutMild')?.checked) {
            pbText += " mild";
        }
        if (document.getElementById("neutrophil_unremarkable")?.checked){
            pbText += " absolute neutrophilia. Neutrophils show unremarkable morphology. ";
        } else if (neutListString != "") {
            pbText += ` absolute neutrophilia. Neutrophils show ${neutListString}. `;
        } else {
            pbText += " absolute neutrophilia. ";
        }
    } else if (neutListString != "") {
        pbText += `Neutrophils show ${neutListString}. `;
    } else if (document.getElementById("neutrophil_unremarkable")?.checked) {
        pbText += "Neutrophils show unremarkable morphology. ";
    }

    const lymphMildMarked = document.getElementById("lymphMildMarked");
    
    if (document.getElementById("lymphLow")?.checked) {
        if (lymphMildMarked) lymphMildMarked.style.display = "block";
        pbText += "There is";
        if (document.getElementById('lymphMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('lymphMild')?.checked) {
            pbText += " mild";
        }
        if (document.getElementById("lymphocyte_unremarkable")?.checked) {
            pbText += " absolute lymphopenia. Lymphocytes show unremarkable morphology. ";
        } else if (lymphListString != ""){
            pbText += ` absolute lymphopenia. Lymphocytes show ${lymphListString}. `;
        } else {
            pbText += " absolute lymphopenia. "
        }
    } else if (document.getElementById("lymphNormal")?.checked) {
        if (lymphMildMarked) lymphMildMarked.style.display = "none";
        if (document.getElementById("lymphocyte_unremarkable")?.checked) {
            pbText += "Lymphocytes are adequate and show unremarkable morphology. ";
        } else if (lymphListString != ""){
            pbText += `Lymphocytes are adequate. Lymphocytes show ${lymphListString}. `;
        } else {
            pbText += "Lymphocytes are adequate. "
        }
    } else if (document.getElementById("lymphHigh")?.checked) {
        if (lymphMildMarked) lymphMildMarked.style.display = "block";
        pbText += "There is";
        if (document.getElementById('lymphMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('lymphMild')?.checked) {
            pbText += " mild";
        }
        if (document.getElementById("lymphocyte_unremarkable")?.checked) {
            pbText += " absolute lymphocytosis. Lymphocytes show unremarkable morphology. ";
        } else if (lymphListString != ""){
            pbText += ` absolute lymphocytosis. Lymphocytes show ${lymphListString}. `;
        } else {
            pbText += " absolute lymphocytosis. "
        }
    } else if (lymphListString != "") {
        pbText += `Lymphocytes show ${lymphListString}. `;
    } else if (document.getElementById("lymphocyte_unremarkable")?.checked) {
        pbText += "Lymphocytes show unremarkable morphology. ";
    }

    const monosMildMarked = document.getElementById("monosMildMarked");

    if (document.getElementById("monosLow")?.checked) {
        if (monosMildMarked) monosMildMarked.style.display = "block";
        pbText += "There is";
        if (document.getElementById('monosMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('monosMild')?.checked) {
            pbText += " mild";
        }
        if (monoListString == "") {
            pbText += " absolute monocytopenia. Monocytes show mature-appearing morphology. ";
        } else {
            pbText += " absolute monocytopenia. Monocytes show " + monoListString + ". ";
        }
    } else if (document.getElementById("monosHigh")?.checked) {
        if (monosMildMarked) monosMildMarked.style.display = "block";
        pbText += "There is";
        if (document.getElementById('monosMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('monosMild')?.checked) {
            pbText += " mild";
        }
        if (monoListString == "") {
            pbText += " absolute monocytosis. Monocytes show mature-appearing morphology. ";
        } else {
            pbText += " absolute monocytosis. Monocytes show " + monoListString + ". ";
        }
    } else if (monoListString != "") {
        pbText += `Monocytes show ${monoListString}. `;
    }

    if (document.getElementById("eosHigh")?.checked && document.getElementById("basoHigh")?.checked) {
        if (eosMildMarked) eosMildMarked.style.display = "block";
        if (basoMildMarked) basoMildMarked.style.display = "block";
        pbText += "There is ";
        if (document.getElementById('eosMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('eosMild')?.checked) {
            pbText += " mild";
        }
        pbText += " absolute eosinophilia and";
        if (document.getElementById('basoMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('basoMild')?.checked) {
            pbText += " mild";
        }
        pbText += " absolute basophilia. ";
    } else if (document.getElementById("eosHigh")?.checked) {
        if (eosMildMarked) eosMildMarked.style.display = "block";
        pbText += "There is";
        if (document.getElementById('eosMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('eosMild')?.checked) {
            pbText += " mild";
        }
        pbText += " absolute eosinophilia. ";
        if (basoMildMarked) basoMildMarked.style.display = "none";
    } else if (document.getElementById("basoHigh")?.checked) {
        if (basoMildMarked) basoMildMarked.style.display = "block";
        pbText += "There is";
        if (document.getElementById('basoMarked')?.checked) {
            pbText += " marked";
        } else if (document.getElementById('basoMild')?.checked) {
            pbText += " mild";
        }
        pbText += " absolute basophilia. ";
        if (eosMildMarked) eosMildMarked.style.display = "none";
    } else {
        if (eosMildMarked) eosMildMarked.style.display = "none";
        if (basoMildMarked) basoMildMarked.style.display = "none";
    }

    const pltMildMarked = document.getElementById("pltMildMarked");
    
    if (document.getElementById("pltLow")?.checked) {
        if (pltMildMarked) pltMildMarked.style.display = "block";
        pbText += "Platelets are";
        if (document.getElementById("pltMild")?.checked) {
            pbText += " mildly";
        } else if (document.getElementById("pltMarked")?.checked) {
            pbText += " markedly";
        }
        
        if (document.getElementById("platelet_unremarkable")?.checked) {
            pbText += " decreased with unremarkable morphology. ";
        } else if (pltListString != "") {
            pbText += " decreased with " + pltListString + ". ";
        } else {
            pbText += " decreased. ";
        }
    } else if (document.getElementById("pltNormal")?.checked) {
        if (pltMildMarked) pltMildMarked.style.display = "none";
        
        if (document.getElementById("platelet_unremarkable")?.checked) {
            pbText += "Platelets are adequate with unremarkable morphology. ";
        } else if (pltListString != "") {
            pbText += "Platelets are adequate with " + pltListString + ". ";
        } else {
            pbText += "Platelets are adequate. ";
        }
    } else if (document.getElementById("pltHigh")?.checked) {
        if (pltMildMarked) pltMildMarked.style.display = "block";
        pbText += "Platelets are";
        if (document.getElementById("pltMild")?.checked) {
            pbText += " mildly";
        } else if (document.getElementById("pltMarked")?.checked) {
            pbText += " markedly";
        }
        
        if (document.getElementById("platelet_unremarkable")?.checked) {
            pbText += " increased with unremarkable morphology. ";
        } else if (pltListString != "") {
            pbText += " increased with " + pltListString + ". ";
        } else {
            pbText += " increased. ";
        }
    } else if (pltListString != "") {
        pbText += pltListString.charAt(0).toUpperCase() + pltListString.slice(1) + " are seen. ";
    } else if (document.getElementById("platelet_unremarkable")?.checked) { 
        pbText += "Platelets show unremarkable morphology. ";
    }

    document.querySelectorAll('.pbBlast').forEach(function(el) {
        if (el.checked) {
            pbBlast = el.value;
        }
    });

    document.querySelectorAll('.pbPlasma').forEach(function(el) {
        if (el.checked) {
            pbPlasma = el.value;
        }
    });

    let isShiftToImmaturity = false;
    document.querySelectorAll('#neutrophilSelectDiv .select').forEach(sel => {
        if (sel.value.toLowerCase() === "shift to immaturity") isShiftToImmaturity = true;
    });

    if (isShiftToImmaturity && pbBlast !== "" && pbBlast !== "No") {
        pbBlast = ""; 
    }

    if (pbBlast === pbPlasma && pbBlast !== "") {
        if (pbBlast === "No") {
            pbText += "No circulating blasts or plasma cells are identified. ";
        } else if (pbBlast === "Present") {
            pbText += "Circulating blasts and plasma cells are identified. ";
        } else {
            pbText += `${pbBlast} circulating blasts and plasma cells are identified. `;
        }
    } else {
        let bothPositive = (pbBlast && pbBlast !== "No") && (pbPlasma && pbPlasma !== "No");

        if (bothPositive) {
            let bStr = pbBlast === "Present" ? "Circulating blasts" : `${pbBlast} circulating blasts`;
            let pStr = pbPlasma === "Present" ? "circulating plasma cells" : `${pbPlasma.toLowerCase()} circulating plasma cells`;
            pbText += `${bStr} and ${pStr} are identified. `;
        } else {
            if (pbBlast) {
                let bStr = pbBlast === "Present" ? "Circulating blasts" : `${pbBlast} circulating blasts`;
                pbText += `${bStr} are identified. `;
            }
            if (pbPlasma) {
                let pStr = pbPlasma === "Present" ? "Circulating plasma cells" : `${pbPlasma} circulating plasma cells`;
                pbText += `${pStr} are identified. `;
            }
        }
    }
    
    return pbText;
}

function fillAsp() {
    let aspText = "";
    const adequacyListString = listText("adequacySelectDiv");
    const erythroidListString = listText("erythroidSelectDiv");
    const myeloidListString = listText("myeloidSelectDiv");
    const megakaryocyteListString = listText("aspMegSelectDiv").toLowerCase();
    const plasmaListString = listText("plasmaSelectDiv").toLowerCase();

    if (erythroidListString !== "") {
        let erythUnrem = document.getElementById("erythroid_unremarkable");
        if (erythUnrem) erythUnrem.checked = false;
    }

    if (myeloidListString !== "") {
        let myelUnrem = document.getElementById("myeloid_unremarkable");
        if (myelUnrem) myelUnrem.checked = false;
    }

    if (megakaryocyteListString !== "") {
        let megUnrem = document.getElementById("megakaryocyte_unremarkable");
        if (megUnrem) megUnrem.checked = false;
    }
    
    let aspAdequate = document.getElementById('aspAdequate')?.checked;
    let aspSuboptimal = document.getElementById('aspSuboptimal')?.checked;
    let aspInadequate = document.getElementById('aspInadequate')?.checked;

    if (aspAdequate && adequacyListString === "") {
        aspText += "The bone marrow aspirate smears are cellular and adequate for interpretation. ";
    } else if (aspAdequate) {
        aspText += "The bone marrow aspirate smears are " + adequacyListString + " but overall adequate for interpretation. ";
    } else if (aspSuboptimal) {
        if (adequacyListString === "") {
            aspText += "The bone marrow aspirate smears are suboptimal for evaluation, limiting the accuracy of a differential count. ";
        } else {
            aspText += "The bone marrow aspirate smears are " + adequacyListString + " limiting the accuracy of a differential count. ";
        }
        
        let tpCheck = document.getElementById('tpCheck')?.checked;
        let aspDCountVal = document.getElementById('aspDCount')?.value;
        let aspCCountVal = document.getElementById('aspCCount')?.value;

        if (tpCheck) {
            aspText += "The bone marrow touch preparations are cellular, and therefore, a ";
            if (aspDCountVal > 0 && aspDCountVal < 500) {
                aspText += "limited ";
            }
            aspText += "differential count was performed on the touch preparations. ";
            tpMentioned = true; 
        } else if (aspCCountVal > 0) {
            aspText += "Nevertheless, a ";
            if (aspDCountVal > 0 && aspDCountVal < 500) {
                aspText += "limited ";
            }
            aspText += "differential count was performed on the aspirate smears. ";
        }
    } else if (aspInadequate && adequacyListString === "") {
        aspText += "The bone marrow aspirate smears are inadequate for interpretation. ";
    } else if (aspInadequate) {
        aspText += "The bone marrow aspirate smears are " + adequacyListString + " precluding a meaningful marrow differential. ";
    }

    if (document.getElementById('erythroidPredominance')?.checked) {
        aspText += "There is an erythroid predominance. ";
    } else if (document.getElementById('myeloidPredominance')?.checked) {
        aspText += "There is a myeloid predominance. ";
    }

    let erythroidUnremarkable = document.getElementById('erythroid_unremarkable')?.checked;
    let myeloidUnremarkable = document.getElementById('myeloid_unremarkable')?.checked;

    if (erythroidUnremarkable && myeloidUnremarkable) {
        aspText += "Myeloid and erythroid precursors show progressive maturation with unremarkable morphology. ";
    } else {
        if (erythroidUnremarkable) {
            aspText += "Erythroid precursors show progressive maturation with unremarkable morphology. ";
        } else if (erythroidListString !== "") {
            aspText += "Erythroid precursors show " + erythroidListString + ". ";
        }
        
        if (myeloidUnremarkable) {
            aspText += "Myeloid precursors show progressive maturation with unremarkable morphology. ";
        } else if (myeloidListString !== "") {
            aspText += "Myeloid precursors show " + myeloidListString + ". ";
        }
    }

    let megakaryocyteUnremarkable = document.getElementById('megakaryocyte_unremarkable')?.checked;

    if (document.getElementById('mega_increased')?.checked) {
        aspText += "Megakaryocytes appear increased";
        if (megakaryocyteUnremarkable) {
            aspText += " but show unremarkable morphology";
        } else if (megakaryocyteListString !== "") {
            aspText += " and show " + megakaryocyteListString;
        }
        aspText += ". ";
    } else if (document.getElementById('mega_adequate')?.checked) {
        aspText += "Megakaryocytes appear adequate ";
        if (megakaryocyteUnremarkable) {
            aspText += " and show unremarkable morphology";
        } else if (megakaryocyteListString !== "") {
            aspText += "but show " + megakaryocyteListString;
        }
        aspText += ". " 
    } else if (document.getElementById('mega_decreased')?.checked) {
        aspText += "Megakaryocytes appear decreased";
        if (megakaryocyteUnremarkable) {
            aspText += " but show unremarkable morphology";
        } else if (megakaryocyteListString !== "") {
            aspText += " and show " + megakaryocyteListString;
        }
        aspText += ". ";
    } else if (megakaryocyteUnremarkable) {
        aspText += "Megakaryocytes show unremarkable morphology. ";
    } else if (megakaryocyteListString !== "") {
        aspText += "Megakaryocytes show " + megakaryocyteListString + ". ";
    }

    let blastAdequate = document.getElementById('blast_adequate')?.checked;
    let blastIncreased = document.getElementById('blast_increased')?.checked;
    let plasmaAdequate = document.getElementById('plasmaAdequate')?.checked;
    let plasmaIncreased = document.getElementById('plasmaIncreased')?.checked;

    if (blastAdequate) {
        if (plasmaAdequate) {
            aspText += "Blasts and plasma cells are not increased. ";
        } else {
            aspText += "Blasts are not increased. ";
        }
    } else if (blastIncreased) {
        aspText += "Blasts are significantly increased. ";
    }

    if (plasmaAdequate && !blastAdequate) {
        aspText += "Plasma cells are not increased. ";
    } else if (plasmaIncreased) {
        aspText += "Plasma cells are significantly increased";
        if (plasmaListString !== '') {
            aspText += ` and show ${plasmaListString}`;
            let plasmaUnrem = document.getElementById('plasmaUnremarkable');
            if (plasmaUnrem) plasmaUnrem.checked = false;
        } else if (document.getElementById('plasmaUnremarkable')?.checked) {
            aspText += ' but show unremarkable morphology';
        }
        aspText += '. ';
    }
    
    return aspText;
}

function fillTouch() {
    let touchText = "";
    
    let touchSimilar = document.getElementById('touchSimilar');
    let touchPaucicellular = document.getElementById('touchPaucicellular');
    let aspAdequate = document.getElementById('aspAdequate');

    if (touchSimilar?.checked) {
        if (touchPaucicellular?.checked && aspAdequate?.checked) {
            touchText += "The bone marrow touch preparations are paucicellular but show findings otherwise similar to the aspirate smears.";
        } else if (touchPaucicellular?.checked) {
            touchText += "The bone marrow touch preparations are paucicellular and show findings similar to the aspirate smears.";
        } else {
            touchText += "The bone marrow touch preparations are cellular and show findings similar to the aspirate smears.";
        }
    }
    
    return touchText;
}

function fillCore() {
    let coreText = "";
    let cellularityText = "";
    const adequacyListString = listText("coreAdequacySelectDiv");
    const megakaryocyteListString = listText("coreMegSelectDiv");

    let coreAdequate = document.getElementById('coreAdequate')?.checked;
    let coreInadequate = document.getElementById('coreInadequate')?.checked;

    if (coreAdequate && adequacyListString === "") {
        coreText += "The bone marrow core biopsy is adequate for interpretation. ";
    } else if (coreAdequate) {
        coreText += `The bone marrow core biopsy ${adequacyListString} but is overall adequate for interpretation. `;
    } else if (coreInadequate && adequacyListString === "") {
        coreText += "The bone marrow core biopsy is inadequate for interpretation. ";
    } else if (coreInadequate) {
        coreText += `The bone marrow core biopsy ${adequacyListString} and is overall inadequate for interpretation. `;
    }

    let cellularityMildMarked = document.getElementById('cellularityMildMarked');
    if (cellularityMildMarked) cellularityMildMarked.style.display = 'none';
    
    document.querySelectorAll('.cellMildMarked').forEach(function(el) {
        if (el.checked) {
            cellularityText += `${el.value} `;
        }
    });
    
    document.querySelectorAll('.cellQual').forEach(function(el) {
        if (el.checked) {
            if (el.value === "normocellular") {
                cellularityText = `${el.value} `;
            } else {
                cellularityText += `${el.value} `;
                if (cellularityMildMarked) cellularityMildMarked.style.display = 'block';
            }
        }
    });

    const isNum = (val) => val !== undefined && val !== null && val !== "" && !isNaN(val);

    let varLow = document.getElementById('coreCellularityVariableLow')?.value;
    let varHigh = document.getElementById('coreCellularityVariableHigh')?.value;
    let coreCell = document.getElementById('coreCellularity')?.value;
    let rangeLow = document.getElementById('coreCellularityRangeLow')?.value;
    let rangeHigh = document.getElementById('coreCellularityRangeHigh')?.value;

    if (isNum(varLow) && isNum(varHigh) && parseFloat(varHigh) > parseFloat(varLow)) {
        coreText += `The marrow is variably cellular (ranging from ${varLow}-${varHigh}% cellular) `;
        if (cellularityText !== "") {
            coreText += `and overall ${cellularityText} for age`;
            if (isNum(coreCell)) {
                coreText += ` (~${coreCell}% cellular). `;
            } else if (isNum(rangeLow) && isNum(rangeHigh) && parseFloat(rangeHigh) > parseFloat(rangeLow)) {
                coreText += ` (${rangeLow}-${rangeHigh}% cellular). `;
            } else {
                coreText += ". ";
            }
        }
    } else if (cellularityText !== "") {
        coreText += `The marrow is ${cellularityText} for age`;
        if (isNum(coreCell)) {
            coreText += ` (~${coreCell}% cellular). `;
        } else if (isNum(rangeLow) && isNum(rangeHigh) && parseFloat(rangeHigh) > parseFloat(rangeLow)) {
            coreText += ` (${rangeLow}-${rangeHigh}% cellular). `;
        } else {
            coreText += ". ";
        }
    }
    
    if (document.getElementById('coreMEUnremarkable')?.checked) {
        coreText += "Myeloid and erythroid precursors show progressive maturation. ";
    } 

    if (document.getElementById('coreMegUnremarkable')?.checked) {
        coreText += "Megakaryocytes are adequate, regularly distributed, and show unremarkable morphology. ";
    } else if (megakaryocyteListString !== "") {
        coreText += `Megakaryocytes show ${megakaryocyteListString}. `;
    }
    
    return coreText;
}

function fillClot() {
    let clotText = "";
    let clotQuant = "";

    document.querySelectorAll('.clotQuant').forEach(function(el) {
        if (el.checked) {
            clotQuant = el.value;
        }
    });

    if (document.getElementById('clotNone')?.checked) {
        clotText += "The bone marrow particle clot shows no marrow particles for evaluation.";
    } else if (document.getElementById('clotSimilar')?.checked) {
        if (clotQuant !== "") {
            clotText += `The bone marrow particle clot shows ${clotQuant} marrow particles with findings similar to the core biopsy.`;
        } else {
            clotText += "The bone marrow particle clot shows multiple marrow particles with findings similar to the core biopsy.";
        }
    } else if (clotQuant !== "") {
        clotText += `The bone marrow particle clot shows ${clotQuant} marrow particles for evaluation.`;
    }
    
    return clotText;
}

function fillCellularity() {
    let coreCellularity = document.getElementById('coreCellularity');
    let coreCellularityRangeHigh = document.getElementById('coreCellularityRangeHigh');
    let coreCellularityRangeLow = document.getElementById('coreCellularityRangeLow');

    let a = coreCellularity ? parseFloat(coreCellularity.value) : NaN;
    let b = coreCellularityRangeHigh ? parseFloat(coreCellularityRangeHigh.value) : NaN;
    let c = coreCellularityRangeLow ? parseFloat(coreCellularityRangeLow.value) : NaN;
    let toggle = false;

    document.querySelectorAll('.cellularity').forEach(function(el) {
        let x = el.value;
        if (x > 100 || x < 0 || (isNaN(x) && x !== "")) {
            el.style.backgroundColor = 'rgb(255, 95, 95)';
            toggle = true;
        } else {
            el.style.backgroundColor = 'white';
        }
    });

    if (c > b) {
        if (coreCellularityRangeLow) coreCellularityRangeLow.style.backgroundColor = 'rgb(255, 95, 95)';
        if (coreCellularityRangeHigh) coreCellularityRangeHigh.style.backgroundColor = 'rgb(255, 95, 95)';
        toggle = true;
    }

    function setChecks(hypo, normo, hyper, marked, mild) {
        let elHypo = document.getElementById('hypocellular');
        let elNormo = document.getElementById('normocellular');
        let elHyper = document.getElementById('hypercellular');
        let elMarked = document.getElementById('cellularityMarked');
        let elMild = document.getElementById('cellularityMild');

        if (elHypo) elHypo.checked = hypo;
        if (elNormo) elNormo.checked = normo;
        if (elHyper) elHyper.checked = hyper;
        if (elMarked) elMarked.checked = marked;
        if (elMild) elMild.checked = mild;
    }

    let calcSelect = document.getElementById('cellularityCalculationSelect');
    let calcSelectVal = calcSelect ? calcSelect.value : "";

    if ((isNaN(a) && isNaN(b) && isNaN(c)) || toggle) {
        setChecks(false, false, false, false, false);
    } else if (patientAge !== -1) {
        if (calcSelectVal === "100 minus patient's age") {
            let x = 100 - patientAge - a;
            let y = 100 - patientAge - b;
            let z = 100 - patientAge - c;

            let markedlyHypo = parseFloat(document.getElementById('markedlyHypocellular')?.value);
            let mildlyHypoMax = parseFloat(document.getElementById('mildlyHypocellularMax')?.value);
            let mildlyHypoMin = parseFloat(document.getElementById('mildlyHypocellularMin')?.value);
            let mildlyHyperMin = parseFloat(document.getElementById('mildlyHypercellularMin')?.value);
            let mildlyHyperMax = parseFloat(document.getElementById('mildlyHypercellularMax')?.value);
            let markedlyHyper = parseFloat(document.getElementById('markedlyHypercellular')?.value);

            if (x >= markedlyHypo || y >= markedlyHypo) {
                setChecks(true, false, false, true, false);
            } else if (x >= mildlyHypoMax || y >= mildlyHypoMax) {
                setChecks(true, false, false, false, false);
            } else if (x >= mildlyHypoMin || y >= mildlyHypoMin) {
                setChecks(true, false, false, false, true);
            } else if (x >= mildlyHyperMin * -1 || z >= mildlyHyperMin * -1) {
                setChecks(false, true, false, false, false);
            } else if (x >= mildlyHyperMax * -1 || z >= mildlyHyperMax * -1) {
                setChecks(false, false, true, false, true);
            } else if (x >= markedlyHyper * -1 || z >= markedlyHyper * -1) {
                setChecks(false, false, true, false, false);
            } else if (x <= markedlyHyper * -1 || z <= markedlyHyper * -1) {
                setChecks(false, false, true, true, false);
            }

        } else if (calcSelectVal === "Strict evidence based") {
            if (patientAge < 20) {
                if (a < 45 || b < 45) {
                    setChecks(true, false, false, false, false);
                } else if (a > 85 || c > 85) {
                    setChecks(false, false, true, false, false);
                } else {
                    setChecks(false, true, false, false, false);
                }
            } else if (patientAge <= 40) {
                if (a < 40 || b < 40) {
                    setChecks(true, false, false, false, false);
                } else if (a > 70 || c > 70) {
                    setChecks(false, false, true, false, false);
                } else {
                    setChecks(false, true, false, false, false);
                }
            } else if (patientAge <= 60) {
                if (a < 35 || b < 35) {
                    setChecks(true, false, false, false, false);
                } else if (a > 65 || c > 65) {
                    setChecks(false, false, true, false, false);
                } else {
                    setChecks(false, true, false, false, false);
                }
            } else if (patientAge > 60) {
                if (a < 30 || b < 30) {
                    setChecks(true, false, false, false, false);
                } else if (a > 60 || c > 60) {
                    setChecks(false, false, true, false, false);
                } else {
                    setChecks(false, true, false, false, false);
                }
            }
        } else if (calcSelectVal === "Hybrid") {
        }
    }

    if (typeof fillReport === 'function') {
        fillReport();
    }
}

function fillSpecialStains() {
    let stainText = '';
    let classObject = {
        aspirateSpecialStainsSelectDiv: 'Bone Marrow Aspirate', 
        coreSpecialStainsSelectDiv: 'Bone Marrow Core Biopsy', 
        clotSpecialStainsSelectDiv: 'Bone Marrow Particle Clot'
    };

    for (let key in classObject) {
        if (!classObject.hasOwnProperty(key)) continue;
        
        let stainArray = [];
        
        document.querySelectorAll(`[data-parentID="${key}"]`).forEach(function(parentEl) {
            if (parentEl.value !== '') {
                let descriptorArray = [];
                let descriptorText = '';
                
                document.querySelectorAll(`[data-parentID="${parentEl.id}"]`).forEach(function(childEl) {
                    if (childEl.checked) {
                        descriptorArray.push(childEl.value);
                    }
                });
                
                let parentVal = parentEl.value;
                
                if (parentVal === 'Iron') {
                    if (descriptorArray.indexOf('adequate') !== -1) {
                        descriptorText += 'There is adequate storage iron. ';
                    } else if (descriptorArray.indexOf('decreased') !== -1) {
                        descriptorText += 'There is decreased storage iron. ';
                    } else if (descriptorArray.indexOf('increased') !== -1) {
                        descriptorText += 'There is increased storage iron. ';
                    } else if (descriptorArray.indexOf('inadequate') !== -1 && descriptorArray.indexOf('inadequate rings') === -1) {
                        descriptorText += 'There are too few spicules for assessment of storage iron. ';
                    } else if (descriptorArray.indexOf('inadequate') !== -1 && descriptorArray.indexOf('inadequate rings') !== -1) {
                        descriptorText += 'There are too few spicules for assessment of storage iron and too few erythroid precursors for assessment of ring sideroblasts. ';
                    }
                    
                    if (descriptorArray.indexOf('present') !== -1) {
                        descriptorText += 'Ring sideroblasts are identified';
                        if (descriptorList.Iron && descriptorList.Iron.positive !== 0) {
                            let positivePercent = (100 * descriptorList.Iron.positive / (descriptorList.Iron.positive + descriptorList.Iron.negative)).toFixed(0);
                            descriptorText += ` (~${positivePercent}% of erythroid precursors)`;
                        }
                        descriptorText += '. ';
                    } else if (descriptorArray.indexOf('absent') !== -1) {
                        descriptorText += 'No ring sideroblasts are identified. ';
                    } else if (descriptorArray.indexOf('inadequate rings') !== -1 && descriptorArray.indexOf('inadequate') === -1) {
                        descriptorText += 'There are too few erythroid precursors for assessment of ring sideroblasts. ';
                    }
                }else if (parentVal === 'Reticulin') {
                    let list = descriptorList[parentVal]["descriptorObject"];
                    if (list) {
                        document.querySelectorAll(`[data-parentID="${parentEl.id}"]`).forEach(function(childEl) {
                            for (let i = 0; i < list.descriptors.length; i++) {
                                if (childEl.value !== '' && childEl.value === list.descriptors[i]) {
                                    descriptorText = list.value[i];
                                } else if (childEl.checked) {
                                    descriptorText = childEl.value;
                                }
                            }
                        });
                    }
                } else if (parentVal === 'Congo red') {
                    if (descriptorArray[0] === 'negative') {
                        descriptorText = 'Negative for amyloid.';
                    } else if (descriptorArray[0] === 'positive') {
                        descriptorText = 'Positive for amyloid.';
                    }
                } else if (parentVal === 'GMS') {
                    if (descriptorArray[0] === 'negative') {
                        descriptorText = 'Negative for fungal organisms.';
                    } else if (descriptorArray[0] === 'positive') {
                        descriptorText = 'Positive for fungal organisms.';
                    }
                } else if (parentVal === 'AFB') {
                    if (descriptorArray[0] === 'negative') {
                        descriptorText = 'Negative for acid-fast bacteria.';
                    } else if (descriptorArray[0] === 'positive') {
                        descriptorText = 'Positive for acid-fast bacteria.';
                    }
                }
                
                stainArray.push([parentVal, descriptorText]);
            }
        });
        
        if (stainArray.length !== 0) {
            if (stainText !== '') {
                stainText += '<br>';
            }
            stainText += stainTable(stainArray, classObject[key]);
        }
    }
    return stainText;
}

function fillImmunostains() {
    let stainText = '';
    let classObject = {
        coreImmunostainsSelectDiv: 'Bone Marrow Core Biopsy', 
        clotImmunostainsSelectDiv: 'Bone Marrow Particle Clot'
    };
    
    for (let key in classObject) {
        if (!classObject.hasOwnProperty(key)) continue;
        
        let stainArray = [];
        
        document.querySelectorAll(`[data-parentID="${key}"]`).forEach(function(parentEl) {
            if (parentEl.value !== '') {
                let list = descriptorList[parentEl.value]["descriptorObject"];
                let descriptorText = '';      
                
                document.querySelectorAll(`[data-parentID="${parentEl.id}"]`).forEach(function(childEl) {
                    for (let i = 0; i < list.descriptors.length; i++) {
                        if (childEl.value !== '' && childEl.value === list.descriptors[i]) {
                            descriptorText = list.value[i];
                        } else if (childEl.checked) {
                            descriptorText = childEl.value;
                        }
                    }
                });
                
                let parentVal = parentEl.value;
                let stainId = descriptorList[parentVal]["id"]; 
                
                let minInput = document.getElementById(`${key}${stainId}ManualMin`);
                let maxInput = document.getElementById(`${key}${stainId}ManualMax`);
                
                let minVal = (minInput && minInput.value !== '') ? minInput.value : null;
                let maxVal = (maxInput && maxInput.value !== '') ? maxInput.value : null;
                
                let finalPercentage = null;

                if (minVal !== null && maxVal !== null) {
                    finalPercentage = `${minVal}-${maxVal}`;
                } else if (minVal !== null) {
                    finalPercentage = minVal;
                } else if (maxVal !== null) {
                    finalPercentage = maxVal;
                } else if (descriptorList[parentVal] && descriptorList[parentVal]['positive'] !== 0) {
                    finalPercentage = (100 * descriptorList[parentVal]['positive'] / (descriptorList[parentVal]['positive'] + descriptorList[parentVal]['negative'])).toFixed(0);
                }

                if (descriptorText.indexOf('***') !== -1 && finalPercentage !== null) {
                    descriptorText = descriptorText.replace('***', finalPercentage);
                }

                if (['CD20', 'CD34', 'CD138'].includes(parentVal)) {
                    if (finalPercentage !== null) {
                        if (descriptorText.indexOf('of total cellularity') === -1) {
                            descriptorText = descriptorText.trim();
                            
                            if (descriptorText.endsWith('.')) {
                                descriptorText = descriptorText.slice(0, -1);
                            }
                            
                            descriptorText += ` (~${finalPercentage}% of total cellularity).`;
                        }
                    }
                }
                
                stainArray.push([parentVal, descriptorText]);
            }
        });
        
        if (stainArray.length !== 0) {
            if (stainText !== '') {
                stainText += '<br>';
            }
            stainText += stainTable(stainArray, classObject[key]);
        }
    }
    return stainText;
}

function stainTable(array, label) {
    let stainText = `${label}<br><table class="templateTable" style="width:600px; font-size:10pt; style="border-collapse: collapse">`;
    for (let i = 0; i < array.length; i++) {
        stainText += `<tr><td style="width:30%; border: 1px solid black; padding-left: 5px;">${array[i][0]}</td><td style="width:70%; border: 1px solid black; padding-left: 5px;">${array[i][1]}</td></tr>`;
    }
    stainText += '</table>';
    return stainText;
}
