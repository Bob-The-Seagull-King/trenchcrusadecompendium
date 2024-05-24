import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { GlossaryRule } from '../../../../classes/feature/glossary/Glossary'
import AbilityDescriptionItemDisplay from '../description/AbilityDescriptionItemDisplay'

const GlossaryDisplay = (props: any) => {
    const ruleObject: GlossaryRule = props.data

    function returnDescription() {
        return (
            <div>
                {ruleObject.Description.map((item) => (
                    <div key={"descriptionDisplay"}>
                        <AbilityDescriptionItemDisplay data={item} parent={ruleObject}/>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={'abilityStructure bordermainpurple'}>
            <h1 className={'titleShape titlepurple'}>{ruleObject.Name || ""}</h1>
            <div className='abilityInternalStructure'>
                <div>
                    {returnDescription()}
                </div>
            </div>
        </div>
    )
}

export default GlossaryDisplay;