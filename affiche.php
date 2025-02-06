<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="icon" type="image/png" href="images/logo.jpg" />
    <script src="scripts/config.js" defer></script>
    <script src="scripts/script.js" defer></script>
    <script src="scripts/affiche.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/affiche.css">
    <script>
        document.addEventListener('contextmenu', event => {
            event.preventDefault();
        });
    </script>
</head>
<body>
    <?php require_once(__DIR__. '/header.php');?>
    <main>
       <div class="div70">
            <div class="affiche desac">
                <img src="" alt="affiche">
            </div>
            <div class="conteneurCanva desac">
                <canvas id="monCanvas"></canvas>
            </div>
            <button class="afficheSuivante desac" id="afficheSuivante">Guess Suivant</button>
            <div class="vie"></div>
            <form>
                <input type="text" id="iptJoueur" placeholder="Entrez un Anime">
                <button id="btnValider">Valider</button>
            </form>
            <div class="reponseJoueur"></div>
       </div> 
    </main>
</body>

<div class="popupBackground">
    <div class="popup">
        <button class="startGame fondActiver">COMMENCER UNE PARTIE</button>
        <div class="popupDiv" style="display: flex;gap: 15px;">
            <label for="flou-pixel">Choix : </label>
            <select name="flou-pixel" id="flou-pixel">
                <option value="flou">Flou</option>
                <option value="pixel">Pixel</option>
            </select>
        </div>
        <div class="popupDiv">
            <label for="invert" class="container">Inverser les couleurs : 
                <input type="checkbox" id="invert" name="invert">
                <span class="checkmark"></span>
            </label>
        </div>
    </div>
</div>

</html>