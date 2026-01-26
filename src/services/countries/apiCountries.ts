import axios from 'axios';

export const apiCountries = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1',
});
