import { ITrenchCrusadeItemData, TrenchCrusadeItem } from '../../TrenchCrusadeItem'
import { ItemType } from '../../Enum'
import { PlayerAddon } from '../addons/Addon'
import { DescriptionFactory } from '../../../utility/functions'

/**
 * Structure of a Model
 */
interface IPlayerModel extends ITrenchCrusadeItemData {
    promotion: number, // 0 = true 1 = limited 2 = none
    movement: number[],
    ranged: number[],
    melee: number[],
    armour: number[],
    base: number[],
    faction_id: string,
    variant_id: string,
    eventtags : {[_name : string] : any},
    blurb: [], 
    equipment: [],
    abilities: [],
    team?: string
}

/**
 * Model without the context of a particular faction
 * or variant - stats, features, and abilities.
 */
class PlayerModel extends TrenchCrusadeItem {
    public readonly Promotion;
    public readonly Movement: number[];
    public readonly Ranged: number[];
    public readonly Melee: number[];
    public readonly Armour: number[];
    public readonly Base: number[];
    public readonly Team;
    
    public readonly Faction;
    public readonly Variant;
    public readonly Blurb;
    public readonly Equipment;
    public readonly Abilities;
    public readonly EventTags;

    public Addons: PlayerAddon[] = [];
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerModel format
     */
    public constructor(data: IPlayerModel)
    {
        super(data)
        this.Promotion = data.promotion;
        this.ItemType = ItemType.Model;
        this.Variant = data.variant_id;
        this.Faction = data.faction_id;

        // Stats
        this.Movement = data.movement;
        this.Melee = data.melee;
        this.Ranged = data.ranged;
        this.Armour = data.armour;
        this.Base = data.base;
        //

        if (data.team) {
            this.Team = data.team;
        } else {
            this.Team = "none"
        }

        this.Blurb = DescriptionFactory(data.blurb);
        this.Equipment = DescriptionFactory(data.equipment);
        this.Abilities = DescriptionFactory(data.abilities);
        this.EventTags = data.eventtags
    }
    
    /**
     * When destroyed, also delete all associated
     * addon objects.
     */
    destructor() {
        let i = 0;
        for (i = 0; i < this.Equipment.length; i++) {
            delete this.Equipment[i];
        }
        for (i = 0; i < this.Abilities.length; i++) {
            delete this.Abilities[i];
        }
    }

    public returnBase() {
        let str = "";
        let i = 0;
        for (i = 0; i < this.Base.length; i++) {
            if (i !== 0) { str += "x" }
            str += this.Base[i]
        }
        str += "mm"
        return str;
    }

    public returnMovement() {
        let str = "";
        let i = 0;
        for (i = 0; i < this.Movement.length; i++) {
            if (i !== 0) {str += " "}
            str += this.Movement[i] + "\""
        }
        if (this.EventTags["flying"]) {
            str += " Flying"
        }
        return str;
    }

    public returnArmour() {
        let str = "";
        let i = 0;
        for (i = 0; i < this.Armour.length; i++) {
            if (i !== 0) {str += ", "}
            str += this.Armour[i]
        }
        return str;
    }

    public returnMelee() {
        let str = "";
        let i = 0;
        for (i = 0; i < this.Melee.length; i++) {
            if (i !== 0) {str += ", "}
            str += this.Melee[i] + " Dice"
        }
        if (str === '') {
            str = "N/A"
        }
        return str;
    }

    public returnRanged() {
        let str = "";
        let i = 0;
        for (i = 0; i < this.Ranged.length; i++) {
            if (i !== 0) {str += ", "}
            str += this.Ranged[i] + " Dice"
        }
        if (str === '') {
            str = "N/A"
        }
        return str;
    }
}

export {IPlayerModel, PlayerModel}

