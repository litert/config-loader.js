[**Documents for @litert/config-loader**](../../../README.md)

***

[Documents for @litert/config-loader](../../../README.md) / [Operators/DecodeHex](../README.md) / DecodeHexOperator

# Class: DecodeHexOperator

Defined in: [src/lib/Operators/DecodeHex.ts:50](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/DecodeHex.ts#L50)

This operator decodes a hexadecimal-encoded string into a Buffer.

## Mode

block

## Syntax

`"$[[hex:<hex-encoded-string>]]"`

## Implements

- [`IOperator`](../../../Declaration/interfaces/IOperator.md)

## Constructors

### Constructor

> **new DecodeHexOperator**(): `DecodeHexOperator`

#### Returns

`DecodeHexOperator`

## Properties

### aliases

> `readonly` **aliases**: `never`[] = `[]`

Defined in: [src/lib/Operators/DecodeHex.ts:54](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/DecodeHex.ts#L54)

The code aliases of the operator, its format is the same as `code`.

This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
when adding the operator to the loader.

Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`aliases`](../../../Declaration/interfaces/IOperator.md#aliases)

***

### code

> `readonly` **code**: `"hex"` = `'hex'`

Defined in: [src/lib/Operators/DecodeHex.ts:52](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/DecodeHex.ts#L52)

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

Defined in: [src/lib/Operators/DecodeHex.ts:56](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/DecodeHex.ts#L56)

Where the operator should be used.

#### block

> **block**: `DecodeHexBlockOperator`

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`modes`](../../../Declaration/interfaces/IOperator.md#modes)
