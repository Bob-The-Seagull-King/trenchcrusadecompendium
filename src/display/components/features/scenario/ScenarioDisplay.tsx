import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { Scenario } from '../../../../classes/feature/scenarios/Scenario';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';

const ScenarioDisplay = (props: any) => {
    const ModelObject: Scenario = props.data

    function returnRules() {
        return (
            <>
            <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 768: 2}} >
                <Masonry gutter="20px">
                    {ModelObject.Rules.map((item) => (
                        
                        <div key={"flavourFaction"+(item.Title? item.Title : "")}>
                            <div>
                                <div className="separator">{item.Title}</div>
                            </div> 
                            <div>
                                {item.Description.map((descitem) => (
                                    <div key={"flavourFaction"+(descitem.Content? descitem.Content : "")}>
                                        <ModelDescriptionItemDisplay data={descitem} parent={ModelObject}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                                    
                    ))}
                </Masonry>
            </ResponsiveMasonry>
            </>
        )
    }


    return (
            <div className='modelInternalStructure'>
                <img src={ModelObject.ImageUrl} style={{width:"100%"}}/>
                {(ModelObject.Rules.length > 0) &&
                    <>
                    <div>
                        {returnRules()}
                    </div>
                    </>
                }     
            </div>
    )
}

export default ScenarioDisplay;