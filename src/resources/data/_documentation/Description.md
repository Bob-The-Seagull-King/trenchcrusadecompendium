# Description

Descriptions are a way of flexibly using JSON-formatted data to represent the structure of models, rules, etc in the playbook without the use of HTML, CSS, or other forms of styling which may not apply to all tools that would use Icon-Data.

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

The subcontent of a description object contains any description objects that we would consider to be 'included in' the description object, but would have different display needs. For example, a rule list has both the description of the effect and the description of each item in the list.

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
| gap       | Deliniates a break in text. |
| list      | All subcontent are components in an unordered list. |
| addon     | Indicates that an addon should be displayed here, using the *content* value to get the addon's *id* value. |

## Description Example

Below is the description of the addon *Hegemon's Will* and it's equivilent description object.

___

Using the remnants of the lingering power of a fallen Hegemon, any Plague Knight of the Warband can command any Thrall within 18” of it directly. During it’s Activation, a Plague Knight can remove an INFECTION MARKER from any model in play to enable a Thrall within 18" to use any one of the Actions detailed below. Each Trall can only be affected by Hegemon’s Will once per Turn, but one Plague Knight may issue commands to multiple Thralls during a single Activation if all the conditions are met.
<ul>
<li> <i>Move:</i> The Thrall makes the standard Move <b>ACTION</b>.</li>
<li> <i>Ranged Attack:</i> The Thrall performs a Ranged Attack <b>ACTION</b> with any Ranged weapon it has.</li>
<li> <i>Charge:</i> The Thrall makes a standard Charge <b>ACTION</b>.</li>
<li> <i>Melee Attack:</i> The Thrall performs a Melee Attack <b>ACTION</b>.</li>
</ul>


___



```
"description":  [
                {
                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                    "content": "Using the remnants of the lingering power of a fallen Hegemon, any Plague Knight of the Warband can command any Thrall within 18” of it directly. During it’s Activation, a Plague Knight can remove an INFECTION MARKER from any model in play to enable a Thrall within 18\" to use any one of the Actions detailed below. Each Trall can only be affected by Hegemon’s Will once per Turn, but one Plague Knight may issue commands to multiple Thralls during a single Activation if all the conditions are met.",
                    "glossary": [{"val": "", "id": ""}]
                },
                {
                    "tags": [{"tag_name": "desc_type", "val": "list"}],
                    "content": "",
                    "subcontent": [
                        {
                            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                            "content": "Move:",
                            "subcontent": [
                                {
                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                    "content": "The Thrall makes the standard Move ACTION.",
                                    "glossary": [{"val": "ACTION", "id": "gl_action"}]
                                }
                            ]
                        },
                        {
                            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                            "content": "Ranged Attack:",
                            "subcontent": [
                                {
                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                    "content": "The Thrall performs a Ranged Attack ACTION with any Ranged weapon it has.",
                                    "glossary": [{"val": "ACTION", "id": "gl_action"}]
                                }
                            ]
                        },
                        {
                            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                            "content": "Charge:",
                            "subcontent": [
                                {
                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                    "content": "The Thrall makes a standard Charge ACTION.",
                                    "glossary": [{"val": "ACTION", "id": "gl_action"}]
                                }
                            ]
                        },
                        {
                            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                            "content": "Melee Attack:",
                            "subcontent": [
                                {
                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                    "content": "The Thrall performs a Melee Attack ACTION.",
                                    "glossary": [{"val": "ACTION", "id": "gl_action"}]
                                }
                            ]
                        }

                    ]
                }
                ]
```