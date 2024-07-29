# Content Pack

Content Packs are a way for people to add custom / homebrew content and make it available for people to integrate into the compendium - allowing for them to create warbands that utilize this content. These contain some explanatory information in addition to *data* which is added to any search operation the compendium makes.

## Structure

Content Packs are a *json* file, and have the following structure.

```
id          : string
name        : string
author      : string
description : string
tags        : { name : string, count : number }[]
isactive    : boolean
files       : { type : string, data : [] }[]
```

- **id** - The identifying string for the content pack, which must be unique, content packs should start with "cp_".
- **name** - The name of the content pack which is shown to the end user, when adding data the "Source" should probably match this.
- **author** - Name of the content pack's creator.
- **description** - String summary of the content pack, used to help people quickly identify what the pack is about.
- **tags** - Used to explain what kind of data is included in the pack. Each tag reflects a different kind of data and how many items are added (ie. { "name": "Models", "count": 7} for seven new models).
- **isactive** - If the content is included in the compendium by default, which can be then manually turned on/off by the user at any time.
- **files** - The actual compendium content. Each member of the array reflects a single file searched by the compendium, see [Data Responder](./search_util/Data_Responder.md) for the names of each data file. The data of each file varies based on the kind of data used, see the individual documentation pages for examples.

## Content Pack Example

Below is the complete Content Pack for the Legion of Tubal which contains the following elements.
- Seven new Models
- 12 new Addons/Abilities
- One new Faction
- Nine new upgrades for models

```
{
    "id": "cp_legionoftubal",
    "name": "Legion Of Tubal",
    "author": "Bob The Seagull King",
    "description": "It has been 40 years since my heart stopped beating. I’ve kept the husk among my tools, along with what remains of my soul, owned by me and me alone.",
    "tags": [
                {
                    "name": "models",
                    "count": 7
                },
                {
                    "name": "addons",
                    "count": 12
                },
                {
                    "name": "faction",
                    "count": 1
                },
                {
                    "name": "upgrades",
                    "count": 9
                }
            ],
    "isactive": true,
    "files":    [
                    {
                        "type": "models",
                        "data": [

                            {
                                "id": "md_ursmith",
                                "type": "Model",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                    {"tag_name": "tubal", "val": ""},
                                    {"tag_name": "elite", "val": ""},
                                    {"tag_name": "tough", "val": ""}
                                        ],
                                "movement": "6\"",
                                "ranged": "+2",
                                "melee": "+2",
                                "armour": "0",
                                "base": "32",
                                "faction_id": "fc_legionoftubal",
                                "variant_id": "fv_basic",
                                "name": "Ur-Smith",
                                "attachments": [
                                    {"tag_name": "addons", "val": "ab_redundantmechanisms"},
                                    {"tag_name": "addons", "val": "ab_tough"},
                                    {"tag_name": "addons", "val": "ab_demonstrateownership"}
                                            ],
                                "blurb": [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "Envied member of the Tubal elite, these undisputed masters of their craft have the rare priviledge to construct their own monstrorities and enhance their bodies beyond the grip of the demonic lords. Their souls, black and rotten as they are, are their own which grants them considerable authority among the heretic forces. Most notably the ability to handle consecrated materials that would destroy the hands of a lesser smith of hell."
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "Having survives the grueling rite of passage into this order, they possess deep knowledge of alchemy, mechanics, and medicine. It is rare for an Ur-Smith to remain human for long as their instiable need for more knowledge and power invariably leads them to experiment on their own bodies."
                                    }
                                ],
                                "equipment":  [{
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The Ur-Smith can be equipped with any weapon, armour, and equipment from the Legion of Tubal Equipment List."
                                                }],
                                "abilities":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                        "content": "ab_redundantmechanisms"
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                        "content": "ab_tough"
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                        "content": "ab_demonstrateownership"
                                    }
                                        ]

                            },

                            {
                                "id": "md_ursurgeon",
                                "type": "Model",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                    {"tag_name": "tubal", "val": ""},
                                    {"tag_name": "elite", "val": ""}
                                        ],
                                "movement": "6\"",
                                "ranged": "0",
                                "melee": "+1",
                                "armour": "-1 DICE",
                                "base": "32",
                                "faction_id": "fc_legionoftubal",
                                "variant_id": "fv_basic",
                                "name": "Ur-Surgeon",
                                "attachments": [
                                    {"tag_name": "addons", "val": "ab_redundantmechanisms"},
                                    {"tag_name": "addons", "val": "ab_experimentalprocedure"},
                                    {"tag_name": "addons", "val": "ab_recycle"}
                                            ],
                                "blurb": [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "The ring of medicine is a wretched organisation within the Legion of Tubal. Just as their smithing bretheren are experts of the forge, they are experts of the blade. Those who enter the ranks of surgeon must demonstrate a fierce distaste for the common man and a desire to hear them suffer for research. It is the combined knowledge of the Surgeons and Smiths that allow for the construction and maintanence of their hellish armada."
                                    }
                                ],
                                "equipment":  [{
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The Ur-Surgeon can be equipped with any weapons and equipment from the Legion of Tubal Equipment List. It cannot wear armour (including shields) - but the Surgeons Apron that covers their body grants it -1 DICE to injuries rolls (reflected in the profile above).",
                                                    "glossary": [{"val": "-1 DICE", "id": "gl_minusdice"}]
                                                }],
                                "abilities":  [{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_redundantmechanisms"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_experimentalprocedure"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_recycle"
                                }
                                        ]

                            },

                            {
                                "id": "md_masterwork",
                                "type": "Model",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                    {"tag_name": "tubal", "val": ""},
                                    {"tag_name": "elite", "val": ""},
                                    {"tag_name": "strong", "val": ""}
                                        ],
                                "movement": "6\"",
                                "ranged": "+2",
                                "melee": "-1",
                                "armour": "0",
                                "base": "40",
                                "faction_id": "fc_legionoftubal",
                                "variant_id": "fv_basic",
                                "name": "Masterwork",
                                "attachments": [
                                    {"tag_name": "addons", "val": "ab_redundantmechanisms"},
                                    {"tag_name": "addons", "val": "ab_strong"},
                                    {"tag_name": "addons", "val": "ab_closequartersmaster"},
                                    {"tag_name": "addons", "val": "ab_prescisionstrike"}
                                            ],
                                "blurb": [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "The final act of any member of the order is to immortalize themselves in machinery. One may spend decades planning out their final invention, schematics burned into their minds over countless hours toiling away. Finally, when the time comes, they travel to the forge at which they first trained and kill themselves at the foot of their fellow members of the order. Then, over many restless days, their peers will construct their ultimate machine using the member’s own body. Once the work is done, they will awake again with a new body and a new purpose."
                                    }
                                ],
                                "equipment":  [{
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The Masterwork can be equipped with any weapons, armour, and equipment from the Legion of Tubal Equipment List."
                                                }],
                                "abilities":  [{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_redundantmechanisms"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_strong"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_closequartersmaster"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_prescisionstrike"
                                }
                                        ]

                            },

                            {
                                "id": "md_failedapplicant",
                                "type": "Model",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                    {"tag_name": "tubal", "val": ""}
                                        ],
                                "movement": "6\"",
                                "ranged": "-1",
                                "melee": "-1",
                                "armour": "0",
                                "base": "25",
                                "faction_id": "fc_legionoftubal",
                                "variant_id": "fv_basic",
                                "name": "Failed Applicant",
                                "attachments": [
                                    {"tag_name": "addons", "val": "ab_redundantmechanisms"}
                                            ],
                                "blurb": [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "Those who cannot bear the trials necessary to become an Ur-Smith are bound and brought to the forge-ziggurats where they become experimental subjects, minds still largely intact as they are subjected to a dizzying array of changes to themselves."
                                    }
                                ],
                                "equipment":  [{
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "Failed Applicants can be equipped with any weapons, armour, or equipment from the Legion of Tubal Equipment List. The applicants can maintain their own modifications, they can be equipped with +1 Engineering upgrades."
                                                }],
                                "abilities":  [{
                                                "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                                "content": "ab_redundantmechanisms"
                                            }
                                        ]

                            },

                            {
                                "id": "md_hothead",
                                "type": "Model",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                    {"tag_name": "tubal", "val": ""}
                                        ],
                                "movement": "6\"",
                                "ranged": "0",
                                "melee": "+1",
                                "armour": "0",
                                "base": "25",
                                "faction_id": "fc_legionoftubal",
                                "variant_id": "fv_basic",
                                "name": "Hothead",
                                "attachments": [
                                    {"tag_name": "addons", "val": "ab_redundantmechanisms"},
                                    {"tag_name": "addons", "val": "ab_massproduced"},
                                    {"tag_name": "addons", "val": "ab_mania"}
                                            ],
                                "blurb": [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "Manufactured in bulk by the initiate smiths and surgeons, the hothead is what the lesser corpses gifted to the Legion are transformed into. Their skulls are hollowed out and replaced with wiring and fuel for their rapidly beating heart. What they lack in physical strength they make up for in fury - rapidly moving throughout the battlefield until they come across something they can tear apart."
                                    }
                                ],
                                "equipment":  [{
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "Hotheads can be equipped with any weapons, armour, or equipment from the Legions of Tubal Equipment List."
                                                }],
                                "abilities":  [{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_redundantmechanisms"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_massproduced"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_mania"
                                }
                                        ]

                            },

                            {
                                "id": "md_munitionsenhancedcorpse",
                                "type": "Model",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                    {"tag_name": "tubal", "val": ""},
                                    {"tag_name": "tough", "val": ""}
                                        ],
                                "movement": "6\"",
                                "ranged": "+1",
                                "melee": "+1",
                                "armour": "0",
                                "base": "32",
                                "faction_id": "fc_legionoftubal",
                                "variant_id": "fv_basic",
                                "name": "Munitions Enhanced Corpse",
                                "attachments": [
                                    {"tag_name": "addons", "val": "ab_redundantmechanisms"},
                                    {"tag_name": "addons", "val": "ab_tough"},
                                    {"tag_name": "addons", "val": "ab_gutlauncher"}
                                            ],
                                "blurb": [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "In accordance with the extensive contracts made with the Legion of Tubal - any city which is priviledged with one of their forge-temples must pay to the order 30% of their dead for use in experimentation. Corpses of suficient bulk and hatred may be converted into a munitions enhanced corpse. Reanimated with lightning and aether their near-useless organs are instead churned as fuel for the devestating explosive weaponry characteristic of this undead nightmare."
                                    }
                                ],
                                "equipment":  [{
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "Munitions Enhanced Corpses can be equipped with any weapons and armour from the Legion of Tubal Equipment List, but lack the skill to hold equipment items. They come equipped with a Guts Launcher (see below)."
                                                }],
                                "abilities":  [{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_redundantmechanisms"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_tough"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_gutlauncher"
                                }
                                        ]

                            },

                            {
                                "id": "md_hellwheel",
                                "type": "Model",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                    {"tag_name": "tubal", "val": ""},
                                    {"tag_name": "fear", "val": ""}
                                        ],
                                "movement": "10\"",
                                "ranged": "N/A",
                                "melee": "+1",
                                "armour": "-3",
                                "base": "50",
                                "faction_id": "fc_legionoftubal",
                                "variant_id": "fv_basic",
                                "name": "Hell Wheel",
                                "attachments": [
                                    {"tag_name": "addons", "val": "ab_redundantmechanisms"},
                                    {"tag_name": "addons", "val": "ab_spinout"},
                                    {"tag_name": "addons", "val": "ab_nitroboost"},
                                    {"tag_name": "addons", "val": "ab_wheelfear"}
                                            ],
                                "blurb": [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "The great secret of the Legion of Tubal is the construction of Hell-Wheels These gargantuan machines are fused with heretic bone to allow inhabitation by a devil. Once a devil enters the machine, its screaming machinery will not cease until the thing it utterly destroyed. Only an Ur-Smith is able to dissasemble the wheel between battles, only for them to repaired and set flying into the front lines grinding skulls underneath."
                                    }
                                ],
                                "equipment":  [{
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The Hell-Wheel can be equipped with any melee weapons and equipment from the Legion of Tubal Equipment List. It cannot fire ranged weapons or wear armour (including shields) - but the bloodied iron that makes up most of its body grants it -3 to injuries rolls (reflected in the profile above)."
                                                }],
                                "abilities":  [{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_redundantmechanisms"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_spinout"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_nitroboost"
                                },{
                                    "tags": [{"tag_name": "desc_type", "val": "addon"}],
                                    "content": "ab_wheelfear"
                                }
                                        ]

                            }

                                ]
                    },
                    {
                        "type": "addons",
                        "data": [
                            {
                                "id": "ab_redundantmechanisms",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Redundant Mechanisms",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "Whenever the model would be sent Out Of Action, roll 1D, on a result of 6 the blow destroys some uneccesary mass of wires, blood vessels, or offal. Treat the result as Down instead.",
                                                    "glossary": []
                                                }
                                                ]
                            },
                            {
                                "id": "ab_demonstrateownership",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Demonstrate Ownership",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "With a successful RISKY ACTION, you may choose a friendly model within 8” and have them perform a single ACTION immediately. Any rolls, including injury rolls. made during this ACTION are made with -1 DICE.",
                                                    "glossary": [{"val": "RISKY ACTION", "id": "gl_riskyaction"},{"val": "ACTION", "id": "gl_action"},{"val": "-1 DICE", "id": "gl_minusdice"}]
                                                }
                                                ]
                            },
                            {
                                "id": "ab_experimentalprocedure",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Experimental Procedure",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "On a successful ACTION thesurgeon can remove D3 BLOOD MARKERs from a friendly model within 1”.",
                                                    "glossary": [{"val": "ACTION", "id": "gl_action"},{"val": "BLOOD MARKERs", "id": "gl_bloodmarker"}]
                                                }
                                                ]
                            },
                            {
                                "id": "ab_recycle",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Recycle",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": " When a model within 8” is sent Out Of Action the surgeon gains +1 BLESSING MARKER.",
                                                    "glossary": [{"val": "+1 BLESSING MARKER", "id": "gl_blessingmarker"}]
                                                }
                                                ]
                            },
                            {
                                "id": "ab_closequartersmaster",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Close Quarters Master",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The Masterwork can wield ranged weapons even when engaged in melee. When engaged in melee they can attack using ranged weapons with -1 DICE as long as they target a model they are engaged in melee with.",
                                                    "glossary": [{"val": "-1 DICE", "id": "gl_minusdice"}]
                                                }
                                                ]
                            },
                            {
                                "id": "ab_prescisionstrike",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Prescision Strike",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "All attack ACTIONs made by the Masterwork gain the effect CRITICAL: The injury roll made with this weapon is made with +1 DICE.",
                                                    "glossary": [{"val": "ACTIONs", "id": "gl_action"},{"val": "+1 DICE", "id": "gl_plusdice"}]
                                                }
                                                ]
                            },
                            {
                                "id": "ab_massproduced",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Mass Produced",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The hothead is of poorer quality than the rest of the legion’s line of products. Injury rolls against this model gain +1 DICE.",
                                                    "glossary": [{"val": "+1 DICE", "id": "gl_plusdice"}]
                                                }
                                                ]
                            },
                            {
                                "id": "ab_mania",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Mania",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": " When a model, friend or foe, within 8” takes a Move Charge or Dash ACTION the hothead can move 1” in any direction. This movement cannot put the model within 1” of an enemy model or off the battlefield.",
                                                    "glossary": [{"val": "ACTION", "id": "gl_action"}]
                                                }
                                                ]
                            },
                            {
                                "id": "ab_gutlauncher",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Guts Launcher",
                                "description":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "If the opposing player places a BLOOD MARKER on the corpse, it also gains a GUTS MARKER (which can be tracked with a D6, the grosser the better!). As an ACTION the corpse can activate the Guts Launcher and consume any number of GUTS MARKERs (including 0).",
                                        "glossary": [{"val": "BLOOD MARKER", "id": "gl_bloodmarker"},{"val": "ACTION", "id": "gl_action"}]
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "Choose a point within 24” and make a Ranged Attack ACTION with -4 DICE - add +1 DICE for every GUTS MARKER consumed for the ACTION. If the corpse is engaged in melee, they can still make the attack but must choose a model they’re currently engaged with.",
                                        "glossary": [{"val": "ACTION", "id": "gl_action"},{"val": "-4 DICE", "id": "gl_minusdice"},{"val": "+1 DICE", "id": "gl_plusdice"}]
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "If the roll is unsuccessful, the bomb is off-target and will deviate 1” from your nominated target point for each degree of failure of the Ranged Attack ACTION in a direction determined by your opponent (for example, if you rolled 5, the bomb lands 2” away, as 7-5=2). The direction is decided by your opponent.",
                                        "glossary": [{"val": "ACTION", "id": "gl_action"}]
                                    },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                        "content": "Once the landing site of the launcher has been determined, it will detonate. Roll once on the Injury Chart for each model that is within 3” of where the bomb landed. No to hit roll is needed. Injuries are rolled with -1 DICE.",
                                        "glossary": [{"val": "-1 DICE", "id": "gl_minusdice"}]
                                    }
                                                ]
                            },
                            {
                                "id": "ab_spinout",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Spin Out",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The Hell-Wheel can move through enemy models, as long as it moves past them completely. In order to end its movement within 1” of an enemy it must CHARGE the model. Whenever the Hell-Wheel moves over an enemy model, make an unarmed attack ACTION against it.",
                                                    "glossary": [{"val": "ACTION", "id": "gl_action"}]
                                                }
                                                ]
                            },
                            {
                                "id": "ab_nitroboost",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Nitro Boost",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "Every neuron in its body is made to move quickly. The Hell-Wheel gains +1 DICE on Dash ACTIONs and can get up from being Down without suffering a movement penalty.",
                                                    "glossary": [{"val": "+1 DICE", "id": "gl_plusdice"},{"val": "ACTIONs", "id": "gl_action"}]
                                                }
                                                ]
                            },
                            {
                                "id": "ab_wheelfear",
                                "type": "Addon",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                        ],
                                "faction_id": "fc_legionoftubal",
                                "name": "Fear",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "Unending screams that emennate from its infernal engine cause the ears to bleed in retaliation, and so the Hell-Wheel causes FEAR.",
                                                    "glossary": [{"val": "FEAR", "id": "gl_fear"}]
                                                }
                                                ]
                            }
                                ]
                    },
                    {
                        "type": "faction",
                        "data": [
                            {
                                "id": "fc_legionoftubal",
                                "type": "Faction",
                                "source": "core",
                                "team":"hell",                              
                                "tags": [
                                    {"tag_name": "tubal", "val": ""}
                                        ],
                                "name": "Legion Of Tubal",
                                "team": "hell",
                                "flavour":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "Centuries ago, when the fallen knights opened the gates of hell, it was a time of horrors unknowable. Unleashed at last there was a flurry of terror and magic throughout the once kingdoms-of-heaven. Demonic forces who have spent millenia in isolation now able to enact their dark rites they have practised for so long."
                                    },
                                    { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "This, however, did not win the war. Through the might of the faithful the forces of hell were held back. With each of these first great battles, yet more of theancient masters will fall in battle or return to their stinking pits to commandtheir forces from a distance. Now, afternearly a thousand years at war, the ancient mage orders are few in number,covens of witches are scattered to the countryside, and in the lands of thefaithful lifetimes of currency are spentscrounging up the dried remains of thesaints that still lay amongst the earth."
                                    },
                                    { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "Here the Legion of Tubal have risen from the mud of humanity. Utterly outmatched by the arcane might of their demonic masters they turned to the means of smithing and alchemy in order to tear power from the hearts of their rivals. Their will, they say, is to serve no great masters of their own."
                                    },
                                    { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "What was once the foolish attempts of the mortal to crack the might of the unholy legions has since become a venerable house of science with great forge-temples jutting out from the landscape of heretic territories. Hated and needed by the devils in equal measure, their skill with even the most blessed of metals gifts those-who-face-the-tyrant with metal monstrosities capable of tearing through holy fire until the battle is over - at which points the scraps can simply be scavenged and repaired for the next day’s battles."
                                    },
                                    { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "Today, the Legion of Tubal stands tall as the mightiest heretic force unbound by llegience to a single greater demon. Instead, their work is contracted and their members typically leased to manage the construction of some great temple or weapon of war."
                                    },
                                    { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "Becoming a member of the house is no simple matter� While the house is theoretically open to anyone - those without the connections necessary must participate in the harrowing vetting process. A months or years long series of trials where each man must fend for themselves. Those with the wit and stinking hearts to create great machines may be admitted into the order while those who fail must submit themselves to the flesh sellers - awaiting the time at which they will be chosen to become the creations they had once wished to build."
                                    },
                                    { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "Once within the order a member will experience a never before seen level of excess and hedonism. Their trade is valuable, and their prices steep. Despite this they are not afforded any additional safety. To survive the heat of their forges and the blades of their peers, they too must become more than a mortal thing of flesh and offal."
                                    },
                                    { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "To live in the Legion of Tubal is to become something other than you, to tear out your heart and in its place sew an engine of hellish wrath."
                                    }
                                ],
                                "rules": [ 
                                    {
                                        "title": "Engineering",
                                        "description": [
                                            {
                                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                "content": "When recruiting members of your warband, any models with the keyword TUBAL can be fitted with mecharcane technology to upgrade themselves thanks to the advanced engineering capabilities of the TUBAL.",
                                                "glossary": []
                                            },
                                            {
                                                "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                "content": "Each model can only be given a single upgrade, chosen from the list below, with a given cost that must be paid during recruitment. During a campaign, an upgrade can be replaced between battles. To do so, regain the cost of the upgrade, then pay the cost of the new upgrade.",
                                                "glossary": []
                                            },{
                                                "tags": [{"tag_name": "desc_type", "val": "list"}],
                                                "content": "",
                                                "subcontent":  [
                                                    {
                                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                        "content": "Exhaust Vents:",
                                                        "subcontent":  [
                                                            {
                                                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                                "content": " (30 Ducats) (LIMIT:1)"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                        "content": "Material Tankard:",
                                                        "subcontent":  [
                                                            {
                                                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                                "content": " (20 Ducats)"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                        "content": "Auxilliary Limb:",
                                                        "subcontent":  [
                                                            {
                                                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                                "content": " (35 Ducats) (LIMIT:1)"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                        "content": "Cranial Port:",
                                                        "subcontent":  [
                                                            {
                                                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                                "content": " (5 Ducats) (Non-ELITE)"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                        "content": "Reinforced Frame:",
                                                        "subcontent":  [
                                                            {
                                                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                                "content": " (15 Ducats)"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                        "content": "Occular Suite:",
                                                        "subcontent":  [
                                                            {
                                                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                                "content": " (15 Ducats)"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                        "content": "Hazardous Environment Suit:",
                                                        "subcontent":  [
                                                            {
                                                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                                "content": " (25 Ducats) (LIMIT:2)"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                        "content": "Heart Furnace:",
                                                        "subcontent":  [
                                                            {
                                                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                                "content": " (30 Ducats) (LIMIT:2)"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                        "content": "Hollowed Soul:",
                                                        "subcontent":  [
                                                            {
                                                                "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                                "content": " (1 Glory)"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }

                                ],
                                "equipment": [
                                    {"id": "eq_automaticpistol", "cost": 25, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "keyword", "val": "Elite"}]},
                                    {"id": "eq_automaticrifle", "cost": 40, "cost_id": "ducats", "limit": 1, "restriction": []},
                                    {"id": "eq_automaticshotgun", "cost": 20, "cost_id": "ducats", "limit": 2, "restriction": []},
                                    {"id": "eq_boltactionrifle", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_flamethrower", "cost": 30, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_grenades", "cost": 5, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_incendiarygrenades", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_gasgrenades", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_machinegun", "cost": 60, "cost_id": "ducats", "limit": 1, "restriction": []},
                                    {"id": "eq_pistol", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_shotgun", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_sniperrifle", "cost": 35, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "keyword", "val": "Elite"}]},
                                    {"id": "eq_submachinegun", "cost": 2, "cost_id": "glory", "limit": 0, "restriction": []},
                                    {"id": "eq_silencedpistol", "cost": 30, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_rocketpropelledgrenade", "cost": 2, "cost_id": "glory", "limit": 1, "restriction": []},
                                    {"id": "eq_antimaterialrifle", "cost": 3, "cost_id": "glory", "limit": 1, "restriction": []},
                                    {"id": "eq_bayonet", "cost": 2, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_trenchclub", "cost": 3, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_trenchknife", "cost": 1, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_swordaxe", "cost": 4, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_greataxe", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_polearm", "cost": 7, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_sacrificialblade", "cost": 1, "cost_id": "glory", "limit": 0, "restriction": [{"type": "keyword", "val": "Elite"}]},
                                    {"id": "eq_hellblade", "cost": 2, "cost_id": "glory", "limit": 2, "restriction": []},
                                    {"id": "eq_antitankhammer", "cost": 35, "cost_id": "ducats", "limit": 2, "restriction": []},
                                    {"id": "eq_standardarmour", "cost": 20, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_trenchshield", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_heavyarmour", "cost": 40, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "keyword", "val": "Elite"}]},
                                    {"id": "eq_promotion", "cost": 6, "cost_id": "glory", "limit": 1, "restriction": [{"type": "keyword", "val": "Elite"}]},
                                    {"id": "eq_musicalinstrument", "cost": 15, "cost_id": "ducats", "limit": 1, "restriction": []},
                                    {"id": "eq_incendiarybullets", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_combathelmet", "cost": 5, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_gasmask", "cost": 5, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_binoculars", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "keyword", "val": "Elite"}]},
                                    {"id": "eq_medikit", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_resurrectionengine", "cost": 12, "cost_id": "glory", "limit": 1, "restriction": []},
                                    {"id": "eq_shovel", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_sniperscope", "cost": 40, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "keyword", "val": "Elite"}]},
                                    {"id": "eq_troopflag", "cost": 1, "cost_id": "glory", "limit": 1, "restriction": []},
                                    {"id": "eq_unholytrinket", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": []},
                                    {"id": "eq_unholyrelic", "cost": 30, "cost_id": "ducats", "limit": 0, "restriction": []}
                                ],
                                "models": [
                                    {"id": "md_ursmith", "cost": 80, "cost_id": "ducats", "limit_min": 1, "limit_max": 1, "equipment": [], "upgrades": [{"id": "up_exhaustvents", "cost": 30, "cost_id": "ducats"},{"id": "up_materialtankard", "cost": 20, "cost_id": "ducats"},{"id": "up_auxilliarylimb", "cost": 35, "cost_id": "ducats"},{"id": "up_reinforcedframe", "cost": 15, "cost_id": "ducats"},{"id": "up_occularsuite", "cost": 15, "cost_id": "ducats"},{"id": "up_hazardousenvironmentsuit", "cost": 25, "cost_id": "ducats"},{"id": "up_heartfurnace", "cost": 30, "cost_id": "ducats"},{"id": "up_hollowedsoul", "cost": 1, "cost_id": "glory"}]},
                                    {"id": "md_ursurgeon", "cost": 95, "cost_id": "ducats", "limit_min": 0, "limit_max": 1, "equipment": [], "upgrades": [{"id": "up_exhaustvents", "cost": 30, "cost_id": "ducats"},{"id": "up_materialtankard", "cost": 20, "cost_id": "ducats"},{"id": "up_auxilliarylimb", "cost": 35, "cost_id": "ducats"},{"id": "up_reinforcedframe", "cost": 15, "cost_id": "ducats"},{"id": "up_occularsuite", "cost": 15, "cost_id": "ducats"},{"id": "up_hazardousenvironmentsuit", "cost": 25, "cost_id": "ducats"},{"id": "up_heartfurnace", "cost": 30, "cost_id": "ducats"},{"id": "up_hollowedsoul", "cost": 1, "cost_id": "glory"}]},
                                    {"id": "md_masterwork", "cost": 90, "cost_id": "ducats", "limit_min": 0, "limit_max": 1, "equipment": [], "upgrades": [{"id": "up_exhaustvents", "cost": 30, "cost_id": "ducats"},{"id": "up_materialtankard", "cost": 20, "cost_id": "ducats"},{"id": "up_auxilliarylimb", "cost": 35, "cost_id": "ducats"},{"id": "up_reinforcedframe", "cost": 15, "cost_id": "ducats"},{"id": "up_occularsuite", "cost": 15, "cost_id": "ducats"},{"id": "up_hazardousenvironmentsuit", "cost": 25, "cost_id": "ducats"},{"id": "up_heartfurnace", "cost": 30, "cost_id": "ducats"},{"id": "up_hollowedsoul", "cost": 1, "cost_id": "glory"}]},
                                    {"id": "md_failedapplicant", "cost": 20, "cost_id": "ducats", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": [{"id": "up_exhaustvents", "cost": 30, "cost_id": "ducats"},{"id": "up_materialtankard", "cost": 20, "cost_id": "ducats"},{"id": "up_auxilliarylimb", "cost": 35, "cost_id": "ducats"},{"id": "up_cranialport", "cost": 5, "cost_id": "ducats"},{"id": "up_reinforcedframe", "cost": 15, "cost_id": "ducats"},{"id": "up_occularsuite", "cost": 15, "cost_id": "ducats"},{"id": "up_hazardousenvironmentsuit", "cost": 25, "cost_id": "ducats"},{"id": "up_heartfurnace", "cost": 30, "cost_id": "ducats"},{"id": "up_hollowedsoul", "cost": 1, "cost_id": "glory"}]},
                                    {"id": "md_hothead", "cost": 45, "cost_id": "ducats", "limit_min": 0, "limit_max": 5, "equipment": [], "upgrades": [{"id": "up_exhaustvents", "cost": 30, "cost_id": "ducats"},{"id": "up_materialtankard", "cost": 20, "cost_id": "ducats"},{"id": "up_auxilliarylimb", "cost": 35, "cost_id": "ducats"},{"id": "up_cranialport", "cost": 5, "cost_id": "ducats"},{"id": "up_reinforcedframe", "cost": 15, "cost_id": "ducats"},{"id": "up_occularsuite", "cost": 15, "cost_id": "ducats"},{"id": "up_hazardousenvironmentsuit", "cost": 25, "cost_id": "ducats"},{"id": "up_heartfurnace", "cost": 30, "cost_id": "ducats"},{"id": "up_hollowedsoul", "cost": 1, "cost_id": "glory"}]},
                                    {"id": "md_munitionsenhancedcorpse", "cost": 100, "cost_id": "ducats", "limit_min": 0, "limit_max": 2, "equipment": [], "upgrades": [{"id": "up_exhaustvents", "cost": 30, "cost_id": "ducats"},{"id": "up_materialtankard", "cost": 20, "cost_id": "ducats"},{"id": "up_auxilliarylimb", "cost": 35, "cost_id": "ducats"},{"id": "up_cranialport", "cost": 5, "cost_id": "ducats"},{"id": "up_reinforcedframe", "cost": 15, "cost_id": "ducats"},{"id": "up_occularsuite", "cost": 15, "cost_id": "ducats"},{"id": "up_hazardousenvironmentsuit", "cost": 25, "cost_id": "ducats"},{"id": "up_heartfurnace", "cost": 30, "cost_id": "ducats"},{"id": "up_hollowedsoul", "cost": 1, "cost_id": "glory"}]},
                                    {"id": "md_hellwheel", "cost": 120, "cost_id": "ducats", "limit_min": 0, "limit_max": 2, "equipment": [], "upgrades": [{"id": "up_exhaustvents", "cost": 30, "cost_id": "ducats"},{"id": "up_materialtankard", "cost": 20, "cost_id": "ducats"},{"id": "up_auxilliarylimb", "cost": 35, "cost_id": "ducats"},{"id": "up_cranialport", "cost": 5, "cost_id": "ducats"},{"id": "up_reinforcedframe", "cost": 15, "cost_id": "ducats"},{"id": "up_occularsuite", "cost": 15, "cost_id": "ducats"},{"id": "up_hazardousenvironmentsuit", "cost": 25, "cost_id": "ducats"},{"id": "up_heartfurnace", "cost": 30, "cost_id": "ducats"},{"id": "up_hollowedsoul", "cost": 1, "cost_id": "glory"}]},
                                    {"id": "md_wardog", "cost": 1, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": []},
                                    {"id": "md_guarddog", "cost": 2, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": []},
                                    {"id": "md_mercydog", "cost": 2, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": ["eq_medikit"], "upgrades": []},
                                    {"id": "md_hellhound", "cost": 2, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": []},
                                    {"id": "md_sineater", "cost": 6, "cost_id": "glory", "limit_min": 0, "limit_max": 1, "equipment": ["eq_heavyarmour","eq_tenderizermaul"], "upgrades": []}
                                ]
                            }              
                        ]
                    },
                    {
                        "type": "upgrade",
                        "data": [
                            {
                                "id": "up_exhaustvents",
                                "type": "Upgrade",
                                "name": "Exhaust Vents",
                                "description":  [
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                                    "content": "The heat produced by infernal metals is immense, installing dedicated ports can allow this tremendous energy to be expelled in the midst of combat."
                                                },
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "On a successful ACTION the model opens their exhaust and vents excess heat and smoke. When opened the model is considered to be in cover until its next activation, and the model can Fly at any point during this current activation.",
                                                    "glossary": [{"val": "ACTION", "id": "gl_action"}]
                                                }
                                                ]
                            },
                            {
                                "id": "up_materialtankard",
                                "type": "Upgrade",
                                "name": "Material Tankard",
                                "description":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "Toxic waste pours from the forge-temples like water. When it becomes too great a hazard to the members of the order it is collected and stored in volotile containers. If the need is there a construct can be fitted with such a container to bring the danger to the front lines."
                                    },
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "When this model is deployed choose GAS, FIRE, or SHRAPNEL. If the model is sent Out of Action the tankard explodes with the keyword chosen. All models within 4” roll on the injury table, models further than 1” from the exploding model make the roll with -1 DICE.",
                                                    "glossary": [{"val": "GAS", "id": "gl_gas"},{"val": "FIRE", "id": "gl_fire"},{"val": "SHRAPNEL", "id": "gl_shrapnel"},{"val": "-1 DICE", "id": "gl_minusdice"}]
                                                }
                                                ]
                            },
                            {
                                "id": "up_auxilliarylimb",
                                "type": "Upgrade",
                                "name": "Auxilliary Limb",
                                "description":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "Deeply-nested bundles of wiring can hijack the basic nervous system. Through this additional limbs can be retrofitted into the physical make up of a combatant - enhancing their ability to weild equipment."
                                    },
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The model gains the STRONG keyword. Choose either Ranged or Melee combat. They gain an additional hand with which to hold weapons of that type (ie. Three one handed weapons or a two handed weapon and a one handed weapon) and can make one additional attack ACTION of the chosen type without penalty.",
                                                    "glossary": [{"val": "STRONG", "id": "gl_strong"},{"val": "ACTION", "id": "gl_action"}]
                                                }
                                                ]
                            },
                            {
                                "id": "up_cranialport",
                                "type": "Upgrade",
                                "name": "Cranial Port",
                                "description":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "Hijacking the body is a simple matter, it takes a skilled craftsman to overcome the spirit and hijack the mind� Such technology is closely guarded and prized by the Legion of Tubal."
                                    },
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "Choose another model with the Cranial Port upgrade. Those two models form a FIRETEAM and gain the FIRETEAM keyword.",
                                                    "glossary": [{"val": "FIRETEAM", "id": "gl_fireteam"}]
                                                }
                                                ]
                            },
                            {
                                "id": "up_reinforcedframe",
                                "type": "Upgrade",
                                "name": "Reinforced Frame",
                                "description":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "In a process incomparable to any other, the bones are infused with molten iron and bronze. The result, if the patient survives, is a fortified skeleton able to withstand the most terrible of blows and strike back with great force."
                                    },
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The model adds +1 DICE to its melee characteristic and all melee attacks against this model have -1 DICE on their injury roll.",
                                                    "glossary": [{"val": "+1 DICE", "id": "gl_plusdice"},{"val": "-1 DICE", "id": "gl_minusdice"}]
                                                }
                                                ]
                            },
                            {
                                "id": "up_hazardousenvironmentsuit",
                                "type": "Upgrade",
                                "name": "Hazardous Environment Suit",
                                "description":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "The hazardous environment suit (or HEV), despite the name, does not protect against uniquely hazardous materials. Instead, it utilizes meta-physical materials to allow the wearer to blend into their environment; making enemy territory much less hazardous to traverse."
                                    },
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "A model with this upgrade gains both the SKIRMISHER and STEALTH keywords.",
                                                    "glossary": [{"val": "SKIRMISHER", "id": "gl_skirmisher"},{"val": "STEALTH", "id": "gl_stealth"}]
                                                }
                                                ]
                            },
                            {
                                "id": "up_occularsuite",
                                "type": "Upgrade",
                                "name": "Occular Suite",
                                "description":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "With the eyes carved out, there is ample room in any skull for much more suitable equipment to be put in its place. For those with the stomach for it, more invasive surgeries can grant perception into deeper ends of the electromagnetic spectrum."
                                    },
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The model adds +1 DICE to its ranged characteristic, and its attacks ignore the penalties caused by long range.",
                                                    "glossary": [{"val": "+1 DICE", "id": "gl_plusdice"}]
                                                }
                                                ]
                            },
                            {
                                "id": "up_heartfurnace",
                                "type": "Upgrade",
                                "name": "Heart Furnace",
                                "description":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "The heart is an intricate machine, easily broken. Removal of the heart is a simple way to vastly improve the resilience of a machine - with the issue of corrosion gone their body can be suffused with a much more powerful balance of humours."
                                    },
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The model gains the TOUGH keyword. On a successful ACTION at the start of the models activation it can remove 1 BLOOD MARKER.",
                                                    "glossary": [{"val": "TOUGH", "id": "gl_tough"},{"val": "ACTION", "id": "gl_action"},{"val": "1 BLOOD MARKER", "id": "gl_bloodmarker"}]
                                                }
                                                ]
                            },
                            {
                                "id": "up_hollowedsoul",
                                "type": "Upgrade",
                                "name": "Hollowed Soul",
                                "description":  [
                                    {
                                        "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
                                        "content": "There is no need for that thing here, be rid of it to make room for hate."
                                    },
                                                {
                                                    "tags": [{"tag_name": "desc_type", "val": "desc"}],
                                                    "content": "The model gains the FEAR keyword, and can fit two upgrades in addition to this one. A model cannot take the same upgrade twice, including this one.",
                                                    "glossary": [{"val": "FEAR", "id": "gl_fear"}]
                                                }
                                                ]
                            }

                        ]
                    }
                ]
}
```