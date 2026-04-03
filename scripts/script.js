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
        if ((anime.nom[1] && anime.nom[1] != "null") && !listeNom.includes(anime.nom[1])) {
            listeNom.push(anime.nom[1])
        }
    })
}

function viePleine() {
    for (let i=0;i<10;i++) {
        $(`[data_coeur='${i}']`).attr("src","../images/coeur-plein.png")
    }
}

function viePerdu(tentative) {
    console.log(tentative);
    
    $(`[data_coeur='${tentative}']`).attr("src","../images/coeur-vide.png")
    $(`[data_coeur='${tentative}']`).addClass("animate__heartBeat")
    setTimeout(() => {
        $(`[data_coeur='${tentative}']`).removeClass("animate__heartBeat");
    }, 1000);
}

function affichageVie(nb) {
    for (let i=0;i<nb;i++) {
        const img = $("<img>", {
        src: "../images/coeur-plein.png",
        alt: "coeur",
        data_coeur: i,
        id: "coeur",
        class: 'animate__animated'
    })
    $(".vie").append(img)
    }
}

function suggestion(liste) {
    const litsenom = liste.map((member) => member.name)
    $(function() {
        $("#iptJoueur").autocomplete({
            source: function(request, response) {
                var terms = request.term.toLowerCase();
                var results = $.ui.autocomplete.filter(litsenom, terms)
                response(results);
            }
            
        })
        .autocomplete("instance")._renderItem = function(ul, item) {
                const member = liste.find(member => member.name === item.value);
                const imgSrc = member ? member.img : '';
                return $("<li>")
                    .append(`<div><img src="${imgSrc}" alt="" style="width:50px; height:50px; margin-right:10px;">${item.value}</div>`)
                    .appendTo(ul);
            }
    });
}





