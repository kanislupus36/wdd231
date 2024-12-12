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
  
  document.addEventListener('DOMContentLoaded', async () => {
    setCopyrightYear();
    setLastModifiedDate();
    await fetchWeather();
    const roster = await loadRoster();
    loadSpotlights(roster);
    renderRoster(roster);
});

document.addEventListener('DOMContentLoaded', () => {
    displayFormData();
});

  
  // Weather API
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=-34.6037&lon=-58.3816&units=imperial&appid=745c470da2ec7b078f8ca2d2d8e34724';

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        displayWeather(data);
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        fetchWeatherForecast(lat, lon);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherContainer = document.querySelector('.weather-details');
    weatherContainer.innerHTML = '';

    const currentWeather = data;
    const weatherIcon = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
    const currentTemp = currentWeather.main.temp;
    const description = currentWeather.weather[0].description;

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
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

function displayForecast(data) {
    const forecastElement = document.querySelector('.weather-forecast');
    forecastElement.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const forecast = data.list[i * 8];
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
        forecastElement.appendChild(forecastCard);
    }
}

  
 // Roster stuff
async function loadRoster() {
    const response = await fetch('data/roster.json');
    const roster = await response.json();
    return roster;
}

async function loadSpotlights(roster) {
    const randomSpotlights = [];
    while (randomSpotlights.length < 3) {
        const randomIndex = Math.floor(Math.random() * roster.length);
        const randomMember = roster[randomIndex];

        if (!randomSpotlights.includes(randomMember)) {
            randomSpotlights.push(randomMember);
        }
    }

    const spotlightContainer = document.querySelector('.spotlights');
    spotlightContainer.innerHTML = '';

    randomSpotlights.forEach(player => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');

        spotlightCard.innerHTML = `
            <img src="images/${player.image}" alt="${player.name} logo">
            <h3>${player.name}</h3>
            <p><strong>Position:</strong> ${player.position}</p>
            <p><strong>Club:</strong> ${player.club}</p>
            <p><strong>Age:</strong> ${player.age}</p>
        `;

        spotlightContainer.appendChild(spotlightCard);
    });
}

function renderRoster(roster) {
    const memberContainer = document.getElementById('memberContainer');
    memberContainer.innerHTML = '';

    roster.forEach(player => {
      const rosterCard = document.createElement('div');
      rosterCard.classList.add('roster-card');

      rosterCard.innerHTML = `
        <img src="images/${player.image}" alt="${player.name} logo">
            <h3>${player.name}</h3>
            <p><strong>Position:</strong> ${player.position}</p>
            <p><strong>Club:</strong> ${player.club}</p>
            <p><strong>Age:</strong> ${player.age}</p>
      `;

      memberContainer.appendChild(rosterCard);
    });
  }

    document.getElementById('gridViewButton').addEventListener('click', () => {
    document.getElementById('memberContainer').classList.remove('list-view');
    document.getElementById('memberContainer').classList.add('grid-view');
  });

  document.getElementById('listViewButton').addEventListener('click', () => {
    document.getElementById('memberContainer').classList.remove('grid-view');
    document.getElementById('memberContainer').classList.add('list-view');
  });

  // Form stuff

  function addTimestamp() {
    var timestamp = new Date().toISOString();
    document.getElementById("timestamp").value = timestamp;
    console.log("Timestamp assigned:", timestamp);
}
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        first_name: params.get("first_name"),
        last_name: params.get("last_name"),
        email: params.get("email"),
        mobile_phone: params.get("mobile_phone"),
        timestamp: params.get("timestamp"),
    };
}

function displayFormData() {
    const data = getQueryParams();
    const formDataList = document.getElementById("form-data");
    
    for (let key in data) {
        if (data[key]) {
            const listItem = document.createElement("li");
            if (key === "timestamp") {
                const formattedDate = new Date(data[key]).toLocaleString();
                listItem.textContent = `Timestamp: ${formattedDate}`;
            } else {
                listItem.textContent = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}: ${data[key]}`;
            }
            formDataList.appendChild(listItem);
        }
    }
}

//Modal stuff
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}


  // Lazy loading images
  document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('img.lazyload');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px 200px 0px',
        threshold: 0.01
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.onload = () => img.classList.remove('lazyload');
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    lazyImages.forEach(image => observer.observe(image));


 // local storage stuff

//  document.addEventListener('DOMContentLoaded', function () {
//     const visitorMessageDiv = document.getElementById('visitor-message');
//     const lastVisit = localStorage.getItem('lastVisit');
//     const now = Date.now();

//     if (!lastVisit) {
//         visitorMessageDiv.innerHTML = "Welcome! Let us know if you have any questions.";
//     } else {
//         const daysSinceVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
//         if (daysSinceVisit < 1) {
//             visitorMessageDiv.innerHTML = "Back so soon! Awesome!";
//         } else {
//             visitorMessageDiv.innerHTML = `You last visited ${daysSinceVisit} day${daysSinceVisit > 1 ? 's' : ''} ago.`;
//         }
//     }

//     localStorage.setItem('lastVisit', now);
// });

const currentVisit = Date.now();

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
        visitorMessageElement.innerHTML = "<p>Welcome!</p>";
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

document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
});

  });