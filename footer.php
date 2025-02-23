

<?php if(isset($_SESSION['LOGGED_USER'])):?>
    <?php if($pageIndex):?>
        <script src="scripts/listeAmis.js" defer></script>
    <?php else: ?>
        <script src="../scripts/listeAmis.js" defer></script>
    <?php endif;?>
    <div id="autreUserNonAmis" style="display: none"><?php echo json_encode($listeUserNonAmis); ?></div>
    <div id="listeAmis" style="display: none"><?php echo json_encode($listeAmis); ?></div>
    <div id="demandeEnvoie" style="display: none"><?php echo json_encode($demandeEnvoieListe); ?></div>
    <div id="demandeRecue" style="display: none"><?php echo json_encode($demandeAmisListe); ?></div>

    <div class="cache" id='cache'>
    </div>
    <div class="cache" id='bouttonAmis'>
        <?php if($pageIndex):?>
            <button class="actif"><img src="images/silhouette-dutilisateurs-multiples.png" alt="Amis"></button>
            <button class="nonActif"><img src="images/ajouter-un-utilisateur.png" alt="Utilisateur"></button>
            <button class="nonActif"><img src="images/sablier.png" alt="Invitation"></button>
        <?php else: ?>
            <button class="actif"><img src="../images/silhouette-dutilisateurs-multiples.png" alt="Amis"></button>
            <button class="nonActif"><img src="../images/ajouter-un-utilisateur.png" alt="Utilisateur"></button>
            <button class="nonActif"><img src="../images/sablier.png" alt="Invitation"></button>
        <?php endif;?>
    </div>
    <div class="amis">
        <?php if($pageIndex):?>
            <img src="images/silhouette-dutilisateurs-multiples.png" alt="Amis :" id="amis">
        <?php else: ?>
            <img src="../images/silhouette-dutilisateurs-multiples.png" alt="Amis :" id="amis">
        <?php endif;?>
        <div class="click">
            <div class="gauche"></div>
            <div class="droite"></div>
        </div>
        <script>
            const click = document.querySelector(".amis")
            click.addEventListener("click", () => {
                document.querySelector(".gauche").classList.toggle("bas_gauche")
                document.querySelector(".droite").classList.toggle("bas_droite")
            })
        </script>
    </div>
<?php endif;?>