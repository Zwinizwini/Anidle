<?php
require_once('../mysql/connect.php');
?>
<?php if (!isset($_SESSION['LOGGED_USER'])) : ?>
<div class="conteneur">
    <div>
        <form action="submit_login.php" method="POST" class="connexion">
                <input type="text" id="identifiant" name="identifiant" placeholder="Pseudo / Email" required>
                <input type="password" id="mdp" name="mdp" placeholder="Mot de passe" required>
            <button type="submit">Se Connecter</button>
        </form>
    </div>

    <?php if (isset($_SESSION['LOGIN_ERROR_MESSAGE'])) : ?>
        <p><?php echo $_SESSION['LOGIN_ERROR_MESSAGE'];?></p>
        <?php $_SESSION['LOGIN_ERROR_MESSAGE'] = '';?>
    <?php endif; ?>
    <?php if (isset($_SESSION['SINGUP_ERROR_MSG'])) : ?>
        <p><?php echo $_SESSION['SINGUP_ERROR_MSG'];?></p>
        <?php $_SESSION['SINGUP_ERROR_MSG'] = '';?>
    <?php endif; ?>
    <div class="signup">
        <div>
            <a href="signup.php">S'inscrire</a>
        </div>
    </div>
<?php endif; ?>
    
</div>
