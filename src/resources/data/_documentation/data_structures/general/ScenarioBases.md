# Scenarios

Scenario Bases are rulesets that determine the way a given battle plays out and serve as the core part of random scenario generation.

## Structure

Scenarios Bases are found in *gen_scenario.json* and each one has the following structure.

```
id                  : string
name                : string
restricted_deploy   : string[]
restricted_deeds    : string[]
rules               : []
```

- **id** - The identifying value of the scenario, all scenarios start their id with "gsc_".
- **name** - The name of the scenario.
- **restricted_deploy** - IDs of deployment types that cannot be used with this scenario base.
- **restricted_deeds** - IDs of glorious deeds that cannot be used with this scenario base.
- **rules** - Specially formatted array of information included in the scenario, see [Rules](../../Rules.md) for more informaiton.

## Example

```
{
        "id": "gsc_attritionalbattle",
        "name": "Attritional Battle",
        "restricted_deploy": [],
        "restricted_deeds": [],
        "rules": [
            {
                "title": "Victory Conditions",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "At the end of the game, each player adds up the ducat value of their enemy models they have taken Out Of Action. Troops bought with glory points are worth 30 ducats per glory point.",
                        "glossary": []
                    },
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "Players divide this total by 100, rounding up, and compare results. The player with the highest total score wins the game.",
                        "glossary": []
                    }
                ]
            },
            {
                "title": "Battle Length",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "At the end of the fifth turn of the game, one of the players rolls a D6. If the result is a 4+ the game ends. Otherwise, the game continues and concludes at the end of the sixth turn.",
                        "subcontent": []
                    }
                ]
            },
            {
                "title": "The Battlefield",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "The game is played on a standard-sized Battlefield (we suggest 4’X4’)",
                        "subcontent": []
                    },
                    {
                        "tags": [{"tag_name": "desc_type", "val": "effect"}],
                        "content": "Setting Up Terrain:",
                        "subcontent": [
                            {
                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                "content": "The player with the lower number of models in their force can place one of the following terrain pieces on the table:",
                                "glossary":  []
                            },
                            {
                                "tags": [{"tag_name": "desc_type", "val": "list"}],
                                "content": "",
                                "subcontent":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "One Building (a tower, house etc.)",
                                        "glossary":  []
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "One Piece of Dangerous Terrain (swamp, barbed wire etc.)",
                                        "glossary":  []
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "One Piece of Difficult Terrain (forest, rocky ground)",
                                        "glossary":  []
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "One Piece of Impassable terrain (12” river with a bridge or ford, sheer cliffs etc.) Maximum two pieces per battle",
                                        "glossary":  []
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "One Hill",
                                        "glossary":  []
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "One Fence/wall/other defendable terrain piece (max one per player)",
                                        "glossary":  []
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "6” Section of a Trench",
                                        "glossary":  []
                                    }
                                ]
                            },
                            {
                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                "content": "Each building must be placed at least 8” away from any table edge and at least 6” away from the nearest building terrain piece.",
                                "glossary":  []
                            },
                            {
                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                "content": "In addition, both players should take six smaller terrain pieces like boxes, sandbags, bomb craters, wells, fountains etc. anywhere on the table to create cover.",
                                "glossary":  []
                            }
                        ]
                    }
                ]
            }
        ]
    }
```