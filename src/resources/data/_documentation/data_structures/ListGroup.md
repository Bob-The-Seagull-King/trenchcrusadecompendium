# Name

XX

## Structure

XX are found in *xx.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
```

- **id** - The identifying value of the model, all models start their id with "ab_".
- **type** - Used for broad categorization, all models have the type "Model".
- **source** - Where the model comes from. Currently, it's expected all models will have the source "core".
- **tags** - A series of tags which identify what kind of model something is, see [Tags](../Tags.md) for more information.
- **name** - The name of the model.
- **description** - Specially formatted array of information included in the model, see [Description](../Description.md) for more informaiton.

## Example

```
```