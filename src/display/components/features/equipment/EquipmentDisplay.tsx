import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour } from '../../../../utility/functions';
import { PlayerEquipment } from '../../../../classes/feature/equipment/Equipment';
import {ITrenchCrusadeItemTag} from '../../../../classes/TrenchCrusadeItem'

import TagDisplay from '../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import ModelStat from '../../subcomponents/description/ModelStat';

const EquipmentDisplay = (props: any) => {
    const ModelObject: PlayerEquipment = props.data
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

    function returnStats() {
        return (
            <div>
                {((ModelObject.EquipType != null) && (ModelObject.Range != null) && (ModelObject.Modifiers != null)) &&
                <div className="row row-cols-lg-3 row-cols-md-3 row-cols-sx-3 row-cols-xs-3 row-cols-3 justify-content-center">
                    <ModelStat title={"Type"} value={ModelObject.EquipType}/>
                    <ModelStat title={"Range"} value={ModelObject.Range}/>
                    <ModelStat title={"Modifiers"} value={ModelObject.Modifiers.join(', ')}/>
                </div>
                }
            </div>
        )
    }

    function returnTags() {
        const displaytags = sortTagsForDisplay()

        return (
            <div className="tagBox">
                    {displaytags.map((item) => (
                        <div key={"tagDisplay"+item.tag_name+item.val}>
                            <TagDisplay data={item}/>
                        </div>
                    ))}
            </div>
        )
    }

    function sortTagsForDisplay() {
        const tagarray: ITrenchCrusadeItemTag[] = []

        let i = 0;
        for (i = 0; i < (ModelObject.Tags?.length || 0); i++) {
            if (ModelObject.Tags != undefined) {
                const temptag: ITrenchCrusadeItemTag = ModelObject.Tags[i]

                if ((temptag.tag_name == "blast_size") || (temptag.tag_name == "blast_distance")) {
                    temptag.tag_name = "blast"; }

                if (!bannedModelTags.includes(temptag.tag_name)) {
                    tagarray.push(temptag);
                }}}
        return tagarray;
    }

    return (
        <div className={'modelStructure borderstyler border'+getColour("tc")}>
            <h1 className={'titleShape titlestyler background'+getColour("tc")}>{ModelObject.Name || ""}</h1>
            <div className='modelInternalStructure'>
                <div>
                    {returnTags()}
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
                    {returnDescription()}
                </div>
                </>
                }
            </div>
        </div>
    )
}

export default EquipmentDisplay;