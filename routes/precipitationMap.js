const express = require('express')
require('dotenv').config()
const axios = require('axios')
const { json } = require('body-parser')

const router = express.Router()

router.get('/map/:lat/:lon/:zoom', async (req, res) => {
  let baseUrl = `https://tile.openweathermap.org/map/precipitation_new/${req.params.zoom}/${req.params.lat}/${req.params.lon}.png?appid=${process.env.WEATHER_KEY}`
  try{

    let resData = await axios.get(baseUrl)
    res.send({'resData': resData})
  } catch (err) {
    res.json({error: err.message, url: baseUrl})
  }
})
 
module.exports = router 