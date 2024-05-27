import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour } from '../../../../utility/functions';
import {PlayerModel } from "../../../../classes/feature/models/Model";
import {ITrenchCrusadeItemTag} from '../../../../classes/TrenchCrusadeItem'

import TagDisplay from '../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import ModelStat from '../../subcomponents/description/ModelStat';

const ModelDisplay = (props: any) => {
    const ModelObject: PlayerModel = props.data
    const bannedModelTags = ["inflict", "type"]

    function returnEquipment() {
        return (
            <div>
                {ModelObject.Equipment.map((item) => (
                    <div key={"equipmentDisplay"+(item.Content? item.Content : "")}>
                        <ModelDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    function returnStats() {
        return (
            <div>
                <div className="row row-cols-lg-7 row-cols-md-4 row-cols-sx-4 row-cols-xs-2 row-cols-2 justify-content-center">
                    <ModelStat title={"Cost"} value={ModelObject.Cost.toString() + " " + ModelObject.CostID}/>
                    <ModelStat title={"Base"} value={ModelObject.Base + "mm"}/>
                    <ModelStat title={"Movement"} value={ModelObject.Movement}/>
                    <ModelStat title={"Armour"} value={ModelObject.Armour}/>
                    <ModelStat title={"Ranged"} value={(ModelObject.Ranged.length > 0)? ModelObject.Ranged + " DICE" : "N/A"}/>
                    <ModelStat title={"Melee"} value={(ModelObject.Melee.length > 0)? ModelObject.Melee + " DICE" : "N/A"}/>
                    <ModelStat title={"Limit"} value={(ModelObject.Limit.length > 0)? ModelObject.Limit : "N/A"}/>
                </div>
            </div>
        )
    }

    function returnAbilities() {
        return (
            <div>
                {ModelObject.Abilities.map((item) => (
                    <div key={"abilitiesDisplay"+(item.Content? item.Content : "")}>
                        <ModelDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
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
        <div className={'modelStructure bordermain'+getColour(ModelObject.Faction)}>
            <h1 className={'titleShape title'+getColour(ModelObject.Faction)}>{ModelObject.Name || ""}</h1>
            <div className='modelInternalStructure'>
                <div>
                    {returnTags()}
                </div>
                <div className="verticalspacer"/>
                <div>
                    <i>{ModelObject.Blurb || ""}</i>
                </div> 
                <div className="verticalspacer"/> 
                <div>
                    <div className="separator">&#x27E1;</div>
                </div> 
                
                <div className="verticalspacer"/>
                <div>
                    {returnStats()}
                </div>
                <div className="verticalspacer"/>
                <div>
                    <div className="separator">&#x27E1;</div>
                </div> 
                
                <div className="verticalspacer"/>
                <div>
                    {returnEquipment()}
                </div>
                <div className="verticalspacer"/>
                <div>
                    <div className="separator">&#x27E1;</div>
                </div> 
                <div className="verticalspacer"/>
                <div>
                    {returnAbilities()}
                </div>
            </div>
        </div>
    )
}

export default ModelDisplay;