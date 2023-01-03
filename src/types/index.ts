export interface IApartmentListResponse {
  apartments: IApartment[]
}

export type RentType = '1_room' | '2_rooms' | '3_rooms' | '4_rooms';

export interface IApartment {
  id: string;
  rent_type: RentType;
  location: {
    address: string;
  }
  photo: string;
  url: string;
}

export interface IParams {
  [index: string]: RentType | number | 'usd' | 'byn' | boolean | undefined;
  rentType?: RentType;
  min?: number;
  max?: number;
  currency?: 'usd' | 'byn';
  onlyOwner?: boolean;
}