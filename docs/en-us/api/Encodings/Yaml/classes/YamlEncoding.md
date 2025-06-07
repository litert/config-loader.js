[Documents for @litert/config-loader](../../../index.md) / [Encodings/Yaml](../index.md) / YamlEncoding

# Class: YamlEncoding

Defined in: [src/lib/Encodings/Yaml.ts:23](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Yaml.ts#L23)

The encoding decoder for YAML.

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

Defined in: [src/lib/Encodings/Yaml.ts:25](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Yaml.ts#L25)

The name of the encoding.

#### Implementation of

[`IEncoding`](../../../Declaration/interfaces/IEncoding.md).[`name`](../../../Declaration/interfaces/IEncoding.md#name)

## Methods

### decode()

> **decode**(`data`): `unknown`

Defined in: [src/lib/Encodings/Yaml.ts:27](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Yaml.ts#L27)

Parse the given data and return the corresponding object.

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`unknown`

#### Implementation of

[`IEncoding`](../../../Declaration/interfaces/IEncoding.md).[`decode`](../../../Declaration/interfaces/IEncoding.md#decode)
