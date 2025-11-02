[Documents for @litert/config-loader](../../../index.md) / [Operators/EnvironmentVariable](../index.md) / EnvironmentVariableOperator

# Class: EnvironmentVariableOperator

Defined in: [src/lib/Operators/EnvironmentVariable.ts:134](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L134)

This operator reads the value of an environment variable.

## Since

v1.1.0: If multiple variable names are provided, they will be checked
in order, and the value of the first found variable will be used.

## Since

v1.1.0: An operator option 'default' is added. When provided, it will
be used as the default value if none of the specified environment variables
are found.

## Mode

inline

## Syntax

`"$[[env:<variable-name>]]"`

## Syntax

`"$[[env:<variable-name1>,<variable-name2>]]"`

## Syntax

`"$[[env:<variable-name1>[...<variable-names>]; default=<default-value>]]"`

## Implements

- [`IOperator`](../../../Declaration/interfaces/IOperator.md)

## Constructors

### Constructor

> **new EnvironmentVariableOperator**(`opts?`): `EnvironmentVariableOperator`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:144](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L144)

#### Parameters

##### opts?

[`IEnvVarOperatorOptions`](../interfaces/IEnvVarOperatorOptions.md)

#### Returns

`EnvironmentVariableOperator`

## Properties

### aliases

> `readonly` **aliases**: `never`[] = `[]`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:138](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L138)

The code aliases of the operator, its format is the same as `code`.

This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
when adding the operator to the loader.

Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`aliases`](../../../Declaration/interfaces/IOperator.md#aliases)

***

### code

> `readonly` **code**: `"env"` = `'env'`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:136](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L136)

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

Defined in: [src/lib/Operators/EnvironmentVariable.ts:140](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L140)

Where the operator should be used.

#### inline?

> `optional` **inline**: [`IInlineOperator`](../../../Declaration/interfaces/IInlineOperator.md)

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`modes`](../../../Declaration/interfaces/IOperator.md#modes)
