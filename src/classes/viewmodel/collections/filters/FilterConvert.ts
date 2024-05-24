// Import typescript classes
import { FilterManager } from "./FilterManager";

/**
 * Takes a filtermanager object and outputs a JSON object
 * which lets the Requester search for the given filters
 * of that object.
 * @param manager The manager that filters are being gathered from
 * @param _type The type of search being run (such as abilities, addons, etc)
 * @param _groups Any groups, which identify misc filters that should be
 *                lumped together in a subparam with 'or' restrictions.
 * @returns JSON object
 */
export function ConvertFiltersToRequest(manager: FilterManager, _type: string, _groups: string[]) {
    // Initialize arrays
    const filterSet = []
    const subsetSet = []

    // Intiailize lists of filters to convert
    const filtertext = manager.ReturnActiveTextFilters();
    const filtertag = manager.ReturnActiveTagFilters();
    const filtermisc = manager.ReturnActiveMiscFilters();
    const ungroupedfilters = filtermisc.filter((value) => (!_groups.includes(value.Group)))

    let i = 0;
    
    // Creates filters for each text item
    for (i = 0; i < filtertext.length; i++) {
        if (filtertext[i].Val.toString().trim().length > 0) {
            const jsontemp =    {                         
                                    item: filtertext[i].Group,
                                    value: filtertext[i].Val,
                                    equals: true,
                                    strict: filtertext[i].IsStrict
                                }
            filterSet.push(jsontemp);
        }
    }
    
    // Create filters for each tag item
    for (i = 0; i < filtertag.length; i++) {
        const jsontemp =    {             
                                item: "tags",
                                value: filtertag[i].TagType.Name,
                                equals: filtertag[i].TagType.DoInclude,
                                strict: true,
                                istag: true,
                                tagvalue: (filtertag[i].TagVal.Val.toString().trim().length > 0)? filtertag[i].TagVal.Val : ""
                            }
        filterSet.push(jsontemp);
    }

    // Create filters for each misc item that does not have a group listed in _groups
    for (i = 0; i < ungroupedfilters.length; i++) {
        const jsontemp =    {             
                                item: ungroupedfilters[i].Group,
                                value: ungroupedfilters[i].Name,
                                equals: ungroupedfilters[i].DoInclude,
                                strict: true,
                                istag: false
                            }
        filterSet.push(jsontemp);
    }

    // For each _group, create a subparam object
    for (i = 0; i < _groups.length; i++) {
        // Initialize
        const filterGroup = filtermisc.filter((value) => (value.Group == _groups[i]))
        const groupfilterset = []
        let j = 0;
        
        // Create filters for each misc item in a given group
        for (j = 0; j < filterGroup.length; j++) {
            const jsontemp =    {             
                                    item: filterGroup[j].Group,
                                    value: filterGroup[j].Name,
                                    equals: filterGroup[j].DoInclude,
                                    strict: true,
                                    istag: false
                                }
            groupfilterset.push(jsontemp);
        }

        // Create subparam
        const jsonSet = {
                            operator: "or",
                            terms: groupfilterset,
                            subparams: []
                        }

        // Only add this subparam if it has one or more filters in it
        if (groupfilterset.length > 0) {
            subsetSet.push(jsonSet)
                    }
    }

    // If at least one subparam or filter term exists, create a complex search, otherwise create a generic all-file search
    if ((filterSet.length > 0) || (subsetSet.length > 0)) {
        return  {
                searchtype: "complex",
                searchparam:    {
                                    type: _type,
                                    request:    {
                                                    operator: "and",
                                                    terms: filterSet,
                                                    subparams: subsetSet
                                                }
                                }
                }
    } else {
        return  {searchtype: "file", searchparam: {type: _type}}
    }
}