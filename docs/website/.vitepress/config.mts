import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: '@litert/config-loader',
    description: 'Documents for @litert/config-loader',
    base: '/projects/config-loader.js/',
    sitemap: {
        hostname: 'https://litert.org/projects/config-loader.js/',
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guides', link: '/guides/' },
            { text: 'API Reference', link: '/api/' },
        ],
        sidebar: [
            {
                text: 'Guides',
                items: [
                    { text: 'Overview', link: '/guides/' },
                    { text: 'Quick Start', link: '/guides/quick-start' },
                    { text: 'Built-in Operators', link: '/guides/built-in-operators' },
                    { text: 'Custom Operators', link: '/guides/custom-operators' },
                    { text: 'Custom Encodings', link: '/guides/custom-encodings' },
                    { text: 'Custom Data Readers', link: '/guides/custom-readers' },
                    { text: 'Custom Syntax', link: '/guides/custom-syntax' },
                    { text: 'Load From Object', link: '/guides/load-from-object' },
                    { text: 'Operation Options', link: '/guides/operation-options' },
                ],
            },
            {
                text: 'API Reference',
                items: [
                    { text: 'Overview', link: '/api/' },
                    {
                        text: '@litert/config-loader',
                        items: [
                            { text: 'Module Overview', link: '/api/config-loader/' },
                            { text: 'ConfigLoader', link: '/api/config-loader/classes/ConfigLoader' },
                            { text: 'Typings', link: '/api/config-loader/Typings' },
                            { text: 'Constants', link: '/api/config-loader/Constants' },
                            { text: 'Errors', link: '/api/config-loader/Errors' },
                        ],
                    },
                    {
                        text: 'Encodings',
                        items: [
                            { text: 'Module Overview', link: '/api/encodings/' },
                            { text: 'getAllBuiltInEncodings', link: '/api/encodings/functions/GetAllBuiltInEncodings' },
                            { text: 'JsonEncoding', link: '/api/encodings/classes/JsonEncoding' },
                            { text: 'YamlEncoding', link: '/api/encodings/classes/YamlEncoding' },
                            { text: 'Json (direct import)', link: '/api/encodings/json/classes/JsonEncoding' },
                            { text: 'Yaml (direct import)', link: '/api/encodings/yaml/classes/YamlEncoding' },
                        ],
                    },
                    {
                        text: 'Operators',
                        items: [
                            { text: 'Module Overview', link: '/api/operators/' },
                            { text: 'getAllBuiltInOperators', link: '/api/operators/functions/GetAllBuiltInOperators' },
                            { text: 'DecodeBase64Operator', link: '/api/operators/decode-base64/classes/DecodeBase64Operator' },
                            { text: 'DecodeHexOperator', link: '/api/operators/decode-hex/classes/DecodeHexOperator' },
                            { text: 'EnvironmentVariableOperator', link: '/api/operators/environment-variable/classes/EnvironmentVariableOperator' },
                            { text: 'ExtendsOperator', link: '/api/operators/extends/classes/ExtendsOperator' },
                            { text: 'ImportOperator', link: '/api/operators/import/classes/ImportOperator' },
                            { text: 'ImportBinaryFileOperator', link: '/api/operators/import-binary-file/classes/ImportBinaryFileOperator' },
                            { text: 'ImportTextFileOperator', link: '/api/operators/import-text-file/classes/ImportTextFileOperator' },
                            { text: 'ResolvePathOperator', link: '/api/operators/resolve-path/classes/ResolvePathOperator' },
                        ],
                    },
                    {
                        text: 'Readers',
                        items: [
                            { text: 'LocalFileReader', link: '/api/readers/local-file-reader/classes/LocalFileReader' },
                        ],
                    },
                ],
            },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/litert/config-loader.js' },
        ],
    },
});
