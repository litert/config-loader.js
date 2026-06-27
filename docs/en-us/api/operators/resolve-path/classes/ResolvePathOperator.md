# Class `ResolvePathOperator`

Resolves a relative path by delegating to the active reader's `resolvePath()` implementation.

Source: [`src/lib/Operators/ResolvePath.ts#L33-L49`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/ResolvePath.ts#L33-L49)

[TOC]

## Import

```ts
import { ResolvePathOperator } from '@litert/config-loader/operators/ResolvePath';
```
## Properties

### `code: string`

The operator token used inside configuration expressions.

```ts
public readonly code = 'path';
```

### `aliases: string[]`

The built-in alias list shipped by this operator. It is empty for this implementation.

```ts
public readonly aliases = [];
```

### `modes: Record<string, unknown>`

Registers one inline-mode implementation that returns the resolved path string.

```ts
public readonly modes = { ... };
```

## Notes

- The result depends on the active reader implementation, not on the filesystem alone.

## Examples

```ts
const operator = new ResolvePathOperator();
console.log(operator.code);
```
