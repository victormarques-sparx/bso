'use client';

import {
  useCitiesByState,
  useCountries,
  useRegisterInstitution,
  useStatesByCountry,
} from '@/api';
import { Button, Modal, Select, TextField } from '@/components';
import { institutionsConstant } from '@/constants';
import { getUserCookie } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, type JSX } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  CheckUserInstitutionsSchema,
  type CheckUserInstitutionsFormDataTypes,
} from './CheckUserInstitutions.types';

export const CheckUserInstitutions = (): JSX.Element => {
  const user = getUserCookie();
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

  const { data: countries = [], isLoading: isLoadingCountries } =
    useCountries();
  const { data: states = [], isLoading: isLoadingStates } =
    useStatesByCountry(selectedCountry);
  const { data: cities = [], isLoading: isLoadingCities } = useCitiesByState(
    selectedCountry,
    selectedState
  );

  const registerInstitution = useRegisterInstitution();

  useEffect(() => {
    if (user?.institutions?.length === 0) {
      setTimeout(() => {
        setIsOpen(true);
      }, 10);
    }
  }, [user]);

  const onSubmit = async (
    data: CheckUserInstitutionsFormDataTypes
  ): Promise<void> => {
    try {
      await registerInstitution.mutateAsync(data);
      toast.success('Institution registered successfully');
      // TODO: invalidar user, fechar modal, etc.
    } catch {
      toast.error('Failed to register institution. Please try again.');
    }
  };

  if (!isOpen) return <></>;

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
          <div className="col-span-3 grid">
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
          <div className="col-span-3 grid">
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
          <div className="col-span-2 grid">
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
          <div className="col-span-2 grid">
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
          <div className="col-span-2 grid">
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
          <div className="col-span-2 grid">
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
          <div className="col-span-2 grid">
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
          <div className="col-span-2 grid">
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
