type ParkingLot = {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: string;
  long: string;
  idCompany: string;
  isDeleted: boolean;
};

type Block = {
  id: string;
  code: string;
  description: string;
  idParkingLot: string;
  isFull: boolean;
  slot: number;
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
  id: string;
  parkingLotId: string;
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
  id: string;
  idVehicle: string;
  idUser: string;
  idParkingSlot: string;
  idTimeFrame: string;
  startTime: string;
  endTime: string;
  bookingDate: string;
  total: string;
  state: string;
  parkingSlot: Slot;
  Vehicle: Vehicle;
  TimeFrame: TimeFrame;
  parkingLot: ParkingLot;
};

type Slot = {
  idParkingSlot: string;
  name: string;
  idBlock: string;
  block: Block;
};
