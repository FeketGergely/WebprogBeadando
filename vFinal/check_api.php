<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$apiUrl = "http://gamf.nhely.hu/ajax2/"; 

// API lekérdezés kezelés
function fetchDataFromApi($operation, $params = []) {
    global $apiUrl;

    $fields = array_merge(['op' => $operation], $params);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36");
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));

    $response = curl_exec($ch);
    curl_close($ch);

    // Debug üzenet
    echo "<pre>API Válasz: $response</pre>";

    // Ha JSON formátumban érkezik válasz, próbáljuk meg dekódolni
    $decodedResponse = json_decode($response, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        if (isset($decodedResponse['list'])) {
            return ['status' => 'success', 'message' => 'Adatok lekérve', 'data' => $decodedResponse['list']];
        } else {
            return ['status' => 'error', 'message' => 'Nincsenek adatok a válaszban'];
        }
    } else {
        return ['status' => 'error', 'message' => 'Hibás válasz formátum'];
    }
}

// CRUD műveletek
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['create'])) {
        $params = [
            'code' => $_POST['code'],
            'name' => $_POST['name'],
            'height' => $_POST['height'],
            'weight' => $_POST['weight']
        ];
        $result = fetchDataFromApi('create', $params);
    } elseif (isset($_POST['update'])) {
        $params = [
            'code' => $_POST['code'],
            'name' => $_POST['name'],
            'height' => $_POST['height'],
            'weight' => $_POST['weight']
        ];
        $result = fetchDataFromApi('update', $params);
    } elseif (isset($_POST['delete'])) {
        $params = ['code' => $_POST['code']];
        $result = fetchDataFromApi('delete', $params);
    }
}

// Lekérjük az adatokat, ha még nem történt meg
if (!isset($data)) {
    $data = fetchDataFromApi('read');
}

// Ha hiba történt
if ($data['status'] === 'error') {
    echo "<p>Hiba: " . $data['message'] . "</p>";
    exit;
}

?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API CRUD Táblázat</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; }
        th { background-color: #f4f4f4; }
        .form-input { margin: 10px 0; }
    </style>
</head>
<body>

<h1>CRUD API Táblázat</h1>

<!-- Új adat hozzáadása -->
<h2>Új adat hozzáadása</h2>
<form method="POST">
    <input type="text" name="code" placeholder="Kód" required>
    <input type="text" name="name" placeholder="Név" required>
    <input type="number" name="height" placeholder="Magasság" required>
    <input type="number" name="weight" placeholder="Súly" required>
    <button type="submit" name="create">Hozzáadás</button>
</form>

<!-- Adat frissítése -->
<h2>Adat frissítése</h2>
<form method="POST">
    <input type="text" name="code" placeholder="Kód" required>
    <input type="text" name="name" placeholder="Név" required>
    <input type="number" name="height" placeholder="Magasság" required>
    <input type="number" name="weight" placeholder="Súly" required>
    <button type="submit" name="update">Frissítés</button>
</form>

<!-- Adat törlése -->
<h2>Adat törlése</h2>
<form method="POST">
    <input type="text" name="code" placeholder="Kód" required>
    <button type="submit" name="delete">Törlés</button>
</form>

<?php
// Ha volt eredmény (sikeres művelet)
if (isset($result)) {
    echo '<p>' . ($result['status'] === 'success' ? $result['message'] : $result['message']) . '</p>';
}

// Adatok megjelenítése a táblázatban
if (!empty($data['data'])) {
    echo "<h2>API Adatok</h2>";
    echo "<table>";
    echo "<tr><th>Kód</th><th>Név</th><th>Magasság</th><th>Súly</th><th>Műveletek</th></tr>";
    foreach ($data['data'] as $item) {
        echo "<tr>
                <td>{$item['code']}</td>
                <td>{$item['name']}</td>
                <td>{$item['height']}</td>
                <td>{$item['weight']}</td>
                <td>
                    <form method='POST' style='display:inline;'>
                        <input type='hidden' name='code' value='{$item['code']}'>
                        <button type='submit' name='delete'>Törlés</button>
                    </form>
                    <form method='POST' style='display:inline;'>
                        <input type='hidden' name='code' value='{$item['code']}'>
                        <input type='hidden' name='name' value='{$item['name']}'>
                        <input type='hidden' name='height' value='{$item['height']}'>
                        <input type='hidden' name='weight' value='{$item['weight']}'>
                        <button type='submit' name='update'>Frissítés</button>
                    </form>
                </td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "<p>Nincs megjeleníthető adat.</p>";
}
?>

</body>
</html>
