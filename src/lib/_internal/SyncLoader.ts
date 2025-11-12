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

export class SyncConfigLoader extends AbstractLoader {

    public load(filePath: string, loader: dL.ILoader, parent?: string): unknown {

        if (!this._reader.readSync) {

            throw new eL.E_READER_NOT_SUPPORT_SYNC();
        }

        filePath = this._reader.resolvePath(parent ?? '.', filePath);

        const { encoding, content } = this._reader.readSync(filePath);

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

            this._processArray(input, {
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

            this._processObject(input, {
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

    private _processString(str: string, ctx: dL.IOperatorContext): void {

        const opList = _.parseOperation(str, this._opPrefix, this._opSuffix);

        if (!opList.length) {

            this._writeOutput(ctx, str);
            return;
        }

        const onlyInline = opList[0].expr !== str; // not "$[[op]]" or "$[[op:val]]"

        if (onlyInline) {

            this._writeOutput(ctx, this._processInlineString(opList, str, ctx));
            return;
        }

        const op = opList[0];
        const operator = this._getOperator(op);

        if (!operator) {

            this._writeOutput(ctx, str);

            return;
        }

        const blockOp = operator.modes[cL.EOperatorMode.BLOCK];

        if (blockOp) {

            blockOp.processSync(op.value ?? '', ctx, op.options);
            return;
        }

        const inlineOp = operator.modes[cL.EOperatorMode.INLINE];

        if (inlineOp) {

            this._writeOutput(ctx, inlineOp.processSync(op.value ?? '', ctx, op.options));
            return;
        }

        throw new eL.E_OPERATOR_MODE_MISMATCH({
            code: op.name,
            expected: 'block or inline',
        });
    }

    private _processInlineString(opList: _.IOperation[], str: string, ctx: dL.IOperatorContext): string {

        for (const op of opList) {

            const operator = this._getOperator(op);

            if (!operator) {

                // keep original expression if operator not found
                continue;
            }

            const inlineOp = operator.modes[cL.EOperatorMode.INLINE];

            if (!inlineOp) {

                throw new eL.E_OPERATOR_MODE_MISMATCH({
                    code: op.name,
                    expected: 'inline',
                });
            }

            str = str.replace(op.expr, inlineOp.processSync(op.value ?? '', ctx, op.options));
        }

        return str;
    }

    private _processArray(data: unknown[], ctx: dL.IOperatorContext): void {

        const ret = ctx.output as unknown[];

        for (let i = 0; i < data.length; i++) {

            const v = data[i];

            ctx.inputEntry = i;
            ctx.outputEntry = ret.length; // so it will be the next index, appending to the array

            if (typeof v === 'string') {

                this._processString(v, ctx);
                continue;
            }

            if (_.isObject(v)) {

                const item: iL.IDict = {};
                this._processObject(v as iL.IDict, {
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
                this._processArray(v, {
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

    private _processObject(data: iL.IDict, ctx: dL.IOperatorContext): void {

        const ret = ctx.output as iL.IDict;

        const [beforePropNameOps, afterPropNameOps, byPosPropNameOps] = this._resolveContainerOperations(data);

        for (const op of beforePropNameOps) {

            const operator = op.inf.operator.modes[cL.EOperatorMode.CONTAINER]!;

            operator.processSync({
                operand: op.v,
                value: op.propValue,
                options: op.options,
            }, ctx);
        }

        for (const k of Object.keys(data)) {

            const v = data[k];

            if (byPosPropNameOps[k]) {

                delete data[k];

                const op = byPosPropNameOps[k];
                const operator = op.inf.operator.modes[cL.EOperatorMode.CONTAINER]!;

                operator.processSync({
                    operand: op.v,
                    value: op.propValue,
                    options: op.options,
                }, ctx);
                continue;
            }

            ctx.inputEntry = k;
            ctx.outputEntry = k;

            if (typeof v === 'string') {

                this._processString(v, ctx);
                continue;
            }

            if (_.isObject(v)) {

                const prop: iL.IDict = ret[k] = typeof (ctx.output as iL.IDict)[k] === 'object' ?
                    (ctx.output as iL.IDict)[k] as iL.IDict :
                    {};

                this._processObject(v as iL.IDict, {
                    ...ctx,
                    'output': prop,
                    'inputEntry': '',
                    'outputEntry': '',
                });
                continue;
            }

            if (Array.isArray(v)) {
                const prop: unknown[] = ret[k] = [];
                this._processArray(v, {
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

            operator.processSync({
                operand: op.v,
                value: op.propValue,
                options: op.options,
            }, ctx);
        }
    }
}
