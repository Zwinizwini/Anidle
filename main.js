//Requete pour chopper des niame 


// import axios from "../node_modules\\axios\\lib\\axios.js"

// async function fetchAnimeData(page = 1) {
//   try {
//     const response = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`);
//     const data = response.data.data;

//     // Traiter les données de chaque anime
//     data.forEach(anime => {
//       console.log(anime.title); // Remplacer par votre traitement personnalisé
//     });

//     // Si la page suivante existe, faire une nouvelle requête
//     if (data.length > 0) {
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Délai de 1 seconde
//       await fetchAnimeData(page + 1);
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération des données:', error);
//   }
// }





/*
async function getTopAnimeData(page = 1, totalAnime = 10000) {

     try {
       const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&type=tv`);
       const data = await response.json();
  
       data.data.forEach(anime => {
         const { title, title_english, start_date, genres, themes, studios, source, scored, type } = anime;
         const yearTemp = new Date(anime.aired.from);
         const year = yearTemp.getFullYear();
         const genresList = []
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

         console.log(`[["${anime.title}","${anime.title_english}"],${year},[${genresList}],[${themesList}],[${studiosList}],"${anime.source}",${score}]`)
  
         console.log(animeData)
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
*/







  
// let tempsDepart = Date.now()
// getTopAnimeData();
// let tempsFin = Date.now()
// console.log(tempsFin - tempsDepart)

// localStorage.setItem('ListeAnime', JSON.stringify(listeJikan))
// // fetchAnimeData();

// const listeJikanTest = JSON.parse(localStorage.getItem('ListeAnime'))
// console.log(listeJikanTest)