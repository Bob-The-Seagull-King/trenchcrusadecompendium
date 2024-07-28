import { ITrenchCrusadeItemData } from '../../TrenchCrusadeItem'
import { IEquipmentFactionList } from './FactionEquip'
import { IFactionRuleset } from './FactionRule'
import { IModelFactionList } from './FactionModel'

/**
 * Structure representing a variant of an existing
 * faction with information placed over the main faction.
 */
interface IPlayerFactionVariant extends ITrenchCrusadeItemData {
    faction_id : string,
    name : string,
    flavour: [],
    rules: IFactionRuleset[],
    equipment: IEquipmentFactionList[],
    models: IModelFactionList[],
    removed_rules : string[],
    removed_equip : string[],
    removed_model : string[],
    team?: string
}

export {IPlayerFactionVariant}