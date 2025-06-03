import * as ConfigLoader from '../lib';
import * as BuiltInOps from '../lib/Operators';
import { LocalFileReader } from '../lib/Readers/LocalFileReader';

class IniEncoding implements ConfigLoader.IEncoding {

    public readonly name = 'ini';

    public decode(content: string | Buffer): unknown {

        if (typeof content !== 'string') {
            content = content.toString('utf8');
        }

        const lines = content.split('\n');

        const ret: Record<string, string> = {};

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const assignIndex = trimmed.indexOf('=');

                if (assignIndex === -1) {
                    continue;
                }

                const key = trimmed.slice(0, assignIndex).trim();
                const value = trimmed.slice(assignIndex + 1).trim();

                ret[key] = value;
            }
        }
        return ret;
    }
}

const loader = new ConfigLoader.ConfigLoader({
    reader: new LocalFileReader({
        encodings: {
            '.ini': 'ini',
        }
    }),
    encodings: [ new IniEncoding() ],
    operators: BuiltInOps.getAllBuiltInOperators(),
});

process.env.TEST_ABC = '123';
process.env.TEST_BCD = '456';

const ret = loader.loadSync(`${__dirname}/../test-data/06/main.ini`);

console.log(ret);
