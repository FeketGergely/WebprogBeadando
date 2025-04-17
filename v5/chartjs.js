function drawChart(row) {
    let data = Array.from(row.children).map(td => parseInt(td.innerText));
    
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [{
                label: 'Táblázat adatai',
                data: data,
                borderColor: 'blue',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true
        }
    });
}