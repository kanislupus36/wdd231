function setCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }
}

function setLastModifiedDate() {
    const lastModifiedDate = document.lastModified;
    const secondParagraph = document.querySelector('footer p:nth-of-type(2)');
    if (secondParagraph) {
        secondParagraph.textContent = `Last modified: ${lastModifiedDate}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setCopyrightYear();
    setLastModifiedDate();
});

async function loadMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    return members;
  }

  // Render members in a given view
  function renderMembers(members) {
    const memberContainer = document.getElementById('memberContainer');
    memberContainer.innerHTML = ''; // Clear previous content

    members.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card');

      memberCard.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership_level)}</p>
        <p>${member.other_info}</p>
      `;

      memberContainer.appendChild(memberCard);
    });
  }

  // Convert membership level to text
  function getMembershipLevel(level) {
    switch (level) {
      case 1: return 'Member';
      case 2: return 'Silver';
      case 3: return 'Gold';
      default: return 'Unknown';
    }
  }

  // Toggle between Grid and List View
  document.getElementById('gridViewButton').addEventListener('click', () => {
    document.getElementById('memberContainer').classList.remove('list-view');
    document.getElementById('memberContainer').classList.add('grid-view');
  });

  document.getElementById('listViewButton').addEventListener('click', () => {
    document.getElementById('memberContainer').classList.remove('grid-view');
    document.getElementById('memberContainer').classList.add('list-view');
  });

  // Load and render the members when the page loads
  window.onload = async () => {
    const members = await loadMembers();
    renderMembers(members);
  };

  

  