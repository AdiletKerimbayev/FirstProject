// document.addEventListener('DOMContentLoaded', function() {
//     const environmentalCtx = document.getElementById('environmentalChart').getContext('2d');

//     // Using a demo token for demonstration purposes
//     fetch('https://api.waqi.info/feed/beijing/?token=demo')
//         .then(response => response.json())
//         .then(data => {
//             const aqi = data.data.aqi;
//             const pollutants = ['PM2.5', 'PM10', 'O3', 'NO2', 'SO2', 'CO']; // Assuming these pollutants are available
//             const values = [aqi, aqi, aqi, aqi, aqi, aqi]; // Replace with actual values from the API

//             new Chart(environmentalCtx, {
//                 type: 'doughnut',
//                 data: {
//                     labels: pollutants,
//                     datasets: [{
//                         label: 'Air Quality Index (Beijing)',
//                         data: values,
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.2)',
//                             'rgba(54, 162, 235, 0.2)',
//                             'rgba(255, 206, 86, 0.2)',
//                             'rgba(75, 192, 192, 0.2)',
//                             'rgba(153, 102, 255, 0.2)',
//                             'rgba(255, 159, 64, 0.2)'
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 206, 86, 1)',
//                             'rgba(75, 192, 192, 1)',
//                             'rgba(153, 102, 255, 1)',
//                             'rgba(255, 159, 64, 1)'
//                         ],
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'bottom',
//                         },
//                         title: {
//                             display: true,
//                             text: 'Air Quality Index (Beijing)'
//                         }
//                     }
//                 }
//             });
//         });
// });
document.addEventListener('DOMContentLoaded', function () {
    const environmentalCtx = document.getElementById('environmentalChart').getContext('2d');
    const cityInput = document.getElementById('cityInput');
    const fetchDataButton = document.getElementById('fetchData');

    let chartInstance; // To hold the Chart.js instance

    fetchDataButton.addEventListener('click', function () {
        const city = cityInput.value.trim();

        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        fetch(`https://api.waqi.info/feed/${city}/?token=demo`)
            .then(response => response.json())
            .then(data => {
                if (data.status !== 'ok') {
                    alert('City not found or API error. Please try again.');
                    return;
                }

                const aqi = data.data.aqi;
                const pollutants = ['PM2.5', 'PM10', 'O3', 'NO2', 'SO2', 'CO'];
                const values = [aqi, aqi, aqi, aqi, aqi, aqi]; // Replace with real API values if available

                // Destroy the previous chart instance if it exists
                if (chartInstance) {
                    chartInstance.destroy();
                }

                // Create a new chart
                chartInstance = new Chart(environmentalCtx, {
                    type: 'doughnut',
                    data: {
                        labels: pollutants,
                        datasets: [{
                            label: `Air Quality Index (${city})`,
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                            title: {
                                display: true,
                                text: `Air Quality Index (${city})`
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('An error occurred. Please try again.');
            });
    });
});

