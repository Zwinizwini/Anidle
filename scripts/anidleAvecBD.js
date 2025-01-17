/*function sendData() {
    var xhr = new XMLHttpRequest();
    var url = "anidle.php";
    var input = document.getElementById("iptJoueur").value;
    var params = "myInput=" + input;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("response").innerHTML = xhr.responseText;
        }
    };
    xhr.send(params);
}*/


function add() {
    var a = 1;
    var b = 2;

    window.location.href = "anidleN.php?var1=" + a + "&var2=" + b;
}


function gestion(anime) {
    let table = document.querySelector("tbody")
    let td = document.createElement("td")
    td.innerText = anime[0]
    table.appendChild(td)
}   


function anidle() {
    let nbChance = 10
    let i = 0
    // let maVariable = document.getElementById("maVariable").value;
    // console.log(maVariable);    

    // let monTableau = JSON.parse('<?php echo $monTableauJSON; ?>');
    // console.log(monTableau);

    let animeDevinerJSON = document.getElementById("animeChoisi").value
    let anime = JSON.parse(animeDevinerJSON)
    console.log(anime)

    let testBalise = document.querySelector("h1")
    testBalise.innerText = "Msg de Test"


    //document.cookie = "name = " + test permet d'envoyer un cookie

    let btnValid = document.getElementById("btnValid")
    let inputJoueur = document.getElementById("iptJoueur")
    btnValid.addEventListener("click", () => {
        add()
        // let rps = inputJoueur.value
        // inputJoueur.value = ``
        // console.log(rps)
        // let retourJS = document.getElementById("retourJS")
        // retourJS.value = rps
        let anime = listTest[i]
        gestion(anime)
        i++
    })


    
}

anidle()