import * as ConfigLoader from '../../lib';
import * as BuiltInEnc from '../../lib/Encodings';
import { LocalFileReader } from '../../lib/Readers/LocalFileReader';
import { ValidateOperator } from './validate-operator';

const loader = new ConfigLoader.ConfigLoader({
    reader: new LocalFileReader({
        encodings: {
            '.json': 'json',
            '.yml': 'yaml',
            '.yaml': 'yaml',
        }
    }),
    encodings: BuiltInEnc.getAllBuiltInEncodings(),
    operators: [ new ValidateOperator() ]
});

const ret = loader.loadSync(`${__dirname}/../../test-data/04/main.json`);

console.log(ret);
