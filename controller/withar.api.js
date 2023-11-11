const axios = require('axios');

exports.getWeatherForecast = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast',
    params: {
      location: '42.15, 82,1',
      timesteps: '1h',
      units: 'metric'
    },
    headers: {
      'X-RapidAPI-Key': 'a4f129f80amsh13f65e4fc99cadbp146a82jsne1a43bb43377',
      'X-RapidAPI-Host': 'tomorrow-io1.p.rapidapi.com'
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
