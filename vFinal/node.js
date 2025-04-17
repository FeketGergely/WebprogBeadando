const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/events') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        setInterval(() => {
            res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
        }, 1000);
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
            <!DOCTYPE html>
            <html lang="hu">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Server-Sent Events Példa</title>
                                   body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    #messages {
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>Server-Sent Events Példa</h1>
                <div id="messages"></div>

                <script>
                    if (typeof(EventSource) !== "undefined") {
                        const eventSource = new EventSource("/events");
                        eventSource.onmessage = function(event) {
                            const messagesDiv = document.getElementById("messages");
                            const newMessage = document.createElement("p");
                            newMessage.textContent = event.data;
                            messagesDiv.appendChild(newMessage);
                        };
                    } else {
                        document.getElementById("messages").textContent = "A böngésző nem támogatja a Server-Sent Events-t.";
                    }
                </script>
            </body>
            </html>
        `);
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
