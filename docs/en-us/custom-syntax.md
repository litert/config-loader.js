# Custom Syntax

The default syntax of the configuration operator is `$[[<code>:<value>]]`, where the `<value>` is optional.
As you can see, the syntax contains a fixed prefix `$[[` and a fixed suffix `]]`, and they could be replaced as you like.

## Example

Let's create a test file `main.ts`.

```ts
// file:main.ts
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
    'opSuffix': '}}',
    'opPrefix': '{{',
    'encodings': BuiltInEnc.getAllBuiltInEncodings(),
    'operators': BuiltInOps.getAllBuiltInOperators(),
});

process.env.TEST_ABC = '123';
process.env.TEST_BCD = '456';

const config = loader.loadSync('./main.json');

console.log(config);
```

Here we set the `opPrefix` to `{{` and `opSuffix` to `}}`, so the syntax of the operators will be `{{<code>:<value>}}`.

Now, create a JSON file for test:

```json
{
    "from_env_abc": "{{env:TEST_ABC}}",
    "from_env_abc_and_bcd": "{{env:TEST_ABC}} {{env:TEST_BCD}}",
    "bin01": "{{base64:AAAA}}"
}
```

And then run the `main.ts`:

```bash
npx tsc && node main.js
```

You should see the output like this:

```js
{
    "from_env_abc": "123",
    "from_env_abc_and_bcd": "123 456",
    "bin01": Buffer.from([0x00, 0x00, 0x00])
}
```
