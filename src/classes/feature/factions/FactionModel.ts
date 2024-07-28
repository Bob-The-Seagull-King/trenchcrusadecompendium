import { Requester } from "../../../factories/Requester"
import { PlayerModel } from "../models/Model";
import { ModelFactory } from "../../../factories/features/ModelFactory";
import { IFactionUpgrade, FactionUpgrade } from "./FactionUpgrade"

/**
 * Structure of a model in the context
 * of a faction.
 */
interface IModelFactionList {
    id: string,
    cost: number,
    cost_id: string,
    limit_min: number,
    limit_max: number,
    equipment: string[],
    upgrades: []
}

/**
 * A model with the context of a particular faction
 * or variant - which includes costs available upgrades
 * and starting equipment.
 */
class FactionModel {
    public readonly ID;
    public readonly Cost;
    public readonly CostID;
    public readonly LimitMin;
    public readonly LimitMax;
    public readonly Object : PlayerModel;
    public readonly Equipment;
    public readonly Upgrades : FactionUpgrade[];

    public constructor(data: IModelFactionList) {
        this.ID = data.id;
        this.Cost = data.cost;
        this.CostID = data.cost_id;
        this.LimitMin = data.limit_min;
        this.LimitMax = data.limit_max;
        this.Equipment = data.equipment;
        this.Object = ModelFactory.CreateModel((Requester.MakeRequest({searchtype: "id", searchparam: {type: 'models', id: this.ID}})));
        this.Upgrades = this.UpgradeFactory(data.upgrades);
    }

    /**
     * Generates the list of Upgrade objects available to this model
     * with relevant costs and cost types.
     * @param data Array of FactionUpgrade information that this
     * model has available to them in this faction / variant.
     * @returns Array of FactionUpgrade items available to a model.
     */
    private UpgradeFactory(data : IFactionUpgrade[]) {
        const upgradeList: FactionUpgrade[] = [];

        let i = 0;
        for (i = 0; i < data.length; i++) {
            const upgradeNew = new FactionUpgrade(data[i]);
            upgradeList.push(upgradeNew);
        }

        return upgradeList;
    }
}
export {IModelFactionList, FactionModel}