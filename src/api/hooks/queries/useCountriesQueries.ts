import type { CityProps, CountryProps, StateProps } from '@/types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { countriesAdapter } from '../../adapters';

type CountriesQueryOptionsProps = { enabled?: boolean };

export const useCountries = (
  options?: CountriesQueryOptionsProps
): UseQueryResult<CountryProps[], Error> => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: () => countriesAdapter.allCountries(),
    staleTime: 1000 * 60 * 60,
    enabled: options?.enabled !== false,
  });
};

export const useStatesByCountry = (
  countryCode: string,
  options?: CountriesQueryOptionsProps
): UseQueryResult<StateProps[], Error> => {
  return useQuery({
    queryKey: ['states', countryCode],
    queryFn: () => countriesAdapter.statesByCountry(countryCode),
    staleTime: 1000 * 60 * 60,
    enabled: options?.enabled !== false && !!countryCode,
  });
};

export const useCitiesByState = (
  countryCode: string,
  stateCode: string,
  options?: CountriesQueryOptionsProps
): UseQueryResult<CityProps[], Error> => {
  return useQuery({
    queryKey: ['cities', countryCode, stateCode],
    queryFn: () => countriesAdapter.citiesByState(countryCode, stateCode),
    staleTime: 1000 * 60 * 60,
    enabled: options?.enabled !== false && !!countryCode && !!stateCode,
  });
};
