# Estrutura de API

Organização por endpoint, baseada no front-portal-operacoes.

## Estrutura

```
src/api/
├── adapters/
│   ├── Auth.adapter.ts
│   ├── Countries.adapter.ts
│   ├── Institutions.adapter.ts
│   └── index.ts
├── hooks/
│   ├── mutations/
│   │   ├── useAuthMutations.ts
│   │   ├── useInstitutionsMutations.ts
│   │   └── index.ts
│   ├── queries/
│   │   ├── useCountriesQueries.ts
│   │   └── index.ts
│   └── index.ts
├── types/
│   ├── Auth.types.ts
│   ├── Institutions.types.ts
│   └── index.ts
├── ESTRUTURA.md
└── index.ts
```

## Mapeamento de Endpoints

### Auth.adapter.ts
**API**: `api` (services)
- `POST /auth/login` → `login()`
- `POST /auth/register` → `register()`

### Countries.adapter.ts
**API**: `apiCountries` (services/countries)
- `GET /countries` → `allCountries()`
- `GET /countries/:country/states` → `statesByCountry()`
- `GET /countries/:country/states/:state/cities` → `citiesByState()`

### Institutions.adapter.ts
**API**: `api` (services)
- `POST /institutions` → `register()`

## Uso

### Importar da API

```ts
import {
  authAdapter,
  countriesAdapter,
  institutionsAdapter,
  useCountries,
  useStatesByCountry,
  useCitiesByState,
  useLogin,
  useRegister,
  useRegisterInstitution,
} from '@/api';
```

### Hooks

- **useCountries** – lista de países
- **useStatesByCountry(countryCode)** – estados por país
- **useCitiesByState(countryCode, stateCode)** – cidades por estado
- **useLogin** – login (mutation)
- **useRegister** – cadastro (mutation)
- **useRegisterInstitution** – cadastro de instituição (mutation)

### Adapters (uso direto)

```ts
const countries = await countriesAdapter.allCountries();
const states = await countriesAdapter.statesByCountry('BR');
const cities = await countriesAdapter.citiesByState('BR', 'SP');
```
