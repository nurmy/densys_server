import app from './express.js'
import mongoose from 'mongoose'
import config from './config.js'

mongoose
    .connect(config.mongoUri)
    .then(() => {
        console.log('connected to DB')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`listening on port ${config.port}`)
})
