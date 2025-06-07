[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / ILoader

# Interface: ILoader

Defined in: [src/lib/Declaration.ts:319](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L319)

The interface for config loader.

## Properties

### reader

> `readonly` **reader**: [`IDataReader`](IDataReader.md)

Defined in: [src/lib/Declaration.ts:324](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L324)

The reader used by the loader to read the data.

## Methods

### addOperator()

> **addOperator**(`operator`, `options?`): `this`

Defined in: [src/lib/Declaration.ts:342](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L342)

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

Defined in: [src/lib/Declaration.ts:334](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L334)

Get the list of encoding names registered in the loader.

#### Returns

`string`[]

***

### getOperatorCodes()

> **getOperatorCodes**(): `string`[]

Defined in: [src/lib/Declaration.ts:355](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L355)

Get the list of operator codes registered in the loader, including the aliases.

#### Returns

`string`[]

***

### hasEncoding()

> **hasEncoding**(`encodingName`): `boolean`

Defined in: [src/lib/Declaration.ts:329](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L329)

Check if the loader has the given encoding registered.

#### Parameters

##### encodingName

`string`

#### Returns

`boolean`

***

### hasOperator()

> **hasOperator**(`operatorCode`): `boolean`

Defined in: [src/lib/Declaration.ts:350](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L350)

Check if the loader has the given operator registered.

#### Parameters

##### operatorCode

`string`

#### Returns

`boolean`

***

### load()

> **load**(`path`, `parent?`): `Promise`\<`unknown`\>

Defined in: [src/lib/Declaration.ts:363](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L363)

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

Defined in: [src/lib/Declaration.ts:370](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L370)

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
