<?php
session_start(); 

try {
    $mysqlClient = new PDO(
        sprintf('mysql:host=localhost;dbname=anime;port=3306;charset=utf8',),
        'root',
        ''
    );
    $mysqlClient->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $exception) {
    die('Erreur : ' . $exception->getMessage());
}


$usersStatement = $mysqlClient->prepare('SELECT * FROM users');
$usersStatement->execute();
$users = $usersStatement->fetchAll();

$bestScoreStatement = $mysqlClient->prepare('SELECT pseudo,score,pfp FROM users ORDER BY score DESC LIMIT 10 ');
$bestScoreStatement->execute();
$bestScore = $bestScoreStatement->fetchAll();


if(isset($_SESSION['LOGGED_USER'])) {
    $listeAnimeStatement = $mysqlClient->prepare('SELECT anime_id FROM listeanime WHERE user_id=:id');
    $listeAnimeStatement->execute([
        'id' => $_SESSION['LOGGED_USER']['id']
    ]);
    $listeAnime = $listeAnimeStatement->fetchAll();
    $liste = [];
    foreach($listeAnime as $anime) {
        array_push($liste,$anime[0]);
    }

    $nbGuessStatement = $mysqlClient->prepare('SELECT nb_guess FROM users WHERE id=:id');
    $nbGuessStatement->execute([
        'id' => $_SESSION['LOGGED_USER']['id']
    ]);
    $nb_guessTemp = $nbGuessStatement->fetchAll();
    $nb_guess = $nb_guessTemp[0][0];
}