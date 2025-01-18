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
    <script src="scripts/video.js" defer></script>
    <script type="module" src="scripts/anidle.js" defer></script>
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
    
    <header>
        <nav>
            <div class="image">
                <a href="index.php"><img src="images/logo.jpg"></a>
            </div>
            <h1>Zwinidle</h1>
            <div>
                <a href="compte.php"><img src="images/utilisateur.png" alt="compte"></a>
            </div>
            
        </nav>
    </header>

    <main class="d-flex">
        <div class="div70 d-flex">
            <div class="resultat desac" id="resultat">
                <a href="" target="_blank"><img src="" alt=""><div class="image-hover">Page MAL</div></a>
                <button id="btnSuite">Guess Suivant</button>
            </div>
            <div class="zoneIndice desac" id="zoneIndice">
                <div class="image-indice">
                    <img alt="Image Indice">
                </div>
                <div class="trailer-review">
                    <div id="youtube-audio1" style="display: block;">
                        <p>Son du Trailer :</p>
                        <input type="range" min="0" max ="100" id="volume" name="volume" step="1">
                        <img id="youtube-icon1" src=""/><div id="youtube-player1"></div>
                    </div>
                    <p id="review" class="review"></p>
                    
                </div>
            </div>
            <div class="indice">
                <button class="photo fondDesac">Trailer</button>
                <button class="photo fondDesac">Review</button>
                <button class="photo fondDesac">Affiche</button>
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
                    <div>
                        <input type="checkbox" id="erotica" name="genre" value="Erotica">
                        <label for="erotica">Erotica</label>
                    </div>
                </div>
            </fieldset>
            <!-- <fieldset class="theme">
                <legend>Genres:</legend>
                <div>
                    <div>
                        <input type="checkbox" id="military" name="genre" value="Military">
                        <label for="military">Military</label>
                    </div>
                    <div>
                        <input type="checkbox" id="psychological" name="genre" value="Psychological">
                        <label for="psychological">Psychological</label>
                    </div>
                    <div>
                        <input type="checkbox" id="time-travel" name="genre" value="Time Travel">
                        <label for="time-travel">Time Travel</label>
                    </div>
                    <div>
                        <input type="checkbox" id="gag-humor" name="genre" value="Gag Humor">
                        <label for="gag-humor">Gag Humor</label>
                    </div>
                    <div>
                        <input type="checkbox" id="historical" name="genre" value="Historical">
                        <label for="historical">Historical</label>
                    </div>
                    <div>
                        <input type="checkbox" id="parody" name="genre" value="Parody">
                        <label for="parody">Parody</label>
                    </div>
                    <div>
                        <input type="checkbox" id="samurai" name="genre" value="Samurai">
                        <label for="samurai">Samurai</label>
                    </div>
                    <div>
                        <input type="checkbox" id="gore" name="genre" value="Gore">
                        <label for="gore">Gore</label>
                    </div>
                    <div>
                        <input type="checkbox" id="survival" name="genre" value="Survival">
                        <label for="survival">Survival</label>
                    </div>
                    <div>
                        <input type="checkbox" id="school" name="genre" value="School">
                        <label for="school">School</label>
                    </div>
                    <div>
                        <input type="checkbox" id="childcare" name="genre" value="Childcare">
                        <label for="childcare">Childcare</label>
                    </div>
                    <div>
                        <input type="checkbox" id="strategy-game" name="genre" value="Strategy Game">
                        <label for="strategy-game">Strategy Game</label>
                    </div>
                    <div>
                        <input type="checkbox" id="mecha" name="genre" value="Mecha">
                        <label for="mecha">Mecha</label>
                    </div>
                    <div>
                        <input type="checkbox" id="super-power" name="genre" value="Super Power">
                        <label for="super-power">Super Power</label>
                    </div>
                    <div>
                        <input type="checkbox" id="medical" name="genre" value="Medical">
                        <label for="medical">Medical</label>
                    </div>
                    <div>
                        <input type="checkbox" id="adult-cast" name="genre" value="Adult Cast">
                        <label for="adult-cast">Adult Cast</label>
                    </div>
                    <div>
                        <input type="checkbox" id="isekai" name="genre" value="Isekai">
                        <label for="isekai">Isekai</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox" id="combat-sports" name="genre" value="Combat Sports">
                        <label for="combat-sports">Combat Sports</label>
                    </div>
                    <div>
                        <input type="checkbox" id="team-sports" name="genre" value="Team Sports">
                        <label for="team-sports">Team Sports</label>
                    </div>
                    <div>
                        <input type="checkbox" id="cgdct" name="genre" value="CGDCT">
                        <label for="cgdct">CGDCT</label>
                    </div>
                    <div>
                        <input type="checkbox" id="music" name="genre" value="Music">
                        <label for="music">Music</label>
                    </div>
                    <div>
                        <input type="checkbox" id="vampire" name="genre" value="Vampire">
                        <label for="vampire">Vampire</label>
                    </div>
                    <div>
                        <input type="checkbox" id="performing-arts" name="genre" value="Performing Arts">
                        <label for="performing-arts">Performing Arts</label>
                    </div>
                    <div>
                        <input type="checkbox" id="space" name="genre" value="Space">
                        <label for="space">Space</label>
                    </div>
                    <div>
                        <input type="checkbox" id="iyashikei" name="genre" value="Iyashikei">
                        <label for="iyashikei">Iyashikei</label>
                    </div>
                    <div>
                        <input type="checkbox" id="delinquents" name="genre" value="Delinquents">
                        <label for="delinquents">Delinquents</label>
                    </div>
                    <div>
                        <input type="checkbox" id="workplace" name="genre" value="Workplace">
                        <label for="workplace">Workplace</label>
                    </div>
                    <div>
                        <input type="checkbox" id="reincarnation" name="genre" value="Reincarnation">
                        <label for="reincarnation">Reincarnation</label>
                    </div>
                    <div>
                        <input type="checkbox" id="mythology" name="genre" value="Mythology">
                        <label for="mythology">Mythology</label>
                    </div>
                    <div>
                        <input type="checkbox" id="anthropomorphic" name="genre" value="Anthropomorphic">
                        <label for="anthropomorphic">Anthropomorphic</label>
                    </div>
                    <div>
                        <input type="checkbox" id="organized-crime" name="genre" value="Organized Crime">
                        <label for="organized-crime">Organized Crime</label>
                    </div>
                    <div>
                        <input type="checkbox" id="love-polygon" name="genre" value="Love Polygon">
                        <label for="love-polygon">Love Polygon</label>
                    </div>
                    <div>
                        <input type="checkbox" id="detective" name="genre" value="Detective">
                        <label for="detective">Detective</label>
                    </div>
                    <div>
                        <input type="checkbox" id="showbiz" name="genre" value="Showbiz">
                        <label for="showbiz">Showbiz</label>
                    </div>
                    <div>
                        <input type="checkbox" id="urban-fantasy" name="genre" value="Urban Fantasy">
                        <label for="urban-fantasy">Urban Fantasy</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox" id="otaku-culture" name="genre" value="Otaku Culture">
                        <label for="otaku-culture">Otaku Culture</label>
                    </div>
                    <div>
                        <input type="checkbox" id="martial-arts" name="genre" value="Martial Arts">
                        <label for="martial-arts">Martial Arts</label>
                    </div>
                    <div>
                        <input type="checkbox" id="love-status-quo" name="genre" value="Love Status Quo">
                        <label for="love-status-quo">Love Status Quo</label>
                    </div>
                    <div>
                        <input type="checkbox" id="racing" name="genre" value="Racing">
                        <label for="racing">Racing</label>
                    </div>
                    <div>
                        <input type="checkbox" id="mahou-shoujo" name="genre" value="Mahou Shoujo">
                        <label for="mahou-shoujo">Mahou Shoujo</label>
                    </div>
                    <div>
                        <input type="checkbox" id="visual-arts" name="genre" value="Visual Arts">
                        <label for="visual-arts">Visual Arts</label>
                    </div>
                    <div>
                        <input type="checkbox" id="idols-male" name="genre" value="Idols (Male)">
                        <label for="idols-male">Idols (Male)</label>
                    </div>
                    <div>
                        <input type="checkbox" id="crossdressing" name="genre" value="Crossdressing">
                        <label for="crossdressing">Crossdressing</label>
                    </div>
                    <div>
                        <input type="checkbox" id="high-stakes-game" name="genre" value="High Stakes Game">
                        <label for="high-stakes-game">High Stakes Game</label>
                    </div>
                    <div>
                        <input type="checkbox" id="video-game" name="theme" value="Video Game">
                        <label for="video-game">Video Game</label>
                    </div>
                    <div>
                        <input type="checkbox" id="idol-female" name="theme" value="Idols (Female)">
                        <label for="idol-female">Idols (Female)</label>
                    </div>
                    <div>
                        <input type="checkbox" id="villainess" name="theme" value="Villainess">
                        <label for="villainess">Villainess</label>
                    </div>
                    <div>
                        <input type="checkbox" id="magical-sex-shift" name="theme" value="Magical Sex Shift">
                        <label for="magical-sex-shift">Magical Sex Shift</label>
                    </div>
                    <div>
                        <input type="checkbox" id="pets" name="theme" value="Pets">
                        <label for="pets">Pets</label>
                    </div>
                    <div>
                        <input type="checkbox" id="idol-man" name="theme" value="Idols (Male)">
                        <label for="idol-man">Idols (Male)</label>
                    </div>
                    <div>
                        <input type="checkbox" id="reverse-harem" name="theme" value="Reverse Harem">
                        <label for="reverse-harem">Reverse Harem</label>
                    </div>
                    <div>
                        <input type="checkbox" id="harem" name="theme" value="Harem">
                        <label for="harem">Harem</label>
                    </div>
                    <div>
                        <input type="checkbox" id="educational" name="theme" value="Educational">
                        <label for="educational">Educational</label>
                    </div>
                </div>
            </fieldset> -->
            
        </div>
    </div>
    
</body>
</html>