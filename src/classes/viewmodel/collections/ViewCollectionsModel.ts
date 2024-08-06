import { Requester, IRequest } from '../../../factories/Requester'
import { CollectionDataDex, CollectionType } from './CollectionsStatic';

class ViewCollectionsModel {

    searchParam: any = {};
    dataresults: any = [];
    itemcollection: any[] = [];

    ObjectList: any[] = [];
    CollectionType: CollectionType;

    /**
     * Empty constructor
     */
    constructor(type : Lowercase<string>) {
        this.ObjectList = []
        this.CollectionType = CollectionDataDex[type]
    }

    /**
     * Updates the searchParam value
     * @param request The IRequest formatted searchParam
     */
    public UpdateSearchParams(request: IRequest) {
        this.searchParam = request;
    }

    /**
     * Make a request with the searchParam and store the resulting data
     */
    public RunSearch() {
        this.dataresults = Requester.MakeRequest(this.searchParam as IRequest);
        if (this.dataresults.length == undefined) {
            this.dataresults = [this.dataresults]
        }
        if (this.CollectionType) {
            this.CollectionType.postSearch(this);
        }
    }

    /**
     * Basic get function
     */
    public GetResults() {
        return this.dataresults
    }

    /**
     * Basic get function
     */
    public GetParam() {
        return this.searchParam as IRequest
    }

    /**
     * When destroyed, delete all ability objects
     */
    destructor() {
        this.CleanupModels() 
    }

    /**
     * Delete each ability object stored in the collection
     */
    CleanupModels() {
        let i = 0;
        for (i = 0; i < this.ObjectList.length; i ++) {
            delete this.ObjectList[i]
        }
        this.ObjectList = []
    }

    /**
     * Delete the currently searched text Items
     */
    CleanupCollection() {
        let i = 0;
        for (i = 0; i < this.itemcollection.length; i ++) {
            delete this.itemcollection[i]
        }
        this.itemcollection = []
    }

    /**
     * Basic get function
     */
    public ReturnObjects() {
        this.UpdateList();
        return this.ObjectList;
    }

    /**
     * Basic return function
     */
    public ReturnItems() {
        return this.itemcollection;
    }
    
    /**
     * Updates the list of abilities to be displayed
     * on screen.
     */
    UpdateList() {
        let i = 0;
        this.ObjectList = []
        for (i = 0; i < this.itemcollection.length; i++) {
            if (this.itemcollection[i].IsActive) {
                this.ObjectList.push(this.itemcollection[i].HeldItem)
            }
        }
    }
}

export {ViewCollectionsModel}