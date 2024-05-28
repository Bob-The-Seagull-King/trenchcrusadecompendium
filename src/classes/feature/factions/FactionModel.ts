import { Requester } from "../../../factories/Requester"
import { PlayerModel } from "../models/Model";
import { ModelFactory } from "../../../factories/features/ModelFactory";

interface IModelFactionList {
    id: string,
    cost: number,
    cost_id: string,
    limit_min: number,
    limit_max: number
}

class FactionModel {
    public readonly ID;
    public readonly Cost;
    public readonly CostID;
    public readonly LimitMin;
    public readonly LimitMax;
    public readonly Object : PlayerModel;

    public constructor(data: IModelFactionList) {
        this.ID = data.id;
        this.Cost = data.cost;
        this.CostID = data.cost_id;
        this.LimitMin = data.limit_min;
        this.LimitMax = data.limit_max;

        this.Object = ModelFactory.CreateModel((Requester.MakeRequest({searchtype: "id", searchparam: {type: 'models', id: this.ID}})));
    }

}
export {IModelFactionList, FactionModel}