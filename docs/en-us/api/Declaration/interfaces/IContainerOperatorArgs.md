[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IContainerOperatorArgs

# Interface: IContainerOperatorArgs

Defined in: [src/lib/Declaration.ts:297](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L297)

The parameters for the `IContainerOperator` interface.

## Properties

### operand

> **operand**: `null` \| `string`

Defined in: [src/lib/Declaration.ts:304](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L304)

The operand of the operation, if exists.

#### Example

```ts
the `<operand>` part in `$[[op:operand]]`.
```

***

### options

> **options**: [`IOperationOptions`](../type-aliases/IOperationOptions.md)

Defined in: [src/lib/Declaration.ts:320](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L320)

The options provided in the operation.

#### Example

```ts
the options in `$[[op:operand; option1; option2=value2]]`.
```

#### Since

v1.1.0

***

### value

> **value**: `unknown`

Defined in: [src/lib/Declaration.ts:311](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L311)

The value of the property.

#### Example

```ts
the `<value>` of the property in `{ "$[[op:operand]]": <value> }`.
```
