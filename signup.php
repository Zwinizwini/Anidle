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
            <h1>Anidle</h1>
            <div>
                <a href="compte.php"><img src="images/utilisateur.png" alt="compte"></a>
            </div>
            
        </nav>
    </header>

    <main>
        <div class="conteneur">
            <div>
            <h2>INSCRIPTION</h2>
                <form action="submit_inscription.php" method="POST" class="inscritpion">
                            <input type="text" id="pseudo" name="pseudo" placeholder="Pseudo" required>
                            <input type="email" id="email" name="email" placeholder="Email" required>
                            <input type="password" id="mdp" name="mdp" placeholder="Mot de passe" required>
                            <input type="password" id="mdp2" name="mdp2" placeholder="Mot de passe" required>
                        <button type="submit">Valider</button>
                    </form>
            </div>
        </div>
    </main>
    
</body>
</html>