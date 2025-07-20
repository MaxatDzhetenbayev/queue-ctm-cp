export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  username: string;
  address?: UserAddress;
  company?: UserCompany;
}
