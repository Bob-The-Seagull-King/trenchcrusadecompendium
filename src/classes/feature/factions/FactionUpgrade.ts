import { DescriptionFactory } from "../../../utility/functions";
import { Requester } from "../../../factories/Requester"
import { IEquipmentRestriction } from "./FactionEquip";

/**
 * Structure describing relationship between
 * a faction and an upgrade.
 */
interface IFactionUpgrade {
    id: string,
    cost: number,
    cost_id: string,
    restriction? : IEquipmentRestriction[],
    limit? : number;
}

/**
 * Structure describing an upgrade that
 * can be applied to models.
 */
interface IUpgradeData {
    id: string,
    type: string,
    name: string,
    eventtags : {[_name : string] : any},
    description: []
}

/**
 * Upgrades with the context of a particular
 * faction, with provides costs and who can
 * actually take the upgrade.
 */
class FactionUpgrade {
    public readonly ID;
    public Cost;
    public CostID;
    public Description;
    public EventTags
    public Name;
    public Limit;
    public Restrictions : IEquipmentRestriction[];

    public constructor(data: IFactionUpgrade) {
        this.ID = data.id;
        this.Cost = data.cost;
        this.CostID = data.cost_id;
        if (data.limit) {
            this.Limit = data.limit
        } else {
            this.Limit = 0;
        }
        if (data.restriction) {
            this.Restrictions = data.restriction
        } else {
            this.Restrictions = [];
        }
        const requestdata: IUpgradeData = (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'upgrade', id: this.ID}}));
        
        this.Name = requestdata.name;
        this.Description = DescriptionFactory(requestdata.description);
        this.EventTags = requestdata.eventtags;
    }

}
export {IFactionUpgrade, FactionUpgrade, IUpgradeData}