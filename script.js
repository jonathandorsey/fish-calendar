const calendarGrid = document.getElementById('calendar-grid');
const fishCard = document.getElementById('fish-card');
const monthYearLabel = document.getElementById('current-month-year');

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

async function fetchFishData() {
    try {
        // We wrap the original URL in a proxy service (allorigins)
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = 'https://www.fishwatch.gov/api/species';
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        renderCalendar(data);
    } catch (error) {
        console.error("Fetch error:", error);
        fishCard.innerHTML = `<p>Error loading fish data. The sea is a bit choppy today! (Error: ${error.message})</p>`;
    }
}

function renderCalendar(fishList) {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    monthYearLabel.innerText = today.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day-cell');
        if (i === today.getDate()) dayCell.classList.add('today');
        dayCell.innerText = i;

        // Use the date to select a fish from the array (looping if necessary)
        const fishIndex = i % fishList.length;
        const fishOfDay = fishList[fishIndex];

        dayCell.addEventListener('click', () => displayFish(fishOfDay));
        calendarGrid.appendChild(dayCell);
    }
    
    // Auto-display today's fish
    displayFish(fishList[today.getDate() % fishList.length]);
}

function displayFish(fish) {
    // Note: The API provides images in an array under 'Image Gallery'
    const imageUrl = fish['Image Gallery'] ? fish['Image Gallery'][0]?.src : 'https://via.placeholder.com/300?text=No+Image+Available';
    
    fishCard.innerHTML = `
        <h3>${fish['Species Name']}</h3>
        <p><em>${fish['Scientific Name'] || ''}</em></p>
        <img src="${imageUrl}" alt="${fish['Species Name']}" class="fish-image">
        <div style="text-align: left; margin-top: 15px;">
            <p><strong>Habitat:</strong> ${fish['Habitat'] || 'Information not available'}</p>
            <p><strong>Fact:</strong> ${fish['Quote'] || 'A mysterious dweller of the deep.'}</p>
        </div>
    `;
}

fetchFishData();
