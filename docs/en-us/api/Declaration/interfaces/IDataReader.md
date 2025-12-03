[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IDataReader

# Interface: IDataReader

Defined in: [src/lib/Declaration.ts:76](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L76)

The data reader interface for config loader.

It's not just for reading the config data, could also be used by operators to read any data if needed.

## Methods

### read()?

> `optional` **read**(`dataPath`): `Promise`\<[`IReadResult`](IReadResult.md)\>

Defined in: [src/lib/Declaration.ts:83](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L83)

Read the content of the given path and return the result.

#### Parameters

##### dataPath

`string`

The path of the data to be read. It could be path of anything, not just a file.

#### Returns

`Promise`\<[`IReadResult`](IReadResult.md)\>

***

### readSync()?

> `optional` **readSync**(`dataPath`): [`IReadResult`](IReadResult.md)

Defined in: [src/lib/Declaration.ts:90](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L90)

The synchronous version of `read()`.

#### Parameters

##### dataPath

`string`

The path of the data to be read. It could be path of anything, not just a file.

#### Returns

[`IReadResult`](IReadResult.md)

***

### resolvePath()

> **resolvePath**(`refFile`, `filePath`): `string`

Defined in: [src/lib/Declaration.ts:101](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L101)

Resolve the path of `filePath` relative to `refFile`.

#### Parameters

##### refFile

`string`

The path of the first file.

##### filePath

`string`

The relative path of the second file.

#### Returns

`string`

The absolute path of `filePath`.

#### Example

```ts
`resolveRelativePath('/path/to/file1.json', './a/file2.json')` returns `/path/to/a/file2.json`.
```
