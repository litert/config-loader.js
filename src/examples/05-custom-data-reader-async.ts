import * as ConfigLoader from '../lib';
import * as BuiltInEnc from '../lib/Encodings';
import * as BuiltInOps from '../lib/Operators';
import * as Undici from 'undici';

class HttpReader implements ConfigLoader.IDataReader {

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

const loader = new ConfigLoader.ConfigLoader({
    reader: new HttpReader(),
    encodings: BuiltInEnc.getAllBuiltInEncodings(),
    operators: BuiltInOps.getAllBuiltInOperators(),
});

process.env.TEST_ABC = '123';

(async () => {

    const ret = await loader.load(`https://litert.org/projects/config-loader.js/test-data/05-url-fetch.yml`);

    console.log(ret);
})();
