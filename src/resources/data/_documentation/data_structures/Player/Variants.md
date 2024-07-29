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

- **id** - The identifying value of the varaint, all variants start their id with "fv_".
- **type** - Used for broad categorization, all variants have the type "Faction".
- **source** - Where the variant comes from. Currently, it's expected all variants will have the source "core".
- **tags** - A series of tags which identify what kind of variant something is, see [Tags](../Tags.md) for more information.
- **name** - The name of the faction.
- **flavour** - Specially formatted array of information included in the variant, see [Description](../../Description.md) for more informaiton.
- **rules** - Specially formatted array of information included in the faction, see [Rules](../../Rules.md.md) for more informaiton.
- **removed_rules** - Array of titles of rules to remove from the base faction
- **removed_equip** - Array of ids of equipment to remove from the base faction
- **removed_model** - Array of ids of models to remove from the base faction
- **equipment** - List of equipment items and how that faction can purchase them, see below.
- **models** - List of models and how that faction can add them to a warband, see below.

### Equipment
```
id          : string // The id value of the equipment
cost        : number // The numerical cost of the equipment
cost_id     : string // The name of the currency used (ducats or glory)
limit       : number // Maximum amount of that equipment a faction can have, 0 = unlimited
features    : string[] // Special traits the equipment has in this faction
restriction : { type : string, val : string}[] // Array of restrictions by type (model, keyword, etc) and the specific value of that type (ELITE, STRONG, id_anointedheavyinfantry, etc)
```

### Models
```
id          : string // The id value of the equipment
cost        : number // The numerical cost of the equipment
cost_id     : string // The name of the currency used (ducats or glory)
limit_min   : number // The minimum amount of that model a warband can have
limit_max   : number // The maximum amount of that model a warband can have, 0 = unlimited
equipment   : string[] // IDs for equipment items that a model starts with
upgrades    : { id : string, cost : number, cost_id : string }[] // List of upgrade IDs and how much it costs to give that upgrade to the model
```

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
        "removed_equip": ["eq_submachinegun"],
        "removed_model": ["md_warwolfassaultbeast","md_anointedheavyinfantry","md_artillerywitch","md_heretictrooper","md_goeticwarlock","md_wardog","md_guarddog","md_mercydog","md_hellhound","md_sineater"],
        "equipment": [
            {"id": "eq_submachinegun", "cost": 25, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "", "val": ""}]}
        ],
        "models" : [
            {"id": "md_anointedheavyinfantry", "cost": 95, "cost_id": "ducats", "limit_min": 0, "limit_max": 1, "equipment": [], "upgrades": [{"id": "up_infiltratornaval", "cost": 10, "cost_id": "ducats"}]},
            {"id": "md_artillerywitch", "cost": 90, "cost_id": "ducats", "limit_min": 0, "limit_max": 1, "equipment": [], "upgrades": [{"id": "up_infiltratornaval", "cost": 10, "cost_id": "ducats"}]},
            {"id": "md_goeticwarlock", "cost": 4, "cost_id": "glory", "limit_min": 0, "limit_max": 1, "equipment": ["eq_swordaxe","eq_swordaxe  "], "upgrades": [{"id": "up_infiltratornaval", "cost": 10, "cost_id": "ducats"}]},
            {"id": "md_wardog", "cost": 1, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": [{"id": "up_infiltratornaval", "cost": 10, "cost_id": "ducats"}]},
            {"id": "md_guarddog", "cost": 2, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": [{"id": "up_infiltratornaval", "cost": 10, "cost_id": "ducats"}]},
            {"id": "md_mercydog", "cost": 2, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": ["eq_medikit"], "upgrades": [{"id": "up_infiltratornaval", "cost": 10, "cost_id": "ducats"}]},
            {"id": "md_hellhound", "cost": 2, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": [{"id": "up_infiltratornaval", "cost": 10, "cost_id": "ducats"}]},
            {"id": "md_sineater", "cost": 6, "cost_id": "glory", "limit_min": 0, "limit_max": 1, "equipment": ["eq_heavyarmour","eq_tenderizermaul"], "upgrades": [{"id": "up_infiltratornaval", "cost": 10, "cost_id": "ducats"}]},
            {"id": "md_heretictrooper", "cost": 30, "cost_id": "ducats", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": [{"id": "up_heretictroopertolegionnareranged", "cost": 10, "cost_id": "ducats"},{"id": "up_heretictroopertolegionnaremelee", "cost": 10, "cost_id": "ducats"},{"id": "up_infiltratornaval", "cost": 10, "cost_id": "ducats"}]}
        ]
    }
```