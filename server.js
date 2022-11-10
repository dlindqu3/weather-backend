require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const locationRoutes = require('./routes/location')
const weatherRoutes = require('./routes/weather')
const precipitationMapRoutes = require('./routes/precipitationMap')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')

const app = express()

const allowedOrigins = ['http://localhost:4000', 'http://localhost:3000', "https://celera-weather.vercel.app/"];

const options = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// routes
app.get('/', (req, res) =>{
  res.json({mssg: 'welcome to the site'})
})
app.use('/api/user', userRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/precipitation', precipitationMapRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`)
    })
  }).catch((error) =>{
    console.log(error)
  })

