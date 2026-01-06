const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve the AI commerce page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ai-commerce.html'));
});

// API endpoint to get deployment info
app.get('/api/deployment', (req, res) => {
    try {
        const deployment = require('./deployment.json');
        res.json(deployment);
    } catch (error) {
        res.status(500).json({ error: 'Deployment info not found' });
    }
});

// API endpoint to proxy Gemini requests (to hide API key from frontend)
app.post('/api/ai-analyze', async (req, res) => {
    try {
        const { prompt } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 AI Commerce Platform running at http://localhost:${PORT}`);
    console.log(`📱 Open your browser and navigate to the URL above`);
});
