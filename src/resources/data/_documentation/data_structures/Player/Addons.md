# Addons

Addons are used to present distinct abilities, typically used by models.

## Structure

Addons are found in *addons.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
faction_id  : string
model_id    : string
parent_id   : tag
description : []
```

- **id** - The identifying value of the model, all models start their id with "ab_".
- **type** - Used for broad categorization, all models have the type "Model".
- **source** - Where the model comes from. Currently, it's expected all models will have the source "core".
- **tags** - A series of tags which identify what kind of model something is, see [Tags](../../Tags.md) for more information.
- **name** - The name of the model.
- **faction_id** - The id of the faction that uses this addon.
- **model_id** - The id of the model that uses this addon.
- **parent_id** - A tag representing the type of object that parent's it, and the id of that object.
- **description** - Specially formatted array of information included in the addon, see [Description](../../Description.md) for more informaiton.

## Example

```
    {
        "id": "ab_puppetmaster",
        "type": "Addon",
        "source": "core",
        "tags": [
                ],
        "faction_id": "fc_hereticlegion",
        "model_id": "md_hereticpriest",
        "parent_id": {"tag_name": "model", "val": "md_hereticpriest"},
        "name": "Puppet Master",
        "description":  [
                        {
                            "tags": [{"tag_name": "desc_type", "val": "desc"}],
                            "content": "Select a target model within 12” of the Priest, friend or foe (including the Priest). As a RISKY ACTION you can move the model D6” in any direction, including forcing it to fall down or enter into melee combat with any enemy model, or leave Combat (all the usual rules apply).",
                            "glossary": [{"val": "RISKY ACTION", "id": "gl_riskyaction"}]
                        }
                        ]
    }
```