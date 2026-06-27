# Class `YamlEncoding`

Decodes YAML text into JavaScript values with the `yaml` package parser.

Source: [`src/lib/Encodings/Yaml.ts#L17-L31`](https://github.com/litert/config-loader.js/blob/master/src/lib/Encodings/Yaml.ts#L17-L31)

[TOC]

## Import

```ts
import { YamlEncoding } from '@litert/config-loader/encodings';
```
## Properties

### `name: string`

The registered encoding name used by readers and loaders to select this decoder.

```ts
public readonly name = 'yaml';
```

## Methods

### Method `decode`
Parses YAML content from either a string or a `Buffer`.
#### Signature
```ts
public decode(data: Buffer | string): unknown;
```
#### Parameters

- `data: Buffer | string`

  The YAML content to parse. Buffer input is converted to a string with `Buffer.toString()` first.
#### Return Value
Returns the parsed JavaScript value emitted by the `yaml` parser.
#### Examples
```ts
const encoding = new YamlEncoding();
const value = encoding.decode('enabled: true\nitems:\n  - a');
console.log(value);
```
