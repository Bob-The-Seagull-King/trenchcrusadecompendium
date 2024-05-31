# ListPartialItems

ListPartialItems are used to hold information on items contained in a list group.

## Structure

ListPartialItems are found in multiple files and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
description : []
```

- **id** - The identifying value of the model, all models start their id with "ab_".
- **type** - Used for broad categorization, all models have the type "Model".
- **source** - Where the model comes from. Currently, it's expected all models will have the source "core".
- **tags** - A series of tags which identify what kind of model something is, see [Tags](../Tags.md) for more information.
- **name** - The name of the model.
- **description** - Specially formatted array of information included in the model, see [Description](../Description.md) for more informaiton.

## Example

```
    {
        "id": "sk_patronskill",
        "type": "Skill",
        "source": "core",
        "tags": [
            {"tag_name": "patron", "val": ""}
            ],
        "name": "Patron Skill",
        "description": [
            {
                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                "content": "Pick one of the Skills offered by your Patron.",
                "glossary": []
            }
        ]
    }
```