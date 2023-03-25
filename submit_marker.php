<?php
    $sql = new mysqli("localhost", "root", "", "test");

    $title = $_POST["title"];
    $lat = $_POST["lat"];
    $lng = $_POST["lng"];

    $sql -> query("INSERT INTO `markers` (title, lat, lng) VALUES ($title,$lat,$lng)");