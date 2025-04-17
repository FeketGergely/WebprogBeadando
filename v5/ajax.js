const apiUrl = 'https://api.example.com/data'; // Az API URL-je

function readData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const dataDiv = document.getElementById('data');
            dataDiv.innerHTML = '';
            let heights = [];
            data.forEach(item => {
                const p = document.createElement('p');
                p.textContent = `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}`;
                dataDiv.appendChild(p);
                heights.push(item.height);
            });
            const sum = heights.reduce((a, b) => a + b, 0);
            const avg = sum / heights.length;
            const max = Math.max(...heights);
            dataDiv.innerHTML += `<p>Összeg: ${sum}</p>`;
            dataDiv.innerHTML += `<p>Átlag: ${avg}</p>`;
            dataDiv.innerHTML += `<p>Legnagyobb: ${max}</p>`;
        })
        .catch(error => {
            document.getElementById('messages').textContent = `Hiba: ${error.message}`;
        });
}

function createData() {
    const name = document.getElementById('createName').value;
    const height = document.getElementById('createHeight').value;
    if (name === '' || height === '' || name.length > 30) {
        document.getElementById('messages').textContent = 'Hiba: A mezők nem lehetnek üresek és a név maximum 30 karakter lehet.';
        return;
    }
    const data = { name, height };
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('messages').textContent = 'Sikeresen létrehozva!';
    })
    .catch(error => {
        document.getElementById('messages').textContent = `Hiba: ${error.message}`;
    });
}

function getDataForId() {
    const id = document.getElementById('updateId').value;
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('updateName').value = data.name;
            document.getElementById('updateHeight').value = data.height;
        })
        .catch(error => {
            document.getElementById('messages').textContent = `Hiba: ${error.message}`;
        });
}

function updateData() {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const height = document.getElementById('updateHeight').value;
    if (name === '' || height === '' || name.length > 30) {
        document.getElementById('messages').textContent = 'Hiba: A mezők nem lehetnek üresek és a név maximum 30 karakter lehet.';
        return;
    }
    const data = { name, height };
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('messages').textContent = 'Sikeresen frissítve!';
    })
    .catch(error => {
        document.getElementById('messages').textContent = `Hiba: ${error.message}`;
    });
}

function deleteData() {
    const id = document.getElementById('deleteId').value;
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('messages').textContent = 'Sikeresen törölve!';
    })
    .catch(error => {
        document.getElementById('messages').textContent = `Hiba: ${error.message}`;
    });
}
