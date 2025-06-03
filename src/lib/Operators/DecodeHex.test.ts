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
import { DecodeHexOperator } from './DecodeHex';
import * as cL from '../Constants';
import type { IOperator } from '../Declaration';


NodeTest.describe('Built-in Operator: DecodeHex', () => {

    NodeTest.it('should provides only BLOCK mode', () => {

        const op: IOperator = new DecodeHexOperator();

        NodeAssert.strictEqual(!!op.modes[cL.EOperatorMode.BLOCK], true);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.INLINE], undefined);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.CONTAINER], undefined);
    });

    NodeTest.it('should decode hex string correctly', () => {

        const op: IOperator = new DecodeHexOperator();

        const output: Record<string, Buffer> = {};
        
        op.modes[cL.EOperatorMode.BLOCK]?.processSync('12345678', {
            output, outputEntry: 'test'
        } as any);
        NodeAssert.strictEqual(
            Buffer.from([0x12, 0x34, 0x56, 0x78]).equals(output.test),
            true
        );
    });

    NodeTest.it('should decode hex string asynchronous as well', () => {

        const op: IOperator = new DecodeHexOperator();

        const output: Record<string, Buffer> = {};
        
        op.modes[cL.EOperatorMode.BLOCK]?.process('12345678', {
            output, outputEntry: 'test'
        } as any);
        NodeAssert.strictEqual(
            Buffer.from([0x12, 0x34, 0x56, 0x78]).equals(output.test),
            true
        );
    });
});
