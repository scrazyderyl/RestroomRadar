<?php
    $sql = new mysqli("localhost", "root", "", "test");

    $result = $sql -> query("SELECT * FROM restrooms");
    $result = $result -> fetch_all(MYSQLI_ASSOC);
    echo json_encode($result);