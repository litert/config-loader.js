# Module `@litert/config-loader/encodings`

This module bundles the built-in encoding helpers and exposes a convenience function for registering all of them at once.

[TOC]

## Sub-Modules

| Sub-Module | Description |
| --- | --- |
| [`json`](./json/classes/JsonEncoding.md) | Direct class page for the `@litert/config-loader/encodings/Json` import path. |
| [`yaml`](./yaml/classes/YamlEncoding.md) | Direct class page for the `@litert/config-loader/encodings/Yaml` import path. |

## Functions

| Function | Description |
| --- | --- |
| [`getAllBuiltInEncodings`](./functions/GetAllBuiltInEncodings.md) | Creates fresh `JsonEncoding` and `YamlEncoding` instances for registration. |

## Classes

| Class | Description |
| --- | --- |
| [`JsonEncoding`](./classes/JsonEncoding.md) | Decodes JSON text with the native `JSON.parse` implementation. |
| [`YamlEncoding`](./classes/YamlEncoding.md) | Decodes YAML content with the `yaml` package parser. |
