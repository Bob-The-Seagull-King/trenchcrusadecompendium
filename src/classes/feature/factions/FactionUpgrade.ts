import { DescriptionFactory } from "../../../utility/functions";
import { Requester } from "../../../factories/Requester"

interface IFactionUpgrade {
    id: string,
    cost: number,
    cost_id: string
}

interface IUpgradeData {
    id: string,
    type: string,
    name: string,
    description: []
}

class FactionUpgrade {
    public readonly ID;
    public readonly Cost;
    public readonly CostID;
    public readonly Description;
    public readonly Name;

    public constructor(data: IFactionUpgrade) {
        this.ID = data.id;
        this.Cost = data.cost;
        this.CostID = data.cost_id;

        const requestdata: IUpgradeData = (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'upgrade', id: this.ID}}));
        this.Name = requestdata.name;
        this.Description = DescriptionFactory(requestdata.description);
    }

}
export {IFactionUpgrade, FactionUpgrade, IUpgradeData}