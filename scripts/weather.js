// Select HTML elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');


// Build the URL for the weather API
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=745c470da2ec7b078f8ca2d2d8e34724`;

async function apiFetch() {
    try {
        // Fetch data from the API
        const response = await fetch(url);
        if (response.ok) {
            // Parse the JSON data
            const data = await response.json();
            console.log(data); // Output the data to the console for testing

            // Call the function to display results
            displayResults(data);
        } else {
            // If the response is not ok, throw an error
            throw new Error(await response.text());
        }
    } catch (error) {
        // Handle errors
        console.log('Error fetching data:', error);
    }
}

// Call the apiFetch function to get the data
apiFetch();

// Function to display results on the page
function displayResults(data) {
    // Convert temperature from Fahrenheit to display on the page
    const tempFahrenheit = data.main.temp;
    currentTemp.innerHTML = `${tempFahrenheit.toFixed(1)}&deg;F`;

    // Get the weather icon and description
    const iconCode = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/w/${iconCode}.png`;
    const desc = data.weather[0].description;

    // Update the weather icon and description in the HTML
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}
