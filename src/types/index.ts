export type Car = {
  consumption: number;
  id: string;
  name: string;
  specs: string;
  price: number;
  isEv: boolean;
};

export type Usage = {
  gasPrice: number;
  kwhPrice: number;
  distance: number;
  ownership: number;
};

export type Contact = {
  name: string;
  linkedIn: string;
  email: string;
};

export type Link = {
  title: string;
  url: string;
};
