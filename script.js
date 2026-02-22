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
    // 1. Find the image source
    let imageUrl = '';
    
    if (fish['Image Gallery'] && fish['Image Gallery'].length > 0) {
        imageUrl = fish['Image Gallery'][0].src;
    } else {
        // Fallback if the API has no image for this specific fish
        imageUrl = 'https://via.placeholder.com/400x300?text=No+Fish+Photo+Available';
    }

    // 2. Update the HTML
    fishCard.innerHTML = `
        <div class="fish-container">
            <h3>${fish['Species Name']}</h3>
            <p style="color: #666;"><em>${fish['Scientific Name'] || 'Scientific name unknown'}</em></p>
            
            <div class="image-wrapper">
                <img src="${imageUrl}" 
                     alt="${fish['Species Name']}" 
                     class="fish-image" 
                     style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
            </div>

            <div class="fish-info" style="text-align: left; margin-top: 20px; line-height: 1.6;">
                <p><strong>Habitat:</strong> ${fish['Habitat'] || 'Deep in the blue sea...'}</p>
                <p><strong>Interesting Fact:</strong> ${fish['Quote'] || 'A fascinating specimen of the ocean.'}</p>
            </div>
        </div>
    `;
}

fetchFishData();
