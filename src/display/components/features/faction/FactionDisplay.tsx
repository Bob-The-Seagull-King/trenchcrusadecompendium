import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour } from '../../../../utility/functions';
import { PlayerFaction } from '../../../../classes/feature/factions/Faction';
import {ITrenchCrusadeItemTag} from '../../../../classes/TrenchCrusadeItem'

import TagDisplay from '../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import FactionEquipDisplay from './FactionEquipDisplay';

const FactionDisplay = (props: any) => {
    const ModelObject: PlayerFaction = props.data
    const bannedModelTags = ["inflict", "type"]

    function returnEquipList() {
        return (
            <>
            <div className="row row-cols-lg-4 row-cols-md-2 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                {returnEquipTypeList("ranged")}
                {returnEquipTypeList("melee")}
                {returnEquipTypeList("armour")}
                {returnEquipTypeList("equipment")}
            </div>
            </>
        )
    }

    function returnEquipTypeList(type: string) {
        return (
            <div className="col">
                {ModelObject.Equipment.filter(item => (item.Object.Category == type)).map((item) => (
                    <div key={"flavourFaction"+(item.ID? item.ID : "")}>
                        <FactionEquipDisplay data={item}/>
                    </div>
                ))}
            </div>
        )
    }

    function returnFlavour() {
        return (
            <div>
                {ModelObject.Flavour.map((item) => (
                    <div key={"flavourFaction"+(ModelObject.Flavour.indexOf(item))}>
                        <ModelDescriptionItemDisplay data={item} parent={ModelObject}/>
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
                        <div className="separator">{item.Title.toLocaleUpperCase()}</div>
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
        <div className={'modelStructure bordermain'+getColour((ModelObject.ID? ModelObject.ID : "purple"))}>
            <h1 className={'titleShape title'+getColour((ModelObject.ID? ModelObject.ID : "purple"))}>{ModelObject.Name || ""}</h1>
            <div className='modelInternalStructure'>
                <div>
                    {returnTags()}
                </div>
                <div className="verticalspacer"/> 
                <div>
                    <div className="separator">&#x27E1;</div>
                </div> 
                <div>
                    {returnFlavour()}
                </div>
                <div className="verticalspacer"/>

                {(ModelObject.Rules.length > 0) &&
                    <>
                    <div>
                        {returnRules()}
                    </div>
                    </>
                }   

                <div>
                    <div className="separator">EQUIPMENT</div>
                </div>
                <div>
                    {returnEquipList()}
                </div>
                <div className="verticalspacer"/>          
            </div>
        </div>
    )
}

export default FactionDisplay;