import { apiCountries } from '@/services';
import type { CityProps, CountryProps, StateProps } from '@/types';

const apiKey =
  process.env.NEXT_PUBLIC_COUNTRY_API_KEY ||
  'a842106e22185c57b9e6034c19c020d4a8df6845a9d2b8ea68b9e3e88e5a12eb';

class CountriesAdapterClass {
  async allCountries(): Promise<CountryProps[]> {
    try {
      const response = await apiCountries.get<CountryProps[]>('/countries', {
        headers: { 'X-CSCAPI-KEY': apiKey },
      });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }

  async statesByCountry(country: string): Promise<StateProps[]> {
    try {
      const response = await apiCountries.get<StateProps[]>(
        `/countries/${country}/states`,
        { headers: { 'X-CSCAPI-KEY': apiKey } }
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching states:', error);
      return [];
    }
  }

  async citiesByState(
    countryCode: string,
    stateCode: string
  ): Promise<CityProps[]> {
    try {
      const response = await apiCountries.get<CityProps[]>(
        `/countries/${countryCode}/states/${stateCode}/cities`,
        { headers: { 'X-CSCAPI-KEY': apiKey } }
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  }
}

export const countriesAdapter = new CountriesAdapterClass();
