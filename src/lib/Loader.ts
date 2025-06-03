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

import type * as iL from './_internal/Decl';
import type * as dL from './Declaration';
import * as eL from './Errors';
import * as _ from './Utils';
import { SyncConfigLoader } from './_internal/SyncLoader';
import { AsyncConfigLoader } from './_internal/AsyncLoader';

/**
 * The registration information of an operator, used in the constructor of `ConfigLoader`.
 *
 * @see {@link ILoaderOptions}
 */
export interface IOperatorRegistration {

    /**
     * The operator to be registered.
     */
    operator: dL.IOperator;

    /**
     * The options for adding the operator to the loader.
     */
    options?: dL.IAddOperatorOptions;
}

/**
 * The options for the loader.
 *
 * @see {@link ConfigLoader}
 */
export interface ILoaderOptions {

    /**
     * The data reader to be used by the loader.
     */
    reader: dL.IDataReader;

    /**
     * The encodings to be registered in the loader.
     */
    encodings: dL.IEncoding[];

    /**
     * The operators to be registered in the loader.
     */
    operators?: Array<dL.IOperator | IOperatorRegistration>;

    /**
     * @default '$[['
     */
    opPrefix?: string;

    /**
     * @default ']]'
     */
    opSuffix?: string;
}

export class ConfigLoader implements dL.ILoader {

    private readonly _operators: Record<string, iL.IOperatorInfo> = {};

    private readonly _encodings: Record<string, dL.IEncoding> = {};

    private readonly _syncLoader: SyncConfigLoader;

    private readonly _asyncLoader: AsyncConfigLoader;

    public readonly reader: dL.IDataReader;

    public constructor(opts: ILoaderOptions) {

        const opPrefix = opts.opPrefix ?? '$[[';
        const opSuffix = opts.opSuffix ?? ']]';

        for (const encoding of opts.encodings) {

            if (this._encodings[encoding.name]) {

                throw new eL.E_DUP_ENCODING({ name: encoding.name });
            }

            this._encodings[encoding.name] = encoding;
        }

        this._syncLoader = new SyncConfigLoader(
            opPrefix,
            opSuffix,
            opts.reader,
            this._operators,
            this._encodings,
        );

        this._asyncLoader = new AsyncConfigLoader(
            opPrefix,
            opSuffix,
            opts.reader,
            this._operators,
            this._encodings,
        );

        this.reader = opts.reader;

        if (opts.operators?.length) {

            for (const op of opts.operators) {

                if ('operator' in op) {

                    this.addOperator(op.operator, op.options);
                }
                else {

                    this.addOperator(op);
                }
            }
        }
    }

    public hasEncoding(encodingName: string): boolean {

        return !!this._encodings[encodingName];
    }

    public getEncodingNames(): string[] {

        return Object.keys(this._encodings);
    }

    public addOperator(operator: dL.IOperator, options: dL.IAddOperatorOptions = {}): this {

        const entries: string[] = Array.from(new Set([
            options.overrideCode ?? operator.code,
            ...(options.noBuiltInAliases ? [] : operator.aliases),
            ...(options.aliases ?? []),
        ]));

        for (const entry of entries) {

            if (!_.isValidOperator(entry)) {

                throw new eL.E_INVALID_OPERATOR({ code: entry });
            }

            if (this._operators[entry]) {

                throw new eL.E_DUP_OPERATOR({ code: entry });
            }
        }

        const opInfo: iL.IOperatorInfo = { operator, entries };

        for (const entry of entries) {

            this._operators[entry] = opInfo;
        }

        return this;
    }

    public hasOperator(operatorCode: string): boolean {

        return !!this._operators[operatorCode];
    }

    public removeOperator(operatorCode: string): this {

        const entry = operatorCode;
        const opInfo = this._operators[entry];

        if (!opInfo) {

            return this;
        }

        for (const entry of opInfo.entries) {

            delete this._operators[entry];
        }

        return this;
    }

    public getOperatorCodes(): string[] {

        return Object.keys(this._operators);
    }

    public load(filePath: string): Promise<unknown> {

        return this._asyncLoader.load(filePath, this);
    }

    public loadSync(filePath: string): unknown {

        return this._syncLoader.load(filePath, this);
    }
}
