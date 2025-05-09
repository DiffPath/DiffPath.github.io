$(document).ready(function() {

    let pathologists = {
        "Dr. Moravek": {'Workload': 0, 'Slide Count': 0, 'Case List': []},
        "Dr. Mujeeb": {'Workload': 0, 'Slide Count': 0, 'Case List': []},
        "Dr. Rehman": {'Workload': 0, 'Slide Count': 0, 'Case List': []},
        "Dr. Bertram": {'Workload': 0, 'Slide Count': 0, 'Case List': []},
        "Lake Forest": {'Workload': 0, 'Slide Count': 0, 'Case List': []}
    }

    let pathologistCode = {
        "Moravek, Michael Robert, MD (Staff Pathologist)": "Dr. Moravek",
        "Mujeeb, Imaad Bin, MD (Staff Pathologist)": "Dr. Mujeeb",
        "Rehman, Jamaal A., MD (Staff Pathologist)": "Dr. Rehman",
        "Bertram, Heidi C., MD (Staff Pathologist)": "Dr. Bertram",
    }


    let caseLog = {}

    const caseTypes = {
        "Body Fluid": {Multiplier: 1, Compatibility: ["Cytology"]},
        "FNA": {Multiplier: 1, Compatibility: ["Cytology"]},
        "Needle Core Biopsy": {Multiplier: 1, Compatibility: ["Cytology"]},
        "Thyroid FNA": {Multiplier: 1.5, Compatibility: ["Cytology"]},
        "Bronchial Washing": {Multiplier: 1, Compatibility: ["Cytology"]},
        "Washing": {Multiplier: 3, Compatibility: ["Cytology"]},
        "Brushing, Slides Received": {Multiplier: 1, Compatibility: ["Cytology"]},
        "Cerebrospinal Fluid Cytology": {Multiplier: 1, Compatibility: ["Cytology"]},
        "Kidney Biopsy": {Multiplier: 1, Compatibility: ["Cytology"]},
        "Stomach, portion": {Multiplier: 1, Compatibility: ["Lake Forest", "Bigs", "Huntley"]},
        "Stomach, biopsy": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Finger(s), amputation, non-traumatic": {Multiplier: 1, Compatibility: ["Lake Forest", "Bigs", "Huntley"]},
        "Toe(s), amputation, non-traumatic": {Multiplier: 1, Compatibility: ["Lake Forest", "Bigs", "Huntley"]},
        "Colon polyp": {Multiplier: 0.5, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Esophagus, biopsy": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Esophagus, GE Junction": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Biopsy, GE Junction": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},        
        "Two Blocks Specimen": {Multiplier: 1, Compatibility: ["Huntley"]},
        "Uterus and cervix": {Multiplier: 1, Compatibility: ["Lake Forest", "Bigs"]},
        "Uterus, fibroid": {Multiplier: 1, Compatibility: ["Lake Forest", "Bigs"]},
        "Uterus, bilateral tubes and ovaries": {Multiplier: 1, Compatibility: ["Lake Forest", "Bigs"]},
        "Vaginal mucosa": {Multiplier: 1, Compatibility: ["Huntley"]},
        "Cervical LEEP": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Parathyroid": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Thyroid resection": {Multiplier: 1.5, Compatibility: ["Bigs"]},
        "Placenta": {Multiplier: 1, Compatibility: ["Lake Forest", "Bigs", "Huntley"]},
        "Colon Random (NWR)": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Colon biopsy": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Biopsy,Terminal Ileum": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Duodenal, biopsy": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Products of conception": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Stomach, gastric polyp": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Fallopian tube, bilateral": {Multiplier: 0.8, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Fallopian tube": {Multiplier: 0.8, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Gallbladder": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Appendix": {Multiplier: 0.8, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Appendix, incidental": {Multiplier: 0.8, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Hernia sac": {Multiplier: 0.8, Compatibility: ["Lake Forest", "Huntley"]},
        "Tonsil": {Multiplier: 0.7, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Tonsils, bilateral": {Multiplier: 0.7, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Tonsil and adenoids": {Multiplier: 0.7, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Adenoids": {Multiplier: 0.7, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Palate": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley"]},
        "Nasal contents": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley"]},
        "Nasal septum": {Multiplier: 0.5, Compatibility: ["Lake Forest", "Huntley"]},
        "Ethmoid": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley"]},
        "Uvula": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley"]},
        "Hemorrhoids": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley"]},
        "Carotid artery, plaque": {Multiplier: 0.5, Compatibility: ["Lake Forest", "Huntley"]},
        "Ganglion": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley"]},
        "Hydrocele": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley"]},
        "Vas deferens": {Multiplier: 0.8, Compatibility: ["Lake Forest", "Huntley"]},
        "Bone Fragment(s)": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Bone Biopsy": {Multiplier: 1, Compatibility: []},
        "Plantar wart": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley"]},
        "Colon Resection (NWR)": {Multiplier: 1, Compatibility: ["Lake Forest", "Bigs"]},
        "Small bowel resection": {Multiplier: 1, Compatibility: ["Lake Forest", "Bigs"]},
        "Colon Resection, Malignant NWR": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Omentum": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Soft Tissue": {Multiplier: 1, Compatibility: ["Lake Forest"]},
        "Foot Amputation": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Breast Lumpectomy": {Multiplier: 1.5, Compatibility: ["Bigs"]},
        "Breast Mastectomy": {Multiplier: 1.5, Compatibility: ["Bigs"]},
        "Breast Margin": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Breast reduction": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Sentinel node": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Lymph node": {Multiplier: 2, Compatibility: ["Bigs"]},
        "Lung wegde biopsy": {Multiplier: 1.5, Compatibility: ["Bigs"]},
        "Lunge lobectomy or segmental resection": {Multiplier: 1.5, Compatibility: ["Bigs"]},
        "Biopsy H&E 3 Levels (NWR)": {Multiplier: 1, Compatibility: []},
        "Bladder, transurethral resection": {Multiplier: 1.5, Compatibility: ["Lake Forest", "Huntley"]},
        "Lung bronchoscopic biopsy": {Multiplier: 1.5, Compatibility: ["Huntley"]},
        "Liver biopsy, lesion": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Liver biopsy, random": {Multiplier: 2, Compatibility: ["Huntley"]},
        "Kidney stone": {Multiplier: 1, Compatibility: ["Cytology", "Bigs", "Huntley"]},
        "Ureteral stone": {Multiplier: 1, Compatibility: ["Cytology", "Bigs", "Huntley"]},
        "Foreign body": {Multiplier: 1, Compatibility: ["Cytology", "Bigs", "Huntley"]},
        "Tenosynovium": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Mouth, biopsy": {Multiplier: 1, Compatibility: ["Huntley", "Work from Home"]},
        "Endometrial Curettings": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Bone Marrow Aspirate": {Multiplier: 3, Compatibility: []},
        "Bone Marrow Biopsy": {Multiplier: 3, Compatibility: []},
        "Brain, Biopsy": {Multiplier: 1, Compatibility: []},
        "Brain, for tumor resection": {Multiplier: 1, Compatibility: []},
        "Breast Core Biopsy": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Prostate biopsy": {Multiplier: 0.8, Compatibility: ["Lake Forest", "Huntley", "Work from Home"]},
        "Prostate TUR": {Multiplier: 1, Compatibility: ["Lake Forest", "Huntley"]},
        "Skin, biopsy": {Multiplier: 2, Compatibility: ["Lake Forest", "Huntley"]},
        "Scalp": {Multiplier: 2, Compatibility: ["Lake Forest", "Huntley"]},
        "Cheek": {Multiplier: 2, Compatibility: ["Lake Forest", "Huntley"]},
        "Skin Ellipse Unoriented": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Skin Ellipse Oriented": {Multiplier: 1, Compatibility: ["Bigs"]},
        "Kidney": {Multiplier: 1.5, Compatibility: ["Bigs"]},
        "Temporal artery biopsy": {Multiplier: 1, Compatibility: ["Huntley"]},
    }

    fillNames();

    function fillNames (){
        $('.select').each(function(){
            $(this).append(`<option> </option>`);
            for(i in pathologists){
                $(this).append(`<option>${i}</option>`);
            }
        })
    }

    $('#caseLogInput').bind('input', function(){
        const rows = this.value.split("\t");
        console.log(rows)
        let headers = [];
        let caseNumber = "";
        for (i in rows){
            if (rows[i].indexOf('\n') == -1){
                headers.push(rows[i]);
            }
            else {
                headers.push(rows[i].split("\n")[0]);
                caseNumber = rows[i].split("\n")[1];
                break
            }
        }
        let counter = 1; 
        let columns = headers.length - 1;
        let caseObject = {};
        for (let i = columns + 1; i < rows.length; i++){
            if (counter != columns){
                caseObject[headers[counter]] = rows[i].replace(/['"]+/g, '');
                counter++;
            } else {
                caseObject[headers[counter]] = rows[i].split("\n")[0].replace(/['"]+/g, '');
                caseLog[caseNumber] = caseObject;
                if (i != rows.length - 1){
                    caseNumber = rows[i].split("\n")[1].replace(/['"]+/g, '');
                }
                counter = 1;
                caseObject = {};
            }
        }
        for (i in caseLog){
            caseLog[i]["Protocols"] = caseLog[i]["Protocols"].split("\n");
            let caseSum = 0;
            for (j in caseLog[i]["Protocols"]){
                if (!(caseLog[i]["Protocols"][j] in caseTypes)){
                    caseTypes[caseLog[i]["Protocols"][j]] = {Multiplier: 1, Compatibility: []};
                }
                caseSum += caseTypes[caseLog[i]["Protocols"][j]]["Multiplier"];
            }
            let caseMult = caseSum / caseLog[i]["Protocols"].length
            caseLog[i]["#Slides"] = parseInt(caseLog[i]["#Slides"]);
            caseLog[i]["Workload"] = caseLog[i]["#Slides"] ** (1/2) * caseMult * 100;
            console.log(caseLog[i]["Protocols"])
            console.log(caseLog[i]["#Slides"])
            console.log(caseLog[i]["Workload"])
        }
        assignCases();
    });

    $('.select').change(function(){
        const value = this.value;
        const id = this.id;
        $('.select').each(function(){
            if (this.value == value && this.id != id){
                this.value = '';
            }
        })
        assignCases();
    })

    function findBestCombo(obj, target) {
        const values = Object.values(obj);
        const keys = Object.keys(obj);
        const dp = new Array(target + 1).fill(null);
        let finalArray;
        dp[0] = [];    
        for (let i = 0; i < values.length; i++) {
          const num = parseInt(values[i]['Workload']);
          const key = keys[i];
          for (let j = target; j >= num; j--) {
            if (dp[j - num] !== null) {
              if (dp[j] === null || 
                  (Math.abs(j - target) < Math.abs(dp[j][0] - target)) ||
                  (Math.abs(j - target) === Math.abs(dp[j][0] - target) && dp[j - num].length <= dp[j].length)
              ) {
                dp[j] = [...dp[j - num], key];
              }
            }
          }
        }
        for (i in dp){
            if (dp[i] != null){
                finalArray = dp[i];
            }
            if (i == target){
                break
            }
        }
        return finalArray;
      }

    function assignCases(){
        let tempCaseLog = {...caseLog};
        let finalCaseLog = {...caseLog};
        let slideCount = 0;
        let workloadCount = 0;
        for (i in tempCaseLog){
            slideCount += tempCaseLog[i]['#Slides'];
            workloadCount += tempCaseLog[i]['Workload']
        }
        for (i in pathologists){
            pathologists[i]['Slide Count'] = 0;
            pathologists[i]['Workload'] = 0;
            pathologists[i]['Case List'] = [];
        }
        let pathologistList = [];
        $('.select').each(function(){
            if (this.value != ''){
                pathologistList.push(this.value);
            }
        })
        if (pathologistList.length != 0){
            let pathologistCount = pathologistList.length
            let slideAverage = slideCount / pathologistCount;
            let workloadAverage = workloadCount / pathologistCount;
            /* If a case has been assigned to a pathologist already, that case 
            will be continue to be assigned to that pathologist and the pathologists
            slide total will be updated. */
            for (i in tempCaseLog){
                if (tempCaseLog[i]['Assigned Users'] != '' && tempCaseLog[i]['Assigned Users'] in pathologistCode){
                    pathologists[pathologistCode[tempCaseLog[i]['Assigned Users']]]['Case List'].push(i);
                    pathologists[pathologistCode[tempCaseLog[i]['Assigned Users']]]['Slide Count'] += tempCaseLog[i]['#Slides'];
                    pathologists[pathologistCode[tempCaseLog[i]['Assigned Users']]]['Workload'] += tempCaseLog[i]['Workload'];
                    finalCaseLog[i]['Pathologist'] = pathologistCode[tempCaseLog[i]['Assigned Users']];
                    delete tempCaseLog[i]; 
                } else if (tempCaseLog[i]['Assigned Users'] != ''){
                    pathologists[tempCaseLog[i]['Assigned Users']] = {};
                    pathologists[tempCaseLog[i]['Assigned Users']]['Case List'] = [];
                    pathologists[tempCaseLog[i]['Assigned Users']]['Slide Count'] = 0;
                    pathologists[tempCaseLog[i]['Assigned Users']]['Workload'] += 0;
                    pathologists[tempCaseLog[i]['Assigned Users']]['Case List'].push(i);
                    pathologists[tempCaseLog[i]['Assigned Users']]['Slide Count'] += tempCaseLog[i]['#Slides'];
                    pathologists[tempCaseLog[i]['Assigned Users']]['Workload'] += tempCaseLog[i]['Workload'];
                    finalCaseLog[i]['Pathologist'] = tempCaseLog[i]['Assigned Users'];
                    delete tempCaseLog[i]; 
                }
            }
            if (pathologistList.indexOf('Dr. Moravek') != -1){
                for (i in tempCaseLog){
                    let compatible = false;
                    for (j in tempCaseLog[i]['Protocols']){
                        if (tempCaseLog[i]['Protocols'][j] == "Bone Marrow Biopsy" || tempCaseLog[i]['Protocols'][j] == "Bone Marrow Aspirate"){
                            compatible = true;
                        }
                    }
                    if (compatible){
                        pathologists["Dr. Moravek"]['Case List'].push(i)
                        pathologists["Dr. Moravek"]['Slide Count'] += tempCaseLog[i]['#Slides'];
                        pathologists["Dr. Moravek"]['Workload'] += tempCaseLog[i]['Workload'];
                        finalCaseLog[i]['Pathologist'] = "Dr. Moravek";
                        delete tempCaseLog[i]; 
                    }
                }
                if(pathologists["Dr. Moravek"]['Workload'] > workloadAverage && pathologistCount > 1){
                    pathologistCount--;
                    slideCount-= pathologists["Dr. Moravek"]['Slide Count'];
                    slideAverage = slideCount / pathologistCount;
                    workloadCount -= pathologists["Dr. Moravek"]['Workload'];
                    workloadAverage = workloadCount / pathologistCount;
                }
            } else if (pathologistList.indexOf('Dr. Rehman') != -1){
                for (i in tempCaseLog){
                    let compatible = false;
                    for (j in tempCaseLog[i]['Protocols']){
                        if (tempCaseLog[i]['Protocols'][j] == "Bone Marrow Biopsy" || tempCaseLog[i]['Protocols'][j] == "Bone Marrow Aspirate"){
                            compatible = true;
                        }
                    }
                    if (compatible){
                        pathologists["Dr. Rehman"]['Case List'].push(i)
                        pathologists["Dr. Rehman"]['Slide Count'] += tempCaseLog[i]['#Slides'];
                        pathologists["Dr. Rehman"]['Workload'] += tempCaseLog[i]['Workload'];
                        finalCaseLog[i]['Pathologist'] = "Dr. Rehman";
                        delete tempCaseLog[i]; 
                    }
                }
                if(pathologists["Dr. Rehman"]['Workload'] > workloadAverage && pathologistCount > 1){
                    pathologistCount--;
                    slideCount-= pathologists["Dr. Rehman"]['Slide Count'];
                    slideAverage = slideCount / pathologistCount;
                    workloadCount -= pathologists["Dr. Rehman"]['Workload'];
                    workloadAverage = workloadCount / pathologistCount;
                }
            } else if (pathologistList.indexOf('Dr. Mujeeb') != -1){
                for (i in tempCaseLog){
                    let compatible = false;
                    for (j in tempCaseLog[i]['Protocols']){
                        if (tempCaseLog[i]['Protocols'][j] == "Bone Marrow Biopsy" || tempCaseLog[i]['Protocols'][j] == "Bone Marrow Aspirate"){
                            compatible = true;
                        }
                    }
                    if (compatible){
                        pathologists["Dr. Mujeeb"]['Case List'].push(i)
                        pathologists["Dr. Mujeeb"]['Workload'] += tempCaseLog[i]['Workload'];
                        finalCaseLog[i]['Pathologist'] = "Dr. Mujeeb";
                        delete tempCaseLog[i]; 
                    }
                }
                if(pathologists["Dr. Mujeeb"]['Workload'] > workloadAverage && pathologistCount > 1){
                    pathologistCount--;
                    slideCount-= pathologists["Dr. Mujeeb"]['Slide Count'];
                    slideAverage = slideCount / pathologistCount;
                    workloadCount -= pathologists["Dr. Mujeeb"]['Workload'];
                    workloadAverage = workloadCount / pathologistCount;
                }
            }
            /* If there is a pathologist on cytology service, this code will 
            assign all cytology cases to that pathologist */
            if ($('#cyto').val() != ''){
                for (i in tempCaseLog){
                    let compatible = false;
                    for (j in tempCaseLog[i]['Protocols']){
                        if (caseTypes[tempCaseLog[i]['Protocols'][j]]['Compatibility'].indexOf("Cytology") != -1){
                            compatible = true;
                        }
                    }
                    if (compatible){
                        pathologists[$('#cyto').val()]['Case List'].push(i)
                        pathologists[$('#cyto').val()]['Slide Count'] += tempCaseLog[i]['#Slides'];
                        pathologists[$('#cyto').val()]['Workload'] += tempCaseLog[i]['Workload'];
                        finalCaseLog[i]['Pathologist'] = $('#cyto').val();
                        delete tempCaseLog[i]; 
                    }
                }
                if(pathologists[$('#cyto').val()]['Workload'] > workloadAverage && pathologistCount > 1){
                    pathologistCount--;
                    slideCount-= pathologists[$('#cyto').val()]['Slide Count'];
                    slideAverage = slideCount / pathologistCount;
                    workloadCount -= pathologists[$('#cyto').val()]['Workload'];
                    workloadAverage = workloadCount / pathologistCount;
                }
            }
            /* If there is a work from home pathologist, this code will assign 
            acceptible work from home cases that pathologist */
            if ($('#wfh').val() != ''){
                let remainingCompatible = {};
                for (j in tempCaseLog){
                    let compatible = true;
                    for (k in tempCaseLog[j]['Protocols']){
                        if (caseTypes[tempCaseLog[j]['Protocols'][k]]['Compatibility'].indexOf("Work from Home") == -1){
                            compatible = false;
                        }
                    }
                    if (compatible){
                        remainingCompatible[j] = tempCaseLog[j];
                    }
                }
                if (pathologists[$('#wfh').val()]['Workload'] < workloadAverage){
                const remainingCases = findBestCombo(remainingCompatible, Math.round(workloadAverage - pathologists[$('#wfh').val()]['Workload']));
                for (j in remainingCases){
                    pathologists[$('#wfh').val()]['Case List'].push(remainingCases[j]);
                    pathologists[$('#wfh').val()]['Slide Count'] += tempCaseLog[remainingCases[j]]['#Slides'];
                    pathologists[$('#wfh').val()]['Workload'] += tempCaseLog[remainingCases[j]]['Workload'];
                    finalCaseLog[remainingCases[j]]['Pathologist'] = $('#wfh').val();
                    delete tempCaseLog[remainingCases[j]]; 
                }
                if (pathologistCount > 1){
                pathologistCount--;
                slideCount-= pathologists[$('#wfh').val()]['Slide Count'];
                slideAverage = slideCount / pathologistCount;
                workloadCount -= pathologists[$('#wfh').val()]['Workload'];
                workloadAverage = workloadCount / pathologistCount;
                }
            }
            }
            /* If there is a Lake Forest pathologist taking cases, this code 
            will assign cases to that pathologist */
            if (pathologistList.indexOf("Lake Forest") != -1){
                let remainingCompatible = {};
                for (j in tempCaseLog){
                    let compatible = true;
                    for (k in tempCaseLog[j]['Protocols']){
                        if (caseTypes[tempCaseLog[j]['Protocols'][k]]['Compatibility'].indexOf("Lake Forest") == -1){
                            compatible = false;
                        }
                    }
                    if (compatible){
                        remainingCompatible[j] = tempCaseLog[j];
                    }
                }
                const remainingCases = findBestCombo(remainingCompatible, Math.round(workloadAverage - pathologists["Lake Forest"]['Workload']));
                for (j in remainingCases){
                    pathologists["Lake Forest"]['Case List'].push(remainingCases[j]);
                    pathologists["Lake Forest"]['Slide Count'] += tempCaseLog[remainingCases[j]]['#Slides'];
                    pathologists["Lake Forest"]['Workload'] += tempCaseLog[remainingCases[j]]['Workload'];
                    finalCaseLog[remainingCases[j]]['Pathologist'] = "Lake Forest";
                    delete tempCaseLog[remainingCases[j]];
                }
                if (pathologistCount > 1){
                    pathologistCount--;
                    slideCount-= pathologists["Lake Forest"]['Slide Count'];
                    slideAverage = slideCount / pathologistCount;
                    workloadCount -= pathologists["Lake Forest"]['Workload'];
                    workloadAverage = workloadCount / pathologistCount;
                }
            }
            /* If there is a pathologist on the bigs service, this code 
            will assign all bigs cases to that pathologist */
            if ($('#bigs').val() != ''){
                let remainingCompatible = {};
                for (j in tempCaseLog){
                    let compatible = true;
                    for (k in tempCaseLog[j]['Protocols']){
                        if (caseTypes[tempCaseLog[j]['Protocols'][k]]['Compatibility'].indexOf("Bigs") == -1){
                            compatible = false;
                        }
                    }
                    if (compatible){
                        remainingCompatible[j] = tempCaseLog[j];
                    }
                }
                if (pathologists[$('#bigs').val()]['Workload'] < workloadAverage){
                const remainingCases = findBestCombo(remainingCompatible, Math.round(workloadAverage - pathologists[$('#bigs').val()]['Workload']));
                for (j in remainingCases){
                    pathologists[$('#bigs').val()]['Case List'].push(remainingCases[j]);
                    pathologists[$('#bigs').val()]['Slide Count'] += tempCaseLog[remainingCases[j]]['#Slides'];
                    pathologists[$('#bigs').val()]['Workload'] += tempCaseLog[remainingCases[j]]['Workload'];
                    finalCaseLog[remainingCases[j]]['Pathologist'] = $('#bigs').val();
                    delete tempCaseLog[remainingCases[j]];
                }
                if (pathologists[$('#bigs').val()]['Workload'] > workloadAverage && pathologistCount > 1){
                    pathologistCount--;
                    slideCount-= pathologists[$('#bigs').val()]['Slide Count'];
                    slideAverage = slideCount / pathologistCount;
                    workloadCount -= pathologists[$('#bigs').val()]['Workload'];
                    workloadAverage = workloadCount / pathologistCount;
                }
            }
            }
            /* Assign remaining cases */
            for (p in pathologistList){
                if (pathologists[pathologistList[p]]['Workload'] < workloadAverage && pathologistList[p] != 'Lake Forest'){
                    const remainingCases = findBestCombo(tempCaseLog, Math.round(workloadAverage - pathologists[pathologistList[p]]['Workload']));
                    for (j in remainingCases){
                        pathologists[pathologistList[p]]['Case List'].push(remainingCases[j]);
                        pathologists[pathologistList[p]]['Slide Count'] += tempCaseLog[remainingCases[j]]['#Slides'];
                        pathologists[pathologistList[p]]['Workload'] += tempCaseLog[remainingCases[j]]['Workload'];
                        finalCaseLog[remainingCases[j]]['Pathologist'] = pathologistList[p];
                        delete tempCaseLog[remainingCases[j]];
                    }
                }
            }
            
            if (Object.keys(finalCaseLog).length != 0){
                let table = '<table><tr><th>Case Number</th><th>Pathologist</th><th>Case Type</th></tr>'
                for (i in finalCaseLog){
                    table += `<tr><td>${i}</td><td>${finalCaseLog[i]['Pathologist']}</td><td>${finalCaseLog[i]['Protocols']}</td>`;
                }
                table += '</table>';
                $('#assignmentTable').html(table);
                $('.right').show();
                let table2 = '<hr><table><tr><th>Pathologist</th><th>Slide Count</th><th>Workload</th></tr>'
                for (i in pathologists){
                    table2 += `<tr><td>${i}</td><td>${pathologists[i]['Slide Count']}</td><td>${Math.round(pathologists[i]['Workload']/100)}</td>`;
                }
                table2 += '</table>';
                $('#slideCountTable').html(table2);
                $('#slideCountTable').show();
            } else {
                $('.right').hide();
                $('#slideCountTable').hide();
            }
        } else {
            $('.right').hide();
        }
    }
})
