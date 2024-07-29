# Injuries

Injuries are possible outcomes when an elite model is taken out of action during a battle.

## Structure

Injuries are found in *injuries.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
roll_start  : number | string
roll_end    : number | string
description : []
```

- **id** - The identifying value of the injurt, all injuries start their id with "ij_".
- **type** - Used for broad categorization, all injuries have the type "Injury".
- **source** - Where the injury comes from. Currently, it's expected all injuries will have the source "core".
- **tags** - A series of tags which identify what kind of injury something is, see [Tags](../../Tags.md) for more information.
- **name** - The name of the injurt.
- **roll_start** - The beginning of the range of values that result in this injury (inclusive).
- **roll_end** - The end of the range of values that result in this injury (inclusive).
- **description** - Specially formatted array of information included in the injury, see [Description](../../Description.md) for more informaiton.

## Example

```
    {
        "id": "ij_dead",
        "type": "Injury",
        "source": "core",
        "tags": [
            ],
        "name": "Dead",
        "roll_start": 1,
        "roll_end": 1,
        "description": [
            {
                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                "content": "The wound proved to be fatal. The character is permanently lost even if this was not the third Battle Scar it sustans.",
                "subcontent": []
            }
        ]
    }
```