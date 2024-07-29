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

- **id** - The identifying value of the item, items can start with many values.
- **type** - Used for broad categorization, items may have different types.
- **source** - Where the type comes from. Currently, it's expected all types will have the source "core".
- **tags** - A series of tags which identify what kind of type something is, see [Tags](../Tags.md) for more information.
- **name** - The name of the type.
- **description** - Specially formatted array of information included in the type, see [Description](../Description.md) for more informaiton.

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