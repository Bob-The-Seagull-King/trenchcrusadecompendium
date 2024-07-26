// Import typescript interfaces and classes
import { IFilterItem, FilterItem, FilterText } from "./FilterInterfaces"
import { Requester } from "../../../../factories/Requester";
import { FilterManager } from "./FilterManager";

class ScenarioFilterManager extends FilterManager {

    /**
     * Builds the filter manager by gathering a full
     * list of necessary filters.
     */
    constructor() {
        super()
        this.TextOptions = [new FilterText({group: "name", val: "", isstrict: false})]
        this.TagOptions = this.FindTags();
    }

    /**
     * Find all tag types, based on tag_name, that
     * are currently in the models json data file.
     * @returns Array of FilterTag objects
     */
    FindTags() {
        const tempTags: FilterItem[] = []
        const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'scenario' } })).sort();

        let i = 0;
        for (i = 0; i < foundTags.length; i++) {
            const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
            const tempTagConstructed = new FilterItem(tempTagObject);
            tempTags.push(tempTagConstructed);
        }

        return tempTags;
    }
    
}

export {ScenarioFilterManager}