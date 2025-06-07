[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IContainerOperator

# Interface: IContainerOperator

Defined in: [src/lib/Declaration.ts:263](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L263)

The interface for container operators.

## Properties

### order

> `readonly` **order**: [`EContainerOperatorOrder`](../../Constants/enumerations/EContainerOperatorOrder.md)

Defined in: [src/lib/Declaration.ts:268](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L268)

The application order of the operator.

## Methods

### process()

> **process**(`args`, `context`): `void` \| `Promise`\<`void`\>

Defined in: [src/lib/Declaration.ts:278](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L278)

Process the given arguments and context.

If any result is produced, it should be written to the `context.output` vessel.

#### Parameters

##### args

[`IContainerOperatorArgs`](IContainerOperatorArgs.md)

The arguments for the operator, including the operand and the value of the property.

##### context

[`IOperatorContext`](IOperatorContext.md)

The context in which the operator is being processed.

#### Returns

`void` \| `Promise`\<`void`\>

***

### processSync()

> **processSync**(`args`, `context`): `void`

Defined in: [src/lib/Declaration.ts:285](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L285)

The synchronous version of `process()`.

#### Parameters

##### args

[`IContainerOperatorArgs`](IContainerOperatorArgs.md)

##### context

[`IOperatorContext`](IOperatorContext.md)

#### Returns

`void`

#### See

[IContainerOperator.process](#process)
