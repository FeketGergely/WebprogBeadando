<?php
$fields = [];

// Csak a ténylegesen használt mezőket tartjuk meg
foreach(["op", "code", "name", "height", "weight", "id"] as $f) {
    if(isset($_POST[$f])) {
        $fields[$f] = $_POST[$f];
    }
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://gamf.nhely.hu/ajax2/");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // fontos! visszakapjuk a választ
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0");
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
