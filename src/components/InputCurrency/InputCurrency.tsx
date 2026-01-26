'use client';

import { cn } from '@/utils';
import { useCallback, useMemo, useState, type JSX } from 'react';
import type { InputCurrencyProps } from './InputCurrency.types';

const formatCurrency = (value: number | string | undefined): string => {
  if (value === undefined || value === '' || value === null) return '';

  const numValue =
    typeof value === 'string'
      ? parseFloat(value.replace(/[^0-9.-]+/g, ''))
      : value;

  if (isNaN(numValue) || numValue === 0) return '';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue);
};

const parseCurrencyValue = (value: string): string => {
  const numericValue = value.replace(/[^0-9.-]+/g, '');
  return numericValue || '';
};

const formatNumberWithCommasAndCents = (value: string): string => {
  // Remove tudo exceto números e ponto decimal
  const numericValue = value.replace(/[^0-9.]/g, '');

  // Remove múltiplos pontos
  const parts = numericValue.split('.');
  const integerPart = parts[0] || '';
  let decimalPart =
    parts.length > 1 ? parts.slice(1).join('').substring(0, 2) : '';

  // Garante sempre 2 dígitos nos centavos se houver ponto decimal
  if (parts.length > 1) {
    decimalPart = decimalPart.padEnd(2, '0');
    return (
      integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + decimalPart
    );
  }

  // Adiciona vírgulas ao número inteiro
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedInteger;
};

export const InputCurrency = ({
  label,
  error,
  className,
  value,
  onChange,
  ...inputProps
}: InputCurrencyProps): JSX.Element => {
  // Estado local para controlar o valor durante a digitação
  const [displayValue, setDisplayValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Calcula o valor derivado baseado no value externo
  const derivedValue = useMemo(() => {
    if (value === undefined || value === null || value === '' || value === 0) {
      return '';
    }
    const numValue =
      typeof value === 'number' ? value : parseFloat(String(value));
    if (!isNaN(numValue) && numValue > 0) {
      return formatCurrency(numValue);
    }
    return '';
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Extrai apenas números e ponto decimal
      const numericValue = parseCurrencyValue(inputValue);

      // Formata com vírgulas e centavos durante a digitação
      const formattedValue = numericValue
        ? formatNumberWithCommasAndCents(numericValue)
        : '';

      // Atualiza o display com valor formatado
      setDisplayValue(formattedValue);

      // Cria um novo evento com o valor numérico limpo para o React Hook Form
      // Se não houver valor, envia string vazia. Se houver, envia o valor numérico como string
      const valueForForm = numericValue || '';

      // Cria um novo evento mantendo todas as propriedades do evento original
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: valueForForm,
          name: inputProps.name,
        },
        currentTarget: {
          ...e.currentTarget,
          value: valueForForm,
          name: inputProps.name,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      if (onChange) {
        onChange(syntheticEvent);
      }
    },
    [onChange, inputProps.name]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    // Sincroniza displayValue com o valor formatado derivado quando perde o foco
    // Isso garante que quando focado novamente, mostre o valor correto
    setDisplayValue(derivedValue);

    // Formata como moeda quando o campo perde o foco
    const numericValue = parseCurrencyValue(displayValue);
    if (numericValue) {
      const numValue = parseFloat(numericValue);
      if (!isNaN(numValue) && numValue > 0) {
        // Dispara onChange para garantir que o React Hook Form receba o valor formatado
        if (onChange) {
          const syntheticEvent = {
            target: {
              value: numericValue,
              name: inputProps.name,
            },
            currentTarget: {
              value: numericValue,
              name: inputProps.name,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      } else {
        // Dispara onChange com string vazia para limpar o valor
        if (onChange) {
          const syntheticEvent = {
            target: {
              value: '',
              name: inputProps.name,
            },
            currentTarget: {
              value: '',
              name: inputProps.name,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    } else {
      // Dispara onChange com string vazia para limpar o valor
      if (onChange) {
        const syntheticEvent = {
          target: {
            value: '',
            name: inputProps.name,
          },
          currentTarget: {
            value: '',
            name: inputProps.name,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    }
  }, [displayValue, derivedValue, onChange, inputProps.name]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);

    // Remove formatação quando focado para facilitar edição
    // Se há um valor derivado, usa ele como base, senão usa displayValue atual
    if (derivedValue) {
      const numericValue = parseCurrencyValue(derivedValue);
      setDisplayValue(numericValue);
    } else if (!displayValue) {
      // Se não há displayValue e não há derivedValue, garante string vazia
      setDisplayValue('');
    }
  }, [derivedValue, displayValue]);

  return (
    <div>
      <label
        htmlFor={inputProps.name}
        className={cn(
          'mb-2 block text-sm font-medium',
          error ? 'text-red-400' : 'text-base-700'
        )}
      >
        {label}
      </label>

      <div className="relative">
        <span
          className={cn(
            'absolute top-1/2 left-4 -translate-y-1/2 text-sm font-medium',
            error ? 'text-red-400' : 'text-base-500'
          )}
        >
          $
        </span>

        <input
          {...inputProps}
          type="text"
          inputMode="decimal"
          value={isFocused ? displayValue : derivedValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={inputProps.placeholder || '0.00'}
          className={cn(
            'rounded-lg border bg-transparent outline-none',
            'h-14 w-full pr-4 pl-8 text-sm font-medium',
            'transition-colors duration-300',
            error
              ? 'border-red-400 text-red-400 placeholder:opacity-80'
              : 'border-base-300 text-base-700 placeholder:opacity-40',
            className
          )}
        />
      </div>

      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
};
