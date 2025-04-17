document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("#crudForm");
    const tableBody = document.querySelector("#dataTable tbody");
    const errorMessages = document.querySelector("#errorMessages");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form submitted");  // Ellenőrzés

        const id = document.querySelector("#idInput").value;
        const name = document.querySelector("#nameInput").value;
        const age = document.querySelector("#ageInput").value;
        const city = document.querySelector("#cityInput").value;
        const phone = document.querySelector("#phoneInput").value;

        errorMessages.innerHTML = "";
        let valid = true;

        if (name.length < 2 || name.length > 50) {
            valid = false;
            errorMessages.innerHTML += "<p>A név hossza 2 és 50 karakter között kell legyen.</p>";
        }
        if (age < 1 || age > 120) {
            valid = false;
            errorMessages.innerHTML += "<p>A kor 1 és 120 között kell legyen.</p>";
        }
        if (city.length < 2 || city.length > 50) {
            valid = false;
            errorMessages.innerHTML += "<p>A város hossza 2 és 50 karakter között kell legyen.</p>";
        }
        if (!phone.match(/^\d{10}$/)) {
            valid = false;
            errorMessages.innerHTML += "<p>A telefon számnak 10 számjegyűnek kell lennie.</p>";
        }

        if (!valid) return;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td>${city}</td>
            <td>${phone}</td>
            <td>
                <button class="editBtn">Szerkesztés</button>
                <button class="deleteBtn">Törlés</button>
            </td>
        `;
        tableBody.appendChild(row);
        form.reset();

        row.querySelector(".deleteBtn").addEventListener("click", function () {
            row.remove();
        });

        row.querySelector(".editBtn").addEventListener("click", function () {
            document.querySelector("#idInput").value = id;
            document.querySelector("#nameInput").value = name;
            document.querySelector("#ageInput").value = age;
            document.querySelector("#cityInput").value = city;
            document.querySelector("#phoneInput").value = phone;
            row.remove();
        });
    });

    document.getElementById("searchInput").addEventListener("input", function () {
        const filter = this.value.toLowerCase();
        const rows = document.querySelectorAll("#dataTable tbody tr");

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const match = Array.from(cells).some(cell => cell.innerText.toLowerCase().includes(filter));
            row.style.display = match ? "" : "none";
        });
    });

    function sortTable(columnIndex) {
        const table = document.getElementById("dataTable");
        const rows = Array.from(table.rows).slice(1);
        const sortedRows = rows.sort((rowA, rowB) => {
            const cellA = rowA.cells[columnIndex].innerText;
            const cellB = rowB.cells[columnIndex].innerText;

            return cellA.localeCompare(cellB);
        });

        sortedRows.forEach(row => table.appendChild(row));
    }

    const headers = document.querySelectorAll("#dataTable th");
    headers.forEach((header, index) => {
        header.addEventListener("click", () => sortTable(index));
    });
});