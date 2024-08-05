import { IDescriptionItemData, DescriptionItem } from './DescriptionItem'

/**
 * Interface for an model description item
 */
interface IAdvancedDescription extends IDescriptionItemData {
    glossary?: [] // The glossary of a given description item
}

/**
 * Description containing text, glossary terms, subcontent,
 * and a clarification on the way to render the text.
 */
class AdvancedDescription extends DescriptionItem {
    public readonly Glossary;
    public SubContent;

    /**
     * Assign parameter values
     * @param data The data in IAdvancedDescription format
     */
    public constructor(data: IAdvancedDescription)
    {
        super (data)
        this.Glossary = data.glossary;
        this.SubContent = this.ModelSubConstructor(data.subcontent)
    }

    /**
     * Deconstructs the description JSON object into an
     * array of ModelDescription objects.
     * @param data The description array
     * @returns Array of DescriptionItems
     */
    ModelSubConstructor(data?: []) {
        const sublist: AdvancedDescription[] = []
        try {
        if (data) {
            let i = 0;
            for (i = 0; i < data.length; i++) {
                const tempDI = new AdvancedDescription(data[i])
                sublist.push(tempDI);
            }
            return sublist;
        } else {
            return sublist;
        }
        } catch (e) {
            const emergencylist: AdvancedDescription[] = []
            return emergencylist;
        }
    }
}

export {IAdvancedDescription, AdvancedDescription}