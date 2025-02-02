async function getCitation () {
    const reponse =  await fetch('https://animechan.io/api/v1/quotes')
    const quote = await reponse.json()

    quote.data.forEach(element => {
        const citation = `{citation: "${element.content}", anime: "${element.anime.name}", perso: "${element.character.name}"}`
        const fs = require('fs')

        fs.appendFile('citationList.js', `${citation},\n`, (err) => {
            if (err) throw err;
            console.log('Le fichier a été créé !');
        });
    });
}

getCitation()