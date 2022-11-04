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
  console.log('base_url: ', base_url)

  try {
    let resData = await axios.get(base_url)
    let resultArr = []
    resData.data.map((item) => {
      newArr = []
      newArr.push(item.display_name)
      newArr.push(item.lat)
      newArr.push(item.lon)
      resultArr.push(newArr)
    })
    res.send(resultArr)
  } catch (err) {
   res.send({'error': err.code})
  }
})




module.exports = router 