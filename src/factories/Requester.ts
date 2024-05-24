import { ContentPack } from '../classes/contentpacks/contentpack';
import {DataResponder} from '../resources/data/child/util/DataResponder'
import { useContentPackStore } from '../store/contentpacks'

/**
 * Format for a given request to send to the icon-data repo
 */
interface IRequest {
    searchtype: string, // Used to decide which request to make
    searchparam: any // The data of the givn request
}

class Requester {

    /**
     * Send a request to a DataResponder and returns the result
     * @param request The IRequest being sent to the Requester
     * @returns The data returned by the icon-data repo in response to the request
     */
    public static MakeRequest(request: IRequest) {
        request.searchparam.data = GetContentPackData(request)
        switch(request.searchtype) {
            case "id": {
                return DataResponder.GetSingleEntry(request.searchparam);
            }
            case "file": {
                return DataResponder.GetFullDataEntry(request.searchparam);
            }
            case "keyvalues": {
                return DataResponder.GetAllOfKeyInData(request.searchparam);
            }
            case "complex": {
                return DataResponder.ComplexSearch(request.searchparam);
            }
            case "tags": {
                return DataResponder.GetAllTagsInData(request.searchparam);
            }
            default: {
                return []
            }
        }
    }

}

export {Requester, IRequest}

function GetContentPackData(request: IRequest): any {
    const BonusData = [];

    let ReturnData: ContentPack[] = [];  
    const data = localStorage.getItem('contentpackstorage');  
    try {
        ReturnData = JSON.parse(data || "");
    } catch (e) {
        console.log("Local storage is not valid.")
    }
    
    let i = 0;
    for (i = 0; i < ReturnData.length; i++) {
        if (ReturnData[i].IsActive) {
            let j = 0;
            for (j = 0; j < ReturnData[i].Files.length; j++) {
                if (ReturnData[i].Files[j].type == request.searchparam.type) {
                    let k = 0;
                    for (k = 0; k < ReturnData[i].Files[j].data.length; k++) {
                        BonusData.push(ReturnData[i].Files[j].data[k]);
                    }
                }
            }
        }
    }

    return BonusData
}
