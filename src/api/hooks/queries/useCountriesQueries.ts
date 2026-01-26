import type { CityProps, CountryProps, StateProps } from '@/types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { countriesAdapter } from '../../adapters';

export const useCountries = (): UseQueryResult<CountryProps[], Error> => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: () => countriesAdapter.allCountries(),
    staleTime: 1000 * 60 * 60,
  });
};

export const useStatesByCountry = (
  countryCode: string
): UseQueryResult<StateProps[], Error> => {
  return useQuery({
    queryKey: ['states', countryCode],
    queryFn: () => countriesAdapter.statesByCountry(countryCode),
    staleTime: 1000 * 60 * 60,
    enabled: !!countryCode,
  });
};

export const useCitiesByState = (
  countryCode: string,
  stateCode: string
): UseQueryResult<CityProps[], Error> => {
  return useQuery({
    queryKey: ['cities', countryCode, stateCode],
    queryFn: () =>
      countriesAdapter.citiesByState(countryCode, stateCode),
    staleTime: 1000 * 60 * 60,
    enabled: !!countryCode && !!stateCode,
  });
};
