<?php 
require_once('../mysql/connect.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessr Anime</title>
    <link rel="stylesheet" href="../style/style.css">
    <link rel="stylesheet" href="../style/anidle.css">
    <link rel="stylesheet" href="../style/input-button.css">
    <link rel="icon" type="image/png" href="../images/logo.jpg" />
    <script src="../scripts/config.js" defer></script>
    <script src="../scripts/script.js" defer></script>
    <script src="../scripts/video.js" defer></script>
    <script src="../scripts/listeAmis.js" defer></script>
    <script type="module" src="../scripts/anidle.js" defer></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"></script>
    <script>
        document.addEventListener('contextmenu', event => {
            event.preventDefault();
        });
    </script>
    
    
</head>
<body>
    <div id="monElement" data-id="<?php echo json_encode($liste); ?>" style="display: none"></div>
    <div id="nb_guess" data-id="<?php echo json_encode($nb_guess); ?>" style="display: none"></div>
    <div id="listeCG" style="display: none"><?php echo json_encode($listeCG); ?></div>
    <div id="listeTitreJoueur" data-id="<?php echo json_encode($listeT); ?>" style="display: none"></div>
    <div id="serie_enCour" data-id="<?php echo $_SESSION['LOGGED_USER']['serie_enCour']; ?>" style="display: none"></div>

    <div id="pageIndex" data-id="<?php echo json_encode(false); ?>" style="display: none"></div>
    <?php require_once('../header.php');?>

    <main class="d-flex">
        <div class="div70 d-flex">
            <div class="resultat desac" id="resultat">
                <a href="" target="_blank"><img src="" alt=""><div class="image-hover">Page MAL</div></a>
                <button id="btnSuite">Guess Suivant</button>
            </div>
            <div class="zoneIndice desac" id="zoneIndice">
                <div class="image-indice">
                    <img alt="Image Indice" style="visibility: hidden;">
                </div>
                <div class="trailer-review">
                    <div id="youtube-audio1" style="display: block;">
                        <h2>Son du Trailer :</h2>
                        <input type="range" min="0" max ="100" id="volume" name="volume" step="1" value="10" style="visibility: hidden;">
                        <img id="youtube-icon1" src="" style="visibility: hidden;"/><div id="youtube-player1"></div>
                    </div>
                    <div class="perso">
                        <h2>Personnage :</h2>
                        <p id="review" class="review" style="visibility: hidden;"></p>
                    </div>
                    
                </div>
            </div>
            <div class="indice">
                <button class="photo fondDesac">Personnage</button>
                <button class="photo fondDesac">Affiche</button>
                <button class="photo fondDesac">Opening</button>
            </div>
            <h2>Guess <span>0</span> / 20</h2>
            <div class="score">
                <p>Max serie : <span id="score">0</span>
            </div>
            <form class="proposition">
                <input type="text" id="iptJoueur" name="iptJoueur" placeholder="Entrer un anime" autofocus>
                <button id="btnValid">Valider</button>
            </form>
        </div>
        
        <p class="faux" id="animeDejaMis"></p>
        <div class="tableau">
            <table class="desac">
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
    <?php 
        $pageIndex = false;
        require_once('../footer.php');
    ?>

    <div class="popupBackground">
        <div class="popup ">
            <button id="startBtn" class="fondActiver">COMMENCER UNE PARTIE</button>
            <div class="popupDiv">
                <label for="annee">Année :</label>
                <select name="annee" id="annee">
                    <option value="1960" selected>Pas de limite</option>
                    <option value="2000">> 2000</option>
                    <option value="2005">> 2005</option>
                    <option value="2010">> 2010</option>
                    <option value="2015">> 2015</option>
                    <option value="2020">> 2020</option>
                </select>
            </div>
            <div class="popupDiv">
                <label for="source">Source :</label>
                <select name="source" id="source">
                    <option value="" selected>Par Defaut</option>
                    <option value="Manga">Manga</option>
                    <option value="Visual novel">Visual novel</option>
                    <option value="Original">Original</option>
                    <option value="Light novel">Light novel</option>
                    <option value="Web manga">Web manga</option>
                    <option value="4-koma manga">4-koma manga</option>
                    <option value="Novel">Novel</option>
                    <option value="Game">Game</option>
                    <option value="Mixed media">Mixed media</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <fieldset class="genre">
                <legend>Genres :</legend>
                <div>
                    <div>
                        <input type="checkbox" id="adventure" name="genre" value="Adventure">
                        <label for="adventure">Adventure</label>
                    </div>
                    <div>
                        <input type="checkbox" id="drama" name="genre" value="Drama">
                        <label for="drama">Drama</label>
                    </div>
                    <div>
                        <input type="checkbox" id="fantasy" name="genre" value="Fantasy">
                        <label for="fantasy">Fantasy</label>
                    </div>
                    <div>
                        <input type="checkbox" id="action" name="genre" value="Action">
                        <label for="action">Action</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sci-fi" name="genre" value="Sci-Fi">
                        <label for="sci-fi">Sci-Fi</label>
                    </div>
                    <div>
                        <input type="checkbox" id="suspense" name="genre" value="Suspense">
                        <label for="suspense">Suspense</label>
                    </div>
                    <div>
                        <input type="checkbox" id="comedy" name="genre" value="Comedy">
                        <label for="comedy">Comedy</label>
                    </div>
                    <div>
                        <input type="checkbox" id="romance" name="genre" value="Romance">
                        <label for="romance">Romance</label>
                    </div>
                    <div>
                        <input type="checkbox" id="supernatural" name="genre" value="Supernatural">
                        <label for="supernatural">Supernatural</label>
                    </div>
                    <div>
                        <input type="checkbox" id="award-winning" name="genre" value="Award Winning">
                        <label for="award-winning">Award Winning</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox" id="mystery" name="genre" value="Mystery">
                        <label for="mystery">Mystery</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sports" name="genre" value="Sports">
                        <label for="sports">Sports</label>
                    </div>
                    <div>
                        <input type="checkbox" id="slice-of-life" name="genre" value="Slice of Life">
                        <label for="slice-of-life">Slice of Life</label>
                    </div>
                    <div>
                        <input type="checkbox" id="ecchi" name="genre" value="Ecchi">
                        <label for="ecchi">Ecchi</label>
                    </div>
                    <div>
                        <input type="checkbox" id="gourmet" name="genre" value="Gourmet">
                        <label for="gourmet">Gourmet</label>
                    </div>
                    <div>
                        <input type="checkbox" id="horror" name="genre" value="Horror">
                        <label for="horror">Horror</label>
                    </div>
                    <div>
                        <input type="checkbox" id="avant-garde" name="genre" value="Avant Garde">
                        <label for="avant-garde">Avant Garde</label>
                    </div>
                    <div>
                        <input type="checkbox" id="boys-love" name="genre" value="Boys Love">
                        <label for="boys-love">Boys Love</label>
                    </div>
                    <div>
                        <input type="checkbox" id="girls-love" name="genre" value="Girls Love">
                        <label for="girls-love">Girls Love</label>
                    </div>
                </div>
            </fieldset>
            
        </div>
    </div>
    
</body>
</html>