# Class `ImportBinaryFileOperator`

Reads a referenced file through the active reader and writes its raw binary payload into the current block value.

Source: [`src/lib/Operators/ImportBinaryFile.ts#L54-L63`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ImportBinaryFile.ts#L54-L63)

[TOC]

## Import

```ts
import { ImportBinaryFileOperator } from '@litert/config-loader/operators';
```
## Properties

### `code: string`

The operator token used inside configuration expressions.

```ts
public readonly code = 'binary-file';
```

### `aliases: string[]`

The built-in alias list shipped by this operator. It is empty for this implementation.

```ts
public readonly aliases = [];
```

### `modes: Record<string, unknown>`

Registers one block-mode implementation that stores the reader `content` value without converting it to text.

```ts
public readonly modes = { ... };
```

## Notes

- The operator uses `reader.read()` or `reader.readSync()` and preserves the raw `Buffer` returned by the reader.

## Examples

```ts
const operator = new ImportBinaryFileOperator();
console.log(operator.code);
```
