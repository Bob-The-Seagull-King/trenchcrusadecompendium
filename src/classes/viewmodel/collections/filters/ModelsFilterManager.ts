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
        this.StatOptions = this.FindStat();
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

    FindStat() {
        const tempMisc: FilterTag[] = []
        
        let tempItemObject: IFilterItem = { group: "stat", isactive: false, doinclude: false, name: "cost"}
        let tempItemVal: IFilterText = {val: "", isstrict: true, group: "cost"};
        let tempItemFull: IFilterTag = {tagtype: tempItemObject, tagval: tempItemVal, group: "stat"}
        let tempItemConstructed = new FilterTag(tempItemFull);
        tempMisc.push(tempItemConstructed);    
        
        tempItemObject = { group: "stat", isactive: false, doinclude: false, name: "movement"}
        tempItemVal = {val: "", isstrict: true, group: "movement"};
        tempItemFull = {tagtype: tempItemObject, tagval: tempItemVal, group: "stat"}
        tempItemConstructed = new FilterTag(tempItemFull);
        tempMisc.push(tempItemConstructed);   
        
        tempItemObject = { group: "stat", isactive: false, doinclude: false, name: "base"}
        tempItemVal = {val: "", isstrict: true, group: "base"};
        tempItemFull = {tagtype: tempItemObject, tagval: tempItemVal, group: "stat"}
        tempItemConstructed = new FilterTag(tempItemFull);
        tempMisc.push(tempItemConstructed);   
        
        tempItemObject = { group: "stat", isactive: false, doinclude: false, name: "armour"}
        tempItemVal = {val: "", isstrict: true, group: "armour"};
        tempItemFull = {tagtype: tempItemObject, tagval: tempItemVal, group: "stat"}
        tempItemConstructed = new FilterTag(tempItemFull);
        tempMisc.push(tempItemConstructed);   
        
        tempItemObject = { group: "stat", isactive: false, doinclude: false, name: "ranged"}
        tempItemVal = {val: "", isstrict: true, group: "ranged"};
        tempItemFull = {tagtype: tempItemObject, tagval: tempItemVal, group: "stat"}
        tempItemConstructed = new FilterTag(tempItemFull);
        tempMisc.push(tempItemConstructed);   
        
        tempItemObject = { group: "stat", isactive: false, doinclude: false, name: "melee"}
        tempItemVal = {val: "", isstrict: true, group: "melee"};
        tempItemFull = {tagtype: tempItemObject, tagval: tempItemVal, group: "stat"}
        tempItemConstructed = new FilterTag(tempItemFull);
        tempMisc.push(tempItemConstructed);        

        return tempMisc;

    }

    /**
     * Gathers all values of a given key type in
     * the models json data file, with the key
     * types determined by a hardcoded array.
     * @returns Array of FilterItem objects
     */
    FindMisc() {
        const tempMisc: FilterItem[] = []
        const keytypes = ["source", "faction_id", "variant_id"]
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