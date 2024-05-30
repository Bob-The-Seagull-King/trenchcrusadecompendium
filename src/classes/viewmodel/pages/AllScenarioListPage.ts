// Import typescript classes
import { ViewScenarioCollection } from "../collections/ViewScenarioCollections";
import { ScenarioFilterManager } from "../collections/filters/ScenarioFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllScenarioListPage {

    Collection: ViewScenarioCollection;
    FilterManager: ScenarioFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewScenarioCollection();
        this.FilterManager = new ScenarioFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "scenario"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "scenario", [])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllScenarioListPage}