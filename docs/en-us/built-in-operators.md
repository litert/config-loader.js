# Built-In Operators

This library provides a set of built-in operators that can be used to perform various operations on configuration data.

> The code of these operators could be overridden in the options of the `ILoader.addOperator` method, allowing you to customize their behavior or implement your own operators.

## Usage

You can import the built-in operators by 2 ways:

### Import all

It's easy to import all built-in operators at once.

```ts
import * as BuiltInOps from '@litert/config-loader/lib/Operators';

BuiltInOps.registerAllBuiltInOperators(loader);
```

### Import certain operators

Or you can import them ony by one as needed, especially when you need to customize the behavior of some built-int operators (e.g. `EnvironmentVariableOperator` could have a default value instead of throwing exceptions).

```ts
import * as BuiltInOps from '@litert/config-loader/lib/Operators';

loader.addOperators(new BuiltInOps.DecodeHexOperator());
```

## List of Built-In Operators

### Read Environment Variable

| Property | Value |
| -------- | ----- |
| Code     | `env` |
| Syntax   | `$[[env:<variable-name>]]` |
| Type     | Inline Operator |

This operator reads the value of an environment variable.

#### Example

```yml
# file: /data/a/b/config.yml
demoEnv: $[[env:MY_ENV_VAR]]
```
Result:

```js
{ "demoEnv": process.env.MY_ENV_VAR }
```

#### Options

```ts
interface IEnvironmentVariableOperatorOptions {

    /**
     * The default value to return if the environment variable is not set.
     */
    defaultValue?: string;
}
```

If the `defaultValue` is set to a string (even empty), the operator will return this value instead of throwing an error when the environment variable is not found/set.

### Resolve (Relative) Path

| Property | Value |
| -------- | ----- |
| Code     | `path` |
| Syntax   | `$[[path:<relative-path>]]` |
| Type     | Inline Operator |

This operator resolves a relative path against the current working directory.

#### Example

```yml
# file: /data/a/b/config.yml
demoFile: $[[path:../../the/relative/path]]
demoFile2: Read '$[[path:../../README.md]]' for more information.
```

Result:

```js
{
    "demoFile": "/data/the/relative/path",
    "demoFile2": "Read '/data/README.md' for more information."
}
```

### Decode Hexadecimal (as binary)

| Property | Value |
| -------- | ----- |
| Code     | `hex` |
| Syntax   | `$[[hex:<hexadecimal-string>]]` |
| Type     | Block Operator |

This operator decodes a hexadecimal string into its binary representation.

#### Example

```yml
# file: /data/a/b/config.yml
data: $[[hex:48656c6c6f20576f726c64]]
```

Result:

```js
{ "data": Buffer.from('Hello World') }
```

### Decode Base64

| Property | Value |
| -------- | ----- |
| Code     | `base64` |
| Syntax   | `$[[base64:<base64-string>]]` |
| Type     | Block Operator |

This operator decodes a Base64-encoded string into its original representation.

#### Example

```yml
data: $[[base64:SGVsbG8gV29ybGQ=]]
```

Result:

```js
{ "data": Buffer.from('Hello World') }
```

### Import Configuration

| Property | Value |
| -------- | ----- |
| Code     | `import` |
| Syntax   | `$[[import:<relative-file-path>]]` |
| Type     | Block Operator |

This operator imports configuration data from another file, into the determined position of a configuration file.

#### Example

There are two files:

```yml
# file: /data/a/b/config.yml
importedData: $[[import:../imported.yml]]
```

```yml
# file: /data/a/imported.yml
a: 123
b: false
c: "Hello World"
```

Result:

```js
{
    "importedData": {
        "a": 123,
        "b": false,
        "c": "Hello World"
    }
}
```

### Extends Another Configuration

This operator supports 2 modes:

- Block mode

    Under this mode, it could be used in arrays, to extend another array configuration file into the current position of the current array.

- Container mode

    Under this mode, it could be used in an object property name, to extend another configuration file into the current object.

#### Container Mode

| Property | Value |
| -------- | ----- |
| Code     | `extends` |
| Syntax 1 | `$[[extends]]: <file-path>` |
| Syntax 2 | `$[[extends]]: [<file1-path>, <file2-path>, ...]` |
| Type     | Container Operator |

##### Example

```yml
# file: /data/a/b/config.yml
$[[extends]]: ../extended.yml
a: 123
b: false
```

```yml
# file: /data/a/extended.yml
a: 321
c: "Hello World"
```

Result:

```js
{
    "a": 123, // overridden by the current file
    "b": false,
    "c": "Hello World"
}
```

> The properties extended from other files, will be overridden by the current file if they have the same property names.
>
> And, if there are multiples files will be extended, the next file will override the previous one if they have the same property names.

#### Block Mode

| Property | Value |
| -------- | ----- |
| Code     | `extends` |
| Syntax   | `$[[extends:<relative-file-path>]]` |
| Type     | Block Operator |

##### Example

```yml
# file: /data/a/b/config.yml
data:
  - 123
  - $[[extends:../extended-1.yml]]
  - false
  - $[[extends:../extended-2.yml]]
  - 'abc'
```

```yml
# file: /data/a/extended-1.yml
- 456
- "Hello"
```

```yml
# file: /data/a/extended-2.yml
- 999
- "World"
```

Result:

```js
{
    "data": [
        123,
        456,
        "Hello",
        false,
        999,
        "World",
        "abc"
    ]
}
```

> We can see that, the `extends` operator will import and expand the array from the extended file into the current position of the current array.

### Import Binary File

| Property | Value |
| -------- | ----- |
| Code     | `binary-file` |
| Syntax   | `$[[binary-file:<relative-file-path>]]` |
| Type     | Block Operator |

This operator imports a binary file and returns its content as a Buffer.

#### Example

```yml
# file: /data/a/b/config.yml
binaryData: $[[binary-file:../data.bin]]
```

Result:

```js
{
    "binaryData": Buffer.from([...]) // The content of the binary file
}
```

### Import Text File

| Property | Value |
| -------- | ----- |
| Code     | `text-file` |
| Syntax   | `$[[text-file:<relative-file-path>]]` |
| Type     | Inline Operator |

This operator imports a text file and returns its content as a string.

#### Example

```yml
# file: /data/a/b/config.yml
textData: $[[text-file:../data.txt]]
```
Result:

```js
{
    "textData": "The content of the text file"
}
```
