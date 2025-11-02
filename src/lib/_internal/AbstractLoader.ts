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
import type * as iL from './Decl';
import * as eL from '../Errors';
import * as _ from '../Utils';

export interface IPropNameOperation {

    k: string;
    v: string | null;
    propValue: unknown;
    inf: iL.IOperatorInfo;
    options: dL.IOperationOptions;
}

export abstract class AbstractLoader {

    protected readonly _opPrefix: string;

    protected readonly _opSuffix: string;

    protected readonly _reader: dL.IDataReader;

    protected readonly _operators: iL.IDict<iL.IOperatorInfo> = {};

    protected readonly _encodings: iL.IDict<dL.IEncoding> = {};

    public constructor(
        opPrefix: string,
        opSuffix: string,
        reader: dL.IDataReader,
        operators: iL.IDict<iL.IOperatorInfo>,
        encodings: iL.IDict<dL.IEncoding>,
    ) {
        this._opPrefix = opPrefix;
        this._opSuffix = opSuffix;
        this._reader = reader;
        this._operators = operators;
        this._encodings = encodings;
    }

    protected _getOperator(op: _.IOperation): dL.IOperator {

        const operator = this._operators[op.name]?.operator;

        if (!operator) {

            throw new eL.E_OPERATOR_NOT_FOUND({ code: op.name });
        }

        return operator;
    }

    protected _resolveContainerOperations(data: iL.IDict): [
        beforePropNameOps: IPropNameOperation[],
        afterPropNameOps: IPropNameOperation[],
        byPosPropNameOps: iL.IDict<IPropNameOperation>,
    ] {

        const beforePropNameOps: IPropNameOperation[] = [];
        const afterPropNameOps: IPropNameOperation[] = [];
        const byPosPropNameOps: iL.IDict<IPropNameOperation> = {};

        for (const k of Object.keys(data)) {

            if (!k.startsWith(this._opPrefix) || !k.endsWith(this._opSuffix)) {

                continue;
            }

            const op = _.parseContainerOperation(k, this._opPrefix, this._opSuffix);

            if (!op) {

                continue;
            }

            const opInfo = this._operators[op.name];

            if (!opInfo) {

                throw new eL.E_OPERATOR_NOT_FOUND({ code: op.name });
            }

            if (!opInfo.operator.modes[cL.EOperatorMode.CONTAINER]) {

                throw new eL.E_OPERATOR_MODE_MISMATCH({
                    code: op.name,
                    expected: [cL.EOperatorMode.CONTAINER],
                    actual: opInfo.operator.modes,
                });
            }

            switch (opInfo.operator.modes[cL.EOperatorMode.CONTAINER].order) {

                case cL.EContainerOperatorOrder.BEFORE: {

                    beforePropNameOps.push({
                        k: k,
                        v: op.value,
                        inf: opInfo,
                        propValue: data[k],
                        options: op.options,
                    });
                    delete data[k];
                    break;
                }
                case cL.EContainerOperatorOrder.AFTER: {

                    afterPropNameOps.push({
                        k: k,
                        v: op.value,
                        inf: opInfo,
                        propValue: data[k],
                        options: op.options,
                    });
                    delete data[k];
                    break;
                }
                default: {

                    byPosPropNameOps[k] = {
                        k: k,
                        v: op.value,
                        inf: opInfo,
                        propValue: data[k],
                        options: op.options,
                    };
                    // don't delete the key, as it is used for positional operations
                    break;
                }
            }
        }

        return [beforePropNameOps, afterPropNameOps, byPosPropNameOps];
    }
}
