import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import {IModelDescription, ModelDescription} from '../models/ModelDescription'

interface IGlossaryRule extends ITrenchCrusadeItemData {
    description: []
}

class GlossaryRule extends TrenchCrusadeItem {
    public readonly Description;
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerModel format
     */
    public constructor(data: IGlossaryRule)
    {
        super(data)
        this.ItemType = ItemType.GlossaryRule;
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
    
    /**
     * When destroyed, also delete all associated
     * addon objects.
     */
    destructor() {
        let i = 0;
        for (i = 0; i < this.Description.length; i++) {
            delete this.Description[i];
        }
    }

}

export {IGlossaryRule, GlossaryRule}

