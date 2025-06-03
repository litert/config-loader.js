/**
 *  Copyright 2025 Angus.Fenying <fenying@litert.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

export { regexpEscape } from '@litert/utils-string';
export { deepMerge } from '@litert/utils-object';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IOperation {

    expr: string;

    name: string;

    value: string | null;
}

export function parseOperation(input: string, prefix: string, suffix: string): IOperation[] {

    const ret: IOperation[] = [];

    let offset = 0;

    while (offset < input.length) {

        const start = input.indexOf(prefix, offset);
        if (start === -1) {
            break;
        }
        offset = start + prefix.length;

        const end = input.indexOf(suffix, offset);
        if (end === -1) {
            break;
        }

        offset = end + suffix.length;

        const operation = input.slice(start + prefix.length, end);

        if (operation.includes(prefix)) {

            continue;
        }

        const colonIndex = operation.indexOf(':');

        const name = colonIndex === -1
            ? operation.trim().toLowerCase()
            : operation.slice(0, colonIndex).trim().toLowerCase();

        if (!isValidOperator(name)) {
            continue;
        }

        const value = colonIndex === -1
            ? ''
            : operation.slice(colonIndex + 1);

        ret.push({ name, value, expr: input.slice(start, end + suffix.length) });
    }

    return ret;
}

export function parseContainerOperation(input: string, prefix: string, suffix: string): IOperation | null {

    const operation = parseOperation(input, prefix, suffix);

    if (operation.length !== 1) {

        return null;
    }

    const op = operation[0];

    if (op.expr !== input) {

        return null;
    }

    return op;
}

const REGEX_OPERATOR_CODE = /^[a-z0-9]+([-_][a-z0-9]+)*$/;

export function isValidOperator(code: string): boolean {

    return REGEX_OPERATOR_CODE.test(code);
}

export function isObject(value: unknown): value is Record<string, unknown> {

    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
