# Factions

Factions are thematic and organisational groups of models used to build a Warband.

## Structure

Factions are found in *factions.json* and each one has the following structure.

```
id          : string
type        : string
source      : string
tags        : []
name        : string
flavour     : []
rules       : []
equipment   : equipment[]
models      : models[]
```

- **id** - The identifying value of the faction, all factions start their id with "fc_".
- **type** - Used for broad categorization, all factions have the type "Faction".
- **source** - Where the faction comes from. Currently, it's expected all factinos will have the source "core".
- **tags** - A series of tags which identify what kind of faction something is, see [Tags](../../Tags.md) for more information.
- **name** - The name of the faction.
- **team** - If the faction is heaven or hell aligned.
- **flavour** - Specially formatted array of information included in the faction, see [Description](../../Description.md) for more informaiton.
- **rules** - Specially formatted array of information included in the faction, see [Rules](../../Rules.md.md) for more informaiton.
- **equipment** - List of equipment items and how that faction can purchase them, see below.
- **models** - List of models and how that faction can add them to a warband, see below.

### Equipment
```
id          : string // The id value of the equipment
cost        : number // The numerical cost of the equipment
cost_id     : string // The name of the currency used (ducats or glory)
limit       : number // Maximum amount of that equipment a faction can have, 0 = unlimited
features    : string[] // Special traits the equipment has in this faction
restriction : { type : string, val : string}[] // Array of restrictions by type (model, keyword, etc) and the specific value of that type (ELITE, STRONG, id_anointedheavyinfantry, etc)
```

### Models
```
id          : string // The id value of the equipment
cost        : number // The numerical cost of the equipment
cost_id     : string // The name of the currency used (ducats or glory)
limit_min   : number // The minimum amount of that model a warband can have
limit_max   : number // The maximum amount of that model a warband can have, 0 = unlimited
equipment   : string[] // IDs for equipment items that a model starts with
upgrades    : { id : string, cost : number, cost_id : string }[] // List of upgrade IDs and how much it costs to give that upgrade to the model
```

## Example

```
{
    "id": "fc_hereticlegion",
    "type": "Faction",
    "source": "core",
    "tags": [
        {"tag_name": "heretic", "val": ""}
            ],
    "name": "Heretic Legion",
    "team": "hell",
    "flavour":  [
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Ashroud of darkness blankets the world. Smoke and brimstone spews from the yawning gates of Inferno, enveloping the lands where people have abandoned God and openly wage war against His Creation. It is a grim reality that a full third of humanity has bent its knee before the idols of Hell. The main military force of Satan on Earth is the Heretic Legions, raised from amongst these citizens of the damned."
        },
        { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Under special absolution from the Cardinal Protector, many spies have been dispatched into Hell’s domains over the years. Most are never seen again, though the eternally screaming heads of some have been returned to New Antioch, branded with bleeding runes that mock the Holy Trinity."
        },
        { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Yet some do make it back to the light, whispering of the horrors they have witnessed: of firstborn cast into the mouths of the burning statues of Baal and human flesh sold by the pound in dreadful markets. They speak of the great idols of the Golden Calf and rapturous men and women who prostrate themselves before them, carving layers of their own flesh in ecstatic offering. Inverted pyramids and towers plunge into the depths of these cities, built of iron and black stone. Within these pits stand sacrificial altars where weeping captives are slowly sliced to death over agonising days and weeks with wicked knives made of infernal basalt. Cathedrals to the Princes of Hell hang from great arches of volcanic stone, while condemned are crucified on hundreds of upside-down crosses."
        },
        { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Accounts speak of sprawling factories made of mutilated flesh and metal, their forges yielding endless munitions for the ongoing war. Guided by the teachings of Tartarus’ smiths, alchemists toil over colossal weapons and armoured behemoths, wielding the forbidden secrets of their patrons’ metallurgy to forge instruments of death and suffering beyond the grasp of any human engineer. These are once-proud cities of Earth, where churches have been toppled and entire populations are now dedicated towards bringing down the very Throne of Heaven."
        },
        { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Amongst the forsaken citizens that endure within the earthly domains of Hell, the greatest status is afforded to the soldiers fighting in the Great War. But joining the army of damnation is no easy task. Those who wish to win a place amongst the Heretic Legions must make an unholy pilgrimage to the burning bronze gates of Hell. Even from leagues away, the infernal heat emanating from this great edifice sears both flesh and spirit until the pain becomes unbearable. In the Valley of Tears the great road that leads to the gate, paved as it is with wailing souls and lamentations, is littered with endless mounds of charred bodies. Many are still half-alive, writhing in agony, trapped in a grotesque twilight between life and death, their wickedness deemed insufficient. These discarded souls are doomed to writhe in agony until the Day of Judgement."
        },
        { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Those who make it within sight of Hell’s Maw are considered worthy and are initiated into the Legions, taking unbreakable vows that chain them into darkness for all eternity, their bodies branded with the mark of the Devil Lord that has claimed them. Armouries of Hell then equip them for battle and Heretic Priests beckon forth new supplicants as dictated by the whispers of their patron arch-devils. Thus a new Heretic Legionnaire is born. They hail Archdevils as their masters and are thus damned for all eternity."
        },
        { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Yet there are some who push further on: to the very Gate itself and beyond. Their very flesh ignites, never to recover, but those with the blackest souls can enter Inferno itself. Amongst those the Anointed are especially revered amongst the Legions. They are the paragons of unhinged brutality – men and women of colossal vigour and unyielding devotion. Having tread the accursed path to the shores of the Lake of Eternal Flame, where the damned wither and contort in ceaseless torment, the Anointed emerge forever scarred by the embrace of abyssal fires. The blackened and burnt flesh of the Anointed will never heal, but in exchange they are granted the right to wear Heavy Gehenna armoured suits and they gain strength to wield weapons that a normal man could barely lift. It is said that glancing into their eyes one can see the reflection of the very flames of Hell, forever etched in their vision."
        },
        { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Yet some who witness go even further in their depraved devotion. Suicide is a mortal sin and one eagerly embraced by many. Most cry out for devils to notice their final sacrifice in vain, as the Infernal nobles are capricious and delight in betraying their own as much as their enemies. But those with truly wicked and depraved souls are resurrected in contempt of the Redeemer, coming back as Choristers, horrific mockeries of Creation whose severed heads sing unholy hymns praising the Devil, their voices causing the ears of their enemies to bleed."
        },
        { "tags": [{"tag_name": "desc_type", "val": "gap"}], "content": "" },
        {
            "tags": [{"tag_name": "desc_type", "val": "subeffect"}],
            "content": "Though the vast bulk of the Heretic Legions are made of mortal humans, Hell often sends their own abhorrent progeny to reinforce their mortal foot soldiers: nightmarish War Beasts made of captured and possessed creatures and dreaded Artillery Witches who act as mobile artillery supporting lighting assaults. Thus, in this accursed theatre of war, mortals and abominations march hand in withering hand, bound by the suffering ties of damnation. The wails of tortured beasts meld with the shrieks of damned souls, while the skies rain down fiery retribution upon all who dare to oppose the Heretics’ ceaseless crusade for a demented parity with their Creator."
        }
    ],
    "rules": [ ],
    "equipment": [
        {"id": "eq_boltactionrifle", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": [], "features":["Bayonet Lug"]},
        {"id": "eq_semiautomaticrifle", "cost": 20, "cost_id": "ducats", "limit": 0, "restriction": [], "features":["Bayonet Lug"]},
        {"id": "eq_automaticrifle", "cost": 3, "cost_id": "glory", "limit": 2, "restriction": [], "features":["Bayonet Lug"]},
        {"id": "eq_pistol", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_silencedpistol", "cost": 20, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "keyword", "val": "Elite"}]},
        {"id": "eq_grenades", "cost": 7, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_gasgrenades", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_incendiarygrenades", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_submachinegun", "cost": 2, "cost_id": "glory", "limit": 0, "restriction": [], "features":["Bayonet Lug","Shield Combo"]},
        {"id": "eq_shotgun", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": [], "features":["Shield Combo"]},
        {"id": "eq_automaticshotgun", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": [], "features":["Shield Combo"]},
        {"id": "eq_grenadelauncher", "cost": 40, "cost_id": "ducats", "limit": 1, "restriction": []},
        {"id": "eq_machinegun", "cost": 60, "cost_id": "ducats", "limit": 1, "restriction": []},
        {"id": "eq_flamethrower", "cost": 30, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_heavyflamethrower", "cost": 55, "cost_id": "ducats", "limit": 2, "restriction": []},
        {"id": "eq_antimaterialrifle", "cost": 3, "cost_id": "glory", "limit": 1, "restriction": []},
        {"id": "eq_trenchknife", "cost": 1, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_bayonet", "cost": 2, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_trenchclub", "cost": 3, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_swordaxe", "cost": 4, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_polearm", "cost": 7, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_greataxe", "cost": 12, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_greatmaul", "cost": 10, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_sacrificialblade", "cost": 23, "cost_id": "ducats", "limit": 2, "restriction": [{"type": "keyword", "val": "Elite"}]},
        {"id": "eq_hellblade", "cost": 1, "cost_id": "glory", "limit": 2, "restriction": []},
        {"id": "eq_tartarusclaws", "cost": 25, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "model", "val": "md_hereticdeathcommando"}]},
        {"id": "eq_blasphemousstaff", "cost": 2, "cost_id": "glory", "limit": 0, "restriction": [{"type": "keyword", "val": "Elite"}]},
        {"id": "eq_standardarmour", "cost": 20, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_heavyarmour", "cost": 40, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "keyword", "val": "Elite"},{"type": "model", "val": "md_anointedheavyinfantry"}]},
        {"id": "eq_trenchshield", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "", "val": ""}]},
        {"id": "eq_combathelmet", "cost": 5, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_gasmask", "cost": 5, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_unholytrinket", "cost": 15, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_unholyrelic", "cost": 30, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_incendiarybullets", "cost": 15, "cost_id": "ducats", "limit": 1, "restriction": []},
        {"id": "eq_shovel", "cost": 5, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_infernalbrandmark", "cost": 5, "cost_id": "ducats", "limit": 0, "restriction": []},
        {"id": "eq_troopflag", "cost": 1, "cost_id": "glory", "limit": 1, "restriction": []},
        {"id": "eq_hellboundsoulcontract", "cost": 5, "cost_id": "ducats", "limit": 3, "restriction": [{"type": "model", "val": "md_heretictrooper"},{"type": "model", "val": "md_anointedheavyinfantry"}]},
        {"id": "eq_rocketpropelledgrenade", "cost": 2, "cost_id": "glory", "limit": 1, "restriction": []},
        {"id": "eq_tenderizermaul", "cost": 0, "cost_id": "ducats", "limit": 0, "restriction": [{"type": "model", "val": "md_sineater"}]},
        {"id": "eq_sniperscope", "cost": 2, "cost_id": "glory", "limit": 2, "restriction": []},
        {"id": "eq_knighthood", "cost": 5, "cost_id": "glory", "limit": 1, "restriction": [{"type": "keyword", "val": "Elite"}]},
        {"id": "eq_promotion", "cost": 6, "cost_id": "glory", "limit": 1, "restriction": [{"type": "keyword", "val": "Elite"}]},
        {"id": "eq_musicalinstrument", "cost": 15, "cost_id": "ducats", "limit": 1, "restriction": []},
        {"id": "eq_mountaineerkit", "cost": 3, "cost_id": "ducats", "limit": 2, "restriction": []},
        {"id": "eq_markofcain", "cost": 4, "cost_id": "glory", "limit": 1, "restriction": [{"type": "keyword", "val": "Elite"}]},
        {"id": "eq_armourofcobar", "cost": 8, "cost_id": "glory", "limit": 1, "restriction": [{"type": "keyword", "val": "Elite"}]},
        {"id": "eq_tormentorchain", "cost": 3, "cost_id": "glory", "limit": 2, "restriction": []},
        {"id": "eq_executionersaxe", "cost": 5, "cost_id": "glory", "limit": 1, "restriction": []},
        {"id": "eq_demonicauragrenade", "cost": 3, "cost_id": "glory", "limit": 1, "restriction": []}
    ],
    "models": [
        {"id": "md_hereticpriest", "cost": 80, "cost_id": "ducats", "limit_min": 1, "limit_max": 1, "equipment": [], "upgrades": []},
        {"id": "md_hereticdeathcommando", "cost": 90, "cost_id": "ducats", "limit_min": 0, "limit_max": 1, "equipment": [], "upgrades": []},
        {"id": "md_hereticchorister", "cost": 65, "cost_id": "ducats", "limit_min": 0, "limit_max": 1, "equipment": [], "upgrades": []},
        {"id": "md_heretictrooper", "cost": 30, "cost_id": "ducats", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": [{"id": "up_heretictroopertolegionnareranged", "cost": 10, "cost_id": "ducats"},{"id": "up_heretictroopertolegionnaremelee", "cost": 10, "cost_id": "ducats"}]},
        {"id": "md_anointedheavyinfantry", "cost": 95, "cost_id": "ducats", "limit_min": 0, "limit_max": 5, "equipment": ["eq_heavyarmour","eq_infernalbrandmark"], "upgrades": []},
        {"id": "md_warwolfassaultbeast", "cost": 140, "cost_id": "ducats", "limit_min": 0, "limit_max": 1, "equipment": [], "upgrades": []},
        {"id": "md_artillerywitch", "cost": 90, "cost_id": "ducats", "limit_min": 0, "limit_max": 2, "equipment": [], "upgrades": []},
        {"id": "md_goeticwarlock", "cost": 4, "cost_id": "glory", "limit_min": 0, "limit_max": 1, "equipment": ["eq_swordaxe","eq_swordaxe"], "upgrades": []},
        {"id": "md_wardog", "cost": 1, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": []},
        {"id": "md_guarddog", "cost": 2, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": []},
        {"id": "md_mercydog", "cost": 2, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": ["eq_medikit"], "upgrades": []},
        {"id": "md_hellhound", "cost": 2, "cost_id": "glory", "limit_min": 0, "limit_max": 0, "equipment": [], "upgrades": []},
        {"id": "md_sineater", "cost": 6, "cost_id": "glory", "limit_min": 0, "limit_max": 1, "equipment": ["eq_heavyarmour","eq_tenderizermaul"], "upgrades": []}
    ]
}
```