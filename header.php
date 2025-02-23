
<div class="image">
    <a href="../index.php"><img src="../images/logo.png"></a>
</div>
<div class="btn Tel">
    <div class="hautMenu"></div>
    <div class="milieu"></div>
    <div class="basMenu"></div>
</div>  
<div class="menuFond desac">
</div>
<div class="menuDeroulant">
    <a href="../index.php" class='lienDeroulant'>Accueil</a>
    <a href="../compte/compte.php" id='compteTel' class='lienDeroulant'><img src='../<?php echo (isset($_SESSION['LOGGED_USER'])) ? $_SESSION['LOGGED_USER']['pfp'] :  "images/utilisateur.png"?>' alt="compte">Compte</a>
</div>

<script>
    const menuFond = document.querySelector('.menuFond')
    function menuDeroulant() {
        document.querySelector('.hautMenu').classList.toggle('hautTransform')
        document.querySelector('.milieu').classList.toggle('milieuTransform')
        document.querySelector('.basMenu').classList.toggle('basTransform')
        document.querySelector('.menuDeroulant').classList.toggle('menuEtendu')
        document.querySelector('.footer').classList.toggle('opacity')
        menuFond.classList.toggle('desac')
    }
    document.querySelector('.btn').addEventListener('click', () => {
        menuDeroulant()
    })
    menuFond.addEventListener('click', () => {
        menuDeroulant()
    })
</script>
<a href="../index.php" id="titreRouge"><h1>Zwinidle</h1></a>
<div class="compteIcone">
    <a href="../compte/compte.php"><img src='../<?php echo (isset($_SESSION['LOGGED_USER'])) ? $_SESSION['LOGGED_USER']['pfp'] :  "images/utilisateur.png"?>' alt="compte"></a>
</div>