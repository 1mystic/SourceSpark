// backend/scraper.js
const axios = require('axios');
const cheerio = require('cheerio');

// --- Helper to parse date strings (very basic, adapt as needed) ---
function parseHackathonDate(dateString) {
    // Example: "Submissions open: Oct 26 - Dec 14, 2024" or "Ends Dec 15" or "Nov 1 - 5"
    // This is a placeholder. Real date parsing can be complex.
    // You might need to use a library like date-fns or moment.js
    // and inspect each site's date format carefully.
    if (!dateString) return { startDate: null, endDate: null, displayDate: 'N/A' };

    const currentYear = new Date().getFullYear();
    let startDate = null;
    let endDate = null;
    let displayDate = dateString;

    // Basic attempt for "Month Day" or "Month Day - Month Day"
    const rangeMatch = dateString.match(/(\w+\s+\d+)\s*-\s*(\w+\s+\d+)/);
    if (rangeMatch) {
        try {
            startDate = new Date(`${rangeMatch[1]}, ${currentYear}`);
            endDate = new Date(`${rangeMatch[2]}, ${currentYear}`);
            // If end month is before start month, assume it's next year (or handle year explicitly in string)
            if (endDate < startDate && !dateString.includes(String(currentYear + 1))) {
                 if (new Date(`${rangeMatch[2]}, ${currentYear + 1}`) > startDate) {
                    endDate = new Date(`${rangeMatch[2]}, ${currentYear + 1}`);
                 }
            }
            displayDate = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
        } catch (e) { console.error("Error parsing range date:", dateString, e); }
    } else {
        const singleDateMatch = dateString.match(/(\w+\s+\d+)/);
        if (singleDateMatch) {
            try {
                const parsedDate = new Date(`${singleDateMatch[1]}, ${currentYear}`);
                // Assume if it says "Ends Oct 31", it's an end date
                if (dateString.toLowerCase().includes('ends') || dateString.toLowerCase().includes('ended')) {
                    endDate = parsedDate;
                } else if (dateString.toLowerCase().includes('starts') || dateString.toLowerCase().includes('submission')) {
                    startDate = parsedDate;
                }
                displayDate = parsedDate.toLocaleDateString();
            } catch (e) { console.error("Error parsing single date:", dateString, e); }
        }
    }
    
    return {
        startDate: startDate ? startDate.toISOString().split('T')[0] : null,
        endDate: endDate ? endDate.toISOString().split('T')[0] : null,
        displayDate: displayDate || dateString // Fallback to original if parsing fails
    };
}

// --- Scraper for Devpost (Example - HTML structure WILL change) ---
async function scrapeDevpost() {
    const hackathons = [];
    try {
        const { data } = await axios.get('https://devpost.com/hackathons?open_to[]=public&status[]=upcoming&status[]=active', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);

        $('.hackathon-tile').each((i, el) => {
            const title = $(el).find('h3.title').text().trim();
            const url = $(el).find('a.block-link').attr('href');
            const description = $(el).find('.challenge-description').text().trim();
            const coverImage = $(el).find('.challenge-logo img').attr('src');
            const dateInfoText = $(el).find('.submission-period').text().trim();
            const participantsText = $(el).find('.participants-count').text().trim() || '0';
            const prizeText = $(el).find('.prize-amount').text().trim() || "Not specified";
            
            const { startDate, endDate, displayDate } = parseHackathonDate(dateInfoText);
            let status = 'upcoming'; // Default
            const now = new Date();
            if (startDate && new Date(startDate) > now) status = 'upcoming';
            else if (endDate && new Date(endDate) < now) status = 'completed'; // Should not happen with query
            else if (startDate && new Date(startDate) <= now && (endDate && new Date(endDate) >= now)) status = 'active';
            else if (endDate && new Date(endDate) >= now) status = 'active'; // If no start date, assume active if end date is future


            hackathons.push({
                id: `devpost-${url.split('/').pop() || i}`, // Create a unique ID
                title,
                description: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
                status,
                tags: ['Devpost', /* Add more tags based on content if possible */],
                dateInfo: displayDate || dateInfoText,
                startDate,
                endDate,
                participants: parseInt(participantsText.replace(/\D/g, '')) || 0,
                coverImage: coverImage?.startsWith('http') ? coverImage : (coverImage ? `https://devpost.com${coverImage}` : null),
                duration: 'N/A', // Devpost doesn't always list this easily
                prize: prizeText,
                url,
                source: 'Devpost'
            });
        });
        console.log(`Scraped ${hackathons.length} hackathons from Devpost.`);
    } catch (error) {
        console.error('Error scraping Devpost:', error.message);
    }
    return hackathons;
}

// --- Scraper for HackerEarth (Example - HTML structure WILL change) ---
async function scrapeHackerEarth() {
    const hackathons = [];
    try {
        // HackerEarth often uses JS to load content, might need Puppeteer for robust scraping.
        // This is a simplified example if some static content is available.
        // The URL below lists active/upcoming hackathons.
        const { data } = await axios.get('https://www.hackerearth.com/challenges/hackathon/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);

        // SELECTORS ARE HIGHLY LIKELY TO BE WRONG AND NEED UPDATING
        // You need to inspect HackerEarth's HTML structure carefully.
        $('.challenge-card-modern').each((i, el) => {
            const title = $(el).find('.challenge-name').text().trim();
            const url = 'https://www.hackerearth.com' + $(el).find('a.challenge-card-link').attr('href');
            const description = $(el).find('.challenge-description p').text().trim(); // Might not exist
            const coverImage = $(el).find('.event-image img').attr('src'); // Check attribute
            const dateInfoText = $(el).find('.date').text().trim(); // This selector is a guess
            const statusText = $(el).find('.challenge-status').text().trim().toLowerCase(); // e.g., "Upcoming", "Active"

            const { startDate, endDate, displayDate } = parseHackathonDate(dateInfoText);
            let status = statusText.includes('upcoming') ? 'upcoming' : (statusText.includes('active') || statusText.includes('live')) ? 'active' : 'unknown';

            hackathons.push({
                id: `hackerearth-${url.split('/').pop() || i}`,
                title,
                description: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
                status,
                tags: ['HackerEarth'],
                dateInfo: displayDate || dateInfoText,
                startDate,
                endDate,
                participants: 0, // Often not directly visible
                coverImage: coverImage?.startsWith('http') ? coverImage : null,
                duration: 'N/A',
                prize: $(el).find('.prize-details').text().trim() || "Not specified", // Guess
                url,
                source: 'HackerEarth'
            });
        });
        console.log(`Scraped ${hackathons.length} hackathons from HackerEarth.`);
    } catch (error) {
        console.error('Error scraping HackerEarth:', error.message);
        // HackerEarth might block direct axios requests or require JS rendering.
        // If Cheerio fails, Puppeteer is the next step for this site.
    }
    return hackathons;
}


module.exports = {
    scrapeDevpost,
    scrapeHackerEarth,
    // Add more scraper functions here for other sites
};