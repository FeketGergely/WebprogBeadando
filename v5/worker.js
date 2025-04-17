let counterValue = 0; // Kezdeti számláló érték
let interval;

onmessage = function(event) {
    if (event.data === 'start') {
        interval = setInterval(function() {
            counterValue++; // A számláló növelése
            postMessage(counterValue); // Visszaküldjük a friss értéket a fő szálra
        }, 1000);
    }
};
