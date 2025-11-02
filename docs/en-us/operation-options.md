# Operation Options

When using the operation syntax in configuration files, you can specify
additional options for operators by appending them after a semicolon (`;`) within the operator expression.

For example:

```yaml
demoEnv: $[[env:MY_ENV_VAR; default=hello world]]
```

Here are the parsing rules:

1. The content since the first semicolon, will be parsed as options.
2. Each option is separated by a semicolon.
3. Each option is in the form of `optionName[=optionValue]`, where `optionValue`
    is optional.
4. If an option has only the `optionName` without `=optionValue`, it is treated
    as a boolean flag with the value `true`.
5. If an option has an `optionValue`, it is **always** treated as a string.
6. For the segments containing only whitespace, they will be ignored.

## Example

```yaml
demo: $[[operator:operand_value; opt1=value1; opt2 = value2; opt3; opt4=value4; opt5=;;]]
```

In this example, `opt3` is a boolean flag that is set to `true` by its presence,
while the other options have string values. Here is the all options in
JSON format for clarity:

```json
{
    "opt1": "value1",
    "opt2": "value2",
    "opt3": true,
    "opt4": "value4",
    "opt5": ""
}
```
