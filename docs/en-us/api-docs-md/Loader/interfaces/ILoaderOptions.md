[**Documents for @litert/config-loader**](../../README.md)

***

[Documents for @litert/config-loader](../../README.md) / [Loader](../README.md) / ILoaderOptions

# Interface: ILoaderOptions

Defined in: [src/lib/Loader.ts:47](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L47)

The options for the loader.

## See

[ConfigLoader](../classes/ConfigLoader.md)

## Properties

### encodings

> **encodings**: [`IEncoding`](../../Declaration/interfaces/IEncoding.md)[]

Defined in: [src/lib/Loader.ts:57](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L57)

The encodings to be registered in the loader.

***

### operators?

> `optional` **operators**: ([`IOperator`](../../Declaration/interfaces/IOperator.md) \| [`IOperatorRegistration`](IOperatorRegistration.md))[]

Defined in: [src/lib/Loader.ts:62](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L62)

The operators to be registered in the loader.

***

### opPrefix?

> `optional` **opPrefix**: `string`

Defined in: [src/lib/Loader.ts:67](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L67)

#### Default

```ts
'$[['
```

***

### opSuffix?

> `optional` **opSuffix**: `string`

Defined in: [src/lib/Loader.ts:72](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L72)

#### Default

```ts
']]'
```

***

### reader

> **reader**: [`IDataReader`](../../Declaration/interfaces/IDataReader.md)

Defined in: [src/lib/Loader.ts:52](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L52)

The data reader to be used by the loader.
