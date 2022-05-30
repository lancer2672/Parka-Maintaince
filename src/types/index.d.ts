type User = {
  idUser: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  idSocial?: string;
  imageUrl: string;
};

type Vehicle = {
  idVehicle: string;
  idUser: string;
  name: string;
  number: string;
  type: string;
};
