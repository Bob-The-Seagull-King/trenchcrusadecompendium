import {IDescriptionItemData, DescriptionItem} from '../../DescriptionItem'

/**
 * Interface for an ability description item
 */
interface IAbilityDescription extends IDescriptionItemData {
    glossary?: [] // The glossary of a given description item
}

class AbilityDescription extends DescriptionItem {
    public readonly Glossary;
    public SubContent;

    /**
     * Assign parameter values
     * @param data The data in IAbilityDescription format
     */
    public constructor(data: IAbilityDescription)
    {
        super (data)
        this.Glossary = data.glossary;
        this.SubContent = this.AbilitySubConstructor(data.subcontent)
    }
    

    /**
     * Deconstructs the description JSON object into an
     * array of AbilityDescription objects.
     * @param data The description array
     * @returns Array of DescriptionItems
     */
    AbilitySubConstructor(data?: []) {
        const sublist: AbilityDescription[] = []
        if (data) {
            let i = 0;
            for (i = 0; i < data.length; i++) {
                const tempDI = new AbilityDescription(data[i])
                sublist.push(tempDI);
            }
            return sublist;
        } else {
            return sublist;
        }
    }
}

export {IAbilityDescription, AbilityDescription}