# Class `ImportOperator`

Loads another configuration file and stores the fully processed result as the current block value.

Source: [`src/lib/Operators/Import.ts#L93-L102`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/Import.ts#L93-L102)

[TOC]

## Import

```ts
import { ImportOperator } from '@litert/config-loader/operators/Import';
```
## Properties

### `code: string`

The operator token used inside configuration expressions.

```ts
public readonly code = 'import';
```

### `aliases: string[]`

The built-in alias list shipped by this operator. It is empty for this implementation.

```ts
public readonly aliases = [];
```

### `modes: Record<string, unknown>`

Registers one block-mode implementation that replaces the current output entry with the imported value.

```ts
public readonly modes = { ... };
```

## Notes

- The operator tracks traversed files in `contextData` to prevent circular imports.

## Examples

```ts
const operator = new ImportOperator();
console.log(operator.code);
```
