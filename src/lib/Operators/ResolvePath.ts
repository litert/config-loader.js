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

class ResolvePathInlineOperator implements dL.IInlineOperator {

    public process(operand: string, ctx: dL.IOperatorContext): string {

        return ctx.loader.reader.resolvePath(ctx.currentPath, operand);
    }

    public processSync(operand: string, ctx: dL.IOperatorContext): string {

        return ctx.loader.reader.resolvePath(ctx.currentPath, operand);
    }
}

/**
 * This operator resolves a path as the data reader would do.
 *
 * @mode inline
 *
 * @syntax `"$[[path:<variable-name>]]"`
 */
export class ResolvePathOperator implements dL.IOperator {

    public readonly code = 'path';

    public readonly aliases = [];

    public readonly modes = {
        [cL.EOperatorMode.INLINE]: new ResolvePathInlineOperator(),
    };
}
