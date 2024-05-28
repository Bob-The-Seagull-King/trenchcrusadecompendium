import {ModelDescription} from '../models/ModelDescription'

interface IFactionRuleset {
    title: string,
    description: []
}

class FactionRule {
    public readonly Title;
    public readonly Description;

    public constructor(data: IFactionRuleset) {
        this.Title = data.title;
        this.Description = this.DescriptionFactory(data.description)
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
        for (i = 0; i < data.length; i++) {
            const tempAD = new ModelDescription(data[i])
            array.push(tempAD)
        }
        return array;
    }

}

export {IFactionRuleset, FactionRule}