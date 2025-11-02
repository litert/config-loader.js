[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IContainerOperator

# Interface: IContainerOperator

Defined in: [src/lib/Declaration.ts:319](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L319)

The interface for container operators.

## Properties

### order

> `readonly` **order**: [`EContainerOperatorOrder`](../../Constants/enumerations/EContainerOperatorOrder.md)

Defined in: [src/lib/Declaration.ts:324](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L324)

The application order of the operator.

## Methods

### process()

> **process**(`args`, `context`): `void` \| `Promise`\<`void`\>

Defined in: [src/lib/Declaration.ts:334](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L334)

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

Defined in: [src/lib/Declaration.ts:341](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L341)

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
