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

const ItemMemberExpandedDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    const TossItem = props.tossitem;
    const SellItem = props.sellitem;
    const RefundItem = props.refunditem;

    const closeSelf = props.close

    const bannedModelTags = ["empty"]
    const ducatcost = GetDucatCost(WarbandMember);
    const glorycost = GetGloryCost(WarbandMember)

    const modelExport = ExportModelDisplayText(WarbandMember, true, false)
    const modelExportBasic = ExportModelDisplayTextBasic(WarbandMember, true, false)

    // Return the basic information of the member
    function returnStats() {
        return (
            <div>
                <div className="row justify-content-center">
                    
                    <div className="col-md-4 col-12">
                        <div className="stattitle">{"Model Type"}</div>
                        <div className="statbody">
                            <GenericPanel titlename={WarbandMember.Model.Object.Name} d_colour={WarbandMember.Model.Object.Team} d_name={WarbandMember.Model.Object.Name} d_type={""} d_method={() => <ModelDisplay data={WarbandMember.Model.Object}/>}/>      
                        </div>
                        <div className="verticalspacer"/>
                    </div>
                    <div className="col-md-4 col-6">
                    <ItemStat title={"Ducat Cost"} value={ducatcost}/>
                    </div>
                    <div className="col-md-4 col-6">
                    <ItemStat title={"Glory Cost"} value={glorycost}/>
                    </div>
                </div>
            </div>
        )
    }

    // Make the model an infantry unit
    function demoteModel() {
        WarbandMember.Elite = false;
        UpdateFunction(WarbandItem);
    }

    // Make the model an elite unit
    function promoteModel() {
        WarbandMember.Elite = true;
        UpdateFunction(WarbandItem);
    }

    // Create a copy of the model to add to the warband
    function duplicateModel() {
        Manager.DuplicateMember(WarbandItem, WarbandMember);
        UpdateFunction(WarbandItem)
    }

    // Return formatted list of actions that can be taken to a member
    function returnButtons() {
        return (
            <>
            <div className="row">

                <div className="col-lg-6 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => duplicateModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Copy Model</div>
                        </div>
                    </div>
                </div>
                
                {((WarbandMember.Elite == false) && (WarbandMember.Model.Object.Promotion !== 2)) && 
                <div className="col-lg-6 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => promoteModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Promote This Model</div>
                        </div>
                    </div>
                </div>
                }

                {WarbandMember.Elite == true && 
                <div className="col-lg-6 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => demoteModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Demote This Model</div>
                        </div>
                    </div>
                </div>
                }

            </div>
            <div className="verticalspacerbig"/>
            <div className="row">

                <div className="col-lg-4 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => TossItem(Manager, WarbandItem, WarbandMember, UpdateFunction, WarbandMember)}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Bury This Model</div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => SellItem(Manager, WarbandItem, WarbandMember, UpdateFunction, WarbandMember)}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Sell This Model</div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => RefundItem(Manager, WarbandItem, WarbandMember, UpdateFunction, WarbandMember)}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Refund This Model</div>
                        </div>
                    </div>
                </div>

            </div>
            </>
        )
    }

    return (
        <>
        <div className={'modelStructure borderstyler border'+getColour(WarbandMember.Model.Object.Faction)} style={{padding:"0em"}}>
            <h1 className={'titleShape titlestyler background'+getColour(WarbandMember.Model.Object.Faction)}>
                <GenericEditTextDisplay manager={Manager} warband={WarbandItem} member={WarbandMember} statictype={'membername'} updater={UpdateFunction}/>
                <div className="row float-end">
                    <div className='col-12 float-end'>
                            <GenericPopup d_colour={'tc'} d_type={''} panelname={"exportmemberexpanded"} panelObj={modelExport}/>
                        
                            <GenericPopup d_colour={'tc'} d_type={''} panelname={"exportmemberbasic"} panelObj={modelExportBasic}/>   
                        
                    </div>
                </div>
            </h1>
            <div className='modelInternalStructure'>
                <div>
                    {returnTags(WarbandMember.Model.Object.Tags, bannedModelTags)}
                </div>
                <div className="verticalspacerbig"/>
                <div>
                    <GenericEditTextBoxDisplay manager={Manager} warband={WarbandItem} statictype={'membernotes'} updater={UpdateFunction}/> 
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
                    <div className="separator">Upgrades</div>
                </div> 
                <div className="verticalspacer"/>
                <div>
                    <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} member={WarbandMember} statictype={'memberupgrade'} updater={UpdateFunction}/> 
                </div>
                <div className="verticalspacer"/>
                <div>
                    <div className="separator">Equipment</div>
                </div> 
                <div className="verticalspacer"/>
                <div>
                    <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} member={WarbandMember} statictype={'memberequipment'} updater={UpdateFunction}/> 
                </div>
                <div className="verticalspacer"/>
                <div>
                    <div className="row row-cols-md-2 row-cols-1">
                        {(WarbandMember.Skills.length > 0 || WarbandMember.Elite == true) &&
                        <div className="col">
                            <div>
                                <div className="separator">Skills</div>
                            </div> 
                            <div>
                                <GenericEditNumberDisplay manager={Manager} warband={WarbandItem} member={WarbandMember} statictype={'experience'} updater={UpdateFunction}/>
                                <div className="verticalspacer"/>
                                <GenericEditListDisplay manager={Manager} warband={WarbandItem} member={WarbandMember} statictype={'skills'} updater={UpdateFunction}/>
                            </div>   
                            <div className="verticalspacer"/>
                        </div>
                        }
                        {(WarbandMember.Injuries.length > 0 || WarbandMember.Elite == true) &&
                        <div className="col">
                            <div>
                                <div className="separator">Scars</div>
                            </div> 
                                <GenericEditListDisplay manager={Manager} warband={WarbandItem} member={WarbandMember} statictype={'scars'} updater={UpdateFunction}/>    
                            <div className="verticalspacer"/>
                        </div>
                        }
                    </div>
                </div>
                <div>
                    <div className="separator">&#x27E1;</div>
                </div> 
                <div className="verticalspacer"/>
                <div className="row">
                    {returnButtons()}
                </div>

                
            </div>
        </div>
        </>
    )
}

export default ItemMemberExpandedDisplay;