[**Documents for @litert/config-loader**](../../../README.md)

***

[Documents for @litert/config-loader](../../../README.md) / [Readers/LocalFileReader](../README.md) / LocalFileReader

# Class: LocalFileReader

Defined in: [src/lib/Readers/LocalFileReader.ts:40](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L40)

The data reader interface for config loader.

It's not just for reading the config data, could also be used by operators to read any data if needed.

## Implements

- [`IDataReader`](../../../Declaration/interfaces/IDataReader.md)

## Constructors

### Constructor

> **new LocalFileReader**(`opts`): `LocalFileReader`

Defined in: [src/lib/Readers/LocalFileReader.ts:46](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L46)

#### Parameters

##### opts

[`ILocalFileReaderOptions`](../interfaces/ILocalFileReaderOptions.md)

#### Returns

`LocalFileReader`

## Methods

### read()

> **read**(`filePath`): `Promise`\<[`IReadResult`](../../../Declaration/interfaces/IReadResult.md)\>

Defined in: [src/lib/Readers/LocalFileReader.ts:94](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L94)

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

Defined in: [src/lib/Readers/LocalFileReader.ts:71](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L71)

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

Defined in: [src/lib/Readers/LocalFileReader.ts:52](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L52)

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
