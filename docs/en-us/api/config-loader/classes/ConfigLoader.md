# Class `ConfigLoader`

Creates a configurable loading pipeline that reads files or in-memory objects, decodes them, and resolves operator expressions through registered readers, encodings, and operators.

Source: [`src/lib/Loader.ts#L86-L307`](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L86-L307)

[TOC]

## Import

```ts
import { ConfigLoader } from '@litert/config-loader';
```

## Constructor

### Signature

```ts
new ConfigLoader(opts: ILoaderOptions): ConfigLoader;
```

### Parameters

- `opts: ILoaderOptions`

  Configures the reader, registered encodings, registered operators, and optional operator syntax overrides.

### Error Handling

- [`E_DUP_ENCODING`](../Errors.md#error-class-e_dup_encoding) — Raised when two encodings in `opts.encodings` share the same `name`. 
- [`E_DUP_OPERATOR`](../Errors.md#error-class-e_dup_operator) — Raised when the initial operator registrations introduce duplicate codes or aliases.
- [`E_INVALID_OPERATOR`](../Errors.md#error-class-e_invalid_operator) — Raised when an initial operator registration uses an invalid code override or alias.

## Properties

### `reader: IDataReader`

The reader instance that the loader uses for all path resolution and data reads.

```ts
public readonly reader: IDataReader;
```

## Methods

### Method `hasEncoding`
Returns `true` when an encoding with the given runtime name is registered.
#### Signature
```ts
public hasEncoding(encodingName: string): boolean;
```
#### Parameters

- `encodingName: string`

  The encoding name to test, such as `json` or `yaml`.
#### Return Value
Returns `true` if the encoding exists on this loader instance; otherwise `false`.
#### Examples
```ts
const exists = loader.hasEncoding('json');
console.log(exists);
```

### Method `getEncodingNames`
Returns the registered encoding names in their current loader order.
#### Signature
```ts
public getEncodingNames(): string[];
```
#### Parameters

This method does not accept any parameters.
#### Return Value
Returns a string array containing every registered encoding name.
#### Examples
```ts
console.log(loader.getEncodingNames());
```

### Method `addOperator`
Registers one operator instance and any requested aliases on the loader.
#### Signature
```ts
public addOperator(operator: IOperator, options: IAddOperatorOptions = {}): this;
```
#### Parameters

- `operator: IOperator`

  The operator instance to register.

- `options: IAddOperatorOptions` (Optional)

  Optional code override and alias controls for the registration.
#### Return Value
Returns the same `ConfigLoader` instance so registrations can be chained.


#### Error Handling

- [`E_INVALID_OPERATOR`](../Errors.md#error-class-e_invalid_operator) — Raised when an override code or alias is not a valid operator token.
- [`E_DUP_OPERATOR`](../Errors.md#error-class-e_dup_operator) — Raised when the code or any alias is already registered.
#### Examples
```ts
import { EnvironmentVariableOperator } from '@litert/config-loader/operators';

loader.addOperator(new EnvironmentVariableOperator());
```

### Method `hasOperator`
Checks whether a primary operator code or alias is registered.
#### Signature
```ts
public hasOperator(operatorCode: string): boolean;
```
#### Parameters

- `operatorCode: string`

  The operator code or alias to look up.
#### Return Value
Returns `true` when the operator code is known by the loader.
#### Examples
```ts
console.log(loader.hasOperator('env'));
```

### Method `removeOperator`
Unregisters a primary operator code or alias and removes every alias that belongs to the same operator instance.
#### Signature
```ts
public removeOperator(operatorCode: string): this;
```
#### Parameters

- `operatorCode: string`

  Any registered code or alias belonging to the operator you want to remove.
#### Return Value
Returns the same `ConfigLoader` instance whether or not the code existed.
#### Examples
```ts
loader.removeOperator('env');
```

### Method `getOperatorCodes`
Returns every registered operator code, including aliases.
#### Signature
```ts
public getOperatorCodes(): string[];
```
#### Parameters

This method does not accept any parameters.
#### Return Value
Returns a string array containing the public codes visible to configuration expressions.
#### Examples
```ts
console.log(loader.getOperatorCodes());
```

### Method `load`
Loads and resolves a configuration file asynchronously either from direct path arguments or from a packed `ILoadArgs` object.
#### Signature
```ts
public load(path: string, parent?: string): Promise<unknown>;
public load(args: ILoadArgs): Promise<unknown>;
```
#### Parameters

- `path | args: string | ILoadArgs`

  Either the path to load or the packed loading arguments.

- `parent: string` (Optional)

  The parent file path to resolve relative imports and nested loads against.
#### Return Value
Returns a promise that resolves to the fully decoded and operator-resolved configuration value.


#### Error Handling

- [`E_READER_NOT_SUPPORT_ASYNC`](../Errors.md#error-class-e_reader_not_support_async) — Raised when the active reader does not implement `read()`. 
- [`E_ENCODING_NOT_FOUND`](../Errors.md#error-class-e_encoding_not_found) — Raised when the reader declares an encoding that the loader has not registered.
- [`E_DECODING_FAILED`](../Errors.md#error-class-e_decoding_failed) — Raised when a registered decoder throws while parsing input.
#### Examples
```ts
const config = await loader.load('./config.json');
console.log(config);
```

### Method `loadSync`
Synchronously loads and resolves a configuration file from either direct path arguments or a packed `ILoadArgs` object.
#### Signature
```ts
public loadSync(file: string, parent?: string): unknown;
public loadSync(args: ILoadArgs): unknown;
```
#### Parameters

- `file | args: string | ILoadArgs`

  Either the path to load or the packed loading arguments.

- `parent: string` (Optional)

  The parent file path to resolve nested file references against.
#### Return Value
Returns the decoded and operator-resolved configuration value.


#### Error Handling

- [`E_READER_NOT_SUPPORT_SYNC`](../Errors.md#error-class-e_reader_not_support_sync) — Raised when the active reader does not implement `readSync()`. 
- [`E_ENCODING_NOT_FOUND`](../Errors.md#error-class-e_encoding_not_found) — Raised when the reader declares an encoding that the loader has not registered.
- [`E_DECODING_FAILED`](../Errors.md#error-class-e_decoding_failed) — Raised when a registered decoder throws while parsing input.
#### Examples
```ts
const config = loader.loadSync('./config.json');
console.log(config);
```

### Method `loadFromObject`
Asynchronously resolves operator expressions inside an in-memory object while using a file path for relative lookups.
#### Signature
```ts
public loadFromObject(data: Record<string, unknown>, path: string, parent?: string): Promise<unknown>;
public loadFromObject(args: ILoadFromObjectArgs): Promise<unknown>;
```
#### Parameters

- `data | args: Record<string, unknown> | ILoadFromObjectArgs`

  Either the raw configuration object or the packed loading arguments.

- `path: string` (Optional)

  The contextual path used for relative reader and operator resolution.

- `parent: string` (Optional)

  The parent file path for nested resolution chains.
#### Return Value
Returns a promise that resolves to the processed configuration object or value.


#### Error Handling

- [`E_INVALID_CONFIG`](../Errors.md#error-class-e_invalid_config) — Raised when the root decoded value is not an object.
#### Examples
```ts
const config = await loader.loadFromObject({ env: '$[[env:HOME]]' }, '/tmp/demo.json');
console.log(config);
```

### Method `loadFromObjectSync`
Synchronously resolves operator expressions inside an in-memory object while using a file path for relative lookups.
#### Signature
```ts
public loadFromObjectSync(data: Record<string, unknown>, path: string, parent?: string): unknown;
public loadFromObjectSync(args: ILoadFromObjectArgs): unknown;
```
#### Parameters

- `data | args: Record<string, unknown> | ILoadFromObjectArgs`

  Either the raw configuration object or the packed loading arguments.

- `path: string` (Optional)

  The contextual path used for relative reader and operator resolution.

- `parent: string` (Optional)

  The parent file path for nested resolution chains.
#### Return Value
Returns the processed configuration object or value.


#### Error Handling

- [`E_INVALID_CONFIG`](../Errors.md#error-class-e_invalid_config) — Raised when the root decoded value is not an object.
#### Examples
```ts
const config = loader.loadFromObjectSync({ file: '$[[path:./data.txt]]' }, '/tmp/demo.json');
console.log(config);
```

## Scoped Types

### Interface `IOperatorRegistration`

Allows constructor callers to pair an operator instance with `IAddOperatorOptions` inside the initial `operators` array.

Source: [`src/lib/Loader.ts#L24-L40`](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L24-L40)

#### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `operator` | [`IOperator`](../Typings.md#interface-ioperator) | Yes | The operator instance to register. |
| `options` | [`IAddOperatorOptions`](../Typings.md#interface-iaddoperatoroptions) | No | Optional registration controls for the operator. |

### Interface `ILoaderOptions`

Supplies the reader, encoding list, operator list, and optional operator syntax overrides for the `ConfigLoader` constructor.

Source: [`src/lib/Loader.ts#L42-L84`](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L42-L84)

#### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `reader` | [`IDataReader`](../Typings.md#interface-idatareader) | Yes | The reader implementation used to resolve and read external data. |
| `encodings` | [`IEncoding`](../Typings.md#interface-iencoding)[] | Yes | The list of available decoders keyed by their `name` property. |
| `operators` | `Array<IOperator | IOperatorRegistration>` | No | Initial operators to register on the loader. |
| `opPrefix` | `string` | No | Overrides the default operator prefix `[[` variant `$[[`. |
| `opSuffix` | `string` | No | Overrides the default operator suffix `]]`. |
| `skipUnknownOperators` | `boolean` | No | Leaves unknown operator expressions untouched instead of throwing. |

### Interface `ILoadArgs`

Packs the path, optional parent, and optional context data for the path-based `load()` overloads.

Source: [`src/lib/Declaration.ts#L379-L399`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L379-L399)

#### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | `string` | Yes | The configuration file path to load. |
| `parent` | `string` | No | The parent configuration path for nested loads. |
| `contextData` | `Record<PropertyKey, unknown>` | No | A shared state bag exposed to readers and operators during the load. |

### Interface `ILoadFromObjectArgs`

Extends `ILoadArgs` with the in-memory configuration object for the `loadFromObject()` overloads.

Source: [`src/lib/Declaration.ts#L401-L411`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L401-L411)

#### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `configData` | `Record<string, unknown>` | Yes | The in-memory configuration object to resolve. |
| `path` | `string` | Yes | The contextual file path used for relative reader and operator behavior. |
| `parent` | `string` | No | The parent configuration path for nested load chains. |
| `contextData` | `Record<PropertyKey, unknown>` | No | A shared state bag exposed to readers and operators during the load. |

## Notes

- A `ConfigLoader` instance keeps its registered encodings and operators in-memory, so you can reuse it for repeated loads.
- The loader delegates sync and async work to separate internal engines, but the public surface keeps the registration API unified.
