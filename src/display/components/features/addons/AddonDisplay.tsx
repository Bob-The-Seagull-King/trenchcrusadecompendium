import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { PlayerAddon } from '../../../../classes/feature/addons/Addon';
import { returnTags, returnDescription } from '../../../../utility/util';

const AddonDisplay = (props: any) => {
    const ModelObject: PlayerAddon = props.data
    const bannedModelTags = ["empty"]

    return (
            <div className='modelInternalStructure'>
                <div>
                    {returnTags(ModelObject.Tags, bannedModelTags)}
                </div>
                <div className="verticalspacer"/>
                <div>
                    {returnDescription(ModelObject, ModelObject.Description)}
                </div>
            </div>
    )
}

export default AddonDisplay;