export interface IReception {
  id: number;
  date: string;
  time: string;
  rating: number | null;
  status: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    profile: {
      full_name: string;
      phone: string;
    };
  };
}

export interface IReceptionFormated {
  user: {
    id: number;
  };
  profile: {
    full_name: string;
    phone: string;
  };
  id: number;
  date: string;
  time: string;
  status: { name: string; id: number };
  rating: number | null;
}
