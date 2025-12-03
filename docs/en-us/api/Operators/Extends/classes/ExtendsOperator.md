[Documents for @litert/config-loader](../../../index.md) / [Operators/Extends](../index.md) / ExtendsOperator

# Class: ExtendsOperator

Defined in: [src/lib/Operators/Extends.ts:187](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Extends.ts#L187)

The interface type for config loader operators.

## Implements

- [`IOperator`](../../../Declaration/interfaces/IOperator.md)

## Constructors

### Constructor

> **new ExtendsOperator**(): `ExtendsOperator`

#### Returns

`ExtendsOperator`

## Properties

### aliases

> `readonly` **aliases**: `never`[] = `[]`

Defined in: [src/lib/Operators/Extends.ts:191](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Extends.ts#L191)

The code aliases of the operator, its format is the same as `code`.

This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
when adding the operator to the loader.

Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`aliases`](../../../Declaration/interfaces/IOperator.md#aliases)

***

### code

> `readonly` **code**: `"extends"` = `'extends'`

Defined in: [src/lib/Operators/Extends.ts:189](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Extends.ts#L189)

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

Defined in: [src/lib/Operators/Extends.ts:193](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Extends.ts#L193)

Where the operator should be used.

#### block

> **block**: `ExtendsBlockOperator`

#### container

> **container**: `ExtendsContainerOperator`

#### Implementation of

[`IOperator`](../../../Declaration/interfaces/IOperator.md).[`modes`](../../../Declaration/interfaces/IOperator.md#modes)
