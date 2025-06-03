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
import { ImportTextFileOperator } from './ImportTextFile';
import * as cL from '../Constants';
import type * as dL from '../Declaration';
import type { IOperator } from '../Declaration';

class TestReader implements dL.IDataReader {

    private readonly _files: Record<string, dL.IReadResult> = {};

    public setData(file: string, content: Buffer | null, encoding: string): void {

        if (content === null) {

            delete this._files[file];
        }
        else {

            this._files[file] = { content, encoding };
        }
    }

    public read(path: string): Promise<dL.IReadResult> {

        if (!this._files[path]) {
            return Promise.reject(new Error('No data set for the reader.'));
        }

        return Promise.resolve(this._files[path]);
    }

    public readSync(path: string): dL.IReadResult {

        if (!this._files[path]) {
            throw new Error('No data set for the reader.');
        }

        return this._files[path];
    }

    public resolvePath(refFile: string, filePath: string): string {

        if (filePath.startsWith('/')) {
            return filePath;
        }

        return `${refFile}/${filePath}`;
    }
}

NodeTest.describe('Built-in Operator: ImportTextFile', () => {

    NodeTest.it('should provides only INLINE mode', () => {

        const op: IOperator = new ImportTextFileOperator();

        NodeAssert.strictEqual(!!op.modes[cL.EOperatorMode.INLINE], true);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.BLOCK], undefined);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.CONTAINER], undefined);
    });

    NodeTest.it('should read the data as reader could do', async () => {

        const op = new ImportTextFileOperator().modes[cL.EOperatorMode.INLINE]!;

        const reader = new TestReader();

        reader.setData('/absolute/path', Buffer.from('Hello World'), 'utf-8');

        NodeAssert.strictEqual(
            await op.process('/absolute/path', {
                loader: { reader },
                currentPath: '/hello'
            } as any),
            'Hello World',
        );

        NodeAssert.strictEqual(
            op.processSync('/absolute/path', {
                loader: { reader },
                currentPath: '/hello'
            } as any),
            'Hello World',
        );
    });

    NodeTest.it('should read the data resolving path by current path', async () => {

        const op = new ImportTextFileOperator().modes[cL.EOperatorMode.INLINE]!;

        const reader = new TestReader();

        reader.setData('/absolute/path/a', Buffer.from('Hello World'), 'utf-8');

        NodeAssert.strictEqual(
            await op.process('a', {
                loader: { reader },
                currentPath: '/absolute/path'
            } as any),
            'Hello World',
        );

        NodeAssert.strictEqual(
            op.processSync('a', {
                loader: { reader },
                currentPath: '/absolute/path'
            } as any),
            'Hello World',
        );
    });
});
