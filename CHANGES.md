# Changes Logs

## v1.2.0

- fix(loader): correctly use `parent` parameter when loading files

## v1.1.1

- feat(loader): added `skipUnknownOperators` option

    A new loader option `skipUnknownOperators` has been added to allow users
    to skip unknown operators during the loading process. When this option is
    set to `true`, any operator that is not recognized will be ignored, and
    its original value will be retained in the output. This is useful in
    scenarios where the configuration may contain custom or unsupported
    operators that should not cause loading failures.

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

- feat(operator): [EnvironmentVariable] added readEnv option

    A new optional parameter `readEnv` is added to the `EnvironmentVariable`
    operator options, which allows users to provide a custom function to read
    environment variables. This is useful in scenarios where environment
    variables are read from an alternative source other than the default
    `process.env`.

- feat(operator): [EnvironmentVariable] added multiple variable names chaining support

    The `EnvironmentVariable` operator now supports specifying multiple
    environment variable names separated by commas. The operator will check
    each variable in order and use the value of the first one that is defined.
    For example:

    ```yaml
    database:
      host: "$[[env:DB_HOSTNAME,DB_HOST]]"
    ```

- feat(operator): [EnvironmentVariable] space character are now allowed between variable names

    The `EnvironmentVariable` operator now allows space characters between
    variable names when specifying multiple environment variables. This
    improves readability without affecting functionality.

    ```yaml
    database:
      host: "$[[env: DB_HOSTNAME , DB_HOST ]]"
    ```

- feat(operator): [EnvironmentVariable] added explicit default value support

    The `EnvironmentVariable` operator now allows users to specify an explicit
    default value using the syntax `"$[[env:<variable-names>:<default-value>]]"`
    in the config. If none of the specified environment variables are found,
    the explicitly provided default value will be used.

    ```yaml
    database:
      host: "$[[env: DB_HOSTNAME , DB_HOST ; default = localhost]]"
    ```

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
