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

> **load**(`filePath`): `Promise`\<`unknown`\>

Defined in: [src/lib/Loader.ts:221](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L221)

Load a configuration (file) from the given path.

#### Parameters

##### filePath

`string`

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

[`ILoader`](../../Declaration/interfaces/ILoader.md).[`load`](../../Declaration/interfaces/ILoader.md#load)

***

### loadSync()

> **loadSync**(`filePath`): `unknown`

Defined in: [src/lib/Loader.ts:226](https://github.com/litert/config-loader.js/blob/master/src/lib/Loader.ts#L226)

The synchronous version of `load()`.

#### Parameters

##### filePath

`string`

#### Returns

`unknown`

#### See

[ILoader.load](../../Declaration/interfaces/ILoader.md#load)

#### Implementation of

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
