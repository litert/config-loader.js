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

import type * as dT from '@litert/utils-ts-types';
import type { EOperatorMode, EContainerOperatorOrder } from './Constants';

/**
 * The additional options for operations.
 *
 * @example In the operation `$[[op:operand; option1; option2=value2]]`, the options are:
 * ```json
 * {
 *   "option1": true,
 *   "option2": "value2"
 * }
 * ```
 *
 * @since v1.1.0
 */
export type IOperationOptions = dT.IDict<string | boolean>;

/**
 * The encoding decoder interface for config loader.
 */
export interface IEncoding {

    /**
     * The name of the encoding.
     */
    readonly name: string;

    /**
     * Parse the given data and return the corresponding object.
     */
    decode(data: string | Buffer): unknown;
}

/**
 * The result of `IReader.read()` method.
 */
export interface IReadResult {

    /**
     * The content read by the reader.
     */
    content: string | Buffer;

    /**
     * The encoding of the content.
     *
     * This is used by the loader, to decode the content with an `IEncoding` instance.
     */
    encoding: string;
}

/**
 * The data reader interface for config loader.
 *
 * It's not just for reading the config data, could also be used by operators to read any data if needed.
 */
export interface IDataReader {

    /**
     * Read the content of the given path and return the result.
     *
     * @param dataPath The path of the data to be read. It could be path of anything, not just a file.
     */
    read?(dataPath: string): Promise<IReadResult>;

    /**
     * The synchronous version of `read()`.
     *
     * @param dataPath The path of the data to be read. It could be path of anything, not just a file.
     */
    readSync?(dataPath: string): IReadResult;

    /**
     * Resolve the path of `filePath` relative to `refFile`.
     *
     * @param refFile   The path of the first file.
     * @param filePath  The relative path of the second file.
     *
     * @returns The absolute path of `filePath`.
     * @example `resolveRelativePath('/path/to/file1.json', './a/file2.json')` returns `/path/to/a/file2.json`.
     */
    resolvePath(refFile: string, filePath: string): string;
}

export interface IOperatorContext {

    /**
     * The path of the root configuration (file) reading by the loader.
     */
    readonly rootPath: string;

    /**
     * The path of the current (nested) configuration (file) reading by the loader.
     */
    readonly currentPath: string;

    /**
     * The instance of the loader that is reading the configuration.
     */
    readonly loader: ILoader;

    /**
     * The entry of input data, where to read the data from.
     *
     * - If this is an array, it should be a number.
     * - If this is an object, it should be a string.
     */
    inputEntry: string | number;

    /**
     * The entry of output data, where to write the result to.
     *
     * - If this is an array, it should be a number, meaning the start index of the array to write the result to.
     * - If this is an object, it should be a string, meaning the property name of the object to write the result to.
     *
     * The value of this field is only for a suggestion, depending on the operator, it may not be used at all.
     */
    outputEntry: string | number;

    /**
     * The output vessel that the operator should write the result into.
     *
     * **WARNING always check if it's an array or an object before writing to it.**
     * **Use the correct method to write the data, such as `push()` for arrays or assigning a property for objects.**
     */
    output: IVessel;

    /**
     * The original input data that the operator is working on.
     *
     * **WARNING always check if it's an array or an object before writing to it.**
     * **It's not recommended to modify this data directly, as it may cause unexpected behavior.**
     */
    inputData: IVessel;
}

export interface IOperator {

    /**
     * The built-in code of the operator, could only contains below characters:
     *
     * - Lowercase letters: `a-z`
     * - Digit characters: `0-9`
     * - Underscore: `_`
     * - Hyphen: `-`
     *
     * This code could be overridden by the `overrideCode` option in `IAddOperatorOptions`
     * when adding the operator to the loader.
     */
    readonly code: string;

    /**
     * The code aliases of the operator, its format is the same as `code`.
     *
     * This could be ignored by the `noBuiltInAliases` option in `IAddOperatorOptions`
     * when adding the operator to the loader.
     *
     * Or add additional aliases to the operator by the `aliases` option in `IAddOperatorOptions`.
     */
    readonly aliases: string[];

    /**
     * Where the operator should be used.
     */
    readonly modes: {

        /**
         * The operator object processes the operand when it's under inline mode.
         *
         * @optional
         */
        readonly [EOperatorMode.INLINE]?: IInlineOperator;

        /**
         * The operator object processes the operand when it's under block mode.
         *
         * @optional
         */
        readonly [EOperatorMode.BLOCK]?: IBlockOperator;

        /**
         * The operator object processes the operand when it's under container mode.
         *
         * @optional
         */
        readonly [EOperatorMode.CONTAINER]?: IContainerOperator;
    };
}

/**
 * The interface for inline operators.
 */
export interface IInlineOperator {

    /**
     * Process the given operand and context, and return the result as a string.
     *
     * @param operand The operand to be processed.
     * @param context The context in which the operator is being processed.
     * @param options Additional options for processing the operator.
     *
     * @returns The result of processing the operand.
     *
     * @since v1.1.0: Added `options` parameter.
     */
    process(
        operand: string,
        context: IOperatorContext,
        options: IOperationOptions,
    ): Promise<string> | string;

    /**
     * The synchronous version of `process()`.
     *
     * @see {@link IInlineOperator.process}
     */
    processSync(
        operand: string,
        context: IOperatorContext,
        options: IOperationOptions,
    ): string;
}

/**
 * The interface for block operators.
 */
export interface IBlockOperator {

    /**
     * Process the given operand and context.
     *
     * If any result is produced, it should be written to the `context.output` vessel.
     *
     * @param operand The operand to be processed.
     * @param context The context in which the operator is being processed.
     * @param options Additional options for processing the operator.
     *
     * @returns void or a Promise that resolves when processing is complete.
     * @since v1.1.0: Added `options` parameter.
     */
    process(
        operand: string,
        context: IOperatorContext,
        options: IOperationOptions,
    ): Promise<void> | void;

    /**
     * The synchronous version of `process()`.
     *
     * @see {@link IBlockOperator.process}
     */
    processSync(
        operand: string,
        context: IOperatorContext,
        options: IOperationOptions,
    ): void;
}

/**
 * This type describes the vessel-like data structure that the loader will use to read/store the data.
 */
export type IVessel = Record<string, unknown> | unknown[];

/**
 * The parameters for the `IContainerOperator` interface.
 */
export interface IContainerOperatorArgs {

    /**
     * The operand of the operation, if exists.
     *
     * @example the `<operand>` part in `$[[op:operand]]`.
     */
    operand: string | null;

    /**
     * The value of the property.
     *
     * @example the `<value>` of the property in `{ "$[[op:operand]]": <value> }`.
     */
    value: unknown;

    /**
     * The options provided in the operation.
     *
     * @example the options in `$[[op:operand; option1; option2=value2]]`.
     */
    options: IOperationOptions;
}

/**
 * The interface for container operators.
 */
export interface IContainerOperator {

    /**
     * The application order of the operator.
     */
    readonly order: EContainerOperatorOrder;

    /**
     * Process the given arguments and context.
     *
     * If any result is produced, it should be written to the `context.output` vessel.
     *
     * @param args      The arguments for the operator, including the operand and the value of the property.
     * @param context   The context in which the operator is being processed.
     */
    process(args: IContainerOperatorArgs, context: IOperatorContext): Promise<void> | void;

    /**
     * The synchronous version of `process()`.
     *
     * @see {@link IContainerOperator.process}
     */
    processSync(args: IContainerOperatorArgs, context: IOperatorContext): void;
}

/**
 * The options for adding an operator to the loader.
 */
export interface IAddOperatorOptions {

    /**
     * Override (replace) the operator code.
     *
     * For example, if the operator code is `op1`, and you want to override it with `op2`, you can set this to `op2`.
     * Then the `op1` will not be registered, and the operator will be registered as `op2`.
     */
    overrideCode?: string;

    /**
     * Ignore the built-in aliases of the operator.
     *
     * If this is set to `true`, the built-in aliases of the operator will not be registered.
     */
    noBuiltInAliases?: boolean;

    /**
     * Additional aliases for the operator.
     *
     * This will not override the built-in aliases, but will be added to the aliases of the operator.
     */
    aliases?: string[];
}

/**
 * The interface for config loader.
 */
export interface ILoader {

    /**
     * The reader used by the loader to read the data.
     */
    readonly reader: IDataReader;

    /**
     * Check if the loader has the given encoding registered.
     */
    hasEncoding(encodingName: string): boolean;

    /**
     * Get the list of encoding names registered in the loader.
     */
    getEncodingNames(): string[];

    /**
     * Add a new operator to the loader.
     *
     * @param operator  The operator to be added to the loader.
     * @param options   The options for adding the operator to the loader.
     */
    addOperator(
        operator: IOperator,
        options?: IAddOperatorOptions,
    ): this;

    /**
     * Check if the loader has the given operator registered.
     */
    hasOperator(operatorCode: string): boolean;

    /**
     * Get the list of operator codes registered in the loader, including the aliases.
     */
    getOperatorCodes(): string[];

    /**
     * Load a configuration (file) from the given path.
     *
     * @param path      The path of the configuration (file) to be loaded.
     * @param parent    The path of the parent configuration (file) that is loading this configuration.
     */
    load(path: string, parent?: string): Promise<unknown>;

    /**
     * The synchronous version of `load()`.
     *
     * @see {@link ILoader.load}
     */
    loadSync(path: string, parent?: string): unknown;
}
