const { get } = require('http');

function attendreUneSeconde() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}


async function getPokeGen (gen) {
    const reponse =  await fetch(`https://tyradex.app/api/v1/gen/${gen}`)
    const quote = await reponse.json()

    quote.forEach(element => {       
        console.log(element.name.fr);
        
        if (element.evolution != null) {
            element.evolution.pre == null ? nbEvo = 1 : nbEvo = element.evolution.pre.length + 1
        } else {
            nbEvo = 1
        }
        let type2
        element.types[1] == null ? type2 = "" : type2 = element.types[1].name
        const heightTmp = element.height
        const height = heightTmp.split(' ')[0]
        const wiehtTmp = element.weight
        const weight = wiehtTmp.split(' ')[0]
        const citation = `{name: "${element.name.fr}", type1: "${element.types[0].name}", type2: "${type2}", gen: ${gen}, pokedex_id: ${element.pokedex_id}, nbEvo: ${nbEvo}, height: ${height.replace(",",".")}, weight: ${weight.replace(",",".")}, img: "${element.sprites.regular}"}`
        const fs = require('fs')

        fs.appendFile('pokemonData.js', `${citation},\n`, (err) => {
            if (err) throw err;
            console.log('Le fichier a été créé !');
        });

    });
}

getPokeGen(5)