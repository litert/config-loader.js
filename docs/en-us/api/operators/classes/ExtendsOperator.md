# Class `ExtendsOperator`

Merges referenced configuration files into the current object or array while preventing circular traversal.

Source: [`src/lib/Operators/Extends.ts#L187-L197`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Extends.ts#L187-L197)

[TOC]

## Import

```ts
import { ExtendsOperator } from '@litert/config-loader/operators';
```
## Properties

### `code: string`

The operator token used inside configuration expressions.

```ts
public readonly code = 'extends';
```

### `aliases: string[]`

The built-in alias list shipped by this operator. It is empty for this implementation.

```ts
public readonly aliases = [];
```

### `modes: Record<string, unknown>`

Registers one container-mode implementation for object merging and one block-mode implementation for array expansion.

```ts
public readonly modes = { ... };
```

## Notes

- Object mode accepts a string path or an array of string paths as the property value.
- Array mode requires the current output vessel to be an array and appends the imported array items.
- Circular reference detection is tracked in `contextData` for the duration of the load.

## Examples

```ts
const operator = new ExtendsOperator();
console.log(operator.code);
```
