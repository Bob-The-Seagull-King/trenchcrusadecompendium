import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { FilterItem } from '../../../../classes/viewmodel/collections/filters/FilterInterfaces'
import { makestringpresentable } from '../../../../utility/functions'

const FilterItemItem = (prop: any) => {
    const ItemFilter: FilterItem = prop.data
    
    const [_currentstate, returnactivetext] = useState(GetDisplayVal());

    function GetDisplayVal(){
        if (ItemFilter.IsActive) {
            if (ItemFilter.DoInclude) {
                return "positive"
            } else {
                return "negative"
            }
        } else {
            return ""
        }
    }

    /**
     * Switch between "off", "must include", and "must exclude"
     */
    function SwitchStates() {
        if (ItemFilter.IsActive) {
            if (ItemFilter.DoInclude) {
                ItemFilter.IsActive = true;
                ItemFilter.DoInclude = false;
            } else {
                ItemFilter.IsActive = false;
                ItemFilter.DoInclude = false;
            }
        } else {
            ItemFilter.IsActive = true;
            ItemFilter.DoInclude = true;
        }
        returnactivetext(GetDisplayVal())
    }

    // Return result -----------------------------
    return (
        <div className="col">
            <div className="centerPosition">
                <div className={"hovermouse " + (_currentstate == "" ? "filterobjectdisplay" : _currentstate == "positive" ? "filterobjectdisplaypositive" : "filterobjectdisplaynegative")} onClick={() => SwitchStates()}>
                    {makestringpresentable(ItemFilter.Group)}: {makestringpresentable(ItemFilter.Name)}
                </div>
            </div>
        </div>
    )
    // -------------------------------------------
}

export default FilterItemItem