[Documents for @litert/config-loader](../../index.md) / [Loader](../index.md) / ConfigLoader

# Class: ConfigLoader

Defined in: [src/lib/Loader.ts:89](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L89)

The loader for configuration.

## Implements

- [`ILoader`](../../Declaration/interfaces/ILoader.md)

## Constructors

### Constructor

> **new ConfigLoader**(`opts`): `ConfigLoader`

Defined in: [src/lib/Loader.ts:101](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L101)

#### Parameters

##### opts

[`ILoaderOptions`](../interfaces/ILoaderOptions.md)

#### Returns

`ConfigLoader`

## Properties

### reader

> `readonly` **reader**: [`IDataReader`](../../Declaration/interfaces/IDataReader.md)

Defined in: [src/lib/Loader.ts:99](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L99)

The reader used by the loader to read the data.

#### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`reader`](../../Declaration/interfaces/ILoader.md#reader)

## Methods

### addOperator()

> **addOperator**(`operator`, `options`): `this`

Defined in: [src/lib/Loader.ts:162](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L162)

Add a new operator to the loader.

#### Parameters

##### operator

[`IOperator`](../../Declaration/interfaces/IOperator.md)

The operator to be added to the loader.

##### options

[`IAddOperatorOptions`](../../Declaration/interfaces/IAddOperatorOptions.md) = `{}`

The options for adding the operator to the loader.

#### Returns

`this`

#### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`addOperator`](../../Declaration/interfaces/ILoader.md#addoperator)

***

### getEncodingNames()

> **getEncodingNames**(): `string`[]

Defined in: [src/lib/Loader.ts:157](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L157)

Get the list of encoding names registered in the loader.

#### Returns

`string`[]

#### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`getEncodingNames`](../../Declaration/interfaces/ILoader.md#getencodingnames)

***

### getOperatorCodes()

> **getOperatorCodes**(): `string`[]

Defined in: [src/lib/Loader.ts:216](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L216)

Get the list of operator codes registered in the loader, including the aliases.

#### Returns

`string`[]

#### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`getOperatorCodes`](../../Declaration/interfaces/ILoader.md#getoperatorcodes)

***

### hasEncoding()

> **hasEncoding**(`encodingName`): `boolean`

Defined in: [src/lib/Loader.ts:152](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L152)

Check if the loader has the given encoding registered.

#### Parameters

##### encodingName

`string`

#### Returns

`boolean`

#### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`hasEncoding`](../../Declaration/interfaces/ILoader.md#hasencoding)

***

### hasOperator()

> **hasOperator**(`operatorCode`): `boolean`

Defined in: [src/lib/Loader.ts:193](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L193)

Check if the loader has the given operator registered.

#### Parameters

##### operatorCode

`string`

#### Returns

`boolean`

#### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`hasOperator`](../../Declaration/interfaces/ILoader.md#hasoperator)

***

### load()

#### Call Signature

> **load**(`path`, `parent?`): `Promise`\<`unknown`\>

Defined in: [src/lib/Loader.ts:221](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L221)

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

##### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`load`](../../Declaration/interfaces/ILoader.md#load)

#### Call Signature

> **load**(`args`): `Promise`\<`unknown`\>

Defined in: [src/lib/Loader.ts:222](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L222)

Load a configuration (file) from the given path.

##### Parameters

###### args

[`ILoadArgs`](../../Declaration/interfaces/ILoadArgs.md)

The packed arguments for loading configuration.

##### Returns

`Promise`\<`unknown`\>

##### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`load`](../../Declaration/interfaces/ILoader.md#load)

***

### loadFromObject()

#### Call Signature

> **loadFromObject**(`data`, `path`, `parent?`): `Promise`\<`unknown`\>

Defined in: [src/lib/Loader.ts:262](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L262)

Load configuration data from the given object.

##### Parameters

###### data

`iL.IDict`

The object containing the configuration data.

###### path

`string`

The path of the configuration (file) to be loaded.

###### parent?

`string`

The path of the parent configuration (file) that is loading this configuration.

##### Returns

`Promise`\<`unknown`\>

##### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`loadFromObject`](../../Declaration/interfaces/ILoader.md#loadfromobject)

#### Call Signature

> **loadFromObject**(`args`): `Promise`\<`unknown`\>

Defined in: [src/lib/Loader.ts:263](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L263)

Load configuration data from the given object.

##### Parameters

###### args

[`ILoadFromObjectArgs`](../../Declaration/interfaces/ILoadFromObjectArgs.md)

The packed arguments for loading configuration from object.

##### Returns

`Promise`\<`unknown`\>

##### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`loadFromObject`](../../Declaration/interfaces/ILoader.md#loadfromobject)

***

### loadFromObjectSync()

#### Call Signature

> **loadFromObjectSync**(`data`, `path`, `parent?`): `unknown`

Defined in: [src/lib/Loader.ts:285](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L285)

The synchronous version of `loadFromObject()`.

##### Parameters

###### data

`iL.IDict`

###### path

`string`

###### parent?

`string`

##### Returns

`unknown`

##### See

[loadFromObject](../../Declaration/interfaces/ILoader.md#loadfromobject)

##### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`loadFromObjectSync`](../../Declaration/interfaces/ILoader.md#loadfromobjectsync)

#### Call Signature

> **loadFromObjectSync**(`args`): `unknown`

Defined in: [src/lib/Loader.ts:286](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L286)

The synchronous version of `loadFromObject()`.

##### Parameters

###### args

[`ILoadFromObjectArgs`](../../Declaration/interfaces/ILoadFromObjectArgs.md)

##### Returns

`unknown`

##### See

[loadFromObject](../../Declaration/interfaces/ILoader.md#loadfromobject)

##### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`loadFromObjectSync`](../../Declaration/interfaces/ILoader.md#loadfromobjectsync)

***

### loadSync()

#### Call Signature

> **loadSync**(`file`, `parent?`): `unknown`

Defined in: [src/lib/Loader.ts:241](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L241)

The synchronous version of `load()`.

##### Parameters

###### file

`string`

###### parent?

`string`

##### Returns

`unknown`

##### See

[load](../../Declaration/interfaces/ILoader.md#load)

##### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`loadSync`](../../Declaration/interfaces/ILoader.md#loadsync)

#### Call Signature

> **loadSync**(`args`): `unknown`

Defined in: [src/lib/Loader.ts:242](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L242)

The synchronous version of `load()`.

##### Parameters

###### args

[`ILoadArgs`](../../Declaration/interfaces/ILoadArgs.md)

##### Returns

`unknown`

##### See

[load](../../Declaration/interfaces/ILoader.md#load)

##### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`loadSync`](../../Declaration/interfaces/ILoader.md#loadsync)

***

### removeOperator()

> **removeOperator**(`operatorCode`): `this`

Defined in: [src/lib/Loader.ts:198](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L198)

#### Parameters

##### operatorCode

`string`

#### Returns

`this`
