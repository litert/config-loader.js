# Custom Operators

Thought this library provides a set of useful built-in operators, you can still create your own operators to extend the functionality of the library.

Here is a guide on how to create custom operators for the `@litert/config-loader`.

## Operator Modes

Before you start, please spend some time to learn about the modes of the operators:

### Inline Operators

Inline operators are used insides the string values of the configuration, and each of them will be
processed into a single string value, and then replaced in the original string.

For example, the following configuration:

```json
{
    "name": "Hello, $[[env:MY_NAME]]!"
}
```

Will be processed into:

```json
{
    "name": "Hello, John!"
}
```

Where `MY_NAME` is an environment variable and its value is `John`.

So you can see that inline operators should always be processed into a string value.

And of course you can use multiple inline operators in a single string value, like this:

```json
{
    "name": "Hello, $[[env:MY_NAME]]! Today is $[[date:YYYY-MM-DD]]."
}
```

### Block Operators

Block operators look like a simplified version of the inline operators, because they are an
independent operator that occupies a whole string value, no other operators or characters can appear in the same string value.
For example, the following configuration:

```json
{
    "keys": "$[[binary-file:./keys.bin]]"
}
```

Will be processed into:

```js
{
    "keys": Buffer.from("...") // The content of the file
}
```

As you can see, the string value that contains a block operator is completely replaced with another
value, not just partially replaced like inline operators. That makes block operators more flexible
and powerful, which could do anything on the value, not just string manipulation.

To see more power of block operators, here is another example:

```json
[1, 2, 3, "$[[extends:./another-list.json]]", 7, 8, 9]
```

Here the `extends` operator is a block operator that will import the content of another JSON file, and expand it into the current array, so the final result will be:

```js
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Where `another-list.json` contains `[4, 5, 6]`.

### Container Operators

Container operators are the operators who perform operations on the whole container (object or array) instead of a single value.

For example, the `extends` operator is a container operator that will import the content of another JSON file and merge it into the current object or array.

```json
{
    "name": "John",
    "age": 18,
    "$[[extends]]": "./another-object.json"
}
```

Where `another-object.json` contains `{ "age": 17, "gender": "Male" }`.

The final result will be:

```js
{
    "name": "John",
    "age": 18, // the extends
    "gender": "Male"
}
```

At this example, the `extends` operator is a container operator and it appears as a key in the object, so it will be removed from the final result after it is processed.

> Well, now you may have noticed that the `extends` operator is both a block operator and a container operator, which is absolutely correct. That's because an operator can work in multiple modes, as long as it is designed to do so.

## Creating Custom Operators

To create a custom operator, you need to implement the `IOperator` interface and register it to the `ConfigLoader` instance.

Now here are examples of each type of operator:

### Inline Operator Example

Let's create a simple inline operator that transforms a string value into uppercase:

```typescript
// file: main.ts
import * as ConfigLoader from '@litert/config-loader';

class UppercaseOperator implements ConfigLoader.IOperator {

    public readonly code = 'uppercase';

    public readonly aliases = [];

    public readonly modes = {
        [ConfigLoader.EOperatorMode.INLINE]: {
            process(value: string): string {
                return value.toUpperCase();
            },
            processSync(value: string): string {
                return value.toUpperCase();
            },
        },
    }
}

const loader = new ConfigLoader.ConfigLoader({
    operators: [
        new UppercaseOperator(), // register the custom operator
    ],
    // ... other options
});

loader.loadSync('test.json');
```

Now let's create a test file `test.json` to check the result:

```json
{
    "name": "Hello, $[[uppercase:world]]!"
}
```

And then compile and execute the loader:

```bash
npx tsc && node main.js
```

This will be processed into:

```json
{
    "name": "Hello, WORLD!"
}
```

Check the full example code:

- [Asynchronous mode](../../src/examples/02-custom-inline-operator/async.ts)
- [Synchronous mode](../../src/examples/02-custom-inline-operator/sync.ts)

### Block Operator Example

Let's create a block operator that gets the file list of a directory:

```typescript
// file: main.ts
import * as ConfigLoader from '@litert/config-loader';
import * as NodeFS from 'node:fs';

class FileListOperator implements ConfigLoader.IOperator {

    public readonly code = 'file-list';

    public readonly aliases = [];

    public readonly modes = {
        [ConfigLoader.EOperatorMode.BLOCK]: {
            async process(value: string, ctx: ConfigLoader.IOperatorContext): Promise<void> {

                const path = ctx.loader.reader.resolvePath(ctx.currentPath, value);

                const files = await NodeFS.promises.readdir(path);

                if (Array.isArray(ctx.output)) {

                    ctx.output.push(files);
                }
                else {
                    ctx.output[ctx.outputEntry] = files;
                }
            },
            processSync(value: string, ctx: ConfigLoader.IOperatorContext): void {

                const path = ctx.loader.reader.resolvePath(ctx.currentPath, value);

                const files = NodeFS.readdirSync(path);

                if (Array.isArray(ctx.output)) {

                    ctx.output.push(files);
                }
                else {
                    ctx.output[ctx.outputEntry] = files;
                }
            },
        },
    }
}


const loader = new ConfigLoader.ConfigLoader({
    operators: [
        new FileListOperator(), // register the custom operator
    ],
    // ... other options
});

loader.loadSync('test.json');
```

Now let's create a test file `test.json` to check the result:

```json
{
    "files": "$[[file-list:..]]"
}
```

And then compile and execute the loader:

```bash
npx tsc && node main.js
```

This will be processed into:

```json
{
    "files": ["file1", "file2", ...]
}
```

Where `file1`, `file2`, etc. are the files in the parent directory.

Check the full example code:

- [Asynchronous mode](../../src/examples/03-custom-block-operator/async.ts)
- [Synchronous mode](../../src/examples/03-custom-block-operator/sync.ts)

### Container Operator Example

Let's create a container operator that validates `validation` the configuration object:

```typescript
// file: main.ts
import * as ConfigLoader from '@litert/config-loader';
import * as NodeFS from 'node:fs';

type IObject = Record<string, unknown>;

class ValidateOperator implements ConfigLoader.IOperator {

    public readonly code = 'validate';

    public readonly aliases = [];

    public readonly modes = {
        [ConfigLoader.EOperatorMode.CONTAINER]: {
            // This operator should be processed only after the whole object is loaded
            order: ConfigLoader.EContainerOperatorOrder.AFTER,
            async process(
                args: ConfigLoader.IContainerOperatorArgs,
                ctx: ConfigLoader.IOperatorContext,
            ): Promise<void> {
                if (typeof args.value !== 'string') {
                    throw new TypeError(`Expected a string, got ${typeof args.value}`);
                }
                this.validate(
                    JSON.parse((await NodeFS.promises.readFile(
                        ctx.loader.reader.resolvePath(ctx.currentPath, args.value)
                    )).toString()),
                    ctx.output as IObject,
                );
            },
            processSync(
                args: ConfigLoader.IContainerOperatorArgs,
                ctx: ConfigLoader.IOperatorContext,
            ): void {

                if (typeof args.value !== 'string') {
                    throw new TypeError(`Expected a string, got ${typeof args.value}`);
                }

                this.validate(
                    JSON.parse(NodeFS.readFileSync(
                        ctx.loader.reader.resolvePath(ctx.currentPath, args.value)
                    ).toString()),
                    ctx.output as IObject,
                );
            },
            validate(rules: IObject, data: IObject): void {

                for (const k in rules) {

                    if (typeof (data as IObject)[k] !== (rules as IObject)[k]) {

                        throw new TypeError(
                            `Expected property "${k}" to be of type ${(rules as IObject)[k]}`
                        );
                    }
                }
            }
        },
    }
}

const loader = new ConfigLoader.ConfigLoader({
    reader: new LocalFileReader({
        encodings: {
            '.json': 'json',
            '.yml': 'yaml',
            '.yaml': 'yaml',
        }
    }),
    encodings: BuiltInEnc.getAllBuiltInEncodings(),
    operators: [ new ValidateOperator() ]
});

const ret = loader.loadSync(`${__dirname}/../test-data/04/main.json`);

console.log(ret);
```

Now let's create a test file `main.json` to check the result:

```json
{
    
    "$[[validate]]": "./rules.json",
    "name": "John",
    "age": 18
}
```

And then create a `rules.json` file to define the validation rules:

```json
{
    "name": "string",
    "age": "number",
    "gender": "string"
}
```

And then compile and execute the loader:

```bash
npx tsc && node main.js
```

This will throw an error because the `gender` property is missing in the configuration object.

Let's add the `gender` property to the `main.json` file:

```json
{
    "$[[validate]]": "./rules.json",
    "name": "John",
    "age": 18,
    "gender": "male"
}
```

Now compile and execute the loader again:

```bash
npx tsc && node main.js
```

This time, it will be processed successfully and the output will be:

```json
{
    "name": "John",
    "age": 18,
    "gender": "male"
}
```

Check the full example code:

- [Asynchronous mode](../../src/examples/04-custom-container-operator/async.ts)
- [Synchronous mode](../../src/examples/04-custom-container-operator/sync.ts)

## Conclusion

You have learned how to create custom operators for the `@litert/config-loader` library. By implementing the `IOperator` interface and registering your operators, you can extend the functionality of the library to suit your needs.

Remember, you can create an operator that works in multiple modes, just added the implementation for each mode in the `modes` property of the operator class.
