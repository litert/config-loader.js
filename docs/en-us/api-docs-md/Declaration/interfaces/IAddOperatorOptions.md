[**Documents for @litert/config-loader**](../../README.md)

***

[Documents for @litert/config-loader](../../README.md) / [Declaration](../README.md) / IAddOperatorOptions

# Interface: IAddOperatorOptions

Defined in: [src/lib/Declaration.ts:291](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L291)

The options for adding an operator to the loader.

## Properties

### aliases?

> `optional` **aliases**: `string`[]

Defined in: [src/lib/Declaration.ts:313](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L313)

Additional aliases for the operator.

This will not override the built-in aliases, but will be added to the aliases of the operator.

***

### noBuiltInAliases?

> `optional` **noBuiltInAliases**: `boolean`

Defined in: [src/lib/Declaration.ts:306](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L306)

Ignore the built-in aliases of the operator.

If this is set to `true`, the built-in aliases of the operator will not be registered.

***

### overrideCode?

> `optional` **overrideCode**: `string`

Defined in: [src/lib/Declaration.ts:299](https://github.com/litert/config-loader.js/blob/master/src/lib/Declaration.ts#L299)

Override (replace) the operator code.

For example, if the operator code is `op1`, and you want to override it with `op2`, you can set this to `op2`.
Then the `op1` will not be registered, and the operator will be registered as `op2`.
