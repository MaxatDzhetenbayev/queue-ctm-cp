import { Statuses } from "@/features";

export interface IReception {
  id: number;
  date: string;
  time: string;
  rating: number | null;
  status: Statuses;
  user: {
    id: number;
    authType: string;
    profile: {
      iin: string;
      fullName: string;
      phone: string;
    };
  };
  service: {
    name: {
      [key: string]: string;
    };
  };
}

export interface IReceptionFormated {
  user: {
    id: number;
  };
  profile: {
    fullName: string;
    phone: string;
  };
  id: number;
  date: string;
  time: string;
  status: Statuses;
  rating: number | null;
}
