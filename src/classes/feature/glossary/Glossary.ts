import { ITrenchCrusadeItemData, TrenchCrusadeItem } from '../../TrenchCrusadeItem'
import { ItemType } from '../../Enum'
import { DescriptionFactory } from '../../../utility/functions';

/**
 * Description data for glossary rule
 */
interface IGlossaryRule extends ITrenchCrusadeItemData {
    description: []
}

/**
 * Rule description used as a glossary term.
 */
class GlossaryRule extends TrenchCrusadeItem {
    public readonly Description;

    public constructor(data: IGlossaryRule)
    {
        super(data)
        this.ItemType = ItemType.GlossaryRule;
        this.Description = DescriptionFactory(data.description);
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

export {IGlossaryRule, GlossaryRule}

