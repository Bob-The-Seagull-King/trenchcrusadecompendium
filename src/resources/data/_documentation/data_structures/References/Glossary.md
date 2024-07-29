# Glossary

Keywords are simple rules that are shown on hover.

## Structure

Glossary items are found in *glossary.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
description : []
```

- **id** - The identifying value of the glossary item, all glossary items start their id with "gl_".
- **type** - Used for broad categorization, all glossary item have the type "GLossary".
- **source** - Where the glossary item comes from. Currently, it's expected all glossary items will have the source "core".
- **tags** - A series of tags which identify what kind of glossary item something is, see [Tags](../Tags.md) for more information.
- **name** - The name of the glossary item.
- **description** - Specially formatted array of information included in the glossary item, see [Description](../Description.md) for more informaiton.

## Example

```
    {
        "id": "gl_plusdice",
        "type": "Glossary",
        "source": "core",
        "tags": [
            {"tag_name": "category", "val": "dice"}
        ],
        "name": "+Dice",
        "description":  [{
            "tags": [{"tag_name": "desc_type", "val": "desc"}],
            "content": "Modifier for ACTION rolls. For each +DICE, add one dice to the dice pool of the 2D6 roll you are about to make. +1 DICE thus makes the roll a total of 3D6. Then roll all the dice and pick the two highest. If two +DICE are added, roll 4D6 and pick the two highest, and so on.",
            "subcontent":   [],
            "glossary": [
                {"val": "ACTION", "id": "gl_action"}
            ]
        }]
    }
```