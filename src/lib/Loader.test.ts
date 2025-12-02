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
import * as cL from './Constants';
import * as dL from './Declaration';
import * as _ from './Utils';
import * as iL from './_internal/Decl';
import { JsonEncoding } from './Encodings';
import { ConfigLoader } from './Loader';

class DemoOperator implements dL.IOperator {

    public readonly code = 'demo';

    public readonly aliases = [];

    public readonly modes = {
        [cL.EOperatorMode.BLOCK]: {
            process(
                operand: string,
                ctx: dL.IOperatorContext,
                options: dL.IOperationOptions,
            ): void {
                this.processSync(operand, ctx, options);
            },
            processSync(
                operand: string,
                ctx: dL.IOperatorContext,
                options: dL.IOperationOptions,
            ): void {

                ctx.data.files ??= [];
                ctx.data.files.push(operand);
                if (_.isObject(ctx.output)) {

                    ctx.output[ctx.outputEntry] = ctx.data.files;
                }
                else {

                    ctx.output.push(ctx.data.files);
                }
            }
        },
    }
}

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
        operators: [new DemoOperator()],
        encodings: [new JsonEncoding()],
        skipUnknownOperators: skipUnknown,
    });

    return [loader, reader];
}

async function doTestAsync(
    loader: dL.ILoader,
    reader: MockReader,
    files: iL.IDict<dL.IReadResult>,
    rootFile: string,
    expected: unknown,
    contextData?: iL.IDict,
): Promise<void> {

    reader.files = files;

    const data = contextData ?
        await loader.load({ path: rootFile, contextData }) :
        await loader.load(rootFile, null as any);

    NodeAssert.deepStrictEqual(data, expected);
}

function doTestSync(
    loader: dL.ILoader,
    reader: MockReader,
    files: iL.IDict<dL.IReadResult>,
    rootFile: string,
    expected: unknown,
    contextData?: iL.IDict,
): void {

    reader.files = files;

    const data = contextData ?
        loader.loadSync({ path: rootFile, contextData }) :
        loader.loadSync(rootFile, null as any);

    NodeAssert.deepStrictEqual(data, expected);
}

async function doTestLoadObjectAsync(
    loader: dL.ILoader,
    reader: MockReader,
    input: iL.IDict,
    files: iL.IDict<dL.IReadResult>,
    rootFile: string,
    expected: unknown,
    contextData?: iL.IDict,
): Promise<void> {

    reader.files = files;

    const data = contextData ?
        await loader.loadFromObject({ path: rootFile, data: input, contextData }) :
        await loader.loadFromObject(input, rootFile, null as any);

    NodeAssert.deepStrictEqual(data, expected);
}

function doTestLoadObjectSync(
    loader: dL.ILoader,
    reader: MockReader,
    input: iL.IDict,
    files: iL.IDict<dL.IReadResult>,
    rootFile: string,
    expected: unknown,
    contextData?: iL.IDict,
): void {

    reader.files = files;

    const data = contextData ?
        loader.loadFromObjectSync({ path: rootFile, data: input, contextData }) :
        loader.loadFromObjectSync(input, rootFile, null as any);

    NodeAssert.deepStrictEqual(data, expected);
}

NodeTest.describe('Loader', async () => {

    await NodeTest.it('should use given context data when loading by path', async () => {

        const [loader, reader] = createMockLoader();

        await doTestAsync(loader, reader, {
            '/config.json': {
                'content': JSON.stringify({
                    s: '$[[demo:ffff]]',
                    b: '$[[demo:1234]]',
                }),
                'encoding': 'json'
            }
        }, '/config.json', {
            s: ['ffff', '1234'],
            b: ['ffff', '1234'],
        });

        await doTestAsync(loader, reader, {
            '/config.json': {
                'content': JSON.stringify({
                    s: '$[[demo:ffff]]',
                    b: '$[[demo:1234]]',
                }),
                'encoding': 'json'
            }
        }, '/config.json', {
            s: [2345, 'ffff', '1234'],
            b: [2345, 'ffff', '1234'],
        }, { files: [2345] });

        doTestSync(loader, reader, {
            '/config.json': {
                'content': JSON.stringify({
                    s: '$[[demo:abcd]]',
                    b: '$[[demo:efgh]]',
                }),
                'encoding': 'json'
            }
        }, '/config.json', {
            s: ['abcd', 'efgh'],
            b: ['abcd', 'efgh'],
        });

        doTestSync(loader, reader, {
            '/config.json': {
                'content': JSON.stringify({
                    s: '$[[demo:abcd]]',
                    b: '$[[demo:efgh]]',
                }),
                'encoding': 'json'
            }
        }, '/config.json', {
            s: [2345, 'abcd', 'efgh'],
            b: [2345, 'abcd', 'efgh'],
        }, { files: [2345] });
    });

    await NodeTest.it('should use given context data when loading by object', async () => {

        const [loader, reader] = createMockLoader();

        await doTestLoadObjectAsync(loader, reader, {
            s: '$[[demo:ffff]]',
            b: '$[[demo:1234]]',
        }, {}, '/config.json', {
            s: ['ffff', '1234'],
            b: ['ffff', '1234'],
        });

        await doTestLoadObjectAsync(loader, reader, {
            s: '$[[demo:ffff]]',
            b: '$[[demo:1234]]',
        }, {}, '/config.json', {
            s: [2345, 'ffff', '1234'],
            b: [2345, 'ffff', '1234'],
        }, { files: [2345] });

        doTestLoadObjectSync(loader, reader, {
            s: '$[[demo:abcd]]',
            b: '$[[demo:efgh]]',
        }, {}, '/config.json', {
            s: ['abcd', 'efgh'],
            b: ['abcd', 'efgh'],
        });

        doTestLoadObjectSync(loader, reader, {
            s: '$[[demo:abcd]]',
            b: '$[[demo:efgh]]',
        }, {}, '/config.json', {
            s: [2345, 'abcd', 'efgh'],
            b: [2345, 'abcd', 'efgh'],
        }, { files: [2345] });
    });

});
