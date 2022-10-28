require('dotenv').config()
const express = require('express')
const locationRoutes = require('./routes/location')


const app = express()

app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})

// routes
app.use('/api/location', locationRoutes)


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})