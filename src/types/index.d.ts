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

type Block = {
  idBlock: string;
  blockCode: string;
  description: string;
  idParkingLot: string;
  isFull: boolean;
  numOfSlot: number;
  ParkingSlots: Array<ParkingSlot>;
  ParkingLot?: ParkingLot;
};
type ParkingSlot = {
  idParkingSlot: string;
  slotNumber: number;
  idBlock: string;
};
type Company = {
  idCompany: string;
  companyName: string;
  phoneNumber: string;
  email: string;
};

type TimeFrame = {
  idTimeFrame: string;
  idParkingLot: string;
  duration: number;
  cost: number;
};

type Vehicle = {
  idVehicle: string;
  idUser: string;
  name: string;
  number: string;
  type: string;
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
  ParkingSlot: Slot;
  Vehicle: Vehicle;
  TimeFrame: TimeFrame;
};

type Slot = {
  idParkingSlot: string;
  slotNumber: number;
  idBlock: string;
  Block: Block;
};
