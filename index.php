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
    
</head>
<body>
    <header>
        <nav>
            <div class="image">
                <a href="index.php"><img src="images/logo.png"></a>
            </div>
            <a href="index.php" id="titreRouge"><h1>Zwinidle</h1></a>
            <div class="compteIcone">
                <a href="compte.php"><img src=<?php echo (isset($_SESSION['LOGGED_USER'])) ?  $_SESSION['LOGGED_USER']['pfp'] :  "images/utilisateur.png"?> alt="compte"></a>
                <a href="compte.php" class="compteTel">Compte</a>
            </div>
            
        </nav>
    </header>

    <main class="d-flex" id="index"> 
        <a href="testVideo.html">Video</a>               
                <div class="menu">
                    <h2>Guess</h2>
                    <a href="citation.php">Citation</a>
                    <a href="anidle.php">Anidle</a>
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


        

    <!-- Traitment du score max -->
    <?php 
        if(isset($_COOKIE['score']) && isset($_SESSION['LOGGED_USER'])) {
            $score = $_COOKIE['score'];
            setcookie("score", "", time() - 3600); 
            $scoreUser = $_SESSION['LOGGED_USER']['score'];
            if ($score > $scoreUser) {
                $_SESSION['LOGGED_USER']['score'] = $score;
                $newScoreStatement = $mysqlClient->prepare('UPDATE users SET score = :max_score WHERE pseudo = :pseudo');
                $newScoreStatement->bindParam(':max_score', $score);
                $newScoreStatement->bindParam(':pseudo', $_SESSION['LOGGED_USER']['pseudo']);
                $newScoreStatement->execute();
            }
        }

    ?>
    
</body>
</html>