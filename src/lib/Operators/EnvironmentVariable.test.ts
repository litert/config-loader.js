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
import type { IDict } from '../_internal/Decl';


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

    NodeTest.it('should read env value from the given readEnv callback', () => {

        const opWithoutDefault = new EnvironmentVariableOperator({
            readEnv: (name: string) => {
                switch (name) {
                    case 'MY_TEST':
                        return '2333';
                    default:
                        return null;
                }
            }
        });

        process.env.MY_TEST = '123';

        NodeAssert.strictEqual(
            opWithoutDefault.modes[cL.EOperatorMode.INLINE]?.process('MY_TEST', {} as any, {}),
            '2333'
        );

        NodeAssert.strictEqual(
            opWithoutDefault.modes[cL.EOperatorMode.INLINE]?.processSync('MY_TEST', {} as any, {}),
            '2333'
        );

        NodeAssert.throws(() => {
            opWithoutDefault.modes[cL.EOperatorMode.INLINE]?.process('MY_TEST_NOT_FOUND', {} as any, {})
        });

        const opWithDefault = new EnvironmentVariableOperator({
            readEnv: (name: string) => {
                switch (name) {
                    case 'MY_TEST':
                        return '666';
                    default:
                        return null;
                }
            },
            defaultValue: 'NOT_FOUND'
        });

        NodeAssert.strictEqual(
            opWithDefault.modes[cL.EOperatorMode.INLINE]?.process('MY_TEST', {} as any, {}),
            '666'
        );

        NodeAssert.strictEqual(
            opWithDefault.modes[cL.EOperatorMode.INLINE]?.processSync('MY_TEST', {} as any, {}),
            '666'
        );

        NodeAssert.strictEqual(
            opWithDefault.modes[cL.EOperatorMode.INLINE]?.process('MY_TEST_NOT_FOUND', {} as any, {}),
            'NOT_FOUND'
        );

        NodeAssert.strictEqual(
            opWithDefault.modes[cL.EOperatorMode.INLINE]?.processSync('MY_TEST_NOT_FOUND', {} as any, {}),
            'NOT_FOUND'
        );
    });

    NodeTest.it('should read from multiple env vars by order', () => {

        const envVars: IDict<string> = {
            'VAR1': 'value1',
            'VAR2': 'value2',
            'VAR3': 'value3',
        };
        const op = new EnvironmentVariableOperator({
            readEnv: (name: string) => envVars[name] ?? null,
        });

        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process('VAR2', {} as any, {}),
            'value2'
        );

        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process('VAR4,VAR2', {} as any, {}),
            'value2'
        );

        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process('VAR3,VAR2', {} as any, {}),
            'value3'
        );

        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process(' VAR3 , VAR2 ', {} as any, {}),
            'value3'
        );

        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process(' VAR4 , VAR2 ', {} as any, {}),
            'value2'
        );

        NodeAssert.throws(
            () => op.modes[cL.EOperatorMode.INLINE]!.process('VAR4,VAR5', {} as any, {}),
        );
    });

    NodeTest.it('should use explicit default value if provided', () => {

        const envVars: IDict<string> = {
            'VAR1': 'value1',
            'VAR2': 'value2',
            'VAR3': 'value3',
        };
        const op = new EnvironmentVariableOperator({
            readEnv: (name: string) => envVars[name] ?? null,
        });

        NodeAssert.throws(
            () => op.modes[cL.EOperatorMode.INLINE]!.process('VAR4,VAR5', {} as any, {}),
        );
        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process('VAR4,VAR5', {} as any, { default: '' }),
            ''
        );
        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process('VAR4,VAR5', {} as any, {
                default: '123'
            }),
            '123'
        );
        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process('VAR4,VAR5', {} as any, {
                'default': 'default=123'
            }),
            'default=123'
        );
        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process('VAR4,VAR5,VAR2', {} as any, {
                default: 'should not be used'
            }),
            'value2'
        );
        NodeAssert.strictEqual(
            op.modes[cL.EOperatorMode.INLINE]!.process(' VAR4,VAR5,VAR1', {} as any, {}),
            'value1'
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