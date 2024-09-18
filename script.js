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
