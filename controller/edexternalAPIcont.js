const axios = require('axios');
const { apiKey } = process.env; // Store your API key in environment variables

exports.getClimateNews = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://environment-news-live.p.rapidapi.com/news/timesofindia',
    headers: {
      'X-RapidAPI-Key': 'b99aadde8bmsh519fa68b44c4feap14b27ajsn41e239cfe8fc', // Use the API key from environment variables
      'X-RapidAPI-Host': 'environment-news-live.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching climate news' });
  }
};

exports.getAllNewsArticles = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://environment-news-live.p.rapidapi.com/news',
    headers: {
        'X-RapidAPI-Key': 'b99aadde8bmsh519fa68b44c4feap14b27ajsn41e239cfe8fc',
        'X-RapidAPI-Host': 'environment-news-live.p.rapidapi.com'
      }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);

    if (error.response) {
      // The request was made and the server responded with a status code
      console.error(`Status: ${error.response.status}`);
      console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }

    res.status(500).json({ error: 'An error occurred while fetching news articles' });
  }
};

exports.getNewsPublishers = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://environment-news-live.p.rapidapi.com/newspapers',
    headers: {
        'X-RapidAPI-Key': 'b99aadde8bmsh519fa68b44c4feap14b27ajsn41e239cfe8fc',
        'X-RapidAPI-Host': 'environment-news-live.p.rapidapi.com'
      },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching news publishers' });
  }
};
