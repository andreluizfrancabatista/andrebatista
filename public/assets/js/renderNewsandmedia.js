var btnnews = document.getElementById("btnnewsandmedia");
var news = document.getElementById("newsandmedia");
var container = document.getElementById("selectednewsandmedia");
var listofnews = document.getElementById("listofnewsandmedia");

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

btnnews.onclick = function () {
    fetch('./assets/js/newsandmedia.json', {
    //fetch('../public/assets/js/newsandmedia.json', { //live server
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.table(data);
            data.forEach(function (datas, index) {
                //Create li
                var item = document.createElement("li"); //create li item
                item.classList.add("text-dark");
                //Create year
                var year = "(" + datas.year + "). ";
                var txtyear = document.createTextNode(year);
                //Create Title
                var msg = checkforperiod(datas.title);
                var txtitem = document.createTextNode(msg); //create text item
                //Create Media
                var em = document.createElement("em");
                var msgem = checkforperiod(datas.media);
                var msgitem = document.createTextNode(msgem);

                //Create icon
                //<i class="fas fa-video"></i>
                //<i class="far fa-newspaper"></i>
                //<i class="fas fa-microphone-alt"></i>
                var icon = document.createElement("i");
                if (datas.media == "TV News") {
                    icon.classList.add("fas", "fa-video");
                } else if (datas.media == "Web News") {
                    icon.classList.add("fas", "fa-newspaper");
                } else if (datas.media == "Radio News"){
                    icon.classList.add("fas", "fa-microphone");
                }

                var msgicon = document.createTextNode("");

                //Create link
                var anchor = document.createElement("a");
                anchor.setAttribute("href", datas.link);
                anchor.setAttribute("target", "_blank");
                var msglink = "Link.";
                var msganchor = document.createTextNode(msglink);

                //Appending all
                item.appendChild(txtyear); //append year to li
                item.appendChild(txtitem); //append txt to li
                em.appendChild(msgitem); //append txt to em
                anchor.appendChild(icon);
                item.appendChild(em); //append em to li
                item.appendChild(anchor); //append link to li

                listofnews.appendChild(item); //append li to ul
            });
        })
}