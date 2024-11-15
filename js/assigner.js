$(document).ready(function() {

    let pathologists = {
        "Dr. Moravek": {},
        "Dr. Mujeeb": {},
        "Dr. Rehman": {},
        "Dr. Bertram": {},
        "Lake Forest": {}
    }

    let caseLog = {}

    const caseTypes = {
        case1: {}
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
                caseObject[headers[counter]] = rows[i];
                counter++;
            } else {
                caseObject[headers[counter]] = rows[i].split("\n")[0];
                caseLog[caseNumber] = caseObject;
                caseNumber = rows[i].split("\n")[1];
                counter = 1;
                caseObject = {};
            }
        }
    });

    $('.select').change(function(){
        let tempCaseLog = {...caseLog};
        const value = this.value;
        const id = this.id;
        $('.select').each(function(){
            if (this.value == value && this.id != id){
                this.value = ' ';
            }
        })

        let slideCount = 0;
        for (i in tempCaseLog){
            slideCount += parseInt(tempCaseLog[i]['#Slides']);
        }
        let pathologistList = [];
        $('.select').each(function(){
            if (this.value != ''){
                pathologistList.push(this.value);
            }
        })

        if (pathologistList.length != 0){
            let slideAverage = slideCount / pathologistList.length;
            for (i in pathologistList){
                pathologists[pathologistList[i]]['Slide Count'] = 0;
                pathologists[pathologistList[i]]['Case List'] = [];
                for (j in tempCaseLog){
                    if (pathologists[pathologistList[i]]['Slide Count'] < slideAverage){
                        pathologists[pathologistList[i]]['Case List'].push(j)
                        pathologists[pathologistList[i]]['Slide Count'] += parseInt(tempCaseLog[j]['#Slides']);
                        caseLog[j]['Pathologist'] = pathologistList[i];
                        delete tempCaseLog[j]; 
                    }
                }
            }
            let table = '<table><tr><th>Case Number</th><th>Pathologist</th><th>Case Type</th></tr>'
            for (i in caseLog){
                table += `<tr><td>${i}</td><td>${caseLog[i]['Pathologist']}</td><td>${caseLog[i]['Protocols'].replace(/['"]+/g, '')}</td>`;
            }
            table += '</table>';
            $('#assignmentTable').html(table);
        }

    })

})
