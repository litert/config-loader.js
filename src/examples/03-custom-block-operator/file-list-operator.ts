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
