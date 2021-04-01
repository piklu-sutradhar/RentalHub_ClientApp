export interface Property {

  title: string;
  id: string;
  propertyType: PropertyType;
  bedRooms: number;
  baths: number;
  available: boolean;
  address: Address;
}

export interface Address {
  id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}

export enum PropertyType {
  Apertment = 'Apertment',
  Condo = 'Condo',
  Townhouse = 'Townhouse',
  House = 'House'
}
