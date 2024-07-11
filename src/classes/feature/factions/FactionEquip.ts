import { Requester } from "../../../factories/Requester"
import { PlayerEquipment } from "../equipment/Equipment"

interface IEquipmentFactionList {
    id: string,
    cost: number,
    cost_id: string,
    limit: number,
    restriction: IEquipmentRestriction[],
    features?: string[]
}

interface IEquipmentRestriction {
    type: string,
    val: string | number
}

class FactionEquip {
    public readonly ID;
    public readonly Cost;
    public readonly CostID;
    public readonly Limit;
    public readonly Restrictions;
    public readonly Object : PlayerEquipment;
    public readonly Features;

    public constructor(data: IEquipmentFactionList) {
        this.ID = data.id;
        this.Cost = data.cost;
        this.CostID = data.cost_id;
        this.Limit = data.limit;
        this.Restrictions = data.restriction;
        this.Features = data.features? data.features : [];

        this.Object = new PlayerEquipment(Requester.MakeRequest({searchtype: "id", searchparam: {type: 'equipment', id: this.ID}}));
    }

}
export {IEquipmentFactionList, IEquipmentRestriction, FactionEquip}