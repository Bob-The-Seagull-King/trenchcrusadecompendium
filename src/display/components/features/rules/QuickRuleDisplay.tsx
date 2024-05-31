import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour, containsTag } from '../../../../utility/functions';
import { QuickRule } from '../../../../classes/feature/rules/QuickRule';
import {ITrenchCrusadeItemTag} from '../../../../classes/TrenchCrusadeItem'
import { makestringpresentable } from '../../../../utility/functions'

import TagDisplay from '../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import FactionEquipDisplay from '../faction/FactionEquipDisplay';

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
        <div className={'modelStructure bordermain'+getColour((ModelObject.ID? ModelObject.ID : "purple"))}>
            <h1 className={'titleShape title'+getColour((ModelObject.ID? ModelObject.ID : "purple"))}>{ModelObject.Name || ""}</h1>
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
        </div>
    )
}

export default QuickRuleDisplay;