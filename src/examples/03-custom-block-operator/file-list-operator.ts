/**
 * Copyright 2025 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as ConfigLoader from '../../lib';
import * as NodeFS from 'node:fs';

export class FileListOperator implements ConfigLoader.IOperator {

    public readonly code = 'file-list';

    public readonly aliases = [];

    public readonly modes = {
        [ConfigLoader.EOperatorMode.BLOCK]: {
            async process(value: string, ctx: ConfigLoader.IOperatorContext): Promise<void> {

                const path = ctx.loader.reader.resolvePath(ctx.currentPath, value);

                (ctx.output as unknown[])[ctx.inputEntry as number] = await NodeFS.promises.readdir(path);
            },
            processSync(value: string, ctx: ConfigLoader.IOperatorContext): void {

                const path = ctx.loader.reader.resolvePath(ctx.currentPath, value);

                (ctx.output as unknown[])[ctx.inputEntry as number] = NodeFS.readdirSync(path);
            },
        },
    }
}
