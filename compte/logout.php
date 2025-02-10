<?php 

session_start();

require_once('../fonctions.php');


session_unset();
session_destroy();
redirectToUrl("../index.php");

?>