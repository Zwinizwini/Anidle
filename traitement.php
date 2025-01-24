<?php
require_once(__DIR__ . '/mysql/connect.php');
// Récupérer les données envoyées par JavaScript
$nom = $_POST['nom'];
echo $nom;
$id = $_SESSION['LOGGED_USER']['id'];

// Traitement des données (par exemple, enregistrement dans une base de données)
// ...
if (isset($nom)) {
    // Verfiication pseudo non vide
    $ajoutAnime = $mysqlClient->prepare('INSERT INTO listeanime (user_id,anime_id) VALUES (?,?)');
    $ajoutAnime->bindParam(1,$id);
    $ajoutAnime->bindParam(2,$nom);
    $ajoutAnime->execute();
}


// Renvoyer une réponse (exemple : un message de confirmation)
echo "Bonjour, $nom !";
?>