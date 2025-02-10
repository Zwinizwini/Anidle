<?php

require_once('../fonctions.php');
require_once('../mysql/connect.php');

function crop_image_center($image_path, $new_width, $new_height) {
    // Charger l'image
    $image = imagecreatefromstring($image_path);

    // Obtenir les dimensions originales
    $width = imagesx($image);
    $height = imagesy($image);

    // Calculer les coordonnées du rectangle à rogner
    $x = ($width - $new_width) / 2;
    $y = ($height - $new_height) / 2;

    // Rogner l'image
    $new_image = imagecrop($image, ['x' => $x, 'y' => $y, 'width' => $new_width, 'height' => $new_height]);

    // Libérer la mémoire de l'ancienne image
    imagedestroy($image);

    // Retourner la nouvelle image
    return $new_image;
}


/**
 * On ne traite pas les super globales provenant de l'utilisateur directement,
 * ces données doivent être testées et vérifiées.
 */
$postData = $_POST;
// Validation du formulaire
if (isset($postData['email'])) {
    // Verfiication de validité d'email
    if (!filter_var($postData['email'], FILTER_VALIDATE_EMAIL)) {
        $_SESSION['LOGIN_ERROR_MESSAGE'] = 'Il faut un email valide pour soumettre le formulaire.';
    } else {
        $modifEmailStatement = $mysqlClient->prepare('UPDATE users SET email=:email WHERE id=:id');
        $modifEmailStatement->execute([
            'email' => $postData['email'],
            'id' => $_SESSION['LOGGED_USER']['id'],
        ]);
        $_SESSION['LOGGED_USER']['email'] = $postData['email'];
    }
}

if (isset($postData['pseudo'])) {
    // Verfiication pseudo non vide
    if(trim($postData['pseudo'] !== '')) {
        $modifPseudoStatement = $mysqlClient->prepare('UPDATE users SET pseudo=:pseudo WHERE id=:id');
        $modifPseudoStatement->execute([
            'pseudo' => $postData['pseudo'],
            'id' => $_SESSION['LOGGED_USER']['id'],
        ]);
        $_SESSION['LOGGED_USER']['pseudo'] = $postData['pseudo'];
    }
}



// Testons si le fichier a bien été envoyé et s'il n'y a pas des erreurs
if (isset($_FILES['pfp']) && $_FILES['pfp']['error'] === 0) {
    // Testons, si le fichier est trop volumineux
    if ($_FILES['pfp']['size'] > 10000000000) {
        echo "L'envoi n'a pas pu être effectué, erreur ou image trop volumineuse";
        return;
    }
    // Testons, si l'extension n'est pas autorisée
    $fileInfo = pathinfo($_FILES['pfp']['name']);
    $extension = $fileInfo['extension'];
    $allowedExtensions = ['jpg', 'jpeg', 'png'];
    if (!in_array($extension, $allowedExtensions)) {
        echo "L'envoi n'a pas pu être effectué, l'extension {$extension} n'est pas autorisée";
        return;
    }
    // Testons, si le dossier uploads est manquant
    $path = __DIR__ . '/uploads/';
    if (!is_dir($path)) {
        echo "L'envoi n'a pas pu être effectué, le dossier uploads est manquant";
        return;
    }

    //Test si le fichier existe deja et si oui on supprime
    $motif = $path . $_SESSION['LOGGED_USER']['pseudo']. '*';
    $fichierTrouver = glob($motif);
    if (count($fichierTrouver) > 0) {
        unlink($fichierTrouver[0]);
    }

    $imageDef = $_FILES['pfp']['tmp_name'];
    print_r($_FILES['pfp']);
    $image = imagecreatefromstring(file_get_contents($imageDef));
    $width = imagesx($image);
    $height = imagesy($image);
    echo $width;
    echo $height;
    if ($width !== $height) {
        if ($width > $height) {
            $imageDef = crop_image_center(file_get_contents($imageDef),$height,$height);
        } else {
            $imageDef = crop_image_center(file_get_contents($imageDef),$width,$width);
        }
        
    }

    // On peut valider le fichier et le stocker définitivement
    $cheminPhoto = $path . $_SESSION['LOGGED_USER']['pseudo'] . '.' . $extension;
    $photo = 'uploads/'. $_SESSION['LOGGED_USER']['pseudo'] . '.' . $extension;
    if ($width === $height) {
        move_uploaded_file($imageDef, $cheminPhoto);
    } else {
        switch ($extension) {
            case 'jpeg' :
                imagejpeg($imageDef,$cheminPhoto);
                break;
            case 'png' :
                imagepng($imageDef,$cheminPhoto);
                break;
            default:
                throw new Exception("Format d'image non supporté");
        }
    }
    $modifPhotoStatement = $mysqlClient->prepare('UPDATE users SET pfp=:pfp WHERE id=:id');
    $modifPhotoStatement->execute([
        'pfp' => $photo,
        'id' => $_SESSION['LOGGED_USER']['id'],
    ]);
    $_SESSION['LOGGED_USER']['pfp'] = $photo;
}

redirectToUrl('compte.php');
