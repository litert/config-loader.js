# Typings — @litert/config-loader

These shared contracts describe how readers, encodings, operators, and loaders cooperate. Import them when you build custom extensions or need exact compile-time signatures around the loading process.

[TOC]

## Import

```ts
import type {
    IOperationOptions, IEncoding, IReadResult, IDataReader,
    IOperatorContext, IOperator, IInlineOperator, IBlockOperator,
    IVessel, IContainerOperatorArgs, IContainerOperator,
    IAddOperatorOptions, ILoader
} from '@litert/config-loader';
```

## Type Alias `IOperationOptions`

Represents the parsed semicolon-delimited option bag attached to an operator expression.

Source: [`src/lib/Declaration.ts#L22-L35`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L22-L35)

### Definition

```ts
type IOperationOptions = Record<string, string | boolean>;
```


## Interface `IEncoding`

Defines the runtime decoder contract for an encoding that the loader can register.

Source: [`src/lib/Declaration.ts#L37-L51`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L37-L51)

### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | The encoding identifier, such as `json` or `yaml`. |
| `decode` | `(data: string | Buffer) => unknown` | Yes | Parses raw reader output into the decoded runtime value. |


## Interface `IReadResult`

Describes the raw payload returned by a reader before an encoding decodes it.

Source: [`src/lib/Declaration.ts#L53-L69`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L53-L69)

### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `string | Buffer` | Yes | The raw bytes or text read from the source. |
| `encoding` | `string` | Yes | The encoding name that selects a registered `IEncoding` decoder. |


## Interface `IDataReader`

Defines how the loader resolves paths and reads external data in synchronous and asynchronous flows.

Source: [`src/lib/Declaration.ts#L71-L102`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L71-L102)

### Method `read`

Reads a data source asynchronously and returns its raw content and encoding.

#### Signature

```ts
read?(dataPath: string): Promise<IReadResult>;
```

### Method `readSync`

The synchronous companion to `read()` for loaders that support sync operation.

#### Signature

```ts
readSync?(dataPath: string): IReadResult;
```

### Method `resolvePath`

Turns a relative reference into the absolute path that the reader should load next.

#### Signature

```ts
resolvePath(refFile: string, filePath: string): string;
```


## Interface `IOperatorContext`

Carries the active loader state into operator implementations so they can read nested files and write output values safely.

Source: [`src/lib/Declaration.ts#L104-L162`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L104-L162)

### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `rootPath` | `string` | Yes | The original root configuration path for the current load request. |
| `currentPath` | `string` | Yes | The file path currently being traversed. |
| `loader` | [`ILoader`](#interface-iloader) | Yes | The loader instance that is executing the operator. |
| `inputEntry` | `string | number` | Yes | The current source entry name or array index. |
| `outputEntry` | `string | number` | Yes | The destination entry name or array index suggested for the operator output. |
| `output` | [`IVessel`](#type-alias-ivessel) | Yes | The mutable vessel that receives operator output. |
| `inputData` | [`IVessel`](#type-alias-ivessel) | Yes | The original input data that the operator is traversing. |
| `contextData` | `Record<PropertyKey, unknown>` | Yes | A shared per-load bag for passing state between operators and nested loads. |


## Interface `IOperator`

Represents a public operator registration: its code, aliases, and per-mode implementations.

Source: [`src/lib/Declaration.ts#L164-L218`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L164-L218)

### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes | The primary runtime code used inside operator expressions. |
| `aliases` | `string[]` | Yes | Additional operator codes that the loader can register alongside the primary code. |
| `modes` | `{ inline?: IInlineOperator; block?: IBlockOperator; container?: IContainerOperator; }` | Yes | The execution handlers that this operator exposes for each supported mode. |


## Interface `IInlineOperator`

The contract for operators that transform inline string expressions into strings.

Source: [`src/lib/Declaration.ts#L220-L252`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L220-L252)

### Method `process`

Processes an inline operand and returns the resolved string value.

#### Signature

```ts
process(operand: string, context: IOperatorContext, options: IOperationOptions): Promise<string> | string;
```

### Method `processSync`

Processes an inline operand synchronously.

#### Signature

```ts
processSync(operand: string, context: IOperatorContext, options: IOperationOptions): string;
```


## Interface `IBlockOperator`

The contract for operators that replace an entire configuration value and write directly into the output vessel.

Source: [`src/lib/Declaration.ts#L254-L287`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L254-L287)

### Method `process`

Processes a block operand asynchronously and writes any produced value into `context.output`.

#### Signature

```ts
process(operand: string, context: IOperatorContext, options: IOperationOptions): Promise<void> | void;
```

### Method `processSync`

Processes a block operand synchronously.

#### Signature

```ts
processSync(operand: string, context: IOperatorContext, options: IOperationOptions): void;
```


## Type Alias `IVessel`

Represents the mutable object or array that the loader is currently traversing.

Source: [`src/lib/Declaration.ts#L289-L292`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L289-L292)

### Definition

```ts
type IVessel = Record<string, unknown> | unknown[];
```


## Interface `IContainerOperatorArgs`

Wraps the operand, property value, and parsed options that a container operator receives for one property.

Source: [`src/lib/Declaration.ts#L294-L321`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L294-L321)

### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `operand` | `string | null` | Yes | The optional operand segment from the operator expression. |
| `value` | `unknown` | Yes | The property value that the container operator can inspect or merge. |
| `options` | [`IOperationOptions`](#type-alias-ioperationoptions) | Yes | The parsed option bag attached to the operator expression. |


## Interface `IContainerOperator`

The contract for operators that act on whole object properties rather than inline or scalar values.

Source: [`src/lib/Declaration.ts#L323-L349`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L323-L349)

### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `order` | [`EContainerOperatorOrder`](./Constants.md#enum-econtaineroperatororder) | Yes | Specifies when the operator should run during object traversal. |

### Method `process`

Processes a container operator asynchronously.

#### Signature

```ts
process(args: IContainerOperatorArgs, context: IOperatorContext): Promise<void> | void;
```

### Method `processSync`

Processes a container operator synchronously.

#### Signature

```ts
processSync(args: IContainerOperatorArgs, context: IOperatorContext): void;
```


## Interface `IAddOperatorOptions`

Controls how the loader registers an operator code and its aliases.

Source: [`src/lib/Declaration.ts#L351-L377`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L351-L377)

### Properties

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `overrideCode` | `string` | No | Replaces the operator's primary public code during registration. |
| `noBuiltInAliases` | `boolean` | No | Skips the operator's built-in aliases when `true`. |
| `aliases` | `string[]` | No | Adds more aliases without removing the built-in ones. |


## Interface `ILoader`

Defines the public loader surface that readers and operators can depend on without coupling to the concrete `ConfigLoader` class.

Source: [`src/lib/Declaration.ts#L413-L517`](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L413-L517)

### Method `hasEncoding`

Checks whether an encoding name is registered on the loader.

#### Signature

```ts
hasEncoding(encodingName: string): boolean;
```

### Method `getEncodingNames`

Returns the registered encoding names.

#### Signature

```ts
getEncodingNames(): string[];
```

### Method `addOperator`

Registers a public operator implementation.

#### Signature

```ts
addOperator(operator: IOperator, options?: IAddOperatorOptions): this;
```

### Method `hasOperator`

Checks whether an operator code or alias is registered.

#### Signature

```ts
hasOperator(operatorCode: string): boolean;
```

### Method `getOperatorCodes`

Returns every registered operator code, including aliases.

#### Signature

```ts
getOperatorCodes(): string[];
```

### Method `load`

Loads a configuration file asynchronously from a path or packed arguments object.

#### Signature

```ts
load(path: string, parent?: string): Promise<unknown>;
load(args: ILoadArgs): Promise<unknown>;
```

### Method `loadSync`

Loads a configuration file synchronously from a path or packed arguments object.

#### Signature

```ts
loadSync(path: string, parent?: string): unknown;
loadSync(args: ILoadArgs): unknown;
```

### Method `loadFromObject`

Loads configuration data asynchronously from an in-memory object.

#### Signature

```ts
loadFromObject(data: Record<string, unknown>, path: string, parent?: string): Promise<unknown>;
loadFromObject(args: ILoadFromObjectArgs): Promise<unknown>;
```

### Method `loadFromObjectSync`

Loads configuration data synchronously from an in-memory object.

#### Signature

```ts
loadFromObjectSync(data: Record<string, unknown>, path: string, parent?: string): unknown;
loadFromObjectSync(args: ILoadFromObjectArgs): unknown;
```
