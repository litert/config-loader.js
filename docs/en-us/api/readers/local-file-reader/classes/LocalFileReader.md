# Class `LocalFileReader`

Reads configuration files from the local filesystem, infers encoding names from the file extension map you provide, and resolves relative file references with Node.js path rules.

Source: [`src/lib/Readers/LocalFileReader.ts#L23-L110`](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L23-L110)

[TOC]

## Import

```ts
import { LocalFileReader } from '@litert/config-loader/readers/LocalFileReader';
```

## Constructor

### Signature

```ts
new LocalFileReader(opts: ILocalFileReaderOptions): LocalFileReader;
```

### Parameters

- `opts: ILocalFileReaderOptions`

  Supplies the extension-to-encoding map and an optional custom path separator.

## Methods

### Method `resolvePath`
Resolves `file` relative to `ref` unless `file` is already absolute.
#### Signature
```ts
public resolvePath(ref: string, file: string): string;
```
#### Parameters

- `ref: string`

  The current file path that provides the base directory.

- `file: string`

  The relative or absolute file path to resolve.
#### Return Value
Returns the absolute path that the reader will load next, or the original `file` when it is already absolute.
#### Examples
```ts
const reader = new LocalFileReader({ encodings: { '.json': 'json' } });
console.log(reader.resolvePath('/tmp/a/config.json', '../b/data.json'));
```

### Method `readSync`
Reads a file synchronously and returns the raw content together with the registered encoding name for its extension.
#### Signature
```ts
public readSync(filePath: string): IReadResult;
```
#### Parameters

- `filePath: string`

  The filesystem path to read.
#### Return Value
Returns an `IReadResult` whose `content` is a `Buffer` and whose `encoding` is the mapped extension name or an empty string.


#### Error Handling

- [`E_READ_FILE_FAILED`](../../../config-loader/Errors.md#error-class-e_read_file_failed) — Raised when the file cannot be read or the extension cannot be derived.
#### Examples
```ts
const reader = new LocalFileReader({ encodings: { '.json': 'json' } });
const result = reader.readSync('/tmp/demo.json');
console.log(result.encoding);
```

### Method `read`
Reads a file asynchronously and returns the raw content together with the registered encoding name for its extension.
#### Signature
```ts
public read(filePath: string): Promise<IReadResult>;
```
#### Parameters

- `filePath: string`

  The filesystem path to read.
#### Return Value
Returns a promise for an `IReadResult` whose `content` is a `Buffer` and whose `encoding` is the mapped extension name or an empty string.


#### Error Handling

- [`E_READ_FILE_FAILED`](../../../config-loader/Errors.md#error-class-e_read_file_failed) — Raised when the file cannot be read or the extension cannot be derived.
#### Examples
```ts
const reader = new LocalFileReader({ encodings: { '.json': 'json' } });
const result = await reader.read('/tmp/demo.json');
console.log(result.content.length);
```

## Scoped Types

### Interface `ILocalFileReaderOptions`

Configures the extension mapping and optional path separator used by the `LocalFileReader` constructor.

Source: [`src/lib/Readers/LocalFileReader.ts#L23-L41`](https://github.com/litert/config-loader.js/blob/master/src/lib/Readers/LocalFileReader.ts#L23-L41)

#### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `pathSeparator` | `string` | No | Overrides the path separator used to split file names before extension detection. Defaults to `NodePath.sep`. |
| `encodings` | `Record<string, string>` | Yes | Maps file extensions such as `.json` or `.yaml` to registered encoding names. |

## Notes

- If a file extension is not in the map, the reader still returns the content and reports an empty `encoding` string.
