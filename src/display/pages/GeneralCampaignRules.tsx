import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { ViewCampaignRulesCollection } from '../../classes/viewmodel/collections/ViewCampaignRulesCollection'
import { AllCampaignRulesPage } from '../../classes/viewmodel/pages/AllCampaignRulesListPage'

import QuickRuleDisplay from '../../display/components/features/rules/QuickRuleDisplay'
import GenericDisplay from '../../display/components/generics/GenericDisplay'

const GeneralQuickRules = (prop: any) => {
    // Initialize controllers and managers
    const ViewPageController: AllCampaignRulesPage = prop.controller
    const ModelsCollectionController: ViewCampaignRulesCollection = ViewPageController.Collection;

    // Initialize Use State
    const [_activeItems] = useState(ModelsCollectionController.ModelsList);
    const [_foundItems] = useState(ModelsCollectionController.itemcollection);
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
                                                
                                                <GenericDisplay  d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <QuickRuleDisplay data={item}/>}/>
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