const express = require('express')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cors())

const { submitAppointment, getAppointments } = require('./controller');

app.post('/api/appointments', submitAppointment);
app.get('/api/appointments', getAppointments); 

app.listen(4005, () => console.log("Server running on 4005"));