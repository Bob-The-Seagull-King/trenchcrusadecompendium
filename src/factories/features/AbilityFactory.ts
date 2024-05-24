import {IPlayerAddon} from '../../classes/feature/addons/Addon'
import {IPlayerAbility, PlayerAbility} from '../../classes/feature/abilities/Ability'
import {AddonFactory} from './AddonFactory'
import { Requester } from '../Requester'

class AbilityFactory {

    /**
     * Creates an ability based on provided data
     * @param _ability The data in IPlayerAbility format describing the ability
     * @returns A newly created ability
     */
    static CreateAbility(_ability: IPlayerAbility) {
        const ability = new PlayerAbility(_ability)

        // Create a number of addon objects for each addon associated with an ability
        let i = 0;
        for (i = 0; i < ability.Attachments.length; i++) {
            if (ability.Attachments[i]["tag_name"] == "addons") {
                const addondata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "addons", id: ability.Attachments[i]["val"]}}) as IPlayerAddon
                const addonNew = AddonFactory.CreateAddon(addondata)
                ability.AddAddons(addonNew)
            }
        }

        return ability;
    }

}

export {AbilityFactory}