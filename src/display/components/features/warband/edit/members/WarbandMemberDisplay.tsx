import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../../classes/lists/WarbandMember';
import { returnTags } from '../../../../../../utility/util';
import { GetGloryCost, GetDucatCost, ExportModelDisplayText, ExportModelDisplayTextBasic } from '../../../../../../classes/lists/warbandmanagerstatic';

import { useGlobalState } from './../../../../../../utility/globalstate'
import { getColour } from '../../../../../../utility/functions';

import ItemStat from '../../../../subcomponents/description/ItemStat';
import GenericPanel from '../../../../generics/GenericPanel'
import ModelDisplay from '../../../../../components/features/models/ModelDisplay';  
import ModelEquipDisplay from './MemberEquipDisplay';
import MemberAddEquipDisplay from './MemberAddEquipDisplay';
import MemberEditSkillsDisplay from './MemberEditSkillsDisplay';
import MemberAddUpgradeDisplay from './MemberAddUpgradeDisplay.';
import ModelUpgradeDisplay from './MemberUpgradeDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import WarbandItemAppendListDisplay from '../WarbandItemAppendListDisplay';

const WarbandMemberDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    const bannedModelTags = ["empty"]
    const ducatcost = GetDucatCost(WarbandMember);
    const glorycost = GetGloryCost(WarbandMember)
    const Warband_Name = WarbandMember? WarbandMember.Name : "";
    
    let NewBandName = Warband_Name;

    const [theme] = useGlobalState('theme');

    const [showNameEdit, setShowNameEdit] = useState(false);
    const handleCloseNameEdit = () => setShowNameEdit(false); 
    const handleShowNameEdit = () => setShowNameEdit(true);

    const [showExport, setShowExport] = useState(false);
    const handleCloseExport = () => setShowExport(false); 
    const handleShowExport = () => setShowExport(true);

    const [showExportBasic, setShowExportBasic] = useState(false);
    const handleCloseExportBasic = () => setShowExportBasic(false); 
    const handleShowExportBasic = () => setShowExportBasic(true);

    const inputRefNameEdit = useRef<HTMLInputElement>(null);
    const modelExport = ExportModelDisplayText(WarbandMember, true, false)
    const modelExportBasic = ExportModelDisplayTextBasic(WarbandMember, true, false)

    function updateName(value: string) {
        NewBandName = value;
    }

    function EditWarbandName() {
        if (WarbandMember != null) {
            WarbandMember.Name = NewBandName;
        }
        UpdateFunction(WarbandItem)
        handleCloseNameEdit();
    }

    let modelNotes = WarbandMember.Notes;

    // Return the upgrade component of a member display
    function returnUpgrades() {
        return (
            <>
                <div className="row" style={{width:"100%"}}>
                    <div className="col-12">
                    <ResponsiveMasonry columnsCountBreakPoints={{350: 1}} >
                        <Masonry gutter="20px">
                            {returnUpgradeTypeList("ranged")}
                        </Masonry>
                    </ResponsiveMasonry>
                    </div>
                </div>
                <div className="verticalspacerbig"/>
                <div className="row">
                    <MemberAddUpgradeDisplay member={WarbandMember} data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                </div>
            </>
        )
    }
    
    // Return the table of member upgrades
    function returnUpgradeTypeList(type: string) {
        return (
            <div className="col-12" style={{width:"100%"}}>
                {WarbandMember.Upgrades.length > 0 &&
                <>
            <div className="row" style={{width:"100%"}}>

                        <div className="col-5">
                            <div className="equiptitle">Name</div>
                        </div>
                        <div className="col-3">
                            <div className="equiptitle">Cost</div>
                        </div>
                        <div className="col-2">
                            <div className="equiptitle">Toss</div>
                        </div>
                        <div className="col-2">
                            <div className="equiptitle">Resell</div>
                        </div>
            </div>
            <div className="row" style={{width:"100%"}}>
                {WarbandMember.Upgrades.map((item) => (
                    <div key={"flavourFaction"+(item.ID? item.ID : "")}>
                        <ModelUpgradeDisplay data={item} warband={WarbandItem} member={WarbandMember} updater={UpdateFunction} manager={Manager} />
                    </div>
                ))}
            </div>
            </>
            }
            </div>
        )
    }

    // Return a formatted table of a member's equipment
    function returnEquipment() {
        return (
            <>
                <div className="row" style={{width:"100%"}}>
                    <div className="col-12">
                    <ResponsiveMasonry columnsCountBreakPoints={{350: 1}} >
                        <Masonry gutter="20px">
                            {returnEquipTypeList("ranged")}
                        </Masonry>
                    </ResponsiveMasonry>
                    </div>
                </div>
                <div className="verticalspacerbig"/>
                <div className="row">
                    <MemberAddEquipDisplay member={WarbandMember} data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                </div>
            </>
        )
    }
    
    // Return a subtype of equipment items
    function returnEquipTypeList(type: string) {
        return (
            <div className="col-12" style={{width:"100%"}}>
                {WarbandMember.Equipment.length > 0 &&
                <>
            <div className="row" style={{width:"100%"}}>

                        <div className="col-5">
                            <div className="equiptitle">Name</div>
                        </div>
                        <div className="col-3">
                            <div className="equiptitle">Cost</div>
                        </div>
                        <div className="col-2">
                            <div className="equiptitle">Toss</div>
                        </div>
                        <div className="col-2">
                            <div className="equiptitle">Resell</div>
                        </div>
            </div>
            <div className="row" style={{width:"100%"}}>
                {WarbandMember.Equipment.map((item) => (
                    <div key={"flavourFaction"+(item.ID? item.ID : "")}>
                        <ModelEquipDisplay data={item} warband={WarbandItem} member={WarbandMember} updater={UpdateFunction} manager={Manager} />
                    </div>
                ))}
            </div>
            </>
            }
            </div>
        )
    }

    // Return the text box contianing user notes on the member
    function returnNotes() {
        return (
            <>
                <InputGroup>
                    <Form.Control as="textarea" aria-label="With textarea" defaultValue={modelNotes} placeholder={"Notes & Information on " + WarbandMember.Name} onChange={e => updateNotes(e.target.value)}/>
                </InputGroup>
            </>
        )
    }

    // Update the member's notes
    function updateNotes(_value : string) {
        modelNotes = _value;
        WarbandMember.Notes = modelNotes;
    }

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

    // Return formatted list of skills
    function returnSkills() {
        return (
            <>
                <MemberEditSkillsDisplay member={WarbandMember} warband={WarbandItem} updater={UpdateFunction} manager={Manager} />    
            </>
        )
    }

    // Return formatted list of injuries
    function returnScars() {
        return (
            <WarbandItemAppendListDisplay manager={Manager} warband={WarbandItem} member={WarbandMember} statictype={'scars'} updater={UpdateFunction}/>    
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

    // Remove model and get nothing back
    function buryModel() {
        WarbandItem.DucatLost += parseInt(GetDucatCost(WarbandMember));
        WarbandItem.GloryLost += parseInt(GetGloryCost(WarbandMember));
        Manager.DeleteModelFromWarband(WarbandMember, WarbandItem)
        UpdateFunction(WarbandItem)
    }

    // Remove model and get half the cost back
    function sellModel() {
        WarbandItem.DucatLost += Math.round((parseInt(GetDucatCost(WarbandMember)))/2);
        WarbandItem.GloryLost += Math.round((parseInt(GetGloryCost(WarbandMember)))/2);
        Manager.DeleteModelFromWarband(WarbandMember, WarbandItem)
        UpdateFunction(WarbandItem)
    }

    // Remove model and get all the cost back
    function refundModel() {
        Manager.DeleteModelFromWarband(WarbandMember, WarbandItem)
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
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => buryModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Bury This Model</div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => sellModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Sell This Model</div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-12">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => refundModel()}>
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
                {WarbandMember.Name || ""}
                <FontAwesomeIcon icon={faPenToSquare} className="hovermouse" style={{fontSize:"0.75em",paddingLeft:"0.5em"}}  onClick={() => handleShowNameEdit()}/>
                <div className="row float-end">
                    <div className='col-12 float-end'>
                        <Button style={{padding:"0em"}} variant="" onClick={() => handleShowExport()}>
                            <FontAwesomeIcon icon={faFileLines} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                        </Button>
                        <Button style={{padding:"0em",paddingLeft:"0.5em"}} variant="" onClick={() => handleShowExportBasic()}>
                            <FontAwesomeIcon icon={faQuoteLeft} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                        </Button>
                    </div>
                </div>
            </h1>
            <div className='modelInternalStructure'>
                <div>
                    {returnTags(WarbandMember.Model.Object.Tags, bannedModelTags)}
                </div>
                <div className="verticalspacerbig"/>
                <div>
                    {returnNotes()}
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
                    {returnUpgrades()}
                </div>
                <div className="verticalspacer"/>
                <div>
                    <div className="separator">Equipment</div>
                </div> 
                <div className="verticalspacer"/>
                <div>
                    {returnEquipment()}
                </div>
                <div className="verticalspacer"/>
                <div>
                    <div className="row row-cols-md-2 row-cols-1">
                        {(WarbandMember.Skills.length > 0 || WarbandMember.Elite == true) &&
                        <div className="col">
                            <div>
                                <div className="separator">Skills</div>
                            </div> 
                            {returnSkills()}
                            <div className="verticalspacer"/>
                        </div>
                        }
                        {(WarbandMember.Injuries.length > 0 || WarbandMember.Elite == true) &&
                        <div className="col">
                            <div>
                                <div className="separator">Scars</div>
                            </div> 
                            {returnScars()}
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
        
        <Modal data-theme={theme} onEnterKeyDown={() => handleCloseNameEdit()} show={showNameEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNameEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {"Update Name"}
                </h1>
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" >
                                <Form.Control size="lg" className="no-margins" ref={inputRefNameEdit} style={{fontSize:"1.5em", height:"0.5em", textAlign:"center"}} onChange={e => updateName(e.target.value)} aria-label="Text input" defaultValue={Warband_Name} placeholder=""/>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                            <FontAwesomeIcon icon={faSave} onClick={() => EditWarbandName()} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseExport()} size="lg" show={showExport}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseExport} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {WarbandMember.Name + " Export"}
                                <div className="row float-end">
                                    <div className='col-12 float-end'>
                                        <Button style={{padding:"0em"}} variant="" onClick={() => handleCloseExport()}>
                                            <FontAwesomeIcon icon={faCircleXmark} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                                        </Button>
                                    </div>
                                </div>
                </h1>
                <Modal.Body >
                    <div className="row">
                        <div className="col-12">
                            <InputGroup className="tagboxpad" >
                                <Form.Control as="textarea" aria-label="With textarea" readOnly defaultValue={modelExport} placeholder={""} className="formparagraphtext" style={{height:"20em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                            </InputGroup>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseExportBasic()} size="lg" show={showExportBasic}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseExportBasic} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {WarbandMember.Name + " Basic Export"}
                                <div className="row float-end">
                                    <div className='col-12 float-end'>
                                        <Button style={{padding:"0em"}} variant="" onClick={() => handleCloseExportBasic()}>
                                            <FontAwesomeIcon icon={faCircleXmark} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                                        </Button>
                                    </div>
                                </div>
                </h1>
                <Modal.Body >
                    <div className="row">
                        <div className="col-12">
                            <InputGroup className="tagboxpad" >
                                <Form.Control as="textarea" aria-label="With textarea" className="formparagraphtext" readOnly defaultValue={modelExportBasic} placeholder={""} style={{height:"20em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                            </InputGroup>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WarbandMemberDisplay;