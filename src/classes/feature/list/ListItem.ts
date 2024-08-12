import { ITrenchCrusadeItemData, TrenchCrusadeItem } from '../../TrenchCrusadeItem'
import { ItemType } from '../../Enum'
import { DescriptionFactory } from '../../../utility/functions';
import { IDescriptionItemData } from '../../../classes/DescriptionItem';

/**
 * Structure of a roll-based list item
 */
interface IListItem extends ITrenchCrusadeItemData {
   roll_start : number | string,
   roll_end : number | string,
   description: IDescriptionItemData[],
   eventtags : {[_name : string] : any}
}

/**
 * Object descripting item available on a table to
 * roll on - ie Injuries or Skills
 */
class ListItem extends TrenchCrusadeItem {
    public readonly RollStart;
    public readonly RollEnd;
    public readonly Description;
    
    public constructor(data: IListItem)
    {
        super(data)
        this.ItemType = ItemType.Injury;
        this.RollStart = data.roll_start;
        this.RollEnd = data.roll_end;
        
        this.Description = DescriptionFactory(data.description);
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

