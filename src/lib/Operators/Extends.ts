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
import * as _ from '../Utils';
import type { IDict } from '../_internal/Decl';

class ExtendsContainerOperator implements dL.IContainerOperator {

    public readonly order = cL.EContainerOperatorOrder.BEFORE;

    public async process(args: dL.IContainerOperatorArgs, ctx: dL.IOperatorContext): Promise<void> {

        for (const path of this._parseArgs(args)) {

            const data = await ctx.loader.load(
                ctx.loader.reader.resolvePath(ctx.currentPath, path),
                ctx.currentPath,
            ) as dL.IVessel;

            if (_.isObject(data)) {

                Object.assign(ctx.output, _.deepMerge(ctx.output as IDict, data, { arrayAsValue: true }));
            }
            else {

                throw new TypeError('Cannot extend from non-object from "${path}".');
            }
        }
    }

    private _parseArgs(args: dL.IContainerOperatorArgs): string[] {

        const pathList: string[] = [];

        if (typeof args.value === 'string') {

            pathList.push(args.value);
        }
        else if (Array.isArray(args.value)) {

            for (const item of args.value) {

                if (typeof item !== 'string') {

                    throw new TypeError(`Can not extend from non-string and non-string-array, got a "${typeof item}".`);
                }

                pathList.push(item);
            }
        }
        else {

            throw new TypeError(`Can not extend from non-string and non-string-array, got a "${typeof args.value}".`);
        }

        return pathList;
    }

    public processSync(args: dL.IContainerOperatorArgs, ctx: dL.IOperatorContext): void {

        for (const path of this._parseArgs(args)) {

            const data = ctx.loader.loadSync(
                ctx.loader.reader.resolvePath(ctx.currentPath, path),
                ctx.currentPath,
            ) as dL.IVessel;

            if (_.isObject(data)) {

                Object.assign(ctx.output, _.deepMerge(ctx.output as IDict, data, { arrayAsValue: true }));
            }
            else {

                throw new TypeError('Cannot extend from non-object from "${path}".');
            }
        }
    }
}

class ExtendsBlockOperator implements dL.IBlockOperator {

    public async process(operand: string, ctx: dL.IOperatorContext): Promise<void> {

        if (!Array.isArray(ctx.output)) {

            throw new TypeError(`Cannot use "$[[extends:${operand}]]" outsides arrays.`);
        }

        const data = await ctx.loader.load(
            ctx.loader.reader.resolvePath(ctx.currentPath, operand),
            ctx.currentPath,
        ) as dL.IVessel;

        if (!Array.isArray(data)) {

            throw new TypeError(`Cannot extend from non-array from "${operand}".`);
        }

        ctx.output.push(...data);
    }

    public processSync(operand: string, ctx: dL.IOperatorContext): void {

        if (!Array.isArray(ctx.output)) {

            throw new TypeError(`Cannot use "$[[extends:${operand}]]" outsides arrays.`);
        }

        const data = ctx.loader.loadSync(
            ctx.loader.reader.resolvePath(ctx.currentPath, operand),
            ctx.currentPath,
        ) as dL.IVessel;

        if (!Array.isArray(data)) {

            throw new TypeError(`Cannot extend from non-array from "${operand}".`);
        }

        ctx.output.push(...data);
    }
}

export class ExtendsOperator implements dL.IOperator {

    public readonly code = 'extends';

    public readonly aliases = [];

    public readonly modes = {
        [cL.EOperatorMode.CONTAINER]: new ExtendsContainerOperator(),
        [cL.EOperatorMode.BLOCK]: new ExtendsBlockOperator(),
    };
}
