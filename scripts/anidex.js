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
        const nomElement = document.createElement("p")
        nomElement.innerText = anime[0][0]
        const lienElement = document.createElement("a")
        lienElement.href = `https://myanimelist.net/anime/${anime[8]}`
        lienElement.target = "_blank"

        anidex.appendChild(animeElement)
        animeElement.appendChild(lienElement)
        animeElement.appendChild(nomElement)
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
            titre[2] != null ? btnTitre.ariaLabel = "guess nécéssaire : " + titre[2] : btnTitre.ariaLabel = "guess nécéssaire : " + titre[3]
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


const listeTrier = Array.from(listeAnime)
const trier = document.getElementById("trier")
trier.addEventListener("input", () => {
    let valeur = trier.value
    switch (valeur) {
        case "0":
            document.getElementById("affichageAnidex").innerHTML = ''
            affichageAnidex(listeAnime)
            break
        case "1":
            document.getElementById("affichageAnidex").innerHTML = ''
            listeTrier.sort(function (a,b) {
                return a[1] - b[1]
            })
            console.log(listeTrier)
            affichageAnidex(listeTrier)
            break
        case "2":
            document.getElementById("affichageAnidex").innerHTML = ''
            listeTrier.sort(function (a,b) {
                return b[6] - a[6]
            })
            console.log(listeTrier)
            affichageAnidex(listeTrier)
            break

    }
})


affichageAnidex(listeAnime)

affichageTitre(listeTitreN)

let btnTitreAll = document.querySelectorAll(".titre button")
for (let i=0;i<btnTitreAll.length; i++) {
    btnTitreAll[i].addEventListener("click", () => {
        console.log("ouhou")
        $(".compteTitre span").text(listeTitreN[i][1])
        $.post('traitement.php', {titre: listeTitreN[i][1]})
    })
}



