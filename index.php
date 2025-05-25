<?php 
require_once(__DIR__ . '/mysql/connect.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="icon" type="image/png" href="images/logo.jpg" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.2.1/css/dataTables.dataTables.css" />
    <script src="https://cdn.datatables.net/2.2.1/js/dataTables.js"></script>
    <script src="scripts/table.js" defer></script>
    <script src="scripts/background.js" defer></script>
</head>
<body>
    <header>
        <nav>
            <div class="image">
                <a href="index.php"><img src="images/logo.png"></a>
            </div>
            <div class="btn Tel">
                <div class="hautMenu"></div>
                <div class="milieu"></div>
                <div class="basMenu"></div>
            </div>  
            <div class="menuFond desac">
            </div>
            <div class="menuDeroulant">
                <a href="index.php" class='lienDeroulant'>Accueil</a>
                <a href="compte/compte.php" id='compteTel' class='lienDeroulant'><img src=<?php echo (isset($_SESSION['LOGGED_USER'])) ? $_SESSION['LOGGED_USER']['pfp'] :  "images/utilisateur.png"?> alt="compte">Compte</a>
            </div>
            <script>
                const menuFond = document.querySelector('.menuFond')
                function menu() {
                    document.querySelector('.hautMenu').classList.toggle('hautTransform')
                    document.querySelector('.milieu').classList.toggle('milieuTransform')
                    document.querySelector('.basMenu').classList.toggle('basTransform')
                    document.querySelector('.menuDeroulant').classList.toggle('menuEtendu')
                    document.querySelector('.footer').classList.toggle('opacity')
                    menuFond.classList.toggle('desac')
                }
                document.querySelector('.btn').addEventListener('click', () => {                    
                    menu()
                })
                menuFond.addEventListener('click', () => {
                    menu()
                })
            </script>
            <a href="index.php" id="titreRouge"><h1>Zwinidle</h1></a>
            <div class="compteIcone">
                <a href="compte/compte.php"><img src=<?php echo (isset($_SESSION['LOGGED_USER'])) ?  $_SESSION['LOGGED_USER']['pfp'] :  "images/utilisateur.png"?> alt="compte"></a>
            </div>
            
        </nav>
    </header>

    <main class="d-flex" id="index">
        <div id="pageIndex" data-id="<?php echo json_encode(true); ?>" style="display: none"></div> 
        

        <div class="menu">
            <h2>Guess</h2>
            <a href="jeux/affiche.php" id="affiche"><img src="images/afficheFond1.png" alt=""><p>Affiche</p></a>
            <a href="jeux/anidle.php" id="anidle"><img src="images/afficheFond2.png" alt=""><p>Anidle</p></a>
            <a href="jeux/hololive.php" id="hololive"><img src="images/Hololive/hololivemember.jpg" alt=""><p>Hololive</p></a>
            <a href="jeux/hsr.php" id="hsr"><img src="images/Hsr/astralexpress.jpg" alt=""><p>HSR</p></a>
            <a href="jeux/dbd.php" id="dbd"><img src="images/Dbd/firecamp.jpg" alt=""><p>DBD</p></a>
        </div>
        <!-- <a href="anidleAvecBD.php"><div class="index d-flex">Anidle avec BD</div></a> -->
        <table class="tableauScore">
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Joueur</th>
                    <th>Serie</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($bestScore as $score) :?>
                    <tr>
                        <td  class="pfp"><img src="<?php echo $score['pfp']?>" alt="pfp"></td>
                        <td><?php echo $score['pseudo'];?></td>
                        <td><?php echo $score['score'];?></td>
                        <td><?php echo $score['nb_guess'];?>
                    </tr>
                <?php endforeach;?>
            </tbody>
        </table>
        
        
    </main>

    <div class='footer' id="footer">
        <?php 
            $pageIndex = true;
            require('footer.php');
        ?>
    </div>
           
</body>
</html>