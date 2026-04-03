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

let pageAmis
const pageAmisBalise = document.getElementById("pageAmis")
pageAmis = JSON.parse(pageAmisBalise.dataset.id)

console.log(pageAmis)

function swithBouton(pageAmis) {
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
            if (pageAmis) {
                console.log("click amis")
                anidexBalise.toggleClass("desac")
                titreBalise.toggleClass("desac")
            } else {
                console.log("click Perso")
                switch (i) {
                    case 0:
                        anidexBalise.removeClass("desac")
                        modifierBalise.addClass("desac")
                        titreBalise.addClass("desac")
                        break
                    case 1:
                        anidexBalise.addClass("desac")
                        modifierBalise.removeClass("desac")
                        titreBalise.addClass("desac")
                        break
                    default:
                        anidexBalise.addClass("desac")
                        modifierBalise.addClass("desac")
                        titreBalise.removeClass("desac")
                }
            }
        })
    }
}

swithBouton(pageAmis)

function affichageAnidex(listeAnime) {
    for (let i=0; i<listeAnime.length; i++) {
        const anime = listeAnime[i]
        const anidex = document.getElementById("affichageAnidex")
        const animeElement = document.createElement("article")
        const imgElement = document.createElement("img")
        imgElement.src = anime.img
        const lienElement = document.createElement("a")
        lienElement.href = `https://myanimelist.net/anime/${anime.id}`
        lienElement.target = "_blank"

        anidex.appendChild(animeElement)
        animeElement.appendChild(lienElement)
        lienElement.appendChild(imgElement)
    }
}

function affichageTitrePerso(listeTitre) {
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

function affichageTitreAmis(listeTitre) {
    listeTitre.forEach(titre => {
        if (listeTitreJ.includes(titre[0])) {
            const zoneTitre = document.querySelector(".affichageTitre")
            const btnTitre = document.createElement("article")
            btnTitre.innerText = titre[1]
            btnTitre.classList.add("fondActiver")
            zoneTitre.append(btnTitre)
        }
    })
}


let listeAnime = []
listeIdAnime.forEach((anime_id) => {
    listeAnime.push(DonneeAnime.find((id) => id.id == anime_id))
})


affichageAnidex(listeAnime)
pageAmis ? affichageTitreAmis(listeTitreN) : affichageTitrePerso(listeTitreN)

const listeGenre = ["Adventure","Drama","Fantasy","Action","Sci-Fi","Suspense","Comedy","Romance","Supernatural","Award Winning",
    "Mystery","Sports","Slice of Life","Ecchi","Gourmet","Horror","Avant Garde","Boys Love","Girls Love"
]


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
        listeTrier = listeCopy.filter((anime) => anime.genre.includes(valeur))
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
                return a.annee - b.annee
            })
            $("#date img").attr("src" , "../images/angle-vers-le-haut.png")
            index1++
        } else {
            listeTrier.sort(function (a,b) {
                return b.annee - a.annee
            })
            $("#date img").attr("src" , "../images/angle-vers-le-bas.png")
            index1++
        }
        affichageAnidex(listeTrier)
    })
    $("#note").on("click", () => {
        activactionBtn("date","defaut","note")
        document.getElementById("affichageAnidex").innerHTML = ''
        if (index2%2 == 0) {
            listeTrier.sort(function (a,b) {
                return b.note - a.note
            })
            $("#note img").attr("src" , "../images/angle-vers-le-bas.png")
            index2++
        } else {
            listeTrier.sort(function (a,b) {
                return a.note - b.note
            })
            $("#note img").attr("src" , "../images/angle-vers-le-haut.png")
            index2++
        }
        affichageAnidex(listeTrier)
    })
}

btnTriage(listeAnime,listeCopy)

let btnTitreAll = document.querySelectorAll(".titre button")
for (let i=0;i<btnTitreAll.length; i++) {
    btnTitreAll[i].addEventListener("click", () => {
        $(".compteTitre span").text(listeTitreN[i][1])
        if (i >= 5) {
            $(".badge").attr("src", "../images/badge/titre"+listeTitreN[0][0]+".jpg")
        } else {
            $(".badge").attr("src", "../images/badge/titre"+listeTitreN[i][0]+".jpg")
        }
        $.post('../traitement.php', {titre: listeTitreN[i][0]})
    })
}




/*--------------------------------------------*/



function ajoutBg() {
    const bg = document.getElementById("bg")
    bg.addEventListener('change', (event) => {
    let bdTab = localStorage.getItem("backgroundImage")
    let bg
    if (bdTab === null) {
        console.log("if")
        bg = {"tab": [],"index": -1, "bg": 0}
        localStorage.setItem('backgroundImage',JSON.stringify(bg))
    } else {
        console.log("else")
        bg = JSON.parse(bdTab)
    }
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result;
                
                const index = (bg.index + 1) % 3
                bg.index = index
                bg.tab[bg.index] = base64String
                bg.bg = index
                localStorage.setItem('backgroundImage', JSON.stringify(bg));
                setBackgroundImage();
                affichageBg()
            }

            reader.readAsDataURL(file);
        
        }
    });

}



const bgObject = localStorage.getItem('backgroundImage')
const bgObjectParse = JSON.parse(bgObject)
if (bgObjectParse == null || bgObjectParse.tab.length < 3) {
    const fileBg = $('<input>', {
        type: 'file',
        name: 'bg',
        id: 'bg'
    })
    $('.modifier').append(fileBg)
    ajoutBg()
}

const btnDefaut = $('.btnDefaut')
btnDefaut.on('click', () => {
    btnDefaut.addClass('animate__headShake')
    setTimeout(() => {
        btnDefaut.removeClass('animate__headShake')
    },1000)
    const bgObject = localStorage.getItem('backgroundImage')
    const bgObjectParse = JSON.parse(bgObject)
    bgObjectParse.bg = 3
    localStorage.setItem('backgroundImage', JSON.stringify(bgObjectParse))
    setBackgroundImage()
})


function affichageBg() {
    const bgObject = localStorage.getItem('backgroundImage')
    const bgObjectParse = JSON.parse(bgObject)
    $('.bgAffichage').html('')
    let index = 0
    if (bgObjectParse != null  && bgObjectParse.tab.length > 0) {
        bgObjectParse.tab.forEach(img => {
            const div = $("<div>", {
                class: 'divBg',
                data_bg: `${index}`,
                style: 'position: relative; padding:0px'
            })
            const imgBg = $('<img>', {
                class: 'imgBg'
            })
            imgBg.attr('src', img)
            const points = $('<img>', {
                class: 'points',
                style: 'width: 32px; height: 32px'
            })
            points.attr('src', '../images/3points.png')
            $(".bgAffichage").append(div)
            div.append(imgBg)
            div.append(points)
            index++
        })
        pointMenu() 

    }
}


affichageBg()


function saveAutreBg(index) {
    const input = document.querySelector(`div[data_bg='${index}'] input`)

    document.querySelector(`div[data_bg='${index}'] label`)
    .addEventListener('click', () => {
        input.click()
    })
    input.addEventListener('change', (event) => {
        let bdTab = localStorage.getItem("backgroundImage")
        let bg = JSON.parse(bdTab)
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result;                
                bg.tab[index] = base64String
                localStorage.setItem('backgroundImage', JSON.stringify(bg));
                affichageBg()
            }

            reader.readAsDataURL(file);
        
        }
    })
}



function changerBg(index) {
    const bgObject = localStorage.getItem('backgroundImage')
    const bgObjectParse = JSON.parse(bgObject)
    
    document.querySelector(`div[data_bg='${index}'] button`)
    .addEventListener('click', () => {
        bgObjectParse.bg = index
        localStorage.setItem('backgroundImage',JSON.stringify(bgObjectParse))
        $('.points').removeClass('fond')
        setBackgroundImage()
        document.querySelectorAll('.menuPopup').forEach(element => {
            element.remove();
        });
        
    })
}

function menu(index) {
    document.querySelectorAll('.menuPopup').forEach(element => {
        element.remove();
    });
    const div = document.createElement('div')
    div.style = 'padding: 0px;'
    div.classList.add('menuPopup')
    const input = document.createElement('input')
    input.type = 'file'
    input.style.display = 'none'
    const buttonInput = document.createElement('label')
    buttonInput.textContent = 'Ajouter'
    const button = document.createElement('button')
    button.textContent = 'Appliquer'
    div.appendChild(input)
    div.appendChild(buttonInput)
    div.appendChild(button)
    document.querySelector(`div[data_bg='${index}']`).appendChild(div)
    changerBg(index)
    saveAutreBg(index)
}

function pointMenu() {
    const img = document.querySelectorAll('.points')
    for (let i=0;i<img.length;i++) {
        img[i].addEventListener('click', () => {
            console.log('menu point');
            console.log('------------------');
            
            img.forEach(e => {
                e.classList.remove('fond')
            })
            img[i].classList.add('fond')
            menu(i)
        })
    }
}


