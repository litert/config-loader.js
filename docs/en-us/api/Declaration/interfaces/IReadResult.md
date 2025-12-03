[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IReadResult

# Interface: IReadResult

Defined in: [src/lib/Declaration.ts:56](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L56)

The result of `IReader.read()` method.

## Properties

### content

> **content**: `string` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [src/lib/Declaration.ts:61](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L61)

The content read by the reader.

***

### encoding

> **encoding**: `string`

Defined in: [src/lib/Declaration.ts:68](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L68)

The encoding of the content.

This is used by the loader, to decode the content with an `IEncoding` instance.
