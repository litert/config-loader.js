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

const OPT_NAME_DEFAULT = 'default';

export interface IEnvVarOperatorOptions {

    /**
     * The default value to return if the environment variable is not defined.
     *
     * If not provided, an error will be thrown if the variable is not found.
     * @default undefined
     */
    defaultValue?: string;

    /**
     * A custom function to read environment variables.
     *
     * This is useful in scenarios where environment variables are read from an
     * alternative source other than the default `process.env`.
     *
     * @default (name) => process.env[name]
     */
    readEnv?: (name: string) => string | null | undefined;
}

type IReadEnvFn = Required<IEnvVarOperatorOptions>['readEnv'];

const DEFAULT_READ_ENV: IReadEnvFn = (n) => process.env[n];

abstract class AbstractEnvVarInlineOperator implements dL.IInlineOperator {

    protected readonly _readEnv: IReadEnvFn;

    public constructor(readEnv: IReadEnvFn) {

        this._readEnv = readEnv;
    }

    public abstract process(operand: string, ctx: unknown, opts: dL.IOperationOptions): string;

    public abstract processSync(operand: string, ctx: unknown, opts: dL.IOperationOptions): string;

    protected _read(operand: string, opts: dL.IOperationOptions): string | null {

        const envNames = operand.split(',').map((n) => n.trim());

        for (const envName of envNames) {
            const value = this._readEnv(envName);
            if (value !== null && value !== undefined) {
                return value;
            }
        }

        return typeof opts[OPT_NAME_DEFAULT] === 'string' ? opts[OPT_NAME_DEFAULT] : null;
    }
}

class EnvVarInlineOperatorWithDefault extends AbstractEnvVarInlineOperator {

    private readonly _defaultValue: string;

    public constructor(
        defaultValue: string,
        readEnv: IReadEnvFn
    ) {

        super(readEnv);
        this._defaultValue = defaultValue;
    }

    public process(operand: string, _ctx: unknown, opts: dL.IOperationOptions): string {

        return this._read(operand, opts) ?? this._defaultValue;
    }

    public processSync(operand: string, _ctx: unknown, opts: dL.IOperationOptions): string {

        return this._read(operand, opts) ?? this._defaultValue;
    }
}

class EnvVarInlineOperatorWithoutDefault extends AbstractEnvVarInlineOperator {

    public process(operand: string, _ctx: unknown, opts: dL.IOperationOptions): string {

        const value = this._read(operand, opts);

        if (value === null) {

            throw new Error(`Environment variable '${operand}' is not defined.`);
        }

        return value;
    }

    public processSync(operand: string, ctx: unknown, opts: dL.IOperationOptions): string {

        return this.process(operand, ctx, opts);
    }
}

/**
 * This operator reads the value of an environment variable.
 *
 * @since v1.1.0: If multiple variable names are provided, they will be checked
 * in order, and the value of the first found variable will be used.
 * @since v1.1.0: An operator option 'default' is added. When provided, it will
 * be used as the default value if none of the specified environment variables
 * are found.
 *
 * @mode inline
 *
 * @syntax `"$[[env:<variable-name>]]"`
 * @syntax `"$[[env:<variable-name1>,<variable-name2>]]"`
 * @syntax `"$[[env:<variable-name1>[...<variable-names>]; default=<default-value>]]"`
 */
export class EnvironmentVariableOperator implements dL.IOperator {

    public readonly code = 'env';

    public readonly aliases = [];

    public readonly modes: {
        [cL.EOperatorMode.INLINE]?: dL.IInlineOperator;
    } = {};

    public constructor(opts?: IEnvVarOperatorOptions) {

        if (opts?.defaultValue !== undefined) {
            this.modes[cL.EOperatorMode.INLINE] = new EnvVarInlineOperatorWithDefault(
                opts.defaultValue,
                opts.readEnv ?? DEFAULT_READ_ENV
            );
        }
        else {
            this.modes[cL.EOperatorMode.INLINE] = new EnvVarInlineOperatorWithoutDefault(
                opts?.readEnv ?? DEFAULT_READ_ENV
            );
        }
    }
}
