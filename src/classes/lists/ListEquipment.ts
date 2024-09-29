import { PlayerEquipment } from "../feature/equipment/Equipment"
import { EquipmentFactory } from "../../factories/features/EquipmentFactory"
import { Requester } from "../../factories/Requester"

/**
 * Structure for a piece of equipment
 * help by a warband / warband member
 */
interface IListEquipment {
    id: string,
    cost: number,
    cost_type: string
}

/**
 * Object describing a piece of equipment
 * and how much was paid for it.
 */
class ListEquipment {
    public readonly ID;
    public readonly Cost;
    public readonly CostType;
    public Object : PlayerEquipment;

    public constructor(data: IListEquipment) {
        this.ID = data.id;
        this.Cost = data.cost;
        this.CostType = data.cost_type;

        this.Object = EquipmentFactory.CreateFactory((Requester.MakeRequest({searchtype: "id", searchparam: {type: 'equipment', id: this.ID}})));
    }

    public converttointerface() {
        const obj_inter : IListEquipment = {
            id: this.ID,
            cost: this.Cost,
            cost_type : this.CostType
        }

        return obj_inter;
    }
}

export {IListEquipment, ListEquipment}