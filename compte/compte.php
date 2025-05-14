<?php require_once('../mysql/connect.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="../style/style.css">
    <link rel="stylesheet" href="../style/connexion.css">
    <link rel="icon" type="image/png" href="../images/logo.jpg" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <script src="../scripts/background.js" defer></script>
    <script src="../scripts/config.js" defer></script>
    <script src="../scripts/anidex.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <header>
        <nav>
        <?php require_once('../header.php');?>
            
        </nav>
    </header>

    <main>
        <a id="top"></a>


        <div id="listeTitreJoueur" data-id="<?php echo json_encode($listeT); ?>" style="display: none"></div>
        <div id="listeTitreNom" style="display: none"><?php echo json_encode($listeNomTitre); ?></div>
        <div id="listeAnime" data-id="<?php echo json_encode($liste); ?>" style="display: none"></div>
        <div id="listeCG" style="display: none"><?php echo json_encode($listeCG); ?></div>

        <div id="pageAmis" data-id="<?php echo json_encode(false); ?>" style="display: none"></div>
        <div id="pageIndex" data-id="<?php echo json_encode(false); ?>" style="display: none"></div>

       <?php require_once(__DIR__ . '/login.php'); ?>
       <?php if(isset($_SESSION['LOGGED_USER'])):?>
            <div class="conteneur compte">
                <div class="profil">
                    <div class="img">
                        <img src="../<?php echo $_SESSION['LOGGED_USER']['pfp']?>" alt="pfp" class="pfp">
                        <img src="../images/badge/titre<?php echo $badge[0]['id'];?>.jpg" alt="badge de titre" class="badge">
                    </div>
                    <div class="infoJ">
                        <p class="pseudo"><?php echo $_SESSION['LOGGED_USER']['pseudo']?></p><br>
                        <p class="compteTitre">Titre : <span><?php echo $badge[0]['nom'];?></span></p>
                        <p>Votre meilleure série : <?php echo $_SESSION['LOGGED_USER']['score']?></p>
                    </div>
                </div>
                
                <div class="changement">
                    <button class="nonActif">Anidex</button>
                    <button class="actif">Modifier</button>
                    <button class="nonActif">Titre</button>
                </div>
                <div class="anidex bordure desac">
                    <div class="divTrier">
                        <div class="boutonTrier" style="padding: 5px">
                            <label for="trier">Filtrer genre :</label>
                            <select name="trier" id="trier">
                                <option value="0" selected>Par Defaut</option>
                            </select>
                        </div>
                        <div class="boutonTrier" style="padding: 5px">
                            <button value="0" id="defaut" class="btnDesac">Par Defaut</button>
                            <button value="1" id="date" class="btnDesac">Date<img src=""/></button>
                            <button value="2" id="note" class="btnDesac">Note<img src=""/></button>
                        </div>
                    </div>
                    <div id="affichageAnidex">
                    </div>
                </div>
                <div class="titre bordure desac" style="padding: 20px 0px">
                    <h2 style="margin-top: 0px;margin-bottom: 10px">Titre :</h2>
                    <div class="affichageTitre">
                    </div>
                </div>
                <?php require_once(__DIR__ . '/modifier.php'); ?>
                <div class="boutton"><a href="logout.php">Se Deconnecter</a></div>
            </div>
        <?php endif;?>
        <script>
            function scrollToTop() {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        </script>
        
    </main>
    <img onclick="scrollToTop()" src="../images/top-page.png" alt="Top" class="top"/>
    <div class='footer' id="footer">
        <?php 
            $pageIndex = false;
            require('../footer.php');
        ?>
    </div>
    
</body>
</html>
