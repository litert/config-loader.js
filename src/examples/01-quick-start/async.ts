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

import * as ConfigLoader from '../../lib';
import * as BuiltInEnc from '../../lib/Encodings';
import * as BuiltInOps from '../../lib/Operators';
import { LocalFileReader } from '../../lib/Readers/LocalFileReader';

const loader = new ConfigLoader.ConfigLoader({
    reader: new LocalFileReader({
        encodings: {
            '.json': 'json',
            '.yaml': 'yaml',
            '.yml': 'yaml',
        }
    }),
    encodings: BuiltInEnc.getAllBuiltInEncodings(),
    operators: BuiltInOps.getAllBuiltInOperators(),
});

process.env.TEST_ABC = '123';
process.env.TEST_BCD = '456';

(async () => {

    const ret = await loader.load(`${__dirname}/../../test-data/01/main.json`);

    console.log(ret);

})();
