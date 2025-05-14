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
    <link rel="icon" type="image/png" href="../images/logo.jpg" />
    <script src="../scripts/background.js"></script>
    <script type="module" src="../scripts/hsrGuess.js" defer></script>
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
            <div class="reponse desac">
                <img src="" alt="HoloLive Member" id="HoloImg">
                <button class="nextHolo" id="nextHolo">Next Character</button>
            </div>
            <div class="vie"></div>
            <form class="proposition">
                <input type="text" id="iptJoueur" name="iptJoueur" placeholder="Enter a character" autofocus>
                <button>Valider</button>
            </form>
        </div>
        
        <div class="tableau">
            <table class="desac">
                    <thead>
                        <tr>
                            <th>Character</th>
                            <th>Path</th>
                            <th>Element</th>
                            <th>Rarity</th>
                            <th>Version</th>
                            <th>Gender</th>
                            <th>Height</th>
                            <th>Species</th>
                            <th>Factions</th>
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