import {IPlayerAddon} from '../../classes/feature/addons/Addon'
import {IPlayerModel, PlayerModel} from '../../classes/feature/models/Model'
import {AddonFactory} from './AddonFactory'
import { Requester } from '../Requester'

class ModelFactory {

    /**
     * Creates an model based on provided data
     * @param _model The data in IPlayerModel format describing the model
     * @returns A newly created model
     */
    static CreateModel(_model: IPlayerModel) {
        console.log(_model);
        const model = new PlayerModel(_model)

        // Create a number of addon objects for each addon associated with an model
        let i = 0;
        for (i = 0; i < model.Attachments.length; i++) {
            if (model.Attachments[i]["tag_name"] == "addons") {
                const addondata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "addons", id: model.Attachments[i]["val"]}}) as IPlayerAddon
                const addonNew = AddonFactory.CreateAddon(addondata)
                model.AddAddons(addonNew)
            }
        }

        return model;
    }

}

export {ModelFactory}