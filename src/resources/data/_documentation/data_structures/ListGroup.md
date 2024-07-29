# ListGroup

ListGroups are used to collect a number of List Items with a description.

## Structure

ListGroups are found in multiple files and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
description : []
listtype    : string
list_items  : {id : string, roll_start : string | number, roll_end : string | number}[]
```

- **id** - The identifying value of the list, lists will start with different values.
- **type** - Used for broad categorization, lists may have different values.
- **source** - Where the list comes from. Currently, it's expected all lists will have the source "core".
- **tags** - A series of tags which identify what kind of list something is, see [Tags](../Tags.md) for more information.
- **name** - The name of the list.
- **description** - Specially formatted array of information included in the list, see [Description](../Description.md) for more informaiton.
- **listtype** - The data source for search for item ids in.
- **list_items** - The items in this list, and their result starts and ends.

## Example

```
    {
        "id": "sg_meleeandstrength",
        "type": "SkillGroup",
        "source": "core",
        "tags": [
            {"tag_name": "melee", "val": ""},
            {"tag_name": "strength", "val": ""}
            ],
        "name": "Melee & Strength Skills",
        "description": [
            {
                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                "content": "Roll 2D6 once for each chart to see what Skills you can choose from. If you already have any Skill indicated by the roll(s), choose the next lowest number on the table that has a skill you don’t yet have. If there are no such skills left, choose the next highest number on the table that has a skill you don’t yet have.",
                "subcontent": []
            }
        ],
        "listtype": "skills",
        "list_items": [
            { "id": "sk_patronskill", "roll_start": 2, "roll_end": 2},
            { "id": "sk_standfirm", "roll_start": 3, "roll_end": 3},
            { "id": "sk_parry", "roll_start": 4, "roll_end": 4},
            { "id": "sk_closequarterscombat", "roll_start": 5, "roll_end": 5},
            { "id": "sk_relentlesscharge", "roll_start": 6, "roll_end": 6},
            { "id": "sk_meleeproficiency", "roll_start": 7, "roll_end": 7},
            { "id": "sk_strengthofsamson", "roll_start": 8, "roll_end": 8},
            { "id": "sk_toughasnails", "roll_start": 9, "roll_end": 9},
            { "id": "sk_champion", "roll_start": 10, "roll_end": 10},
            { "id": "sk_surgicalstrike", "roll_start": 11, "roll_end": 11},
            { "id": "sk_patronskill", "roll_start": 12, "roll_end": 12}
        ]
    }
```