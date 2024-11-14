const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
  }
  
  getProphetData();

  const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create a section element and store it in a variable named "card"
        let card = document.createElement('section');
        
        // Create an h2 element and store it in a variable named "fullName"
        let fullName = document.createElement('h2');

        // Create p elements for Date of Birth and Place of Birth
        let dateOfBirth = document.createElement('p');
        let placeOfBirth = document.createElement('p');
        
        // Create an img element and store it in a variable named "portrait"
        let portrait = document.createElement('img');
        
        // Populate the heading element with the prophet's full name using a template string
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        // Populate the Date of Birth and Place of Birth
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;
        
        // Build the image element by setting the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        
        // Append the heading (fullName), image (portrait), and details to the section element (card)
        card.appendChild(fullName);
        card.appendChild(dateOfBirth);
        card.appendChild(placeOfBirth);
        card.appendChild(portrait);
        
        // Finally, append the section card to the "cards" div
        cards.appendChild(card);
    }); // end of arrow function and forEach loop
}