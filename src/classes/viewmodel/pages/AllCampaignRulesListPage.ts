// Import typescript classes
import { ViewCampaignRulesCollection } from "../collections/ViewCampaignRulesCollection";
import { CampaignRulesFilterManager } from "../collections/filters/CampaignRulesFilterManager";
import { ConvertFiltersToRequest } from "../collections/filters/FilterConvert";

class AllCampaignRulesPage {

    Collection: ViewCampaignRulesCollection;
    FilterManager: CampaignRulesFilterManager;

    /**
     * Creates new collection and filter manager objects then
     * initializes the collection
     */
    constructor() {
        this.Collection = new ViewCampaignRulesCollection();
        this.FilterManager = new CampaignRulesFilterManager();

        this.initCollection();
    }

    /**
     * Sets the collection to a base search request and
     * then runs that search.
     */
    initCollection() {
        this.Collection.UpdateSearchParams({searchtype: "file", searchparam: {type: "campaignrules"}});
        this.Collection.RunSearch();
    }

    /**
     * Gets the JSON request specified by the filtermanager
     * and, if different to the current request, reruns the
     * collection manager's search.
     */
    updateSearch() {
        const newfilter = ConvertFiltersToRequest(this.FilterManager, "campaignrules", ["source"])
        if (!(JSON.stringify(newfilter) == JSON.stringify(this.Collection.searchParam))) {
            this.Collection.UpdateSearchParams(newfilter);
            this.Collection.RunSearch();
        }
    }
    
}

export {AllCampaignRulesPage}