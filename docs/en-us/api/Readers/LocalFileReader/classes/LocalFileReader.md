[Documents for @litert/config-loader](../../../index.md) / [Readers/LocalFileReader](../index.md) / LocalFileReader

# Class: LocalFileReader

Defined in: [src/lib/Readers/LocalFileReader.ts:46](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L46)

The data reader for files in the local file system.

## Implements

- [`IDataReader`](../../../Declaration/interfaces/IDataReader.md)

## Constructors

### Constructor

> **new LocalFileReader**(`opts`): `LocalFileReader`

Defined in: [src/lib/Readers/LocalFileReader.ts:52](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L52)

#### Parameters

##### opts

[`ILocalFileReaderOptions`](../interfaces/ILocalFileReaderOptions.md)

#### Returns

`LocalFileReader`

## Methods

### read()

> **read**(`filePath`): `Promise`\<[`IReadResult`](../../../Declaration/interfaces/IReadResult.md)\>

Defined in: [src/lib/Readers/LocalFileReader.ts:100](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L100)

Read the content of the given path and return the result.

#### Parameters

##### filePath

`string`

#### Returns

`Promise`\<[`IReadResult`](../../../Declaration/interfaces/IReadResult.md)\>

#### Implementation of

[`IDataReader`](../../../Declaration/interfaces/IDataReader.md).[`read`](../../../Declaration/interfaces/IDataReader.md#read)

***

### readSync()

> **readSync**(`filePath`): [`IReadResult`](../../../Declaration/interfaces/IReadResult.md)

Defined in: [src/lib/Readers/LocalFileReader.ts:77](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L77)

The synchronous version of `read()`.

#### Parameters

##### filePath

`string`

#### Returns

[`IReadResult`](../../../Declaration/interfaces/IReadResult.md)

#### Implementation of

[`IDataReader`](../../../Declaration/interfaces/IDataReader.md).[`readSync`](../../../Declaration/interfaces/IDataReader.md#readsync)

***

### resolvePath()

> **resolvePath**(`ref`, `file`): `string`

Defined in: [src/lib/Readers/LocalFileReader.ts:58](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L58)

Resolve the path of `filePath` relative to `refFile`.

#### Parameters

##### ref

`string`

##### file

`string`

#### Returns

`string`

The absolute path of `filePath`.

#### Example

```ts
`resolveRelativePath('/path/to/file1.json', './a/file2.json')` returns `/path/to/a/file2.json`.
```

#### Implementation of

[`IDataReader`](../../../Declaration/interfaces/IDataReader.md).[`resolvePath`](../../../Declaration/interfaces/IDataReader.md#resolvepath)
