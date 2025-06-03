import * as ConfigLoader from '../../lib';
import * as BuiltInEnc from '../../lib/Encodings';
import * as BuiltInOps from '../../lib/Operators';
import { LocalFileReader } from '../../lib/Readers/LocalFileReader';

const loader = new ConfigLoader.ConfigLoader({
    reader: new LocalFileReader({
        encodings: {
            '.json': 'json',
            '.yaml': 'yaml',
            '.yml': 'yaml',
        }
    }),
    encodings: BuiltInEnc.getAllBuiltInEncodings(),
    operators: BuiltInOps.getAllBuiltInOperators(),
});

process.env.TEST_ABC = '123';
process.env.TEST_BCD = '456';

(async () => {

    const ret = await loader.load(`${__dirname}/../../test-data/01/main.json`);

    console.log(ret);

})();
