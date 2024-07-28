import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import { IFactionRuleset, FactionRule } from '../factions/FactionRule'
import { DescriptionFactory } from '../../../utility/functions'

interface IQuickRule extends ITrenchCrusadeItemData {
    name: string,
    description: [],
    rules: IFactionRuleset[]
}

class QuickRule extends TrenchCrusadeItem {
    public readonly Name;
    public readonly Description;
    public readonly Rules;
    
    /**
     * Assigns parameters and creates a series of description
     * objects with DescriptionFactory
     * @param data Object data in IPlayerModel format
     */
    public constructor(data: IQuickRule)
    {
        super(data)
        this.ItemType = ItemType.QuickRule;

        this.Name = data.name;
        this.Rules = this.RulesetFactory(data.rules);
        this.Description = DescriptionFactory(data.description);
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
     * When destroyed, also delete all associated
     * addon objects.
     */
    destructor() {
        let i = 0;
        for (i = 0; i < this.Description.length; i++) {
            delete this.Description[i];
        }
    }

}

export {IQuickRule, QuickRule}

