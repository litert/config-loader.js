[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / ILoader

# Interface: ILoader

Defined in: [src/lib/Declaration.ts:416](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L416)

The interface for config loader.

## Properties

### reader

> `readonly` **reader**: [`IDataReader`](IDataReader.md)

Defined in: [src/lib/Declaration.ts:421](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L421)

The reader used by the loader to read the data.

## Methods

### addOperator()

> **addOperator**(`operator`, `options?`): `this`

Defined in: [src/lib/Declaration.ts:439](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L439)

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

Defined in: [src/lib/Declaration.ts:431](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L431)

Get the list of encoding names registered in the loader.

#### Returns

`string`[]

***

### getOperatorCodes()

> **getOperatorCodes**(): `string`[]

Defined in: [src/lib/Declaration.ts:452](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L452)

Get the list of operator codes registered in the loader, including the aliases.

#### Returns

`string`[]

***

### hasEncoding()

> **hasEncoding**(`encodingName`): `boolean`

Defined in: [src/lib/Declaration.ts:426](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L426)

Check if the loader has the given encoding registered.

#### Parameters

##### encodingName

`string`

#### Returns

`boolean`

***

### hasOperator()

> **hasOperator**(`operatorCode`): `boolean`

Defined in: [src/lib/Declaration.ts:447](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L447)

Check if the loader has the given operator registered.

#### Parameters

##### operatorCode

`string`

#### Returns

`boolean`

***

### load()

#### Call Signature

> **load**(`path`, `parent?`): `Promise`\<`unknown`\>

Defined in: [src/lib/Declaration.ts:460](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L460)

Load a configuration (file) from the given path.

##### Parameters

###### path

`string`

The path of the configuration (file) to be loaded.

###### parent?

`string`

The path of the parent configuration (file) that is loading this configuration.

##### Returns

`Promise`\<`unknown`\>

#### Call Signature

> **load**(`args`): `Promise`\<`unknown`\>

Defined in: [src/lib/Declaration.ts:467](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L467)

Load a configuration (file) from the given path.

##### Parameters

###### args

[`ILoadArgs`](ILoadArgs.md)

The packed arguments for loading configuration.

##### Returns

`Promise`\<`unknown`\>

***

### loadFromObject()

#### Call Signature

> **loadFromObject**(`data`, `path`, `parent?`): `Promise`\<`unknown`\>

Defined in: [src/lib/Declaration.ts:495](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L495)

Load configuration data from the given object.

##### Parameters

###### data

`dT.IDict`

The object containing the configuration data.

###### path

`string`

The path of the configuration (file) to be loaded.

###### parent?

`string`

The path of the parent configuration (file) that is loading this configuration.

##### Returns

`Promise`\<`unknown`\>

#### Call Signature

> **loadFromObject**(`args`): `Promise`\<`unknown`\>

Defined in: [src/lib/Declaration.ts:502](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L502)

Load configuration data from the given object.

##### Parameters

###### args

[`ILoadFromObjectArgs`](ILoadFromObjectArgs.md)

The packed arguments for loading configuration from object.

##### Returns

`Promise`\<`unknown`\>

***

### loadFromObjectSync()

#### Call Signature

> **loadFromObjectSync**(`data`, `path`, `parent?`): `unknown`

Defined in: [src/lib/Declaration.ts:509](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L509)

The synchronous version of `loadFromObject()`.

##### Parameters

###### data

`dT.IDict`

###### path

`string`

###### parent?

`string`

##### Returns

`unknown`

##### See

[loadFromObject](#loadfromobject)

#### Call Signature

> **loadFromObjectSync**(`args`): `unknown`

Defined in: [src/lib/Declaration.ts:516](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L516)

The synchronous version of `loadFromObject()`.

##### Parameters

###### args

[`ILoadFromObjectArgs`](ILoadFromObjectArgs.md)

##### Returns

`unknown`

##### See

[loadFromObject](#loadfromobject)

***

### loadSync()

#### Call Signature

> **loadSync**(`args`): `unknown`

Defined in: [src/lib/Declaration.ts:476](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L476)

The synchronous version of `load()`.

##### Parameters

###### args

[`ILoadArgs`](ILoadArgs.md)

The packed arguments for loading configuration.

##### Returns

`unknown`

##### See

[load](#load)

#### Call Signature

> **loadSync**(`path`, `parent?`): `unknown`

Defined in: [src/lib/Declaration.ts:486](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L486)

The synchronous version of `load()`.

##### Parameters

###### path

`string`

The path of the configuration (file) to be loaded.

###### parent?

`string`

The path of the parent configuration (file) that is loading this configuration.

##### Returns

`unknown`

##### See

[load](#load)
