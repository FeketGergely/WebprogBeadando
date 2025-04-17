<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

$time = date('H:i:s');
echo "data: $time\n\n";
flush();
?>