
import {IModelDescription, ModelDescription} from '../../classes/feature/models/ModelDescription'
import { IScenario, Scenario } from '../../classes/feature/scenarios/Scenario';

class ScenarioFactory {

    /**
     * Creates a PlayerAddon object
     * @param _addon Data on the addon to be sent to the constructor
     * @returns The addon that was created
     */
    static CreateFactory(_addon: IScenario) {
        const addon = new Scenario(_addon)
        return addon;
    }

}

export {ScenarioFactory}