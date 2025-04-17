<?php
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD']; // Lekérjük a HTTP metódust (GET, POST, PUT, DELETE)

$host = 'localhost';  // MySQL host
$user = 'root';       // MySQL felhasználónév
$password = '';       // MySQL jelszó
$dbname = 'adatbazis'; // Az adatbázis neve

// Kapcsolódás az adatbázishoz
$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

// Az adatbázis műveletek a kérések alapján
switch ($method) {
    case 'GET':
        // Például: Lekérdezzük az összes adatot
        $sql = "SELECT * FROM users"; 
        $result = $conn->query($sql);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
        break;
    
    case 'POST':
        // Adat létrehozása
        $name = $_POST['name']; // Név adat POST kérésből
        $height = $_POST['height']; // Magasság adat POST kérésből

        $sql = "INSERT INTO users (name, height) VALUES ('$name', '$height')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Sikeresen hozzáadva"]);
        } else {
            echo json_encode(["message" => "Hiba: " . $conn->error]);
        }
        break;
    
    case 'PUT':
        // Adat frissítése
        parse_str(file_get_contents("php://input"), $put_vars);
        $id = $put_vars['id'];
        $name = $put_vars['name'];
        $height = $put_vars['height'];

        $sql = "UPDATE users SET name = '$name', height = '$height' WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Sikeresen frissítve"]);
        } else {
            echo json_encode(["message" => "Hiba: " . $conn->error]);
        }
        break;

    case 'DELETE':
        // Adat törlése
        parse_str(file_get_contents("php://input"), $delete_vars);
        $id = $delete_vars['id'];

        $sql = "DELETE FROM users WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Sikeresen törölve"]);
        } else {
            echo json_encode(["message" => "Hiba: " . $conn->error]);
        }
        break;
    
    default:
        echo json_encode(["message" => "Nem támogatott metódus"]);
        break;
}

// Kapcsolat lezárása
$conn->close();
?>