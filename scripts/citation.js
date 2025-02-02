
async function getCitation () {
    fetch('https://animechan.io/api/v1/quotes').then(response => response.json()).then(data => {
                    console.log(data);
                });
}



function citation(citationDeviner) {
    let tentative = 0
    let inputJoueur = $("#iptJoueur")

    $("form").on("submit", function (event) {
        event.preventDefault()
        let rps = inputJoueur.val()
        inputJoueur.val('')
        

        if (rps != null) {
            if (citationDeviner.includes(rps) || tentative == 10) {
                if (citationDeviner.includes(rps)) {
                    console.log("Bravo")
                } else {
                    console.log("Perdu")
                }
            }
        }
    })
}

citation("test")
getCitation()