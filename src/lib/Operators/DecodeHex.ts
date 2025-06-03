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

import type * as dL from '../Declaration';
import * as cL from '../Constants';
import * as _ from '../Utils';

class DecodeHexBlockOperator implements dL.IBlockOperator {

    public process(operand: string, ctx: dL.IOperatorContext): void {

        this.processSync(operand, ctx);
    }

    public processSync(operand: string, ctx: dL.IOperatorContext): void {

        const val = Buffer.from(operand, 'hex');

        if (_.isObject(ctx.output)) {

            ctx.output[ctx.outputEntry] = val;
        }
        else {

            ctx.output.push(val);
        }
    }
}

/**
 * This operator decodes a hexadecimal-encoded string into a Buffer.
 *
 * @mode block
 *
 * @syntax `"$[[hex:<hex-encoded-string>]]"`
 */
export class DecodeHexOperator implements dL.IOperator {

    public readonly code = 'hex';

    public readonly aliases = [];

    public readonly modes = {
        [cL.EOperatorMode.BLOCK]: new DecodeHexBlockOperator(),
    };
}
