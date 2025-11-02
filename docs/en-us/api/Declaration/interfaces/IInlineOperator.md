[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IInlineOperator

# Interface: IInlineOperator

Defined in: [src/lib/Declaration.ts:216](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L216)

The interface for inline operators.

## Methods

### process()

> **process**(`operand`, `context`, `options`): `string` \| `Promise`\<`string`\>

Defined in: [src/lib/Declaration.ts:229](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L229)

Process the given operand and context, and return the result as a string.

#### Parameters

##### operand

`string`

The operand to be processed.

##### context

[`IOperatorContext`](IOperatorContext.md)

The context in which the operator is being processed.

##### options

[`IOperationOptions`](../type-aliases/IOperationOptions.md)

Additional options for processing the operator.

#### Returns

`string` \| `Promise`\<`string`\>

The result of processing the operand.

#### Since

v1.1.0: Added `options` parameter.

***

### processSync()

> **processSync**(`operand`, `context`, `options`): `string`

Defined in: [src/lib/Declaration.ts:240](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L240)

The synchronous version of `process()`.

#### Parameters

##### operand

`string`

##### context

[`IOperatorContext`](IOperatorContext.md)

##### options

[`IOperationOptions`](../type-aliases/IOperationOptions.md)

#### Returns

`string`

#### See

[IInlineOperator.process](#process)
