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
import { ImportBinaryFileOperator } from './ImportBinaryFile';
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

async function readFile(
    op: dL.IBlockOperator,
    reader: dL.IDataReader,
    currentPath: string,
    filePath: string,
): Promise<Buffer> {

    const output: Record<string, Buffer> = {};

    await op.process(filePath, {
        loader: { reader },
        currentPath,
        output,
        outputEntry: 'test'
    } as any);

    return output['test'];
}

function readFileSync(
    op: dL.IBlockOperator,
    reader: dL.IDataReader,
    currentPath: string,
    filePath: string,
): Buffer {

    const output: Record<string, Buffer> = {};

    op.processSync(filePath, {
        loader: { reader },
        currentPath,
        output,
        outputEntry: 'test'
    } as any);

    return output['test'];
}

NodeTest.describe('Built-in Operator: ImportBinaryFile', () => {

    NodeTest.it('should provides only INLINE mode', () => {

        const op: IOperator = new ImportBinaryFileOperator();

        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.INLINE], undefined);
        NodeAssert.strictEqual(!!op.modes[cL.EOperatorMode.BLOCK], true);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.CONTAINER], undefined);
    });

    NodeTest.it('should read the data as reader could do', async () => {

        const op = new ImportBinaryFileOperator().modes[cL.EOperatorMode.BLOCK]!;

        const reader = new TestReader();

        reader.setData('/absolute/path', Buffer.from('Hello World'), 'utf-8');

        NodeAssert.strictEqual(
            (await readFile(op, reader, '/hello', '/absolute/path')).toString(),
            'Hello World',
        );

        NodeAssert.strictEqual(
            (readFileSync(op, reader, '/hello', '/absolute/path')).toString(),
            'Hello World',
        );

    });

    NodeTest.it('should read the data resolving path by current path', async () => {

        const op = new ImportBinaryFileOperator().modes[cL.EOperatorMode.BLOCK]!;

        const reader = new TestReader();

        reader.setData('/absolute/path/a', Buffer.from('Hello World'), 'utf-8');

        NodeAssert.strictEqual(
            (await readFile(op, reader, '/absolute/path', 'a')).toString(),
            'Hello World',
        );

        NodeAssert.strictEqual(
            (readFileSync(op, reader, '/absolute/path', 'a')).toString(),
            'Hello World',
        );
    });
});
