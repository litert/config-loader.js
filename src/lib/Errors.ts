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

/**
 * The error class for config loader.
 */
export abstract class ConfigLoaderError extends Error {

    public constructor(
        /**
         * The name of the error.
         */
        name: string,
        /**
         * The message of the error.
         */
        message: string,
        public readonly ctx: Record<string, unknown> = {},
        /**
         * The metadata of the error.
         */
        public readonly origin: unknown = null
    ) {

        super(message);
        this.name = name;
    }
}

export const E_READ_FILE_FAILED = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'read_file_failed',
            'Failed to read the file.',
            ctx,
            origin,
        );
    }
};

export const E_DUP_ENCODING = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'dup_encoding',
            'The encoding is already registered.',
            ctx,
            origin,
        );
    }
};

export const E_ENCODING_NOT_FOUND = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'encoding_not_found',
            'The encoding does not exist.',
            ctx,
            origin,
        );
    }
};

export const E_DUP_OPERATOR = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'dup_operator',
            'The code of operator is already registered.',
            ctx,
            origin,
        );
    }
};

export const E_INVALID_OPERATOR = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'invalid_operator',
            'The code of operator is invalid.',
            ctx,
            origin,
        );
    }
};

export const E_OPERATOR_NOT_FOUND = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'operator_not_found',
            'The operator does not exist.',
            ctx,
            origin,
        );
    }
};

export const E_OPERATOR_MODE_MISMATCH = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'operator_mode_mismatch',
            'The operator can not be used here.',
            ctx,
            origin,
        );
    }
};

export const E_DECODING_FAILED = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'decoding_failed',
            'Failed to decode the content.',
            ctx,
            origin,
        );
    }
};

export const E_INVALID_CONFIG = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'invalid_config',
            'The configuration must be an object.',
            ctx,
            origin,
        );
    }
};

export const E_READER_NOT_SUPPORT_SYNC = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'reader_not_support_sync',
            'The reader can not work in synchronous mode.',
            ctx,
            origin,
        );
    }
};

export const E_READER_NOT_SUPPORT_ASYNC = class extends ConfigLoaderError {

    public constructor(ctx: Record<string, unknown> = {}, origin?: unknown) {

        super(
            'reader_not_support_async',
            'The reader can not work in asynchronous mode.',
            ctx,
            origin,
        );
    }
};
