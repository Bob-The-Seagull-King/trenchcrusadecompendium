import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { PlayerEquipment } from '../../../../classes/feature/equipment/Equipment';
import { returnTags, returnDescription } from '../../../../utility/util';

import ItemStat from '../../subcomponents/description/ItemStat';

const EquipmentDisplay = (props: any) => {
    const ModelObject: PlayerEquipment = props.data
    const bannedModelTags = ["empty"]

    // Returns the stats of the equipment item structured
    function returnStats() {
        return (
            <div>
                {((ModelObject.EquipType != null) && (ModelObject.Range != null) && (ModelObject.Modifiers != null)) &&
                <div className="row row-cols-lg-3 row-cols-md-3 row-cols-sx-3 row-cols-xs-3 row-cols-3 justify-content-center">
                    <ItemStat title={"Type"} value={ModelObject.EquipType}/>
                    <ItemStat title={"Range"} value={ModelObject.Range}/>
                    <ItemStat title={"Modifiers"} value={ModelObject.Modifiers.join(', ')}/>
                </div>
                }
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
                <i><p dangerouslySetInnerHTML={{__html: (ModelObject.Blurb)}}></p></i>
            </div> 
            <div className="verticalspacer"/> 
            
            {((ModelObject.EquipType != null) && (ModelObject.Range != null) ) &&
                <>
                    <div>
                        <div className="separator">&#x27E1;</div>
                    </div> 
                    
                    <div className="verticalspacer"/>
                    <div>
                        {returnStats()}
                    </div>
                </>
            }

            {ModelObject.Description.length != 0 &&
                <>
                    <div className="verticalspacer"/>
                    <div>
                        <div className="separator">&#x27E1;</div>
                    </div> 
                    <div className="verticalspacer"/>
                    <div>
                        {returnDescription(ModelObject, ModelObject.Description)}
                    </div>
                </>
            }
        </div>
    )
}

export default EquipmentDisplay;