# Addons

Addons are ability-like, but only exist as a part of another ability, trait, etc. These include (but are not limited to) interrupts provided by abilities, aether infusions, and actions granted by traits.

## Structure

Addons are found in *addons.json* and each rule has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
class_id    : string
job_id      : string
parent_id   : tag
name        : string
description : []
```

- **id** - The identifying value of the ability, all addons start their id with "ad_".
- **type** - Used for broad categorization, all addons have the type "Addon".
- **source** - Where the addon comes from. Currently, it's expected all addons will have the source "core".
- **tags** - A series of tags which identify what kind of addon something is, see [Tags](../Tags.md) for more information.
- **class_id** - The *id* value of the class that an addon is a part of, based on the addon job.
- **job_id** - The *id* value of the job that an addon belongs to.
- **parent_id** - Defines the parent an addon has. In Tag format
    - **tag_name** - the type of the parent.
    - **val** - the id of the parent.
- **name** - The name of the addon.
- **description** - Specially formatted array of information included in the addon, see [Description](../Description.md) for more informaiton.

## Example

```
"id": "ad_heroicintervention",
"type": "Addon",
"source": "core",
"tags": [
        {"tag_name": "interrupt", "val": 1},
        {"tag_name": "type", "val": "interrupt"}
        ],
"class_id": "cl_stalwart",
"job_id": "jb_bastion",
"parent_id":{
            "tag_name": "ability",
            "val": "ab_endlessbattlement"
            },
"name": "Heroic Intervention",
"description":  [{
                "tags": [{
                    "tag_name": "desc_type",
                    "val": "effect"
                    }],
                "content": "Trigger:",
                "subcontent":   [{
                    "tags": [{
                        "tag_name": "desc_type",
                        "val": "desc"
                        }],
                    "content": "A foe targets your ally with an ability, and your ally is in range 3."
                    }]
                },
                {
                "tags": [{
                    "tag_name": "desc_type",
                    "val": "effect"
                    }],
                "content": "Effect:",
                "subcontent":   [{
                    "tags": [{
                        "tag_name": "desc_type",
                        "val": "desc"
                        }],
                    "content": "You soar into the air, removing yourself from the battlefield, then return in any space adjacent to that ally."
                    }]
                }]
```