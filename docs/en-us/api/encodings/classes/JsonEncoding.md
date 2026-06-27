# Class `JsonEncoding`

Decodes JSON text into JavaScript values by delegating directly to the built-in `JSON.parse` function.

Source: [`src/lib/Encodings/Json.ts#L17-L27`](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Json.ts#L17-L27)

[TOC]

## Import

```ts
import { JsonEncoding } from '@litert/config-loader/encodings';
```
## Properties

### `name: string`

The registered encoding name used by readers and loaders to select this decoder.

```ts
public readonly name = 'json';
```

### `decode: (data: string | Buffer) => unknown`

A direct reference to `JSON.parse`, exposed as the decoder implementation.

```ts
public readonly decode = JSON.parse;
```

## Notes

- Because `decode` is `JSON.parse`, invalid JSON input throws the native `SyntaxError` that the loader later wraps as `E_DECODING_FAILED`.
