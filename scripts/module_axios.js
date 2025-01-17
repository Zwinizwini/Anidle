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

