const express = require('express')
require('dotenv').config()
const axios = require('axios')

const router = express.Router()

// sample loc data: {
//   "city": "Chicago, Cook County, Illinois, USA",
//   "lat": "41.8755616",
//   "lon": "-87.6244212"
//   }

// openWeather sample query:
// api.openweathermap.org/data/2.5/forecast?lat=41.8755616&lon=-87.6244212&appid={my_key}

router.get('/coordinates/:lat/:lon', async (req, res) => {
  let baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.lon}&appid=${process.env.WEATHER_KEY}`
  try{
    let resData = await axios.get(baseUrl)
    res.send({data: resData.data})
  } catch (err) {
    res.json({error: err.message, url: baseUrl})
  }
})
 
module.exports = router 