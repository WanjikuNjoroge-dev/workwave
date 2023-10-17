<?php
// Connect to the MySQL database
$host = 'localhost';
$username = 'workwave';
$password = '123456';
$dbname = 'workwave1';

$connection = new mysqli($host, $username, $password, $dbname);

if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
}

// Retrieve submitted tasks from the database
$sql = "SELECT * FROM tasks";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
    echo json_encode($tasks);
} else {
    echo 'No submitted tasks';
}

$connection->close();
