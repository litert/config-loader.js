[Documents for @litert/config-loader](../../../index.md) / [Operators/Import](../index.md) / ImportOperator

# Class: ImportOperator

Defined in: [src/lib/Operators/Import.ts:94](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Import.ts#L94)

The interface type for config loader operators.

## Implements

- [`IOperator`](../../../Declaration/interfaces/IOperator.md)

## Constructors

### Constructor

> **new ImportOperator**(): `ImportOperator`

#### Returns

`ImportOperator`

## Properties

### aliases

> `readonly` **aliases**: `never`[] = `[]`

Defined in: [src/lib/Operators/Import.ts:98](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Import.ts#L98)

The code aliases of the operator, its format is the same as `code`.

This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
when adding the operator to the loader.

Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`aliases`](../../../Declaration/interfaces/IOperator.md#aliases)

***

### code

> `readonly` **code**: `"import"` = `'import'`

Defined in: [src/lib/Operators/Import.ts:96](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Import.ts#L96)

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

> `readonly` **modes**: `object`

Defined in: [src/lib/Operators/Import.ts:100](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Import.ts#L100)

Where the operator should be used.

#### block

> **block**: `ImportBlockOperator`

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`modes`](../../../Declaration/interfaces/IOperator.md#modes)
