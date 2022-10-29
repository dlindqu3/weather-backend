const express = require('express')

const router = express.Router()

// sample loc data: {
//   "city": "Chicago, Cook County, Illinois, USA",
//   "lat": "41.8755616",
//   "lon": "-87.6244212"
//   }

router.get('/:lat/:lon', (req, res) => {
  res.json({mssg: `weather route for: ${req.params.lat}, ${req.params.lon}`}) 
})
 
module.exports = router 