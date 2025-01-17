


function citation(citationDeviner) {
    let inputBalise = document.getElementById("iptJoueur")
    let btnValide = document.getElementById("btnValid")
    let tentative = 0

    btnValide.addEventListener("click", () => {
        let rps = inputBalise.value
        inputBalise.value = ``

        if (rps != null) {
            if (citationDeviner.includes(rps) || tentative == 10) {
                btnValide.disabled = true
                if (citationDeviner.includes(rps)) {
                    console.log("Bravo")
                } else {
                    console.log("Perdu")
                }
            }
        }
    })
}