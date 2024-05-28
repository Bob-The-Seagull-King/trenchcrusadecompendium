import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { AllModelsListPage } from '../../../../../classes/viewmodel/pages/AllModelsListPage'
import { ModelsFilterManager } from '../../../../../classes/viewmodel/collections/filters/ModelsFilterManager'

import FilterItemItem from '../FilterItemItem'
import FilterTagItem from '../FilterTagItem'
import FilterTextItem from '../FilterTextItem'
import FilterDisplay from '../FilterDisplay'

import Modal from 'react-bootstrap/Modal';

const ModelFilterSelectDisplay = (prop: any) => {
    const ViewPageController: AllModelsListPage = prop.controller
    const FilterManager: ModelsFilterManager = ViewPageController.FilterManager;
    const updatesearch = prop.runfunction;

    const [_activetextfilters, returnactivetext] = useState(FilterManager.ReturnActiveTextFilters());
    const [_activetagfilters, returnactivetag] = useState(FilterManager.ReturnActiveTagFilters());
    const [_activemiscfilters, returnactivemisc] = useState(FilterManager.ReturnActiveMiscFilters());
    const [_activestatfilters, returnactivestat] = useState(FilterManager.ReturnActiveStatFilters());
    const [_keyval, updatekey] = useState(1);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        RunUpdate();
    };
    const handleShow = () => setShow(true);

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
            <div onClick={() => handleShow()}className='bordermainpurple roundBody hovermouse'>
                {((_activetextfilters.length == 0) && (_activetagfilters.length == 0) && (_activemiscfilters.length == 0) && (_activestatfilters.length == 0) ) &&
                    <div className="">
                            <h1 className="subtletext">No Filters Selected</h1>
                    </div>
                }
                {!((_activetextfilters.length == 0) && (_activetagfilters.length == 0) && (_activemiscfilters.length == 0) && (_activestatfilters.length == 0) ) &&
                    <div className="row">
                        
                        <div style={{paddingLeft: "2em", paddingRight: "2em", paddingTop: "1em", paddingBottom: "0.5em"}}>
                            <div className="separator"><h3>Filters</h3></div>
                        </div>
                        <div className="filterbox centerPosition">
                            {_activetextfilters.map((item) => (
                                    <FilterDisplay key={"tag"+item.Val+(_keyval.toString())} state={""} title={"Name"} value={item.Val}/>
                                ))}
                            {_activetagfilters.map((item) => (
                                    <FilterDisplay key={"tag"+item.Name+(_keyval.toString())} state={item.DoInclude? "positive" : "negative" } title={item.Group} value={item.Name}/>
                                ))}
                            {_activemiscfilters.map((item) => (
                                    <FilterDisplay key={"tag"+item.Name+(_keyval.toString())} title={item.Group} state={item.DoInclude? "positive" : "negative" } value={item.Name}/>
                                ))}
                            {_activestatfilters.map((item) => (
                                    <FilterDisplay key={"tag"+item.TagType.Name+(_keyval.toString())} title={item.TagType.Name} state={item.TagType.DoInclude? "positive" : "negative" } value={item.TagVal.Val}/>
                                ))}
                        </div>
                        <div className='toppad'></div>
                    </div>
                }
            </div>

            <Modal show={show}  contentClassName="filterboxStructure" dialogClassName="" size="xl" onHide={handleClose} keyboard={true}  centered>
                
                            <h1 className={'titleShape titlepurple'}>Select Filters</h1>
                            <Modal.Body >
                            <div className="row p-3 overflow-auto flex-grow-1">
                                <div style={{"maxHeight": "calc(70vh"}}>
                                    <div className="col-12">
                                <div className="separator"><h3>Name</h3></div>
                                <div className="row">
                                    {FilterManager.ReturnTextFilters().map((item) => (
                                        <FilterTextItem data={item} key="name"/>
                                    ))}
                                </div>
                                <div className="separator"><h3>Tags</h3></div>
                                <div className="row">
                                    <div className="filterbox centerPosition">
                                        {FilterManager.ReturnTagFilters().map((item) => (
                                            <FilterItemItem key={"tag"+item.Name} data={item}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="separator"><h3>Factions</h3></div>
                                <div className="row">
                                    <div className='filterbox centerPosition'>
                                        {FilterManager.ReturnMiscFilters().filter((value) => (value.Group == "faction_id")).map((item) => (
                                            <FilterItemItem key={"misclass"+item.Name} data={item} />
                                        ))}
                                    </div>
                                </div>
                                <div className="separator"><h3>Variants</h3></div>
                                <div className="row">
                                    <div className='filterbox centerPosition'>
                                        {FilterManager.ReturnMiscFilters().filter((value) => (value.Group == "variant_id")).map((item) => (
                                            <FilterItemItem key={"misclass"+item.Name} data={item} />
                                        ))}
                                    </div>
                                </div>
                                <div className="separator"><h3>Statistics</h3></div>
                                <div className="subltenotetext">{"You can specify stat's value in the text box. Leave blank to find all of that stat."}
                                </div>
                                <div className='toppad'></div>
                                <div className="row">
                                    <div className="filterbox centerPosition">
                                        {FilterManager.ReturnStatFilters().map((item) => (
                                            <FilterTagItem key={"tag"+item.TagType.Name} data={item}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="separator"><h3>Sources</h3></div>
                                <div className="row">
                                    <div className='filterbox centerPosition'>
                                        {FilterManager.ReturnMiscFilters().filter((value) => (value.Group == "source")).map((item) => (
                                            <FilterItemItem key={"miscsource"+item.Name} data={item} />
                                        ))}
                                    </div>
                                </div>
                                <div className='separator toppad'></div>
                                <div className="row float-end">
                                    <div className='col-12 float-end'>
                                        <div className='hovermouse filterclosebutton' onClick={() => {handleClose()}}>CONFIRM</div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                
                </Modal.Body>
            </Modal>
        </>
    )
    // -------------------------------------------
}

export default ModelFilterSelectDisplay