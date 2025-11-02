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
import { EnvironmentVariableOperator } from './EnvironmentVariable';
import * as cL from '../Constants';
import type { IOperator } from '../Declaration';


NodeTest.describe('Built-in Operator: EnvironmentVariable', () => {

    NodeTest.it('should provides only INLINE mode', () => {

        const op: IOperator = new EnvironmentVariableOperator({
            defaultValue: '',
        });

        NodeAssert.strictEqual(!!op.modes[cL.EOperatorMode.INLINE], true);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.BLOCK], undefined);
        NodeAssert.strictEqual(op.modes[cL.EOperatorMode.CONTAINER], undefined);
    });

    NodeTest.it('should return value of existing env var', () => {

        const op = new EnvironmentVariableOperator({});

        process.env.MY_TEST = '123';

        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]?.process('MY_TEST', {} as any, {}),
            '123'
        );

        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]?.processSync('MY_TEST', {} as any, {}),
            '123'
        );
    });

    NodeTest.it('should throw error if env var does not exist by default', () => {

        const op = new EnvironmentVariableOperator({});

        NodeAssert.throws(() => {
            op.modes[cL.EOperatorMode.INLINE]?.process('MY_TEST_NOT_FOUND', {} as any, {})
        });

        NodeAssert.throws(() => {
            op.modes[cL.EOperatorMode.INLINE]?.processSync('MY_TEST_NOT_FOUND', {} as any, {})
        });
    });

    NodeTest.it('should return default value if env var not exist and default value was set', () => {

        const op = new EnvironmentVariableOperator({
            defaultValue: '',
        });

        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]?.process('MY_TEST_NOT_FOUND', {} as any, {}),
            ''
        );

        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]?.processSync('MY_TEST_NOT_FOUND', {} as any, {}),
            ''
        );
    });
});