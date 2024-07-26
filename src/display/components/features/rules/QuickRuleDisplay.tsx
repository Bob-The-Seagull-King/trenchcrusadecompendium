import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { QuickRule } from '../../../../classes/feature/rules/QuickRule';

import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';

const QuickRuleDisplay = (props: any) => {
    const ModelObject: QuickRule = props.data

    function returnDescription() {
        return (
            <div>
                {ModelObject.Description.map((descitem) => (
                    <div key={"flavourFaction"+(descitem.Content? descitem.Content : "")}>
                        <ModelDescriptionItemDisplay data={descitem} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    function returnRules() {
        return (
            <>
            {ModelObject.Rules.map((item) => (
                <div key={"flavourFaction"+(item.Title? item.Title : "")}>
                    <div className="verticalspacer"/> 
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
                    <div className="verticalspacer"/>
                </div>
            ))}
            </>
        )
    }

    return (
        
            <div className='modelInternalStructure'>
                <>
                    <div>
                        {returnDescription()}
                    </div>
                </>

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

export default QuickRuleDisplay;