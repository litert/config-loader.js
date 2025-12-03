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

import type { IDict } from '@litert/utils-ts-types';
import * as cL from '../Constants';
import type * as dL from '../Declaration';
import * as _ from '../Utils';

const FILES_TRAVERSED = Symbol('import:files_traversed');

class ImportBlockOperator implements dL.IBlockOperator {

    public async process(operand: string, ctx: dL.IOperatorContext): Promise<void> {

        const filePath = ctx.loader.reader.resolvePath(ctx.currentPath, operand);

        this._checkAndStart(ctx, filePath);

        const data = await ctx.loader.load({
            'path': filePath,
            'parent': ctx.currentPath,
            'contextData': ctx.contextData,
        });

        this._clean(ctx, filePath);

        if (_.isObject(ctx.output)) {

            ctx.output[ctx.outputEntry] = data;
        }
        else {

            ctx.output.push(data);
        }
    }

    public processSync(operand: string, ctx: dL.IOperatorContext): void {

        const filePath = ctx.loader.reader.resolvePath(ctx.currentPath, operand);

        this._checkAndStart(ctx, filePath);

        const data = ctx.loader.loadSync({
            'path': filePath,
            'parent': ctx.currentPath,
            'contextData': ctx.contextData,
        });

        this._clean(ctx, filePath);

        if (_.isObject(ctx.output)) {

            ctx.output[ctx.outputEntry] = data;
        }
        else {

            ctx.output.push(data);
        }
    }

    private _checkAndStart(ctx: dL.IOperatorContext, file: string): void {

        const filesTraversed = ctx.contextData[FILES_TRAVERSED] ??= {
            [ctx.currentPath]: true,
        } as IDict;

        if (filesTraversed[file]) {

            throw new Error(`Circular reference detected when importing from "${file}".`);
        }

        filesTraversed[file] = true;
    }

    private _clean(ctx: dL.IOperatorContext, file: string): void {

        delete ctx.contextData[FILES_TRAVERSED]?.[file];
    }
}

export class ImportOperator implements dL.IOperator {

    public readonly code = 'import';

    public readonly aliases = [];

    public readonly modes = {
        [cL.EOperatorMode.BLOCK]: new ImportBlockOperator(),
    };
}
