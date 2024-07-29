# Upgrades

Upgrades are purchasable changes to add to a model.

## Structure

Upgrades are found in *upgrades.json* and each one has the following structure.

```
id          : string
type        : string
name        : string
description : []
```

- **id** - The identifying value of the upgrade, all upgrades start their id with "up_".
- **type** - Used for broad categorization, all upgrades have the type "Upgrade".
- **name** - The name of the upgrade.
- **description** - Specially formatted array of information included in the upgrade, see [Description](../../Description.md) for more informaiton.

## Example

```
    {
        "id": "up_heretictroopertolegionnareranged",
        "type": "Upgrade",
        "name": "Heretic Legionnare Ranged",
        "description":  [
                        {
                            "tags": [{"tag_name": "desc_type", "val": "desc"}],
                            "content": "Add +1 DICE to the ranged characteristic of the model. All legionnares in a warband must upgrade the same characteristic.",
                            "glossary": [{"val": "+1 DICE", "id": "gl_plusdice"}]
                        }
                        ]
    }
```