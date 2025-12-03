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
import * as NodePath from 'node:path';
import * as NodeAssert from 'node:assert';
import * as NodeTimers from 'node:timers/promises';
import * as dL from '../Declaration';
import * as _ from '../Utils';
import * as iL from '../_internal/Decl';
import { JsonEncoding } from '../Encodings';
import { ConfigLoader } from '../Loader';
import { ExtendsOperator } from './Extends';

class MockReader implements dL.IDataReader {

    public files: iL.IDict<dL.IReadResult> = {};

    public async read(dataPath: string): Promise<dL.IReadResult> {

        await NodeTimers.setTimeout(1);
        return this.files[dataPath];
    }

    public readSync(dataPath: string): dL.IReadResult {

        return this.files[dataPath];
    }

    public resolvePath(refFile: string, filePath: string): string {

        if (filePath.startsWith('/')) {
            return filePath;
        }

        return NodePath.join(NodePath.dirname(refFile), filePath);
    }
}

function createMockLoader(skipUnknown: boolean = false): [dL.ILoader, MockReader] {

    const reader = new MockReader();
    const loader = new ConfigLoader({
        opPrefix: '$[[',
        opSuffix: ']]',
        reader: reader,
        operators: [new ExtendsOperator()],
        encodings: [new JsonEncoding()],
        skipUnknownOperators: skipUnknown,
    });

    return [loader, reader];
}

NodeTest.describe('Built-in Operator: Extends', async () => {

    await NodeTest.it('[container-mode] should not throw error if not circular loading a same file', async () => {

        const [loader, reader] = createMockLoader();

        reader.files['/config.json'] = {
            'content': JSON.stringify({
                '$[[extends]]': './b.json'
            }),
            'encoding': 'json'
        };

        reader.files['/b.json'] = {
            'content': JSON.stringify({
                'a': 123
            }),
            'encoding': 'json'
        };

        await NodeAssert.doesNotReject(() => loader.load('/config.json'));

        NodeAssert.doesNotThrow(() => loader.loadSync('/config.json'));
    });

    await NodeTest.it('[container-mode] should throw error if not circular loading a same file', async () => {

        const [loader, reader] = createMockLoader();

        reader.files['/config.json'] = {
            'content': JSON.stringify({
                '$[[extends]]': './config.json'
            }),
            'encoding': 'json'
        };

        reader.files['/a.json'] = {
            'content': JSON.stringify({
                '$[[extends]]': './b.json'
            }),
            'encoding': 'json'
        };

        reader.files['/b.json'] = {
            'content': JSON.stringify({
                '$[[extends]]': './c.json'
            }),
            'encoding': 'json'
        };

        reader.files['/c.json'] = {
            'content': JSON.stringify({
                '$[[extends]]': './a.json'
            }),
            'encoding': 'json'
        };

        await NodeAssert.rejects(() => loader.load('/config.json'), {
            message: 'Circular reference detected when extending from "/config.json".'
        });
        await NodeAssert.rejects(() => loader.load('/a.json'), {
            message: 'Circular reference detected when extending from "/a.json".'
        });
        await NodeAssert.rejects(() => loader.load('/b.json'), {
            message: 'Circular reference detected when extending from "/b.json".'
        });
        await NodeAssert.rejects(() => loader.load('/c.json'), {
            message: 'Circular reference detected when extending from "/c.json".'
        });

        NodeAssert.throws(() => loader.loadSync('/config.json'), {
            message: 'Circular reference detected when extending from "/config.json".'
        });
        NodeAssert.throws(() => loader.loadSync('/a.json'), {
            message: 'Circular reference detected when extending from "/a.json".'
        });
        NodeAssert.throws(() => loader.loadSync('/b.json'), {
            message: 'Circular reference detected when extending from "/b.json".'
        });
        NodeAssert.throws(() => loader.loadSync('/c.json'), {
            message: 'Circular reference detected when extending from "/c.json".'
        });
    });

    await NodeTest.it('[block-mode] should not throw error if not circular loading a same file', async () => {

        const [loader, reader] = createMockLoader();

        reader.files['/config.json'] = {
            'content': JSON.stringify({
                'data': ['$[[extends:./b.json]]']
            }),
            'encoding': 'json'
        };

        reader.files['/b.json'] = {
            'content': JSON.stringify([123]),
            'encoding': 'json'
        };

        await NodeAssert.doesNotReject(() => loader.load('/config.json'));

        NodeAssert.doesNotThrow(() => loader.loadSync('/config.json'));
    });

    await NodeTest.it('[block-mode] should throw error if not circular loading a same file', async () => {

        const [loader, reader] = createMockLoader();

        reader.files['/config.json'] = {
            'content': JSON.stringify({
                'data': ['$[[extends:./config.json]]']
            }),
            'encoding': 'json'
        };

        reader.files['/a.json'] = {
            'content': JSON.stringify(['$[[extends:./b.json]]']),
            'encoding': 'json'
        };

        reader.files['/b.json'] = {
            'content': JSON.stringify(['$[[extends:./c.json]]']),
            'encoding': 'json'
        };

        reader.files['/c.json'] = {
            'content': JSON.stringify(['$[[extends:./a.json]]']),
            'encoding': 'json'
        };

        await NodeAssert.rejects(() => loader.load('/config.json'), {
            message: 'Circular reference detected when extending from "/config.json".'
        });
        await NodeAssert.rejects(() => loader.load('/a.json'), {
            message: 'Circular reference detected when extending from "/a.json".'
        });
        await NodeAssert.rejects(() => loader.load('/b.json'), {
            message: 'Circular reference detected when extending from "/b.json".'
        });
        await NodeAssert.rejects(() => loader.load('/c.json'), {
            message: 'Circular reference detected when extending from "/c.json".'
        });

        NodeAssert.throws(() => loader.loadSync('/config.json'), {
            message: 'Circular reference detected when extending from "/config.json".'
        });
        NodeAssert.throws(() => loader.loadSync('/a.json'), {
            message: 'Circular reference detected when extending from "/a.json".'
        });
        NodeAssert.throws(() => loader.loadSync('/b.json'), {
            message: 'Circular reference detected when extending from "/b.json".'
        });
        NodeAssert.throws(() => loader.loadSync('/c.json'), {
            message: 'Circular reference detected when extending from "/c.json".'
        });
    });

});
