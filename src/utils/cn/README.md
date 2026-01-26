# Função `cn` - ClassNames Utility

Utilitário para combinar classes CSS do Tailwind de forma inteligente, resolvendo conflitos e mesclando classes condicionais.

## 📁 Estrutura

```
utils/cn/
├── cn.ts          # Implementação da função
├── cn.types.ts    # Tipos TypeScript
├── index.ts       # Exportações
└── README.md      # Esta documentação
```

## 📦 Dependências

A função `cn` combina duas bibliotecas poderosas:

- **`clsx`** - Combina classes CSS condicionalmente
- **`tailwind-merge`** - Resolve conflitos entre classes do Tailwind CSS

## 🔧 Funcionalidade

### O que faz?

1. **Combina classes**: Une múltiplas strings de classes CSS
2. **Resolve conflitos**: Remove classes conflitantes do Tailwind (ex: `p-2` e `p-4` → apenas `p-4`)
3. **Suporta condicionais**: Aceita valores booleanos e `undefined` para classes condicionais

### Como funciona?

```typescript
export const cn = (...classes: CnProps): string => twMerge(clsx(...classes));
```

## 📖 Uso

### Importação

```tsx
import { cn } from '@/utils';
// ou
import { cn } from '@/utils/cn';
```

### Exemplos Básicos

```tsx
// Combinação simples
cn('bg-primary', 'text-white', 'p-4');
// → 'bg-primary text-white p-4'

// Classes condicionais
cn('p-4', isActive && 'bg-primary', !isActive && 'bg-gray');
// → 'p-4 bg-primary' (se isActive for true)

// Valores undefined são ignorados
cn('p-4', undefined, 'bg-primary');
// → 'p-4 bg-primary'
```

### Resolução de Conflitos (Tailwind Merge)

```tsx
// Sem cn: classes conflitantes ficam ambas
'p-2 p-4'; // ❌ Ambas aplicadas

// Com cn: resolve o conflito
cn('p-2', 'p-4');
// → 'p-4' ✅ Apenas a última é mantida

// Outros exemplos
cn('bg-red-500', 'bg-blue-500');
// → 'bg-blue-500'

cn('text-sm', 'text-lg');
// → 'text-lg'
```

### Uso em Componentes

#### Exemplo 1: Classes Base + Condicionais

```tsx
const Button = ({ disabled, className }: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-primary rounded px-4 py-2 text-white',
        'transition-opacity duration-200',
        disabled && 'cursor-not-allowed opacity-50',
        className // Permite override de classes externas
      )}
    >
      Click me
    </button>
  );
};
```

#### Exemplo 2: Variantes

```tsx
const Button = ({ variant = 'primary', className }: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded px-4 py-2 font-medium',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-800',
        variant === 'danger' && 'bg-red-500 text-white',
        className
      )}
    >
      Click me
    </button>
  );
};
```

#### Exemplo 3: Classes Múltiplas com Override

```tsx
const Card = ({ className }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg p-4 shadow-md',
        'border border-gray-200 bg-white',
        className // Classes passadas por prop têm prioridade
      )}
    >
      Content
    </div>
  );
};

// Uso: override de classes
<Card className="bg-purple-500 p-8" />;
// Classes finais: 'rounded-lg shadow-md border border-gray-200 p-8 bg-purple-500'
// ✅ p-4 foi substituído por p-8
// ✅ bg-white foi substituído por bg-purple-500
```

## 🎯 Casos de Uso Comuns

### 1. Componentes com Props Condicionais

```tsx
cn(
  'base-class',
  isActive && 'active-class',
  isLoading && 'loading-class',
  isDisabled && 'disabled-class'
);
```

### 2. Mesclagem com Classes Externas

```tsx
cn('base-classes', className); // className vem de props
```

### 3. Classes Responsivas

```tsx
cn('text-sm', 'md:text-base', 'lg:text-lg');
```

### 4. Estados Hover/Focus

```tsx
cn(
  'bg-primary',
  'hover:bg-primary-dark',
  'focus:ring-2 focus:ring-primary',
  'active:scale-95'
);
```

## 💡 Vantagens

### ✅ Sem `cn`

```tsx
// Classes conflitantes não são resolvidas
className={`p-2 ${isActive ? 'p-4' : ''} ${className}`}
// Se className tiver 'p-6', todas ficam: 'p-2 p-4 p-6'
```

### ✅ Com `cn`

```tsx
// Conflitos são resolvidos automaticamente
className={cn('p-2', isActive && 'p-4', className)}
// Se className for 'p-6', resultado: 'p-6' (última tem prioridade)
```

## 🔍 Tipos TypeScript

```typescript
type CnProps = (string | boolean | undefined)[];

// Uso
const classes: CnProps = ['p-4', true && 'bg-primary', undefined];
```

## ⚠️ Observações Importantes

1. **Ordem importa**: Classes posteriores sobrescrevem anteriores

   ```tsx
   cn('p-2', 'p-4'); // → 'p-4'
   cn('p-4', 'p-2'); // → 'p-2'
   ```

2. **Classes externas têm prioridade**: Se `className` for passado como prop, ele tem prioridade

   ```tsx
   cn('p-2', className); // Se className='p-8', resultado é 'p-8'
   ```

3. **Valores falsy são ignorados**: `false`, `null`, `undefined` são filtrados
   ```tsx
   cn('p-4', false, null, undefined); // → 'p-4'
   ```

## 🚀 Performance

- **Otimizado**: `clsx` e `tailwind-merge` são bibliotecas leves e otimizadas
- **Tree-shaking**: Apenas o código usado é incluído no bundle final
- **Zero runtime overhead**: Processamento acontece apenas em build/dev

## 📚 Referências

- [clsx Documentation](https://github.com/lukeed/clsx)
- [tailwind-merge Documentation](https://github.com/dcastil/tailwind-merge)
- [Tailwind CSS Class Conflicts](https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply)
