[**Documents for @litert/config-loader**](../../README.md)

***

[Documents for @litert/config-loader](../../README.md) / [Constants](../README.md) / EOperatorMode

# Enumeration: EOperatorMode

Defined in: [src/lib/Constants.ts:20](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L20)

The working mode of an operator.

## Enumeration Members

### BLOCK

> **BLOCK**: `"block"`

Defined in: [src/lib/Constants.ts:32](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L32)

For block mode, the operand must be a string, and the result could be anything.
e.g. `{ "a": "$[[op1:operand]]" }`

***

### CONTAINER

> **CONTAINER**: `"container"`

Defined in: [src/lib/Constants.ts:39](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L39)

For container mode, the operand could be anything, and the result will be ignored.

e.g. `{ "$[[op1]]": ... }`

***

### INLINE

> **INLINE**: `"inline"`

Defined in: [src/lib/Constants.ts:26](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L26)

For inline mode, the operand must be a string, and the result must be a string.
e.g. `"$[[op1:operand]] and $[[op2:operand]]"`
