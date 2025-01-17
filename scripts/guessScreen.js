function guessScreen() {

    let animeNum = getRandomInt(listeImg.length)
    let listeAnime = listeImg[animeNum]
    changerImg(0,listeAnime)
    let scoreTemp = 7500
    let decompte = 0
    let score = 0
    

    let btnValid = document.getElementById("btnValid")
    let inputJoueur = document.getElementById("rps")
    btnValid.addEventListener("click", () => {
        let rps = inputJoueur.value
        inputJoueur.value = ``
        console.log(rps)
        if (rps == altImg[animeNum]) {
            score = gestionScore(score,scoreTemp,decompte,true)
        } else {
            score = gestionScore(score,scoreTemp,decompte,false)
        }

        resetBtn(btnIndice[2],btnIndice)
        afficherScore(score)
        animeNum = getRandomInt(listeImg.length)
        listeAnime = listeImg[animeNum]
        changerImg(0,listeAnime)
    })

    let btnIndice = document.querySelectorAll(".bouton button")
    remiseZeroBtn(btnIndice[2])
    for (let i = 0; i < btnIndice.length; i++ ) {
        btnIndice[i].addEventListener("click", () => {
            changerImg(i,listeAnime)
            if (i+1 != btnIndice.length) {
                btnIndice[i+1].disabled = false
                btnIndice[i+1].classList.add("souris")
            }
            fondGris(i,btnIndice)
        })
    }
    
}

guessScreen()