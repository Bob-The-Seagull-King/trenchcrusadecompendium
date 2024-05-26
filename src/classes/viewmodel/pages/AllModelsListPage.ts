// Import typescript classes
import { ViewModelsCollection } from "../collections/ViewModelsCollections";
import { ModelsFilterManager } from "../collections/filters/ModelsFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllModelsListPage {

    Collection: ViewModelsCollection;
    FilterManager: ModelsFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewModelsCollection();
        this.FilterManager = new ModelsFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "models"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "models", ["source", "faction_id", "variant_id"])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllModelsListPage}