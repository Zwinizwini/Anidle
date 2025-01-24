const listeBalise = document.getElementById("listeAnime")
let listeAnimeTemp = listeBalise.dataset.id
let listeIdAnime = JSON.parse(listeAnimeTemp)
console.log(listeIdAnime)

let anidexBalise = $(".anidex")
let modifierBalise = $(".modifier")

let btnMenu = document.querySelectorAll(".changement button")
for (let i=0; i<btnMenu.length; i++) {
    btnMenu[i].addEventListener("click", () => {
        btnMenu[i].classList.add("actif")
        btnMenu[i].classList.remove("nonActif")
        btnMenu[(i+1)%2].classList.remove("actif")
        btnMenu[(i+1)%2].classList.add("nonActif")
        if (i == 0) {
            anidexBalise.removeClass("desac")
            modifierBalise.addClass("desac")
        } else {
            anidexBalise.addClass("desac")
            modifierBalise.removeClass("desac")
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



