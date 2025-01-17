<?php


function redirectToUrl(string $url): never {
    header("Location: {$url}");
    exit();
}


function formeListe(array $animeTemp) : array {
    $animeTemp2 = $animeTemp[0];
    $animeTemp2['genre'] = explode(",",$animeTemp[0]['genre']);
    $animeTemp2['theme'] = explode(",",$animeTemp[0]['theme']);
    $anime = [$animeTemp2['nom'],$animeTemp2['date'],$animeTemp2['genre'],
            $animeTemp2['theme'],$animeTemp2['studio'],$animeTemp2['source'],
            $animeTemp2['score']];
    return $anime;
}


function appelAnimeNom(string $nom, $mysqlAnime) : array {
    $animeReq = $mysqlAnime->prepare('SELECT * FROM guess WHERE nom = :nom');
    $animeReq->execute(['nom' => $nom]);
    $animeTemp = $animeReq->fetchAll();
    return formeListe($animeTemp);
}

function appelAnimeId(int $id,$mysqlAnime) : array {
    $animeReq = $mysqlAnime->prepare('SELECT * FROM guess WHERE id = :id');
    $animeReq->execute(['id' => $id]);
    $animeTemp = $animeReq->fetchAll();
    return formeListe($animeTemp);
}

function gestionValide($val,$liste,$i) {
    if (gettype($val) === 'array') {
        //mettre le <td> avant la boucle
        echo '<td>';
        foreach ($val as $valInListe) {
            if (in_array($valInListe,$liste[$i])) {
                echo '<div class="valide">'.$valInListe.'</div>';
            } else {
                echo '<div class="faux">'.$valInListe.'</div>';
            }
        }
        echo '</td>';
    } elseif (gettype($val) === 'integer' || gettype($val) === 'double') {
            switch ($val) {
                case $val > $liste[$i] :
                    echo '<td class="faux">'.$val.' moins </td>';
                    break;
                case $val === $liste[$i] :
                    echo '<td class="valide">'.$val.'</td>';
                    break;
                case $val < $liste[$i] :
                    echo '<td class="faux">'.$val.' plus </td>';
            }
    } else {
        if (in_array($val,$liste)) {
            echo '<td class="valide">'.$val.'</td>';
        } else {
            echo '<td class="faux">'.$val.'</td>';
        }
    }
    
        
    
}