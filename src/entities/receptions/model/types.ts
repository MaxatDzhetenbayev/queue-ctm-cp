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
      iin: string;
      full_name: string;
      phone: string;
    };
    visitor_type: {
      name: string
    }
  };
  service: {
    name: {
      [key: string]: string
    }
  }
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
