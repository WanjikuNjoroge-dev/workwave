<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Retrieve and sanitize the login data
    $email = filter_var($data->email, FILTER_VALIDATE_EMAIL);
    $password = $data->password;

    try {
        // Replace with your actual database credentials
        $dbHost = 'localhost';
        $dbName = 'workwave1';
        $dbUser = 'workwave';
        $dbPass = '123456';

        // Create a PDO connection
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Retrieve the user's stored hashed password and role from the database
        $stmt = $pdo->prepare("SELECT password, role FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $row = $stmt->fetch();

        if ($row) {
            $storedPassword = $row['password'];
            $userRole = $row['role'];

            // Verify the password
            if (password_verify($password, $storedPassword)) {
                echo "Login successful";
            } else {
                echo "Invalid password";
            }
        } else {
            echo "User not found"; // Email not found in the database
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request method";
}
?>
