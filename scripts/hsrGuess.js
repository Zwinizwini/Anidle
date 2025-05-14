import { hsr } from "./HsrData.js";
import { viePerdu, viePleine } from "./script.js";

function recupHsr(perso) {
    return hsr.find(member => member.Name === perso)
}

function verifReponse(persoIpt,perso) {
    let tbodyBalise = document.querySelector("tbody")
    let trBalise = document.createElement("tr")
    let tr = `<tr>`

    persoIpt.Name == perso.Name ? tr += `<td class="fade-in fade-in-1 valide"><img src="${persoIpt.img}" alt="${persoIpt.nom}" class="perso"/></td>` : tr += `<td class="fade-in fade-in-1 faux"><img src="${persoIpt.img}" alt="${persoIpt.nom}" class="perso"/></td>`
    persoIpt.Path == perso.Path ? tr += `<td class="fade-in fade-in-2 valide">${persoIpt.Path}</td>` : tr += `<td class="fade-in fade-in-2 faux">${persoIpt.Path}</td>`
    persoIpt.Element == perso.Element ? tr += `<td class="fade-in fade-in-3 valide">${persoIpt.Element}</td>` : tr += `<td class="fade-in fade-in-3 faux">${persoIpt.Element}</td>`
    persoIpt.Rarity == perso.Rarity ? tr += `<td class="fade-in fade-in-4 valide">${persoIpt.Rarity}</td>` : tr += `<td class="fade-in fade-in-4 faux">${persoIpt.Rarity}</td>`
    if (persoIpt.Version == perso.Version) {
        tr += `<td class="fade-in fade-in-5 valide">${persoIpt.Version}</td>`
    } else if (persoIpt.Version > perso.Version) {
        tr += `<td class="fade-in fade-in-5 faux">${persoIpt.Version}<img src="../images/fleche_bas.png" class="fleche"></td>`
    } else {
        tr += `<td class="fade-in fade-in-5 faux">${persoIpt.Version}<img src="../images/fleche_haut.png" class="fleche"></td>`
    }
    persoIpt.Gender == perso.Gender ? tr += `<td class="fade-in fade-in-6 valide">${persoIpt.Gender}</td>` : tr += `<td class="fade-in fade-in-6 faux">${persoIpt.Gender}</td>`
    persoIpt.Height == perso.Height ? tr += `<td class="fade-in fade-in-7 valide">${persoIpt.Height}</td>` : tr += `<td class="fade-in fade-in-7 faux">${persoIpt.Height}</td>`
    persoIpt.Species == perso.Species ? tr += `<td class="fade-in fade-in-8 valide">${persoIpt.Species}</td>` : tr += `<td class="fade-in fade-in-8 faux">${persoIpt.Species}</td>`
    persoIpt.Worlds == perso.Worlds ? tr += `<td class="fade-in fade-in-9 valide">${persoIpt.Worlds}</td>` : tr += `<td class="fade-in fade-in-9 faux">${persoIpt.Worlds}</td>`

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

        if (persoIpt.id == perso.id || tentative == 1) {
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
        perso = hsr[Math.floor(Math.random() * hsr.length)]
    })


}


const litsenom = hsr.map((member) => member.Name)

$(function() {
    $("#iptJoueur").autocomplete({
        source: function(request, response) {
            var terms = request.term.toLowerCase();
            var results = $.ui.autocomplete.filter(litsenom, terms)
            response(results);
        }
        
    })
    .autocomplete("instance")._renderItem = function(ul, item) {
            const member = hsr.find(member => member.Name === item.value);
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

const persoRan = hsr[Math.floor(Math.random() * hsr.length)]
// const hololiveRandom = hsr[35]
hsrGuessr(persoRan)