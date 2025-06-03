# Quick Start

This library provides a simple way to load configuration files using dynamic data operators.

## Installation

```bash
npm i @litert/config-loader
npm i yaml # Optional, for YAML support
```

## Usage

1. Create a loader

    ```ts
    // quick-start.ts
    import { ConfigLoader } from '@litert/config-loader';
    import { LocalFileReader } from '@litert/config-loader/lib/Readers/LocalFileReader';
    import * as BuiltInEnc from '@litert/config-loader/lib/Encodings';
    import * as BuiltInOps from '@litert/config-loader/lib/BuiltInOperators';

    const loader = new ConfigLoader({
        'reader': new LocalFileReader({
            'encodings': {
                '.json': 'json',
                '.yaml': 'yaml',
                '.yml': 'yaml',
            }
        }),
        'encodings': BuiltInEnc.getAllBuiltInEncodings(),
        'operators': BuiltInOps.getAllBuiltInOperators(),
    });

    process.env.TEST_ABC = '123';
    process.env.TEST_BCD = '456';

    const config = loader.loadSync('./main.json');

    console.log(config);
    ```

2. Create configuration files

    - `main.json`

        ```json
        {
            "from_env_abc": "$[[env:TEST_ABC]]",
            "from_env_abc_and_bcd": "$[[env:TEST_ABC]] $[[env:TEST_BCD]]",
            "bin01": "$[[base64:AAAA]]",
            "file1": "$[[import:./file1.yml]]",
            "d": "This will overwrite d in file1.yml",
            "$[[extends]]": "./file1.yml",
            "extendsInNest": {
                "$[[extends]]": [
                    "./file1.yml",
                    "./file2.yml"
                ],
                "extendsInArray": [1, 2, "$[[extends:file3.json]]", 3]
            },
            "importInArray": [1, 2, 3, "$[[import:file1.yml]]"],
            "importFileAsText": "$[[text-file:./file1.yml]]",
            "importFileAsBinary": "$[[binary-file:./file1.yml]]",
            "resolveRelativePath": "$[[path:./a/b/c]]"
        }
        ```

    - `file1.yml`

        ```yml
        a: 123
        b: false
        d: '$[[env:TEST_ABC]]'
        ```

    - `file2.yml`

        ```yml
        a: 321
        f: test
        g: null
        h: false
        i: true
        k: $[[hex:123456ffaabb]]
        ```

    - `file3.json`

        ```json
        ["a", false, "b", 2333]
        ```

3. Run the script

    ```bash
    node quick-start.ts
    ```

    You can see the effects of all built-in operators in the output:

Check the full example code:

- [Asynchronous mode](../../src/examples/01-quick-start/async.ts)
- [Synchronous mode](../../src/examples/01-quick-start/sync.ts)

## What's Next?

- Read the usage of built-in operators in the [Built-In Operators](./built-in-operators.md) section.
- Read the API documentation of the library in the [API Documentation](https://litert.org/projects/config-loader.js/api-docs/).
- Create a custom operator by reading the [Custom Operators](./custom-operators.md) section.
- Create a custom data reader by reading the [Custom Readers](./custom-readers.md) section.
- Create a custom encoding by reading the [Custom Encodings](./custom-encodings.md) section.
