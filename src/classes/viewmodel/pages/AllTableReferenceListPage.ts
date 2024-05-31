// Import typescript classes
import { ViewTableReferenceCollection } from "../collections/ViewTableReferenceCollections";
import { TableReferenceFilterManager } from "../collections/filters/TableReferenceFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllTableReferenceListPage {

    Collection: ViewTableReferenceCollection;
    FilterManager: TableReferenceFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewTableReferenceCollection();
        this.FilterManager = new TableReferenceFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "tablechart"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "tablechart", ["source"])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllTableReferenceListPage}