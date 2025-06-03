import * as ConfigLoader from '../../lib';

export class UppercaseOperator implements ConfigLoader.IOperator {

    public readonly code = 'uppercase';

    public readonly aliases = [];

    public readonly modes = {
        [ConfigLoader.EOperatorMode.INLINE]: {
            process(value: string): string {
                return value.toUpperCase();
            },
            processSync(value: string): string {
                return value.toUpperCase();
            },
        },
    }
}