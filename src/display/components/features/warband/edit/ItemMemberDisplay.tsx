import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../classes/lists/WarbandMember';
import { returnTags } from '../../../../../utility/util';
import { GetGloryCost, GetDucatCost} from '../../../../../classes/lists/warbandmanagerstatic';

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faSquareCaretUp, faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/esm/Modal';
import ItemMemberExpandedDisplay from './ItemMemberExpandedDisplay';

const ItemMemberDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    const Toss = props.tossitem;
    const Sell = props.sellitem;
    const Refund = props.refunditem

    function TossItem(_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
        Toss(_manager, _warband, _item, update, _member);
        handleClose();
    }
    function SellItem(_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
        Sell(_manager, _warband, _item, update, _member);
        handleClose();
    }
    function RefundItem(_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
        Refund(_manager, _warband, _item, update, _member);
        handleClose();
    }

    const ducatcost = GetDucatCost(WarbandMember);
    const glorycost = GetGloryCost(WarbandMember)

    const [show, setShow] = useState(false);
    const [key, setkey] = useState(0);
    const [theme] = useGlobalState('theme');

    const handleClose = () => {
        UpdateFunction();
        setkey(key + 1)
        setShow(false);}
    const handleShow = () => setShow(true);

    // Make the model an infantry unit
    function demoteModel() {
        WarbandMember.Elite = false;
        UpdateFunction();
    }

    // Make the model an elite unit
    function promoteModel() {
        WarbandMember.Elite = true;
        UpdateFunction();
    }
    
    // Make the model an infantry unit
    function storeModel() {
        WarbandMember.Reserve = true;
        UpdateFunction();
    }

    // Make the model an elite unit
    function fieldModel() {
        WarbandMember.Reserve = false;
        UpdateFunction();
    }

    // Create a copy of the model to add to the warband
    function duplicateModel() {
        Manager.DuplicateMember(WarbandItem, WarbandMember);
        UpdateFunction();
    }

    // Move a unit up or down in the list
    function SwapUnits(_index : number, _newIndex : number) {
        Manager.SwapWarbandMembers(WarbandItem, _index, _newIndex);
        UpdateFunction();
    }

    // Return the basic information of the member
    function returnStats() {
        return (
            <div>
                <div className="row justify-content-center">
                    
                    <div className="col-md-6 col-12">
                        <div className="stattitle">{"Model Type"}</div>
                        <div className="statbody">
                            <GenericPanel titlename={WarbandMember.Model.Object.Name} d_colour={WarbandMember.Model.Object.Team} d_name={WarbandMember.Model.Object.Name} d_type={""} d_method={() => <ModelDisplay data={WarbandMember.Model.Object}/>}/>      
                        </div>
                        
                        <div className="verticalspacer"/>
                    </div>
                    <div className="col-md-3 col-6">
                    <ItemStat title={"Ducat Cost"} value={ducatcost}/>
                    </div>
                    <div className="col-md-3 col-6">
                    <ItemStat title={"Glory Cost"} value={glorycost}/>
                    </div>
                </div>
            </div>
        )
    }

    // Return formatted list of actions that can be taken to a member
    function returnButtons() {
        return (
            <div className="row" key={key}>

                {WarbandMember.Reserve != true &&
                    <div className="col-md-3">
                        <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                            <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => duplicateModel()}>
                                <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Copy Model</div>
                            </div>
                        </div>
                    </div>
                }

                {WarbandMember.Reserve == true &&
                    <div className="col-md-6">
                        <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                            <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => duplicateModel()}>
                                <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Copy Model</div>
                            </div>
                        </div>
                    </div>
                }
                
                {WarbandMember.Reserve != true &&
                    <div className="col-md-3 col-12">
                        <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                            <div className={"subfonttext generalbuttonbox" + ((((WarbandMember.Elite == false) && (WarbandMember.Model.Object.Promotion !== 2)) )? " hovermouse" : " disabledbox")} style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => promoteModel()}>
                                <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Promote This Model</div>
                            </div>
                        </div>
                    </div>
                }
                {WarbandMember.Reserve != true &&
                    <div className="col-md-3 col-12">
                        <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                            <div className={"subfonttext generalbuttonbox" + ((WarbandMember.Elite == true)? " hovermouse" : " disabledbox")} style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => demoteModel()}>
                                <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Demote This Model</div>
                            </div>
                        </div>
                    </div>
                }
                {WarbandMember.Reserve != true &&
                    <div className="col-md-3 col-12">
                        <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                            <div className={"subfonttext generalbuttonbox" + (WarbandMember.Reserve? " disabledbox" : " hovermouse")} style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => storeModel()}>
                                <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Send Model to Reserve</div>
                            </div>
                        </div>
                    </div>
                }

                {WarbandMember.Reserve == true &&
                    <div className="col-md-6 col-12">
                        <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                            <div className={"subfonttext generalbuttonbox" + (WarbandMember.Reserve? " hovermouse" : " disabledbox")} style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => fieldModel()}>
                                <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Field This Model</div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }

    return (
        <>
            <div className={'modelStructure borderstyler border'+getColour(WarbandMember.Model.Object.Faction)} style={{padding:"0em"}}>
                <h1 className={'row titleShape titlestyler background'+getColour(WarbandMember.Model.Object.Faction)}>
                    <div className="col-md-8 col-lg-10">
                    <GenericEditTextDisplay manager={Manager} warband={WarbandItem} member={WarbandMember} statictype={'membername'}/>
                    </div>
                    <div className="col-md-4 col-lg-2 row float-end">
                        {WarbandMember.Reserve != true &&
                        <div className='col-4'>
                                <div style={{}}>
                                {WarbandItem.Members.filter(item => item.Elite === WarbandMember.Elite).indexOf(WarbandMember) > 0 &&
                                <FontAwesomeIcon icon={faSquareCaretUp} className="hovermouse" style={{fontSize:"0.75em"}}  onClick={() => SwapUnits(WarbandItem.Members.indexOf(WarbandMember), WarbandItem.Members.indexOf(WarbandMember)-1)}/>                        
                                }
                                {WarbandItem.Members.filter(item => item.Elite === WarbandMember.Elite).indexOf(WarbandMember) <= 0 &&
                                <FontAwesomeIcon icon={faSquareCaretUp} className="subcolorgrey" style={{fontSize:"0.75em"}} />                        
                                }
                                </div>
                        </div>
                        }
                        {WarbandMember.Reserve != true &&
                        <div className='col-4'>
                            <div style={{}}>                                
                                {WarbandItem.Members.filter(item => item.Elite === WarbandMember.Elite).indexOf(WarbandMember) < (WarbandItem.Members.filter(item => item.Elite === WarbandMember.Elite).length - 1) &&
                                <FontAwesomeIcon icon={faSquareCaretDown} className="hovermouse" style={{fontSize:"0.75em"}}  onClick={() => SwapUnits(WarbandItem.Members.indexOf(WarbandMember), WarbandItem.Members.indexOf(WarbandMember)+1)}/>             
                                } 
                                {WarbandItem.Members.filter(item => item.Elite === WarbandMember.Elite).indexOf(WarbandMember) >= (WarbandItem.Members.filter(item => item.Elite === WarbandMember.Elite).length - 1) &&
                                    <FontAwesomeIcon icon={faSquareCaretDown} className="subcolorgrey" style={{fontSize:"0.75em"}}  />             
                                } 
                                </div>
                        </div>
                        }
                        <div className='col-4'>
                            <div style={{}}>
                            <FontAwesomeIcon icon={faUpRightFromSquare} className="hovermouse" style={{fontSize:"0.75em"}}  onClick={() => handleShow()}/>          
                            </div>              
                        </div>
                    </div>
                </h1>
                <div className='modelInternalStructure'>
                    <div className="verticalspacer"/>
                    <div>
                        {returnStats()}
                    </div>
                    <div className='d-none d-md-block'>
                        <div className="verticalspacer"/>
                        <div>
                            <div className="separator">&#x27E1;</div>
                        </div> 
                        <div className="verticalspacer"/>
                        <div className="row">
                            {returnButtons()}
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal data-theme={theme} onEnterKeyDown={() => handleClose()} show={show} size="xl" contentClassName="overcomeBackground" dialogClassName=""  onHide={handleClose} keyboard={true}  centered>
                <Modal.Body > 
                    <ItemMemberExpandedDisplay warband={WarbandItem} member={WarbandMember} updater={UpdateFunction} manager={Manager} tossitem={TossItem} sellitem={SellItem} refunditem={RefundItem} close={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ItemMemberDisplay;