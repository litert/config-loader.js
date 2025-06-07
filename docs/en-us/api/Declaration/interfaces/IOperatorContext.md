[Documents for @litert/config-loader](../../index.md) / [Declaration](../index.md) / IOperatorContext

# Interface: IOperatorContext

Defined in: [src/lib/Declaration.ts:86](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L86)

## Properties

### currentPath

> `readonly` **currentPath**: `string`

Defined in: [src/lib/Declaration.ts:96](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L96)

The path of the current (nested) configuration (file) reading by the loader.

***

### inputData

> **inputData**: [`IVessel`](../type-aliases/IVessel.md)

Defined in: [src/lib/Declaration.ts:135](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L135)

The original input data that the operator is working on.

**WARNING always check if it's an array or an object before writing to it.**
**It's not recommended to modify this data directly, as it may cause unexpected behavior.**

***

### inputEntry

> **inputEntry**: `string` \| `number`

Defined in: [src/lib/Declaration.ts:109](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L109)

The entry of input data, where to read the data from.

- If this is an array, it should be a number.
- If this is an object, it should be a string.

***

### loader

> `readonly` **loader**: [`ILoader`](ILoader.md)

Defined in: [src/lib/Declaration.ts:101](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L101)

The instance of the loader that is reading the configuration.

***

### output

> **output**: [`IVessel`](../type-aliases/IVessel.md)

Defined in: [src/lib/Declaration.ts:127](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L127)

The output vessel that the operator should write the result into.

**WARNING always check if it's an array or an object before writing to it.**
**Use the correct method to write the data, such as `push()` for arrays or assigning a property for objects.**

***

### outputEntry

> **outputEntry**: `string` \| `number`

Defined in: [src/lib/Declaration.ts:119](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L119)

The entry of output data, where to write the result to.

- If this is an array, it should be a number, meaning the start index of the array to write the result to.
- If this is an object, it should be a string, meaning the property name of the object to write the result to.

The value of this field is only for a suggestion, depending on the operator, it may not be used at all.

***

### rootPath

> `readonly` **rootPath**: `string`

Defined in: [src/lib/Declaration.ts:91](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L91)

The path of the root configuration (file) reading by the loader.
