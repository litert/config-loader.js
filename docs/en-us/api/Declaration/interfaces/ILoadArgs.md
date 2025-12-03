[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / ILoadArgs

# Interface: ILoadArgs

Defined in: [src/lib/Declaration.ts:383](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L383)

The interface type for the packed arguments for loading configuration from
the given path.

## Extended by

- [`ILoadFromObjectArgs`](ILoadFromObjectArgs.md)

## Properties

### contextData?

> `optional` **contextData**: `IDict`\<`any`, `string` \| `number` \| `symbol`\>

Defined in: [src/lib/Declaration.ts:398](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L398)

The context data passed to the loader and operators, will be used as `context.data`.

***

### parent?

> `optional` **parent**: `string`

Defined in: [src/lib/Declaration.ts:393](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L393)

The path of the parent configuration (file) that is loading this configuration.

***

### path

> **path**: `string`

Defined in: [src/lib/Declaration.ts:388](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L388)

The path of the configuration (file) to be loaded.
