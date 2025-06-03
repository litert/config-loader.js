import * as ConfigLoader from '../../lib';
import * as BuiltInEnc from '../../lib/Encodings';
import { LocalFileReader } from '../../lib/Readers/LocalFileReader';
import { UppercaseOperator } from './uppercase-operator';

const loader = new ConfigLoader.ConfigLoader({
    reader: new LocalFileReader({
        encodings: {
            '.json': 'json',
        }
    }),
    encodings: BuiltInEnc.getAllBuiltInEncodings(),
    operators: [ new UppercaseOperator() ]
});

const ret = loader.loadSync(`${__dirname}/../../test-data/02/main.json`);

console.log(ret);
