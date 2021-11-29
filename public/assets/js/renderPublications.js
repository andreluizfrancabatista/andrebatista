var btnpubl = document.getElementById("btnpublications");
var publ = document.getElementById("publications");
var container = document.getElementById("selectedpublications");
var listofpubl = document.getElementById("listofpublications");

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

btnpubl.onclick = function () {
    //publ.innerHTML = "<h4 class='mb-4'>Publications</h4>";
    //publ.innerHTML += "<p>Novas publicações</p>";
    fetch('./assets/js/publications.json', {
    //fetch('../public/assets/js/publications.json', { <!--live server -->
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

                //Create authors
                //Criar função para formatar os nomes do autores
                var authors = formatauthors(datas.authors);
                var txtauthors = document.createTextNode(authors);

                //Create Title
                var msg = checkforperiod(datas.title);
                var txtitem = document.createTextNode(msg); //create text item

                //Create Journal
                var em = document.createElement("em");
                var msgem = checkforperiod(datas.journal);
                var msgitem = document.createTextNode(msgem);

                //Create button
                var btn = document.createElement("button");
                btn.classList.add("btn", "btn-link", "btn-sm");
                var idnum = "abstract" + index;
                btn.id = "btn" + index;
                btn.onclick = function () {
                    var elemlist = document.querySelectorAll('[id^="abstract"]');
                    var indexnum = this.id.slice(3);
                    elemlist[indexnum].classList.toggle("show");
                }
                var txtbtn = "Abstract";
                var btnitem = document.createTextNode(txtbtn);

                //Create Abstract <span>
                var span = document.createElement("span");
                span.classList.add("collapse", "text-info");
                span.id = idnum;
                //var txtabstract = datas.abstract + " Keywords: " + datas.keywords;
                var txtabstract = checkforperiod(datas.abstract);
                txtabstract += " Keywords: ";
                txtabstract += checkforperiod(datas.keywords);
                var spanitem = document.createTextNode(txtabstract);

                //Appending all
                item.appendChild(txtauthors); //append authors to li
                item.appendChild(txtyear); //append year to li
                item.appendChild(txtitem); //append txt to li
                em.appendChild(msgitem); //append txt to em
                btn.appendChild(btnitem);
                span.appendChild(spanitem);
                item.appendChild(em); //append em to li
                item.appendChild(btn); //append button to li
                item.appendChild(span);

                listofpubl.appendChild(item); //append li to ul


            });

        })
}

