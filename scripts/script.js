function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//fonction pour recuperer l'indice de l'anime rentré par le joueur
function recupAnime(inputJoueur) {
    const isTrue = DonneeAnime.find(anime => anime.nom.includes(inputJoueur))
    if (isTrue == null) {
        return [[],,[],[],[],"",,"",,"",""]
    } else {
        return isTrue
    }
}

function recupNom() {
    DonneeAnime.map(anime => {
        listeNom.push(anime.nom[0])
        if ((anime.nom[1] != null || anime.nom[1] != "null") && !listeNom.includes(anime.nom[1])) {
            listeNom.push(anime.nom[1])
        }
    })
}




function setBackgroundImage() {
    const backgroundImage = localStorage.getItem('backgroundImage');
    const bgImd = JSON.parse(backgroundImage)
    console.log(bgImd)
  
    if (bgImd.bg == 3) {
        document.body.style.backgroundColor = `var(--background-noir-profond)`;
        document.body.style.backgroundImage = ''
    } else {
        document.body.style.backgroundImage = `url(${bgImd.tab[bgImd.bg]})`;
    }
}

window.addEventListener('DOMContentLoaded', setBackgroundImage);
// localStorage.removeItem('backgroundImage')






