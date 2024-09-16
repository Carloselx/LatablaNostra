document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var selectedDateInput = document.getElementById('selected-date');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        dateClick: function(info) {
            selectedDateInput.value = info.dateStr;
            alert('Fecha seleccionada: ' + info.dateStr);
        },
        events: [
            {
                title: 'Reservado',
                start: '2024-09-17'
            },
            {
                title: 'Reservado',
                start: '2024-09-21'
            }
        ]
    });

    calendar.render();
});
