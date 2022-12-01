import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import authRouter from './routes/auth.route.js'
import patientsRouter from './routes/patients.route.js'
import doctorsRouter from './routes/doctors.route.js'
import specializationsRouter from './routes/specializations.route.js'
import bookingsRouter from './routes/bookings.route.js'
import requestsRouter from './routes/requests.route.js'
import uploadRouter from './routes/upload.route.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/doctors', doctorsRouter)
app.use('/patients', patientsRouter)
app.use('/specs', specializationsRouter)
app.use('/bookings', bookingsRouter)
app.use('/requests', requestsRouter)
app.use('/upload', uploadRouter)

export default app
