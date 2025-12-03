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
import { LocalFileReader } from '../lib/Readers/LocalFileReader';

const loader = new ConfigLoader.ConfigLoader({
    reader: new LocalFileReader({
        encodings: {
            '.json': 'json',
            '.yaml': 'yaml',
            '.yml': 'yaml',
        }
    }),
    opSuffix: '}}',
    opPrefix: '{{',
    encodings: BuiltInEnc.getAllBuiltInEncodings(),
    operators: BuiltInOps.getAllBuiltInOperators(),
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

loader.loadFromObjectSync({
    configData: {
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
    },
    path: `${__dirname}/../test-data/07/main.json`
});

console.log(ret);
