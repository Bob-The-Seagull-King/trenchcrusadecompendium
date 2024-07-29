# Equipment

Equipment covers purchasable items, weapons, and armour that a model can be given.

## Structure

Equipment items are found in *equipment.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
category    : string
equip_type  : string | null
range       : string | nul;
blurb       : string
modifiers   : string[]
description : []
```

- **id** - The identifying value of the equipment, all equipment start their id with "eq_".
- **type** - Used for broad categorization, all equipment have the type "Equipment".
- **source** - Where the equipment comes from. Currently, it's expected all equipment will have the source "core".
- **tags** - A series of tags which identify what kind of equipment something is, see [Tags](../../Tags.md) for more information.
- **name** - The name of the equipment.
- **category** - The type of equipment something is, such as ranged weapon or armour.
- **equip_type** - How many hands it takes to hold this item, not always applicable.
- **range** - The range of the item, typically only used for weapons.
- **blurb** - Flavour inforation on the item.
- **modifiers** - String array of any unique modifiers the item has, typically used for weapons.
- **description** - Specially formatted array of information included in the equipment, see [Description](../../Description.md) for more informaiton.

## Example

```
{
        "id": "eq_boltactionrifle",
        "type": "Equipment",
        "source": "core",
        "tags": [
                ],
        "category": "ranged",
        "name": "Bolt Action Rifle",
        "equip_type": "2-Handed",
        "range": "24\"",
        "blurb": "The workhorse of the Great War. Sturdy, highly reliable and reasonably accurate, it is no surprise that most of the infantry of the Great War carry this battlefield classic.",
        "modifiers": [],
        "description":  [
                        ]
    }
```