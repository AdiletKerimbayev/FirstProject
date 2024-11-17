// document.addEventListener('DOMContentLoaded', function() {
//     const financialCtx = document.getElementById('financialChart').getContext('2d');

//     fetch('https://api.exchangerate-api.com/v4/latest/USD')
//         .then(response => response.json())
//         .then(data => {
//             const currencies = Object.keys(data.rates).slice(0, 5);
//             const rates = Object.values(data.rates).slice(0, 5);

//             new Chart(financialCtx, {
//                 type: 'bar',
//                 data: {
//                     labels: currencies,
//                     datasets: [{
//                         label: 'USD Exchange Rates',
//                         data: rates,
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.2)',
//                             'rgba(54, 162, 235, 0.2)',
//                             'rgba(255, 206, 86, 0.2)',
//                             'rgba(75, 192, 192, 0.2)',
//                             'rgba(153, 102, 255, 0.2)',
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 206, 86, 1)',
//                             'rgba(75, 192, 192, 1)',
//                             'rgba(153, 102, 255, 1)',
//                         ],
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });
//         });
// });
document.addEventListener('DOMContentLoaded', function () {
    const financialCtx = document.getElementById('financialChart').getContext('2d');
    const currencyInput = document.getElementById('currencyInput');
    const fetchDataButton = document.getElementById('fetchData');

    let chartInstance; // To store the Chart.js instance

    fetchDataButton.addEventListener('click', function () {
        const baseCurrency = currencyInput.value.trim().toUpperCase();

        if (!baseCurrency) {
            alert('Please enter a base currency.');
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid currency or API error.');
                }
                return response.json();
            })
            .then(data => {
                const currencies = Object.keys(data.rates).slice(0, 5);
                const rates = Object.values(data.rates).slice(0, 5);

                // Destroy the previous chart instance if it exists
                if (chartInstance) {
                    chartInstance.destroy();
                }

                // Create a new chart
                chartInstance = new Chart(financialCtx, {
                    type: 'bar',
                    data: {
                        labels: currencies,
                        datasets: [{
                            label: `Exchange Rates (${baseCurrency})`,
                            data: rates,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: `Exchange Rates for ${baseCurrency}`
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('An error occurred. Please enter a valid currency.');
            });
    });
});
