const autreBalise = document.getElementById("autreUserNonAmis")
let autreUserListe = JSON.parse(autreBalise.textContent)
const amisBalise = document.getElementById("listeAmis")
let listeAmis = JSON.parse(amisBalise.textContent)
const demandeEnvoieListe = JSON.parse($("#demandeEnvoie").text())
const demandeRecue = JSON.parse($("#demandeRecue").text())
const pageIndex = JSON.parse(document.getElementById('pageIndex').dataset.id)


function affichageUser(liste,index,pageIndex) {
    $(`[data_id='${index}']`).remove()
    const divIndex = $("<div>", {
        class: "listeUtilisateur",
        data_id: index
    })
    liste.forEach(user => {
        const div = $("<div>", {
            data_user: `${user.id}`,
        })
        const divPseudoImg = $("<div>", {
            style: "width=170px;justify-content: flex-start;"
        })
        let img 
        pageIndex ? img = $(`<img src="${user.pfp}" alt="pfp">`) : img = $(`<img src="../${user.pfp}" alt="pfp">`)
        const pseudo = $(`<p>${user.pseudo}</p>`)
        
        divIndex.append(div)
        divPseudoImg.append(img)
        divPseudoImg.append(pseudo)
        div.append(divPseudoImg)
        switch (index) {
            case 0:
                if (pageIndex) {
                    div.append($(`<a href='compte/pageAmis.php?id=${user.id}'><img src="images/carte-didentite.png" alt="amis"></a>`)) 
                } else {
                    div.append($(`<a href='../compte/pageAmis.php?id=${user.id}'><img src="../images/carte-didentite.png" alt="amis"></a>`))
                }
                break
            case 1:
                if (pageIndex) {
                    div.append($(`<button class="ajoutAmis" data-id="${user.id}"><img src="images/ajouter-un-utilisateur.png" alt="ajouter"></button>`))
                } else {
                    div.append($(`<button class="ajoutAmis" data-id="${user.id}"><img src="../images/ajouter-un-utilisateur.png" alt="ajouter"></button>`))
                }
                break
            case 2:
                const divButton = $("<div>", {
                    class: "divBoutton",
                    style: "gap: 5px"
                })
                let button
                if (pageIndex) {
                    button = $(`<button data-id="${user.id}"><img src="images/verifier.png" alt="Accepter"></button>
                        <button data-id="${user.id}"><img src="images/fermer.png" alt="Refuser"></button>
                        `)                
                    } else {
                        button = $(`<button data-id="${user.id}"><img src="../images/verifier.png" alt="Accepter"></button>
                            <button data-id="${user.id}"><img src="../images/fermer.png" alt="Refuser"></button>
                            `)
                    }
                divButton.append(button)
                div.append(divButton)
            }
    })
    $("#cache").append(divIndex)
}
affichageUser(listeAmis,0,pageIndex)
affichageUser(autreUserListe,1,pageIndex)
$(`[data_id='${1}']`).addClass("desac")
affichageUser(demandeRecue,2,pageIndex)
$(`[data_id='${2}']`).addClass("desac")


function ajoutAmis(pageIndex) {
    const boutonAjoutAmis = document.querySelectorAll(".ajoutAmis")
    console.log(boutonAjoutAmis)
    boutonAjoutAmis.forEach(bouton => {
        bouton.addEventListener("click", function() {
            console.log("click")
            const idDemande = this.dataset.id
            if (demandeEnvoieListe.some(objet => objet.uid_recue == idDemande)) {
                alert("Demande deja envoyé")
            } else {
                alert("Demande d'amis envoyé")
                pageIndex ? $.post('ajoutAmis.php', {idDemande: idDemande}) : $.post('../ajoutAmis.php', {idDemande: idDemande})
                demandeEnvoieListe.push({uid_recue: idDemande})
                console.log('envoie de demande')
            }
        })
    })
}


const boutonAccepter = document.querySelectorAll(".divBoutton button")
console.log(boutonAccepter.length)

for (let i=0;i<boutonAccepter.length;i++) {
    boutonAccepter[i].addEventListener("click", function() {
        console.log(i)
        const idAccepter = this.dataset.id
        $(`div[data_user=${idAccepter}]`).remove()
        if (i%2 == 0) {
            pageIndex ? $.post('ajoutAmis.php', {idAccepter: idAccepter}) : $.post('../ajoutAmis.php', {idAccepter: idAccepter})
            listeAmis.push(demandeRecue.find(personne => personne.id == idAccepter))
        } else {
            pageIndex ? $.post('ajoutAmis.php', {idReffuser: idAccepter}) : $.post('../ajoutAmis.php', {idReffuser: idAccepter})
        }
        
    })
}

const divAmis = $(".amis")
divAmis.on('click', () => {
    $("#cache").toggleClass("etendu")
    $("#bouttonAmis").toggleClass("entenduBoutton")
})


const bouttonAmis = document.querySelectorAll("#bouttonAmis button")
for (let i=0;i<bouttonAmis.length;i++) {
    bouttonAmis[i].addEventListener('click', () => {
        bouttonAmis.forEach(el => {
            el.classList.remove("actif")
            el.classList.add("nonActif")
        })
        bouttonAmis[i].classList.add("actif")
        bouttonAmis[i].classList.remove("nonActif")
        switch (i) {
            case 0:
                $(`[data_id='${0}']`).removeClass("desac")
                $(`[data_id='${1}']`).addClass("desac")
                $(`[data_id='${2}']`).addClass("desac")
                affichageUser(listeAmis,0,pageIndex)
                break
            case 1:
                $(`[data_id='${1}']`).removeClass("desac")
                $(`[data_id='${0}']`).addClass("desac")
                $(`[data_id='${2}']`).addClass("desac")
                break
            case 2:
                $(`[data_id='${2}']`).removeClass("desac")
                $(`[data_id='${1}']`).addClass("desac")
                $(`[data_id='${0}']`).addClass("desac")
                break
        }
    })
}

ajoutAmis(pageIndex)
