
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/check', async (req, res) => {
  const domain = req.query.domain;
  const apiKey = process.env.API_KEY;

  console.log("Gelen domain:", domain);

  if (!domain || !apiKey) {
    return res.status(400).json({ error: 'Eksik parametre veya API key.' });
  }

  try {
    const response = await axios.get('https://domain-availability.whoisxmlapi.com/api/v1', {
      params: {
        apiKey: apiKey,
        domainName: domain,
        credits: 'DA'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("API Hatası:", error.message);
    console.error("Detay:", error.response?.data || error);
    res.status(500).json({ error: 'API isteği başarısız.' });
  }

});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
