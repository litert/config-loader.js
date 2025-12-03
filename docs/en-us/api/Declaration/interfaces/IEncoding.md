[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IEncoding

# Interface: IEncoding

Defined in: [src/lib/Declaration.ts:40](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L40)

The encoding decoder interface for config loader.

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Declaration.ts:45](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L45)

The name of the encoding.

## Methods

### decode()

> **decode**(`data`): `unknown`

Defined in: [src/lib/Declaration.ts:50](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L50)

Parse the given data and return the corresponding object.

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`unknown`
