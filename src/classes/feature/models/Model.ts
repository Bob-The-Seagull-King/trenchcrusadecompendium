import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import {ModelDescription} from './ModelDescription'
import { PlayerAddon } from '../addons/Addon'

interface IPlayerModel extends ITrenchCrusadeItemData {
    movement: string,
    ranged: string,
    melee: string,
    armour: string,
    base: string,
    faction_id: string, // Faction of the model
    variant_id: string,
    attachments: [], // List of addons, summons, etc featured in an model
    blurb: string, // Flavour text
    equipment: [], // Mechanical description of the item
    abilities: [] // Mechanical description of the item
}

class PlayerModel extends TrenchCrusadeItem {
    public readonly Movement;
    public readonly Ranged;
    public readonly Melee;
    public readonly Armour;
    public readonly Base;
    
    public readonly Faction;
    public readonly Variant;
    public readonly Attachments;
    public readonly Blurb;
    public readonly Equipment;
    public readonly Abilities;

    public Addons: PlayerAddon[] = [];
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerModel format
     */
    public constructor(data: IPlayerModel)
    {
        super(data)
        this.ItemType = ItemType.Model;
        this.Variant = data.variant_id;
        this.Faction = data.faction_id;
        this.Attachments = data.attachments;
        this.Blurb = data.blurb;

        // Stats
        this.Movement = data.movement;
        this.Melee = data.melee;
        this.Ranged = data.ranged;
        this.Armour = data.armour;
        this.Base = data.base;
        //

        this.Equipment = this.DescriptionFactory(data.equipment);
        this.Abilities = this.DescriptionFactory(data.abilities);
    }

    /**
     * Translates the description JSON objects into a collection
     * of ModelDescription objects
     * @param data The array of description data objects
     * @returns Array of ModelDescription objects
     */
    private DescriptionFactory(data: []) {
        let i = 0;
        const array: ModelDescription[] = []
        for (i = 0; i < data.length; i++) {
            const tempAD = new ModelDescription(data[i])
            array.push(tempAD)
        }
        return array;
    }
    
    /**
     * Add an addon to the model
     * @param list the PlayerAddon being created
     */
    public AddAddons(list: PlayerAddon) {
        this.Addons.push(list);
    }
    
    /**
     * When destroyed, also delete all associated
     * addon objects.
     */
    destructor() {
        let i = 0;
        for (i = 0; i < this.Addons.length; i++) {
            delete this.Addons[i];
        }
        for (i = 0; i < this.Equipment.length; i++) {
            delete this.Equipment[i];
        }
        for (i = 0; i < this.Abilities.length; i++) {
            delete this.Abilities[i];
        }
    }

}

export {IPlayerModel, PlayerModel}

