// Import typescript classes
import { ViewAbilitiesCollection } from "../collections/ViewAbilitiesCollections";
import { AbilitiesFilterManager } from "../collections/filters/AbilitiesFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllAbilitiesListPage {

    Collection: ViewAbilitiesCollection;
    FilterManager: AbilitiesFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewAbilitiesCollection();
        this.FilterManager = new AbilitiesFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "abilities"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "abilities", ["chapter", "source", "class_id", "job_id"])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllAbilitiesListPage}