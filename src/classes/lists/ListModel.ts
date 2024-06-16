import { PlayerModel } from "../feature/models/Model"
import { ModelFactory } from "../../factories/features/ModelFactory"
import { Requester } from "../../factories/Requester"

interface IListModel {
    id: string,
    cost: number,
    cost_type: string
}

class ListModel {
    public readonly ID;
    public readonly Cost;
    public readonly CostType;
    public Object : PlayerModel;

    public constructor(data: IListModel) {
        this.ID = data.id;
        this.Cost = data.cost;
        this.CostType = data.cost_type;

        this.Object = ModelFactory.CreateModel((Requester.MakeRequest({searchtype: "id", searchparam: {type: 'models', id: this.ID}})));
    }

}

export {IListModel,ListModel}