/**
 *  Copyright 2025 Angus.Fenying <fenying@litert.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import * as NodeTest from 'node:test';
import * as NodeFS from 'node:fs';
import * as NodePath from 'node:path';
import * as NodeAssert from 'node:assert';
import { LocalFileReader } from './LocalFileReader';
import { E_READ_FILE_FAILED } from '../Errors';

NodeTest.describe('Built-in DataReader: LocalFileReader', () => {

    const reader = new LocalFileReader({
        encodings: {
            '.js': 'javascript',
            '.json': 'json',
            '.yaml': 'yaml',
            '.yml': 'yaml',
        },
    });

    NodeTest.it('Should be able to read a file synchronously', () => {

        const thisContent = NodeFS.readFileSync(__filename);

        NodeAssert.strictEqual(reader.readSync(__filename).content instanceof Buffer, true);
        NodeAssert.strictEqual(reader.readSync(__filename).encoding, 'javascript');
        NodeAssert.strictEqual(reader.readSync(__filename).content.toString(), thisContent.toString());
    });

    NodeTest.it('Should be able to read a file asynchronously', async () => {

        const thisContent = await NodeFS.promises.readFile(__filename);

        const result = await reader.read(__filename);

        NodeAssert.strictEqual(result.content instanceof Buffer, true);
        NodeAssert.strictEqual(result.encoding, 'javascript');
        NodeAssert.strictEqual(result.content.toString(), thisContent.toString());
    });

    NodeTest.it('Should throw error if failed to read file', async () => {

        try {
            reader.readSync('');
            NodeAssert.fail('Expected an error to be thrown for unrecognized file extension');
        }
        catch (e) {
            NodeAssert.strictEqual(e instanceof E_READ_FILE_FAILED, true);
        }

        try {
            reader.readSync('unknown-file.json');
            NodeAssert.fail('Expected an error to be thrown for unrecognized file extension');
        }
        catch (e) {
            NodeAssert.strictEqual(e instanceof E_READ_FILE_FAILED, true);
        }

        try {
            await reader.read('');
            NodeAssert.fail('Expected an error to be thrown for unrecognized file extension');
        }
        catch (e) {
            NodeAssert.strictEqual(e instanceof E_READ_FILE_FAILED, true);
        }

        try {
            await reader.read('unknown-file.json');
            NodeAssert.fail('Expected an error to be thrown for unrecognized file extension');
        }
        catch (e) {
            NodeAssert.strictEqual(e instanceof E_READ_FILE_FAILED, true);
        }
    });

    NodeTest.it('Should return empty type if the extension is unrecognizable', async () => {

        NodeAssert.strictEqual(
            reader.readSync(__filename + '.map').encoding,
            ''
        );

        NodeAssert.strictEqual(
            (await reader.read(__filename + '.map')).encoding,
            ''
        );

        NodeAssert.strictEqual(
            reader.readSync(NodePath.join(__dirname, '../../test-data/LocalFileReader/file-without-ext')).encoding,
            ''
        );
    });

    NodeTest.it('Should resolve absolute path as it is', async () => {

        const filePath = __filename + '.map';

        NodeAssert.strictEqual(
            reader.resolvePath('', filePath),
            filePath
        );
    });

    NodeTest.it('Should resolve relative path referring to the first file', async () => {

        const filePath = __filename + '.map';

        NodeAssert.strictEqual(
            reader.resolvePath(filePath, '../123.txt'),
            NodePath.resolve(__dirname, '../123.txt')
        );
    });
});
