# Class `EnvironmentVariableOperator`

Reads one or more environment variables and injects the first defined value into an inline expression.

Source: [`src/lib/Operators/EnvironmentVariable.ts#L119-L158`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L119-L158)

[TOC]

## Import

```ts
import { EnvironmentVariableOperator } from '@litert/config-loader/operators';
```

## Constructor

### Signature

```ts
new EnvironmentVariableOperator(opts?: IEnvVarOperatorOptions): EnvironmentVariableOperator;
```

### Parameters

- `opts: IEnvVarOperatorOptions` (Optional)

  Optional default fallback value and custom environment lookup callback.

## Properties

### `code: string`

The operator token used inside configuration expressions.

```ts
public readonly code = 'env';
```

### `aliases: string[]`

The built-in alias list shipped by this operator. It is empty for this implementation.

```ts
public readonly aliases = [];
```

### `modes: Record<string, unknown>`

Registers one inline-mode implementation that returns the resolved environment variable value as a string.

```ts
public readonly modes = { ... };
```

## Scoped Types

### Interface `IEnvVarOperatorOptions`

Configures the fallback behavior and custom environment variable lookup used by the operator constructor.

Source: [`src/lib/Operators/EnvironmentVariable.ts#L22-L41`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L22-L41)

#### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `defaultValue` | `string` | No | A constructor-level fallback returned when no listed environment variable is defined. |
| `readEnv` | `(name: string) => string | null | undefined` | No | Overrides the default `process.env[name]` lookup. |

### Type Alias `IReadEnvFn`

The normalized callback shape used internally after constructor defaults are applied.

Source: [`src/lib/Operators/EnvironmentVariable.ts#L43-L45`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L43-L45)

#### Definition

```ts
type IReadEnvFn = (name: string) => string | null | undefined;
```

## Notes

- The inline operand can contain multiple comma-separated environment variable names; the first defined value wins.
- Per-expression `default=...` options override the constructor fallback only when the constructor fallback is not already producing a value.

## Examples

```ts
const operator = new EnvironmentVariableOperator({ defaultValue: 'fallback' });
console.log(operator.code);
```
