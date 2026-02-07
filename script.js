// DOM Elements
const currentDateEl = document.getElementById('currentDate');
const currentTimeEl = document.getElementById('currentTime');
const currentDayEl = document.getElementById('currentDay');
const percentageEl = document.getElementById('percentage');
const progressBarFill = document.getElementById('progressBarFill');
const dotsGrid = document.getElementById('dotsGrid');

// Constants
const TOTAL_DAYS = 365;
const DOTS_PER_ROW = 15;
const TOTAL_ROWS = Math.ceil(TOTAL_DAYS / DOTS_PER_ROW);

// Format date
function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
}

// Format time
function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('en-US', options);
}

// Calculate day of year
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

// Calculate percentage
function calculatePercentage(day) {
    return ((day / TOTAL_DAYS) * 100).toFixed(1);
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    currentDateEl.textContent = formatDate(now);
    currentTimeEl.textContent = formatTime(now);
    
    // Update every minute
    setTimeout(updateDateTime, 60000);
}

// Create dots grid
function createDotsGrid() {
    const currentDay = getDayOfYear(new Date());
    const percentage = calculatePercentage(currentDay);
    
    // Update displays
    currentDayEl.textContent = currentDay;
    percentageEl.textContent = `${percentage}%`;
    progressBarFill.style.width = `${percentage}%`;
    
    // Clear existing dots
    dotsGrid.innerHTML = '';
    
    // Create dots
    for (let i = 1; i <= TOTAL_DAYS; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        
        if (i < currentDay) {
            dot.classList.add('past');
        } else if (i === currentDay) {
            dot.classList.add('today');
        } else {
            dot.classList.add('future');
        }
        
        // Add hover effect
        dot.title = `Day ${i}${i === currentDay ? ' (Today)' : i < currentDay ? ' (Completed)' : ' (Upcoming)'}`;
        
        dotsGrid.appendChild(dot);
    }
}

// Initialize
function init() {
    updateDateTime();
    createDotsGrid();
    
    // Update dots every hour (in case someone leaves it open)
    setInterval(createDotsGrid, 3600000);
    
    // Initial update
    createDotsGrid();
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);