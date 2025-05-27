<?php 
require_once('../mysql/connect.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="../style/style.css">
    <link rel="stylesheet" href="../style/hsr.css">
    <link rel="stylesheet" href="../style/pokeSuggestion.css">
    <link rel="icon" type="image/png" href="../images/logo.jpg" />
    <script src="../scripts/background.js"></script>
    <script type="module" src="../scripts/pokedle.js" defer></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <!-- <script>
        document.addEventListener('contextmenu', event => {
            event.preventDefault();
        });
    </script> -->
    
    
</head>
<body>

    <div id="pageIndex" data-id="<?php echo json_encode(false); ?>" style="display: none"></div>
    <header>
        <nav>
            <?php require_once('../header.php');?>
        </nav>
    </header>
    

    <main class="d-flex">
        <div class="div70 d-flex">
            <div class="reponse desac" id="pokeReponse">
                <img src="" alt="HoloLive Member" id="HoloImg">
                <button class="nextHolo" id="nextHolo">Next Character</button>
            </div>
            <div class="vie"></div>
            <form class="proposition" id="pokeform">
                <input type="text" id="iptJoueur" name="iptJoueur" placeholder="Enter a character">
                <button id="pokeball"><img src="../images/pokeball_ferme.png" alt="Valider"></button>
            </form>
            <script>
                $('input').on('focus',function() {
                    $('form button img').attr('src', '../images/pokeball_ouverte.png');
                })
                $('input').on('focusout',function() {
                    $('form button img').attr('src', '../images/pokeball_ferme.png');
                })
            </script>
        </div>
        
        <div class="tableau">
            <table class="desac">
                    <thead>
                        <tr>
                            <th>Pokemon</th>
                            <th>Type 1</th>
                            <th>Type 2</th>
                            <th>Generation</th>
                            <th>Pokedex ID</th>
                            <th>Stade Evolution</th>
                            <th>Taille (m)</th>
                            <th>Poids (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
            </table>
        </div>
    </main>
    <div class='footer' id="footer">
        <?php 
            $pageIndex = false;
            require('../footer.php');
        ?>
    </div>
    
</body>
</html>