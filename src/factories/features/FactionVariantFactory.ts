import { IPlayerFaction } from '../../classes/feature/factions/Faction';
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
    static CreateFactory(_addon: IPlayerFactionVariant,_faction : string) {
        const baseFaction : IPlayerFaction = FactionVariantFactory.GetBaseFaction(_addon.faction_id)
        
        const ruleSet : IFactionRuleset[] = FactionVariantFactory.ModifyRules(_addon, baseFaction);
        const equipSet : IEquipmentFactionList[] = FactionVariantFactory.ModifyEquipment(_addon, baseFaction);
        const modelSet : IModelFactionList[] = FactionVariantFactory.ModifyModels(_addon, baseFaction);

        let teamval = "";
        if (_addon.team) {
            teamval = _addon.team;
        } else {
            teamval = baseFaction.team? baseFaction.team : "none"
        }

        const variantFaction : IPlayerFaction = {
                id: _addon.id, // The id of the item
                type: _addon.type, // The type of the item (model, addon, summon, talent, relic, etc)
                source: _addon.source, // The source of the item (core book, homebrew, etc)
                tags: _addon.tags, // Tags associated with that item (used for sorting and synergies)
                flavour: _addon.flavour,
                rules: ruleSet,
                name:  "(" + _faction + " Variant) " + _addon.name,
                equipment: equipSet,
                models: modelSet,
                team: teamval
            }

        const VarFaction = FactionFactory.CreateFactory(variantFaction);
        return VarFaction;
    }

    /**
     * Takes the base faction, removes any rules specified
     * by the variant, then add any of the variant's new rules.
     * @param data The variant's data
     * @param base The base faction
     * @returns New list of rules
     */
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

    /**
     * Takes the base faction, removes any equipment specified
     * by the variant, then add any of the variant's new equipment.
     * @param data The variant's data
     * @param base The base faction
     * @returns New list of equipment
     */
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

    /**
     * Takes the base faction, removes any moodels specified
     * by the variant, then add any of the variant's new moodels.
     * @param data The variant's data
     * @param base The base faction
     * @returns New list of moodels
     */
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

    /**
     * Gets the faction that the new faction is a variant of
     * @param faction_id The ID of the base faction
     * @returns The faction's data
     */
    static GetBaseFaction(faction_id : string) {
        return Requester.MakeRequest({searchtype: "id", searchparam: {type: 'faction', id: faction_id}})
    }

}

export {FactionVariantFactory}