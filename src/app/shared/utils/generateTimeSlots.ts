export const generateTimeSlots = () => {
  const startTime = 8;
  const endTime = 18;
  const interval = 60;

  const timeSlots = [];
  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const isAM = hour < 12;
      const displayHour = hour > 12 ? hour - 12 : hour;
      const formattedHour = displayHour < 10 ? `0${displayHour}` : displayHour;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
      const amPm = isAM ? 'AM' : 'PM';

      const name = `${formattedHour}:${formattedMinute} ${amPm}`;

      timeSlots.push({ name, key: name });
    }
  }

  return timeSlots;
};
