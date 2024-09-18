// Cargar reservas del LocalStorage, si existen
const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

// Cargar el listado de reservas en la tabla
function loadReservations() {
    const reservationsTable = document.getElementById('reservationsTable');
    reservationsTable.innerHTML = ''; // Limpiar la tabla existente

    reservations.forEach((reservation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.date}</td>
            <td>${reservation.timeSlot}</td>
            <td>${reservation.email}</td>
            <td>${reservation.phone}</td>
            <td>${reservation.price}</td>
            <td><button class="btn btn-danger" onclick="deleteReservation(${index})">Eliminar</button></td>
        `;
        reservationsTable.appendChild(row);
    });
}

// Función para eliminar una reserva
function deleteReservation(index) {
    // Eliminar la reserva del array
    reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    // También eliminar la franja horaria de las fechas no disponibles
    const reservation = reservations[index];
    if (unavailableDates[reservation.date]) {
        const slotIndex = unavailableDates[reservation.date].indexOf(reservation.timeSlot);
        if (slotIndex > -1) {
            unavailableDates[reservation.date].splice(slotIndex, 1);
            if (unavailableDates[reservation.date].length === 0) {
                delete unavailableDates[reservation.date];
            }
            localStorage.setItem('unavailableDates', JSON.stringify(unavailableDates));
        }
    }
    
    // Volver a guardar las reservas actualizadas
    local
