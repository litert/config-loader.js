[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / ILoader

# Interface: ILoader

Defined in: [src/lib/Declaration.ts:375](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L375)

The interface for config loader.

## Properties

### reader

> `readonly` **reader**: [`IDataReader`](IDataReader.md)

Defined in: [src/lib/Declaration.ts:380](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L380)

The reader used by the loader to read the data.

## Methods

### addOperator()

> **addOperator**(`operator`, `options?`): `this`

Defined in: [src/lib/Declaration.ts:398](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L398)

Add a new operator to the loader.

#### Parameters

##### operator

[`IOperator`](IOperator.md)

The operator to be added to the loader.

##### options?

[`IAddOperatorOptions`](IAddOperatorOptions.md)

The options for adding the operator to the loader.

#### Returns

`this`

***

### getEncodingNames()

> **getEncodingNames**(): `string`[]

Defined in: [src/lib/Declaration.ts:390](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L390)

Get the list of encoding names registered in the loader.

#### Returns

`string`[]

***

### getOperatorCodes()

> **getOperatorCodes**(): `string`[]

Defined in: [src/lib/Declaration.ts:411](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L411)

Get the list of operator codes registered in the loader, including the aliases.

#### Returns

`string`[]

***

### hasEncoding()

> **hasEncoding**(`encodingName`): `boolean`

Defined in: [src/lib/Declaration.ts:385](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L385)

Check if the loader has the given encoding registered.

#### Parameters

##### encodingName

`string`

#### Returns

`boolean`

***

### hasOperator()

> **hasOperator**(`operatorCode`): `boolean`

Defined in: [src/lib/Declaration.ts:406](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L406)

Check if the loader has the given operator registered.

#### Parameters

##### operatorCode

`string`

#### Returns

`boolean`

***

### load()

> **load**(`path`, `parent?`): `Promise`\<`unknown`\>

Defined in: [src/lib/Declaration.ts:419](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L419)

Load a configuration (file) from the given path.

#### Parameters

##### path

`string`

The path of the configuration (file) to be loaded.

##### parent?

`string`

The path of the parent configuration (file) that is loading this configuration.

#### Returns

`Promise`\<`unknown`\>

***

### loadSync()

> **loadSync**(`path`, `parent?`): `unknown`

Defined in: [src/lib/Declaration.ts:426](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L426)

The synchronous version of `load()`.

#### Parameters

##### path

`string`

##### parent?

`string`

#### Returns

`unknown`

#### See

[ILoader.load](#load)
