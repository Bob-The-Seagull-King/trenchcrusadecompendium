import { Requester } from "../../../factories/Requester"
import { PlayerEquipment } from "../equipment/Equipment"

/**
 * Structure of an equipment item in 
 * the context of a faction.
 */
interface IEquipmentFactionList {
    id: string,
    cost: number,
    cost_id: string,
    limit: number,
    restriction: IEquipmentRestriction[],
    features?: string[]
}

/**
 * Structure of a restriction that a
 * piece of equipment will have in an
 * arbitrary faction.
 */
interface IEquipmentRestriction {
    type: string,
    val: string | number
}

/**
 * Piece of equipment in the context of a faction
 * or variant - including costs, limits, restrictions,
 * and special features.
 */
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