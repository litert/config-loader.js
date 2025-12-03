[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IBlockOperator

# Interface: IBlockOperator

Defined in: [src/lib/Declaration.ts:257](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L257)

The interface for block operators.

## Methods

### process()

> **process**(`operand`, `context`, `options`): `void` \| `Promise`\<`void`\>

Defined in: [src/lib/Declaration.ts:271](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L271)

Process the given operand and context.

If any result is produced, it should be written to the `context.output` vessel.

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

`void` \| `Promise`\<`void`\>

void or a Promise that resolves when processing is complete.

#### Since

v1.1.0: Added `options` parameter.

***

### processSync()

> **processSync**(`operand`, `context`, `options`): `void`

Defined in: [src/lib/Declaration.ts:282](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L282)

The synchronous version of `process()`.

#### Parameters

##### operand

`string`

##### context

[`IOperatorContext`](IOperatorContext.md)

##### options

[`IOperationOptions`](../type-aliases/IOperationOptions.md)

#### Returns

`void`

#### See

[IBlockOperator.process](#process)
