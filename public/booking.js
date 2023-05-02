var firstName = document.getElementById("first-name");
var lastName = document.getElementById("last-name");
var phone = document.getElementById("phone");
var email = document.getElementById("email");
var service = document.getElementById("service");
var time = document.getElementById("time");
var submitButton = document.getElementById("submit");
var date = document.getElementById("date");
var appointmentForm = document.getElementById("appointment-form");
var bookingMessage = document.getElementById("message")
var timeStyles = document.getElementById("time-selector");

firstName.addEventListener("input", checkFormFields);
lastName.addEventListener("input", checkFormFields);
phone.addEventListener("input", checkFormFields);
email.addEventListener("input", checkFormFields);
service.addEventListener("change", checkFormFields);
time.addEventListener("change", checkFormFields);
date.addEventListener("change", checkFormFields);

function checkFormFields() {
  if (firstName.value && lastName.value && phone.value && email.value && service.value && time.value && date.value) {
    return true
  } else {
    return false
  }
}


function showTimeSelector() {
  var timeSelector = document.getElementById("time-selector");
  var timeOptions = document.getElementById("time").options;
  console.log(timeOptions)
  

  

  timeOptions.length = 1;
  
  if (service.value === "Haircut") {
    
    timeOptions[timeOptions.length] = new Option("12:00pm", "12:00pm");
    timeOptions[timeOptions.length] = new Option("1:00pm", "1:00pm");
    timeOptions[timeOptions.length] = new Option("2:00pm", "2:00pm");
    timeOptions[timeOptions.length] = new Option("3:00pm", "3:00pm");
    
    timeSelector.style.display = "flex";
  } else if (service.value === "Coloring") {
    
    timeOptions[timeOptions.length] = new Option("12:00pm", "12:00pm");
    timeOptions[timeOptions.length] = new Option("1:00pm", "1:00pm");
    timeOptions[timeOptions.length] = new Option("2:00pm", "2:00pm");
    timeOptions[timeOptions.length] = new Option("3:00pm", "3:00pm");

    timeSelector.style.display = "flex";
  } else if (service.value === "Styling") {
    
    timeOptions[timeOptions.length] = new Option("12:00pm", "12:00pm");
    timeOptions[timeOptions.length] = new Option("1:00pm", "1:00pm");
    timeOptions[timeOptions.length] = new Option("2:00pm", "2:00pm");
    timeOptions[timeOptions.length] = new Option("3:00pm", "3:00pm");

    timeSelector.style.display = "flex";
  } else if (service.value === "Perm") {
    
    timeOptions[timeOptions.length] = new Option("12:00pm", "12:00pm");
    timeOptions[timeOptions.length] = new Option("1:00pm", "1:00pm");
    timeOptions[timeOptions.length] = new Option("2:00pm", "2:00pm");
    timeOptions[timeOptions.length] = new Option("3:00pm", "3:00pm");

    timeSelector.style.display = "flex";
  }
}

const addAppointment = (event) => {
console.log(checkFormFields())
if (!checkFormFields()) {
  console.log(checkFormFields())
  return alert("One or more sections of the form have not been completed")
}


  event.preventDefault();
  console.log("hello")
  const firstNameInput = firstName.value;
  const lastNameInput = lastName.value;
  const phoneInput = phone.value;
  const emailInput = email.value;
  const serviceInput = service.value;
  const dateInput = date.value;
  const timeInput = time.value;

 
  
  axios.post("http://localhost:4005/api/appointments", { firstNameInput, lastNameInput, phoneInput, emailInput, serviceInput, dateInput, timeInput})
    .then(res => {
      const bookingComplete = document.createElement("h1");
      bookingComplete.textContent = "Thank You For Booking!";
      
      bookingMessage.innerHTML += bookingComplete.innerHTML
      appointmentForm.style.display = "none";

      const viewAllButton = document.createElement("button");
      viewAllButton.textContent = "View all appointments";
      document.body.appendChild(viewAllButton);
      viewAllButton.classList.add("viewAllBtn")

      const viewAllAppointmentsOnce = () => {
        viewAllAppointments();
        viewAllButton.removeEventListener('click', viewAllAppointmentsOnce);
      };
      
      viewAllButton.addEventListener("click", viewAllAppointmentsOnce);
      
    })
    .catch(error => {
      console.log(error)
      alert("Appointment already exists for requested date and time");
    });
    document.getElementById("appointment-form").reset();
}


const viewAllAppointments = () => {
  
  axios.get("http://localhost:4005/api/appointments")
  .then(res => {
    const appointments = res.data;
    let table = "<table><tr><th>First Name</th><th>Last Name</th><th>Phone</th><th>Email</th><th>Service</th><th>Date</th><th>Time</th></tr>";
    for (let i = 0; i < appointments.length; i++) {
      let appointment = appointments[i];
      table += "<tr><td>" + appointment.firstNameInput + "</td><td>" + appointment.lastNameInput + "</td><td>" + appointment.phoneInput + "</td><td>" + appointment.emailInput + "</td><td>" + appointment.serviceInput + "</td><td>" + appointment.dateInput + "</td><td>" + appointment.timeInput + "</td></tr>";
    }
    table += "</table>";
    const appointmentTable = document.createElement("div");
    appointmentTable.innerHTML = table;
    document.body.appendChild(appointmentTable);
  })
}

