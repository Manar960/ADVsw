const axios = require('axios');

exports.getWeatherForecast = async (req, res) => {
  const { latitude, longitude } = req.query;
  const location = latitude && longitude ? `${latitude},${longitude}` : '35.6895,139.6917';

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: { q: location },
    headers: {
      'X-RapidAPI-Key': 'a4f129f80amsh13f65e4fc99cadbp146a82jsne1a43bb43377',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


