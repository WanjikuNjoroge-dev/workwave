<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize the data
    $title = filter_var($_POST['title'], FILTER_SANITIZE_STRING);
    $status = filter_var($_POST['status'], FILTER_SANITIZE_STRING);
    $hours = filter_var($_POST['hours'], FILTER_VALIDATE_FLOAT);

    // Database connection details
    $dbHost = 'localhost';
    $dbName = 'workwave1';
    $dbUser = 'workwave';
    $dbPass = '123456';

    try {
        // Create a new PDO instance
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);

        // Set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // SQL query to insert data into the 'tasks' table
        $sql = "INSERT INTO tasks (title, status, hours) VALUES (:title, :status, :hours)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':hours', $hours);

        // Execute the statement
        $stmt->execute();

        // Return a success message
        echo 'Data has been successfully submitted to the database.';
    } catch (PDOException $e) {
        // Handle database errors
        echo 'Error: ' . $e->getMessage();
    }
} else {
    // Invalid request method
    echo 'Invalid request method.';
}

?>

