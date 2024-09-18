// Cargar fechas no disponibles del LocalStorage, si existen
const unavailableDates = JSON.parse(localStorage.getItem('unavailableDates')) || [
    '2024-09-20', // Ejemplo de fecha no disponible
    '2024-10-15', // Otra fecha no disponible
    // Añadir más fechas según sea necesario
];

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

// Función para manejar el cambio de fecha
function onDateChange() {
    const selectedDate = document.getElementById('date').value;
    const isHoliday = unavailableDates.includes(selectedDate);
    
    if (isHoliday) {
        alert("La fecha seleccionada no está disponible.");
        document.getElementById('price').value = "";
        return;
    }

    const timeSlot = document.getElementById('timeSlot').value;
    const price = calculatePrice(selectedDate, timeSlot);
    
    document.getElementById('price').value = price ? `${price} euros` : "";
}

// Script para actualizar el precio automáticamente según la fecha seleccionada
document.getElementById('date').addEventListener('change', onDateChange);

// Actualiza el precio cuando cambia la franja horaria
document.getElementById('timeSlot').addEventListener('change', function() {
    onDateChange();
});

// Inicializar EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init('Vp7Hhd_pe5hVeiTszlKxO');  // Asegúrate de que el ID del usuario es correcto
} else {
    alert('Error: No se pudo inicializar el servicio de EmailJS.');
}

// Validación básica del formulario y envío de datos
document.getElementById('rentalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario para demostración

    const selectedDate = document.getElementById('date').value;
    const timeSlot = document.getElementById('timeSlot').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const price = document.getElementById('price').value;

    // Verificar si la fecha es no disponible
    const isHoliday = unavailableDates.includes(selectedDate);
    if (isHoliday) {
        alert('La fecha seleccionada ya está marcada como no disponible.');
        return;
    }

    // Añadir la fecha a las fechas no disponibles y guardarla en LocalStorage
    unavailableDates.push(selectedDate);
    localStorage.setItem('unavailableDates', JSON.stringify(unavailableDates));

    // Imprimir los datos en la consola
    console.log({
        date: selectedDate,
        timeSlot: timeSlot,
        email: email,
        phone: phone,
        price: price
    });

    // Enviar correo electrónico a ti mismo con EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.send('service_lqiluoz', 'template_v0l0n99', {
            date: selectedDate,
            timeSlot: timeSlot,
            email: email,
            phone: phone,
            price: price ? `${price} euros` : "No disponible",
        })
        .then(function(response) {
            alert('Reserva confirmada. Se ha enviado un correo electrónico de confirmación.');
        }, function(error) {
            console.error('Error:', error);  // Imprime el error en la consola para detalles más específicos
            alert('Error al enviar el correo electrónico. Inténtalo de nuevo.');
        });
    } else {
        alert('Error: No se pudo enviar el correo. Verifica la configuración de EmailJS.');
    }
});

