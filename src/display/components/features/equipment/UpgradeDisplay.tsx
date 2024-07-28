import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { FactionUpgrade } from '../../../../classes/feature/factions/FactionUpgrade';
import { returnDescription } from '../../../../utility/util';

const UpgradeDisplay = (props: any) => {
    const ModelObject: FactionUpgrade = props.data

    return (
            <div className='modelInternalStructure'>

                <div>
                {returnDescription(ModelObject, ModelObject.Description)}
                </div>
            </div>
    )
}

export default UpgradeDisplay;