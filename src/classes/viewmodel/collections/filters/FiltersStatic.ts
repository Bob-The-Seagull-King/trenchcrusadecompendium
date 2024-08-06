import { FilterItem, FilterTag, FilterText, IFilterItem, IFilterTag, IFilterText } from "./FilterInterfaces";
import { Requester } from "../../../../factories/Requester";

export interface FilterType {
    searchId      : string,
    findText?: () => FilterText[],
    findMisc?: () => FilterItem[],
    findTags?: () => FilterItem[],
    findStat?: () => FilterTag[]
}

export interface FilterDataTable {[moveid: Lowercase<string>]: FilterType}

export const FitlerDataDex : FilterDataTable = {
    campaignrules: {
        searchId: 'campaignrules',
        findMisc() {
            const tempMisc: FilterItem[] = []
            const keytypes = ["source"]
            keytypes.sort();
    
            let i = 0;
            for (i = 0; i < keytypes.length; i ++) {
                const foundVals = Requester.MakeRequest({ searchtype: 'keyvalues', searchparam: { type: 'campaignrules' , id: keytypes[i]} }).sort();
                
                let j = 0;
                for (j = 0; j < foundVals.length; j++) {
                    const tempItemObject: IFilterItem = { group: keytypes[i], isactive: false, doinclude: false, name: foundVals[j]}
                    const tempItemConstructed = new FilterItem(tempItemObject);
                    tempMisc.push(tempItemConstructed);
                }
            }
    
            return tempMisc;
        },
        findTags() {
            const tempTags: FilterItem[] = []
            const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'campaignrules' } })).sort();
    
            let i = 0;
            for (i = 0; i < foundTags.length; i++) {
                const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
                const tempTagConstructed = new FilterItem(tempTagObject);
                tempTags.push(tempTagConstructed);
            }
    
            return tempTags;
        },
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        }
    },
    equipment: {
        searchId: 'equipment',
        findTags() {
            const tempTags: FilterItem[] = []
            const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'equipment' } })).sort();
    
            let i = 0;
            for (i = 0; i < foundTags.length; i++) {
                const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
                const tempTagConstructed = new FilterItem(tempTagObject);
                tempTags.push(tempTagConstructed);
            }
    
            return tempTags;
        },
        findMisc() {
            const tempMisc: FilterItem[] = []
            const keytypes = ["source", "category", "equip_type", "range"]
            keytypes.sort();
    
            let i = 0;
            for (i = 0; i < keytypes.length; i ++) {
                const foundVals = Requester.MakeRequest({ searchtype: 'keyvalues', searchparam: { type: 'equipment' , id: keytypes[i]} }).sort();
                
                let j = 0;
                for (j = 0; j < foundVals.length; j++) {
                    const tempItemObject: IFilterItem = { group: keytypes[i], isactive: false, doinclude: false, name: foundVals[j]}
                    const tempItemConstructed = new FilterItem(tempItemObject);
                    tempMisc.push(tempItemConstructed);
                }
            }
    
            return tempMisc;
        },
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        }
    },
    exploration: {
        searchId: 'exploration',
        findTags() {
            const tempTags: FilterItem[] = []
            const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'exploration' } })).sort();
    
            let i = 0;
            for (i = 0; i < foundTags.length; i++) {
                const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
                const tempTagConstructed = new FilterItem(tempTagObject);
                tempTags.push(tempTagConstructed);
            }
    
            return tempTags;
        },
        findMisc() {
            const tempMisc: FilterItem[] = []
            const keytypes = ["source"]
            keytypes.sort();
    
            let i = 0;
            for (i = 0; i < keytypes.length; i ++) {
                const foundVals = Requester.MakeRequest({ searchtype: 'keyvalues', searchparam: { type: 'exploration' , id: keytypes[i]} }).sort();
                
                let j = 0;
                for (j = 0; j < foundVals.length; j++) {
                    const tempItemObject: IFilterItem = { group: keytypes[i], isactive: false, doinclude: false, name: foundVals[j]}
                    const tempItemConstructed = new FilterItem(tempItemObject);
                    tempMisc.push(tempItemConstructed);
                }
            }
    
            return tempMisc;
        },
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        }
    },
    faction: {
        searchId: 'faction',
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        },
        findTags() {
            const tempTags: FilterItem[] = []
            const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'faction' } })).sort();
    
            let i = 0;
            for (i = 0; i < foundTags.length; i++) {
                const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
                const tempTagConstructed = new FilterItem(tempTagObject);
                tempTags.push(tempTagConstructed);
            }
    
            return tempTags;
        }
    },
    injuries: {
        searchId: 'injuries',
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        },
        findTags() {
            const tempTags: FilterItem[] = []
            const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'injuries' } })).sort();
    
            let i = 0;
            for (i = 0; i < foundTags.length; i++) {
                const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
                const tempTagConstructed = new FilterItem(tempTagObject);
                tempTags.push(tempTagConstructed);
            }
    
            return tempTags;
        },
        findMisc() {
            const tempMisc: FilterItem[] = []
            const keytypes = ["source", "category", "roll_start", "roll_end", "range"]
            keytypes.sort();
    
            let i = 0;
            for (i = 0; i < keytypes.length; i ++) {
                const foundVals = Requester.MakeRequest({ searchtype: 'keyvalues', searchparam: { type: 'injuries' , id: keytypes[i]} }).sort();
                
                let j = 0;
                for (j = 0; j < foundVals.length; j++) {
                    const tempItemObject: IFilterItem = { group: keytypes[i], isactive: false, doinclude: false, name: foundVals[j]}
                    const tempItemConstructed = new FilterItem(tempItemObject);
                    tempMisc.push(tempItemConstructed);
                }
            }
    
            return tempMisc;
        }
    },
    models: {
        searchId: 'models',
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        },
        findTags() {
            const tempTags: FilterItem[] = []
            const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'models' } })).sort();
    
            let i = 0;
            for (i = 0; i < foundTags.length; i++) {
                const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
                const tempTagConstructed = new FilterItem(tempTagObject);
                tempTags.push(tempTagConstructed);
            }
    
            return tempTags;
        },
        findStat() {
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
    
        },
        findMisc() {
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
    },
    quickrules: {
        searchId: 'quickrules',
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        },
        findTags() {
            const tempTags: FilterItem[] = []
            const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'quickrules' } })).sort();
    
            let i = 0;
            for (i = 0; i < foundTags.length; i++) {
                const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
                const tempTagConstructed = new FilterItem(tempTagObject);
                tempTags.push(tempTagConstructed);
            }
    
            return tempTags;
        },
        findMisc() {
            const tempMisc: FilterItem[] = []
            const keytypes = ["source"]
            keytypes.sort();
    
            let i = 0;
            for (i = 0; i < keytypes.length; i ++) {
                const foundVals = Requester.MakeRequest({ searchtype: 'keyvalues', searchparam: { type: 'quickrules' , id: keytypes[i]} }).sort();
                
                let j = 0;
                for (j = 0; j < foundVals.length; j++) {
                    const tempItemObject: IFilterItem = { group: keytypes[i], isactive: false, doinclude: false, name: foundVals[j]}
                    const tempItemConstructed = new FilterItem(tempItemObject);
                    tempMisc.push(tempItemConstructed);
                }
            }
    
            return tempMisc;
        }
    },
    scenario: {
        searchId: 'scenario',
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        },
        findTags() {
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
    },
    skills: {
        searchId: 'skills',
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        },
        findTags() {
            const tempTags: FilterItem[] = []
            const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'skillgroup' } })).sort();
    
            let i = 0;
            for (i = 0; i < foundTags.length; i++) {
                const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
                const tempTagConstructed = new FilterItem(tempTagObject);
                tempTags.push(tempTagConstructed);
            }
    
            return tempTags;
        },
        findMisc() {
            const tempMisc: FilterItem[] = []
            const keytypes = ["source"]
            keytypes.sort();
    
            let i = 0;
            for (i = 0; i < keytypes.length; i ++) {
                const foundVals = Requester.MakeRequest({ searchtype: 'keyvalues', searchparam: { type: 'skillgroup' , id: keytypes[i]} }).sort();
                
                let j = 0;
                for (j = 0; j < foundVals.length; j++) {
                    const tempItemObject: IFilterItem = { group: keytypes[i], isactive: false, doinclude: false, name: foundVals[j]}
                    const tempItemConstructed = new FilterItem(tempItemObject);
                    tempMisc.push(tempItemConstructed);
                }
            }
    
            return tempMisc;
        }
    },
    tablereference: {
        searchId: 'tablechart',
        findText() {
            return [new FilterText({group: "name", val: "", isstrict: false})]
        },
        findTags() {
            const tempTags: FilterItem[] = []
            const foundTags = (Requester.MakeRequest({ searchtype: 'tags', searchparam: { type: 'tablechart' } })).sort();
    
            let i = 0;
            for (i = 0; i < foundTags.length; i++) {
                const tempTagObject: IFilterItem = { group: "tags", isactive: false, doinclude: false, name: foundTags[i]}
                const tempTagConstructed = new FilterItem(tempTagObject);
                tempTags.push(tempTagConstructed);
            }
    
            return tempTags;
        },
        findMisc() {
            const tempMisc: FilterItem[] = []
            const keytypes = ["source"]
            keytypes.sort();
    
            let i = 0;
            for (i = 0; i < keytypes.length; i ++) {
                const foundVals = Requester.MakeRequest({ searchtype: 'keyvalues', searchparam: { type: 'tablechart' , id: keytypes[i]} }).sort();
                
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
}