[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IOperator

# Interface: IOperator

Defined in: [src/lib/Declaration.ts:138](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L138)

## Properties

### aliases

> **aliases**: `string`[]

Defined in: [src/lib/Declaration.ts:161](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L161)

The code aliases of the operator, its format is the same as `code`.

This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
when adding the operator to the loader.

Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.

***

### code

> **code**: `string`

Defined in: [src/lib/Declaration.ts:151](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L151)

The built-in code of the operator, could only contains below characters:

- Lowercase letters: `a-z`
- Digit characters: `0-9`
- Underscore: `_`
- Hyphen: `-`

This code could be overridden by the `overrideCode` option in `IAddOperatorOptions`
when adding the operator to the loader.

***

### modes

> **modes**: `object`

Defined in: [src/lib/Declaration.ts:166](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L166)

Where the operator should be used.

#### block?

> `optional` **block**: [`IBlockOperator`](IBlockOperator.md)

The operator object processes the operand when it's under block mode.

##### Optional

#### container?

> `optional` **container**: [`IContainerOperator`](IContainerOperator.md)

The operator object processes the operand when it's under container mode.

##### Optional

#### inline?

> `optional` **inline**: [`IInlineOperator`](IInlineOperator.md)

The operator object processes the operand when it's under inline mode.

##### Optional
