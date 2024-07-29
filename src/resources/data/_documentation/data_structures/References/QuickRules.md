# QuickRules

QuickRules are game mechanics and information important for playing the game.

## Structure

Quick Rules are found in *quickrules.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
description : []
rules       : []
```

- **id** - The identifying value of the rule, all rules start their id with "qr_".
- **type** - Used for broad categorization, all rules have the type "QuickRule".
- **source** - Where the rule comes from. Currently, it's expected all rules will have the source "core".
- **tags** - A series of tags which identify what kind of rule something is, see [Tags](../../Tags.md) for more information.
- **name** - The name of the rule.
- **description** - Specially formatted array of information included in the quick rules, see [Description](../../Description.md) for more informaiton.
- **rules** - Specially formatted array of information included in the quick rules, see [Description](../../Rules.md) for more informaiton.

## Example

```
    {
        "id": "qr_turnsequence",
        "type": "QuickRule",
        "source": "core",
        "tags": [
            ],
        "name": "Turn Sequence",
        "description": [
        ],
        "rules": [
            {
                "title": "1. Initiative",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "The player with the lowest number of models in their force will be the first to start their Activation at the beginning of each Turn. If both players have the same number of models, roll a D6 and whoever rolls highest goes first.",
                        "subcontent": [ ]
                    }
                ]
            },
            {
                "title": "2. Activate a Model",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "As the first player, choose any model in your force that you have not yet Activated during this turn. You can then have your model perform ACTIONS.",
                        "glossary": [{"val": "ACTIONS", "id": "gl_action"} ]
                    }
                ]
            },
            {
                "title": "3. End Activation",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "Once you have taken any and all ACTIONS you wish, or have failed with any of your RISKY ACTIONS, the Activation of the model ends. Your opponent can now Activate one of their models. Keep Activating models in this fashion as long as either player has any models that have yet to be Activated. Once you and your opponent have Activated each of your models once, go to the Morale Phase.",
                        "glossary": [ {"val": "ACTIONS", "id": "gl_action"},{"val": "RISKY ACTIONS", "id": "gl_riskyaction"}]
                    }
                ]
            },
            {
                "title": "4. Morale",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "At the end of any turn, if at least half of your Warband is Down or Out of Action, roll on the Action Success Chart. If you fail, your Warband flees the battlefield and loses the battle immediately. If both Warbands are required to take this test at the same time, the smaller Warband tests first.",
                        "subcontent": [ ]
                    }
                ]
            },
            {
                "title": "5. End of Turn",
                "description": [
                    {
                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                        "content": "The turn ends and a new one begins.",
                        "subcontent": [ ]
                    }
                ]
            }
        ]
    }
```