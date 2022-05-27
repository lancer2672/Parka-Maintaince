type User = {
  idUser: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  idSocial?: string;
}

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

export {User, ParkingLot};
