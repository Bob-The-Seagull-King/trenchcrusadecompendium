import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { QuickRule } from '../../../../classes/feature/rules/QuickRule';
import { returnDescription } from '../../../../utility/util';

const QuickRuleDisplay = (props: any) => {
    const ModelObject: QuickRule = props.data

    // Return faction rules
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
                        {returnDescription(ModelObject, item.Description)}
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
                    {returnDescription(ModelObject, ModelObject.Description)}
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