import {IPlayerModel, PlayerModel} from '../../classes/feature/models/Model'

class ModelFactory {

    /**
     * Creates an model based on provided data
     * @param _model The data in IPlayerModel format describing the model
     * @returns A newly created model
     */
    static CreateModel(_model: IPlayerModel) {
        const model = new PlayerModel(_model)

        return model;
    }

}

export {ModelFactory}