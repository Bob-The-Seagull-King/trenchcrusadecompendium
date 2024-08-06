import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Classes
import { FilterText, FilterItem, FilterTag } from '../../../../classes/viewmodel/collections/filters/FilterInterfaces'
import { makestringpresentable } from '../../../../utility/functions'


/**
 * Switch between "off", "must include", and "must exclude"
 */
function SwitchStates(item : FilterItem, returnactivetext: any) {
    if (item.IsActive) {
        if (item.DoInclude) {
            item.IsActive = true;
            item.DoInclude = false;
        } else {
            item.IsActive = false;
            item.DoInclude = false;
        }
    } else {
        item.IsActive = true;
        item.DoInclude = true;
    }
    returnactivetext(GetDisplayVal(item))
}

/**
     * Determines the current state of the filter
     * "" = No impact
     * "negative" = Reject if fitler applies
     * "positive" = Accept if filter applies
     * @returns String to append to className
     */
function GetDisplayVal(item : FilterItem){
    if (item.IsActive) {
        if (item.DoInclude) {
            return "positive"
        } else {
            return "negative"
        }
    } else {
        return ""
    }
}

// Update the value of the text fitler
function updateName(item : FilterText, value: string) {
    item.Val = value;
}

// Update the strictness of the text filter
function updateStrict(item : FilterText, returnactivetext : any) {
    item.IsStrict = !item.IsStrict
    returnactivetext(item.IsStrict)
}

const FilterTextItem = (prop: any) => {
    const ItemFilter: FilterText = prop.data
    const [_currentstate, returnactivetext] = useState(ItemFilter.IsStrict);

    // Return result -----------------------------
    return (
        <div className="col">
            <div className="centerPosition">
                <InputGroup className="mb-3 borderstyler subbordericon filtertextinput">
                    <Form.Control onChange={e => updateName(ItemFilter, e.target.value)} className='' aria-label="Text input with checkbox" defaultValue={ItemFilter.Val}/>
                    <InputGroup.Text className=''>Exact Match?</InputGroup.Text>
                    <InputGroup.Checkbox checked={_currentstate}  onChange={e => updateStrict(ItemFilter, returnactivetext)}  className='' aria-label="Checkbox for following text input" ></InputGroup.Checkbox>
                </InputGroup>
            </div>
        </div>
    )
    // -------------------------------------------
}

const FilterTagItem = (prop: any) => {
    const ItemFilter: FilterTag = prop.data
    const [_currentstate, returnactivetext] = useState(GetDisplayVal(ItemFilter.TagType));

    // Return result -----------------------------
    return (
        <div className="">
            <div className="centerPosition">
                <div className={"tagBox " + (_currentstate == "" ? "filterobjectdisplay" : _currentstate == "positive" ? "filterobjectdisplaypositive" : "filterobjectdisplaynegative")} style={{minHeight:"2.75em", alignItems: "center"}} >
                    <div className='hovermouse tagpad'/>
                    <div onClick={() => SwitchStates(ItemFilter.TagType, returnactivetext)} className="hovermouse tagboxtitle">
                        {makestringpresentable(ItemFilter.TagType.Name)}
                    </div>
                    <div className='tagpad'/>
                     
                    <div className=''>
                        <InputGroup className="shorten tagboxpad" >
                            <Form.Control size="sm" className="no-margins" style={{fontSize:"0.75em", height:"0.5em", margin:"0em", textAlign:"center"}} onChange={e => updateName(ItemFilter.TagVal, e.target.value)} aria-label="Text input with checkbox" defaultValue={ItemFilter.TagVal.Val} placeholder=""/>
                        </InputGroup>
                    </div>
                    
                </div>
            </div>
        </div>
    )
    // -------------------------------------------
}

const FilterMiscItem = (prop: any) => {
    const ItemFilter: FilterItem = prop.data
    const [_currentstate, returnactivetext] = useState(GetDisplayVal(ItemFilter));


    // Return result -----------------------------
    return (
        <div className="col">
            <div className="centerPosition">
                <div className={"hovermouse " + (_currentstate == "" ? "filterobjectdisplay" : _currentstate == "positive" ? "filterobjectdisplaypositive" : "filterobjectdisplaynegative")} onClick={() => SwitchStates(ItemFilter, returnactivetext)}>
                    {makestringpresentable(ItemFilter.Group)}: {makestringpresentable(ItemFilter.Name)}
                </div>
            </div>
        </div>
    )
    // -------------------------------------------
}


export {FilterTextItem, FilterTagItem, FilterMiscItem}