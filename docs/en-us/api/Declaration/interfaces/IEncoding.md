[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IEncoding

# Interface: IEncoding

Defined in: [src/lib/Declaration.ts:38](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L38)

The encoding decoder interface for config loader.

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/lib/Declaration.ts:43](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L43)

The name of the encoding.

## Methods

### decode()

> **decode**(`data`): `unknown`

Defined in: [src/lib/Declaration.ts:48](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L48)

Parse the given data and return the corresponding object.

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`unknown`
