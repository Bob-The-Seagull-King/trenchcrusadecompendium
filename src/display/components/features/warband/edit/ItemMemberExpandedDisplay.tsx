import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../classes/lists/WarbandMember';
import { returnTags } from '../../../../../utility/util';
import { GetGloryCost, GetDucatCost, ExportModelDisplayText, ExportModelDisplayTextBasic } from '../../../../../classes/lists/warbandmanagerstatic';

import { useGlobalState } from './../../../../../utility/globalstate'
import { getColour } from '../../../../../utility/functions';

import ItemStat from '../../../subcomponents/description/ItemStat';
import GenericPanel from '../../../generics/GenericPanel'
import ModelDisplay from '../../../../components/features/models/ModelDisplay';  
import GenericEditListDisplay from './GenericEditListDisplay';
import GenericEditComplexListDisplay from './GenericEditComplexListDisplay';
import GenericEditNumberDisplay from './GenericEditNumberDisplay';
import GenericEditTextDisplay from './GenericEditTextDisplay';
import GenericEditTextBoxDisplay from './GenericEditTextBoxDisplay';
import GenericPopup from '../../../../components/generics/GenericPopup';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/esm/Button';
import GenericDisplay from '../../../../components/generics/GenericDisplay';
import EquipmentDisplay from '../../equipment/EquipmentDisplay';
import UpgradeDisplay from '../../equipment/UpgradeDisplay';
import AddonDisplay from '../../addons/AddonDisplay';
import { returnModelBase, returnModelArmour, returnModelMovement, returnModelMelee, returnModelRanged, returnComponentsWithTag } from '../../../../../classes/lists/WarbandMemberStatic';

const ItemMemberExpandedDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const member : WarbandMember = props.member;
    const Manager : WarbandManager = props.manager;

    const TossItem = props.tossitem;
    const SellItem = props.sellitem;
    const RefundItem = props.refunditem;

    const closeSelf = props.close
    const [key, setkey] = useState(0);

    const bannedModelTags = ["empty"]

    function UpdateFunction() {
        Manager.SetStorage();
        setkey(key+1)
    }
    
    const ducatcost = GetDucatCost(member);
    const glorycost = GetGloryCost(member)
    const memberBase = returnModelBase(member);
    const memberArmour = returnModelArmour(member);
    const memberMovement = returnModelMovement(member);
    const memberMelee = returnModelMelee(member);
    const memberRanged = returnModelRanged(member);

    const modelExport = ExportModelDisplayText(member, true, false)
    const modelExportBasic = ExportModelDisplayTextBasic(member, true, false)

    function returnComponentsList(_str : string) {
        const componentsList = returnComponentsWithTag(member, _str)
        return (
            <>
            {componentsList['addon'] &&
                <>
                    {componentsList['addon'].map((item: any) => (
                        <div key={"componentaddon"+item.Name} className='addonbox'>
                            <GenericDisplay d_colour={member.Model.Object.Team} d_name={item.Name} d_type={"sub"} d_method={() => <AddonDisplay data={item} />}/>
                            <div className="verticalspacer"/>
                        </div>
                    ))}
                </>
            }
            {componentsList['equipment'] &&
                <>
                    {componentsList['equipment'].map((item: any) => (
                        <div key={"componentequipment"+item.Name} className='addonbox'>
                        <GenericDisplay  d_colour={member.Model.Object.Team} d_name={item.Name} d_type={""} d_method={() => <EquipmentDisplay data={item}/>}/>
                        <div className="verticalspacer"/>
                        </div>
                    ))}
                </>
            }
            {componentsList['upgrade'] &&
                <>
                    {componentsList['upgrade'].map((item: any) => (
                        <div key={"componentupgrade"+item.Name} className='addonbox'>
                        <GenericDisplay  d_colour={member.Model.Object.Team} d_name={item.Name} d_type={""} d_method={() => <UpgradeDisplay data={item}/>}/>
                        <div className="verticalspacer"/>
                        </div>
                    ))}
                </>
            }
            </>
        )
    }

    // Return the basic information of the member
    function returnStats() {
        return (
            <div key={key}>
                <div className="row justify-content-center">
                    
                    <div className="col-md-4 col-12">
                        <div className="stattitle">{"Model Type"}</div>
                        <div className="statbody">
                            <GenericPanel titlename={member.Model.Object.Name} d_colour={member.Model.Object.Team} d_name={member.Model.Object.Name} d_type={""} d_method={() => <ModelDisplay data={member.Model.Object}/>}/>      
                        </div>
                        <div className="verticalspacer"/>
                    </div>
                    <div className="col-md-4 col-6">
                    <ItemStat title={"Ducat Cost"} value={ducatcost}/>
                    </div>
                    <div className="col-md-4 col-6">
                    <ItemStat title={"Glory Cost"} value={glorycost}/>
                    </div>
                    <div className="col-md-2 col-6">
                        <ItemStat title={"Base"} value={memberBase}/>
                    </div>
                    <div className="col-md-2 col-6">
                        <ItemStat title={"Movement"} value={memberMovement}/>
                    </div>
                    <div className="col-md-2 col-6">
                        <ItemStat title={"Armour"} value={memberArmour}/>
                    </div>
                    <div className="col-md-2 col-6">
                        <ItemStat title={"Melee"} value={memberMelee}/>
                    </div>
                    <div className="col-md-2 col-6">
                        <ItemStat title={"Ranged"} value={memberRanged}/>
                    </div>
                </div>
            </div>
        )
    }

    // Make the model an infantry unit
    function demoteModel() {
        member.Elite = false;
        UpdateFunction();
    }

    // Make the model an elite unit
    function promoteModel() {
        member.Elite = true;
        UpdateFunction();
    }

    // Create a copy of the model to add to the warband
    function duplicateModel() {
        Manager.DuplicateMember(WarbandItem, member);
        closeSelf();
        UpdateFunction()
    }

    // Return formatted list of actions that can be taken to a member
    function returnButtons() {
        return (
            <div className="row justify-content-center">

                <div className="col-lg-2 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => TossItem(Manager, WarbandItem, member, UpdateFunction, member)}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Toss Member</div>
                        </div>
                    </div>
                    <div className="verticalspacerbig"/>
                </div>

                <div className="col-lg-2 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => SellItem(Manager, WarbandItem, member, UpdateFunction, member)}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Sell Member</div>
                        </div>
                    </div>
                    <div className="verticalspacerbig"/>
                </div>

                <div className="col-lg-2 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => RefundItem(Manager, WarbandItem, member, UpdateFunction, member)}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Refund Member</div>
                        </div>
                    </div>
                    <div className="verticalspacerbig"/>
                </div>

                <div className="col-lg-2 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => duplicateModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Copy Model</div>
                        </div>
                    </div>
                    <div className="verticalspacerbig"/>
                </div>

                <div className="col-lg-2 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className={"subfonttext generalbuttonbox" + ((((member.Elite == false) && (member.Model.Object.Promotion !== 2)) )? " hovermouse" : " disabledbox")} style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => promoteModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Promote Model</div>
                        </div>
                    </div>
                    <div className="verticalspacerbig"/>
                </div>

                <div className="col-lg-2 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className={"subfonttext generalbuttonbox" + ((member.Elite == true)? " hovermouse" : " disabledbox")} style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => demoteModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Demote Model</div>
                        </div>
                    </div>
                    <div className="verticalspacerbig"/>
                </div>

            </div>
        )
    }

    return (
        <>
        <div className={'modelStructure borderstyler border'+getColour(member.Model.Object.Faction)} style={{padding:"0em"}}>
            <h1 className={'titleShape titlestyler background'+getColour(member.Model.Object.Faction)}>
                <GenericEditTextDisplay manager={Manager} warband={WarbandItem} member={member} statictype={'membername'} updater={UpdateFunction}/>
                <div className="row float-end">
                    <div className='col-12 float-end'>
                            <GenericPopup d_colour={'tc'} d_type={''} panelname={"exportmemberexpanded"} panelObj={modelExport}/>
                        
                            <GenericPopup d_colour={'tc'} d_type={''} panelname={"exportmemberbasic"} panelObj={modelExportBasic}/>   
                        
                            <Button variant="" onClick={() => closeSelf()}>
                                <FontAwesomeIcon icon={faCircleXmark} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                    </div>
                </div>
            </h1>
            <div className='modelInternalStructure'>
                <div className="verticalspacer"/>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <div className='row'>
                            {returnStats()}                 
                        </div>
                    </div>     
                    <div className='col-md-6 col-sm-12'>
                        <div className='row'>
                            <GenericEditTextBoxDisplay manager={Manager} warband={WarbandItem} statictype={'membernotes'} updater={UpdateFunction}/> 
                        </div>
                    </div>              
                </div>  
                <div className='row '>
                    <div className='col-md-6 col-sm-12 overflow-auto flex-grow-1' style={{"maxHeight": "calc(55vh)"}}>
                        <div className='row'> 
                            <div className="verticalspacerbig"/>
                            <div>
                                <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} member={member} statictype={'memberupgrade'} updater={UpdateFunction}/> 
                            </div>
                            <div className="verticalspacer"/>              
                        </div>
                        <div className='row'> 
                            <div className="verticalspacerbig"/>
                            <div>
                                <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} member={member} statictype={'memberequipment'} updater={UpdateFunction}/> 
                            </div>
                            <div className="verticalspacer"/>               
                        </div>
                        <div className="row row-cols-md-2 row-cols-1">
                            {(member.Skills.length > 0 || member.Elite == true) &&
                            <div className="col"> 
                                <div className="verticalspacerbig"/>
                                <div>
                                    <GenericEditNumberDisplay manager={Manager} warband={WarbandItem} member={member} statictype={'experience'} updater={UpdateFunction}/>
                                    <div className="verticalspacerbig"/>
                                    <GenericEditListDisplay manager={Manager} warband={WarbandItem} member={member} statictype={'skills'} updater={UpdateFunction}/>
                                </div>   
                                <div className="verticalspacer"/>
                            </div>
                            }
                            {(member.Injuries.length > 0 || member.Elite == true) &&
                            <div className="col">
                                <div className="verticalspacerbig"/>
                                <div>
                                    <GenericEditNumberDisplay manager={Manager} warband={WarbandItem} member={member} statictype={'scars'} updater={UpdateFunction}/>
                                    <div className="verticalspacerbig"/>
                                    <GenericEditListDisplay manager={Manager} warband={WarbandItem} member={member} statictype={'scars'} updater={UpdateFunction}/>    
                                </div>
                                <div className="verticalspacer"/>
                            </div>
                            }
                        </div>
                    </div>
                    <div className='col-md-6 col-sm-12 overflow-auto flex-grow-1' style={{"maxHeight": "calc(55vh)"}}>
                        <div className="verticalspacer"/>
                        <div className='row'>
                            <div className="separator">Actions</div>
                            {returnComponentsList("action")}
                        </div> 
                        <div className="verticalspacerbig"/>
                        <div className='row'>
                            <div className="separator">Traits</div>
                            {returnComponentsList("trait")}
                        </div> 
                        <div className="verticalspacer"/>
                    </div>
                </div>
                <div className="verticalspacerbig"/>
                {returnButtons()}            
            </div>
        </div>
        </>
    )
}

export default ItemMemberExpandedDisplay;