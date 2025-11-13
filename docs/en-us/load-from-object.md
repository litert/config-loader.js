# Load From Object

For some cases, you may want to load configuration data directly from an in-memory object
instead of from a file. The `ConfigLoader` provides methods to achieve this.

## Example

Let's create a test file `main.ts`.

```ts
// file:main.ts
import { ConfigLoader } from '@litert/config-loader';
import { LocalFileReader } from '@litert/config-loader/lib/Readers/LocalFileReader';
import * as BuiltInEnc from '@litert/config-loader/lib/Encodings';
import * as BuiltInOps from '@litert/config-loader/lib/Operators';

const loader = new ConfigLoader({
    'reader': new LocalFileReader({
        'encodings': {
            '.json': 'json',
            '.yaml': 'yaml',
            '.yml': 'yaml',
        }
    }),
    'opSuffix': '))',
    'opPrefix': '((',
    'encodings': BuiltInEnc.getAllBuiltInEncodings(),
    'operators': BuiltInOps.getAllBuiltInOperators(),
});

process.env.TEST_ABC = '123';
process.env.TEST_BCD = '456';

const ret = loader.loadFromObjectSync({
    "from_env_abc": "{{env:TEST_ABC}}",
    "from_env_abc_and_bcd": "{{env:TEST_ABC}} {{env:TEST_BCD}}",
    "bin01": "{{base64:AAAA}}",
    "file1": "{{import:./file1.yml}}",
    "d": "This will overwrite d in file1.yml",
    "{{extends}}": "./file1.yml",
    "extendsInNest": {
        "{{extends}}": [
            "./file1.yml",
            "./file2.yml"
        ],
        "extendsInArray": [1, 2, "{{extends:file3.json}}", 3]
    },
    "importInArray": [1, 2, 3, "{{import:file1.yml}}", "{{base64:AAAABBBB}}"],
    "importFileAsText": "{{text-file:./file1.yml}}",
    "importFileAsBinary": "{{binary-file:./file1.yml}}",
    "resolveRelativePath": "{{ path :./a/b/c}}"
},`${__dirname}/../test-data/07/main.json`);

console.log(ret);
```

Check the [full example code](../../src/examples/08-load-from-object.ts).
