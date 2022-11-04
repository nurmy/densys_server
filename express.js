import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import authRouter from './routes/auth.route.js'
import patientsRouter from './routes/patients.route.js'
import doctorsRouter from './routes/doctors.route.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/doctors', doctorsRouter)
app.use('/patients', patientsRouter)

export default app
