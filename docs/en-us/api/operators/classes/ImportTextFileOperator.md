# Class `ImportTextFileOperator`

Reads a referenced file through the active reader and injects its text content into an inline expression.

Source: [`src/lib/Operators/ImportTextFile.ts#L35-L44`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ImportTextFile.ts#L35-L44)

[TOC]

## Import

```ts
import { ImportTextFileOperator } from '@litert/config-loader/operators';
```
## Properties

### `code: string`

The operator token used inside configuration expressions.

```ts
public readonly code = 'text-file';
```

### `aliases: string[]`

The built-in alias list shipped by this operator. It is empty for this implementation.

```ts
public readonly aliases = [];
```

### `modes: Record<string, unknown>`

Registers one inline-mode implementation that converts the reader `content` value to a string.

```ts
public readonly modes = { ... };
```

## Notes

- The operator always calls `.toString()` on the reader output.

## Examples

```ts
const operator = new ImportTextFileOperator();
console.log(operator.code);
```
