<?php
    $sql = new mysqli("localhost", "root", "", "test");

    $restroom_id = (int)$_POST["restroom_id"];
    $keyed = $_POST["keyed"];
    $pay = $_POST["pay"];
    $handicap_accessible = $_POST["handicap_accessible"];
    $cleanliness = $_POST["cleanliness"];
    $scent = $_POST["scent"];
    $size = $_POST["size"];
    $comment = $_POST["comment"];
    
    if ($restroom_id == "-1") {
        $title = $_POST["title"];
        $latitude = $_POST["lat"];
        $longitude = $_POST["lng"];

        $sql -> query("INSERT INTO `restrooms` (title, lat, lng) VALUES ('$title', $latitude, $longitude)");
        $result = $sql -> query("SELECT id FROM `restrooms` ORDER BY id DESC LIMIT 1");
        $result = $result -> fetch_array();
        $restroom_id = $result[0];
    }

    $sql -> query("INSERT INTO `reviews` (restroom_id, keyed, pay, handicap_accessible, cleanliness, scent, size, comment) VALUES ($restroom_id, $keyed, $pay, $handicap_accessible, $cleanliness, $scent, $size, '$comment')");