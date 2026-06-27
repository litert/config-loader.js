# API Reference — @litert/config-loader

This API reference documents the consumer-visible modules of `@litert/config-loader`. The pages are organized by the package import paths that applications can actually use, rather than by the repository's internal source folders.

[TOC]

## Overview

The package exposes one main entry point for the core loader, shared typings, enums, and error classes. Additional sub-path modules provide built-in encodings, built-in operators, and concrete reader implementations that can be imported either in aggregate or one-by-one.

## Modules

| Module | Import Path | Description |
| --- | --- | --- |
| [`config-loader`](./config-loader/README.md) | `@litert/config-loader` | The main loader class together with the shared typings, enums, and runtime error types. |
| [`encodings`](./encodings/README.md) | `@litert/config-loader/encodings` | Built-in JSON and YAML encoding helpers plus the registry convenience function. |
| [`encodings/json`](./encodings/json/classes/JsonEncoding.md) | `@litert/config-loader/encodings/Json` | Direct access to the JSON decoder class. |
| [`encodings/yaml`](./encodings/yaml/classes/YamlEncoding.md) | `@litert/config-loader/encodings/Yaml` | Direct access to the YAML decoder class. |
| [`operators`](./operators/README.md) | `@litert/config-loader/operators` | Built-in operators and the convenience function that instantiates all of them. |
| [`operators/decode-base64`](./operators/decode-base64/classes/DecodeBase64Operator.md) | `@litert/config-loader/operators/DecodeBase64` | The block operator that decodes Base64 text into a `Buffer`. |
| [`operators/decode-hex`](./operators/decode-hex/classes/DecodeHexOperator.md) | `@litert/config-loader/operators/DecodeHex` | The block operator that decodes hexadecimal text into a `Buffer`. |
| [`operators/environment-variable`](./operators/environment-variable/classes/EnvironmentVariableOperator.md) | `@litert/config-loader/operators/EnvironmentVariable` | The inline operator that resolves environment variables with optional fallback behavior. |
| [`operators/extends`](./operators/extends/classes/ExtendsOperator.md) | `@litert/config-loader/operators/Extends` | The operator that merges additional configuration files into the current structure. |
| [`operators/import`](./operators/import/classes/ImportOperator.md) | `@litert/config-loader/operators/Import` | The block operator that loads another configuration file as a nested value. |
| [`operators/import-binary-file`](./operators/import-binary-file/classes/ImportBinaryFileOperator.md) | `@litert/config-loader/operators/ImportBinaryFile` | The block operator that reads raw bytes from a referenced file. |
| [`operators/import-text-file`](./operators/import-text-file/classes/ImportTextFileOperator.md) | `@litert/config-loader/operators/ImportTextFile` | The inline operator that injects a referenced file as text. |
| [`operators/resolve-path`](./operators/resolve-path/classes/ResolvePathOperator.md) | `@litert/config-loader/operators/ResolvePath` | The inline operator that resolves a path exactly as the active reader would. |
| [`readers/local-file-reader`](./readers/local-file-reader/classes/LocalFileReader.md) | `@litert/config-loader/readers/LocalFileReader` | The filesystem-backed reader implementation used by most local configuration workflows. |
