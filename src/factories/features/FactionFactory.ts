import { Requester } from '../Requester';
import { IPlayerFaction, PlayerFaction } from '../../classes/feature/factions/Faction';

class FactionFactory {

    /**
     * Creates a PlayerAddon object
     * @param _addon Data on the addon to be sent to the constructor
     * @returns The addon that was created
     */
    static CreateFactory(_addon: IPlayerFaction) {
        const addon = new PlayerFaction(_addon)
        return addon;
    }
    
    static CreateNewFaction(_val : string) {
        const addondata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "factions", id: _val}}) as IPlayerFaction
        const addonNew = FactionFactory.CreateFactory(addondata)
        return addonNew;
    }

}

export {FactionFactory}