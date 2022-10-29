const express = require('express')

const router = express.Router()

router.get('/:lat/:lon', (req, res) => {
  res.json({mssg: `location route for: ${req.params.lat}, ${req.params.lon}`}) 
})
 
module.exports = router 