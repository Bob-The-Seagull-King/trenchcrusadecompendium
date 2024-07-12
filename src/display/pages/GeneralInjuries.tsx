import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { ViewInjuriesCollection } from '../../classes/viewmodel/collections/ViewInjuriesCollections'
import { InjuryFilterManager } from '../../classes/viewmodel/collections/filters/InjuryFilterManager'
import { AllInjuriesListPage } from '../../classes/viewmodel/pages/AllInjuriesListPage'


import ListItemDisplay from '../../display/components/features/list/ListItemDisplay'
import EquipmentFilterSelectDisplay from '../../display/components/subcomponents/filters/filterselectors/EquipmentFilterSelectDisplay'
import BaseFilterSelectDisplay from '../../display/components/subcomponents/filters/filterselectors/BaseFilterSelectDisplay'

const GeneralInjuries = (prop: any) => {
    // Initialize controllers and managers
    const ViewPageController: AllInjuriesListPage = prop.controller
    const ModelsCollectionController: ViewInjuriesCollection = ViewPageController.Collection;
    const FilterManager: InjuryFilterManager = ViewPageController.FilterManager;

    // Initialize Use State
    const [_activeItems, returnstate] = useState(ModelsCollectionController.ModelsList);
    const [_foundItems, returntable] = useState(ModelsCollectionController.itemcollection);
    const [_keyval, updatekey] = useState(1);

    // Functions -----------------------------------------------------------------------------------

    /**
     * Get the controller to update the search, then update
     * the state of the model/item list arrays. Update the
     * keyval in order to force a rerender of elements.
     */
    function UpdateSearch() {
        ViewPageController.updateSearch();
        returntable(RecallTable())
        returnstate(RecallModels())
        updatekey(_keyval+1)
    }

    /**
     * @returns Update the state of the models selected
     */
    function RecallModels() {
        const models = ModelsCollectionController.ReturnModels();
        return models;
    }

    /**
     * @returns Update the state of the items available to select
     */
    function RecallTable() {
        const table = ModelsCollectionController.ReturnItems();
        return table;
    }

    // Return result -----------------------------
    return (
        <div className="container">
            <div className="row">
                {/* Display the filters and models which match the filters, if any. */}
                {/* Display the selected models, if any */}
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                    <div className="row p-3 overflow-auto flex-grow-1">
                        <div style={{"maxHeight": "calc(80vh)"}}>
                            <div className="col-12">
                                <div className="row">
                                    <div className='col-12'>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        {_activeItems.length == 0 &&
                                            <div className="">
                                                <div className='borderstyler subbordergrey emptyboxStructure'>
                                                    <h1 className="subtletext">No Items Selected</h1>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="row row-cols-lg-1 row-cols-md-1 row-cols-sx-1 row-cols-xs-1 row-cols-1 pageaccessbox">
                                    <div className='col-12'>
                                        <div className="row row-cols-3">             
                                            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-3'>
                                                <h1 className='tabletitle'>Result</h1>
                                            </div>
                                            <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3'>
                                                <h1 className='tabletitle'>Name</h1>
                                            </div>
                                            <div className='col-lg-7 col-md-7 col-sm-7 col-xs-6'>
                                                <h1 className='tabletitle'>Description</h1>
                                            </div>
                                        </div>
                                    </div>
                                    {_activeItems.map((item) => (
                                        <div className="col" key={"modelDisplay"+item.ID}>
                                            <div>
                                                <div className="separator"></div>
                                            </div> 
                                            <ListItemDisplay data={item}/>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    // -------------------------------------------
}

export default GeneralInjuries