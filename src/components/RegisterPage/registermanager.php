<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Retrieve and sanitize the data
    $name = htmlspecialchars($data->name);
    $email = filter_var($data->email, FILTER_VALIDATE_EMAIL);
    $password = password_hash($data->password, PASSWORD_DEFAULT); // Hash the password

    try {
        // Replace with your actual database credentials
        $dbHost = 'localhost';
        $dbName = 'workwave1';
        $dbUser = 'workwave';
        $dbPass = '123456';

        // Create a PDO connection
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare and execute an SQL INSERT statement into the "manager" table
        $stmt = $pdo->prepare("INSERT INTO manager (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $password]);

        // For demonstration purposes, return a success message
        echo "Registration successful!";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request method.";
}
?>
