import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import { DescriptionFactory } from '../../../utility/functions'


/**
 * Data structure for a model's abilities and other addons
 */
interface IPlayerAddon extends ITrenchCrusadeItemData {
    faction_id: string,
    description: []
}

/**
 * Subtype of item which describes an ability/action that a model
 * can take.
 */
class PlayerAddon extends TrenchCrusadeItem {
    public readonly Faction;
    public readonly Description;

    public constructor(data: IPlayerAddon)
    {
        super(data)
        this.ItemType = ItemType.Addon;
        this.Faction = data.faction_id;
        this.Description = DescriptionFactory(data.description);
    }

}

export {IPlayerAddon, PlayerAddon}

