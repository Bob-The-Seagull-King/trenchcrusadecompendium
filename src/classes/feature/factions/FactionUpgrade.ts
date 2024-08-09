import { DescriptionFactory } from "../../../utility/functions";
import { Requester } from "../../../factories/Requester"

/**
 * Structure describing relationship between
 * a faction and an upgrade.
 */
interface IFactionUpgrade {
    id: string,
    cost: number,
    cost_id: string
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
    public readonly Cost;
    public readonly CostID;
    public readonly Description;
    public readonly EventTags
    public readonly Name;

    public constructor(data: IFactionUpgrade) {
        this.ID = data.id;
        this.Cost = data.cost;
        this.CostID = data.cost_id;

        const requestdata: IUpgradeData = (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'upgrade', id: this.ID}}));
        this.Name = requestdata.name;
        this.Description = DescriptionFactory(requestdata.description);
        this.EventTags = requestdata.eventtags;
    }

}
export {IFactionUpgrade, FactionUpgrade, IUpgradeData}