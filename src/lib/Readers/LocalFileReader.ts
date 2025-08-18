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

import * as NodePath from 'node:path';
import * as NodeFS from 'node:fs';
import type * as dL from '../Declaration';
import * as eL from '../Errors';
import { IDict } from '../_internal/Decl';

/**
 * The options for the LocalFileReader constructor.
 */
export interface ILocalFileReaderOptions {

    /**
     * The path separator to use for resolving paths.
     *
     * @default require('node:path').sep
     */
    pathSeparator?: string;

    /**
     * A mapping of file extensions to encoding names.
     *
     * @example {".json": "json", ".yml": "yaml"}
     */
    encodings: IDict<string>;
}

/**
 * The data reader for files in the local file system.
 */
export class LocalFileReader implements dL.IDataReader {

    private readonly _extensions: IDict<string> = {};

    private readonly _pathSeparator: string;

    public constructor(opts: ILocalFileReaderOptions) {

        this._pathSeparator = opts.pathSeparator ?? NodePath.sep;
        this._extensions = opts.encodings;
    }

    public resolvePath(ref: string, file: string): string {

        return NodePath.isAbsolute(file) ? file : NodePath.resolve(NodePath.join(NodePath.dirname(ref), file));
    }

    private _readExtension(filePath: string): string {

        const fileName = filePath.split(this._pathSeparator).pop();

        if (!fileName) {

            throw new eL.E_READ_FILE_FAILED({ filePath });
        }

        const dotIndex = fileName.lastIndexOf('.');

        return (dotIndex !== -1 ? fileName.substring(dotIndex) : fileName).toLowerCase();
    }

    public readSync(filePath: string): dL.IReadResult {

        const fileExtension = this._readExtension(filePath);

        try {

            return {
                encoding: this._extensions[fileExtension] ?? '',
                content: NodeFS.readFileSync(filePath),
            };
        }
        catch (e) {

            throw new eL.E_READ_FILE_FAILED({ filePath }, e);
        }
    }

    public async read(filePath: string): Promise<dL.IReadResult> {

        const fileExtension = this._readExtension(filePath);

        try {

            return {
                encoding: this._extensions[fileExtension] ?? '',
                content: await NodeFS.promises.readFile(filePath),
            };
        }
        catch (e) {

            throw new eL.E_READ_FILE_FAILED({ filePath }, e);
        }
    }
}
