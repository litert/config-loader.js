# Custom Encodings

Though this library already provides some useful common built-in encodings:

- `json`
- `yaml`

You may still need to implement your own encodings for some specific data formats.

It's easy to implement a custom encoding, just create a class that implements the `IEncoding` interface.

## Example

Let's create a custom encoding for the INI format.

```ts
// file: IniEncoding.ts
import * as ConfigLoader from '@litert/config-loader';

export class IniEncoding implements ConfigLoader.IEncoding {

    public readonly name = 'ini';

    public decode(content: string | Buffer): unknown {

        if (typeof content !== 'string') {
            content = content.toString('utf8');
        }

        const lines = content.split('\n');

        const ret: Record<string, string> = {};

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const assignIndex = trimmed.indexOf('=');

                if (assignIndex === -1) {
                    continue;
                }

                const key = trimmed.slice(0, assignIndex).trim();
                const value = trimmed.slice(assignIndex + 1).trim();

                ret[key] = value;
            }
        }
        return ret;
    }
}
```

Now, let's try:

```ts
// file: main.ts
import * as ConfigLoader from '@litert/config-loader';
import * as BuiltInOps from '@litert/config-loader/lib/Operators';
import { LocalFileReader } from '@litert/config-loader/lib/Readers/LocalFileReader';
import { IniEncoding } from './IniEncoding';

const loader = new ConfigLoader.ConfigLoader({
    reader: new LocalFileReader({
        encodings: {
            '.ini': 'ini',
        }
    }),
    encodings: [ new IniEncoding() ],
    operators: BuiltInOps.getAllBuiltInOperators(),
});

process.env.TEST_ABC = '123';
process.env.TEST_BCD = '456';

const ret = loader.loadSync(`./test.ini`);

console.log(ret);
```

And create a test file `test.ini`:

```ini
a = $[[env:TEST_ABC]] $[[env:TEST_BCD]]
b = $[[env:TEST_BCD]]
```

Finally, run the code:

```bash
npx tsc && node main.js
```

You should see the output like this:

```json
{
    "a": "123 456",
    "b": "456"
}
```

Check the [full example code](../../src/examples/06-custom-encoding.ts).
