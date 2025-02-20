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

$bestScoreStatement = $mysqlClient->prepare('SELECT pseudo,score,pfp,nb_guess FROM users ORDER BY nb_guess DESC LIMIT 10 ');
$bestScoreStatement->execute();
$bestScore = $bestScoreStatement->fetchAll();


if(isset($_SESSION['LOGGED_USER'])) {

    $listeUserNonAmisStatement = $mysqlClient->prepare('SELECT u.pseudo, u.pfp, u.id FROM users u WHERE u.id !=:id AND u.id NOT IN (SELECT uid2 FROM listeamis WHERE uid1=:id)');
    $listeUserNonAmisStatement->execute([
        'id' => $_SESSION['LOGGED_USER']['id']
    ]);
    $listeUserNonAmis = $listeUserNonAmisStatement->fetchAll(PDO::FETCH_ASSOC);

    $demandeEnvoieStatement = $mysqlClient->prepare('SELECT uid_recue FROM demandeamis WHERE uid_demande=:id');
    $demandeEnvoieStatement->execute([
        'id' => $_SESSION['LOGGED_USER']['id']
    ]);
    $demandeEnvoieListe = $demandeEnvoieStatement->fetchAll(PDO::FETCH_ASSOC);

    $demandeAmisStatement = $mysqlClient->prepare('SELECT users.pseudo,users.pfp,users.id FROM demandeamis,users WHERE users.id = demandeamis.uid_demande AND demandeamis.uid_recue=:id');
    $demandeAmisStatement->execute([
        'id' => $_SESSION['LOGGED_USER']['id']
    ]);
    $demandeAmisListe = $demandeAmisStatement->fetchAll(PDO::FETCH_ASSOC);

    $listeAmisStatement = $mysqlClient->prepare('SELECT u.id,u.pseudo,u.pfp,u.titre, t.nom FROM users u JOIN titre t ON u.titre = t.id WHERE u.id IN (SELECT uid2 FROM listeamis WHERE uid1=:id)');
    $listeAmisStatement->execute([
        'id' => $_SESSION['LOGGED_USER']['id']
    ]);
    $listeAmis = $listeAmisStatement->fetchAll(PDO::FETCH_ASSOC);

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

    $listeTitreStatement = $mysqlClient->prepare('SELECT titre_id FROM attribution_titre WHERE user_id=:id');
    $listeTitreStatement->execute([
        'id' => $_SESSION['LOGGED_USER']['id']
    ]);
    $listeTitre = $listeTitreStatement->fetchAll();
    $listeT = [];
    foreach($listeTitre as $titre) {
        array_push($listeT,$titre[0]);
    }

    $ConditionStatement = $mysqlClient->prepare('SELECT * FROM titre');
    $ConditionStatement->execute();
    $listeCondition = $ConditionStatement->fetchAll();
    $listeC = [];
    $listeNomTitre = [];
    foreach($listeCondition as $titre) {
        if ($titre[2] != null) {
            $ltc = [$titre[0],$titre[2]];
            array_push($listeC,$ltc);
        }
        $lt = [$titre[0],$titre[1],$titre[2],$titre[3]];
        array_push($listeNomTitre,$lt);
    }

    $ConditionGenreStatement = $mysqlClient->prepare('SELECT * FROM titre WHERE condition_genres IS NOT NULL');
    $ConditionGenreStatement->execute();
    $listeConditionGenre = $ConditionGenreStatement->fetchAll();
    $listeCG = [];
    $pattern = "/[ ]/";
    foreach($listeConditionGenre as $titre) {
        $condition = preg_split($pattern,$titre[3]);
        $ltcg = [$titre[0],$titre[1],(int) $condition[0],$condition[1]];
        array_push($listeCG,$ltcg);
    }


    $badgeStatement = $mysqlClient->prepare('SELECT titre.id,titre.nom FROM titre,users WHERE users.titre = titre.id');
    $badgeStatement->execute();
    $badge = $badgeStatement->fetchAll();
}