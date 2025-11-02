/**
 * Copyright 2025 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
