# Scenarios

Deployments are rulesets that determine the way player place models during a battle.

## Structure

Deployments are found in *gen_deployment.json* and each one has the following structure.

```
id                  : string
image_url           : string
name                : string
restricted_deeds    : string[]
removed_rules       : string[]
rules               : []
```

- **id** - The identifying value of the deployment, all deployments start their id with "gdp_".
- **image_url** - The src for the deployment exemplar image.
- **name** - The name of the deployment.
- **restricted_deeds** - List of any deeds to not allow during random scenario generation.
- **removed_rules** - List of any rules to remove from the base Scenario during random generation.
- **rules** - Specially formatted array of information included in the scenario, see [Rules](../../Rules.md) for more informaiton.

## Example

```
{
        "id": "gdp_chanceencounter",
        "image_url": "https://i.imgur.com/DcDF3g3.png",
        "name": "Chance Encounter",
        "restricted_deeds": [],
        "removed_rules": ["Battle Length"],
        "rules": [
            {
                "title": "Deployment",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "The players roll-off and the winner chooses which long table side belongs to him (or any edge if you are playing on a square area). The opponent gets the opposite table edge (see diagram).",
                        "subcontent": []
                    },
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "Models are not set up on the table at the start of the game. Instead on the first turn of the game, half of the Warband (selected by each player) enters the battlefield – when one of the models is activated, it starts its move onto the table from any point along the player’s table edge, though it cannot be deployed directly into Melee combat. In Turn 2, the rest of the Warband is deployed exactly the same way.",
                        "subcontent": []
                    }
                ]
            },
            {
                "title": "Battle Length",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "The battle lasts until the end of the sixth turn.",
                        "glossary": []
                    }
                ]
            }
        ]
    }
```