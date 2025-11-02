[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IOperator

# Interface: IOperator

Defined in: [src/lib/Declaration.ts:160](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L160)

The interface type for config loader operators.

## Properties

### aliases

> `readonly` **aliases**: `string`[]

Defined in: [src/lib/Declaration.ts:183](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L183)

The code aliases of the operator, its format is the same as `code`.

This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
when adding the operator to the loader.

Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.

***

### code

> `readonly` **code**: `string`

Defined in: [src/lib/Declaration.ts:173](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L173)

The built-in code of the operator, could only contains below characters:

- Lowercase letters: `a-z`
- Digit characters: `0-9`
- Underscore: `_`
- Hyphen: `-`

This code could be overridden by the `overrideCode` option in `IAddOperatorOptions`
when adding the operator to the loader.

***

### modes

> `readonly` **modes**: `object`

Defined in: [src/lib/Declaration.ts:188](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L188)

Where the operator should be used.

#### block?

> `readonly` `optional` **block**: [`IBlockOperator`](IBlockOperator.md)

The operator object processes the operand when it's under block mode.

##### Optional

#### container?

> `readonly` `optional` **container**: [`IContainerOperator`](IContainerOperator.md)

The operator object processes the operand when it's under container mode.

##### Optional

#### inline?

> `readonly` `optional` **inline**: [`IInlineOperator`](IInlineOperator.md)

The operator object processes the operand when it's under inline mode.

##### Optional
