import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { ViewTableReferenceCollection } from '../../classes/viewmodel/collections/ViewTableReferenceCollections'
import { AllTableReferenceListPage } from '../../classes/viewmodel/pages/AllTableReferenceListPage'
import { TableReferenceFilterManager } from '../../classes/viewmodel/collections/filters/TableReferenceFilterManager'

import GenericDisplay from '../../display/components/generics/GenericDisplay'
import ListGroupDisplay from '../../display/components/features/list/ListGroupDisplay'

const GeneralTableReferences = (prop: any) => {
    // Initialize controllers and managers
    const ViewPageController: AllTableReferenceListPage = prop.controller
    const ModelsCollectionController: ViewTableReferenceCollection = ViewPageController.Collection;
    const FilterManager: TableReferenceFilterManager = ViewPageController.FilterManager;

    // Initialize Use State
    const [_activeItems, returnstate] = useState(ModelsCollectionController.ModelsList);
    const [_foundItems, returntable] = useState(ModelsCollectionController.itemcollection);
    const [_keyval, updatekey] = useState(1);

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
                                                <GenericDisplay  d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <ListGroupDisplay data={item}/>}/>
                                                
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

export default GeneralTableReferences