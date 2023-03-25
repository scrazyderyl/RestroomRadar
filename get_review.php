<?php
    $sql = new mysqli("localhost", "root", "", "test");
    $id = $_POST["id"];

    $result = $sql -> query("SELECT * FROM `reviews` WHERE `restroom_id` = $id");
    $result = $result -> fetch_all(MYSQLI_ASSOC);
    echo json_encode($result);