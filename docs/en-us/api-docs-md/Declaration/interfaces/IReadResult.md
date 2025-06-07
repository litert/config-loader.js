[**Documents for @litert/config-loader**](../../README.md)

***

[Documents for @litert/config-loader](../../README.md) / [Declaration](../README.md) / IReadResult

# Interface: IReadResult

Defined in: [src/lib/Declaration.ts:38](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L38)

The result of `IReader.read()` method.

## Properties

### content

> **content**: `string` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [src/lib/Declaration.ts:43](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L43)

The content read by the reader.

***

### encoding

> **encoding**: `string`

Defined in: [src/lib/Declaration.ts:50](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L50)

The encoding of the content.

This is used by the loader, to decode the content with an `IEncoding` instance.
