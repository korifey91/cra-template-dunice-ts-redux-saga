import { takeLatest, call, put, select } from 'redux-saga/effects';
import qs from 'qs';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import axios, { CustomAxiosInstance } from '../axiosConfig';
import { fetchFlights, fetchFlightsError, fetchFlightsSuccess } from '../reducers/flights';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../index';
import { GetFlightsResponse } from './flights.interface';

function* getFlights(action: PayloadAction<number>) {
  try {
    const { payload: page } = action;
    const filters = yield select((state: RootState) => state.flights.filters);
    const query = qs.stringify({
      ...filters,
      page,
    });
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/getflights?${query}`,
    };
    const flights: AxiosResponse<GetFlightsResponse> = yield call(axios as CustomAxiosInstance, config);
    if (flights.data) {
      yield put(
        fetchFlightsSuccess({
          data: flights.data.legs,
          meta: {
            totalFlights: flights.data.totalFlights,
            totalPages: flights.data.totalPages,
            page,
          },
        })
      );
    } else throw new Error();
  } catch (e) {
    yield put(fetchFlightsError('Cannot fetch flights with such filters'));
  }
}

function* flightsSaga() {
  yield takeLatest(fetchFlights.toString(), getFlights);
}

export default flightsSaga;
