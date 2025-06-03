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
import * as NodeAssert from 'node:assert';
import { ResolvePathOperator } from './ResolvePath';
import * as cL from '../Constants';
import type * as dL from '../Declaration';
import type { IOperator } from '../Declaration';

class TestReader implements dL.IDataReader {

    public read(): Promise<any> {

        throw new Error('Not implemented.');
    }

    public readSync(): any {

        throw new Error('Not implemented.');
    }

    public resolvePath(refFile: string, filePath: string): string {

        if (filePath.startsWith('/')) {
            return filePath;
        }

        return `${refFile}/${filePath}`;
    }
}

NodeTest.describe('Built-in Operator: ResolvePath', () => {

    NodeTest.it('should provides only INLINE mode', () => {

        const op: IOperator = new ResolvePathOperator();

        NodeAssert.strictEqual(!!op.modes[cL.EOperatorMode.INLINE], true);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.BLOCK], undefined);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.CONTAINER], undefined);
    });

    NodeTest.it('should resolve the path as the reader do', async () => {

        const op = new ResolvePathOperator().modes[cL.EOperatorMode.INLINE]!;

        const reader = new TestReader();

        NodeAssert.strictEqual(
            op.processSync('/absolute/path', {
                loader: { reader },
                currentPath: '/hello'
            } as any),
            reader.resolvePath('/hello', '/absolute/path')
        );

        NodeAssert.strictEqual(
            op.processSync('test/path', {
                loader: { reader },
                currentPath: '/hello'
            } as any),
            reader.resolvePath('/hello', 'test/path')
        );

        NodeAssert.strictEqual(
            await op.process('/absolute/path', {
                loader: { reader },
                currentPath: '/hello'
            } as any),
            reader.resolvePath('/hello', '/absolute/path')
        );

        NodeAssert.strictEqual(
            await op.process('test/path', {
                loader: { reader },
                currentPath: '/hello'
            } as any),
            reader.resolvePath('/hello', 'test/path')
        );
    });
});
