# Custom Data Readers

This library provides only one built-in reader, which is the [`LocalFileReader`](../../src//lib/Readers/LocalFileReader.ts).
It's useful for reading files on the local filesystem, but you may need to implement your own readers for other data sources.
For example:

- Etcd
- MySQL
- OSS services (compatible with AWS S3)
- Or even Redis?

To implement a custom reader, you need to create a class that implements the `IDataReader` interface.
The interface requires you to implement either the `read` method or the `readSync` method (or both),
but anyway, a method `resolvePath` is always required.

## Example

Let's see an example of a custom reader that reads data from a URL.

Here we will use `undici` to fetch data from a URL.

> Don't forget to install the `undici` package by `npm install undici`.

```ts
// file: HttpReader.ts
import * as ConfigLoader from '@litert/config-loader';
import * as Undici from 'undici';

export class HttpReader implements ConfigLoader.IDataReader {

    public async read(url: string): Promise<ConfigLoader.IReadResult> {
        const response = await Undici.fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const data = Buffer.from(await response.arrayBuffer());
        return { content: data, encoding: { 'yml': 'yaml', 'json': 'json' }[url.split('.').pop() ?? ''] ?? 'unknown' };
    }

    public resolvePath(refFile: string, filePath: string): string {
        // change the code if you want to implement a real one.
        return filePath;
    }
}
```

Well, as I mentioned before, the reader should only supports the asynchronous `read` method because
the network IO is always asynchronous. So the synchronous `readSync` method is not implemented here.

However, the `resolvePath` method is still required, and it should return the full path of the data to be read.
To be easy, we just return the original `filePath` here, because it's already a full URL.

Let's try to use this reader in the `ConfigLoader`:

```ts
// file: main.ts
import * as ConfigLoader from '@litert/config-loader';
import { HttpReader } from './HttpReader';
import * as BuiltInEnc from '@litert/config-loader/lib/Encodings';

process.env.TEST_ABC = '123';

(async () => {

    const ret = await loader.load(`https://litert.org/projects/config-loader.js/test-data/05-url-fetch.yml`);

    console.log(ret);
})();
```

This will fetch the data from the URL and parse it as YAML, returning the parsed object.

Now let's execute the code:

```bash
npx tsc && node main.js
```

Check the [full example code](../../src/examples/05-custom-data-reader-async.ts).
