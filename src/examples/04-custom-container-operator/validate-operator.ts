import * as ConfigLoader from '../../lib';
import * as NodeFS from 'node:fs';

type IObject = Record<string, unknown>;

export class ValidateOperator implements ConfigLoader.IOperator {

    public readonly code = 'validate';

    public readonly aliases = [];

    public readonly modes = {
        [ConfigLoader.EOperatorMode.CONTAINER]: {
            order: ConfigLoader.EContainerOperatorOrder.AFTER,
            async process(
                args: ConfigLoader.IContainerOperatorArgs,
                ctx: ConfigLoader.IOperatorContext,
            ): Promise<void> {
                if (typeof args.value !== 'string') {
                    throw new TypeError(`Expected a string, got ${typeof args.value}`);
                }
                this.validate(
                    JSON.parse((await NodeFS.promises.readFile(
                        ctx.loader.reader.resolvePath(ctx.currentPath, args.value)
                    )).toString()),
                    ctx.output as IObject,
                );
            },
            processSync(
                args: ConfigLoader.IContainerOperatorArgs,
                ctx: ConfigLoader.IOperatorContext,
            ): void {

                if (typeof args.value !== 'string') {
                    throw new TypeError(`Expected a string, got ${typeof args.value}`);
                }

                this.validate(
                    JSON.parse(NodeFS.readFileSync(
                        ctx.loader.reader.resolvePath(ctx.currentPath, args.value)
                    ).toString()),
                    ctx.output as IObject,
                );
            },
            validate(rules: IObject, data: IObject): void {

                for (const k in rules) {

                    if (typeof (data as IObject)[k] !== (rules as IObject)[k]) {

                        throw new TypeError(
                            `Expected property "${k}" to be of type ${(rules as IObject)[k]}`
                        );
                    }
                }
            }
        },
    }
}
