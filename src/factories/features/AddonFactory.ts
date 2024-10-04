import { Requester } from '../Requester';
import {IPlayerAddon, PlayerAddon} from '../../classes/feature/addons/Addon'

class AddonFactory {

    /**
     * Creates a PlayerAddon object
     * @param _addon Data on the addon to be sent to the constructor
     * @returns The addon that was created
     */
    static CreateAddon(_addon: IPlayerAddon, _team : string) {
        const addon = new PlayerAddon(_addon, _team)
        return addon;
    }

    static CreateNewAddon(_val : string, _team : string) {
        const addondata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "addons", id: _val}}) as IPlayerAddon
        const addonNew = AddonFactory.CreateAddon(addondata, _team)
        return addonNew;
    }

}

export {AddonFactory}