const listTest = require('./listeTest.js')
const listO = require('./listeO.js')
const fs = require('fs').promises;
const path = require('path');


async function getTopAnimeData(page = 1, totalAnime = 500) {

        try {
          const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&type=ona`);
          const data = await response.json();
     
          data.data.forEach(anime => {
            const { title, title_english, start_date, genres, themes, studios, source, scored} = anime;
            const yearTemp = new Date(anime.aired.from);
            const year = yearTemp.getFullYear();
            const genresList = []
            const id = anime.mal_id
            const video_id = anime.trailer.youtube_id
            for (let i=0;i<genres.length;i++) {
                genresList.push(`"${genres[i].name}"`)
            };
            const themesList = []
            for (let i=0;i<themes.length;i++) {
                themesList.push(`"${themes[i].name}"`)
            };
            const studiosList = []
            for (let i=0;i<studios.length;i++) {
                studiosList.push(`"${studios[i].name}"`)
            };
            const score = anime.score
            const type = anime.type
            const animeData = [
              title,
              title_english,
              year,
              genresList,
              themesList,
              studiosList,
              source,
              score,
              type
            ];
    
            //console.log(`[["${anime.title}","${anime.title_english}"],${year},[${genresList}],[${themesList}],[${studiosList}],"${anime.source}",${score}]`)
     
            //console.log(animeData)
            const animeDonne = `[["${anime.title}","${anime.title_english}"],${year},[${genresList}],[${themesList}],[${studiosList}],"${anime.source}",${score},"${type}",${id},""]`

            /*Avant d'écrire dans le fichier pour mettre à jour il faut verifier que l'anime soit dans la liste afin d'eviter de devoir retrier*/

            const fs = require('fs');

            fs.appendFile('anime.js', `${animeDonne},\n`, (err) => {
              if (err) throw err;
              console.log('Le fichier a été créé !');
            });
            
          });
    
          
    
          if (data.data.length > 0 && totalAnime > 0) {
            setTimeout(() => {
                getTopAnimeData(page + 1, totalAnime - data.data.length);
              }, 1000)
           
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
}

function attendreUneSeconde() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

async function ecritureAnime() {

  for (let i=0; i < listTest.length; i++) {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${listTest[i].id}/full`);
    const data = await response.json();

    let anime = data.data
    console.log(data.data.mal_id)
    const yearTemp = new Date(anime.aired.from);
    const year = yearTemp.getFullYear();
    const img = anime.images.webp.large_image_url
    let genresList =[]
    for (let i=0;i<anime.genres.length;i++) {
      genresList.push(`"${anime.genres[i].name}"`)
    };
    let themesList = []
    for (let i=0;i<anime.themes.length;i++) {
        themesList.push(`"${anime.themes[i].name}"`)
    };
    let studiosList = []
    for (let i=0;i<anime.studios.length;i++) {
        studiosList.push(`"${anime.studios[i].name}"`)
    };


    const animeDonne = `{id: ${anime.mal_id},nom: ["${anime.title}","${anime.title_english}"],annee: ${year},genre: [${genresList}],theme: [${themesList}],studio: [${studiosList}],source: "${anime.source}",note: ${anime.score},type: "${anime.type}",op: "${listTest[i][9]}",img: "${img}"}`
    
    const fs = require('fs');

    fs.appendFile(path.join(__dirname, 'anime.js'), `${animeDonne},\n`, (err) => {
      if (err) throw err;
      console.log('Le fichier a été créé !');
    });

    await attendreUneSeconde();

  }
  
}

async function ajoutAnime(id) {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const data = await response.json();

  let anime = data.data
  console.log(data.data.mal_id)
  const yearTemp = new Date(anime.aired.from);
  const year = yearTemp.getFullYear();
  const img = anime.images.webp.large_image_url
  let genresList =[]
  for (let i=0;i<anime.genres.length;i++) {
    genresList.push(`"${anime.genres[i].name}"`)
  };
  let themesList = []
  for (let i=0;i<anime.themes.length;i++) {
      themesList.push(`"${anime.themes[i].name}"`)
  };
  let studiosList = []
  for (let i=0;i<anime.studios.length;i++) {
      studiosList.push(`"${anime.studios[i].name}"`)
  };


  const animeDonne = `{id: ${anime.mal_id},nom: ["${anime.title}","${anime.title_english}"],annee: ${year},genre: [${genresList}],theme: [${themesList}],studio: [${studiosList}],source: "${anime.source}",note: ${anime.score},type: "${anime.type}",op: "",img: "${img}"}`

  const fs = require('fs');

  fs.appendFile(path.join(__dirname, 'anime.js'), `${animeDonne},\n`, (err) => {
    if (err) throw err;
    console.log('Le fichier a été créé !');
  });
}

function verifSameListe(liste1,liste2) {
  for (let i=0;i<liste1.length;i++) {
    if (liste1[i].nom[0] != liste2[i].nom[0] || liste1[i].nom[1] != liste2[i].nom[1]) {
      const fs = require('fs');
      fs.appendFile(path.join(__dirname, 'animeDiff.txt'), `${liste1[i].nom} =/= ${liste2[i].nom}\n`, (err) => {
        if (err) throw err;
      });
    }
  }
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function demandeId() {
    readline.question('Rentre un id d\'anime ou exit pour arreter: ', (id) => {
      if (id == "exit") {
        readline.close();
      } else {
        ajoutAnime(id)
        demandeId()
      }
    });
}

readline.question('Rentre un chiffre batard entre 1 et 3 : (1 = ecriture, 2 = ajout, 3 = verif) ', (prompte) => {
  switch (prompte) {
    case "1":
      console.log("Update de la liste");
      ecritureAnime()
      readline.close();
      break;
    case "2":
      console.log("Ajout d'un anime à la liste");
      demandeId()
      break
    case "3":
      console.log("Verification des listes");
      verifSameListe(listTest,listO)
      readline.close();
      break;
    default:
      console.log("Pas compris")
      readline.close();
  }
})
