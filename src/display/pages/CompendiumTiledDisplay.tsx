import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'

// Classes
import { ViewCollectionsModel } from '../../classes/viewmodel/collections/ViewCollectionsModel'
import { CollectionsListPage } from '../../classes/viewmodel/pages/CollectionsListPage'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

// Components
import { DisplayCollectionDataDex, DisplayCollectionType } from './DisplayPageStatic'

const CompendiumTiledDisplay = (prop: any) => {
    // Initialize controllers and managers
    const ViewPageController: CollectionsListPage = prop.controller
    const CollectionController: ViewCollectionsModel = ViewPageController.Collection;
    const DisplayPage: DisplayCollectionType = DisplayCollectionDataDex[ViewPageController.TypeName]

    // Initialize Use State
    const [_activeItems] = useState(CollectionController.ObjectList);
    const [_foundItems] = useState(CollectionController.itemcollection);
    const [_keyval] = useState(1);

    // Return result -----------------------------
        
    return (
        <div className="container">
            <div className="row">
                {/* Display the selected models, if any */}
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                    <div className="row p-3 overflow-auto flex-grow-1">
                        <div style={{"maxHeight": "calc(80vh)"}}>
                            <div className="col-12">
                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 768: 2}} >
                                    <Masonry gutter="20px">
                                        {_activeItems.map((item) => (
                                            <div className="col" key={"modelDisplay"+item.ID}>
                                                {DisplayPage.returnDisplay(item)}
                                                <br/>
                                            </div>
                                        ))}
                                    </Masonry>
                                </ResponsiveMasonry>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    // -------------------------------------------
}

export default CompendiumTiledDisplay