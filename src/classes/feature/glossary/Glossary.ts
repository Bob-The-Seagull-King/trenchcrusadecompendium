import {IIconpendiumItemData, IconpendiumItem} from '../../IconpendiumItem'
import {ItemType} from '../../Enum'
import {IAbilityDescription, AbilityDescription} from '../abilities/AbilityDescription'

interface IGlossaryRule extends IIconpendiumItemData {
    description: []
}

class GlossaryRule extends IconpendiumItem {
    public readonly Description;
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerAbility format
     */
    public constructor(data: IGlossaryRule)
    {
        super(data)
        this.ItemType = ItemType.GlossaryRule;
        this.Description = this.DescriptionFactory(data.description);
    }

    /**
     * Translates the description JSON objects into a collection
     * of AbilityDescription objects
     * @param data The array of description data objects
     * @returns Array of AbilityDescription objects
     */
    private DescriptionFactory(data: []) {
        let i = 0;
        const array: AbilityDescription[] = []
        for (i = 0; i < data.length; i++) {
            const tempAD = new AbilityDescription(data[i])
            array.push(tempAD)
        }
        return array;
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

