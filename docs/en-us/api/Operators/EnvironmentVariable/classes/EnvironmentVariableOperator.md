[Documents for @litert/config-loader](../../../index.md) / [Operators/EnvironmentVariable](../index.md) / EnvironmentVariableOperator

# Class: EnvironmentVariableOperator

Defined in: [src/lib/Operators/EnvironmentVariable.ts:78](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L78)

This operator reads the value of an environment variable.

## Mode

inline

## Syntax

`"$[[env:<variable-name>]]"`

## Implements

- [`IOperator`](../../../Declaration/interfaces/IOperator.md)

## Constructors

### Constructor

> **new EnvironmentVariableOperator**(`opts?`): `EnvironmentVariableOperator`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:88](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L88)

#### Parameters

##### opts?

[`IEnvVarOperatorOptions`](../interfaces/IEnvVarOperatorOptions.md)

#### Returns

`EnvironmentVariableOperator`

## Properties

### aliases

> `readonly` **aliases**: `never`[] = `[]`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:82](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L82)

The code aliases of the operator, its format is the same as `code`.

This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
when adding the operator to the loader.

Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`aliases`](../../../Declaration/interfaces/IOperator.md#aliases)

***

### code

> `readonly` **code**: `"env"` = `'env'`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:80](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L80)

The built-in code of the operator, could only contains below characters:

- Lowercase letters: `a-z`
- Digit characters: `0-9`
- Underscore: `_`
- Hyphen: `-`

This code could be overridden by the `overrideCode` option in `IAddOperatorOptions`
when adding the operator to the loader.

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`code`](../../../Declaration/interfaces/IOperator.md#code)

***

### modes

> `readonly` **modes**: `object` = `{}`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:84](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L84)

Where the operator should be used.

#### inline?

> `optional` **inline**: [`IInlineOperator`](../../../Declaration/interfaces/IInlineOperator.md)

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`modes`](../../../Declaration/interfaces/IOperator.md#modes)
