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

}

export {FactionFactory}