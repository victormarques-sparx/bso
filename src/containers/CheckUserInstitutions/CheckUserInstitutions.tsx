'use client';

import {
  useCitiesByState,
  useCountries,
  useRegisterInstitution,
  useStatesByCountry,
  usersAdapter,
} from '@/api';
import { Button, Modal, Select, TextField } from '@/components';
import { institutionsConstant } from '@/constants';
import { getTokenCookie, getUserCookie, isTokenExpired } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, type JSX } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  CheckUserInstitutionsSchema,
  type CheckUserInstitutionsFormDataTypes,
} from './CheckUserInstitutions.types';

export const CheckUserInstitutions = (): JSX.Element => {
  const [token, setToken] = useState<string | undefined>(getTokenCookie());
  const [user, setUser] = useState(getUserCookie());
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckUserInstitutionsFormDataTypes>({
    defaultValues: {
      institutionType: '',
      country: '',
      state: '',
      city: '',
    },
    resolver: zodResolver(CheckUserInstitutionsSchema),
    mode: 'onSubmit',
  });

  const selectedCountry = useWatch({
    control,
    name: 'country',
    defaultValue: '',
  });
  const selectedState = useWatch({ control, name: 'state', defaultValue: '' });

  const { data: countries = [], isLoading: isLoadingCountries } = useCountries({
    enabled: isOpen,
  });
  const { data: states = [], isLoading: isLoadingStates } = useStatesByCountry(
    selectedCountry,
    { enabled: isOpen }
  );
  const { data: cities = [], isLoading: isLoadingCities } = useCitiesByState(
    selectedCountry,
    selectedState,
    { enabled: isOpen }
  );

  const registerInstitution = useRegisterInstitution();

  // Só renderiza se o usuário estiver logado (token existe e está válido)
  const isAuthenticated = token && !isTokenExpired(token) && user;

  // Monitora mudanças nos cookies (ex: após login)
  useEffect(() => {
    const checkAuth = (): void => {
      const currentToken = getTokenCookie();
      const currentUser = getUserCookie();
      setToken(currentToken);
      setUser(currentUser);
    };

    // Verifica imediatamente
    checkAuth();

    // Escuta evento customizado disparado após login/logout/atualização de usuário
    window.addEventListener('auth:login', checkAuth);
    window.addEventListener('auth:logout', checkAuth);
    window.addEventListener('user:updated', checkAuth);

    return () => {
      window.removeEventListener('auth:login', checkAuth);
      window.removeEventListener('auth:logout', checkAuth);
      window.removeEventListener('user:updated', checkAuth);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.institutions?.length === 0) {
      setTimeout(() => {
        setIsOpen(true);
      }, 10);
    }
    // Se o usuário tem instituições, o modal não será aberto (condição acima será falsa)
    // e será fechado explicitamente no onSubmit após o cadastro bem-sucedido
  }, [user, isAuthenticated]);

  const onSubmit = async (
    data: CheckUserInstitutionsFormDataTypes
  ): Promise<void> => {
    try {
      await registerInstitution.mutateAsync(data);
      toast.success('Institution registered successfully');

      // my-profile só é chamado após sucesso do formulário
      const updatedUser = await usersAdapter.myProfile();

      if (updatedUser?.institutions && updatedUser.institutions.length > 0) {
        setIsOpen(false);
      }
    } catch {
      toast.error('Failed to register institution. Please try again.');
    }
  };

  // Só renderiza se o usuário estiver logado e o modal estiver aberto
  if (!isAuthenticated || !isOpen) return <></>;

  return (
    <Modal
      isOpen={isOpen}
      title="Register your first institution"
      className="max-w-6xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 grid grid-cols-6 gap-4">
          {/* =============================== */}
          {/* Legal Name                      */}
          {/* =============================== */}
          <div className="col-span-full grid xl:col-span-3">
            <TextField
              {...register('legalName')}
              label="Legal Name"
              name="legalName"
              placeholder="Ex: Company Name"
              error={errors.legalName?.message}
            />
          </div>

          {/* =============================== */}
          {/* Doing Business As               */}
          {/* =============================== */}
          <div className="col-span-full grid xl:col-span-3">
            <TextField
              {...register('dbaName')}
              label="Doing Business As"
              name="dbaName"
              placeholder="Ex: Doing Business As Name"
              error={errors.dbaName?.message}
            />
          </div>

          {/* =============================== */}
          {/* Phone                           */}
          {/* =============================== */}
          <div className="col-span-full grid xl:col-span-2">
            <TextField
              {...register('phone')}
              label="Phone"
              name="phone"
              placeholder="Ex: +1234567890"
              error={errors.phone?.message}
            />
          </div>

          {/* =============================== */}
          {/* Tax ID                          */}
          {/* =============================== */}
          <div className="col-span-full grid xl:col-span-2">
            <TextField
              {...register('taxId')}
              label="Tax ID"
              name="taxId"
              placeholder="Ex: 1234567890"
              error={errors.taxId?.message}
            />
          </div>

          {/* =============================== */}
          {/* Institution Type                */}
          {/* =============================== */}
          <div className="col-span-full grid xl:col-span-2">
            <Select
              {...register('institutionType')}
              label="Institution Type"
              name="institutionType"
              placeholder="Select an institution type"
              options={institutionsConstant}
              error={errors.institutionType?.message}
            />
          </div>

          {/* =============================== */}
          {/* Country                         */}
          {/* =============================== */}
          <div className="col-span-full grid xl:col-span-2">
            <Select
              {...register('country')}
              label="Country"
              name="country"
              placeholder={
                isLoadingCountries ? 'Loading countries...' : 'Select a country'
              }
              options={countries.map(country => ({
                label: `${country.emoji} ${country.name}`,
                value: country.iso2,
              }))}
              disabled={isLoadingCountries}
              error={errors.country?.message}
            />
          </div>

          {/* =============================== */}
          {/* State                           */}
          {/* =============================== */}
          <div className="col-span-full grid xl:col-span-2">
            <Select
              {...register('state')}
              label="State"
              name="state"
              placeholder={
                isLoadingStates ? 'Loading states...' : 'Select a state'
              }
              options={states.map(state => ({
                label: state.name,
                value: state.iso2,
              }))}
              disabled={isLoadingStates || !selectedCountry}
              error={errors.state?.message}
            />
          </div>

          {/* =============================== */}
          {/* City                            */}
          {/* =============================== */}
          <div className="col-span-full grid xl:col-span-2">
            <Select
              {...register('city')}
              label="City"
              name="city"
              placeholder={
                isLoadingCities ? 'Loading cities...' : 'Select a city'
              }
              options={cities.map(city => ({
                label: city.name,
                value: city.name,
              }))}
              disabled={isLoadingCities || !selectedState}
              error={errors.city?.message}
            />
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting || registerInstitution.isPending}
          loadingText="Registering..."
          fullWidth
          variant="secondary"
        >
          Register
        </Button>
      </form>
    </Modal>
  );
};
