[Documents for @litert/config-loader](../../../index.md) / [Operators/ImportTextFile](../index.md) / ImportTextFileOperator

# Class: ImportTextFileOperator

Defined in: [src/lib/Operators/ImportTextFile.ts:35](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ImportTextFile.ts#L35)

The interface type for config loader operators.

## Implements

- [`IOperator`](../../../Declaration/interfaces/IOperator.md)

## Constructors

### Constructor

> **new ImportTextFileOperator**(): `ImportTextFileOperator`

#### Returns

`ImportTextFileOperator`

## Properties

### aliases

> `readonly` **aliases**: `never`[] = `[]`

Defined in: [src/lib/Operators/ImportTextFile.ts:39](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ImportTextFile.ts#L39)

The code aliases of the operator, its format is the same as `code`.

This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
when adding the operator to the loader.

Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`aliases`](../../../Declaration/interfaces/IOperator.md#aliases)

***

### code

> `readonly` **code**: `"text-file"` = `'text-file'`

Defined in: [src/lib/Operators/ImportTextFile.ts:37](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ImportTextFile.ts#L37)

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

Defined in: [src/lib/Operators/ImportTextFile.ts:41](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ImportTextFile.ts#L41)

Where the operator should be used.

#### inline

> **inline**: `ImportTextFileInlineOperator`

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`modes`](../../../Declaration/interfaces/IOperator.md#modes)
