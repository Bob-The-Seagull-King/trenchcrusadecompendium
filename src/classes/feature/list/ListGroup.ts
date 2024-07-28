import { ITrenchCrusadeItemData, TrenchCrusadeItem } from '../../TrenchCrusadeItem'
import { ItemType } from '../../Enum'
import { IListItem, ListItem } from './ListItem'
import { Requester } from '../../../factories/Requester'
import { DescriptionFactory } from '../../../utility/functions'

/**
 * Structure of a group of List Items
 */
interface IListGroup extends ITrenchCrusadeItemData {
    list_items : IListSet[],
    listtype: string,
    description: []
}

/**
 * Structure of a single list item in the context
 * of a particular List
 */
interface IListSet {
    id: string,
    roll_start : number | string,
    roll_end : number | string,
}

/**
 * Structure of a list item without a roll range
 */
interface IItemPartial extends ITrenchCrusadeItemData {
    description : []
}

/**
 * Group of descriptions for items in a list, such as
 * a table of injuries or skills.
 */
class ListGroup extends TrenchCrusadeItem {
    public readonly ListItems;
    public readonly Type;
    public readonly Description;
    
    public constructor(data: IListGroup)
    {
        super(data)
        this.ItemType = ItemType.ListGroup;
        
        this.Type = data.listtype;
        this.ListItems = this.ListFactory(data.list_items);
        this.Description = DescriptionFactory(data.description)
    }

    /**
     * Converts information on what the list contains to
     * an array of List Items.
     * @param data Array of list item descriptions
     * @returns Array of ListItem objects
     */
    private ListFactory(data : IListSet[]) {
        const tempItems : ListItem[] = [];

        let i = 0;
        for (i = 0; i < data.length ; i ++) {
            const id_find : IItemPartial = (Requester.MakeRequest({searchtype: "id", searchparam: {type: this.Type, id: data[i].id}}))
            const temp : IListItem = {
                id: id_find.id,
                type: ItemType.Skill,
                name: id_find.name,
                source: id_find.source,
                tags: id_find.tags,
                roll_start : data[i].roll_start,
                roll_end : data[i].roll_end,
                description: id_find.description
                }
            
            const ItemTemp = new ListItem(temp);
            tempItems.push(ItemTemp);
        }

        return tempItems;
    }

}

export {IListSet, IListGroup, ListGroup, IItemPartial}

