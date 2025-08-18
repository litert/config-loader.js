# Changes Logs

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
