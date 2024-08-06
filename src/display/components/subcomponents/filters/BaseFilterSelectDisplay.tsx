import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

// Classes
import { FilterManager } from '../../../../classes/viewmodel/collections/filters/FilterManager'
import { useGlobalState } from '../../../../utility/globalstate'
import { CollectionsListPage } from '../../../../classes/viewmodel/pages/CollectionsListPage'

// Components
import FilterDisplay from './FilterDisplay'
import { DisplayCollectionType, DisplayCollectionDataDex } from '../../../pages/DisplayPageStatic'

const BaseFilterSelectDisplay = (prop: any) => {
    const ViewPageController: CollectionsListPage = prop.controller
    const FilterManager: FilterManager = ViewPageController.FilterManager;
    const DisplayPage: DisplayCollectionType = DisplayCollectionDataDex[ViewPageController.TypeName]

    const updatesearch = prop.runfunction;

    // States
    const [_activetextfilters, returnactivetext] = useState(FilterManager.ReturnActiveTextFilters());
    const [_activetagfilters, returnactivetag] = useState(FilterManager.ReturnActiveTagFilters());
    const [_activemiscfilters, returnactivemisc] = useState(FilterManager.ReturnActiveMiscFilters());
    const [_activestatfilters, returnactivestat] = useState(FilterManager.ReturnActiveStatFilters());
    const [_keyval, updatekey] = useState(1);
    const [theme] = useGlobalState('theme');
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        RunUpdate();
    };
    const handleShow = () => setShow(true);

    /**
     * Call the parent's update function and update
     * the filter manager's suite of filters.
     */
    function RunUpdate() {
        updatesearch();
        returnactivetext(FilterManager.ReturnActiveTextFilters())
        returnactivetag(FilterManager.ReturnActiveTagFilters())
        returnactivemisc(FilterManager.ReturnActiveMiscFilters())
        returnactivestat(FilterManager.ReturnActiveStatFilters())
        updatekey(_keyval+1)
    }
    
    // Return result -----------------------------
    return (
        <>
            <div onClick={() => handleShow()}className='borderstyler bordericon roundBody hovermouse'>
                {((_activetextfilters.length == 0) && (_activetagfilters.length == 0) && (_activemiscfilters.length == 0) ) &&
                    <div className="">
                            <h1 className="subtletext">No Filters Selected</h1>
                    </div>
                }
                {!((_activetextfilters.length == 0) && (_activetagfilters.length == 0) && (_activemiscfilters.length == 0) ) &&
                    <div className="row">
                        
                        <div style={{paddingLeft: "2em", paddingRight: "2em", paddingTop: "1em", paddingBottom: "0.5em"}}>
                            <div className="separator"><h3>FILTERS</h3></div>
                        </div>
                        <div className="filterbox centerPosition">
                            {_activetextfilters.map((item) => (
                                    <FilterDisplay key={"tag"+item.Val+(_keyval.toString())} state={""} title={"Name"} value={item.Val}/>
                                ))}
                            {_activetagfilters.map((item) => (
                                    <FilterDisplay key={"tag"+item.Name+(_keyval.toString())} state={item.DoInclude? "positive" : "negative" } title={item.Name+" Tag"}/>
                                ))}
                            {_activemiscfilters.map((item) => (
                                    <FilterDisplay key={"tag"+item.Name+(_keyval.toString())} title={item.Group} state={item.DoInclude? "positive" : "negative" } value={item.Name}/>
                                ))}
                            {_activestatfilters.map((item) => (
                                    <FilterDisplay key={"tag"+item.TagType.Name+(_keyval.toString())} state={item.TagType.DoInclude? "positive" : "negative" } title={item.TagType.Name+" Tag"} value={item.TagVal.Val}/>
                                ))}
                        </div>
                        <div className='toppad'></div>
                    </div>
                }
            </div>

            <Modal data-theme={theme} show={show} contentClassName="filterboxStructure" dialogClassName="" size="xl" onHide={handleClose} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>Select Filters</h1>
                <Modal.Body className="filterSelectorBack">
                    <div className="row p-3 overflow-auto flex-grow-1">
                        <div style={{"maxHeight": "calc(70vh"}}>
                            {DisplayPage.returnFilterSelect(FilterManager, RunUpdate, handleClose)}
                        </div>
                    </div>
                
                </Modal.Body>
            </Modal>
        </>
    )
    // -------------------------------------------
}

export default BaseFilterSelectDisplay