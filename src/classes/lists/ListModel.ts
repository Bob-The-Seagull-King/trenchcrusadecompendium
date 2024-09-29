import { PlayerModel } from "../feature/models/Model"
import { ModelFactory } from "../../factories/features/ModelFactory"
import { Requester } from "../../factories/Requester"

/**
 * Structure of a warband member model
 */
interface IListModel {
    id: string,
    cost: number,
    cost_type: string
}

/**
 * Object reflecting the model used by
 * a warband member, and how much that
 * member cost
 */
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

    public converttointerface() {
        const obj_inter : IListModel = {
            id: this.ID,
            cost: this.Cost,
            cost_type : this.CostType
        }

        return obj_inter;
    }

}

export {IListModel,ListModel}