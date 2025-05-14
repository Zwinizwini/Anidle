import { viePerdu, viePleine } from "./script.js";
import { dbdData } from "./dbdData.js";


const audio = document.getElementById('monAudio');
const boutonsAudio = document.querySelectorAll('.bouton-audio');
boutonsAudio.forEach(bouton => {
    bouton.disabled = true;
})

const pourcentage = document.querySelector('.reglageVol span')
const volumeControl = document.getElementById('volume');
volumeControl.addEventListener('input', function() {
    const volume = this.value / 100;
    audio.volume = volume;
    pourcentage.innerText = this.value
});


function guessr(tueur) {
    let tentative = 10;
    let index = 1
    boutonsAudio[0].disabled = false;
    console.log(tueur.name);
    

    boutonsAudio.forEach(bouton => {
        bouton.addEventListener('click', function() {     
            const id = bouton.getAttribute('data-id');
            const audioSrc = `../images/Dbd/${tueur.name}${id}.mp3`;
            const src = audio.getAttribute('src');

            boutonsAudio.forEach(bouton => {
                $(`.bouton-audio[data-id='${bouton.getAttribute('data-id')}'] img`).attr('src','../images/jouer.png')
            })
            
            if (src != audioSrc) {
                audio.src = audioSrc;
                audio.play()
                $(`.bouton-audio[data-id='${id}'] img`).attr('src','../images/pause.png')
            } else {
                if(audio.paused) {
                    audio.play();
                    $(`.bouton-audio[data-id='${id}'] img`).attr('src','../images/pause.png')
                } else {
                    audio.pause();
                    $(`.bouton-audio[data-id='${id}'] img`).attr('src','../images/jouer.png')
                }
            }
            
        });
    });

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const ipt = document.getElementById('iptJ').value
        document.getElementById('iptJ').value = ""
        const tueurIpt = dbdData.find(member => member.name === ipt);

        boutonsAudio.forEach(bouton => {
            $(`.bouton-audio[data-id='${bouton.getAttribute('data-id')}'] img`).attr('src','../images/jouer.png')
        })
        audio.pause();

        if (ipt == tueur.name || tentative == 1) {
            audio.pause();
            if (tentative == 1) {
                viePerdu(0)
            }
            tentative = 10;
            document.getElementById('btnJ').disabled = true;
            $(`[data_coeur='${1}']`).removeClass("animate__heartBeat animate__infinite")
            $(`[data_coeur='${0}']`).removeClass("animate__heartBeat animate__infinite")
            $(`[data_coeur='${2}']`).removeClass("animate__heartBeat animate__infinite")
            $(".reponse").removeClass("desac")
            $('#HoloImg').attr("src", tueur.image)
            
        } else {
            tentative--
            viePerdu(tentative)
            if (index < 4 ) {
                boutonsAudio[index].disabled = false;
                boutonsAudio[index].classList.remove('grisatre')
                boutonsAudio[index].classList.add('btn-cursor')
                index++
            }
            if (tentative == 3) {
                $(`[data_coeur='${1}']`).addClass("animate__heartBeat animate__infinite")
                $(`[data_coeur='${0}']`).addClass("animate__heartBeat animate__infinite")
                $(`[data_coeur='${2}']`).addClass("animate__heartBeat animate__infinite")
            }
            const div = document.createElement('div')
            const img = document.createElement('img')
            img.src = tueurIpt.image
            img.alt = tueurIpt.name
            div.append(img)
            document.querySelector('.perso').prepend(div)
            

        }
    })

    $('.nextHolo').on('click', () => {
        $('.proposition button').attr('disabled', false)
        $(".reponse").addClass("desac")
        viePleine()
        index = 1
        tueur = dbdData[Math.floor(Math.random() * dbdData.length)]
        console.log(tueur.name);
        $('.perso').empty()
        for (let i=1; i< boutonsAudio.length;i++) {
            boutonsAudio[i].disabled = true
            boutonsAudio[i].classList.add('grisatre')
            boutonsAudio[i].classList.remove('btn-cursor')
        }
    })
}

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

const litsenom = dbdData.map((member) => member.name)

$(function() {
    $("#iptJ").autocomplete({
        source: function(request, response) {
            var terms = request.term.toLowerCase();
            var results = $.ui.autocomplete.filter(litsenom, terms)
            response(results);
        }
        
    })
    .autocomplete("instance")._renderItem = function(ul, item) {
            const member = dbdData.find(member => member.name === item.value);
            const imgSrc = member ? member.image : '';
            return $("<li>")
                .append(`<div><img src="${imgSrc}" alt="" style="width:50px; height:50px; margin-right:10px;">${item.value}</div>`)
                .appendTo(ul);
        }
});


const tueur = dbdData[Math.floor(Math.random() * dbdData.length)]
guessr(tueur)