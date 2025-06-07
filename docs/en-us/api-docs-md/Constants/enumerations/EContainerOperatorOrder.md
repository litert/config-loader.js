[**Documents for @litert/config-loader**](../../README.md)

***

[Documents for @litert/config-loader](../../README.md) / [Constants](../README.md) / EContainerOperatorOrder

# Enumeration: EContainerOperatorOrder

Defined in: [src/lib/Constants.ts:45](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L45)

The application order of container operators.

## Enumeration Members

### AFTER

> **AFTER**: `1`

Defined in: [src/lib/Constants.ts:55](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L55)

The operator will be processed after the object is processed.

***

### BEFORE

> **BEFORE**: `0`

Defined in: [src/lib/Constants.ts:50](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L50)

The operator will be processed before the object is processed.

***

### BY\_POSITION

> **BY\_POSITION**: `2`

Defined in: [src/lib/Constants.ts:60](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L60)

The operator will be processed in the order of reading the property names (not guaranteed).
