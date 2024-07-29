# Scenarios

Scenarios are rulesets that determine the way a given battle plays out.

## Structure

Scenarios are found in *scenarios.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
rules       : []
image_url   : string
```

- **id** - The identifying value of the scenario, all scenarios start their id with "sc_".
- **type** - Used for broad categorization, all scenarios have the type "Scenario".
- **source** - Where the scenario comes from. Currently, it's expected all scenarios will have the source "core".
- **tags** - A series of tags which identify what kind of scenario something is, see [Tags](../../Tags.md) for more information.
- **name** - The name of the scenario.
- **image_url** - The src for the scenario exemplar image.
- **rules** - Specially formatted array of information included in the scenario, see [Rules](../../Rules.md) for more informaiton.

## Example

```
{
        "id": "sc_relichunt",
        "type": "Scenario",
        "source": "core",
        "tags": [
            {"tag_name": "mid_campaign", "val": ""}
                ],
        "image_url": "https://i.imgur.com/wV2YWtP.png",
        "name": "Relic Hunt",
        "rules": [
            {
                "title": "Forces",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "Both Warbands select up to 6 Models from their Warband. No model on 40mm+ sized base can be included (unless they are a mandatory model for your Warband such as Lord of Tumors).",
                        "subcontent": []
                    },
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "In the beginning of turn 2, before any activations, both players receive D3 randomly selected models from their Warband as reinforcements. These reinforcements are placed anywhere along the player’s own table edge but at least 8” away from any enemy models, and can be Activated as standard. This happens on turns 3 and 4 as well.",
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
                                "content": "In addition, both players should add six smaller terrain pieces like boxes, sandbags, bomb craters, wells, fountains etc. anywhere on the table to create cover.",
                                "glossary":  []
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Deployment",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "The players roll-off. The loser of the roll-off chooses which deployment zone will be theirs. The other deployment zone will be their opponent’s.",
                        "subcontent": []
                    },
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "The players then take it in turns to deploy one model at a time, starting with the player who has more models in their warband (roll-off if both have the same number of models)",
                        "subcontent": []
                    },
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "Models must be set up wholly within their own deployment zone. If a player runs out of models to set up, the other player sets up all their models afterwards. Once the players have set up their models, deployment ends and the battle begins.",
                        "subcontent": []
                    }
                ]
            },
            {
                "title": "Battle Length",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "The battle lasts for four turns.",
                        "subcontent": []
                    }
                ]
            },
            {
                "title": "Infiltrators",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "Infiltrators can be used in this Scenario.",
                        "subcontent": []
                    }
                ]
            },
            {
                "title": "Victory Conditions",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "list"}],
                        "content": "",
                        "subcontent": [
                            {
                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                "content": "Each player rolls a D3 and places that many 1” diameter Reliquary Markers. The player with the most Reliquary Markers (or the winner of a roll-off, if both players have the same number of markers) begins by placing one of his Reliquary Markers on the playing surface. Then his opponent does the same, and they keep alternating until both players have placed all of their Reliquary Markers. Reliquary Markers can be placed anywhere on the playing surface outside Impenetrable terrain and deployment zones, and more than a 12” template away from another marker and at least 6” away from table edges. If it becomes impossible to place any more markers, the remaining markers are discarded.",
                                "glossary":  []
                            },
                            {
                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                "content": "After the game ends, the players determine how many Reliquary Markers they control. The player with the most Reliquary Markers wins. If they hold the same number of Reliquary Markers, the game is a draw.",
                                "glossary":  []
                            },
                            {
                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                "content": "To hold Reliquary Marker, a player must have a model within 1” distance of the marker who is not Down, and there must be no enemy models at all 1” of the same marker. If either of these conditions is not met, that Reliquary Marker is not held by any player.",
                                "glossary":  []
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Glorious Deeds",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "Players score one Glory Point for every model that completes any of the following Glorious Deeds. Victory Points for these can only be gained once - whichever player completes them first gets the Glory Points!",
                        "subcontent": [
                        ]
                    },
                    {
                        "tags": [{"tag_name": "desc_type", "val": "list"}],
                        "content": "",
                        "subcontent": [
                            {
                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                "content": "Blood Sacrifice:",
                                "subcontent":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "One of your models takes out of action at least 3 enemies during the Battle.",
                                        "glossary":  []
                                    }
                                ]
                            },
                            {
                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                "content": "What is mine is yours:",
                                "subcontent":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "Claim one of the two Reliquary Markers closest to your opponent’s deployment zone at the end of the game. This can be claimed by both players.",
                                        "glossary":  []
                                    }
                                ]
                            },
                            {
                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                "content": "Relic Hunter:",
                                "subcontent":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "Be first to control 2 Reliquary Markers during the game (not end).",
                                        "glossary":  []
                                    }
                                ]
                            },
                            {
                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                "content": "Protect the Relic:",
                                "subcontent":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "Take out an enemy that is within 1” one of the Reliquary Markers",
                                        "glossary":  []
                                    }
                                ]
                            },
                            {
                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                "content": "Hallowed Ground:",
                                "subcontent":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "One of your models deployed in the beginning of the game makes no Melee or Ranged Attacks during the game. This can be claimed by both players",
                                        "glossary":  []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
```