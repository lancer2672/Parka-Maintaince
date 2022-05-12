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
};

type Company = {
  idCompany: string;
  companyName: string;
  phoneNumber: string;
  email: string;
};

export type { ParkingLot, Block, Company };
