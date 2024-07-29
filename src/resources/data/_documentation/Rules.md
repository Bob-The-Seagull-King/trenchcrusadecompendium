# Rules

Rules are groupings of information collected under a single title.

## Structure

Rules are used in many *json* files, and have the following structure.

```
title       : string
description : []
```

- **title** - The name of the rule.
- **description** - Specially formatted array of information included in the model, see [Description](../Description.md) for more informaiton.

## Example

```
{
    "title": "Fireteam",
    "description": [
        {
            "tags": [{"tag_name": "desc_type", "val": "desc"}],
            "content": "This model is part of a Fireteam. All models that are part of the same Fireteam can be activated at the same time without the opponent getting their turn in between. Note that if the Activation of either member of the Fireteam forcefully ends (due a failed RISKY ACTION for example), it ends both Activations.",
            "glossary": [
                {"val": "FIRETEAM", "id": "gl_fireteam"},
                {"val": "RISKY ACTION", "id": "gl_riskyaction"}
            ]
        }
    ]
}
```