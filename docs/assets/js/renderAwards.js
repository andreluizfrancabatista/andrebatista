var btnawards = document.getElementById("btnawards");
var awards = document.getElementById("awards");
var container = document.getElementById("selectedawards");
var listofawards = document.getElementById("listofawards");

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

btnawards.onclick = function () {
    listofawards.innerHTML = "";

    fetch('./assets/js/awards.json', {
    //fetch('../public/assets/js/awards.json', { //live server
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            //console.table(data);

            data.forEach(function (datas, index) {
                //create li
                var item = document.createElement("li"); //create li item
                item.classList.add("text-dark");

                //Create icon
                //<i class="fas fa-trophy"></i> //Award
                //<i class="fas fa-hand-holding-usd"></i> //Grant
                var icon = document.createElement("i");
                if (datas.type == "Grant") {
                    icon.classList.add("fas", "fa-hand-holding-usd");
                } else if (datas.type == "Award") {
                    icon.classList.add("fas", "fa-trophy");
                }
                var msgicon = document.createTextNode("");

                //Create date
                var date = " (" + datas.date + ") ";
                var txtdate = document.createTextNode(date);

                //Create Title
                if (datas.type == "Grant") {
                    var msg = checkforperiod(datas.title);
                } else if (datas.type == "Award") {
                    var msg = datas.title + ": ";
                }
                
                var txtitem = document.createTextNode(msg); //create text item

                //Create work and event
                if (datas.type == "Grant") {
                    var work = "";
                } else if (datas.type == "Award") {
                    var work = datas.work;
                    work += ", presented at " + checkforperiod(datas.event);
                }
                var txtwork = document.createTextNode(work);

                //Appending all
                item.appendChild(icon); //append icon to li
                item.appendChild(txtdate); //append year to li
                item.appendChild(txtitem); //append txt to li
                item.appendChild(txtwork); //append work to li
                //em.appendChild(msgitem); //append txt to em
                //anchor.appendChild(icon);
                //item.appendChild(em); //append em to li
                //item.appendChild(anchor); //append link to li

                listofawards.appendChild(item); //append li to ul
            });
            
        })

}