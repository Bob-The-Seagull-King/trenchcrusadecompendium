// Import typescript classes
import { ViewEquipmentCollection } from "../collections/ViewEquipmentCollections";
import { EquipmentFilterManager } from "../collections/filters/EquipmentFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllEquipmentListPage {

    Collection: ViewEquipmentCollection;
    FilterManager: EquipmentFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewEquipmentCollection();
        this.FilterManager = new EquipmentFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "equipment"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "equipment", ["source", "category", "equip-type", "range"])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllEquipmentListPage}