[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / ILoadFromObjectArgs

# Interface: ILoadFromObjectArgs

Defined in: [src/lib/Declaration.ts:405](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L405)

The interface type for the packed arguments for loading configuration from
the given object.

## Extends

- [`ILoadArgs`](ILoadArgs.md)

## Properties

### configData

> **configData**: `dT.IDict`

Defined in: [src/lib/Declaration.ts:410](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L410)

The object containing the configuration data.

***

### contextData?

> `optional` **contextData**: `IDict`\<`any`, `string` \| `number` \| `symbol`\>

Defined in: [src/lib/Declaration.ts:398](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L398)

The context data passed to the loader and operators, will be used as `context.data`.

#### Inherited from

[`ILoadArgs`](ILoadArgs.md).[`contextData`](ILoadArgs.md#contextdata)

***

### parent?

> `optional` **parent**: `string`

Defined in: [src/lib/Declaration.ts:393](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L393)

The path of the parent configuration (file) that is loading this configuration.

#### Inherited from

[`ILoadArgs`](ILoadArgs.md).[`parent`](ILoadArgs.md#parent)

***

### path

> **path**: `string`

Defined in: [src/lib/Declaration.ts:388](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L388)

The path of the configuration (file) to be loaded.

#### Inherited from

[`ILoadArgs`](ILoadArgs.md).[`path`](ILoadArgs.md#path)
