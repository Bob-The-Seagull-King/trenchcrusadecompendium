// Import typescript interfaces and classes
import { IFilterItem, IFilterTag, IFilterText, FilterTag, FilterItem, FilterText } from "./FilterInterfaces"
import { Requester } from "../../../../factories/Requester";
import { FilterManager } from "./FilterManager";

class ModelsFilterManager extends FilterManager {

    /**
     * Builds the filter manager by gathering a full
     * list of necessary filters.
     */
    constructor() {
        super()
        this.TextOptions = [new FilterText({group: "name", val: "", isstrict: false})]
        this.TagOptions = this.FindTags();
        this.MiscOptions = this.FindMisc();
    }

    /**
     * Find all tag types, based on tag_name, that
     * are currently in the models json data file.
     * @returns Array of FilterTag objects
     */
    FindTags() {
        const tempTags: FilterItem[] = []
        const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'models' } })).sort();

        let i = 0;
        for (i = 0; i < foundTags.length; i++) {
            const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
            const tempTagConstructed = new FilterItem(tempTagObject);
            tempTags.push(tempTagConstructed);
        }

        return tempTags;
    }

    /**
     * Gathers all values of a given key type in
     * the models json data file, with the key
     * types determined by a hardcoded array.
     * @returns Array of FilterItem objects
     */
    FindMisc() {
        const tempMisc: FilterItem[] = []
        const keytypes = ["source", "faction_id", "variant_id", "cost", "movement","armour","melee","ranged","base","cost_id"]
        keytypes.sort();

        let i = 0;
        for (i = 0; i < keytypes.length; i ++) {
            const foundVals = Requester.MakeRequest({ searchtype: 'keyvalues', searchparam: { type: 'models' , id: keytypes[i]} }).sort();
            
            let j = 0;
            for (j = 0; j < foundVals.length; j++) {
                const tempItemObject: IFilterItem = { group: keytypes[i], isactive: false, doinclude: false, name: foundVals[j]}
                const tempItemConstructed = new FilterItem(tempItemObject);
                tempMisc.push(tempItemConstructed);
            }
        }

        return tempMisc;
    }
    
}

export {ModelsFilterManager}