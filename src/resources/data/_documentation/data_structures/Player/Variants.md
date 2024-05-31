# Name

XX

## Structure

XX are found in *xx.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
```

- **id** - The identifying value of the model, all models start their id with "ab_".
- **type** - Used for broad categorization, all models have the type "Model".
- **source** - Where the model comes from. Currently, it's expected all models will have the source "core".
- **tags** - A series of tags which identify what kind of model something is, see [Tags](../Tags.md) for more information.
- **name** - The name of the model.
- **description** - Specially formatted array of information included in the model, see [Description](../Description.md) for more informaiton.

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