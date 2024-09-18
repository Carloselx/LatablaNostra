// Array con fechas no disponibles (en formato YYYY-MM-DD)
const unavailableDates = [
    '2024-09-20', // Ejemplo de fecha no disponible
    '2024-10-15', // Otra fecha no disponible
    // Añadir más fechas según sea necesario
];

// Script para actualizar el precio automáticamente según la fecha seleccionada
document.getElementById('date').addEventListener('change', function() {
    const selectedDate = this.value;
    const date = new Date(selectedDate);
    const day = date.getDay();
    const isHoliday = unavailableDates.includes(selectedDate);
    let price;

    if (isHoliday) {
        alert("La fecha seleccionada no está disponible.");
        document.getElementById('price').value = "";
        return;
    }

    if (day >= 1 && day <= 4) { // Lunes a jueves
        price = document.getElementById('timeSlot').value === 'todo' ? 140 : 80;
    } else if (day === 5) { // Viernes
        price = document.getElementById('timeSlot').value === 'todo' ? 140 : 90;
    } else if (day === 0 || day === 6) { // Sábados y domingos
        price = document.getElementById('timeSlot').value === 'todo' ? 180 : 110;
    }

    document.getElementById('price').value = price ? `${price} euros` : "";
});

// Validación básica del formulario
document.getElementById('rentalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("¡Gracias por tu reserva! Nos pondremos en contacto contigo para confirmar todo");
});

// Actualiza el precio cuando cambia la franja horaria
document.getElementById('timeSlot').addEventListener('change', function() {
    document.getElementById('date').dispatchEvent(new Event('change'));
});
