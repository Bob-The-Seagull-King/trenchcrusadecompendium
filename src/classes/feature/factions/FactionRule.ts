import { DescriptionFactory } from '../../../utility/functions';

interface IFactionRuleset {
    title: string,
    description: []
}

class FactionRule {
    public readonly Title;
    public readonly Description;

    public constructor(data: IFactionRuleset) {
        this.Title = data.title;
        this.Description = DescriptionFactory(data.description)
    }

}

export {IFactionRuleset, FactionRule}