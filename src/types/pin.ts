import { type LatLng } from 'react-native-maps';

export type Pin = {
  id: string;
  image: string;
  name: string;
  coord: LatLng;
  activate: boolean;
  location: string;
  purpose: string;
  note: string;
  start: string;
  end: string;
  transportation: string;
  accommodation: string;
  budget: string;
  actualCost: string;
  attendees: string;
  status: string;
};
