const appointments = []

module.exports = {

    submitAppointment: (req, res) => {
        const { firstNameInput, lastNameInput, phoneInput, emailInput, serviceInput, dateInput, timeInput} = req.body;
        
        let appointmentExists = false;
        appointments.forEach((appointment) => {
            if (appointment.dateInput === dateInput && appointment.timeInput === timeInput) {
                appointmentExists = true;
            }
        });
    
        if (appointmentExists) {
            return res.status(400).send({ message: "Appointment already exists for requested date and time" });
        } else {
            const newAppointment = {
                id: appointments.length + 1,
                firstNameInput,
                lastNameInput,
                phoneInput,
                emailInput,
                serviceInput,
                dateInput,
                timeInput,
            };
    
            appointments.push(newAppointment);
            console.log(appointments)
            res.status(200).send(newAppointment)
        }
    },

    getAppointments: (req, res) => {
        res.status(200).send(appointments)
    }
}