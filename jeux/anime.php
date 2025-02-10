<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/jeu.css">
    <link rel="icon" type="image/png" href="images/logo.jpg" />
    <script src="scripts/config.js" defer></script>
    <script src="scripts/script.js" defer></script>
    <script src="scripts/guessScreen.js" defer></script>
</head>
<body>
    <header>
        <nav>
            <div class="image">
                <a href="index.php"><img src="images/logo.jpg"></a>
            </div>
            <h1>Anidle</h1>
            <div>
                <a href="compte.php"><img src="images/utilisateur.png" alt="compte"></a>
            </div>
            
        </nav>
    </header>

    <main>
        <h2>Guess Screenshot</h2>
        <img id="img-guess">
        <div class="bouton">
            <button class="photo fond souris">Original</button>
            <button class="photo souris">Indice 1</button>
            <button class="photo ">Indice 2</button>
        </div>
        <div class="proposition">
            <input type="text" name="rps" id="rps">
            <button id="btnValid">Valider</button>
        </div>
        <p>Votre score : <span>0</span></p>
    </main>
    
</body>
</html>