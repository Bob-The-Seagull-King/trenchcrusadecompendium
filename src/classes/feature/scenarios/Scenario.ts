import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import {ModelDescription} from '../models/ModelDescription'
import { IFactionRuleset, FactionRule } from '../factions/FactionRule'

interface IScenario extends ITrenchCrusadeItemData {
    name: string,
    image_url: string,
    rules: IFactionRuleset[]
}

class Scenario extends TrenchCrusadeItem {
    public readonly Name;
    public readonly ImageUrl;
    public readonly Rules;
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerModel format
     */
    public constructor(data: IScenario)
    {
        super(data)
        this.ItemType = ItemType.Scenario;

        this.Name = data.name;
        this.ImageUrl = data.image_url
        this.Rules = this.RulesetFactory(data.rules);
    }

    private RulesetFactory(data: IFactionRuleset[]) {
        const ruleslist = [];
        let i = 0;
        for (i = 0; i < data.length; i++) {
            const tempAD = new FactionRule(data[i]);
            ruleslist.push(tempAD);
        }
        return ruleslist;
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
    
    /**
     * When destroyed, also delete all associated
     * addon objects.
     */
    destructor() {
        let i = 0;
        for (i = 0; i < this.Rules.length; i++) {
            delete this.Rules[i];
        }
    }

}

export {IScenario, Scenario}

