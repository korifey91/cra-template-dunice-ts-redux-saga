import { Flight } from '../reducers/flights';

export interface GetFlightsResponse {
  legs: Flight[];
  totalFlights: number;
  totalPages: number;
}
