<?php

try {
    $mysqlClient = new PDO(
        sprintf('mysql:host=aniguenroot.mysql.db;dbname=aniguenroot;port=3306;charset=utf8',),
        'aniguenroot',
        'Gz46Vuc9Wu9Da3'
    );
    $mysqlClient->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $exception) {
    die('Erreur : ' . $exception->getMessage());
}


$usersStatement = $mysqlClient->prepare('SELECT * FROM users');
$usersStatement->execute();
$users = $usersStatement->fetchAll();

$bestScoreStatement = $mysqlClient->prepare('SELECT pseudo,score,pfp FROM users ORDER BY score DESC LIMIT 10 ');
$bestScoreStatement->execute();
$bestScore = $bestScoreStatement->fetchAll();