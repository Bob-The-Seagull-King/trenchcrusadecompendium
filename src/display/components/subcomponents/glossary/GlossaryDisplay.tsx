import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { GlossaryRule } from '../../../../classes/feature/glossary/Glossary'
import ModelDescriptionItemDisplay from '../description/ModelDescriptionItemDisplay'

const GlossaryDisplay = (props: any) => {
    const ruleObject: GlossaryRule = props.data

    function returnDescription() {
        return (
            <div>
                {ruleObject.Description.map((item) => (
                    <div key={"descriptionDisplay"}>
                        <ModelDescriptionItemDisplay data={item} parent={ruleObject}/>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={'modelStructure borderstyler bordertc'}>
            <h1 className={'titleShape titlestyler backgroundtc'}>{ruleObject.Name || ""}</h1>
            <div className='modelInternalStructure'>
                <div>
                    {returnDescription()}
                </div>
            </div>
        </div>
    )
}

export default GlossaryDisplay;