import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour } from '../../../../utility/functions';
import { FactionUpgrade } from '../../../../classes/feature/factions/FactionUpgrade';
import {ITrenchCrusadeItemTag} from '../../../../classes/TrenchCrusadeItem'

import TagDisplay from '../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import ModelStat from '../../subcomponents/description/ModelStat';

const UpgradeDisplay = (props: any) => {
    const ModelObject: FactionUpgrade = props.data
    const bannedModelTags = ["inflict", "type"]

    function returnDescription() {
        return (
            <div>
                {ModelObject.Description.map((item) => (
                    <div key={"descriptionDisplay"+(item.Content? item.Content : "")}>
                        <ModelDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={'modelStructure borderstyler border'+getColour("tc")}>
            <h1 className={'titleShape titlestyler background'+getColour("tc")}>{ModelObject.Name || ""}</h1>
            <div className='modelInternalStructure'>

                <div>
                    {returnDescription()}
                </div>
            </div>
        </div>
    )
}

export default UpgradeDisplay;