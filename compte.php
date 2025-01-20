<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/connexion.css">
    <link rel="icon" type="image/png" href="images/logo.jpg" />
</head>
<body>
    <header>
        <nav>
            <div class="image">
                <a href="index.php"><img src="images/logo.jpg"></a>
            </div>
            <a href="index.php" id="titreRouge"><h1>Zwinidle</h1></a>
            <div class="compteIcone">
                <a href="compte.php"><img src="images/utilisateur.png" alt="compte"></a>
                <a href="compte.php" class="compteTel">Compte</a>
            </div>
            
        </nav>
    </header>

    <main>
       <?php require_once(__DIR__ . '/login.php'); ?>
       <?php if(isset($_SESSION['LOGGED_USER'])):?>
            <div class="conteneur compte">
                <div class="profil">
                    <div class="img">
                        <img src="<?php echo $_SESSION['LOGGED_USER']['pfp']?>" alt="pfp">
                    </div>
                    <div class="infoJ">
                        <p class="pseudo"><?php echo $_SESSION['LOGGED_USER']['pseudo']?></p><br>
                        <p>Votre meilleure série : <?php echo $_SESSION['LOGGED_USER']['score']?></p>
                    </div>
                </div>
                
                <?php require_once(__DIR__ . '/modifier.php'); ?>
                <div class="boutton"><a href="logout.php">Se Deconnecter</a></div>
            </div>
        <?php endif;?>
    </main>
    
</body>
</html>

