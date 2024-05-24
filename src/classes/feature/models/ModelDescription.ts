import {IDescriptionItemData, DescriptionItem} from '../../DescriptionItem'

/**
 * Interface for an model description item
 */
interface IModelDescription extends IDescriptionItemData {
    glossary?: [] // The glossary of a given description item
}

class ModelDescription extends DescriptionItem {
    public readonly Glossary;
    public SubContent;

    /**
     * Assign parameter values
     * @param data The data in IModelDescription format
     */
    public constructor(data: IModelDescription)
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
        const sublist: ModelDescription[] = []
        if (data) {
            let i = 0;
            for (i = 0; i < data.length; i++) {
                const tempDI = new ModelDescription(data[i])
                sublist.push(tempDI);
            }
            return sublist;
        } else {
            return sublist;
        }
    }
}

export {IModelDescription, ModelDescription}