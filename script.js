// Cargar fechas no disponibles del LocalStorage, si existen
const unavailableDates = JSON.parse(localStorage.getItem('unavailableDates')) || {};

// Cargar reservas del LocalStorage, si existen
const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

// Función para calcular el precio según la fecha y la franja horaria
function calculatePrice(selectedDate, timeSlot) {
    const date = new Date(selectedDate);
    const day = date.getDay();
    
    let price;
    if (day >= 1 && day <= 4) { // Lunes a jueves
        price = timeSlot === 'todo' ? 140 : 80;
    } else if (day === 5) { // Viernes
        price = timeSlot === 'todo' ? 140 : 90;
    } else if (day === 0 || day === 6) { // Sábados y domingos
        price = timeSlot === 'todo' ? 180 : 110;
    }

    return price;
}

// Función para actualizar las franjas horarias disponibles
function updateTimeSlots() {
    const selectedDate = document.getElementById('date').value;
    const timeSlotsContainer = document.getElementById('timeSlotsContainer');

    if (!selectedDate) {
        timeSlotsContainer.innerHTML = ''; // Limpiar el contenedor si no hay fecha seleccionada
        document.getElementById('price').value = ''; // Limpiar el precio
        return;
    }

    const timeSlots = ['mañana', 'tarde', 'todo'];
    let html = '<label>Selecciona la franja horaria:</label>';

    timeSlots.forEach(slot => {
        const isUnavailable = unavailableDates[selectedDate] && unavailableDates[selectedDate].includes(slot);
        html += `
            <div class="form-check">
                <input class="form-check-input ${isUnavailable ? 'disabled' : ''}" type="radio" name="timeSlot" id="${slot}" value="${slot}" ${isUnavailable ? 'disabled' : ''}>
                <label class="form-check-label ${isUnavailable ? 'disabled' : ''}" for="${slot}">
                    ${slot.charAt(0).toUpperCase() + slot.slice(1)}
                </label>
            </div>
        `;
    });

    timeSlotsContainer.innerHTML = html;
}

// Función para manejar el cambio de fecha
function onDateChange() {
    const selectedDate = document.getElementById('date').value;
    const timeSlot = document.querySelector('input[name="timeSlot"]:checked')?.value;

    updateTimeSlots(); // Actualiza las franjas horarias disponibles

    if (selectedDate && timeSlot) {
        // Verificar si la franja horaria está disponible para la fecha seleccionada
        if (unavailableDates[selectedDate] && unavailableDates[selectedDate].includes(timeSlot)) {
            alert("La franja horaria seleccionada no está disponible.");
            document.getElementById('price').value = "";
            return;
        }

        const price = calculatePrice(selectedDate, timeSlot);
        document.getElementById('price').value = price ? `${price} euros` : "";
    }
}

// Actualiza el contenedor de franjas horarias cuando cambia la fecha
document.getElementById('date').addEventListener('change', function() {
    updateTimeSlots();
    onDateChange();
});

// Actualiza el precio cuando cambia la franja horaria
document.getElementById('timeSlotsContainer').addEventListener('change', function() {
    onDateChange();
});

// Inicializar EmailJS con el ID del usuario
emailjs.init('YbHlCwf9oibKf6KTF'); // Reemplaza con tu public key

// Manejo del envío del formulario
document.getElementById('rentalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const selectedDate = document.getElementById('date').value;
    const timeSlot = document.querySelector('input[name="timeSlot"]:checked')?.value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const price = document.getElementById('price').value;

    if (!selectedDate || !timeSlot) {
        alert('Por favor, selecciona una fecha y una franja horaria.');
        return;
    }

    // Verifica si la franja horaria está ya reservada para la fecha seleccionada
    if (unavailableDates[selectedDate] && unavailableDates[selectedDate].includes(timeSlot)) {
        alert('La franja horaria seleccionada ya está reservada.');
        return;
    }

    // Añadir la franja horaria a las fechas no disponibles
    if (!unavailableDates[selectedDate]) {
        unavailableDates[selectedDate] = [];
    }
    if (!unavailableDates[selectedDate].includes(timeSlot)) {
        unavailableDates[selectedDate].push(timeSlot);
    }
    localStorage.setItem('unavailableDates', JSON.stringify(unavailableDates));

    // Guardar la reserva en LocalStorage
    const reservation = {
        date: selectedDate,
        timeSlot: timeSlot,
        email: email,
        phone: phone,
        price: price ? `${price} euros` : "No disponible",
    };
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Enviar correo electrónico con EmailJS
    emailjs.send('service_lqiluoz', 'template_v0l0n99', {
        date: selectedDate,
        timeSlot: timeSlot,
        email: email,
        phone: phone,
        price: price ? `${price} euros` : "No disponible",
    })
    .then(function(response) {
        console.log('Éxito:', response);
        alert('Reserva confirmada. Se ha enviado un correo electrónico de confirmación.');
    }, function(error) {
        console.error('Error:', error); // Imprime el error en la consola para detalles más específicos
        alert('Error al enviar el correo electrónico. Inténtalo de nuevo.');
    });

    // Imprimir los datos en la consola
    console.log({
        date: selectedDate,
        timeSlot: timeSlot,
        email: email,
        phone: phone,
        price: price
    });
});
