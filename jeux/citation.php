<?php 
require_once(__DIR__ . '/mysql/connect.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/citation.css">
    <link rel="icon" type="image/png" href="images/logo.jpg" />
    <script src="scripts/citation.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <header>
        <nav>
            <div class="image">
                <a href="index.php"><img src="images/logo.png"></a>
            </div>
            <a href="index.php" id="titreRouge"><h1>Zwinidle</h1></a>
            <div class="compteIcone">
            <a href="compte.php"><img src=<?php echo (isset($_SESSION['LOGGED_USER'])) ?  $_SESSION['LOGGED_USER']['pfp'] :  "images/utilisateur.png"?> alt="compte"></a>
                <a href="compte.php" class="compteTel">Compte</a>
            </div>
            
        </nav>
    </header>

    <main class="d-flex">
            <p class="citation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rhoncus vitae erat in consequat. Sed eu ipsum neque. Ut ullamcorper eu massa eu feugiat. Maecenas ultrices in nunc ultrices dignissim. Cras suscipit erat eget massa convallis, quis auctor urna mollis. Donec gravida a nibh ut accumsan. Aenean vulputate ex et velit sollicitudin, ut pellentesque mauris gravida. Sed imperdiet convallis erat non aliquam. Integer fermentum neque eu magna dapibus, at ullamcorper justo cursus. Donec faucibus neque nisi, imperdiet laoreet eros vehicula bibendum. Maecenas pellentesque metus nisi, vitae venenatis ante porttitor vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus placerat porta. </p>
            <form class="guess">
                <input type="text" id="iptJoueur" name="iptJoueur" autofocus>
                <button id="btnValid">Valider</button>
            </form>
    </main>
   
</body>
</html>