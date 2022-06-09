import { StringLocale } from "yup/lib/locale";

type User = {
  idUser: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  idSocial?: string;
  imageUrl: string;
};

type ParkingLot = {
  idParkingLot: string;
  name: string;
  description: string;
  address: string;
  lat: string;
  long: string;
  idCompany: string;
  isDeleted: boolean;
}

type Vehicle = {
  idVehicle: string;
  idUser: string;
  name: string;
  number: string;
  type: string;
};

type ParkingReservation = {
  idParkingReservation: string;
  idUser: string;
  idVehicle: string;
  idParkingSlot: string;
  idTimeFrame: string;
  startTime: string;
  endTime: string;
  bookingDate: string;
  total: number;
  status: "scheduled" | "ongoing" | "end";
}

type ParkingSlip = {
  idParkingSlip: string;
  ParkingReservation: ParkingReservation;
  idUser: string;
  entryTime: string;
  exitTime: string;
  cost: number;
  total: number;
  isPaid: boolean;
}