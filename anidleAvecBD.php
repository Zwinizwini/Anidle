<?php 

//CTRL MAJ R pour recharger la page (permet de reset)



require_once(__DIR__ . '/sql.php');
require_once(__DIR__ . '/fonctions.php');
$nom = 'Oshi no ko';
$animeDeviner = appelAnimeID(3,$mysqlAnime);
$animeDevinerJSON = json_encode($animeDeviner);

//  if (isset($_POST['myInput'])) {
//      $inputValue = htmlspecialchars($_POST['myInput']);
//      echo "Vous avez entré : " . $inputValue;
//      $animeInput = appelAnimeNom($inputValue,$mysqlAnime);
//  }
/*
        <?php if (isset($_POST['iptJoueur'])) {
            $nom = $_POST['iptJoueur'];
            $animeInput = appelAnimeNom($nom,$mysqlAnime);
            print_r($_POST);
            unset($_POST['iptJoueur']);
            print_r($_POST);
            }
        ?>*/


        if (isset($_GET["var1"]) && isset($_GET["var2"])) {
            $somme = $_GET["var1"] + $_GET["var2"];
        }

?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/anidle.css">
    <link rel="icon" type="image/png" href="images/logo.jpg" />
    <script src="scripts/config.js" defer></script>
    <script src="scripts/script.js" defer></script>
    
</head>
<body>
    

    <header>
        <h1>Nom Site</h1>
    </header>

    <main>

        <h2>Anidle</h2>
        <input type="hidden" id="animeChoisi" name="animeChoisi" value='<?php echo $animeDevinerJSON;?>'>
        <input type="text" id="iptJoueur" name="iptJoueur" placeholder="Entrer un anime">
        <button id="btnValid">Valider</button>
        <div class="tableau">
            <table>
                <thead>
                    <tr>
                        <th>Anime</th>
                        <th>Année</th>
                        <th>Genre</th>
                        <th>Themes</th>
                        <th>Studio</th>
                        <th>Source</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </main>
    
</body>
</html>