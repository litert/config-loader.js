[Documents for @litert/config-loader](../../../index.md) / [Readers/LocalFileReader](../index.md) / ILocalFileReaderOptions

# Interface: ILocalFileReaderOptions

Defined in: [src/lib/Readers/LocalFileReader.ts:26](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L26)

The options for the LocalFileReader constructor.

## Properties

### encodings

> **encodings**: `IDict`\<`string`\>

Defined in: [src/lib/Readers/LocalFileReader.ts:40](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L40)

A mapping of file extensions to encoding names.

#### Example

```ts
{".json": "json", ".yml": "yaml"}
```

***

### pathSeparator?

> `optional` **pathSeparator**: `string`

Defined in: [src/lib/Readers/LocalFileReader.ts:33](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L33)

The path separator to use for resolving paths.

#### Default

```ts
require('node:path').sep
```
