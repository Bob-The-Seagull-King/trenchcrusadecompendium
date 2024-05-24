import {ItemType} from './Enum'
import {getTagValue} from '../utility/functions'

/**
 * Data structure for the description section
 */
interface IDescriptionItemData {
    tags: [],
    content?: string,
    subcontent?: []
}

class DescriptionItem {
    public readonly Content;
    public readonly Tags;

    /**
     * Assigns parameter values and triggers the creation of
     * further DescriptionItems for any subcontent
     * @param data The data in IDescriptionItemData format
     */
    public constructor(data?: IDescriptionItemData)
    {
        if (data) {
            this.Tags = data.tags;
            this.Content = data.content || "";
        }

    }

    /**
     * Creates DescriptionItem instances of all members
     * of the subcontent array.
     * @param data The array of subcontent IDescriptionItemData entries
     * @returns Array of DescriptionItems
     */
    SubConstructor(data?: []) {
        const sublist: DescriptionItem[] = []
        if (data) {
            let i = 0;
            for (i = 0; i < data.length; i++) {
                const tempDI = new DescriptionItem(data[i])
                sublist.push(tempDI);
            }
            return sublist;
        } else {
            return sublist;
        }
    }
}

export {IDescriptionItemData, DescriptionItem}