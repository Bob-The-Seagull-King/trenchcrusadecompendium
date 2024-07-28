import { DescriptionFactory } from '../../../utility/functions';

/**
 * Generic rule data structure
 */
interface IFactionRuleset {
    title: string,
    description: []
}

/**
 * Rule which describes unique gameplay changes
 * to a faction or faction variant.
 */
class FactionRule {
    public readonly Title;
    public readonly Description;

    public constructor(data: IFactionRuleset) {
        this.Title = data.title;
        this.Description = DescriptionFactory(data.description)
    }
}

export {IFactionRuleset, FactionRule}