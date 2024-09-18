// Array con fechas no disponibles (en formato YYYY-MM-DD)
const unavailableDates = [
    '2024-09-20', // Ejemplo de fecha no disponible
    '2024-10-15', // Otra fecha no disponible
    // Añadir más fechas según sea necesario
];

// Script para actualizar el precio automáticamente según la fecha seleccionada
document.getElementById('date').addEventListener('change', function() {
    const date = new Date(this.value);
    const day = date.getDay();
    const isHoliday = false; // Puedes agregar una lógica para días festivos si es necesario.
    let price;

    if (day >= 1 && day <= 4) {
        price = 80; // Lunes a jueves
    } else if (day === 5) {
        price = 90; // Viernes
    } else if (day === 0 || day === 6 || isHoliday) {
        price = 110; // Sábados, domingos y festivos
    }

    document.getElementById('price').value = price + " euros";
});

// Validación básica del formulario
document.getElementById('rentalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("¡Tu reserva ha sido enviada!");
});
