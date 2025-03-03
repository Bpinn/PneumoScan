function selectDate(selectedSlot) {
    document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('active');
    });

    selectedSlot.classList.add('active');
}

function selectTime(selectedTimeSlot) {
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('active');
    });

    selectedTimeSlot.classList.add('active');
}

function bookAppointment() {
    let selectedDate = document.querySelector('.slot.active').innerText;
    let selectedTime = document.querySelector('.time-slot.active').innerText;
    
    alert(`Appointment booked for ${selectedDate} at ${selectedTime}`);
}