# Constants — @litert/config-loader

These enums define the runtime categories that the loader uses to decide how operators execute.

[TOC]

## Enum `EOperatorMode`

Classifies operator implementations by the kind of configuration expression they handle.

Source: [`src/lib/Constants.ts#L17-L40`](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L17-L40)

### Import

```ts
import { EOperatorMode } from '@litert/config-loader';
```

### Values

| Name | Value | Description |
| --- | --- | --- |
| `EOperatorMode.INLINE` | `'inline'` | Handles inline string interpolation and returns a string value. |
| `EOperatorMode.BLOCK` | `'block'` | Handles whole-value expressions and can write any runtime value to the output vessel. |
| `EOperatorMode.CONTAINER` | `'container'` | Handles object-property container operations whose return value is ignored. |

## Enum `EContainerOperatorOrder`

Controls when a container operator runs relative to the rest of the object traversal.

Source: [`src/lib/Constants.ts#L42-L61`](https://github.com/litert/config-loader.js/blob/master/src/lib/Constants.ts#L42-L61)

### Import

```ts
import { EContainerOperatorOrder } from '@litert/config-loader';
```

### Values

| Name | Value | Description |
| --- | --- | --- |
| `EContainerOperatorOrder.BEFORE` | `0` | Runs before the object body is processed. |
| `EContainerOperatorOrder.AFTER` | `1` | Runs after the object body is processed. |
| `EContainerOperatorOrder.BY_POSITION` | `2` | Runs according to property-name traversal order when the operator needs in-place behavior. |
