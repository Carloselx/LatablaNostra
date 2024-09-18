document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var selectedDateInput = document.getElementById('selected-date');

    // Obtiene la fecha actual y define el rango de los próximos 3 meses
    var today = new Date();
    var threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(today.getMonth() + 3);

    // Inicializa el calendario de FullCalendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: today, // Establece la fecha inicial como hoy
        validRange: {
            start: today,
            end: threeMonthsLater // Muestra solo los próximos 3 meses
        },
        selectable: true,
        dateClick: function(info) {
            // Rellena el input con la fecha seleccionada y alerta al usuario
            selectedDateInput.value = info.dateStr;
            alert('Fecha seleccionada: ' + info.dateStr);
        },
        events: [
            // Fechas que ya están ocupadas
            {
                title: 'Reservado',
                start: '2024-09-17',
                allDay: true
            },
            {
                title: 'Reservado',
                start: '2024-09-21',
                allDay: true
            },
            {
                title: 'Reservado',
                start: '2024-10-01',
                allDay: true
            }
        ],
        eventColor: '#ff0000', // Cambia el color de las fechas reservadas
        eventTextColor: '#ffffff' // Cambia el color del texto de las fechas reservadas
    });

    calendar.render();
});
