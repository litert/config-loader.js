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
import { DecodeBase64Operator } from './DecodeBase64';
import * as cL from '../Constants';
import type { IOperator } from '../Declaration';

NodeTest.describe('Built-in Operator: DecodeBase64', () => {

    NodeTest.it('should provides only BLOCK mode', () => {

        const op: IOperator = new DecodeBase64Operator();

        NodeAssert.strictEqual(!!op.modes[cL.EOperatorMode.BLOCK], true);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.INLINE], undefined);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.CONTAINER], undefined);
    });

    NodeTest.it('should decode base64 string correctly', () => {

        const op: IOperator = new DecodeBase64Operator();

        const output: Record<string, Buffer> = {};
        
        op.modes[cL.EOperatorMode.BLOCK]?.processSync('AAAABBBB', {
            output, outputEntry: 'test'
        } as any, {});
        NodeAssert.strictEqual(
            Buffer.from([0x00, 0x00, 0x00, 0x04, 0x10, 0x41]).equals(output.test),
            true
        );
    });

    NodeTest.it('should decode base64 string asynchronous as well', () => {

        const op: IOperator = new DecodeBase64Operator();

        const output: Record<string, Buffer> = {};
        
        op.modes[cL.EOperatorMode.BLOCK]?.process('AAAABBBB', {
            output, outputEntry: 'test'
        } as any, {});
        NodeAssert.strictEqual(
            Buffer.from([0x00, 0x00, 0x00, 0x04, 0x10, 0x41]).equals(output.test),
            true
        );
    });
});
