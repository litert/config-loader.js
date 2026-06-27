# Module `@litert/config-loader/operators`

This module groups the built-in operators and the helper that instantiates all of them. Import from here when you want the operator catalog in one place.

[TOC]

## Sub-Modules

| Sub-Module | Description |
| --- | --- |
| [`decode-base64`](./decode-base64/classes/DecodeBase64Operator.md) | Direct class page for the `@litert/config-loader/operators/DecodeBase64` import path. |
| [`decode-hex`](./decode-hex/classes/DecodeHexOperator.md) | Direct class page for the `@litert/config-loader/operators/DecodeHex` import path. |
| [`environment-variable`](./environment-variable/classes/EnvironmentVariableOperator.md) | Direct class page for the `@litert/config-loader/operators/EnvironmentVariable` import path. |
| [`extends`](./extends/classes/ExtendsOperator.md) | Direct class page for the `@litert/config-loader/operators/Extends` import path. |
| [`import`](./import/classes/ImportOperator.md) | Direct class page for the `@litert/config-loader/operators/Import` import path. |
| [`import-binary-file`](./import-binary-file/classes/ImportBinaryFileOperator.md) | Direct class page for the `@litert/config-loader/operators/ImportBinaryFile` import path. |
| [`import-text-file`](./import-text-file/classes/ImportTextFileOperator.md) | Direct class page for the `@litert/config-loader/operators/ImportTextFile` import path. |
| [`resolve-path`](./resolve-path/classes/ResolvePathOperator.md) | Direct class page for the `@litert/config-loader/operators/ResolvePath` import path. |

## Functions

| Function | Description |
| --- | --- |
| [`getAllBuiltInOperators`](./functions/GetAllBuiltInOperators.md) | Creates fresh instances of every built-in operator. |

## Classes

| Class | Description |
| --- | --- |
| [`DecodeBase64Operator`](./classes/DecodeBase64Operator.md) | Block operator that converts Base64 text into a `Buffer`. |
| [`DecodeHexOperator`](./classes/DecodeHexOperator.md) | Block operator that converts hexadecimal text into a `Buffer`. |
| [`EnvironmentVariableOperator`](./classes/EnvironmentVariableOperator.md) | Inline operator that resolves environment variables with optional fallbacks. |
| [`ExtendsOperator`](./classes/ExtendsOperator.md) | Container/block operator that merges referenced configuration files. |
| [`ImportOperator`](./classes/ImportOperator.md) | Block operator that loads another configuration file as a nested value. |
| [`ImportBinaryFileOperator`](./classes/ImportBinaryFileOperator.md) | Block operator that reads raw file bytes into the output. |
| [`ImportTextFileOperator`](./classes/ImportTextFileOperator.md) | Inline operator that injects a referenced file as text. |
| [`ResolvePathOperator`](./classes/ResolvePathOperator.md) | Inline operator that resolves a path via the active reader. |
