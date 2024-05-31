# Models

Models are the warband units.

## Structure

Models are found in *models.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
movement    : string
ranged      : string
melee       : string
armour      : string
base        : string
faction_id  : string
variant_id  : string
name        : string
attatchments: tags[]
blurb       : []
equipment   : []
abilities   : []
```

- **id** - The identifying value of the model, all models start their id with "ab_".
- **type** - Used for broad categorization, all models have the type "Model".
- **source** - Where the model comes from. Currently, it's expected all models will have the source "core".
- **tags** - A series of tags which identify what kind of model something is, see [Tags](../../Tags.md) for more information.
- **movement** - Movement speed of a model.
- **ranged** - Ranged attack modifier.
- **melee** - Melee attack modifier.
- **armour** - Injury roll modifier.
- **base** - Size of the model base.
- **faction_id** - The ID of the faction it belongs to.
- **variant_id** - The ID of the faction variant it belongs to.
- **name** - The name of the model.
- **blurb** - Specially formatted array of information included in the model, see [Description](../../Description.md) for more informaiton.
- **equipment** - Specially formatted array of information included in the model, see [Description](../../Description.md) for more informaiton.
- **abilities** - Specially formatted array of information included in the model, see [Description](../../Description.md) for more informaiton.

## Example

```
    {
        "id": "md_hereticpriest",
        "type": "Model",
        "source": "core",
        "tags": [
                    {"tag_name": "heretic", "val": ""},
                    {"tag_name": "elite", "val": ""},
                    {"tag_name": "tough", "val": ""}
                ],
        "movement": "6\"",
        "ranged": "+2",
        "melee": "+2",
        "armour": "0",
        "base": "32",
        "faction_id": "fc_hereticlegion",
        "variant_id": "fv_basic",
        "name": "Heretic Priest",
        "attachments": [
                        {"tag_name": "addons", "val": "ab_puppetmaster"},
                        {"tag_name": "addons", "val": "ab_tough"}
                    ],
        "blurb": [
            {
                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                "content": "The Leader of a Heretic warband. These fallen priests perform all kinds of unholy magics, summoning petrifying demons and creatures using their Goetic spells. Often pledged to a demon lord in hell, such as Pazuzu or Guison, the Profane Gospels they recite terrify church forces, causing ears to bleed and eyeballs to burst in their sockets."
            }
        ],
        "equipment":  [{
                            "tags": [{"tag_name": "desc_type", "val": "desc"}],
                            "content": "The Heretic Priest uses the Heretic Legion weapons and equipment list."
                        }],
        "abilities":  [{
                            "tags": [{"tag_name": "desc_type", "val": "addon"}],
                            "content": "ab_puppetmaster"
                        },{
                            "tags": [{"tag_name": "desc_type", "val": "addon"}],
                            "content": "ab_tough"
                        }]

    }
```