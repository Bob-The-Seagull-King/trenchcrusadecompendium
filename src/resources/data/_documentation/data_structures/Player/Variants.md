# Variants

Variants are modifications of a faction that change how a warband plays.

## Structure

Variants are found in *variants.json* and each one has the following structure.

```
id              : string
type            : string
source          : string
tags            : []
name            : string
flavour         : []
rules           : []
removed_rules   : string[]
removed_equip   : string[]
removed_model   : string[]
equipment       : equipment[]
models          : models[]
```

- **id** - The identifying value of the model, all models start their id with "ab_".
- **type** - Used for broad categorization, all models have the type "Model".
- **source** - Where the model comes from. Currently, it's expected all models will have the source "core".
- **tags** - A series of tags which identify what kind of model something is, see [Tags](../Tags.md) for more information.
- **name** - The name of the model.
- **flavour** - Specially formatted array of information included in the model, see [Description](../../Description.md) for more informaiton.
- **rules** - Specially formatted array of information included in the faction, see [Rules](../../Rules.md.md) for more informaiton.
- **removed_rules** - Array of titles of rules to remove from the base faction
- **removed_equip** - Array of ids of equipment to remove from the base faction
- **removed_model** - Array of ids of models to remove from the base faction
- **equipment** - List of equipment items and how that faction can purchase them, see below.
- **models** - List of models and how that faction can add them to a warband, see below.

## Example

```
    {
        "id": "fv_navalraidingparty",
        "type": "Variant",
        "source": "core",
        "tags": [
            {"tag_name": "heretic", "val": ""}
                ],
        "faction_id": "fc_hereticlegion",
        "name": "Naval Raiding Party",
        "flavour":  [
            {
                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                "content": "The Heretic Fleet operates as a semi-autonomous entity under the command of its High Captain and other admirals. The Heretics have their own marine infantry that often operates in small bands, striking deep behind enemy lines and executing smash and grab missions. They are always on the lookout for captives, loot, information, supplies, rare artefacts and the simple opportunity to express their cruelty and brutality. They are picked from amongst the best soldiers of the Heretic Legions, and have access to equipment and weapons gained from past battles and terrible atrocities they have committed."
            }
        ],
        "rules": [
            {
                "title": "Variant Rules",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "effect"}],
                        "content": "Fast As Lightning:",
                        "subcontent": [
                            {
                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                "content": "All Models have +1 DICE when taking their Dash ACTIONS",
                                "glossary":  [{"val": "+1 DICE", "id": "gl_plusdice"},{"val": "ACTIONS", "id": "gl_action"}]
                            }
                        ]
                    },
                    {
                        "tags": [{"tag_name": "desc_type", "val": "effect"}],
                        "content": "Unseen Advance:",
                        "subcontent": [
                            {
                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                "content": "Up to three models without the ELITE Keyword can be upgraded into INFILTRATORS at the cost of 10 ducats per Model.",
                                "glossary":  [{"val": "ELITE", "id": "gl_elite"},{"val": "INFILTRATORS", "id": "gl_infiltrator"}]
                            }
                        ]
                    }
                ]
            } 
        ],
        "removed_rules": [],
        "removed_equip": [],
        "removed_model": ["md_warwolfassaultbeast","md_anointedheavyinfantry","md_artillerywitch"],
        "equipment": [
            {"id": "eq_submachinegun", "cost": 25, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "", "val": ""}]}
        ],
        "models" : [
            {"id": "md_anointedheavyinfantry", "cost": 95, "cost_id": "ducats", "limit_min": 0, "limit_max": 1},
            {"id": "md_artillerywitch", "cost": 90, "cost_id": "ducats", "limit_min": 0, "limit_max": 1}
        ]
    }
```