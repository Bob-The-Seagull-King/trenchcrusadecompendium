// Import typescript classes
import { ViewSkillsCollection } from "../collections/ViewSkillsCollections";
import { SkillsFilterManager } from "../collections/filters/SkillsFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllSkillsListPage {

    Collection: ViewSkillsCollection;
    FilterManager: SkillsFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewSkillsCollection();
        this.FilterManager = new SkillsFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "skillgroup"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "skillgroup", ["source"])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllSkillsListPage}