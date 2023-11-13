// climateNews.controller.js
const axios = require('axios');

exports.getClimateNews = async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://climate-news-feed.p.rapidapi.com/',
      params: {
        source: 'Nasa Climate',
        limit: '50',
        exclude: 'The Guardian',
      },
      headers: {
        'X-RapidAPI-Key': 'a4f129f80amsh13f65e4fc99cadbp146a82jsne1a43bb43377',
        'X-RapidAPI-Host': 'climate-news-feed.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
