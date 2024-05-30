// Import typescript classes
import { ViewInjuriesCollection } from "../collections/ViewInjuriesCollections";
import { InjuryFilterManager } from "../collections/filters/InjuryFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllInjuriesListPage {

    Collection: ViewInjuriesCollection;
    FilterManager: InjuryFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewInjuriesCollection();
        this.FilterManager = new InjuryFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "injuries"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "injuries", [])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllInjuriesListPage}