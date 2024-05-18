export const organizeReservations = (reservations) => {
  const result = {};

  // Iterar sobre cada objeto en el array
  reservations.forEach((reservationGroup) => {
    reservationGroup.reservation.forEach((reservation) => {
      const date = reservation.date; // Obtener la fecha de la reservación
      const time = reservation.time; // Obtener la hora de la reservación

      // Si la fecha ya está en el objeto resultado, añadir la hora al array
      if (result[date]) {
        result[date].push(time);
      } else {
        // Si la fecha no está en el objeto, crear un nuevo array con la hora
        result[date] = [time];
      }
    });
  });

  // Opcional: Eliminar duplicados en cada array de horarios
  for (const date in result) {
    result[date] = [...new Set(result[date])];
  }

  return result;
};
