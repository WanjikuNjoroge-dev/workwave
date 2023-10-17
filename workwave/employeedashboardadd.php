<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Loop through the received tasks data and insert into the database
    foreach ($data as $task) {
        $title = $task['title'];
        $status = $task['status'];
        $hours = $task['hours'];
        $feedbackRequested = $task['feedbackRequested'];

        // Add the database connection code here (use your provided database credentials)
        // Create a PDO connection
        $dbHost = 'localhost';
        $dbName = 'workwave1';
        $dbUser = 'workwave';
        $dbPass = '123456';

        try {
            // Create a PDO connection
            $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Prepare and execute an SQL INSERT statement into the "tasks" table
            $stmt = $pdo->prepare("INSERT INTO tasks (title, status, hours, feedback_requested) VALUES (?, ?, ?, ?)");
            $stmt->execute([$title, $status, $hours, $feedbackRequested]);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            exit;
        }
    }

    // For demonstration purposes, return a success message
    echo "Tasks submitted!";
} else {
    echo "Invalid request method.";
}

?>