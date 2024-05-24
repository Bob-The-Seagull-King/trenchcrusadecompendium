import {IIconpendiumItemData, IconpendiumItem} from '../../IconpendiumItem'
import {ItemType} from '../../Enum'
import {IAbilityDescription, AbilityDescription} from '../abilities/AbilityDescription'

/**
 * Data structure for an addon's parent
 */
interface IAddonParent {
    type: string,
    id: string
}

/**
 * Data structure for the player addon's
 */
interface IPlayerAddon extends IIconpendiumItemData {
    class_id: string,
    job_id: string,
    parent: IAddonParent,
    description: []
}

class PlayerAddon extends IconpendiumItem {
    public readonly Class;
    public readonly Job;
    public readonly Parent;
    public readonly Description;

    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerAddon format
     */
    public constructor(data: IPlayerAddon)
    {
        super(data)
        this.ItemType = ItemType.Addon;
        this.Class = data.class_id;
        this.Job = data.job_id;
        this.Parent = data.parent;
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

}

export {IAddonParent, IPlayerAddon, PlayerAddon}

