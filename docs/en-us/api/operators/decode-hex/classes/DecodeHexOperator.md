# Class `DecodeHexOperator`

Decodes a hexadecimal string into a `Buffer` when used as a block operator.

Source: [`src/lib/Operators/DecodeHex.ts#L43-L59`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/DecodeHex.ts#L43-L59)

[TOC]

## Import

```ts
import { DecodeHexOperator } from '@litert/config-loader/operators/DecodeHex';
```
## Properties

### `code: string`

The operator token used inside configuration expressions.

```ts
public readonly code = 'hex';
```

### `aliases: string[]`

The built-in alias list shipped by this operator. It is empty for this implementation.

```ts
public readonly aliases = [];
```

### `modes: Record<string, unknown>`

Registers one block-mode implementation that writes a decoded `Buffer` into the current output vessel.

```ts
public readonly modes = { ... };
```

## Notes

- This operator supports only block mode.
- The operand string is passed directly to `Buffer.from(operand, "hex")`.

## Examples

```ts
const operator = new DecodeHexOperator();
console.log(operator.code);
```
