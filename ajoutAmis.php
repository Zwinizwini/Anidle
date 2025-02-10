<?php
require_once(__DIR__ . '/mysql/connect.php');

$idDemande = $_POST['idDemande'];
$id = $_SESSION['LOGGED_USER']['id'];


if (isset($idDemande)) {
    $envoieDemande = $mysqlClient->prepare('INSERT INTO demandeamis (uid_demande,uid_recue) VALUES (?,?)');
    $envoieDemande->bindParam(1,$id);
    $envoieDemande->bindParam(2,$idDemande);
    $envoieDemande->execute();
}

$idAccepter = $_POST['idAccepter'];
if (isset($idAccepter)) {
    $accepterDemande = $mysqlClient->prepare('INSERT INTO listeamis (uid1,uid2) VALUES (?,?)');
    $accepterDemande->bindParam(1,$id);
    $accepterDemande->bindParam(2,$idAccepter);
    $accepterDemande->execute();
    $accepterDemande = $mysqlClient->prepare('INSERT INTO listeamis (uid1,uid2) VALUES (?,?)');
    $accepterDemande->bindParam(1,$idAccepter);
    $accepterDemande->bindParam(2,$id);
    $accepterDemande->execute();
    $accepterDemande = $mysqlClient->prepare('DELETE FROM demandeamis WHERE uid_demande=:id1 AND uid_recue=:id2');
    $accepterDemande->execute([
        'id1' => $idAccepter,
        'id2' => $id,
    ]);
}

$idRefuser = $_POST['idReffuser'];
if (isset($idRefuser)) {
    $deleteDemandeStatement = $mysqlClient->prepare('DELETE FROM demandeamis WHERE uid_demande=:id1 AND uid_recue=:id2');
    $deleteDemandeStatement->execute([
        'id1' => $idRefuser,
        'id2' => $id
    ]);
}