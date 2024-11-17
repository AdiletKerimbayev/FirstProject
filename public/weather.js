// document.addEventListener('DOMContentLoaded', function() {
//     const weatherCtx = document.getElementById('weatherChart').getContext('2d');

//     // Replace with your actual API key and endpoint
//     fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=690239406f7534b3f7dd8c03384d6c89')
//         .then(response => response.json())
//         .then(data => {
//             const temp = (data.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
//             const feels_like = (data.main.feels_like - 273.15).toFixed(2); // Convert Kelvin to Celsius
//             const humidity = data.main.humidity;

//             new Chart(weatherCtx, {
//                 type: 'line',
//                 data: {
//                     labels: ['Temperature', 'Feels Like', 'Humidity'],
//                     datasets: [{
//                         label: 'Weather Data for London',
//                         data: [temp, feels_like, humidity],
//                         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                         borderColor: 'rgba(54, 162, 235, 1)',
//                         borderWidth: 1,
//                         fill: false,
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         y: {
//                             beginAtZero: false
//                         }
//                     },
//                     plugins: {
//                         legend: {
//                             display: true
//                         },
//                         title: {
//                             display: true,
//                             text: 'Current Weather Data'
//                         }
//                     }
//                 }
//             });
//         });
// });
document.addEventListener('DOMContentLoaded', function () {
    const weatherCtx = document.getElementById('weatherChart').getContext('2d');
    const cityInput = document.getElementById('cityInput');
    const fetchDataButton = document.getElementById('fetchData');

    let chartInstance; // To store the Chart.js instance

    fetchDataButton.addEventListener('click', function () {
        const city = cityInput.value.trim();

        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        // Fetch weather data for the input city
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=690239406f7534b3f7dd8c03384d6c89`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found or API error.');
                }
                return response.json();
            })
            .then(data => {
                const temp = (data.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
                const feels_like = (data.main.feels_like - 273.15).toFixed(2); // Convert Kelvin to Celsius
                const humidity = data.main.humidity;

                // Destroy the previous chart instance if it exists
                if (chartInstance) {
                    chartInstance.destroy();
                }

                // Create a new chart
                chartInstance = new Chart(weatherCtx, {
                    type: 'line',
                    data: {
                        labels: ['Temperature', 'Feels Like', 'Humidity'],
                        datasets: [{
                            label: `Weather Data for ${city}`,
                            data: [temp, feels_like, humidity],
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            fill: false,
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false
                            }
                        },
                        plugins: {
                            legend: {
                                display: true
                            },
                            title: {
                                display: true,
                                text: `Current Weather Data for ${city}`
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('An error occurred. Please enter a valid city.');
            });
    });
});