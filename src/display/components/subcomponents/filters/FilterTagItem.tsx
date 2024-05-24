import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { FilterTag } from '../../../../classes/viewmodel/collections/filters/FilterInterfaces'
import { makestringpresentable } from '../../../../utility/functions'

const FilterTagItem = (prop: any) => {
    const ItemFilter: FilterTag = prop.data

    const [_currentstate, returnactivetext] = useState(GetDisplayVal());
    
    function GetDisplayVal(){
        if (ItemFilter.TagType.IsActive) {
            if (ItemFilter.TagType.DoInclude) {
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
        if (ItemFilter.TagType.IsActive) {
            if (ItemFilter.TagType.DoInclude) {
                ItemFilter.TagType.IsActive = true;
                ItemFilter.TagType.DoInclude = false;
            } else {
                ItemFilter.TagType.IsActive = false;
                ItemFilter.TagType.DoInclude = false;
            }
        } else {
            ItemFilter.TagType.IsActive = true;
            ItemFilter.TagType.DoInclude = true;
        }
        returnactivetext(GetDisplayVal())
    }

    function updateName(value: string) {
        ItemFilter.TagVal.Val = value;
    }


    // Return result -----------------------------
    return (
        <div className="">
            <div className="centerPosition">
                <div className={"tagBox " + (_currentstate == "" ? "filterobjectdisplay" : _currentstate == "positive" ? "filterobjectdisplaypositive" : "filterobjectdisplaynegative")} style={{minHeight:"2.75em", alignItems: "center"}} >
                    <div className='hovermouse tagpad'/>
                    <div onClick={() => SwitchStates()} className="hovermouse tagboxtitle">
                        {makestringpresentable(ItemFilter.TagType.Name)}
                    </div>
                    <div className='tagpad'/>
                     
                    <div className=''>
                        <InputGroup className="shorten tagboxpad" >
                            <Form.Control size="sm" className="no-margins" style={{fontSize:"0.75em", height:"0.5em", margin:"0em", textAlign:"center"}} onChange={e => updateName(e.target.value)} aria-label="Text input with checkbox" defaultValue={ItemFilter.TagVal.Val} placeholder=""/>
                        </InputGroup>
                    </div>
                    
                </div>
            </div>
        </div>
    )
    // -------------------------------------------
}

export default FilterTagItem