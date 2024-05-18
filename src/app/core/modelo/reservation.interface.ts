export interface Reservation {
  id: string;
  reservation: ReservationElement[];
}

export interface ReservationElement {
  numberGuests: number;
  date: string;
  time: string;
  observations: string;
  id: string;
  total: number;
  name: string;
}
