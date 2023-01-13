var btnresearch = document.getElementById("btnresearch");
var research = document.getElementById("research");
var container = document.getElementById("selectedresearch");
//var listofresearch = document.getElementById("listofresearch");

function checkforperiod(text) {
    if (text.slice(-1) == ".") {
        return text;
    } else {
        return text + ". ";
    }
}

function formatauthors(text) {
    var allnames = "";
    var lastname = "";
    var listofauthors = text.split(",");
    listofauthors.forEach(function (value, index) {
        listofauthors[index] = listofauthors[index].trim();
    });
    listofauthors.forEach(function (value, index) {
        const names = value.split(" ");
        lastname = names.pop();
        lastname += ",";

        names.forEach(function (val, ind) {
            lastname += " " + val.charAt(0) + ".";
        });
        allnames += lastname + "; ";
    });
    return allnames.slice(0, -2) + " ";
}

btnresearch.onclick = function () {
    container.innerHTML = "";

    fetch('./assets/js/research.json', {
    //fetch('../public/assets/js/research.json', { //< !--live server-- >
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            //console.table(data);
            data.forEach(function (datas, index) {
                //Create divborder
                var divborder = document.createElement("div");
                divborder.classList.add("border", "p-4", "my-4", "row");

                //Create divyear
                var divyear = document.createElement("div");
                divyear.classList.add("col-md-1", "p-md-0", "m-md-0");
                var year = datas.start_date + "-" + datas.end_date;
                var txtdivyear = document.createTextNode(year);

                //Create divproject
                var divproject = document.createElement("div");
                divproject.classList.add("col-md-11");

                //Create p title
                var ptitle = document.createElement("p");
                var title = checkforperiod(datas.title);
                var txtptitle = document.createTextNode(title);
                ptitle.appendChild(txtptitle);

                //Create p description
                var pdescription = document.createElement("p");

                //Create span for Description
                var spandescription = document.createElement("span");
                spandescription.classList.add("fake-button");
                var idnum = "description" + index;
                spandescription.id = "btn" + index;
                spandescription.onclick = function () {
                    var elemlist = document.querySelectorAll('[id^="description"]');
                    var indexnum = this.id.slice(3);
                    elemlist[indexnum].classList.toggle("show");
                }
                var txtspandescription = document.createTextNode("Description.");
                spandescription.appendChild(txtspandescription);

                //Create span for text of description
                var spantxtdescription = document.createElement("span");
                spantxtdescription.classList.add("collapse");
                spantxtdescription.id = idnum;
                var description = " " + checkforperiod(datas.description);
                var txtspandescription = document.createTextNode(description);
                spantxtdescription.appendChild(txtspandescription);

                //Append both span into p description
                pdescription.appendChild(spandescription);
                pdescription.appendChild(spantxtdescription);

                //Create p status
                var pstatus = document.createElement("p");
                var status = "Status: " + checkforperiod(datas.status);
                var txtstatus = document.createTextNode(status);
                pstatus.appendChild(txtstatus);

                //Create p students
                var pstudents = document.createElement("p");
                var students = "Students: " + checkforperiod(datas.students);
                var txtstudents = document.createTextNode(students);
                pstudents.appendChild(txtstudents);

                //Append all p into divproject
                divproject.appendChild(ptitle);
                divproject.appendChild(pdescription);
                divproject.appendChild(pstatus);
                divproject.appendChild(pstudents);

                //Append divyear, divproject into divborder
                divborder.appendChild(txtdivyear);
                divborder.appendChild(divproject);

                //Append divborder into container
                container.appendChild(divborder);
            });


            
        })

}