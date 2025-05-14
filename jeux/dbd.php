<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="../style/style.css">
    <link rel="stylesheet" href="../style/dbd.css">
    <link rel="icon" type="image/png" href="../images/logo.jpg" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <script type="module" src="../scripts/dbd.js" defer></script>
</head>
<body>
    <header>
        <nav>
            <?php require_once('../header.php');?>
        </nav>
    </header>
    <main class="d-flex">
        <div class="div70 d-flex">
            <div class="reponse desac">
                <img src="" alt="Killer" id="HoloImg">
                <button class="nextHolo" id="nextHolo">Next Character</button>
            </div>
            <audio id="monAudio" src=""></audio>
            <div class="bouton-div">
                <div><button data-id="1" class="bouton-audio btn-cursor"><img src="../images/jouer.png" alt=""></button>32m</div>
                <div><button data-id="2" class="bouton-audio grisatre"><img src="../images/jouer.png" alt=""></button>16m</div>
                <div><button data-id="3" class="bouton-audio grisatre"><img src="../images/jouer.png" alt=""></button>8m</div>
                <div><button data-id="4" class="bouton-audio grisatre"><img src="../images/jouer.png" alt=""></button>Chase</div>
            </div>
            <div class="reglageVol">
                <div class="range">
                    <input type="range" id="volume" min="0" max="100" step="1" value="30">
                </div>
                <p><span>30</span>%</p>
            </div>
            <div class="vie"></div>
            <form class="proposition">
                <input type="text" id="iptJ" name="iptJoueur" placeholder="Enter a killer" autofocus>
                <button id="btnJ"><img src="../images/loupe.png" alt="Valider"></button>
            </form>
        </div>
        <div class="perso"></div>
    </main>
    <div class='footer' id="footer">
        <?php 
            $pageIndex = false;
            require('../footer.php');
        ?>
    </div>

</body>
</html>