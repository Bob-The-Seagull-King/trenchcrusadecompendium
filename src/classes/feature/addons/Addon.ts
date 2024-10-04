import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import { DescriptionFactory } from '../../../utility/functions'
import { FactionFactory } from '../../../factories/features/FactionFactory';

/**
 * Data structure for a model's abilities and other addons
 */
interface IPlayerAddon extends ITrenchCrusadeItemData {
    faction_id: string,
    eventtags : {[_name : string] : any},
    description: []
}

/**
 * Subtype of item which describes an ability/action that a model
 * can take.
 */
class PlayerAddon extends TrenchCrusadeItem {
    public readonly Faction;
    public readonly Description;
    public readonly EventTags;
    public readonly Team;

    public constructor(data: IPlayerAddon, _team : string)
    {
        super(data)
        this.ItemType = ItemType.Addon;
        this.Faction = data.faction_id;
        this.EventTags = data.eventtags
        this.Team = _team
        this.Description = DescriptionFactory(data.description);
    }
}

export {IPlayerAddon, PlayerAddon}

