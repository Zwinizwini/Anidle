function pixelImage(pixelSize) {
    const src = document.querySelector(".affiche img").src
    const image = new Image();
    image.crossOrigin = "anonymous"; // Important pour les images distantes
    image.src = src; // URL de l'image distante

    const canvas = document.getElementById('monCanvas');
    const ctx = canvas.getContext('2d');

    image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    // Pixellisation (le reste du code est le même que précédemment)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let y = 0; y < canvas.height; y += pixelSize) {
        for (let x = 0; x < canvas.width; x += pixelSize) {
        let r = 0, g = 0, b = 0;
        for (let py = 0; py < pixelSize; py++) {
            for (let px = 0; px < pixelSize; px++) {
            const index = (y + py) * 4 * canvas.width + (x + px) * 4;
            r += data[index];
            g += data[index + 1];
            b += data[index + 2];
            }
        }
        r /= pixelSize * pixelSize;
        g /= pixelSize * pixelSize;
        b /= pixelSize * pixelSize;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
        }
    }
    };
}

function switchImageCanva() {
    $(".afficheSuivante").toggleClass("desac")
    document.querySelector(".affiche").classList.remove("desac")
    document.querySelector(".conteneurCanva").classList.add("desac")
    $(".affiche img").removeClass("invert")
    $(".affiche img").removeClass("blur")
    $(".affiche img").removeClass("blur-invert")
    $(".affiche img").attr("style","")
}

function viePleine() {
    for (let i=0;i<10;i++) {
        $(`[data_coeur='${i}']`).attr("src","../images/coeur-plein.png")
    }
}

function viePerdu(tentative) {
    $(`[data_coeur='${9-tentative}']`).attr("src","../images/coeur-vide.png")
    $(`[data_coeur='${9-tentative}']`).addClass("animate__heartBeat")
    setTimeout(() => {
        $(`[data_coeur='${9-tentative}']`).removeClass("animate__heartBeat");
    }, 1000);
}

function moinsFlouPixel(tentative,jeu) {
    viePerdu(tentative)
    tentative++
    if (tentative == 7) {
        $(`[data_coeur='${1}']`).addClass("animate__heartBeat animate__infinite")
        $(`[data_coeur='${0}']`).addClass("animate__heartBeat animate__infinite")
        $(`[data_coeur='${2}']`).addClass("animate__heartBeat animate__infinite")
    }
    console.log("taille pix : "+Math.floor(50/tentative+1))
    switch (jeu) {
        case 'Pixel':
            pixelImage(Math.floor(50/tentative+1))
            break
        case 'Pixel-Invert':
            pixelImage(Math.floor(50/tentative+1))
            break
        case 'Flou-Invert': 
            $(".blur").css('filter', `invert(1) blur(${15-tentative}px)`)
            break
        default:
            $(".blur").css('filter', `blur(${15-tentative}px)`)
    }
    return tentative
}

function perdu(tentative,jeu) {
    if (tentative == 9) {
        viePerdu(tentative)
        $(`[data_coeur='${1}']`).removeClass("animate__heartBeat animate__infinite")
        $(`[data_coeur='${0}']`).removeClass("animate__heartBeat animate__infinite")
        $(`[data_coeur='${2}']`).removeClass("animate__heartBeat animate__infinite")
        switchImageCanva()
    } else {
        return moinsFlouPixel(tentative,jeu)
    }
}

function jeuAffiche(animeDeviner,jeu) {
    
    let tentative = 0
    const imageDeviner = $(".affiche img")
    imageDeviner.attr("src",animeDeviner.img)
    switch (jeu) {
        case 'Pixel':
            document.querySelector(".conteneurCanva").classList.toggle("desac")
            pixelImage(60)
            break
        case 'Pixel-Invert':
            $("#monCanvas").addClass("invert")
            document.querySelector(".conteneurCanva").classList.toggle("desac")
            pixelImage(60)
            break
        case 'Flou-Invert': 
            $(".affiche img").addClass("blur-invert")
            document.querySelector(".affiche").classList.toggle("desac")
            break
        default:
            $(".affiche img").addClass("blur")
            document.querySelector(".affiche").classList.toggle("desac")
    }



    $("form").on('submit', function(event) {
        event.preventDefault()
        const iptJoueur = $("#iptJoueur").val()
        $("#iptJoueur").val('')

        const animeIpt = recupAnime(iptJoueur)

        if (iptJoueur != "" && animeIpt != undefined) {
            const animeParagraphe = $("<p>", {
                text: animeIpt.nom[0]
            })
            $(".reponseJoueur").prepend(animeParagraphe)

            if (animeIpt.id == animeDeviner.id) {
                $(`[data_coeur='${1}']`).removeClass("animate__heartBeat animate__infinite")
                $(`[data_coeur='${0}']`).removeClass("animate__heartBeat animate__infinite")
                $(`[data_coeur='${2}']`).removeClass("animate__heartBeat animate__infinite")
                switchImageCanva()
            } else {
                tentative = perdu(tentative,jeu)
            }
        }

    })

    $('#skip').on('click', () => {
        tentative = perdu(tentative,jeu)
    })

    $(".afficheSuivante").on("click", () => {
        tentative = 0
        $(".reponseJoueur").empty()
        $(".afficheSuivante").toggleClass("desac")
        const index = getRandomInt(DonneeAnime.length)
        animeDeviner = DonneeAnime[index]
        const imageDeviner = $(".affiche img")
        imageDeviner.attr("src",animeDeviner.img)
        switch (jeu) {
            case 'Pixel':
                document.querySelector(".conteneurCanva").classList.toggle("desac")
                document.querySelector(".affiche").classList.add("desac")
                pixelImage(50)
                break
            case 'Pixel-Invert':
                $("#monCanvas").addClass("invert")
                document.querySelector(".affiche").classList.add("desac")
                document.querySelector(".conteneurCanva").classList.toggle("desac")
                pixelImage(50)
                break
            case 'Flou-Invert': 
                $(".affiche img").addClass("blur-invert")
                document.querySelector(".conteneurCanva").classList.add("desac")
                break
            default:
                $(".affiche img").addClass("blur")
                document.querySelector(".conteneurCanva").classList.add("desac")
        }
        viePleine()
    })

    
}

recupNom()

$(function() {
    $("#iptJoueur").autocomplete({
        source: function(request, response) {
            var terms = request.term.toLowerCase(); // Convertit la requête en minuscules
            var results = $.ui.autocomplete.filter(listeNom, terms)
            response(results);
        }
    });
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


$(".startGame").on("click", () => {
    let isFlou = false,isPixel = false,isInvert,jeu

    const choix = $("#flou-pixel").val()
    choix == 'flou' ? isFlou = true : isPixel = true
    $("#invert").prop('checked') ? isInvert = true : isInvert = false
    console.log(`isFlou : ${isFlou}\nisPixel : ${isPixel}\nisInvert : ${isInvert}`)

    $(".popupBackground").addClass("desac")
    const index = getRandomInt(DonneeAnime.length)

    if (isPixel && !isInvert) {
        jeu = 'Pixel'
    } else if (isPixel && isInvert) {
        console.log("oui")
        jeu = 'Pixel-Invert'
    } else if (isFlou && isInvert) {
        jeu = 'Flou-Invert'
    } else {
        jeu = 'Flou'
    }

    jeuAffiche(DonneeAnime[index],jeu)
})

const test = ["Fruits Basket 1st Season","Fruits Basket 1st Season"]
const test2 = [test[0]]
console.log(test2.includes(test[1])) 