[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IBlockOperator

# Interface: IBlockOperator

Defined in: [src/lib/Declaration.ts:215](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L215)

The interface for block operators.

## Methods

### process()

> **process**(`operand`, `context`): `void` \| `Promise`\<`void`\>

Defined in: [src/lib/Declaration.ts:225](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L225)

Process the given operand and context.

If any result is produced, it should be written to the `context.output` vessel.

#### Parameters

##### operand

`string`

The operand to be processed.

##### context

[`IOperatorContext`](IOperatorContext.md)

The context in which the operator is being processed.

#### Returns

`void` \| `Promise`\<`void`\>

***

### processSync()

> **processSync**(`operand`, `context`): `void`

Defined in: [src/lib/Declaration.ts:232](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L232)

The synchronous version of `process()`.

#### Parameters

##### operand

`string`

##### context

[`IOperatorContext`](IOperatorContext.md)

#### Returns

`void`

#### See

[IBlockOperator.process](#process)
