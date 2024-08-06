// Import typescript classes
import { ViewCollectionsModel } from "../collections/ViewCollectionsModel";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";
import { FilterManager } from "../collections/filters/FilterManager";

class CollectionsListPage {

    Collection: ViewCollectionsModel;
    FilterManager: FilterManager;
    TypeName: Lowercase<string>

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor(type: Lowercase<string>) {
        this.Collection = new ViewCollectionsModel(type);
        this.FilterManager = new FilterManager(type);
        this.TypeName = type;

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: this.Collection.CollectionType.searchId}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, this.Collection.CollectionType.searchId, this.Collection.CollectionType.sort)
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {CollectionsListPage}