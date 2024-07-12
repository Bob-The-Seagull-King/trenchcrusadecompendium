import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { AllSkillsListPage } from '../../../../../classes/viewmodel/pages/AllSkillsListPage'
import { SkillsFilterManager } from '../../../../../classes/viewmodel/collections/filters/SkillsFilterManager'

import FilterItemItem from '../FilterItemItem'
import FilterTagItem from '../FilterTagItem'
import FilterTextItem from '../FilterTextItem'
import FilterDisplay from '../FilterDisplay'

import { useGlobalState } from './../../../../../utility/globalstate'

import Modal from 'react-bootstrap/Modal';

const SkillFilterSelectDisplay = (prop: any) => {
    const ViewPageController: AllSkillsListPage = prop.controller
    const FilterManager: SkillsFilterManager = ViewPageController.FilterManager;
    const theme = prop.usetheme
    const handleClose = prop.closemodal;
    const RunUpdate = prop.update;
    const show = prop.useshow;
    
    // Return result -----------------------------
    return (
        <>
            
            <Modal data-theme={theme} show={show}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleClose} keyboard={true}  centered>
                
                            <h1 className={'titleShape titlestyler backgroundtc'}>Select Filters</h1>
                            <Modal.Body >
                            <div className="row p-3 overflow-auto flex-grow-1">
                                <div style={{"maxHeight": "calc(70vh"}}>
                                    <div className="col-12">
                                <div className="separator"><h3>Name</h3></div>
                                <div className="row">
                                    {FilterManager.ReturnTextFilters().map((item : any) => (
                                        <FilterTextItem data={item} key="name"/>
                                    ))}
                                </div>
                                <div className="separator"><h3>Tags</h3></div>
                                <div className="row">
                                    <div className="filterbox centerPosition">
                                        {FilterManager.ReturnTagFilters().map((item : any) => (
                                            <FilterItemItem key={"tag"+item.Name} data={item}/>
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

export default SkillFilterSelectDisplay