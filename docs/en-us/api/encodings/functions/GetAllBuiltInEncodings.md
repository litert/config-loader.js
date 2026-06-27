# Function — encodings - getAllBuiltInEncodings

Creates a new array containing the package's built-in encoding instances. Call this helper when you want the default JSON and YAML decoders without constructing them yourself.

Source: [`src/lib/Encodings/index.ts#L21-L30`](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/index.ts#L21-L30)

[TOC]

## Import

```ts
import { getAllBuiltInEncodings } from '@litert/config-loader/encodings';
```

## Signature

```ts
function getAllBuiltInEncodings(): IEncoding[];
```

## Parameters

This API does not accept any parameters.

## Return Value

Returns a fresh array containing one `JsonEncoding` instance and one `YamlEncoding` instance.

## Notes

- The helper returns new objects on each call, so you can safely mutate the array without affecting other callers.

## Examples

```ts
import { getAllBuiltInEncodings } from '@litert/config-loader/encodings';

const encodings = getAllBuiltInEncodings();
console.log(encodings.map((item) => item.name));
```
