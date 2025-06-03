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

import type * as dL from '../Declaration';
import type * as iL from './Decl';
import * as cL from '../Constants';
import * as eL from '../Errors';
import * as _ from '../Utils';
import { AbstractLoader } from './AbstractLoader';

export class AsyncConfigLoader extends AbstractLoader {

    public async load(filePath: string, loader: dL.ILoader, parent?: string): Promise<unknown> {

        if (!this._reader.read) {

            throw new eL.E_READER_NOT_SUPPORT_ASYNC();
        }

        filePath = this._reader.resolvePath(parent ?? '.', filePath);

        const { encoding, content } = await this._reader.read(filePath);

        const enc = this._encodings[encoding ?? ''];

        if (!enc) {

            throw new eL.E_ENCODING_NOT_FOUND({ encoding });
        }

        let input: iL.IDict;

        try {

            input = enc.decode(content) as iL.IDict;
        }
        catch (err: unknown) {

            throw new eL.E_DECODING_FAILED({ encoding, filePath }, err);
        }

        if (Array.isArray(input)) {

            const ret: unknown[] = [];

            await this._processArray(input, {
                'currentPath': filePath,
                'rootPath': parent ?? filePath,
                'loader': loader,
                'inputData': input,
                'output': ret,
                'inputEntry': 0,
                'outputEntry': 0,
            });

            return ret;
        }

        if (_.isObject(input)) {

            const ret: iL.IDict = {};

            await this._processObject(input, {
                'currentPath': filePath,
                'rootPath': parent ?? filePath,
                'loader': loader,
                'inputData': input,
                'output': ret,
                'inputEntry': '',
                'outputEntry': '',
            });

            return ret;
        }

        throw new eL.E_INVALID_CONFIG({ filePath });
    }

    private async _processString(str: string, ctx: dL.IOperatorContext): Promise<void> {

        const opList = _.parseOperation(str, this._opPrefix, this._opSuffix);

        let ret: unknown = str;

        if (opList.length !== 0) {

            const onlyInline = opList[0].expr !== str; // not "$[[op]]" or "$[[op:val]]"

            if (onlyInline) {

                ret = await this._processInlineString(opList, str, ctx);
            }
            else {

                const op = opList[0];
                const operator = this._getOperator(op);

                const blockOp = operator.modes[cL.EOperatorMode.BLOCK];
                const inlineOp = operator.modes[cL.EOperatorMode.INLINE];

                if (blockOp) {

                    await blockOp.process(op.value ?? '', ctx);
                    return;
                }

                if (inlineOp) {

                    ret = await inlineOp.process(op.value ?? '', ctx);
                }
                else {

                    throw new eL.E_OPERATOR_MODE_MISMATCH({
                        code: op.name,
                        expected: 'block or inline',
                    });
                }
            }
        }

        if (Array.isArray(ctx.output)) {

            ctx.output.push(ret);
        }
        else {

            (ctx.output as iL.IDict)[ctx.outputEntry] = ret;
        }
    }

    private async _processInlineString(
        opList: _.IOperation[],
        str: string,
        ctx: dL.IOperatorContext,
    ): Promise<string> {

        for (const op of opList) {

            const operator = this._getOperator(op);

            const inlineOp = operator.modes[cL.EOperatorMode.INLINE];

            if (!inlineOp) {

                throw new eL.E_OPERATOR_MODE_MISMATCH({
                    code: op.name,
                    expected: 'inline',
                });
            }

            str = str.replace(op.expr, await inlineOp.process(op.value ?? '', ctx));
        }

        return str;
    }

    private async _processArray(data: unknown[], ctx: dL.IOperatorContext): Promise<void> {

        const ret = ctx.output as unknown[];

        for (let i = 0; i < data.length; i++) {

            const v = data[i];

            ctx.inputEntry = i;
            ctx.outputEntry = ret.length;

            if (typeof v === 'string') {

                await this._processString(v, ctx);
                continue;
            }

            if (_.isObject(v)) {

                const item: iL.IDict = {};
                await this._processObject(v as iL.IDict, {
                    ...ctx,
                    'output': item,
                    'inputEntry': '',
                    'outputEntry': '',
                });
                ret.push(item);
                continue;
            }

            if (Array.isArray(v)) {
                const item: unknown[] = [];
                await this._processArray(v, {
                    ...ctx,
                    'output': item,
                    'inputEntry': 0,
                    'outputEntry': 0,
                });
                ret.push(item);
                continue;
            }

            ret.push(v);
        }
    }

    private async _processObject(data: iL.IDict, ctx: dL.IOperatorContext): Promise<void> {

        const ret = ctx.output as iL.IDict;

        const [beforePropNameOps, afterPropNameOps, byPosPropNameOps] = this._resolveContainerOperations(data);

        for (const op of beforePropNameOps) {

            const operator = op.inf.operator.modes[cL.EOperatorMode.CONTAINER]!;

            await operator.process({
                operand: op.v,
                value: op.propValue,
            }, ctx);
        }

        for (const k of Object.keys(data)) {

            const v = data[k];

            if (byPosPropNameOps[k]) {

                delete data[k];

                const op = byPosPropNameOps[k];
                const operator = op.inf.operator.modes[cL.EOperatorMode.CONTAINER]!;

                await operator.process({
                    operand: op.v,
                    value: op.propValue,
                }, ctx);
                continue;
            }

            ctx.inputEntry = k;
            ctx.outputEntry = k;

            if (typeof v === 'string') {

                await this._processString(v, ctx);
                continue;
            }

            if (_.isObject(v)) {

                const prop: iL.IDict = ret[k] = {};
                await this._processObject(v as iL.IDict, {
                    ...ctx,
                    'output': prop,
                    'inputEntry': '',
                    'outputEntry': '',
                });
                continue;
            }

            if (Array.isArray(v)) {
                const prop: unknown[] = ret[k] = [];
                await this._processArray(v, {
                    ...ctx,
                    'output': prop,
                    'inputEntry': 0,
                    'outputEntry': 0,
                });
                continue;
            }

            ret[k] = v;
        }

        for (const op of afterPropNameOps) {

            const operator = op.inf.operator.modes[cL.EOperatorMode.CONTAINER]!;

            await operator.process({
                operand: op.v,
                value: op.propValue,
            }, ctx);
        }
    }
}
