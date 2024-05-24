import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import {ModelDescription} from './ModelDescription'
import { PlayerAddon } from '../addons/Addon'

interface IPlayerModel extends ITrenchCrusadeItemData {
    chapter: number, // Chapter of the model
    class_id: string, // Class of the model (determined by job)
    job_id: string, // Job of the model
    attachments: [], // List of addons, summons, etc featured in an model
    blurb: string, // Flavour text
    description: [] // Mechanical description of the item
}

class PlayerModel extends TrenchCrusadeItem {
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
     * @param data Object data in IPlayerModel format
     */
    public constructor(data: IPlayerModel)
    {
        super(data)
        this.ItemType = ItemType.Model;
        this.Chapter = data.chapter;
        this.Class = data.class_id;
        this.Job = data.job_id;
        this.Attachments = data.attachments;
        this.Blurb = data.blurb;
        this.Description = this.DescriptionFactory(data.description);
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
        for (i = 0; i < this.Description.length; i++) {
            delete this.Description[i];
        }
    }

}

export {IPlayerModel, PlayerModel}

