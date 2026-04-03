const listTest = require('./listeTest.js')
const listO = require('./listeO.js')
const fs = require('fs').promises;
const path = require('path');

let obj1 = {id: 30363,nom: ["Shinmai Maou no Testament Burst","The Testament of Sister New Devil: Burst"],annee: 2015,genre: ["Action","Supernatural","Ecchi"],theme: ["Harem"],studio: ["Production IMS"],source: "Light novel",note: 6.79,type: "TV",op: "uR2w7-e3Rj0",img: "https://cdn.myanimelist.net/images/anime/1151/94750l.webp"}
let obj2 = {id: 55318,nom: ["Medalist"],annee: 2025,genre: ["Drama","Sports"],theme: ["Performing Arts"],studio: ["ENGI"],source: "Manga",note: 8.4,type: "TV",op: "H3SUAiwfyp0",img: "https://cdn.myanimelist.net/images/anime/1029/146850l.webp"}

if (obj1 && obj1.label) {
    console.log(obj1.label);
} else {
    console.error('obj1 does not have a label property');
}
if (obj2 && obj2.label) {
    console.log(obj2.label);
} else {
    console.error('obj2 does not have a label property');
}

