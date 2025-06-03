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

class ImportTextFileInlineOperator implements dL.IInlineOperator {

    public async process(operand: string, ctx: dL.IOperatorContext): Promise<string> {

        const file = ctx.loader.reader.resolvePath(ctx.currentPath, operand);
        return (await ctx.loader.reader.read!(file)).content.toString();
    }

    public processSync(operand: string, ctx: dL.IOperatorContext): string {

        const file = ctx.loader.reader.resolvePath(ctx.currentPath, operand);
        return ctx.loader.reader.readSync!(file).content.toString();
    }
}

export class ImportTextFileOperator implements dL.IOperator {

    public readonly code = 'text-file';

    public readonly aliases = [];

    public readonly modes = {
        [cL.EOperatorMode.INLINE]: new ImportTextFileInlineOperator(),
    };
}
