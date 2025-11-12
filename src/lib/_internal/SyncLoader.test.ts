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
import * as cL from '../Constants';
import * as dL from '../Declaration';
import * as _ from '../Utils';
import * as iL from '../_internal/Decl';
import { SyncConfigLoader } from './SyncLoader';
import { JsonEncoding } from '../Encodings';

class DemoOperator implements dL.IOperator {

    public readonly code = 'demo';

    public readonly aliases = [];

    public readonly modes = {
        [cL.EOperatorMode.INLINE]: {
            process(
                operand: string,
                ctx: dL.IOperatorContext,
                options: dL.IOperationOptions,
            ): string {
                return this.processSync(operand, ctx, options);
            },
            processSync(
                operand: string,
                ctx: dL.IOperatorContext,
                options: dL.IOperationOptions,
            ): string {
                return `inline:${operand}-${JSON.stringify(options)}`;
            }
        },
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

                const val = `block:${operand}-${JSON.stringify(options)}`;
                if (_.isObject(ctx.output)) {

                    ctx.output[ctx.outputEntry] = val;
                }
                else {

                    ctx.output.push(val);
                }
            }
        },
        [cL.EOperatorMode.CONTAINER]: {
            order: cL.EContainerOperatorOrder.BEFORE,
            process(
                args: dL.IContainerOperatorArgs,
                ctx: dL.IOperatorContext,
            ): void {
                this.processSync(args, ctx);
            },
            processSync(
                args: dL.IContainerOperatorArgs,
                ctx: dL.IOperatorContext,
            ): void {

                const val = `container:${args.operand}-${JSON.stringify(args.value)}-${JSON.stringify(args.options)}`;
                if (_.isObject(ctx.output)) {

                    ctx.output['test'] = val;
                }
                else {

                    ctx.output.push(val);
                }
            }
        }
    }
}

class MockReader implements dL.IDataReader {

    public files: iL.IDict<dL.IReadResult> = {};

    public read(dataPath: string): Promise<dL.IReadResult> {

        return Promise.resolve(this.files[dataPath]);
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

function createMockLoader(skipUnknown: boolean = false): [SyncConfigLoader, MockReader] {

    const reader = new MockReader();
    const loader = new SyncConfigLoader(
        '$[[',
        ']]',
        reader,
        {
            'demo': {
                'entries': ['demo'],
                'operator': new DemoOperator()
            },
        },
        {
            'json': new JsonEncoding(),
        },
        skipUnknown,
    );

    return [loader, reader];
}

function doTest(
    loader: SyncConfigLoader,
    reader: MockReader,
    files: iL.IDict<dL.IReadResult>,
    rootFile: string,
    expected: unknown,
): void {

    reader.files = files;

    const data = loader.load(rootFile, null as any);

    NodeAssert.deepStrictEqual(data, expected);
}

NodeTest.describe('SyncConfigLoader', () => {

    NodeTest.it('should pass inline-mode operator options correctly', () => {

        const [loader, reader] = createMockLoader();

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: 's-$[[demo:hello]]',
                    })),
                },
            },
            '/test.json',
            { a: 's-inline:hello-{}', }
        );

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: 's-$[[demo:hello;a=123]]',
                    })),
                },
            },
            '/test.json',
            { a: 's-inline:hello-{"a":"123"}', }
        );

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: 's-$[[demo:hello;a=123;b;c;d=true]]',
                    })),
                },
            },
            '/test.json',
            { a: 's-inline:hello-{"a":"123","b":true,"c":true,"d":"true"}', }
        );

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: 's-$[[demo:hello;a=123;;c;d=true]]',
                    })),
                },
            },
            '/test.json',
            { a: 's-inline:hello-{"a":"123","c":true,"d":"true"}', }
        );

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: 's-$[[demo:hello;a=123;;;; ; ;; ;c;d=true; e =  a;]]',
                    })),
                },
            },
            '/test.json',
            { a: 's-inline:hello-{"a":"123","c":true,"d":"true","e":"a"}', }
        );

    });

    NodeTest.it('should pass block-mode operator options correctly', () => {

        const [loader, reader] = createMockLoader();

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: '$[[demo:hello]]',
                    })),
                },
            },
            '/test.json',
            { a: 'block:hello-{}', }
        );

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: '$[[demo:hello;a=123]]',
                    })),
                },
            },
            '/test.json',
            { a: 'block:hello-{"a":"123"}', }
        );

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: '$[[demo:hello;a=123;b;c;d=true]]',
                    })),
                },
            },
            '/test.json',
            { a: 'block:hello-{"a":"123","b":true,"c":true,"d":"true"}', }
        );

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: '$[[demo:hello;a=123;;c;d=true]]',
                    })),
                },
            },
            '/test.json',
            { a: 'block:hello-{"a":"123","c":true,"d":"true"}', }
        );

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: '$[[demo:hello;a=123;;;; ; ;; ;c;d=true; e =  a; f =;]]',
                    })),
                },
            },
            '/test.json',
            { a: 'block:hello-{"a":"123","c":true,"d":"true","e":"a","f":""}', }
        );
    });

    NodeTest.it('should pass container-mode operator options correctly', () => {

        const [loader, reader] = createMockLoader();

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: {
                            '$[[demo:hello]]': null,
                        },
                    })),
                },
            },
            '/test.json',
            { a: { test: 'container:hello-null-{}', } }
        );

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        a: {
                            '$[[demo:hello;a=123;;;; ;  ; d = 12333 ; e]]': '123',
                        },
                    })),
                },
            },
            '/test.json',
            { a: { test: 'container:hello-"123"-{"a":"123","d":"12333","e":true}', } }
        );
    });

    NodeTest.it('should skip unknown operators and retain original expression', () => {

        const [loader, reader] = createMockLoader(true);

        doTest(
            loader, reader,
            {
                '/test.json': {
                    encoding: 'json',
                    content: Buffer.from(JSON.stringify({
                        'a': {
                            '$[[unknown:hello]]': null,
                            '$[[unknown:op]]': 'value',
                            'b': '$[[unknown2:op2;a=1]]',
                            'c': [
                                '$[[unknown:hello]]',
                                '$[[unknown3:op3]]',
                            ]
                        },
                    })),
                },
            },
            '/test.json',
            { 
                'a': {
                    '$[[unknown:hello]]': null,
                    '$[[unknown:op]]': 'value',
                    'b': '$[[unknown2:op2;a=1]]',
                    'c': [
                        '$[[unknown:hello]]',
                        '$[[unknown3:op3]]',
                    ]
                },
            }
        );
    });
});
