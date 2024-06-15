import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import {ModelDescription} from '../models/ModelDescription'

interface IPlayerEquipment extends ITrenchCrusadeItemData {
    category: string,
    name: string,
    equip_type: string | null,
    range: string | null,
    modifiers: string[],
    blurb: string, // Flavour text
    description: [] // Mechanical description of the item
}

class PlayerEquipment extends TrenchCrusadeItem {
    public readonly Category;
    public readonly Name;
    public readonly EquipType;
    public readonly Range;
    public readonly Modifiers;
    public readonly Blurb;
    public readonly Description;
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerModel format
     */
    public constructor(data: IPlayerEquipment)
    {
        super(data)
        this.ItemType = ItemType.Equipment;
        this.Category = data.category;
        this.Name = data.name;
        this.Range = data.range;
        this.EquipType = data.equip_type;
        this.Modifiers = data.modifiers;
        this.Blurb = data.blurb;

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

}

export {IPlayerEquipment, PlayerEquipment}

