const express = require('express')

const router = express.Router()

// get responses for a given city (might return multiple)
router.get('/:city', (req, res) => {
  res.json({mssg: `location route for: ${req.params.city}`}) 
})

// later: handle multiple locations with same name 

module.exports = router 