import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { FactionUpgrade } from '../../../../classes/feature/factions/FactionUpgrade';

import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';

const UpgradeDisplay = (props: any) => {
    const ModelObject: FactionUpgrade = props.data

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
            <div className='modelInternalStructure'>

                <div>
                    {returnDescription()}
                </div>
            </div>
    )
}

export default UpgradeDisplay;