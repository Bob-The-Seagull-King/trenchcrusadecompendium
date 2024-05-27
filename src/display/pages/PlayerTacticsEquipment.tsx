import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { ViewEquipmentCollection } from '../../classes/viewmodel/collections/ViewEquipmentCollections'
import { EquipmentFilterManager } from '../../classes/viewmodel/collections/filters/EquipmentFilterManager'
import { AllEquipmentListPage } from '../../classes/viewmodel/pages/AllEquipmentListPage'

import EquipmentDisplay from '../../display/components/features/equipment/EquipmentDisplay'
import ViewTableItemDisplay from '../../display/components/subcomponents/list/ViewTableItemDisplay'
import EquipmentFilterSelectDisplay from '../../display/components/subcomponents/filters/filterselectors/EquipmentFilterSelectDisplay'

const PlayerTacticsModels = (prop: any) => {
    // Initialize controllers and managers
    const ViewPageController: AllEquipmentListPage = prop.controller
    const ModelsCollectionController: ViewEquipmentCollection = ViewPageController.Collection;
    const FilterManager: EquipmentFilterManager = ViewPageController.FilterManager;

    // Initialize Use State
    const [_activeItems, returnstate] = useState(ModelsCollectionController.ModelsList);
    const [_foundItems, returntable] = useState(ModelsCollectionController.itemcollection);
    const [_keyval, updatekey] = useState(1);

    let listcolourval = 0;

    // Functions -----------------------------------------------------------------------------------

    /**
     * @return the current colour value + 1
     */
    function getcolor() {
        listcolourval += 1;
        return listcolourval;
    }

    /**
     * Update state of the list of models currently active
     */
    function ItemRecall() {
        returnstate(RecallModels())
    }

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

    /**
     * @returns The filter display component
     */
    function ReturnSearchFilterBox() {
        return (
            <EquipmentFilterSelectDisplay controller={ViewPageController} runfunction={UpdateSearch}/>
        )
    }

    // Return result -----------------------------
    return (
        <div className="container">
            <div className="row">
                {/* Display the filters and models which match the filters, if any. */}
                <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 col-12 my-0 py-0">
                    <div className="row p-3 overflow-auto flex-grow-1">
                        <div style={{"maxHeight": "calc(80vh)"}}>
                            <div className="col-12">
                                <div className="row">
                                    <div className='col-12'>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        {ReturnSearchFilterBox()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <div className='bordermainpurple roundBody no-padding '>
                                            {_foundItems.length == 0 && 
                                                <div className="">
                                                    <h1 className="subtletext">No Models Found</h1>
                                                </div>
                                            }
                                            {_foundItems.map((item) => (
                                                <div className="col-12 my-0 py-0 no-margin" key={"tableItemDisplay"+item.HeldItem.ID+(_keyval.toString())}>
                                                    <ViewTableItemDisplay key={"tableItemDisplay"+item.HeldItem.ID+(_keyval.toString())} data={item} parent={ModelsCollectionController} statefunction={ItemRecall} positionid={getcolor}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Display the selected models, if any */}
                <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 col-12">
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
                                                <div className='bordersubgrey emptyboxStructure'>
                                                    <h1 className="subtletext">No Items Selected</h1>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="row row-cols-lg-1 row-cols-md-1 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                                    {_activeItems.map((item) => (
                                        <div className="col" key={"modelDisplay"+item.ID}>
                                            <EquipmentDisplay data={item}/>
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

export default PlayerTacticsModels