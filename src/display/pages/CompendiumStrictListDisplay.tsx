import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'

// Classes
import { ViewCollectionsModel } from '../../classes/viewmodel/collections/ViewCollectionsModel'
import { CollectionsListPage } from '../../classes/viewmodel/pages/CollectionsListPage'

// Components
import { DisplayCollectionDataDex, DisplayCollectionType } from './DisplayPageStatic'

const CompendiumStrictListDisplay = (prop: any) => {
    // Initialize controllers and managers
    const ViewPageController: CollectionsListPage = prop.controller
    ViewPageController.initCollection();
    const CollectionController: ViewCollectionsModel = ViewPageController.Collection;
    const DisplayPage: DisplayCollectionType = DisplayCollectionDataDex[ViewPageController.TypeName]

    // Initialize Use State
    const [_activeItems] = useState(CollectionController.ObjectList);
    const [_foundItems] = useState(CollectionController.itemcollection);
    const [_keyval] = useState(1);

    // Functions -----------------------------------------------------------------------------------

    // Return result -----------------------------
    
    // Return result -----------------------------
    return (
        <div className="container">
            <link rel="canonical" href="http://trench-companion.com/" />
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

export default CompendiumStrictListDisplay