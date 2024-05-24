# Glossary / Rules

Glossary data covers various game rules that are assumed knowledge for reading abilities, traits, etc. These include anything that could be in the combat glossary of the ICON playbook, as well as rules that are important for tactical combat and not specified as a part of any specific trait/class mechanic/etc.

## Structure

Glossary rules are found in *glossary.json* and each rule has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
description : []
```

- **id** - The identifying value of the rule, all glossary rules start their id with "gl_".
- **type** - Used for broad categorization, all glossary rules have the type "Glossary".
- **source** - Where the glossary rule came from. Currently, it's expected all rules will have the source "core".
- **tags** - A series of tags which identify what kind of rule something is, see [Tags](../Tags.md) for more information.
- **name** - The name of the glossary item.
- **description** - Specially formatted array of information included in the rule, see [Description](../Description.md) for more informaiton.

## Example

```
"id": "gl_fray",
"type": "Glossary",
"source": "core",
"tags": [{
        "tag_name": "category",
        "val": "general"
        }],
"name": "Fray",
"description":  [{
    "tags": [{
            "tag_name": "desc_type",
            "val": "desc"
            }],
    "content": "Fixed damage, typically based on your Class. Usually added to all attacks on hit or miss.",
    "subcontent": []
    }]
```