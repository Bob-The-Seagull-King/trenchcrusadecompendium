import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'

// Classes
import { ViewCollectionsModel } from '../../classes/viewmodel/collections/ViewCollectionsModel'
import { CollectionsListPage } from '../../classes/viewmodel/pages/CollectionsListPage'

// Components
import ViewTableItemDisplay from '../../display/components/subcomponents/list/ViewTableItemDisplay'
import BaseFilterSelectDisplay from '../components/subcomponents/filters/BaseFilterSelectDisplay'
import { DisplayCollectionDataDex, DisplayCollectionType } from './DisplayPageStatic'

const BaseDisplayCompendium = (prop: any) => {
    // Initialize controllers and managers
    const ViewPageController: CollectionsListPage = prop.controller
    const CollectionController: ViewCollectionsModel = ViewPageController.Collection;
    const DisplayPage: DisplayCollectionType = DisplayCollectionDataDex[ViewPageController.TypeName]

    // Initialize Use State
    const [_activeItems, returnstate] = useState(CollectionController.ObjectList);
    const [_foundItems, returntable] = useState(CollectionController.itemcollection);
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
     * Update state of the list of abilities currently active
     */
    function ItemRecall() {
        returnstate(CollectionController.ReturnObjects())
    }

    /**
     * Get the controller to update the search, then update
     * the state of the ability/item list arrays. Update the
     * keyval in order to force a rerender of elements.
     */
    function UpdateSearch() {
        ViewPageController.updateSearch();
        returntable(CollectionController.ReturnItems())
        returnstate(CollectionController.ReturnObjects())
        updatekey(_keyval+1)
    }

    // Return result -----------------------------
    return (
        <div className="container">
            <div className="row">
                {/* Display the filters and abilities which match the filters, if any. */}
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
                                        <BaseFilterSelectDisplay controller={ViewPageController} runfunction={UpdateSearch}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <div className='borderstyler bordericon roundBody no-padding '>
                                            {_foundItems.length == 0 && 
                                                <div className="">
                                                    <h1 className="subtletext">No {ViewPageController.Collection.CollectionType.pageName} Found</h1>
                                                </div>
                                            }
                                            {_foundItems.map((item) => (
                                                <div className="col-12 my-0 py-0 no-margin" key={"tableItemDisplay"+item.HeldItem.ID+(_keyval.toString())}>
                                                    <ViewTableItemDisplay key={"tableItemDisplay"+item.HeldItem.ID+(_keyval.toString())} data={item} parent={CollectionController} statefunction={ItemRecall} positionid={getcolor}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Display the selected abilities, if any */}
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
                                                <div className='borderstyler subbordergrey emptyboxStructure'>
                                                    <h1 className="subtletext">No Items Selected</h1>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="row row-cols-lg-1 row-cols-md-1 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                                    {_activeItems.map((item) => (
                                        <div className="col" key={"itemDisplay"+item.ID}>
                                            {DisplayPage.returnDisplay(item)}
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

export default BaseDisplayCompendium