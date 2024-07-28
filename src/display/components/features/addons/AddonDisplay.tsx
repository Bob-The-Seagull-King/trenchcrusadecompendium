import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { PlayerAddon } from '../../../../classes/feature/addons/Addon';
import { returnTags } from '../../../../utility/util';

import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';

const AddonDisplay = (props: any) => {
    const ModelObject: PlayerAddon = props.data
    const bannedModelTags = ["empty"]

    function returnDescription() {
        return (
            <div>
                {ModelObject.Description.map((item) => (
                    <div key={"descriptionDisplay"}>
                        <ModelDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    return (
            <div className='modelInternalStructure'>
                <div>
                    {returnTags(ModelObject.Tags, bannedModelTags)}
                </div>
                <div className="verticalspacer"/>
                <div>
                    {returnDescription()}
                </div>
            </div>
    )
}

export default AddonDisplay;