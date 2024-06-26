import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { ViewQuickRulesCollection } from '../../classes/viewmodel/collections/ViewQuickRulesCollection'
import { AllQuickRulesPage } from '../../classes/viewmodel/pages/AllQuickRulesListPage'
import { QuickRulesFilterManager } from '../../classes/viewmodel/collections/filters/QuickRulesFilterManager'

import QuickRuleDisplay from '../../display/components/features/rules/QuickRuleDisplay'

const GeneralQuickRules = (prop: any) => {
    // Initialize controllers and managers
    const ViewPageController: AllQuickRulesPage = prop.controller
    const ModelsCollectionController: ViewQuickRulesCollection = ViewPageController.Collection;
    const FilterManager: QuickRulesFilterManager = ViewPageController.FilterManager;

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
                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 768: 2, 992: 3}} >
                                    <Masonry gutter="20px">
                                        {_activeItems.map((item) => (
                                            <div className="col" key={"modelDisplay"+item.ID}>
                                                <QuickRuleDisplay data={item}/>
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

export default GeneralQuickRules