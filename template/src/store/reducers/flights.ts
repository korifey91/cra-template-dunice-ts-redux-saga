import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Flight {
  from: string;
  to: string;
  date: Date;
}

interface FlightMeta {
  totalFlights: number;
  totalPages: number;
  page: number;
}

interface FlightsFilters {
  origin: string;
  destination: string;
  leaveDate: string;
  returnDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  sortBy: string;
}

interface FlightsStore {
  data: Flight[];
  isLoading: boolean;
  error: string | null;
  chosenTrip: Flight | null;
  meta: FlightMeta;
  filters: FlightsFilters;
}

const initialState: FlightsStore = {
  data: [],
  isLoading: false,
  error: null,
  chosenTrip: null,
  meta: {
    totalFlights: 0,
    totalPages: 0,
    page: 0,
  },
  filters: {
    origin: 'PIT',
    destination: 'EWR',
    leaveDate: '2020-12-12',
    returnDate: '2020-12-14',
    numberOfAdults: 1,
    numberOfChildren: 0,
    sortBy: 'price',
  },
};

const flights = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    fetchFlights(state) {
      return {
        ...state,
        data: [],
        isLoading: true,
        error: null,
      };
    },
    fetchFlightsSuccess(state, action: PayloadAction<{ data: Flight[]; meta: FlightMeta }>) {
      const { data, meta } = action.payload;
      return {
        ...state,
        data,
        meta,
        isLoading: false,
        error: null,
      };
    },
    fetchFlightsError(state, action: PayloadAction<string>) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    goToTrip(state, action: PayloadAction<Flight>) {
      return {
        ...state,
        chosenTrip: action.payload,
      };
    },
    setFilter(state, action: PayloadAction<{ name: keyof FlightsFilters; value: unknown }>) {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    },
  },
});

export const { actions, reducer } = flights;
export const { fetchFlights, fetchFlightsSuccess, fetchFlightsError, goToTrip, setFilter } = actions;
