
import {IModelDescription, ModelDescription} from '../../classes/feature/models/ModelDescription'
import { IPlayerFaction, PlayerFaction } from '../../classes/feature/factions/Faction';
import { IPlayerFactionVariant } from '../../classes/feature/factions/FactionVariant';
import { Requester } from '../../factories/Requester';
import { IEquipmentFactionList } from '../../classes/feature/factions/FactionEquip'
import { IFactionRuleset } from '../../classes/feature/factions/FactionRule'
import { IModelFactionList } from '../../classes/feature/factions/FactionModel';
import { FactionFactory } from './FactionFactory';

class FactionVariantFactory {

    /**
     * Creates a PlayerAddon object
     * @param _addon Data on the addon to be sent to the constructor
     * @returns The addon that was created
     */
    static CreateFactory(_addon: IPlayerFactionVariant) {
        const baseFaction : IPlayerFaction = FactionVariantFactory.GetBaseFaction(_addon.faction_id)
        
        const ruleSet : IFactionRuleset[] = FactionVariantFactory.ModifyRules(_addon, baseFaction);
        const equipSet : IEquipmentFactionList[] = FactionVariantFactory.ModifyEquipment(_addon, baseFaction);
        const modelSet : IModelFactionList[] = FactionVariantFactory.ModifyModels(_addon, baseFaction);

        const variantFaction : IPlayerFaction = {
                id: _addon.id, // The id of the item
                type: _addon.type, // The type of the item (model, addon, summon, talent, relic, etc)
                source: _addon.source, // The source of the item (core book, homebrew, etc)
                tags: _addon.tags, // Tags associated with that item (used for sorting and synergies)
                flavour: _addon.flavour,
                rules: ruleSet,
                name: "Variant: " + _addon.name,
                equipment: equipSet,
                models: modelSet
            }

        const VarFaction = FactionFactory.CreateFactory(variantFaction);
        return VarFaction;
    }

    static ModifyRules(data: IPlayerFactionVariant, base: IPlayerFaction) {
        const ruleList : IFactionRuleset[] = []

        let i = 0;
        for (i = 0 ; i < base.rules.length; i++) {
            if (!(data.removed_rules.includes( base.rules[i].title ))) {
                ruleList.push(base.rules[i])
            }
        }

        for (i = 0 ; i < data.rules.length ; i ++) {
            ruleList.push(data.rules[i])
        }

        return ruleList;
    }

    static ModifyEquipment(data: IPlayerFactionVariant, base: IPlayerFaction) {
        const equipList : IEquipmentFactionList[] = []

        let i = 0;
        for (i = 0 ; i < base.equipment.length; i++) {
            if (!(data.removed_equip.includes( base.equipment[i].id ))) {
                equipList.push(base.equipment[i])
            }
        }

        for (i = 0 ; i < data.equipment.length ; i ++) {
            equipList.push(data.equipment[i])
        }

        return equipList;
    }

    static ModifyModels(data: IPlayerFactionVariant, base: IPlayerFaction) {
        const modelList : IModelFactionList[] = []

        let i = 0;
        for (i = 0 ; i < base.models.length; i++) {
            if (!(data.removed_model.includes( base.models[i].id ))) {
                modelList.push(base.models[i])
            }
        }

        for (i = 0 ; i < data.models.length ; i ++) {
            modelList.push(data.models[i])
        }

        return modelList;
    }

    static GetBaseFaction(faction_id : string) {
        return Requester.MakeRequest({searchtype: "id", searchparam: {type: 'faction', id: faction_id}})
    }

}

export {FactionVariantFactory}