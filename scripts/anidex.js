const listeBalise = document.getElementById("listeAnime")
let listeAnimeTemp = listeBalise.dataset.id
let listeIdAnime = JSON.parse(listeAnimeTemp)
console.log(listeIdAnime)

const listeTitreJoueurBalise = document.getElementById("listeTitreJoueur")
let listeTitreJTemp = listeTitreJoueurBalise.dataset.id
let listeTitreJ = JSON.parse(listeTitreJTemp)
console.log(listeTitreJ)

const listeTitreNomBalise = document.getElementById("listeTitreNom")
let listeTitreNTemp = listeTitreNomBalise.textContent
let listeTitreN = JSON.parse(listeTitreNTemp)
console.log(listeTitreN)


let anidexBalise = $(".anidex")
let modifierBalise = $(".modifier")
let titreBalise = $(".titre")

let btnMenu = document.querySelectorAll(".changement button")
for (let i=0; i<btnMenu.length; i++) {
    btnMenu[i].addEventListener("click", () => {
        btnMenu.forEach(el => {
            el.classList.remove("actif")
            el.classList.add("nonActif")
        })
        btnMenu[i].classList.add("actif")
        btnMenu[i].classList.remove("nonActif")
        if (i == 0) {
            anidexBalise.removeClass("desac")
            modifierBalise.addClass("desac")
            titreBalise.addClass("desac")
        } else if (i == 1) {
            anidexBalise.addClass("desac")
            modifierBalise.removeClass("desac")
            titreBalise.addClass("desac")
        } else {
            anidexBalise.addClass("desac")
            modifierBalise.addClass("desac")
            titreBalise.removeClass("desac")
        }
    })
}

function affichageAnidex(listeAnime) {
    for (let i=0; i<listeAnime.length; i++) {
        const anime = listeAnime[i]
        const anidex = document.getElementById("affichageAnidex")
        const animeElement = document.createElement("article")
        const imgElement = document.createElement("img")
        imgElement.src = anime[10]
        const lienElement = document.createElement("a")
        lienElement.href = `https://myanimelist.net/anime/${anime[8]}`
        lienElement.target = "_blank"

        anidex.appendChild(animeElement)
        animeElement.appendChild(lienElement)
        lienElement.appendChild(imgElement)
    }
}

function affichageTitre(listeTitre) {
    for (let i=0; i<listeTitre.length; i++) {
        const titre = listeTitre[i]
        const zoneTitre = document.querySelector(".affichageTitre")
        const btnTitre = document.createElement("button")
        btnTitre.innerText = titre[1]
        if (!listeTitreJ.includes(titre[0])) {
            btnTitre.disabled = true
            btnTitre.classList.add("fondDesac")
            titre[2] != null ? btnTitre.ariaLabel = "guess : " + titre[2] : btnTitre.ariaLabel = "guess : " + titre[3]
        } else {
            btnTitre.classList.add("fondActiver")
        }
        zoneTitre.appendChild(btnTitre)
    }
}





let listeAnime = []
listeIdAnime.forEach((anime_id) => {
    listeAnime.push(listTest.find((id) => id[8] == anime_id))
})


affichageAnidex(listeAnime)
affichageTitre(listeTitreN)

const listeGenre = ["Adventure","Drama","Fantasy","Action","Sci-Fi","Suspense","Comedy","Romance","Supernatural","Award Winning",
    "Mystery","Sports","Slice of Life","Ecchi","Gourmet","Horror","Avant Garde","Boys Love","Girls Love"
]

console.log(listeGenre.length)

const select = document.getElementById("trier")
listeGenre.forEach((genre) => {
    const option = document.createElement("option")
    option.value = genre
    option.innerText = genre
    select.appendChild(option)
})


let conditionListeTrier,listeTrier
const listeCopy = Array.from(listeAnime)
const trier = document.getElementById("trier")
trier.addEventListener("input", () => {
    let valeur = trier.value
    if (valeur == "0") {
        conditionListeTrier = false
        $("#affichageAnidex").html('')
        affichageAnidex(listeCopy)
        btnTriage(listeAnime,listeCopy)
    } else {
        conditionListeTrier = true
        listeTrier = listeCopy.filter((anime) => anime[2].includes(valeur))
        $("#affichageAnidex").html('')
        affichageAnidex(listeTrier)
        btnTriage(listeAnime,listeTrier)
    }
})


function activactionBtn(btn1,btn2,btn3) {
    $(`#${btn1}`).removeClass("fondActiver")
    $(`#${btn2}`).removeClass("fondActiver")
    $(`#${btn1}`).addClass("btnDesac")
    $(`#${btn2}`).addClass("btnDesac")
    $(`#${btn3}`).addClass("fondActiver")
    $(`#${btn3}`).removeClass("btnDesac")
}


function btnTriage(listeAnime,listeTrier) {
    let index1 = 0
    let index2 = 0
    $("#defaut").on("click", () => {
        activactionBtn("date","note","defaut")
        document.getElementById("affichageAnidex").innerHTML = ''
        affichageAnidex(listeAnime)
    })
    $("#date").on("click", () => {
        activactionBtn("defaut","note","date")
        document.getElementById("affichageAnidex").innerHTML = ''
        if (index1%2 == 0) {
            listeTrier.sort(function (a,b) {
                return a[1] - b[1]
            })
            $("#date img").attr("src" , "./images/angle-vers-le-haut.png")
            index1++
        } else {
            listeTrier.sort(function (a,b) {
                return b[1] - a[1]
            })
            $("#date img").attr("src" , "./images/angle-vers-le-bas.png")
            index1++
        }
        affichageAnidex(listeTrier)
    })
    $("#note").on("click", () => {
        activactionBtn("date","defaut","note")
        document.getElementById("affichageAnidex").innerHTML = ''
        if (index2%2 == 0) {
            listeTrier.sort(function (a,b) {
                return b[6] - a[6]
            })
            $("#note img").attr("src" , "./images/angle-vers-le-haut.png")
            index2++
        } else {
            listeTrier.sort(function (a,b) {
                return a[6] - b[6]
            })
            $("#note img").attr("src" , "./images/angle-vers-le-bas.png")
            index2++
        }
        affichageAnidex(listeTrier)
    })
}

btnTriage(listeAnime,listeCopy)

let btnTitreAll = document.querySelectorAll(".titre button")
for (let i=0;i<btnTitreAll.length; i++) {
    btnTitreAll[i].addEventListener("click", () => {
        console.log("ouhou")
        $(".compteTitre span").text(listeTitreN[i][1])
        $.post('traitement.php', {titre: listeTitreN[i][1]})
    })
}


const objet = [{nom:"test Nom", age: 18, genre: ["test","fate"]}, {nom:"object", age: 494, genre:[]}]
console.log(objet[0].genre)