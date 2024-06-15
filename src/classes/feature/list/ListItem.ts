import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import {ModelDescription} from '../models/ModelDescription'

interface IListItem extends ITrenchCrusadeItemData {
   roll_start : number | string,
   roll_end : number | string,
   description: []
}

class ListItem extends TrenchCrusadeItem {
    public readonly RollStart;
    public readonly RollEnd;
    public readonly Description;
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerModel format
     */
    public constructor(data: IListItem)
    {
        super(data)
        this.ItemType = ItemType.Injury;
        this.RollStart = data.roll_start;
        this.RollEnd = data.roll_end;
        
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

export {IListItem, ListItem}

