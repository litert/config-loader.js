[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IOperatorContext

# Interface: IOperatorContext

Defined in: [src/lib/Declaration.ts:107](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L107)

The interface type of the context passed to operators by the loader.

## Properties

### contextData

> **contextData**: `dT.IDict`

Defined in: [src/lib/Declaration.ts:161](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L161)

The data of context, during this loading process.

***

### currentPath

> `readonly` **currentPath**: `string`

Defined in: [src/lib/Declaration.ts:117](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L117)

The path of the current (nested) configuration (file) reading by the loader.

***

### inputData

> **inputData**: [`IVessel`](../type-aliases/IVessel.md)

Defined in: [src/lib/Declaration.ts:156](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L156)

The original input data that the operator is working on.

**WARNING always check if it's an array or an object before writing to it.**
**It's not recommended to modify this data directly, as it may cause unexpected behavior.**

***

### inputEntry

> **inputEntry**: `string` \| `number`

Defined in: [src/lib/Declaration.ts:130](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L130)

The entry of input data, where to read the data from.

- If this is an array, it should be a number.
- If this is an object, it should be a string.

***

### loader

> `readonly` **loader**: [`ILoader`](ILoader.md)

Defined in: [src/lib/Declaration.ts:122](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L122)

The instance of the loader that is reading the configuration.

***

### output

> **output**: [`IVessel`](../type-aliases/IVessel.md)

Defined in: [src/lib/Declaration.ts:148](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L148)

The output vessel that the operator should write the result into.

**WARNING always check if it's an array or an object before writing to it.**
**Use the correct method to write the data, such as `push()` for arrays or assigning a property for objects.**

***

### outputEntry

> **outputEntry**: `string` \| `number`

Defined in: [src/lib/Declaration.ts:140](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L140)

The entry of output data, where to write the result to.

- If this is an array, it should be a number, meaning the start index of the array to write the result to.
- If this is an object, it should be a string, meaning the property name of the object to write the result to.

The value of this field is only for a suggestion, depending on the operator, it may not be used at all.

***

### rootPath

> `readonly` **rootPath**: `string`

Defined in: [src/lib/Declaration.ts:112](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L112)

The path of the root configuration (file) reading by the loader.
