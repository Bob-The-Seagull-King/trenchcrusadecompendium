import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { AllEquipmentListPage } from '../../../../../classes/viewmodel/pages/AllEquipmentListPage'
import { EquipmentFilterManager } from '../../../../../classes/viewmodel/collections/filters/EquipmentFilterManager'

import FilterItemItem from '../FilterItemItem'
import FilterTextItem from '../FilterTextItem'

import Modal from 'react-bootstrap/Modal';

const EquipmentFilterSelectDisplay = (prop: any) => {
    const ViewPageController: AllEquipmentListPage = prop.controller
    const FilterManager: EquipmentFilterManager = ViewPageController.FilterManager;
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
                                <div className="separator"><h3>Category</h3></div>
                                <div className="row">
                                    <div className='filterbox centerPosition'>
                                        {FilterManager.ReturnMiscFilters().filter((value) => (value.Group == "category")).map((item) => (
                                            <FilterItemItem key={"misccategory"+item.Name} data={item} />
                                        ))}
                                    </div>
                                </div>
                                <div className="separator"><h3>Type</h3></div>
                                <div className="row">
                                    <div className='filterbox centerPosition'>
                                        {FilterManager.ReturnMiscFilters().filter((value) => (value.Group == "equip_type")).map((item) => (
                                            <FilterItemItem key={"miscequiptype"+item.Name} data={item} />
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

export default EquipmentFilterSelectDisplay