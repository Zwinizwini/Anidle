<?php

require_once('../fonctions.php');
require_once('../mysql/connect.php');

/**
 * On ne traite pas les super globales provenant de l'utilisateur directement,
 * ces données doivent être testées et vérifiées.
 */
$postData = $_POST;
$valid = true;
$score = 0;
$pfp = "uploads/utilisateur.png";
// Validation du formulaire
if (isset($postData['email']) && isset($postData['mdp']) && isset($postData['pseudo'])) {
    // Verfiication de validité d'email
    if (!filter_var($postData['email'], FILTER_VALIDATE_EMAIL)) {
        $_SESSION['SINGUP_ERROR_MSG'] = 'Il faut un email valide pour soumettre le formulaire.';
    } elseif ($postData['mdp'] !== $postData['mdp2']) {
        $_SESSION['SINGUP_ERROR_MSG'] = 'Mots de passe non indentique.';
    } else {
        foreach ($users as $user) {
            if (
                $user['email'] === $postData['email'] ||
                $user['pseudo'] === $postData['pseudo']
            ) {
                $_SESSION['SINGUP_ERROR_MSG'] = 'Pseudo ou Email déjà utilisé';
                $valid = false;
            }
        }

        if ($valid) {
            $motDePasseChiffre = password_hash($postData['mdp'], PASSWORD_DEFAULT);
            $newUserStatement = $mysqlClient->prepare('INSERT INTO users (pseudo,email,password,score,pfp) VALUES (?,?,?,?,?)');
            $newUserStatement->bindParam(1, $postData['pseudo']);
            $newUserStatement->bindParam(2, $postData['email']);
            $newUserStatement->bindParam(3, $motDePasseChiffre);
            $newUserStatement->bindParam(4, $score);
            $newUserStatement->bindParam(5, $pfp);
            $newUserStatement->execute();
        }
    }

    
}

redirectToUrl("compte.php");