import { Requester } from '../Requester';
import {IPlayerAddon, PlayerAddon} from '../../classes/feature/addons/Addon'

class AddonFactory {

    /**
     * Creates a PlayerAddon object
     * @param _addon Data on the addon to be sent to the constructor
     * @returns The addon that was created
     */
    static CreateAddon(_addon: IPlayerAddon) {
        const addon = new PlayerAddon(_addon)
        return addon;
    }

    static CreateNewAddon(_val : string) {
        const addondata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "addons", id: _val}}) as IPlayerAddon
        const addonNew = AddonFactory.CreateAddon(addondata)
        return addonNew;
    }

}

export {AddonFactory}