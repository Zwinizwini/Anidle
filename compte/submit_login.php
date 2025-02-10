<?php

require_once('../fonctions.php');
require_once('../mysql/connect.php');

/**
 * On ne traite pas les super globales provenant de l'utilisateur directement,
 * ces données doivent être testées et vérifiées.
 */
$postData = $_POST;
$serie = 0;
print_r ($postData);
echo 'Avant if';
// Validation du formulaire
if (isset($postData['identifiant']) &&  isset($postData['mdp'])) {
    echo 'Apres if';
    foreach ($users as $user) {
        if (
            ($user['email'] === $postData['identifiant'] || $user['pseudo'] === $postData['identifiant']) &&
            password_verify($postData['mdp'], $user['password'])
        ) {
            $_SESSION['LOGGED_USER'] = [
                'email' => $user['email'],
                'pseudo' => $user['pseudo'],
                'score' => $user['score'],
                'id' => $user['id'],
                'pfp' => $user['pfp'],
                'titre' => $user['titre'],
                'serie_enCour' => $serie,
            ];
        }
    }

        if (!isset($_SESSION['LOGGED_USER'])) {
            $_SESSION['LOGIN_ERROR_MESSAGE'] = sprintf('Email ou Mot de passe incorrect');
            redirectToUrl('compte.php');
        } else {
            redirectToUrl('compte.php');
        }
    

    
}

