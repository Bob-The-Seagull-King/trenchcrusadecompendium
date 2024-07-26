import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { AllModelsListPage } from '../../../../../classes/viewmodel/pages/AllModelsListPage'
import { ModelsFilterManager } from '../../../../../classes/viewmodel/collections/filters/ModelsFilterManager'

import FilterItemItem from '../FilterItemItem'
import FilterTagItem from '../FilterTagItem'
import FilterTextItem from '../FilterTextItem'

import Modal from 'react-bootstrap/Modal';

const ModelFilterSelectDisplay = (prop: any) => {
    const ViewPageController: AllModelsListPage = prop.controller
    const FilterManager: ModelsFilterManager = ViewPageController.FilterManager;
    const theme = prop.usetheme
    const handleClose = prop.closemodal;
    const show = prop.useshow;
    
    // Return result -----------------------------
    return (
        <>

            <Modal data-theme={theme} show={show}  contentClassName="filterboxStructure" dialogClassName="" size="xl" onHide={handleClose} keyboard={true}  centered>
                
                            <h1 className={'titleShape titlestyler backgroundtc'}>Select Filters</h1>
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