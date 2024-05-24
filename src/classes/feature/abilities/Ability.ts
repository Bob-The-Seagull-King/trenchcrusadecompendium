import {IIconpendiumItemData, IconpendiumItem} from '../../IconpendiumItem'
import {ItemType} from '../../Enum'
import {AbilityDescription} from './AbilityDescription'
import { PlayerAddon } from '../addons/Addon'

interface IPlayerAbility extends IIconpendiumItemData {
    chapter: number, // Chapter of the ability
    class_id: string, // Class of the ability (determined by job)
    job_id: string, // Job of the ability
    attachments: [], // List of addons, summons, etc featured in an ability
    blurb: string, // Flavour text
    description: [] // Mechanical description of the item
}

class PlayerAbility extends IconpendiumItem {
    public readonly Chapter;
    public readonly Class;
    public readonly Job;
    public readonly Attachments;
    public readonly Blurb;
    public readonly Description;
    public Addons: PlayerAddon[] = [];
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerAbility format
     */
    public constructor(data: IPlayerAbility)
    {
        super(data)
        this.ItemType = ItemType.Ability;
        this.Chapter = data.chapter;
        this.Class = data.class_id;
        this.Job = data.job_id;
        this.Attachments = data.attachments;
        this.Blurb = data.blurb;
        this.Description = this.DescriptionFactory(data.description);
    }

    /**
     * Translates the description JSON objects into a collection
     * of AbilityDescription objects
     * @param data The array of description data objects
     * @returns Array of AbilityDescription objects
     */
    private DescriptionFactory(data: []) {
        let i = 0;
        const array: AbilityDescription[] = []
        for (i = 0; i < data.length; i++) {
            const tempAD = new AbilityDescription(data[i])
            array.push(tempAD)
        }
        return array;
    }
    
    /**
     * Add an addon to the ability
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
        for (i = 0; i < this.Description.length; i++) {
            delete this.Description[i];
        }
    }

}

export {IPlayerAbility, PlayerAbility}

