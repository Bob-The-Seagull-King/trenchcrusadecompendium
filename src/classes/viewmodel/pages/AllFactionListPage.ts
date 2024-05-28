// Import typescript classes
import { ViewFactionCollection } from "../collections/ViewFactionCollections";
import { FactionFilterManager } from "../collections/filters/FactionFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllFactionListPage {

    Collection: ViewFactionCollection;
    FilterManager: FactionFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewFactionCollection();
        this.FilterManager = new FactionFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "faction"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "faction", [])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllFactionListPage}