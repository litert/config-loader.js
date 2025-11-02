[Documents for @litert/config-loader](../../../index.md) / [Operators/EnvironmentVariable](../index.md) / IEnvVarOperatorOptions

# Interface: IEnvVarOperatorOptions

Defined in: [src/lib/Operators/EnvironmentVariable.ts:22](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L22)

## Properties

### defaultValue?

> `optional` **defaultValue**: `string`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:30](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L30)

The default value to return if the environment variable is not defined.

If not provided, an error will be thrown if the variable is not found.

#### Default

```ts
undefined
```

***

### readEnv()?

> `optional` **readEnv**: (`name`) => `undefined` \| `null` \| `string`

Defined in: [src/lib/Operators/EnvironmentVariable.ts:40](https://github.com/litert/config-loader.js/blob/master/src/lib/Operators/EnvironmentVariable.ts#L40)

A custom function to read environment variables.

This is useful in scenarios where environment variables are read from an
alternative source other than the default `process.env`.

#### Parameters

##### name

`string`

#### Returns

`undefined` \| `null` \| `string`

#### Default

```ts
(name) => process.env[name]
```
