<?php require_once(__DIR__ . '/mysql/connect.php')
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/connexion.css">
    <link rel="icon" type="image/png" href="images/logo.jpg" />
    <script src="scripts/config.js" defer></script>
    <script src="scripts/anidex.js" defer></script>
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

    <main>
        <div id="listeTitreJoueur" data-id="<?php echo json_encode($listeT); ?>" style="display: none"></div>
        <div id="listeTitreNom" style="display: none"><?php echo json_encode($listeNomTitre); ?></div>
        <div id="listeAnime" data-id="<?php echo json_encode($liste); ?>" style="display: none"></div>
        <div id="listeCG" style="display: none"><?php echo json_encode($listeCG); ?></div>
       <?php require_once(__DIR__ . '/login.php'); ?>
       <?php if(isset($_SESSION['LOGGED_USER'])):?>
            <div class="conteneur compte">
                <div class="profil">
                    <div class="img">
                        <img src="<?php echo $_SESSION['LOGGED_USER']['pfp']?>" alt="pfp">
                    </div>
                    <div class="infoJ">
                        <p class="pseudo"><?php echo $_SESSION['LOGGED_USER']['pseudo']?></p><br>
                        <p class="compteTitre">Titre : <span><?php echo $_SESSION['LOGGED_USER']['titre']?></span></p>
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
                <div class="titre bordure desac">
                    <h2 style="margin-top: 0px;margin-bottom: 10px">Titre :</h2>
                    <div class="affichageTitre">
                    </div>
                </div>
                <?php require_once(__DIR__ . '/modifier.php'); ?>
                <div class="boutton"><a href="logout.php">Se Deconnecter</a></div>
            </div>
        <?php endif;?>
    </main>
    
</body>
</html>

