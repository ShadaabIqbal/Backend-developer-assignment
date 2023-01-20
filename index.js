const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./src/route/userRoutes')
const adminRoutes = require('./src/route/adminRoutes')

app.use(express.json())

app.use(userRoutes)
app.use(adminRoutes)

mongoose.connect('mongodb+srv://ShadaabIqbal:SHYihabvgthRfy3z@mycluster.cuj3crc.mongodb.net/Runo-assignment', { useNewUrlParser: true }, mongoose.set({ strictQuery: false }))
    .then(() => { console.log('mongoDB is connected') })
    .catch((error) => { console.log(error.message) })

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port' + ' ' + (process.env.PORT || 3000))
})