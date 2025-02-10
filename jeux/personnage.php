<?php 
require_once(__DIR__ . '/mysql/connect.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="icon" type="image/png" href="images/logo.jpg" />
    <script type="module" src="scripts/persoGuess.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
    <?php require_once(__DIR__. '/header.php');?>
    <main class="d-flex">
        <div class="div70 d-flex">
            <div class="indice">
                <img src="" alt="photo perso" style="visibility: hidden;">
                <div>
                    <div class="surnom" style="visibility: hidden;">
                        <h2>Surnom du Perso :</h2>
                        <p></p>
                    </div>
                    <div class="nomAnime" style="visibility: hidden;">
                        <h2>Nom de l'anime :</h2>
                        <p></p>
                    </div>
                </div>
            </div>
            <form>
                <input type="text" id="iptJoueur" placeholder="Entrez un nom de personnage">
                <button id="btnValider">Valider</button>
            </form>
            <table class="persoTable">
                <thead>
                    <tr>
                        <th>Nom Romanji</th>
                        <th>Age</th>
                        <th>Taille</th>
                        <th>Seiyuu</th>
                        <th>Nb Favorite</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </main>
</body>
</html>