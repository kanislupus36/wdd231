// Set copyright year and last modified date
function setCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }
  }
  
  function setLastModifiedDate() {
    const lastModifiedDate = document.lastModified;
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = lastModifiedDate;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    setCopyrightYear();
    setLastModifiedDate();
    displayFormData();
  });
  
  // Weather API
 // Correct weather URL for current weather
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=40.7608&lon=-111.8910&units=imperial&appid=745c470da2ec7b078f8ca2d2d8e34724';  // Salt Lake City, UT

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        displayWeather(data); // Display the current weather
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        fetchWeatherForecast(lat, lon); // Fetch and display the 3-day forecast
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherContainer = document.querySelector('.weather-details');
    weatherContainer.innerHTML = ''; // Clear any existing content

    const currentWeather = data;
    const weatherIcon = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
    const currentTemp = currentWeather.main.temp;
    const description = currentWeather.weather[0].description;

    // Create and insert the current weather card
    const currentWeatherCard = document.createElement('div');
    currentWeatherCard.classList.add('weather-card');
    currentWeatherCard.innerHTML = `
        <img src="${weatherIcon}" alt="${description}">
        <h3>Current Weather</h3>
        <p>${currentTemp.toFixed(1)}°F</p>
        <p>${description}</p>
    `;
    weatherContainer.appendChild(currentWeatherCard);
}

async function fetchWeatherForecast(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=745c470da2ec7b078f8ca2d2d8e34724`;
    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        displayForecast(data); // Display the 3-day forecast
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

function displayForecast(data) {
    const forecastElement = document.querySelector('.weather-forecast');
    forecastElement.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const forecast = data.list[i * 8]; // Forecast for the next three days
        const weatherIcon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;
        const date = new Date(forecast.dt * 1000).toLocaleDateString();

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('weather-card');
        forecastCard.innerHTML = `
            <img src="${weatherIcon}" alt="${description}">
            <h3>${date}</h3>
            <p>${temp.toFixed(1)}°F</p>
            <p>${description}</p>
        `;
        forecastElement.appendChild(forecastCard); // Add to weather details
    }
}

  
 // Function to load members (assuming you have this function that loads your JSON data)
async function loadMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    return members;
}

// Function to render spotlight cards for gold and silver members
async function loadSpotlights() {
    const members = await loadMembers(); // Load members from the JSON file
    // Filter for gold (3) and silver (2) members
    const spotlightMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);

    // Randomly select 3 members for the spotlight (you can change this to 2 or any other number)
    const randomSpotlights = [];
    while (randomSpotlights.length < 3) {
        const randomIndex = Math.floor(Math.random() * spotlightMembers.length);
        const randomMember = spotlightMembers[randomIndex];
        // Avoid duplicate spotlights
        if (!randomSpotlights.includes(randomMember)) {
            randomSpotlights.push(randomMember);
        }
    }

    // Now render the spotlight cards in the .spotlights container
    const spotlightContainer = document.querySelector('.spotlights');
    spotlightContainer.innerHTML = ''; // Clear any existing content

    // Loop over the selected spotlight members and create the HTML structure
    randomSpotlights.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');

        spotlightCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevelText(member.membership_level)}</p>
        `;

        spotlightContainer.appendChild(spotlightCard); // Add the card to the container
    });
}

// Function to convert membership level number to text
function getMembershipLevelText(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// Call this function to load the spotlight cards when the page is loaded
window.onload = async () => {
    loadSpotlights();
};
  
  // Initialize page
  document.addEventListener('DOMContentLoaded', async () => {
    await fetchWeather();
    const members = await loadMembers();
    renderSpotlights(members);
  });
  
  // Example data for current events
const currentEvents = [
    {
        title: "Community Market",
        description: "This is the famous farmer's market in the community!",
        date: "December 10, 2024"
    },
    {
        title: "Art Exhibition",
        description: "This is an art exhibition coming to our city!",
        date: "December 12, 2024"
    },
    {
        title: "Carnival",
        description: "A carnival is coming to town!",
        date: "December 20, 2024"
    }
];

// Function to render event cards
function renderEvents(events) {
    const eventsContainer = document.querySelector('.current-events');
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('current-event-card');
        
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
        `;
        
        eventsContainer.appendChild(eventCard); // Add the card to the container
    });
}

// Call the renderEvents function to load the current events
renderEvents(currentEvents);

function addTimestamp() {
    // Get the current timestamp in ISO format
    var timestamp = new Date().toISOString();
    // Assign the timestamp to the hidden input field
    document.getElementById("timestamp").value = timestamp;
    console.log("Timestamp assigned:", timestamp); // Log the timestamp to the console for verification
}

// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        first_name: params.get("first_name"),
        last_name: params.get("last_name"),
        email: params.get("email"),
        mobile_phone: params.get("mobile_phone"),
        business_name: params.get("business_name"),
        timestamp: params.get("timestamp"),
    };
}

// Display the form data
function displayFormData() {
    const data = getQueryParams();
    const formDataList = document.getElementById("form-data");

    // Loop through the data object and create list items
    for (let key in data) {
        if (data[key]) { // Make sure there is data to display
            const listItem = document.createElement("li");
            if (key === "timestamp") {
                // Format the timestamp nicely
                const formattedDate = new Date(data[key]).toLocaleString();
                listItem.textContent = `Timestamp: ${formattedDate}`;
            } else {
                listItem.textContent = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}: ${data[key]}`;
            }
            formDataList.appendChild(listItem);
        }
    }
}


  // Lazy loading images
  document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('img.lazyload');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px 200px 0px', // Load images 200px before they come into view
        threshold: 0.01
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src'); // Set src from data-src attribute
                img.onload = () => img.classList.remove('lazyload'); // Remove lazyload class when image is loaded
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    lazyImages.forEach(image => observer.observe(image));

    // Display visitor message using localStorage
    const visitorMessageDiv = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        // First visit
        visitorMessageDiv.innerHTML = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceVisit < 1) {
            visitorMessageDiv.innerHTML = "Back so soon! Awesome!";
        } else {
            visitorMessageDiv.innerHTML = `You last visited ${daysSinceVisit} day${daysSinceVisit > 1 ? 's' : ''} ago.`;
        }
    }

    // Store current visit time
    localStorage.setItem('lastVisit', now);
});

document.addEventListener('DOMContentLoaded', function () {
    // Lazy loading images using IntersectionObserver
    const lazyImages = document.querySelectorAll('img.lazyload');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px 200px 0px', // Load images 200px before they come into view
        threshold: 0.01
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src'); // Set src from data-src attribute
                img.onload = () => img.classList.remove('lazyload'); // Remove lazyload class when image is loaded
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    lazyImages.forEach(image => observer.observe(image));

   // Get the current date in milliseconds (since the epoch)
// Get the current date in milliseconds (since the epoch)
const currentVisit = Date.now();

// Get the last visit date from localStorage
let lastVisit = localStorage.getItem('lastVisit');

// Function to calculate the number of days between two dates
function calculateDaysBetween(lastVisit) {
    const diffInMilliseconds = currentVisit - lastVisit;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Convert ms to days
    return diffInDays;
}

// Function to display the appropriate message
function displayVisitMessage() {
    const visitorMessageElement = document.getElementById('visitor-message'); // Using the ID to target the element

    // If this is the user's first visit (no 'lastVisit' in localStorage)
    if (!lastVisit) {
        visitorMessageElement.innerHTML = "<p>Welcome! Let us know if you have any questions.</p>";
    } else {
        const daysSinceVisit = calculateDaysBetween(lastVisit);

        // If less than 1 day between visits, show a quick return message
        if (daysSinceVisit < 1) {
            visitorMessageElement.innerHTML = "<p>Back so soon! Awesome!</p>";
        } else {
            // If more than 1 day between visits, show the number of days
            const dayText = daysSinceVisit === 1 ? "day" : "days";
            visitorMessageElement.innerHTML = `<p>You last visited ${daysSinceVisit} ${dayText} ago.</p>`;
        }
    }

    // Store the current visit date in localStorage
    localStorage.setItem('lastVisit', currentVisit);
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', displayVisitMessage);


});

