import { PlayerEquipment } from "../feature/equipment/Equipment"
import { EquipmentFactory } from "../../factories/features/EquipmentFactory"
import { Requester } from "../../factories/Requester"

interface IListEquipment {
    id: string,
    cost: number,
    cost_type: string
}

class ListEquipment {
    public readonly ID;

    public readonly Cost;
    public readonly CostType;
    
    public readonly Object : PlayerEquipment;

    public constructor(data: IListEquipment) {
        this.ID = data.id;
        this.Cost = data.cost;
        this.CostType = data.cost_type;

        this.Object = EquipmentFactory.CreateFactory((Requester.MakeRequest({searchtype: "id", searchparam: {type: 'equipment', id: this.ID}})));
    }

}

export {IListEquipment, ListEquipment}