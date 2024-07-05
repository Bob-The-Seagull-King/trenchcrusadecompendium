import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour, containsTag } from '../../../../utility/functions';
import { PlayerFaction } from '../../../../classes/feature/factions/Faction';
import {ITrenchCrusadeItemTag} from '../../../../classes/TrenchCrusadeItem'
import { makestringpresentable } from '../../../../utility/functions'

import TagDisplay from '../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import FactionEquipDisplay from './FactionEquipDisplay';
import FactionModelDisplay from './FactionModelDisplay';
import FactionLorePanel from '../../subcomponents/informationpanel/FactionLorePanel';

const FactionDisplay = (props: any) => {
    const ModelObject: PlayerFaction = props.data
    const bannedModelTags = ["inflict", "type"]

    function returnModelList() {
        return (
            <>
            <div className="row row-cols-lg-2 row-cols-md-2 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                {(ModelObject.Models.filter(item => (containsTag(item.Object.Tags, "elite"))).length > 0) &&
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div style={{marginBottom:"-0.25em"}} className="equipgrouptext">{makestringpresentable("ELITE")}</div>
                            </div>
                            <div className="row row-cols-3">

                            <div className="col-5">
                                    <div className="equiptitle">Name</div>
                                </div>
                                <div className="col-3">
                                    <div className="equiptitle">Cost</div>
                                </div>
                                <div className="col-4">
                                    <div className="equiptitle">Limit</div>
                                </div>
                            </div>
                        </div>
                        {ModelObject.Models.filter(item => (containsTag(item.Object.Tags, "elite"))).map((item) => (
                            <div key={"flavourFaction"+(item.ID? item.ID : "")}>
                                <FactionModelDisplay data={item}/>
                            </div>
                        ))}
                    </div>
                </div>
                }
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div style={{marginBottom:"-0.25em"}} className="equipgrouptext">{makestringpresentable("INFANTRY")}</div>
                            </div>
                            <div className="row row-cols-3">

                            <div className="col-5">
                                    <div className="equiptitle">Name</div>
                                </div>
                                <div className="col-3">
                                    <div className="equiptitle">Cost</div>
                                </div>
                                <div className="col-4">
                                    <div className="equiptitle">Limit</div>
                                </div>
                            </div>
                        </div>
                        {ModelObject.Models.filter(item => (!containsTag(item.Object.Tags, "elite"))).map((item) => (
                            <div key={"flavourFaction"+(item.ID? item.ID : "")}>
                                <FactionModelDisplay data={item}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </>
        )
    }

    function returnEquipList() {
        return (
            <>
            <div className="row row-cols-lg-2 row-cols-md-2 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                <div className="col">
                    {returnEquipTypeList("ranged")}
                    <div className="verticalspacer"/>
                    {returnEquipTypeList("armour")}
                </div>
                <div className="col">
                    {returnEquipTypeList("melee")}
                    <div className="verticalspacer"/>
                    {returnEquipTypeList("equipment")}
                </div>
            </div>
            </>
        )
    }

    function returnEquipTypeList(type: string) {
        return (
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div style={{marginBottom:"-0.25em"}} className="equipgrouptext">{makestringpresentable(type)}</div>
                    </div>
                    <div className="row row-cols-3">

                    <div className="col-5">
                            <div className="equiptitle">Name</div>
                        </div>
                        <div className="col-3">
                            <div className="equiptitle">Cost</div>
                        </div>
                        <div className="col-4">
                            <div className="equiptitle">Restriction</div>
                        </div>
                    </div>
                </div>
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
                <FactionLorePanel data={ModelObject}/>
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
        <div className={'modelStructure borderstyler border'+getColour((ModelObject.Team? ModelObject.Team : "tc"))}>
            <h1 className={'titleShape titlestyler background'+getColour((ModelObject.Team? ModelObject.Team : "tc"))}>{ModelObject.Name || ""}</h1>
            <div className='modelInternalStructure'>
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
                    <div className="separator">Equipment</div>
                </div>
                <div>
                    {returnEquipList()}
                </div>
                <div className="verticalspacer"/>    

                <div>
                    <div className="separator">Models</div>
                </div>
                <div>
                    {returnModelList()}
                </div>
                <div className="verticalspacer"/>          
            </div>
        </div>
    )
}

export default FactionDisplay;