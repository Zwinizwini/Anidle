export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//fonction pour recuperer l'indice de l'anime rentré par le joueur
export function recupAnime(inputJoueur) {
    const isTrue = DonneeAnime.find(anime => anime.nom.includes(inputJoueur))
    if (isTrue == null) {
        return [[],,[],[],[],"",,"",,"",""]
    } else {
        return isTrue
    }
}

export function recupNom() {
    DonneeAnime.map(anime => {
        listeNom.push(anime.nom[0])
        if ((anime.nom[1] != null || anime.nom[1] != "null") && !listeNom.includes(anime.nom[1])) {
            listeNom.push(anime.nom[1])
        }
    })
}

export function viePleine() {
    for (let i=0;i<10;i++) {
        $(`[data_coeur='${i}']`).attr("src","../images/coeur-plein.png")
    }
}

export function viePerdu(tentative) {
    console.log(tentative);
    
    $(`[data_coeur='${tentative}']`).attr("src","../images/coeur-vide.png")
    $(`[data_coeur='${tentative}']`).addClass("animate__heartBeat")
    setTimeout(() => {
        $(`[data_coeur='${tentative}']`).removeClass("animate__heartBeat");
    }, 1000);
}








