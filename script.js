const appointmentForm = document.getElementById("appointmentForm");
const appointmentList = document.getElementById("appointmentList");
const APPOINTMENTS_KEY = "appointments";

appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    if (!title || !date || !startTime || !endTime) {
        alert("Please fill all fields.");
        return;
    }

    if (startTime >= endTime) {
        alert("Start time must be before end time.");
        return;
    }

    const appointment = {
        id: Date.now(),
        title,
        date,
        startTime,
        endTime,
        status: "confirmed",
    };

    saveAppointment(appointment);
    renderAppointments();
    appointmentForm.reset();
});

function saveAppointment(appointment) {
    const appointments = getAppointments();
    appointments.push(appointment);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

function getAppointments() {
    const storedData = localStorage.getItem(APPOINTMENTS_KEY);
    return storedData ? JSON.parse(storedData) : [];
}

function renderAppointments() {
    appointmentList.innerHTML = "";
    const appointments = getAppointments().filter(
        (appt) => new Date(appt.date) >= new Date()
    );

    appointments.forEach((appointment) => {
        const li = document.createElement("li");
        li.textContent = `${appointment.date} ${appointment.startTime} - ${appointment.endTime}: ${appointment.title}`;

        if (appointment.status === "cancelled") {
            li.classList.add("cancelled");
        }

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => cancelAppointment(appointment.id));

        li.appendChild(cancelButton);
        appointmentList.appendChild(li);
    });
}

function cancelAppointment(appointmentId) {
    const appointments = getAppointments();
    const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === appointmentId) {
            return { ...appointment, status: "cancelled" };
        }
        return appointment;
    });

    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updatedAppointments));
    renderAppointments();
}

renderAppointments();
