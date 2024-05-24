import {Requester, IRequest} from '../../../factories/Requester'

abstract class ViewCollectionsModel {

    searchParam: any = {};
    dataresults: any = [];
    itemcollection: any[] = [];

    /**
     * Empty constructor
     */
    constructor() {
        undefined;
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

    UpdateList() {
        undefined;
    }

}

export {ViewCollectionsModel}