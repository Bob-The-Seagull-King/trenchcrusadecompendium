import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../../classes/lists/WarbandMember';
import { ListModel } from '../../../../../../classes/lists/ListModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPersonMilitaryRifle } from '@fortawesome/free-solid-svg-icons'
import { FactionModel } from '../../../../../../classes/feature/factions/FactionModel';
import { PlayerModel } from '../../../../../../classes/feature/models/Model';
import {ITrenchCrusadeItemTag} from '../../../../../../classes/TrenchCrusadeItem'

import TagDisplay from '../../../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../../../subcomponents/description/ModelDescriptionItemDisplay';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getColour } from '../../../../../../utility/functions';
import ModelStat from '../../../../subcomponents/description/ModelStat';


const WarbandEliteMemberDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const bannedModelTags = ["inflict", "type"]

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
        for (i = 0; i < (WarbandMember.Model.Object.Tags?.length || 0); i++) {
            if (WarbandMember.Model.Object.Tags != undefined) {
                const temptag: ITrenchCrusadeItemTag = WarbandMember.Model.Object.Tags[i]

                if ((temptag.tag_name == "blast_size") || (temptag.tag_name == "blast_distance")) {
                    temptag.tag_name = "blast"; }

                if (!bannedModelTags.includes(temptag.tag_name)) {
                    tagarray.push(temptag);
                }}}
        return tagarray;
    }

    function returnStats() {
        return (
            <div>
                <div className="row row-cols-lg-5 row-cols-md-5 row-cols-sx-5 row-cols-xs-3 row-cols-3 justify-content-center">
                    <ModelStat title={"Base"} value={WarbandMember.Model.Object.Base + "mm"}/>
                    <ModelStat title={"Movement"} value={WarbandMember.Model.Object.Movement}/>
                    <ModelStat title={"Armour"} value={WarbandMember.Model.Object.Armour}/>
                    <ModelStat title={"Ranged"} value={(WarbandMember.Model.Object.Ranged.length > 0)? WarbandMember.Model.Object.Ranged + " DICE" : "N/A"}/>
                    <ModelStat title={"Melee"} value={(WarbandMember.Model.Object.Melee.length > 0)? WarbandMember.Model.Object.Melee + " DICE" : "N/A"}/>
                </div>
            </div>
        )
    }

    return (
        <>
        <div className={'modelStructure bordermain'+getColour(WarbandMember.Model.Object.Faction)} style={{padding:"0em"}}>
            <h1 className={'titleShape title'+getColour(WarbandMember.Model.Object.Faction)}>{WarbandMember.Name || ""}</h1>
            <div className='modelInternalStructure'>
                <div>
                    {returnTags()}
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

                {
                    /*
                    model type -> model openable popup
                    cost -> (base ducats/glory) (equipment ducats/glory) (total ducats/glory) 
                    
                    stats

                    equipment

                    xp/skills    scars/injuries

                    demote model
                    */
                }
                
            </div>
        </div>
        </>
    )
}

export default WarbandEliteMemberDisplay;