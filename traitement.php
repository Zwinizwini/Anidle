<?php
require_once(__DIR__ . '/mysql/connect.php');
// Récupérer les données envoyées par JavaScript
$nom = $_POST['nom'];
$id = $_SESSION['LOGGED_USER']['id'];


if (isset($nom)) {
    $ajoutAnime = $mysqlClient->prepare('INSERT INTO listeanime (user_id,anime_id) VALUES (?,?)');
    $ajoutAnime->bindParam(1,$id);
    $ajoutAnime->bindParam(2,$nom);
    $ajoutAnime->execute();
}

$nb_guess = $_POST['nb_guess'];
if (isset($nb_guess)) {
    $updateNbGuess = $mysqlClient->prepare('UPDATE users SET nb_guess=:nb_guess WHERE id=:id');
    $updateNbGuess->execute([
        'nb_guess' => $nb_guess,
        'id' => $id
    ]);
}

?>