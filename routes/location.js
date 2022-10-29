const express = require('express')
require('dotenv').config()
const axios = require('axios')


const router = express.Router()

// locationIQ sample query: 
// GET https://us1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json


// later: set up list of incoming cities on frontend, user selects correct one, resume calls 
// ex: Augusta Maine, Augusta GA 


// get responses for a given city (might return multiple)
router.get('/:city', async (req, res) => {
  base_url = `https://us1.locationiq.com/v1/search?key=${process.env.LOCATION_TOKEN}&q=${req.params.city}&format=json`
  try{
    let resData = await axios.get(base_url)
    let cityName = resData.data[0].display_name
    let latitude = resData.data[0].lat
    let longitude = resData.data[0].lon
    res.send({city: cityName, lat: latitude, lon: longitude})
  } catch (err) {
    res.json({error: err.message})
  }
})

module.exports = router 