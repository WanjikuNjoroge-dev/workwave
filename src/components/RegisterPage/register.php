<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Retrieve and sanitize the data
    $name = htmlspecialchars($data->name);
    $email = filter_var($data->email, FILTER_VALIDATE_EMAIL);
    $password = password_hash($data->password, PASSWORD_DEFAULT); // Hash the password
    $role = htmlspecialchars($data->role);

    try {
        // Replace with your actual database credentials
        $dbHost = 'localhost'; // Use 'localhost' when the database is on the same server
        $dbName = 'workwave1';
        $dbUser = 'workwave';
        $dbPass = '123456';

        // Create a PDO connection
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);

        // Set PDO to throw exceptions on error
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare and execute an SQL INSERT statement
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $password, $role]);

        // For demonstration purposes, return a success message
        echo "Registration successful!";
    } catch (PDOException $e) {
        // Handle database errors
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request method.";
}
?>
