import { pokeData } from "./pokemonData.js";
import { viePerdu, viePleine } from "./script.js";

function recupHsr(perso) {
    return pokeData.find(member => member.name === perso)
}

function verifReponse(persoIpt,perso) {
    let tbodyBalise = document.querySelector("tbody")
    let trBalise = document.createElement("tr")
    let tr = `<tr>`
    let index=0

    for (const cle in persoIpt) {
        if (cle != "img") {
            index++
            const valeur = persoIpt[cle]
            if (typeof valeur == "string") {
                if (cle == "name") {
                    perso[cle] == valeur ? tr += `<td class="valide fade-in fade-in-${index}"> <img src="${persoIpt.img}" alt="${valeur}" class="perso"></td>` 
                    : tr += `<td class="faux fade-in fade-in-${index}"> <img src="${persoIpt.img}" alt="${valeur}" class="perso"></td>`
                    
                } else {
                    perso[cle] == valeur ? tr += `<td class="valide fade-in fade-in-${index}"> <div class="type" aria-type="${valeur}"><img src="../images/pokemon/${valeur}.jpg" alt="${valeur}" ></div></td>` 
                    : tr += `<td class="faux fade-in fade-in-${index}"> <div class="type" aria-type="${valeur}"><img src="../images/pokemon/${valeur}.jpg" alt="${valeur}" ></div></td>`
                }
            } else {
                if (valeur > perso[cle]) {
                    tr += `<td class="faux fade-in fade-in-${index}"> ${valeur} <img src="../images/fleche_bas.png" class="fleche"></td>`
                } else if (valeur == perso[cle]) {
                    tr += `<td class="valide fade-in fade-in-${index}"> ${valeur}</td>`
                }
                else {
                    tr += `<td class="faux fade-in fade-in-${index}"> ${valeur} <img src="../images/fleche_haut.png" class="fleche"></td>`
                }
            }
        }
    }
    
    tr += `</tr>`
    trBalise.innerHTML = tr
    tbodyBalise.prepend(trBalise)

}



function hsrGuessr(perso) {
    let tentative = 10
    let tableauBalise = $("table")

    $('form').on('submit', (event) => {
        event.preventDefault()
        const iptJoueur = $("#iptJoueur").val()
        $("#iptJoueur").val('')
        const persoIpt = recupHsr(iptJoueur)
        tableauBalise.removeClass("desac")

        if (persoIpt.pokedex_id == perso.pokedex_id || tentative == 1) {
            $('.proposition button').attr('disabled', true)
            if (tentative == 1) {
                viePerdu(0)
            }
            $(`[data_coeur='${1}']`).removeClass("animate__heartBeat animate__infinite")
            $(`[data_coeur='${0}']`).removeClass("animate__heartBeat animate__infinite")
            $(`[data_coeur='${2}']`).removeClass("animate__heartBeat animate__infinite")
            tentative = 10
            $(".reponse").removeClass("desac")
            verifReponse(persoIpt,perso)
            $('#HoloImg').attr("src", perso.img)

        } else {
            tentative--
            verifReponse(persoIpt,perso)
            viePerdu(tentative)
            if (tentative == 3) {
                $(`[data_coeur='${1}']`).addClass("animate__heartBeat animate__infinite")
                $(`[data_coeur='${0}']`).addClass("animate__heartBeat animate__infinite")
                $(`[data_coeur='${2}']`).addClass("animate__heartBeat animate__infinite")
            }

        }
    })

    $('.nextHolo').on('click', () => {
        $('.proposition button').attr('disabled', false)
        tableauBalise.addClass("desac")
        $("tbody").html(``)
        $(".reponse").addClass("desac")
        viePleine()
        perso = pokeData[Math.floor(Math.random() * pokeData.length)]
    })


}


const litsenom = pokeData.map((member) => member.name)

$(function() {
    $("#iptJoueur").autocomplete({
        source: function(request, response) {
            var terms = request.term.toLowerCase();
            var results = $.ui.autocomplete.filter(litsenom, terms)
            response(results);
        }
        
    })
    .autocomplete("instance")._renderItem = function(ul, item) {
            const member = pokeData.find(member => member.name === item.value);
            const imgSrc = member ? member.img : '';
            return $("<li>")
                .append(`<div><img src="${imgSrc}" alt="" style="width:50px; height:50px; margin-right:10px;">${item.value}</div>`)
                .appendTo(ul);
        }
});

for (let i=0;i<10;i++) {
    const img = $("<img>", {
        src: "../images/coeur-plein.png",
        alt: "coeur",
        data_coeur: i,
        id: "coeur",
        class: 'animate__animated'
    })
    $(".vie").append(img)
}

const persoRan = pokeData[Math.floor(Math.random() * pokeData.length)]
//const persoRan = pokeData[0]
hsrGuessr(persoRan)