[Documents for @litert/config-loader](../../../index.md) / [Encodings/Json](../index.md) / JsonEncoding

# Class: JsonEncoding

Defined in: [src/lib/Encodings/Json.ts:22](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Json.ts#L22)

The encoding decoder for JSON.

## Implements

- [`IEncoding`](../../../Declaration/interfaces/IEncoding.md)

## Constructors

### Constructor

> **new JsonEncoding**(): `JsonEncoding`

#### Returns

`JsonEncoding`

## Properties

### decode()

> `readonly` **decode**: (`text`, `reviver?`) => `any` = `JSON.parse`

Defined in: [src/lib/Encodings/Json.ts:26](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Json.ts#L26)

Parse the given data and return the corresponding object.

Converts a JavaScript Object Notation (JSON) string into an object.

#### Parameters

##### text

`string`

A valid JSON string.

##### reviver?

(`this`, `key`, `value`) => `any`

A function that transforms the results. This function is called for each member of the object.
If a member contains nested objects, the nested objects are transformed before the parent object is.

#### Returns

`any`

#### Implementation of

[`IEncoding`](../../../Declaration/interfaces/IEncoding.md).[`decode`](../../../Declaration/interfaces/IEncoding.md#decode)

***

### name

> `readonly` **name**: `"json"` = `'json'`

Defined in: [src/lib/Encodings/Json.ts:24](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Json.ts#L24)

The name of the encoding.

#### Implementation of

[`IEncoding`](../../../Declaration/interfaces/IEncoding.md).[`name`](../../../Declaration/interfaces/IEncoding.md#name)
