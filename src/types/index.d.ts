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
