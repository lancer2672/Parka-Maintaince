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
};

type Vehicle = {
  idVehicle: string;
  idUser: string;
  name: string;
  number: string;
  type: string;
};

type ParkingSlot = {
  idParkingSlot: string;
  idBlock: string;
  slotNumber: number;
};

type Block = {
  idBlock: string;
  idParkingLot: string;
  blockCode: string;
  description: string;
  isFull: boolean;
  numOfSlot: number;
};

type TimeFrame = {
  idTimeFrame: string;
  idParkingLot: string;
  duration: number;
  cost: number;
};

type Booking = {
  idParkingReservation: string;
  parkingLot: ParkingLot;
  vehicle: Vehicle;
  blockCode: string;
  parkingSlot: ParkingSlot;
  timeFrame: TimeFrame;
  startTime: Date;
  endTime: Date;
  bookingDate: Date;
};

type Reservation = {
  idParkingReservation: string;
  idVehicle: string;
  idUser: string;
  idParkingSlot: string;
  idTimeFrame: string;
  startTime: string;
  endTime: string;
  bookingDate: string;
  total: string;
  status: string;
};

type Favorite = {
  idFavorite: string;
  idUser: string;
  idParkingLot: string;
};
