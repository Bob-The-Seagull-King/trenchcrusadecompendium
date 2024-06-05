import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState, useRef } from 'react'

import { WarbandManager } from '../../classes/lists/warbandmanager';
import WarbandListDisplay from '../../display/components/features/warband/WarbandListDisplay';
import WarbandEditDisplay from '../../display/components/features/warband/WarbandEditDisplay';
import { Warband } from '../../classes/lists/Warband';

const ToolsWarbandBuilder = (prop: any) => {
    const Manager : WarbandManager = prop.manager;
    
    const [_currentWarband, returnWarband] = useState(grabWarbandFromURL);

    function grabWarbandFromURL() {
        const param = grabURL();

        const WarbandCurrent = Manager.GetWarbandByName(param);
        
        return WarbandCurrent
    }

    function UpdateWarband(_warband : Warband) {
        Manager.SetStorage();
        returnWarband(_warband);
    }

    function grabURL() {
        const urlPath = window.location.pathname;
        const urlSplits = urlPath.split('/');
        let urlBuildParam = "";
        if (urlSplits.length >= 4) {
            urlBuildParam = urlSplits[3];
            if (urlBuildParam.length > 0) {
                return urlBuildParam;
            }
        }
        return urlBuildParam;
    }

    // Return result -----------------------------
    return (
        <div className="container" style={{width:"100%"}}>
            {_currentWarband != null &&
                <div>
                    <WarbandEditDisplay data={_currentWarband} updater={UpdateWarband} manager={Manager}/>
                </div>
            }
            {_currentWarband == null &&
                <WarbandListDisplay manager={Manager} updater={UpdateWarband}/>
            }
        </div>
    )
    // -------------------------------------------
}

export default ToolsWarbandBuilder