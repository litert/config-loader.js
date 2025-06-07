[**Documents for @litert/config-loader**](../../../README.md)

***

[Documents for @litert/config-loader](../../../README.md) / [Encodings/Yaml](../README.md) / YamlEncoding

# Class: YamlEncoding

Defined in: [src/lib/Encodings/Yaml.ts:20](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Yaml.ts#L20)

The encoding decoder interface for config loader.

## Implements

- [`IEncoding`](../../../Declaration/interfaces/IEncoding.md)

## Constructors

### Constructor

> **new YamlEncoding**(): `YamlEncoding`

#### Returns

`YamlEncoding`

## Properties

### name

> `readonly` **name**: `"yaml"` = `'yaml'`

Defined in: [src/lib/Encodings/Yaml.ts:22](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Yaml.ts#L22)

The name of the encoding.

#### Implementation of

[`IEncoding`](../../../Declaration/interfaces/IEncoding.md).[`name`](../../../Declaration/interfaces/IEncoding.md#name)

## Methods

### decode()

> **decode**(`data`): `unknown`

Defined in: [src/lib/Encodings/Yaml.ts:24](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Yaml.ts#L24)

Parse the given data and return the corresponding object.

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`unknown`

#### Implementation of

[`IEncoding`](../../../Declaration/interfaces/IEncoding.md).[`decode`](../../../Declaration/interfaces/IEncoding.md#decode)
