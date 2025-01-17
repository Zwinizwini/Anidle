<?php

require_once(__DIR__ . '/sql.php');
require_once(__DIR__ . '/fonctions.php');


// Vérifiez si les paramètres var1 et var2 sont transmis au script via l'URL
if (isset($_GET["var1"]) && isset($_GET["var2"])) {
    $somme = $_GET["var1"] + $_GET["var2"];
}

redirectToUrl("anidleN.php");