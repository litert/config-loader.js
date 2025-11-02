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

import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import * as _ from './Utils';

NodeTest.describe('Function Utils.regexpEscape', () => {

    for (const char of ['\\', '.', '*', '+', '?', '^', '$', '(', ')', '[', ']', '{', '}', '|']) {

        NodeTest.it(`escape "${char}" correctly`, () => {
            const expected = `\\${char}`;
            NodeAssert.strictEqual(_.regexpEscape(char), expected);
        });
    }

    NodeTest.it(`do nothing if no need to escape`, () => {

        NodeAssert.strictEqual(_.regexpEscape('hello world'), 'hello world');
        NodeAssert.strictEqual(_.regexpEscape(''), '');
    });
});

NodeTest.describe('Function Utils.parseOperation', () => {

    NodeTest.it(`return an empty array if no matches`, () => {

        NodeAssert.deepStrictEqual(_.parseOperation('hello world', '{{', '}}'), []);
        NodeAssert.deepStrictEqual(_.parseOperation('{{hello world', '{{', '}}'), []);
        NodeAssert.deepStrictEqual(_.parseOperation('{{hello]] world', '{{', '}}'), []);
        NodeAssert.deepStrictEqual(_.parseOperation('{{hello)) world', '{{', '}}'), []);
        NodeAssert.deepStrictEqual(_.parseOperation('[[hello}} world', '{{', '}}'), []);
        NodeAssert.deepStrictEqual(_.parseOperation('{{hello{{}} world', '{{', '}}'), []);
    });

    NodeTest.it(`parse a single operation with value`, () => {

        const input = '{{hello:world}}';
        const expected = [{
            expr: input,
            name: 'hello',
            value: 'world',
            options: {},
        }];

        NodeAssert.deepStrictEqual(_.parseOperation(input, '{{', '}}'), expected);
    });

    NodeTest.it(`parse a single operation without value`, () => {

        const input = '{{hello}}';
        const expected = [{
            expr: input,
            name: 'hello',
            value: '',
            options: {},
        }];

        NodeAssert.deepStrictEqual(_.parseOperation(input, '{{', '}}'), expected);
    });

    NodeTest.it(`parse a single operation with an empty value`, () => {

        const input = '{{hello:}}';
        const expected = [{
            expr: input,
            name: 'hello',
            value: '',
            options: {},
        }];

        NodeAssert.deepStrictEqual(_.parseOperation(input, '{{', '}}'), expected);
    });

    NodeTest.it(`always turn the operator code to lowercase`, () => {

        const input = '{{HELLO:wOrLd}}';
        const expected = [{
            expr: input,
            name: 'hello',
            value: 'wOrLd',
            options: {},
        }];

        NodeAssert.deepStrictEqual(_.parseOperation(input, '{{', '}}'), expected);
    });

    NodeTest.it(`ignore invalid operator code`, () => {

        const input = '{{A.b}}';

        NodeAssert.deepStrictEqual(_.parseOperation(input, '{{', '}}'), []);
    });

    NodeTest.it(`parse multiple operations correctly`, () => {

        const input = '{{a:b}}{{decode-test}} {{invalid{{}} {{d:e:f}}';

        NodeAssert.deepStrictEqual(_.parseOperation(input, '{{', '}}'), [
            { expr: '{{a:b}}', name: 'a', value: 'b', options: {}, },
            { expr: '{{decode-test}}', name: 'decode-test', value: '', options: {}, },
            { expr: '{{d:e:f}}', name: 'd', value: 'e:f', options: {},  }
        ]);
    });
});

NodeTest.describe('Function Utils.parseContainerOperation', () => {

    NodeTest.it(`return null if not container operation`, () => {
        NodeAssert.deepStrictEqual(_.parseContainerOperation('hello world', '{{', '}}'), null);
        NodeAssert.deepStrictEqual(_.parseContainerOperation('{{hello world', '{{', '}}'), null);
        NodeAssert.deepStrictEqual(_.parseContainerOperation(' {{hello}}', '{{', '}}'), null);
        NodeAssert.deepStrictEqual(_.parseContainerOperation('{{hello}} ', '{{', '}}'), null);
        NodeAssert.deepStrictEqual(_.parseContainerOperation(' {{hello}} ', '{{', '}}'), null);
        NodeAssert.deepStrictEqual(_.parseContainerOperation('{{hello{{}} ', '{{', '}}'), null);
        NodeAssert.deepStrictEqual(_.parseContainerOperation(' {{hello:world}}', '{{', '}}'), null);
        NodeAssert.deepStrictEqual(_.parseContainerOperation('{{hello:world}} ', '{{', '}}'), null);
        NodeAssert.deepStrictEqual(_.parseContainerOperation(' {{hello:world}} ', '{{', '}}'), null);
        NodeAssert.deepStrictEqual(_.parseContainerOperation('{{hello:world{{}} ', '{{', '}}'), null);
    });

    NodeTest.it(`return the operation if it is a valid container operation`, () => {
        NodeAssert.deepStrictEqual(
            _.parseContainerOperation('{{hello:world}}', '{{', '}}'),
            { expr: '{{hello:world}}', name: 'hello', value: 'world', options: {}, },
        );
    });
});
