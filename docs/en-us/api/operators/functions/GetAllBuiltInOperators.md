# Function — operators - getAllBuiltInOperators

Creates a new array containing every built-in operator instance in the package's default registration order.

Source: [`src/lib/Operators/index.ts#L27-L53`](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/index.ts#L27-L53)

[TOC]

## Import

```ts
import { getAllBuiltInOperators } from '@litert/config-loader/operators';
```

## Signature

```ts
function getAllBuiltInOperators(): IOperator[];
```

## Parameters

This API does not accept any parameters.

## Return Value

Returns a fresh array of built-in operators ordered as environment variable, Base64, hexadecimal, import, extends, text-file, binary-file, and resolve-path.

## Notes

- Each call creates new operator instances, so you can safely customize the returned array per loader instance.

## Examples

```ts
import { getAllBuiltInOperators } from '@litert/config-loader/operators';

const operators = getAllBuiltInOperators();
console.log(operators.map((item) => item.code));
```
