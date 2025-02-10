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
    for ($i = 0; $i < count($listeC); $i++) {
        if (!in_array($listeC[$i][0],$listeT) && $nb_guess > $listeC[$i][1]) {
            $ajoutTitre = $mysqlClient->prepare('INSERT INTO attribution_titre (user_id,titre_id) VALUES (?,?)');
            $ajoutTitre->bindParam(1,$id);
            $ajoutTitre->bindParam(2,$listeC[$i][0]);
            $ajoutTitre->execute();
        } 
        
    }
}

$titre = $_POST['titre'];
if (isset($titre)) {
    $updateTitre = $mysqlClient->prepare('UPDATE users SET titre=:titre WHERE id=:id');
    $updateTitre->execute([
        'titre' => $titre,
        'id' => $id
    ]);
    $_SESSION['LOGGED_USER']['titre'] = $titre;
}

$idTitre = $_POST['idTitre'];
if (isset($idTitre)) {
    $ajoutTitre = $mysqlClient->prepare('INSERT INTO attribution_titre (user_id,titre_id) VALUES (?,?)');
    $ajoutTitre->bindParam(1,$id);
    $ajoutTitre->bindParam(2,$idTitre);
    $ajoutTitre->execute();
}


$serieEnCours = $_POST['serieEnCours'];
if (isset($serieEnCours)) {
    $_SESSION['LOGGED_USER']['serie_enCour'] = $serieEnCours;
}


$score = $_POST['score'];
if($score && isset($_SESSION['LOGGED_USER'])) {
    $scoreUser = $_SESSION['LOGGED_USER']['score'];
    if ($score > $scoreUser) {
        $_SESSION['LOGGED_USER']['score'] = $score;
        $newScoreStatement = $mysqlClient->prepare('UPDATE users SET score = :max_score WHERE pseudo = :pseudo');
        $newScoreStatement->bindParam(':max_score', $score);
        $newScoreStatement->bindParam(':pseudo', $_SESSION['LOGGED_USER']['pseudo']);
        $newScoreStatement->execute();
    }
}


?>