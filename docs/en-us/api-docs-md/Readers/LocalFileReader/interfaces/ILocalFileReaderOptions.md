[**Documents for @litert/config-loader**](../../../README.md)

***

[Documents for @litert/config-loader](../../../README.md) / [Readers/LocalFileReader](../README.md) / ILocalFileReaderOptions

# Interface: ILocalFileReaderOptions

Defined in: [src/lib/Readers/LocalFileReader.ts:23](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L23)

## Properties

### encodings

> **encodings**: `IDict`\<`string`\>

Defined in: [src/lib/Readers/LocalFileReader.ts:37](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L37)

A mapping of file extensions to encoding names.

#### Example

```ts
{".json": "json", ".yml": "yaml"}
```

***

### pathSeparator?

> `optional` **pathSeparator**: `string`

Defined in: [src/lib/Readers/LocalFileReader.ts:30](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L30)

The path separator to use for resolving paths.

#### Default

```ts
require('node:path').sep
```
