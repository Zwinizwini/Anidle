import { hololiveMembersData } from "./hololiveMembersData.js";

function recupHolo(hololive) {
    return hololiveMembersData.find(member => member.nom === hololive)
}

function parseDate(dateString) {
    const [day, month, year] = dateString.split("/");
    return new Date(year, month - 1, day);
}

function verifReponse(hololiveIpt,hololive) {
    let tbodyBalise = document.querySelector("tbody")
    let trBalise = document.createElement("tr")
    let tr = `<tr>`
    const date1 = parseDate(hololiveIpt.dateDebut)
    const date2 = parseDate(hololive.dateDebut)
    const date1B = parseDate(hololiveIpt.birthday+'/2000')
    const date2B = parseDate(hololive.birthday+'/2000')

    if (hololiveIpt.branch != "English") {
        hololiveIpt.nom == hololive.nom ? tr += `<td class="fade-in fade-in-1 valide"><img src="${hololiveIpt.img}" alt="${hololiveIpt.nom}" class="perso"/></td>` : tr += `<td class="fade-in fade-in-1 faux"><img src="${hololiveIpt.img}" alt="${hololiveIpt.nom}" class="perso"/></td>`
    } else {
        hololiveIpt.nom == hololive.nom ? tr += `<td class="fade-in fade-in-1 valide"><img src="${hololiveIpt.imgG}" alt="${hololiveIpt.nom}" class="perso"/></td>` : tr += `<td class="fade-in fade-in-1 faux"><img src="${hololiveIpt.imgP}" alt="${hololiveIpt.nom}" class="perso"/></td>`
    }
    if (date1 > date2) {
        tr += `<td class="fade-in fade-in-2 faux">${hololiveIpt.dateDebut}<img src="../images/fleche_bas.png" class="fleche"></td>`
    } else if (date1 < date2) {
        tr += `<td class="fade-in fade-in-2 faux">${hololiveIpt.dateDebut}<img src="../images/fleche_haut.png" class="fleche"></td>`
    } else {
        tr+= `<td class="fade-in fade-in-2 valide">${hololiveIpt.dateDebut}</td>`
    }
    hololiveIpt.gen == hololive.gen ? tr += `<td class="fade-in fade-in-3 valide">${hololiveIpt.gen}</td>` : tr += `<td class="fade-in fade-in-3 faux">${hololiveIpt.gen}</td>`
    hololiveIpt.branch == hololive.branch ? tr += `<td class="fade-in fade-in-4 valide">${hololiveIpt.branch}</td>` : tr += `<td class="fade-in fade-in-4 faux">${hololiveIpt.branch}</td>`
    if (date1B > date2B) {
        tr += `<td class="fade-in fade-in-5 faux">${hololiveIpt.birthday}<img src="../images/fleche_bas.png" class="fleche"></td>`
    } else if (date1B < date2B) {
        tr += `<td class="fade-in fade-in-5 faux">${hololiveIpt.birthday}<img src="../images/fleche_haut.png" class="fleche"></td>`
    } else {
        tr+= `<td class="fade-in fade-in-5 valide">${hololiveIpt.birthday}</td>`        
    }
    if (hololiveIpt.tailleCm == hololive.tailleCm) {
        tr+= `<td class="fade-in fade-in-6 valide">${hololiveIpt.tailleCm}</td>`
    } else {
        if (hololiveIpt.tailleCm > hololive.tailleCm) {
            tr += `<td class="fade-in fade-in-6 faux">${hololiveIpt.tailleCm}<img src="../images/fleche_bas.png" class="fleche"></td>`
        }
        else {
            tr += `<td class="fade-in fade-in-6 faux">${hololiveIpt.tailleCm}<img src="../images/fleche_haut.png" class="fleche"></td>`
        }
    }
    hololiveIpt.status == hololive.status ? tr += `<td class="fade-in fade-in-7 valide">${hololiveIpt.status}</td>` : tr += `<td class="fade-in fade-in-7 faux">${hololiveIpt.status}</td>`
    tr += `</tr>`
    trBalise.innerHTML = tr
    tbodyBalise.prepend(trBalise)

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

function holoGuessr(hololive) {
    let tentative = 10
    let tableauBalise = $("table")
    console.log("vubqubvpsvbsuvb")

    $('form').on('submit', (event) => {
        event.preventDefault()
        const iptJoueur = $("#iptJoueur").val()
        $("#iptJoueur").val('')
        const hololiveIpt = recupHolo(iptJoueur)
        tableauBalise.removeClass("desac")

        if (hololiveIpt.id == hololive.id || tentative == 1) {
            $('.proposition button').attr('disabled', true)
            if (tentative == 1) {
                viePerdu(0)
            }
            $(`[data_coeur='${1}']`).removeClass("animate__heartBeat animate__infinite")
            $(`[data_coeur='${0}']`).removeClass("animate__heartBeat animate__infinite")
            $(`[data_coeur='${2}']`).removeClass("animate__heartBeat animate__infinite")
            tentative = 10
            $(".reponse").removeClass("desac")
            verifReponse(hololiveIpt,hololive)
            $('#HoloImg').attr("src", hololive.img)

        } else {
            tentative--
            verifReponse(hololiveIpt,hololive)
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
        hololive = hololiveMembersData[Math.floor(Math.random() * hololiveMembersData.length)]
    })


}


const litsenom = hololiveMembersData.map((member) => member.nom)

$(function() {
    $("#iptJoueur").autocomplete({
        source: function(request, response) {
            var terms = request.term.toLowerCase();
            var results = $.ui.autocomplete.filter(litsenom, terms)
            response(results);
        }
        
    })
    .autocomplete("instance")._renderItem = function(ul, item) {
            const member = hololiveMembersData.find(member => member.nom === item.value);
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

const hololiveRandom = hololiveMembersData[Math.floor(Math.random() * hololiveMembersData.length)]
// const hololiveRandom = hololiveMembersData[35]
holoGuessr(hololiveRandom)