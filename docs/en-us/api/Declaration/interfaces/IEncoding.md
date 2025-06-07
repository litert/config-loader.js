[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IEncoding

# Interface: IEncoding

Defined in: [src/lib/Declaration.ts:22](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L22)

The encoding decoder interface for config loader.

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Declaration.ts:27](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L27)

The name of the encoding.

## Methods

### decode()

> **decode**(`data`): `unknown`

Defined in: [src/lib/Declaration.ts:32](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L32)

Parse the given data and return the corresponding object.

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`unknown`
