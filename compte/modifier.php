       
       
       
       <div class="modifier bordure">
            <h2>Modifier le compte</h2>
            <form action="submit_modifier.php" method="POST" enctype="multipart/form-data">
                <input type="text" id="pseudo" name="pseudo" placeholder="Pseudo">
                <input type="email" id="email" name="email" placeholder="Email">
                <fieldset>
                    <legend>Photo de Profil</legend>
                    <input type="file" id="pfp" name="pfp">
                </fieldset>
                <button typ="submit">Envoyer</button>
            </form>
            <h2>Modifier le background</h2>
            <div class="bgAffichage"></div>
            <button class="btnDefaut animate__animated">Par Defaut</button>
       </div>
