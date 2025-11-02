[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IReadResult

# Interface: IReadResult

Defined in: [src/lib/Declaration.ts:54](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L54)

The result of `IReader.read()` method.

## Properties

### content

> **content**: `string` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [src/lib/Declaration.ts:59](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L59)

The content read by the reader.

***

### encoding

> **encoding**: `string`

Defined in: [src/lib/Declaration.ts:66](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L66)

The encoding of the content.

This is used by the loader, to decode the content with an `IEncoding` instance.
