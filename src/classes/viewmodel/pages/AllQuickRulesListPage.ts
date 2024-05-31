// Import typescript classes
import { ViewQuickRulesCollection } from "../collections/ViewQuickRulesCollection";
import { QuickRulesFilterManager } from "../collections/filters/QuickRulesFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllQuickRulesPage {

    Collection: ViewQuickRulesCollection;
    FilterManager: QuickRulesFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewQuickRulesCollection();
        this.FilterManager = new QuickRulesFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "quickrules"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "quickrules", ["source"])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllQuickRulesPage}