# Changes Logs

## v1.1.0

- feat(loader): added operation options supports

    A new operator options syntax has been introduced to allow users to
    provide custom options to operators in the configuration file. The syntax
    is as follows:

    ```yaml
    inlineMode: abc-$[[op1: operand; a; b = value2; c=; ...]]-def
    blockMode: $[[op1: operand; a; b = value2; c=; ...]]
    $[[op3: operand; a; b = value2; c=; ...]]: "containerModeValue"
    ```

    For example, to provide options to the `EnvironmentVariable` operator:

    ```yaml
    database:
      host: $[[env:DB_HOSTNAME; default=localhost]]
    ```

    Click to read more about [Operation Options](./docs/en-us/operation-options.md).

## v1.0.1

- fix(loader): should not overwrite object by object in context output.

    When loading a property in an object, if the property is an object, and
    it's already existing in the context output, the existing object should be
    used as the object container, and the there should be a merge instead of
    overwriting.

- fix(data-reader): the file reader should not throw error with unknown files

    If the extension of the loading file is unrecognizable, it should just
    simply return an empty encoding, instead of throwing exceptions, which
    would cause failure when reading non-configuration files.
