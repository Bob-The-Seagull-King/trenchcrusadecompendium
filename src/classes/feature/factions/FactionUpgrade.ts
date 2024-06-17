import { Requester } from "../../../factories/Requester"
import {ItemType} from '../../Enum'
import {IModelDescription, ModelDescription} from '../models/ModelDescription'

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
        this.Description = this.DescriptionFactory(requestdata.description);
    }

    /**
     * Translates the description JSON objects into a collection
     * of ModelDescription objects
     * @param data The array of description data objects
     * @returns Array of ModelDescription objects
     */
    private DescriptionFactory(data: []) {
        let i = 0;
        const array: ModelDescription[] = []
        try {
        for (i = 0; i < data.length; i++) {
            const tempAD = new ModelDescription(data[i])
            array.push(tempAD)
        }
        return array;
        } catch (e) {
            
            const emergencyarray: ModelDescription[] = []
            return emergencyarray;
        }
    }

}
export {IFactionUpgrade, FactionUpgrade}