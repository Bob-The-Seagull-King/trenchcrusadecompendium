import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import {IModelDescription, ModelDescription} from '../models/ModelDescription'

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
interface IPlayerAddon extends ITrenchCrusadeItemData {
    faction_id: string,
    description: []
}

class PlayerAddon extends TrenchCrusadeItem {
    public readonly Faction;
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
        this.Faction = data.faction_id;
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
        try {
        for (i = 0; i < data.length; i++) {
            const tempAD = new ModelDescription(data[i])
            array.push(tempAD)
        }
        return array;
        } catch (e) {
            
            const emergencyarray: ModelDescription[] = []
            return emergencyarray;
        }
    }

}

export {IAddonParent, IPlayerAddon, PlayerAddon}

