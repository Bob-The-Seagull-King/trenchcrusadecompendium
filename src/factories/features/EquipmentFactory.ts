
import {IModelDescription, ModelDescription} from '../../classes/feature/models/ModelDescription'
import { IPlayerEquipment, PlayerEquipment } from '../../classes/feature/equipment/Equipment';

class EquipmentFactory {

    /**
     * Creates a PlayerAddon object
     * @param _addon Data on the addon to be sent to the constructor
     * @returns The addon that was created
     */
    static CreateFactory(_addon: IPlayerEquipment) {
        const addon = new PlayerEquipment(_addon)
        return addon;
    }

}

export {EquipmentFactory}