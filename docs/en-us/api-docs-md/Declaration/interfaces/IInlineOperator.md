[**Documents for @litert/config-loader**](../../README.md)

***

[Documents for @litert/config-loader](../../README.md) / [Declaration](../README.md) / IInlineOperator

# Interface: IInlineOperator

Defined in: [src/lib/Declaration.ts:194](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L194)

The interface for inline operators.

## Methods

### process()

> **process**(`operand`, `context`): `string` \| `Promise`\<`string`\>

Defined in: [src/lib/Declaration.ts:202](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L202)

Process the given operand and context, and return the result as a string.

#### Parameters

##### operand

`string`

The operand to be processed.

##### context

[`IOperatorContext`](IOperatorContext.md)

The context in which the operator is being processed.

#### Returns

`string` \| `Promise`\<`string`\>

***

### processSync()

> **processSync**(`operand`, `context`): `string`

Defined in: [src/lib/Declaration.ts:209](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L209)

The synchronous version of `process()`.

#### Parameters

##### operand

`string`

##### context

[`IOperatorContext`](IOperatorContext.md)

#### Returns

`string`

#### See

[IInlineOperator.process](#process)
