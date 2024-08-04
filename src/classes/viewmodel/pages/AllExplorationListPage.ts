// Import typescript classes
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";
import { ViewExplorationCollection } from "../collections/ViewExplorationCollections";
import { ExplorationFilterManager } from "../collections/filters/ExplorationFilterManager";

class AllExplorationListPage {

    Collection: ViewExplorationCollection;
    FilterManager: ExplorationFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewExplorationCollection();
        this.FilterManager = new ExplorationFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "exploration"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "exploration", ["source"])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllExplorationListPage}