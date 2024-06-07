import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import {ModelDescription} from '../models/ModelDescription'
import { IListItem, ListItem} from './ListItem'
import { Requester } from '../../../factories/Requester'

interface IListGroup extends ITrenchCrusadeItemData {
    list_items : IListSet[],
    listtype: string,
    description: []
}

interface IListSet {
    id: string,
    roll_start : number | string,
    roll_end : number | string,
}

interface IItemPartial extends ITrenchCrusadeItemData {
    description : []
}

class ListGroup extends TrenchCrusadeItem {
    public readonly ListItems;
    public readonly Type;
    public readonly Description;
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerModel format
     */
    public constructor(data: IListGroup)
    {
        super(data)
        this.ItemType = ItemType.ListGroup;
        
        this.Type = data.listtype;
        this.ListItems = this.ListFactory(data.list_items);
        this.Description = this.DescriptionFactory(data.description)
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

