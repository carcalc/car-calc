import type { Car, Contact, Link, Usage } from '@/types';

export const defaultUsage: Usage = {
  gasPrice: 16.04,
  kwhPrice: 1.55,
  distance: 15000,
  ownership: 3,
};

export const defaultCars: Car[] = [
  {
    consumption: 18.1,
    id: 'generic-1',
    name: 'Bil 1',
    specs: 'Anpassa själv',
    price: 325000,
    isEv: true,
  },
  {
    consumption: 7.1,
    id: 'generic-2',
    name: 'Bil 2',
    specs: 'Anpassa själv',
    price: 245000,
    isEv: false,
  },
];

export const sourceLinks: Link[] = [
  {
    title: 'Bavaria',
    url: 'https://bavariabil.se/Bilguiden/Infor-bilkopet/bonus-malus/',
  },
  {
    title: 'Elbilsnytt',
    url: 'http://elbilsnytt.se/elbilar-mycket-billigare-att-serva/',
  },
  {
    title: 'Transportstyrelsen',
    url: 'https://www.transportstyrelsen.se/sv/vagtrafik/Fordon/bonus-malus/bonus/berakna-din-preliminara-bonus/',
  },
];

export const contacts: Contact[] = [
  {
    name: 'Andreas',
    linkedIn: 'http://www.linkedin.com/in/andreas-hansson-',
    email: 'andreas@carcalc.se',
  },
  {
    name: 'Gabriel',
    linkedIn: 'http://www.linkedin.com/in/gabriellundmark',
    email: 'gabriel@carcalc.se',
  },
];

export const email = 'hello@carcalc.se';
