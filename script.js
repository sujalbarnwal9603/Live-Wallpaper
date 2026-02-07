// DOM Elements
const currentDateEl = document.getElementById('currentDate');
const currentTimeEl = document.getElementById('currentTime');
const currentDayEl = document.getElementById('currentDay');
const percentageEl = document.getElementById('percentage');
const dotsContainer = document.getElementById('dotsContainer');

// Constants
const TOTAL_DAYS = 365;
const DOTS_PER_ROW = 15;

// Format date without time
function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    
    return `${dayName}, ${day} ${monthName}`;
}

// Format time (24-hour format)
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    // Add leading zero
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes}`;
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
    const now = new Date();
    const currentDay = getDayOfYear(now);
    const percentage = calculatePercentage(currentDay);
    
    // Update displays
    currentDayEl.textContent = currentDay;
    percentageEl.textContent = `${percentage}% completed`;
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create dots
    for (let i = 1; i <= TOTAL_DAYS; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        
        if (i < currentDay) {
            dot.classList.add('completed');
        } else if (i === currentDay) {
            dot.classList.add('current');
        } else {
            dot.classList.add('upcoming');
        }
        
        dotsContainer.appendChild(dot);
    }
}

// Initialize
function init() {
    updateDateTime();
    createDotsGrid();
    
    // Update at midnight to change day
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeToMidnight = midnight - now;
    
    // Schedule update for midnight
    setTimeout(() => {
        createDotsGrid();
        // Then update every 24 hours
        setInterval(createDotsGrid, 86400000);
    }, timeToMidnight);
}

// Start when page loads
document.addEventListener('DOMContentLoaded', init);