import { recupAnime,recupNom,getRandomInt } from "./script.js";

function testGenreTheme(listeTest, genres) {
    let oneGenresFound = false;
    genres.forEach((element) => {
        if (listeTest.includes(element)) {
            oneGenresFound = true;
        }
    });
    return oneGenresFound;
}
  
function filtre(annee,genres,themes,source) {
    let listeFiltrer = []
    if (annee != null || annee != undefined) {
      listeFiltrer = DonneeAnime.filter((anime) => anime.annee >= annee)
    }
    if (source.length > 0) {
      if (listeFiltrer.length > 0) {
        listeFiltrer = listeFiltrer.filter((anime) => anime.source == source)
      } else {
        listeFiltrer = DonneeAnime.filter((anime) => anime.source == source)
      }
    }
    if (genres.length > 0) {
      if (listeFiltrer.length != 0) {
        listeFiltrer = listeFiltrer.filter((anime) => testGenreTheme(anime.genre,genres))
      } else {
        listeFiltrer = DonneeAnime.filter((anime) => testGenreTheme(anime.genre,genres))
      }
    }
    if (themes.length > 0) {
      if (listeFiltrer.length != 0) {
        listeFiltrer = listeFiltrer.filter((anime) => testGenreTheme(anime.theme,themes))
      } else {
        listeFiltrer = DonneeAnime.filter((anime) => testGenreTheme(anime.theme,themes))
      }
    }
    return listeFiltrer
}


//fonction gérant la validité de chaque valeur d'un anime et affichant le resultat
function gestionValide(listeInput,animeDeviner) {
    let tbodyBalise = document.querySelector("tbody")
    let trBalsie = document.createElement("tr")
    let tr = `<tr>`
    let index = 0

    
    for (const cle in listeInput) {
        if (cle != "id" && cle != "type" && cle != "img" && cle != "op") {
            
            index++
            console.log(index);

            const valeur = listeInput[cle]
            if (typeof valeur == "string") {
                if (animeDeviner[cle].includes(valeur)) {
                    tr += `<td class="valide fade-in fade-in-${index}"> ${valeur}</td>`
                } else {
                    tr += `<td class="faux fade-in fade-in-${index}"> ${valeur}</td>`
                }
            } else if (typeof valeur == "number") {
                    if (valeur > animeDeviner[cle]) {
                        tr += `<td class="faux fade-in fade-in-${index}"> ${valeur} <img src="../images/fleche_bas.png"></td>`
                    } else if (valeur == animeDeviner[cle]) {
                        tr += `<td class="valide fade-in fade-in-${index}"> ${valeur}</td>`
                    }
                    else {
                        tr += `<td class="faux fade-in fade-in-${index}"> ${valeur} <img src="../images/fleche_haut.png"></td>`
                    }
            } else {
                if (cle === "nom" && listeInput.id == animeDeviner.id) {
                    console.log(valeur[0])
                    tr += `<td class="valide fade-in fade-in-${index}"> ${valeur[0]}</td>`
                } else if (cle === "nom" && !(listeInput.id == animeDeviner.id)) {
                    console.log(valeur[0])
                    tr += `<td class="faux fade-in fade-in-${index}"> ${valeur[0]}</td>`
                } else {
                tr += `<td class="fade-in fade-in-${index}">`
                valeur.forEach((genre) => {
                    if (animeDeviner[cle].includes(genre)) {
                        tr += `<div class="valide "> ${genre}</div>`
                    } else {
                        tr += `<div class="faux "> ${genre}</div>`
                    }
                })
                tr += `</td>`
            }
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
        $(".image-indice img").removeClass("visible")
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
                personnage = perso.character.name
                favorite = perso.favorites
            }
        })
        $(".perso p").removeClass("visible")
        document.getElementById("review").innerText = personnage.replace(/(.*), (.*)/, "$2 $1")
    } catch (error) {
        console.error('Error fecthing data:',error)
    }
}

async function recupURLTrailer(animeURL) {
    if(animeURL == "null") {
        changerVideo("dQw4w9WgXcQ")
    } else {
        $("#volume").removeClass("visible")
        $(".cercle").removeClass("visible")
        changerVideo(animeURL)
    }
}

function ajoutTitreGenre(listeCG,listeIdAnime,listeTitreJ) {
    console.log(listeCG)
    console.log(listeIdAnime)
    console.log(listeTitreJ)
    let listeAnime = []
    listeIdAnime.forEach((anime_id) => {
        listeAnime.push(DonneeAnime.find((id) => id.id == anime_id))
    })

    listeCG.forEach(element => {
        if (!listeTitreJ.includes(element[0])) {
            console.log(element[3] +" : "+listeAnime.filter((anime) => anime.genre.includes(element[3])).length)
            const nbGenre = listeAnime.filter((anime) => anime.genre.includes(element[3])).length
            if (nbGenre >= element[2]) {
                listeTitreJ.push(element[2])
                $.post('../traitement.php', {idTitre: element[0]})
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
    let anime_id,nbGuess,listeCG,listeTitreJ
    const connecter = JSON.parse(document.getElementById("connecter").dataset.id)
    console.log("co : " + connecter)
    if (connecter) {
        let element = document.getElementById('monElement');
        let id = element.dataset.id;
        anime_id = JSON.parse(id)
        let nbGuessElement = document.getElementById('nb_guess');
        let nbGuessId = nbGuessElement.dataset.id;
        nbGuess = JSON.parse(nbGuessId)
        const listeCGBalise = document.getElementById("listeCG")
        let listeCGTemp = listeCGBalise.textContent
        listeCG = JSON.parse(listeCGTemp)
        const listeTitreJoueurBalise = document.getElementById("listeTitreJoueur")
        let listeTitreJTemp = listeTitreJoueurBalise.dataset.id
        listeTitreJ = JSON.parse(listeTitreJTemp)
        const serieEnCours = $("#serie_enCour").data().id
        if (serieEnCours != 0) {
            score = serieEnCours
            scoreBalise.text(score)
        }
    }
    
    //Action a effectuer lorsque l'utilisateur valide sa réponse
    $(".proposition").on("submit", function (event) {
        event.preventDefault()
        tableauBalise.removeClass("desac")
        let rps = inputJoueur.val()
        inputJoueur.val('')

        //Verification que la reponse du joueur existe et est non null
        if ((listeNom.includes(rps) && rps != null) || rps == "kamotama" || rps == "perdu") {

            let animeInput = recupAnime(rps)
            //Verification que l'anime n'a pas déjà étais mis
            if (listeAnimeMis.includes(animeInput.id)) {
                paragrapheAnimeMis.text(`L'anime ${rps} a déjà été selectionner par le joueur`)
            } else {
                paragrapheAnimeMis.text('')
                //Condition de victoire et de defaite
                if (rps == 'kamotama' || rps == 'perdu' || animeDeviner.id == animeInput.id || tentative == 19) {
                    gestionValide(animeDeviner,animeDeviner)
                    btnValid.prop("disabled",true)
                    suiteBalise.removeClass("desac")
                    zoneIndiceBalise.addClass("desac")
                    if (rps == 'kamotama' || animeDeviner.id == animeInput.id) {
                        console.log("passage gagné")
                        score++
                        if (connecter) {
                            console.log("passage connecter vrai")
                            $.post('../traitement.php', {serieEnCours: score})
                            if (!anime_id.includes(animeDeviner.id)) {
                                $.post('../traitement.php', { nom: animeDeviner.id })
                                ajoutTitreGenre(listeCG,anime_id,listeTitreJ)
                                anime_id.push(animeDeviner.id)
                            }
                            nbGuess++
                            $.post('../traitement.php', {nb_guess: nbGuess})
                            if (score > scoreMax) {
                                $.post('../traitement.php', {score: score})
                            }
                        }
                    } else {
                        if (connecter) {
                            if (score > scoreMax) {
                                $.post('../traitement.php', {score: score})
                            }
                            $.post('../traitement.php', {serieEnCours: 0})
                        }
                        score = 0
                    }
                    scoreBalise.text(score)
                    conteneurScoreBalise.removeClass("desac")
                } else {

                    
                    //Insertion de l'anime input dans une liste de verification
                    listeAnimeMis.push(animeInput.id)


                    //Activation des boutons pour afficher des indices
                    switch (tentative) {
                        case 6:
                            btnIndice[0].disabled = false
                            btnIndice[0].classList.add("fondActiver")
                            btnIndice[0].classList.remove("fondDesac")
                            btnIndice[0].classList.add("btn-boop")
                            break
                        case 9:
                            btnIndice[1].disabled = false
                            btnIndice[1].classList.add("fondActiver")
                            btnIndice[1].classList.remove("fondDesac")
                            btnIndice[1].classList.add("btn-boop")
                            break
                        case 14:
                            btnIndice[2].disabled = false
                            btnIndice[2].classList.add("fondActiver")
                            btnIndice[2].classList.remove("fondDesac")
                            btnIndice[2].classList.add("btn-boop")
                            break
                    }

                    $(".indice span").each(function(index) {
                        if ($(this).text() > 0) {
                            $(this).text($(this).text() - 1);
                        }
                        if ($(this).text() == 0 || $(this).text() == "") {
                            const indice = $(this).parent().text().split(" ")[0]
                            btnIndice[index].innerHTML = `${indice}<span></span>`

                        }
                    });
                    
                    tentative++
                    gestionValide(animeInput,animeDeviner)
                    tentativeAfficher(tentative)
                }
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
            btnIndice[i].classList.remove("btn-boop")
            btnIndice[i].disabled = true
            switch (i) {
                case 0:
                    $('.perso p').css("visibility", "visible")
                    recupPerso(animeDeviner.id)
                    break
                case 1:
                    $('.image-indice').css("visibility", "visible")
                    recupImage(animeDeviner.id,1)
                    break
                case 2:
                    $('.controle-video').css("visibility", "visible")
                    recupURLTrailer(animeDeviner.op)
                    
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

    $(".image-indice img").addClass("visible")
    $(".perso p").addClass("visible")
    $("#volume").addClass("visible")
    $(".cercle").addClass("visible")

    let btnIndice = document.querySelectorAll(".indice button")
    btnIndice.forEach(btn => {
        btn.disabled = true
        btn.classList.remove("fondActiver")
        btn.classList.add("fondDesac")
        btn.classList.remove("btn-boop")
    })
    btnIndice[0].innerHTML = '<p>Personnage : <br><span>7</span> Guess</p>'
    btnIndice[1].innerHTML = '<p>Affiche : <br><span>10</span> Guess</p>'
    btnIndice[2].innerHTML = '<p>Opening : <br><span>15</span> Guess</p>'
    let indexRan = getRandomInt(listeAnime.length)
    let animeDeviner = listeAnime[indexRan]
    recupImage(animeDeviner.id,0)
    return animeDeviner
}

recupNom()

$(function() {
    $("#iptJoueur").autocomplete({
        source: function(request, response) {
            var terms = request.term.toLowerCase(); // Convertit la requête en minuscules
            var results = $.ui.autocomplete.filter(listeNom, terms)
            response(results);
        }
    });
});


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
    recupImage(animeDeviner.id,0)
    anidle(animeDeviner)
})

const volume = document.getElementById("volume")
volume.addEventListener("input", () => {
    volumeVideo(volume.value)
})
