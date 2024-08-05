import { ItemType } from './Enum'

/**
 * Basic data package for any TrenchCrusade Item
 */
interface ITrenchCrusadeItemData {
    id: string, // The id of the item
    type: string, // The type of the item (model, addon, summon, talent, relic, etc)
    name: string, // The name of the item
    source: string, // The source of the item (core book, homebrew, etc)
    tags: ITrenchCrusadeItemTag[] // Tags associated with that item (used for sorting and synergies)
}

/**
 * Basic item tag
 */
interface ITrenchCrusadeItemTag {
    tag_name: any, // The name of the tag
    val: any // The value of the tag
}

abstract class TrenchCrusadeItem {
    public ItemType;
    public readonly Source;
    public readonly ID;
    public readonly Tags;
    public readonly Name;

    /**
     * Assigns data values to the parameters of the item
     * @param data The item data
     */
    public constructor(data?: ITrenchCrusadeItemData)
    {
        this.ItemType = ItemType.None
        if (data) {
            this.ID = data.id;
            this.Source = data.source;
            this.Name = data.name;
            this.Tags = data.tags;
            this.ItemType = data.type;
        }

    }
}

export {ITrenchCrusadeItemData, TrenchCrusadeItem, ITrenchCrusadeItemTag}