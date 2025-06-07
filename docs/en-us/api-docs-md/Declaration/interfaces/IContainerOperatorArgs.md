[**Documents for @litert/config-loader**](../../README.md)

***

[Documents for @litert/config-loader](../../README.md) / [Declaration](../README.md) / IContainerOperatorArgs

# Interface: IContainerOperatorArgs

Defined in: [src/lib/Declaration.ts:243](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L243)

The parameters for the `IContainerOperator` interface.

## Properties

### operand

> **operand**: `null` \| `string`

Defined in: [src/lib/Declaration.ts:250](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L250)

The operand of the operation, if exists.

#### Example

```ts
the `<operand>` part in `$[[op:operand]]`.
```

***

### value

> **value**: `unknown`

Defined in: [src/lib/Declaration.ts:257](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L257)

The value of the property.

#### Example

```ts
the `<value>` of the property in `{ "$[[op:operand]]": <value> }`.
```
