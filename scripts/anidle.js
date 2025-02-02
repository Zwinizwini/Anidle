function testGenreTheme(listeTest, genres) {
    let oneGenresFound = false;
    genres.forEach((element) => {
        if (listeTest.includes(element)) {
            oneGenresFound = true;
        }
    });
    return oneGenresFound;
}
  
function filtre(annee,genres,theme,source) {
    let listeFiltrer = []
    if (annee != null || annee != undefined) {
      listeFiltrer = listTest.filter((anime) => anime[1] >= annee)
    }
    if (source.length > 0) {
      if (listeFiltrer.length > 0) {
        listeFiltrer = listeFiltrer.filter((anime) => anime[5] == source)
      } else {
        listeFiltrer = listTest.filter((anime) => anime[5] == source)
      }
    }
    if (genres.length > 0) {
      if (listeFiltrer.length != 0) {
        listeFiltrer = listeFiltrer.filter((anime) => testGenreTheme(anime[2],genres))
      } else {
        listeFiltrer = listTest.filter((anime) => testGenreTheme(anime[2],genres))
      }
    }
    if (theme.length > 0) {
      if (listeFiltrer.length != 0) {
        listeFiltrer = listeFiltrer.filter((anime) => testGenreTheme(anime[3],theme))
      } else {
        listeFiltrer = listTest.filter((anime) => testGenreTheme(anime[3],theme))
      }
    }
    return listeFiltrer
}


//fonction pour recuperer l'indice de l'anime rentré par le joueur
function recupAnime(inputJoueur) {
    for (let i=0;i<listTest.length;i++) {
        if (listTest[i][0].includes(inputJoueur)) {
            return listTest[i]
        }
    }
    return null
}

//fonction gérant la validité de chaque valeur d'un anime et affichant le resultat
function gestionValide(listeInput,animeDeviner) {
    let tbodyBalise = document.querySelector("tbody")
    let trBalsie = document.createElement("tr")
    let tr = `<tr>`

    
    for (let i = 0; i < 7; i++) {
            let valeur = listeInput[i]
            if (typeof valeur == "string") {
                if (animeDeviner.includes(valeur)) {
                    tr += `<td class="valide"> ${valeur}</td>`
                } else {
                    tr += `<td class="faux"> ${valeur}</td>`
                }
            } else if (typeof valeur == "number") {
                    if (valeur > animeDeviner[i]) {
                        tr += `<td class="faux"> ${valeur} <img src="images/fleche_bas.png"></td>`
                    } else if (valeur == animeDeviner[i]) {
                        tr += `<td class="valide"> ${valeur}</td>`
                    }
                    else {
                        tr += `<td class="faux"> ${valeur} <img src="images/fleche_haut.png"></td>`
                    }
                } else {
                    if (i == 0 && (animeDeviner[i].includes(valeur[0]) || animeDeviner[i].includes(valeur[1]))) {
                        tr += `<td class="valide"> ${valeur[0]}</td>`
                    } else if (i == 0 && !(animeDeviner[i].includes(valeur[0]) || animeDeviner[i].includes(valeur[1]))) {
                        tr += `<td class="faux"> ${valeur[0]}</td>`
                    } else {
                    tr += `<td>`
                    valeur.forEach((genre) => {
                        if (animeDeviner[i].includes(genre)) {
                            tr += `<div class="valide"> ${genre}</div>`
                        } else {
                            tr += `<div class="faux"> ${genre}</div>`
                        }
                    })
                    tr += `</td>`
                }
            }
        };
    tr += `</tr>`
    trBalsie.innerHTML = tr
    tbodyBalise.prepend(trBalsie)
}


//fonction affichant la tentative à laquelle le joueur est sur son ecran
function tentativeAfficher(tentative) {
    let tentativeBalise = document.querySelector("h2 span")
    tentativeBalise.innerText = tentative
}

async function recupImage(animeId,resultat) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      const data = await response.json();
      console.log(data)
      const lienImage = data.data.images.webp.large_image_url
      const url = data.data.url
      console.log(lienImage)
      if (resultat === 0) {
        $(".resultat a").attr("href",url)
        let imageBalsie = document.querySelector(".resultat img")
        imageBalsie.src = lienImage
      } else {
        let imageBalsie = document.querySelector(".zoneIndice img")
        imageBalsie.src = lienImage
      }
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
}

async function recupReview(animeId) {
    let overalmin = 10000
    let pireReviews = ""
    try {
        const responseReview = await fetch (`https://api.jikan.moe/v4/anime/${animeId}/reviews`)
        const dataReview = await responseReview.json()
        dataReview.data.forEach (review => {
            if (review.reactions.overall < overalmin) {
                pireReviews = review.review
            }
        })
        let reviewBalise = document.getElementById("review")
        reviewBalise.innerHTML = pireReviews
    } catch (error) {
        console.error('Error fecthing data:',error)
    }
}

async function recupPerso(animeId) {
    let favorite = 100000
    let personnage = ""
    try {
        const reponsePerso = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`)
        const dataPerso = await reponsePerso.json()
        const persoMain = dataPerso.data.filter(perso => perso.role == "Main")
        persoMain.forEach(perso => {
            if (perso.favorites < favorite) {
                console.log("Hello IF")
                personnage = perso.character.name
                favorite = perso.favorites
                console.log("favorite = " + favorite)
            }
        })
        document.getElementById("review").innerText = personnage
    } catch (error) {
        console.error('Error fecthing data:',error)
    }
}

async function recupURLTrailer(animeURL) {
    if(animeURL == "null") {
        changerVideo("dQw4w9WgXcQ")
    } else {
        changerVideo(animeURL)
    }
}

function ajoutTitreGenre(listeCG,listeIdAnime,listeTitreJ) {
    console.log(listeCG)
    console.log(listeIdAnime)
    console.log(listeTitreJ)
    let listeAnime = []
    listeIdAnime.forEach((anime_id) => {
        listeAnime.push(listTest.find((id) => id[8] == anime_id))
    })

    listeCG.forEach(element => {
        if (!listeTitreJ.includes(element[0])) {
            console.log(element[3] +" : "+listeAnime.filter((anime) => anime[2].includes(element[3])).length)
            const nbGenre = listeAnime.filter((anime) => anime[2].includes(element[3])).length
            if (nbGenre >= element[2]) {
                listeTitreJ.push(element[2])
                $.post('traitement.php', {idTitre: element[0]})
            }
        }
    })
}


function anidle(animeDeviner) {
    //Initialisation
    let score = 0
    let scoreMax = 0
    let tentative = 0
    let tableauBalise = $("table")
    let suiteBalise = $("#resultat")
    let btnValid = $("#btnValid")
    let inputJoueur = $("#iptJoueur")
    let paragrapheAnimeMis = $("#animeDejaMis")
    let scoreBalise = $("#score")
    let conteneurScoreBalise = $(".score")
    let listeAnimeMis = []
    let zoneIndiceBalise = $(".zoneIndice")

    //Recup données base de donnée
    let element = document.getElementById('monElement');
    let id = element.dataset.id;
    let anime_id = JSON.parse(id)
    let nbGuessElement = document.getElementById('nb_guess');
    let nbGuessId = nbGuessElement.dataset.id;
    let nbGuess = JSON.parse(nbGuessId)
    const listeCGBalise = document.getElementById("listeCG")
    let listeCGTemp = listeCGBalise.textContent
    let listeCG = JSON.parse(listeCGTemp)
    const listeTitreJoueurBalise = document.getElementById("listeTitreJoueur")
    let listeTitreJTemp = listeTitreJoueurBalise.dataset.id
    let listeTitreJ = JSON.parse(listeTitreJTemp)

    /* Permet d'enlever des classe avec JQuery (plus joli et concis)
    let test = $(".zoneIndice")
    console.log(test)
    test.removeClass("desac")
    */
    
    //Action a effectuer lorsque l'utilisateur valide sa réponse
    $(".proposition").on("submit", function (event) {
        event.preventDefault()
        tableauBalise.removeClass("desac")
        let rps = inputJoueur.val()
        inputJoueur.val('')

        //Verification que la reponse du joueur existe et est non null
        if ((listeNom.includes(rps) && rps != null) || rps == "kamotama" || rps == "perdu") {

            //Verification que l'anime n'a pas déjà étais mis
            if (listeAnimeMis.includes(rps)) {
                paragrapheAnimeMis.text(`L'anime ${rps} a déjà été selectionner par le joueur`)
            } else {
                paragrapheAnimeMis.text('')
                //Condition de victoire et de defaite
                if (animeDeviner[0].includes(rps) || tentative == 19 || rps == "kamotama" || rps == "perdu") {
                    btnValid.prop("disabled",true)
                    suiteBalise.removeClass("desac")
                    zoneIndiceBalise.addClass("desac")
                    if (animeDeviner[0].includes(rps) || rps == "kamotama") {
                        score++
                        if (!anime_id.includes(animeDeviner[8])) {
                            $.post('traitement.php', { nom: animeDeviner[8] })
                            ajoutTitreGenre(listeCG,anime_id,listeTitreJ)
                        }
                        nbGuess++
                        $.post('traitement.php', {nb_guess: nbGuess})
                        if (score > scoreMax) {
                            console.log("injection cookie")
                            document.cookie = `score=${score}`
                        }
                    } else {
                        if (score > scoreMax) {
                            document.cookie = `score=${score}`
                        }
                        score = 0
                    }
                    scoreBalise.text(score)
                    conteneurScoreBalise.removeClass("desac")
                }

                //Recuperation de l'anime mis par le joueur
                let animeInput = recupAnime(rps)
                //Insertion de l'anime input dans une liste de verification
                listeAnimeMis.push(animeInput[0][0])
                listeAnimeMis.push(animeInput[0][1])


                //Activation des boutons pour afficher des indices
                switch (tentative) {
                    case 6:
                        btnIndice[0].disabled = false
                        btnIndice[0].classList.add("fondActiver")
                        btnIndice[0].classList.remove("fondDesac")
                        break
                    case 9:
                        btnIndice[1].disabled = false
                        btnIndice[1].classList.add("fondActiver")
                        btnIndice[1].classList.remove("fondDesac")
                        break
                    case 14:
                        btnIndice[2].disabled = false
                        btnIndice[2].classList.add("fondActiver")
                        btnIndice[2].classList.remove("fondDesac")
                        break
                }

                tentative++
                gestionValide(animeInput,animeDeviner)
                tentativeAfficher(tentative)
            }
        }
        
    })

    //Recuperation des boutons d'indice
    let btnIndice = document.querySelectorAll(".indice button")
    btnIndice[0].disabled = true
    btnIndice[1].disabled = true
    btnIndice[2].disabled = true
    //Action pour bouton indice
    for (let i = 0; i < btnIndice.length; i++ ) {
        btnIndice[i].addEventListener("click", () => {
            // btnIndice[i+1].classList.add("souris")
            // btnIndice[i+1].classList.add("fond")
            zoneIndiceBalise.removeClass("desac")
            btnIndice[i].classList.remove("fondActiver")
            btnIndice[i].classList.add("fondDesac")
            btnIndice[i].disabled = true
            switch (i) {
                case 0:
                    recupURLTrailer(animeDeviner[9])
                    break
                case 1:
                    recupPerso(animeDeviner[8])
                    break
                case 2:
                    recupImage(animeDeviner[8],1)
            }
        })
    }

    //Action quand l'utilisateur passe a l'anime suivant
    let btnSuite = document.querySelector(".resultat button")
    btnSuite.addEventListener("click", () => {
        animeDeviner = restartGuess()
        tentative = 0
        listeAnimeMis = []
    })
    
}


//Remise a zero de tout l'affichage ainsi que reselection d'un anime
function restartGuess() {
    pauseVideo()
    $("#resultat").addClass("desac") 
    $("table").addClass("desac")

    $("tbody").html(``)

    $("#btnValid").prop("disabled",false)

    $("h2 span").text("0")

    $(".image-indice img").attr("src","")
    $("#review").text("")
    $("#zoneIndice").addClass("desac")

    let btnIndice = document.querySelectorAll(".indice button")
    btnIndice.forEach(btn => {
        btn.disabled = true
        btn.classList.remove("fondActiver")
        btn.classList.add("fondDesac")
    })

    let indexRan = getRandomInt(listeAnime.length)
    let animeDeviner = listeAnime[indexRan]
    recupImage(animeDeviner[8],0)
    return animeDeviner
}


//Recuperation de tout les nom des animes pour les inserer dans une liste
for (let i=0; i<listTest.length; i++) {
    listeNom.push(listTest[i][0][0])
    if (listTest[i][0][1] != null) {
        listeNom.push(listTest[i][0][1])
    }
}

$(function() {
    $("#iptJoueur").autocomplete({
        source: function(request, response) {
            var terms = request.term.toLowerCase(); // Convertit la requête en minuscules
            var results = $.ui.autocomplete.filter(listeNom, terms)
            response(results);
        }
    });
});


/*
async function citation () {
    const response = await fetch(`https://animechan.io/api/v1/quotes?anime=ReLife`)
    const quote = await response.json();
    console.log(quote)
}

citation()
*/

// anidle(animeDeviner)

let popupBalise = document.querySelector(".popupBackground")
let btnGenreBalise = document.querySelectorAll(".genre input")
let btnThemeBalise = document.querySelectorAll(".theme input")
let anneeBalise = document.getElementById("annee")
let sourceBalise = document.getElementById("source")
let btnStartGame = document.getElementById("startBtn")
let listeGenre = []
let listeTheme = []
let annee,source
let listeAnime = []

btnStartGame.addEventListener("click", () => {
    popupBalise.classList.add("desac")
    btnGenreBalise.forEach((genre) => {
        if (genre.checked) {
            listeGenre.push(genre.value)
        }
    })
    btnThemeBalise.forEach((theme) => {
        if (theme.checked) {
            listeTheme.push(theme.value)
        }
    })
    annee = anneeBalise.value
    source = sourceBalise.value
    console.log(`annee : ${annee}\nsource : ${source}\ngenre : ${listeGenre}\ntheme : ${listeTheme}`)

    listeAnime = filtre(annee,listeGenre,listeTheme,source)


    let indexRan = getRandomInt(listeAnime.length)
    let animeDeviner = listeAnime[indexRan]
    recupImage(animeDeviner[8],0)
    anidle(animeDeviner)
})

const volume = document.getElementById("volume")
console.log(volume)
volume.addEventListener("input", () => {
    console.log(volume.value)
    volumeVideo(100 - volume.value)
})

const listeCGBalise = document.getElementById("listeCG")
let listeCGTemp = listeCGBalise.textContent
let listeCG = JSON.parse(listeCGTemp)
console.log(listeCG)