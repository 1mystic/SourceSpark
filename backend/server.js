// backend/server.js
const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const { scrapeDevpost, scrapeHackerEarth } = require('./scraper');

const app = express();
const port = process.env.PORT || 3001; // Different from Vite's port

// Cache: Store scraped data for 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });

app.use(cors()); // Allow all origins for development simplicity
app.use(express.json());

app.get('/api/hackathons', async (req, res) => {
    const cacheKey = 'allHackathons';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log('Serving hackathons from cache.');
        return res.json(cachedData);
    }

    try {
        console.log('Scraping hackathons...');
        // Run scrapers in parallel
        const [devpostHackathons, hackerEarthHackathons] = await Promise.all([
            scrapeDevpost(),
            scrapeHackerEarth(),
            // Add calls to other scrapers here
        ]);

        const allHackathons = [
            ...devpostHackathons,
            ...hackerEarthHackathons,
            // Spread results from other scrapers
        ];
        
        // Simple deduplication based on title and first part of URL (can be improved)
        const uniqueHackathons = allHackathons.reduce((acc, current) => {
            const x = acc.find(item => item.title === current.title && item.url.split('/').slice(0,4).join('/') === current.url.split('/').slice(0,4).join('/'));
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);


        // Sort by start date (upcoming first), then by status (active)
        uniqueHackathons.sort((a, b) => {
            const now = new Date();
            const aIsUpcoming = a.startDate && new Date(a.startDate) > now;
            const bIsUpcoming = b.startDate && new Date(b.startDate) > now;
            const aIsActive = a.status === 'active';
            const bIsActive = b.status === 'active';

            if (aIsUpcoming && !bIsUpcoming) return -1;
            if (!aIsUpcoming && bIsUpcoming) return 1;
            if (aIsActive && !bIsActive) return -1;
            if (!aIsActive && bIsActive) return 1;
            if (a.startDate && b.startDate) return new Date(a.startDate) - new Date(b.startDate);
            return 0;
        });

        cache.set(cacheKey, uniqueHackathons);
        console.log(`Total unique hackathons fetched: ${uniqueHackathons.length}`);
        res.json(uniqueHackathons);
    } catch (error) {
        console.error('Error fetching hackathons:', error);
        res.status(500).json({ error: 'Failed to fetch hackathons', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});