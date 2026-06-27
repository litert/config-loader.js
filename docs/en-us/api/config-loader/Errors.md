# Errors — @litert/config-loader

The loader surface uses one shared base class plus focused subclasses for reader, decoder, operator, and validation failures. Catch these errors when you need programmatic recovery or richer diagnostics.

[TOC]

## Error Class `ConfigLoaderError`

The abstract base class for the built-in loader error hierarchy.

Source: [`src/lib/Errors.ts#L17-L41`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L17-L41)

### Import

```ts
import { ConfigLoaderError } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | A machine-readable error code such as `dup_operator`. |
| `message` | `string` | A stable human-readable message for the failure category. |
| `ctx` | `Record<string, unknown>` | Structured diagnostic context attached by the throwing code. |
| `origin` | `unknown` | The wrapped original error, when the failure originates from another API. |

### Example

```ts
try {
    throw new ConfigLoaderError('demo', 'Example', {});
} catch (error) {
    console.error(error.name);
}
```

## Error Class `E_READ_FILE_FAILED`

Thrown when a reader cannot read the requested file or cannot derive its extension.

Source: [`src/lib/Errors.ts#L43-L54`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L43-L54)

### Import

```ts
import { E_READ_FILE_FAILED } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_READ_FILE_FAILED
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_READ_FILE_FAILED } from '@litert/config-loader';

try {
    throw new E_READ_FILE_FAILED({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_READ_FILE_FAILED) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_DUP_ENCODING`

Thrown when two registered encodings share the same runtime `name`.

Source: [`src/lib/Errors.ts#L56-L67`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L56-L67)

### Import

```ts
import { E_DUP_ENCODING } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_DUP_ENCODING
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_DUP_ENCODING } from '@litert/config-loader';

try {
    throw new E_DUP_ENCODING({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_DUP_ENCODING) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_ENCODING_NOT_FOUND`

Thrown when the loader cannot find a decoder for a declared encoding name.

Source: [`src/lib/Errors.ts#L69-L80`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L69-L80)

### Import

```ts
import { E_ENCODING_NOT_FOUND } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_ENCODING_NOT_FOUND
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_ENCODING_NOT_FOUND } from '@litert/config-loader';

try {
    throw new E_ENCODING_NOT_FOUND({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_ENCODING_NOT_FOUND) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_DUP_OPERATOR`

Thrown when an operator code or alias is registered more than once.

Source: [`src/lib/Errors.ts#L82-L93`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L82-L93)

### Import

```ts
import { E_DUP_OPERATOR } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_DUP_OPERATOR
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_DUP_OPERATOR } from '@litert/config-loader';

try {
    throw new E_DUP_OPERATOR({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_DUP_OPERATOR) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_INVALID_OPERATOR`

Thrown when an operator code contains unsupported characters.

Source: [`src/lib/Errors.ts#L95-L106`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L95-L106)

### Import

```ts
import { E_INVALID_OPERATOR } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_INVALID_OPERATOR
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_INVALID_OPERATOR } from '@litert/config-loader';

try {
    throw new E_INVALID_OPERATOR({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_INVALID_OPERATOR) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_OPERATOR_NOT_FOUND`

Thrown when a configuration references an operator that is not registered.

Source: [`src/lib/Errors.ts#L108-L119`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L108-L119)

### Import

```ts
import { E_OPERATOR_NOT_FOUND } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_OPERATOR_NOT_FOUND
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_OPERATOR_NOT_FOUND } from '@litert/config-loader';

try {
    throw new E_OPERATOR_NOT_FOUND({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_OPERATOR_NOT_FOUND) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_OPERATOR_MODE_MISMATCH`

Thrown when an operator is used in a mode that it does not implement.

Source: [`src/lib/Errors.ts#L121-L132`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L121-L132)

### Import

```ts
import { E_OPERATOR_MODE_MISMATCH } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_OPERATOR_MODE_MISMATCH
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_OPERATOR_MODE_MISMATCH } from '@litert/config-loader';

try {
    throw new E_OPERATOR_MODE_MISMATCH({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_OPERATOR_MODE_MISMATCH) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_DECODING_FAILED`

Thrown when an encoding decoder fails while parsing reader output.

Source: [`src/lib/Errors.ts#L134-L145`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L134-L145)

### Import

```ts
import { E_DECODING_FAILED } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_DECODING_FAILED
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_DECODING_FAILED } from '@litert/config-loader';

try {
    throw new E_DECODING_FAILED({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_DECODING_FAILED) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_INVALID_CONFIG`

Thrown when the decoded configuration root is not an object.

Source: [`src/lib/Errors.ts#L147-L158`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L147-L158)

### Import

```ts
import { E_INVALID_CONFIG } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_INVALID_CONFIG
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_INVALID_CONFIG } from '@litert/config-loader';

try {
    throw new E_INVALID_CONFIG({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_INVALID_CONFIG) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_READER_NOT_SUPPORT_SYNC`

Thrown when synchronous loading is requested from a reader without `readSync()`.

Source: [`src/lib/Errors.ts#L160-L171`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L160-L171)

### Import

```ts
import { E_READER_NOT_SUPPORT_SYNC } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_READER_NOT_SUPPORT_SYNC
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_READER_NOT_SUPPORT_SYNC } from '@litert/config-loader';

try {
    throw new E_READER_NOT_SUPPORT_SYNC({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_READER_NOT_SUPPORT_SYNC) {
        console.error(error.ctx);
    }
}
```

## Error Class `E_READER_NOT_SUPPORT_ASYNC`

Thrown when asynchronous loading is requested from a reader without `read()`.

Source: [`src/lib/Errors.ts#L173-L184`](https://github.com/litert/config-loader.js/blob/master/src/lib/Errors.ts#L173-L184)

### Import

```ts
import { E_READER_NOT_SUPPORT_ASYNC } from '@litert/config-loader';
```

### Inheritance

```text
Error -> ConfigLoaderError -> E_READER_NOT_SUPPORT_ASYNC
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | The stable error code defined by the class. |
| `message` | `string` | The fixed failure message for this error category. |
| `ctx` | `Record<string, unknown>` | The contextual fields supplied by the loader, reader, or operator that raised the error. |
| `origin` | `unknown` | The original wrapped error when one exists. |

### Example

```ts
import { E_READER_NOT_SUPPORT_ASYNC } from '@litert/config-loader';

try {
    throw new E_READER_NOT_SUPPORT_ASYNC({ reason: 'demo' });
} catch (error) {
    if (error instanceof E_READER_NOT_SUPPORT_ASYNC) {
        console.error(error.ctx);
    }
}
```
