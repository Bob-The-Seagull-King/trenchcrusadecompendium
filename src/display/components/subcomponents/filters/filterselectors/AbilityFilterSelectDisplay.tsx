import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { AllAbilitiesListPage } from '../../../../../classes/viewmodel/pages/AllAbilitiesListPage'
import { AbilitiesFilterManager } from '../../../../../classes/viewmodel/collections/filters/AbilitiesFilterManager'

import FilterItemItem from '../FilterItemItem'
import FilterTagItem from '../FilterTagItem'
import FilterTextItem from '../FilterTextItem'
import FilterDisplay from '../FilterDisplay'

import Modal from 'react-bootstrap/Modal';

const AbilityFilterSelectDisplay = (prop: any) => {
    const ViewPageController: AllAbilitiesListPage = prop.controller
    const FilterManager: AbilitiesFilterManager = ViewPageController.FilterManager;
    const updatesearch = prop.runfunction;

    const [_activetextfilters, returnactivetext] = useState(FilterManager.ReturnActiveTextFilters());
    const [_activetagfilters, returnactivetag] = useState(FilterManager.ReturnActiveTagFilters());
    const [_activemiscfilters, returnactivemisc] = useState(FilterManager.ReturnActiveMiscFilters());
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
        updatekey(_keyval+1)
    }
    
    // Return result -----------------------------
    return (
        <>
            <div onClick={() => handleShow()}className='bordermainpurple roundBody hovermouse'>
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
                                    <FilterDisplay key={"tag"+item.TagType.Name+(_keyval.toString())} state={item.TagType.DoInclude? "positive" : "negative" } title={item.TagType.Name+" Tag"} value={item.TagVal.Val}/>
                                ))}
                            {_activemiscfilters.map((item) => (
                                    <FilterDisplay key={"tag"+item.Name+(_keyval.toString())} title={item.Group} state={item.DoInclude? "positive" : "negative" } value={item.Name}/>
                                ))}
                        </div>
                        <div className='toppad'></div>
                    </div>
                }
            </div>

            <Modal onEnterKeyDown={() => handleClose()} show={show}  contentClassName="filterboxStructure" dialogClassName="" size="xl" onHide={handleClose} keyboard={true}  centered>
                
                            <h1 className={'titleShape titlepurple'}>Select Filters</h1>
                            <Modal.Body >
                            <div className="row p-3 overflow-auto flex-grow-1">
                                <div style={{"maxHeight": "calc(70vh"}}>
                                    <div className="col-12">
                                <div className="separator"><h3>NAME</h3></div>
                                <div className="row">
                                    {FilterManager.ReturnTextFilters().map((item) => (
                                        <FilterTextItem data={item} key="name"/>
                                    ))}
                                </div>
                                <div className="separator"><h3>TAGS</h3></div>
                                <div className="subltenotetext">{"You can specify tag's value in the text box. Leave blank to find all of that tag."}
                                </div>
                                <div className='toppad'></div>
                                <div className="row">
                                    <div className="filterbox centerPosition">
                                        {FilterManager.ReturnTagFilters().map((item) => (
                                            <FilterTagItem key={"tag"+item.TagType.Name} data={item}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="separator"><h3>CHAPTERS</h3></div>
                                <div className="row">
                                    <div className='filterbox centerPosition'>
                                        {FilterManager.ReturnMiscFilters().filter((value) => (value.Group == "chapter")).map((item) => (
                                            <FilterItemItem key={"miscchapter"+item.Name} data={item} updatefunction={RunUpdate}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="separator"><h3>SOURCES</h3></div>
                                <div className="row">
                                    <div className='filterbox centerPosition'>
                                        {FilterManager.ReturnMiscFilters().filter((value) => (value.Group == "source")).map((item) => (
                                            <FilterItemItem key={"miscsource"+item.Name} data={item} />
                                        ))}
                                    </div>
                                </div>
                                <div className="separator"><h3>CLASSES</h3></div>
                                <div className="row">
                                    <div className='filterbox centerPosition'>
                                        {FilterManager.ReturnMiscFilters().filter((value) => (value.Group == "class_id")).map((item) => (
                                            <FilterItemItem key={"misclass"+item.Name} data={item} />
                                        ))}
                                    </div>
                                </div>
                                <div className="separator"><h3>JOBS</h3></div>
                                <div className="row">
                                    <div className='filterbox centerPosition'>
                                        {FilterManager.ReturnMiscFilters().filter((value) => (value.Group == "job_id")).map((item) => (
                                            <FilterItemItem key={"miscjob"+item.Name} data={item} />
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

export default AbilityFilterSelectDisplay