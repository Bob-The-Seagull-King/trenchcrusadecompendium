# Scenarios

Scenario Deeds are options for how a player can gain Glory Points in a randomly generated scenario

## Structure

Deeds are found in *gen_deeds.json* and each one has the following structure.

```
id          : string
playerNum   : number
title       : string
description : []
```

- **id** - The identifying value of the deed, all deeds start their id with "gdd_".
- **playerNum** - Used for splitting deeds into groups for selecting, 0 means it will always be shown.
- **title** - The name of the deed.
- **description** - Specially formatted array of information included in the deed, see [Description](../../Description.md) for more informaiton.

## Example

```
{
    "id": "gdd_victor",
    "playerNum": 0,
    "title": "Victor",
    "description": [
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Victor:",
            "subcontent":  [{
        "tags": [{"tag_name": "desc_type", "val": "desc"}],
        "content": "This glorious deed goes to whoever wins the match.",
        "glossary": []
        }]
    }
    ]
}
```