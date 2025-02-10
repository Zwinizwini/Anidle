<?php require_once('../mysql/connect.php');
?>

<header>
    <nav>
        <div class="image">
            <a href="../index.php"><img src="../images/logo.png"></a>
        </div>
        <a href="../index.php" id="titreRouge"><h1>Zwinidle</h1></a>
        <div class="compteIcone">
            <a href="../compte/compte.php"><img src='../<?php echo (isset($_SESSION['LOGGED_USER'])) ?  $_SESSION['LOGGED_USER']['pfp'] :  "images/utilisateur.png"?>' alt="compte"></a>
            <a href="../compte/compte.php" class="compteTel">Compte</a>
        </div>
        
    </nav>
</header>