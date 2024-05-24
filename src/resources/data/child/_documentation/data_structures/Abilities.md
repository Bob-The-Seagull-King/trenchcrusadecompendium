# Abilities

Ability data covers unlockable abilities used in tactical combat. This does not include traits, talents, or class mechanics, only actions that can be unlocked and used even when multijobbing.

## Structure

Abilities are found in *abilities.json* and each rule has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
chapter     : integer
class_id    : string
name        : string
job_id      : string
attachments : []
blurb       : string
description : []
```

- **id** - The identifying value of the ability, all abilities start their id with "ab_".
- **type** - Used for broad categorization, all abilities have the type "Ability".
- **source** - Where the ability comes from. Currently, it's expected all abilities will have the source "core".
- **tags** - A series of tags which identify what kind of ability something is, see [Tags](../Tags.md) for more information.
- **chapter** - The chapter at which an ability can be unlocked.
- **class_id** - The *id* value of the class that an ability is a part of, based on the ability job.
- **name** - The name of the ability.
- **job_id** - The *id* value of the job that an ability belongs to.
- **attachments** - Array of tags that contain all other data objects that are included in the ability, such as infusions, interrupts, summons, etc.
- **blurb** - The flavour text of the ability.
- **description** - Specially formatted array of information included in the ability, see [Description](../Description.md) for more informaiton.

## Example

```
"id": "ab_heracule",
"type": "Ability",
"source": "core",
"tags": [
    {
        "tag_name": "action",
        "val": 1
    },
    {
        "tag_name": "type",
        "val": "attack"
    },
    {
        "tag_name": "range",
        "val": 3
    },
    {
        "tag_name": "inflict",
        "val": "gl_shove"
    },
    {
        "tag_name": "attack",
        "val": ""
    }
    ],
"chapter": 1,
"class_id": "cl_stalwart",
"name": "Heracule",
"job_id": "jb_bastion",
"attachments": [],
"blurb": "Hurl your shield or weapon as a discus with irrepressible force.",
"description":  [{
    "tags": [{"tag_name": "desc_type", "val": "effect"}],
    "content": "Attack:",
    "subcontent":   [{
        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
        "content": "On Hit:",
        "subcontent":   [{
            "tags": [{"tag_name": "desc_type", "val": "desc"}],
            "content": "[D] + fray",
            "glossary": [
                {"val": "[D]", "id": "gl_damagedice"},
                {"val": "fray", "id": "gl_fray"}]
            }]
            },
            {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Miss:",
            "subcontent":   [{
                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                "content": "Fray",
                "glossary": [{"val": "Fray", "id": "gl_fray"}]
                }]
        }]
    },
    {
    "tags": [{"tag_name": "desc_type", "val": "effect"}],
    "content": "Effect:",
    "subcontent":   [{
        "tags": [{"tag_name": "desc_type", "val": "desc"}],
        "content": "Your attack target and one (4+) two (6+) all targets in range are shoved 1.",
        "glossary": [{"val": "shoved", "id": "gl_shove"}]
        }]
    },
    {
    "tags": [{"tag_name": "desc_type", "val": "effect"}],
    "content": "Overdrive:",
    "subcontent":   [{
        "tags": [{"tag_name": "desc_type", "val": "desc"}],
        "content": "Increase shove to 3",
        "glossary": [{"val": "shove", "id": "gl_shove"}]
        }],
    "glossary": [{"val": "Overdrive", "id": "gl_overdrive"}]
    }]
```