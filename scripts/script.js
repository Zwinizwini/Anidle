function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function changerImg(i,anime) {
    let img = document.getElementById("img-guess")
    img.src = lienImg + anime[i];
}

function gestionScore(score,scoreTemp,decompte,valid) {
    if (valid) {
        let sT = scoreTemp - decompte
        return score += sT
    } else {
        return score
    }
}

function afficherScore(score) {
    let baliseScore = document.querySelector("span")
    baliseScore.innerText = score
    console.log(baliseScore)
}

function fondGris(i,btnIndice) {
    switch (i) {
        case 0:
            btnIndice[0].classList.add("fond")
            btnIndice[1].classList.remove("fond")
            btnIndice[2].classList.remove("fond")
            break
        case 1:
            btnIndice[1].classList.add("fond")
            btnIndice[0].classList.remove("fond")
            btnIndice[2].classList.remove("fond")
            break
        case 2:
            btnIndice[2].classList.add("fond")
            btnIndice[1].classList.remove("fond")
            btnIndice[0].classList.remove("fond")
    }
} 

function remiseZeroBtn(btn) {
    btn.disabled = true
}


function resetBtn(btn,btnList) {
    remiseZeroBtn(btn)
    fondGris(0,btnList)
}