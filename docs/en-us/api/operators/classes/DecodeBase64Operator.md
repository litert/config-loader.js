# Class `DecodeBase64Operator`

Decodes a Base64-encoded string into a `Buffer` when used as a block operator.

Source: [`src/lib/Operators/DecodeBase64.ts#L43-L59`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/DecodeBase64.ts#L43-L59)

[TOC]

## Import

```ts
import { DecodeBase64Operator } from '@litert/config-loader/operators';
```
## Properties

### `code: string`

The operator token used inside configuration expressions.

```ts
public readonly code = 'base64';
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
- The operand string is passed directly to `Buffer.from(operand, "base64")`.

## Examples

```ts
const operator = new DecodeBase64Operator();
console.log(operator.code);
```
