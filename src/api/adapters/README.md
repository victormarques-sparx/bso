# Adapters

Camada de adaptação entre a API (HTTP) e o domínio. Cada adapter encapsula chamadas a um ou mais endpoints.

## Convenções

- Um adapter por recurso/endpoint principal.
- Métodos assíncronos que retornam dados tipados.
- Utilizar clientes HTTP de `@/services` (api, apiCountries).
- Tipos em `../types`.

## Exemplos

```ts
import { countriesAdapter, authAdapter } from '@/api';

const countries = await countriesAdapter.allCountries();
await authAdapter.login({ username, password });
```
