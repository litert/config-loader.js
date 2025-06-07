[Documents for @litert/config-loader](../../../index.md) / [Operators/EnvironmentVariable](../index.md) / IEnvVarOperatorOptions

# Interface: IEnvVarOperatorOptions

Defined in: [src/lib/Operators/EnvironmentVariable.ts:20](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L20)

## Properties

### defaultValue?

> `optional` **defaultValue**: `string`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:28](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L28)

The default value to return if the environment variable is not defined.

If not provided, an error will be thrown if the variable is not found.

#### Default

```ts
undefined
```
