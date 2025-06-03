import * as ConfigLoader from '../../lib';
import * as BuiltInEnc from '../../lib/Encodings';
import { LocalFileReader } from '../../lib/Readers/LocalFileReader';
import { FileListOperator } from './file-list-operator';

const loader = new ConfigLoader.ConfigLoader({
    reader: new LocalFileReader({
        encodings: {
            '.json': 'json',
        }
    }),
    encodings: BuiltInEnc.getAllBuiltInEncodings(),
    operators: [ new FileListOperator() ]
});

const ret = loader.loadSync(`${__dirname}/../../test-data/03/main.json`);

console.log(ret);
