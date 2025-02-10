

<footer>
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
            <div>
                <img src="images/angle-vers-le-haut.png" alt="Afficher" id="monter">
                <img src="images/angle-vers-le-bas.png" alt="Cacher" class="compteTel" id="descendre">
            </div>
        <?php else: ?>
            <img src="../images/silhouette-dutilisateurs-multiples.png" alt="Amis :" id="amis">
            <div>
                <img src="../images/angle-vers-le-haut.png" alt="Afficher" id="monter">
                <img src="../images/angle-vers-le-bas.png" alt="Cacher" class="compteTel" id="descendre">
            </div>
        <?php endif;?>
    </div>
</footer>