<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Retrieve and sanitize the login data
    $email = filter_var($data->email, FILTER_VALIDATE_EMAIL);
    $password = $data->password;

    try {
        // Replace with your actual database credentials
        $dbHost = 'localhost'; // Use 'localhost' when the database is on the same server
        $dbName = 'workwave1'; // Replace with your database name
        $dbUser = 'workwave';  // Replace with your database username
        $dbPass = '123456';    // Replace with your database password

        // Create a PDO connection
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Retrieve the user's stored hashed password from the "employees" table
        $stmt = $pdo->prepare("SELECT password FROM employees WHERE email = ?");
        $stmt->execute([$email]);
        $row = $stmt->fetch();

        if ($row) {
            $storedPassword = $row['password'];

            // Verify the password
            if (password_verify($password, $storedPassword)) {
                // Return the user's role and "Login successful"
            } else {
                echo 'Invalid password';
            }
        } else {
            echo 'User not found'; // Email not found in the "employees" table
        }
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
} else {
    echo 'Invalid request method';
}
