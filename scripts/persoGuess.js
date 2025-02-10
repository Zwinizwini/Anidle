import {persoData} from './persoList.js'
import { getRandomInt } from './script.js'
const persoNom = persoData.map(perso => perso.nom)

function affichagePerso(persoIpt,PersoDeviner) {
    let fleche_age,fleche_taille,class_age,class_taille,class_fav,fleche_fav
    const romanji = $(`<td class=${persoIpt.nomKanji == PersoDeviner.nomKanji ? 'valide' : 'faux'} > ${persoIpt.nomKanji}</td>`)
    if(persoIpt.age == PersoDeviner.age) {
        class_age = 'valide'
        fleche_age = './images/fleche_haut.png'
    } else {
        class_age = 'faux'
        fleche_age = './images/fleche_bas.png'
    }
    const age = $(`<td class=${class_age}>${persoIpt.age}<img src="${fleche_age}"/></td>`)
    if(persoIpt.taille == PersoDeviner.taille) {
        class_taille = 'valide'
        fleche_taille = './images/fleche_haut.png'
    } else {
        class_taille = 'faux'
        fleche_taille = './images/fleche_bas.png'
    }
    const taille = $(`<td class=${class_taille}> ${persoIpt.taille}<img src="${fleche_age}"/></td>`)
    const seiyuu = $(`<td class=${persoIpt.seiyuu == PersoDeviner.seiyuu ? 'valide' : 'faux'} > ${persoIpt.seiyuu}</td>`)
    if(persoIpt.nb_favorite == PersoDeviner.nb_favorite) {
        class_fav = 'valide'
        fleche_fav = './images/fleche_haut.png'
    } else {
        class_fav = 'faux'
        fleche_fav = './images/fleche_bas.png'
    }
    const nb_fav = $(`<td class=${class_fav} > ${persoIpt.nb_favorite}<img src="${fleche_fav}"/></td>`)
    const genre = $(`<td class=${persoIpt.genre == PersoDeviner.genre ? 'valide' : 'faux'} > ${persoIpt.genre}</td>`)
    const tr = $(`<tr></tr>`)

    tr.append(romanji)
    tr.append(age)
    tr.append(taille)
    tr.append(seiyuu)
    tr.append(nb_fav)
    tr.append(genre)
    $(".persoTable tbody").append(tr)
    console.log(tr)
}

function activationIndice(index, persoDeviner) {
    switch (index) {
        case 5:
            $(".indice img").attr("style","")
            $(".indice img").attr("src",persoDeviner.img)
            break
        case 7:
            $(".nomAnime").attr("style","")
            $(".surnom p").text(persoDeviner.anime_nom)
            break
        case 9:
            $(".surnom").attr("style","")
            $(".surnom p").text(persoDeviner.surnom)
    }

}

function jeu(persoDeviner) {
    let score = 0
    let tentative = 0
    console.log(persoDeviner)

    $('form').on("submit", function(event) {
        event.preventDefault()
        const iptJoueur = $('#iptJoueur').val()
        $('#iptJoueur').val('')
        console.log(iptJoueur)

        const persoIpt = persoData.find(perso => perso.nom == iptJoueur)

        if (persoIpt != null) {
            if (persoIpt.id == persoDeviner.id) {
                score++
            } else if (tentative == 10) {
                score = 0
            } else {
                tentative++
                affichagePerso(persoIpt,persoDeviner)
            }

            activationIndice(tentative, persoDeviner)
        }
    })

    $(".resultat button").on('click', () => {
        persoDeviner = resetTab()
        tentative = 0       
    })
}

const persoDeviner = persoData[getRandomInt(persoData.length)]
jeu(persoDeviner)