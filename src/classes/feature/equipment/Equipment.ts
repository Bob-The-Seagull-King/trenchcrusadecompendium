import { ITrenchCrusadeItemData, TrenchCrusadeItem } from '../../TrenchCrusadeItem'
import { ItemType } from '../../Enum'
import { DescriptionFactory } from '../../../utility/functions';

/**
 * Structure of equipment item. Information is faction
 * and model neutral.
 */
interface IPlayerEquipment extends ITrenchCrusadeItemData {
    category: string,
    name: string,
    equip_type: string | null,
    range: string | null,
    modifiers: string[],
    blurb: string,
    eventtags : {[_name : string] : any},
    description: []
}

/**
 * Piece of equipment. Created without the context of
 * a particular faction, variant, or model.
 */
class PlayerEquipment extends TrenchCrusadeItem {
    public readonly Category;
    public readonly Name;
    public readonly EquipType;
    public readonly Range;
    public readonly Modifiers;
    public readonly Blurb;
    public readonly Description;
    public readonly EventTags
    
    public constructor(data: IPlayerEquipment)
    {
        super(data)
        this.ItemType = ItemType.Equipment;
        this.Category = data.category;
        this.Name = data.name;
        this.Range = data.range;
        this.EventTags = data.eventtags;
        this.EquipType = data.equip_type;
        this.Modifiers = data.modifiers;
        this.Blurb = data.blurb;

        this.Description = DescriptionFactory(data.description);
    }
}

export {IPlayerEquipment, PlayerEquipment}

