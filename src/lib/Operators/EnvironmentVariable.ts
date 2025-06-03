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

import * as cL from '../Constants';
import type * as dL from '../Declaration';

export interface IEnvVarOperatorOptions {

    /**
     * The default value to return if the environment variable is not defined.
     *
     * If not provided, an error will be thrown if the variable is not found.
     * @default undefined
     */
    defaultValue?: string;
}

class EnvVarInlineOperatorWithDefault implements dL.IInlineOperator {

    private readonly _defaultValue: string;

    public constructor(defaultValue: string) {

        this._defaultValue = defaultValue;
    }

    public process(operand: string): string {

        return process.env[operand] ?? this._defaultValue;
    }

    public processSync(operand: string): string {

        return process.env[operand] ?? this._defaultValue;
    }
}

class EnvVarInlineOperatorWithoutDefault implements dL.IInlineOperator {

    public process(operand: string): string {

        const value = process.env[operand];

        if (value === undefined) {

            throw new Error(`Environment variable '${operand}' is not defined.`);
        }

        return value;
    }

    public processSync(operand: string): string {

        return this.process(operand);
    }
}

/**
 * This operator reads the value of an environment variable.
 *
 * @mode inline
 *
 * @syntax `"$[[env:<variable-name>]]"`
 */
export class EnvironmentVariableOperator implements dL.IOperator {

    public readonly code = 'env';

    public readonly aliases = [];

    public readonly modes: {
        [cL.EOperatorMode.INLINE]?: dL.IInlineOperator;
    } = {};

    public constructor(opts?: IEnvVarOperatorOptions) {

        if (opts?.defaultValue !== undefined) {
            this.modes[cL.EOperatorMode.INLINE] = new EnvVarInlineOperatorWithDefault(opts.defaultValue);
        }
        else {
            this.modes[cL.EOperatorMode.INLINE] = new EnvVarInlineOperatorWithoutDefault();
        }
    }
}
