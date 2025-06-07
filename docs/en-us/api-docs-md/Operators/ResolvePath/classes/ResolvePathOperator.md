[**Documents for @litert/config-loader**](../../../README.md)

***

[Documents for @litert/config-loader](../../../README.md) / [Operators/ResolvePath](../README.md) / ResolvePathOperator

# Class: ResolvePathOperator

Defined in: [src/lib/Operators/ResolvePath.ts:40](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ResolvePath.ts#L40)

This operator resolves a path as the data reader would do.

## Mode

inline

## Syntax

`"$[[path:<variable-name>]]"`

## Implements

- [`IOperator`](../../../Declaration/interfaces/IOperator.md)

## Constructors

### Constructor

> **new ResolvePathOperator**(): `ResolvePathOperator`

#### Returns

`ResolvePathOperator`

## Properties

### aliases

> `readonly` **aliases**: `never`[] = `[]`

Defined in: [src/lib/Operators/ResolvePath.ts:44](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ResolvePath.ts#L44)

The code aliases of the operator, its format is the same as `code`.

This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
when adding the operator to the loader.

Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`aliases`](../../../Declaration/interfaces/IOperator.md#aliases)

***

### code

> `readonly` **code**: `"path"` = `'path'`

Defined in: [src/lib/Operators/ResolvePath.ts:42](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ResolvePath.ts#L42)

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

Defined in: [src/lib/Operators/ResolvePath.ts:46](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ResolvePath.ts#L46)

Where the operator should be used.

#### inline

> **inline**: `ResolvePathInlineOperator`

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`modes`](../../../Declaration/interfaces/IOperator.md#modes)
