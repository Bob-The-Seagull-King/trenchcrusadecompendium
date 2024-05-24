
import {IAbilityDescription, AbilityDescription} from '../../classes/feature/abilities/AbilityDescription'
import {IAddonParent, IPlayerAddon, PlayerAddon} from '../../classes/feature/addons/Addon'

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

}

export {AddonFactory}