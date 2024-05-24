# Description

Descriptions are a way of flexibly using JSON-formatted data to represent the structure of abilities, rules, etc in the playbook without the use of HTML, CSS, or other forms of styling which may not apply to all tools that would use Icon-Data.

When displaying any data, it is up to the individual tool creators to convert these descriptions into the format appropriate for your specific needs, at *no* point should a description contain elements that only apply to a specific format (such as HTML tags, references to classes used in your tools, etc).

## Structure

Descriptions are used in most *json* files, and have the following structure.

```
tags: []
content: string
subcontent: []
glossary?: []
```

- **tags** - Any tags that can be used to determine the appearence of the description component.
- **content** - The text that this part of the description involves.
- **subcontent** - An array of description object that are treated as children of this object
- **glossary** - Optional component that contains an array of JSON objects that indicate which text relates to a glossary term, and which term that is.

### Subcontent

The subcontent of a description object contains any description objects that we would consider to be 'included in' the description object, but would have different display needs. For example, an ability effect has both the name of the effect (eg, "Impact") and the description of the effect (eg, "The colliding foe takes 2 damage.").

### Glossary

The glossary is used to indicate which parts of a description's *content* value refers to rules that would be included in the glossary. It consits of an array with the following structure.

```
val: string
id: string
```
- **val** - The substring of the *content* that contains a rule.
- **id** - The *id* value of the glossary item relavent.

## Desc Types

| Name      | Description   |
| --------- | ----------------- |
| effect    | Major component of a description, typically should involve a new line. |
| desc      | Generic text describing an effect, subeffect, etc. |
| subeffect | Similar to effect, but wants to stay a part of it's parent and not include a new line. |
| addon     | Indicates that an addon should be displayed here, using the *content* value to get the addon's *id* value. |

## Description Example

Below is the description of the ability *Heracule* and it's equivilent description object.

**Attack:** *On Hit:* <u>[D]</u> + <u>fray</u> *Miss:* <u>Fray</u>  
**Effect:** Your target and one (4+) two (6+) all targets in range are <u>shoved</u> 1.  
**<u>Overdrive:</u>** Increase <u>shove</u> to 3.

```
[{
"tags": [{"tag_name": "desc_type", "val": "effect"}],
"content": "Attack:",
"subcontent":   [{
                    "tags": [
                        {"tag_name": "desc_type", "val": "subeffect"}
                    ],
                    "content": "On Hit:",
                    "subcontent":   [{
                        "tags": [
                            {"tag_name": "desc_type", "val": "desc"}
                        ],
                        "content": "[D] + fray",
                        "glossary": [
                            {"val": "[D]", "id": "gl_damagedice"},
                            {"val": "fray", "id": "gl_fray"}
                        ]
                    }]
                },
                {
                    "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                    "content": "Miss:",
                    "subcontent":   [{
                        "tags": [
                            {"tag_name": "desc_type", "val": "desc"}
                        ],
                        "content": "Fray",
                        "glossary": [
                            {"val": "Fray", "id": "gl_fray"}
                        ]
                    }]
                }]
},
{
    "tags": [{"tag_name": "desc_type", "val": "effect"}],
    "content": "Effect:",
    "subcontent":   [{
                        "tags": [
                            {"tag_name": "desc_type", "val": "desc"}
                        ],
                        "content": "Your attack target and one (4+) two (6+) all targets in range are shoved 1.",
                        "glossary": [
                            {"val": "shoved", "id": "gl_shove"}
                        ]
                    }]
},
{
    "tags": [
        {"tag_name": "desc_type", "val": "effect"}
    ],
    "content": "Overdrive:",
    "subcontent":   [{
        "tags": [
            {"tag_name": "desc_type", "val": "desc"}
        ],
        "content": "Increase shove to 3",
        "glossary": [
            {"val": "shove", "id": "gl_shove"}
        ]
    }],
    "glossary": [
        {"val": "Overdrive", "id": "gl_overdrive"}
    ]
}]
```