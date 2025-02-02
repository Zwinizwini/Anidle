<?php session_start(); 
require_once(__DIR__ . '/mysql/connect.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="page.css">
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

    <main class="d-flex">

                
                <div class="menu">
                <h2>Guess</h2>
                    <a href="anime.php">Guess the anime</a>
                    <a href="anidle.php">Anidle</a>
                </div>
                <!-- <a href="anidleAvecBD.php"><div class="index d-flex">Anidle avec BD</div></a> -->

            <table class="tableauScore">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Joueur</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($bestScore as $score) :?>
                        <tr>
                            <td  class="pfp"><img src="<?php echo $score['pfp']?>" alt="pfp"></td>
                            <td><?php echo $score['pseudo'];?></td>
                            <td><?php echo $score['score'];?></td>
                        </tr>
                    <?php endforeach;?>
                </tbody>
            </table>
    </main>
        
    <!-- Traitment du score max -->
    <?php 
         if(isset($_COOKIE['score'])) {
             $score = $_COOKIE['score'];
             setcookie("score", "", time() - 3600); 
             $scoreUser = $_SESSION['LOGGED_USER']['score'];

            if ($score > $scoreUser) {
                $newScoreStatement = $mysqlClient->prepare('UPDATE users SET score = :max_score WHERE pseudo = :pseudo');
                $newScoreStatement->bindParam(':max_score', $score);
                $newScoreStatement->bindParam(':pseudo', $_SESSION['LOGGED_USER']['pseudo']);
                $newScoreStatement->execute();
            }
         }

    ?>
    
</body>
</html>