# Changes Logs

## v1.0.1

- fix(loader): should not overwrite object by object in context output.

    When loading a property in an object, if the property is an object, and
    it's already existing in the context output, the existing object should be
    used as the object container, and the there should be a merge instead of
    overwriting.
