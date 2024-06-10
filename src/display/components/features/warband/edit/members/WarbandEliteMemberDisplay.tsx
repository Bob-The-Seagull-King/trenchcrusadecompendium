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
import {ITrenchCrusadeItemTag} from '../../../../../../classes/TrenchCrusadeItem'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import TagDisplay from '../../../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../../../subcomponents/description/ModelDescriptionItemDisplay';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getColour, makestringpresentable } from '../../../../../../utility/functions';
import ModelStat from '../../../../subcomponents/description/ModelStat';
import ModelHover from '../../../../../components/subcomponents/informationpanel/hovermisc/ModelHover'
import ModelEquipDisplay from './MemberEquipDisplay';
import MemberAddEquipDisplay from './MemberAddEquipDisplay';
import MemberEditSkillsDisplay from './MemberEditSkillsDisplay';
import MemberEditScarsDisplay from './MemberEditScarsDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const WarbandEliteMemberDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const bannedModelTags = ["inflict", "type"]

    const ducatcost = Manager.GetDucatCost(WarbandMember);
    const glorycost = Manager.GetGloryCost(WarbandMember)

    const Warband_Name = WarbandMember? WarbandMember.Name : "";
    let NewBandName = Warband_Name;

    const [showNameEdit, setShowNameEdit] = useState(false);
    const handleCloseNameEdit = () => setShowNameEdit(false); 
    const handleShowNameEdit = () => setShowNameEdit(true);

    const [showExport, setShowExport] = useState(false);
    const handleCloseExport = () => setShowExport(false); 
    const handleShowExport = () => setShowExport(true);

    const inputRefNameEdit = useRef<HTMLInputElement>(null);
    const inputRefExport = useRef<HTMLInputElement>(null);

    const modelExport = Manager.ExportModelDisplayText(WarbandMember, true, false)

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

    function returnNotes() {
        return (
            <>
                <InputGroup>
                    <Form.Control as="textarea" aria-label="With textarea" defaultValue={modelNotes} placeholder={"Notes & Information on " + WarbandMember.Name} onChange={e => updateNotes(e.target.value)}/>
                </InputGroup>
            </>
        )
    }

    function updateNotes(_value : string) {
        modelNotes = _value;
        WarbandMember.Notes = modelNotes;
    }

    function returnStats() {
        return (
            <div>
                <div className="row justify-content-center">
                    
                    <div className="col-md-4 col-12">
                        <div className="stattitle">{"Model Type"}</div>
                        <div className="statbody"><ModelHover data={WarbandMember.Model.Object} titlename={WarbandMember.Model.Object.Name} /></div>
                        <div className="verticalspacer"/>
                    </div>
                    <div className="col-md-4 col-6">
                    <ModelStat title={"Ducat Cost"} value={ducatcost}/>
                    </div>
                    <div className="col-md-4 col-6">
                    <ModelStat title={"Glory Cost"} value={glorycost}/>
                    </div>
                </div>
            </div>
        )
    }

    function returnSkills() {
        return (
            <>
                <MemberEditSkillsDisplay member={WarbandMember} warband={WarbandItem} updater={UpdateFunction} manager={Manager} />    
            </>
        )
    }

    function returnScars() {
        return (
            <>
                <MemberEditScarsDisplay member={WarbandMember} warband={WarbandItem} updater={UpdateFunction} manager={Manager} />    
            </>
        )
    }

    function demoteModel() {
        WarbandMember.Elite = false;
        UpdateFunction(WarbandItem);
    }

    function buryModel() {
        if (WarbandMember.Model.CostType == "ducats") {
            WarbandItem.DucatLost += WarbandMember.Model.Cost;
        } else {
            WarbandItem.GloryLost += WarbandMember.Model.Cost;
        }
        Manager.DeleteModelFromWarband(WarbandMember, WarbandItem)
        UpdateFunction(WarbandItem)
    }

    function resellModel() {
        Manager.DeleteModelFromWarband(WarbandMember, WarbandItem)
        UpdateFunction(WarbandItem)
    }

    function returnButtons() {
        return (
            <>
            <div className="row row-cols-lg-3 row-cols-1">
                
            <div className="col">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => demoteModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Demote This Model</div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => buryModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Bury This Model</div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => resellModel()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Resell This Model</div>
                        </div>
                    </div>
                </div>

            </div>
            </>
        )
    }

    return (
        <>
        <div className={'modelStructure bordermain'+getColour(WarbandMember.Model.Object.Faction)} style={{padding:"0em"}}>
            <h1 className={'titleShape title'+getColour(WarbandMember.Model.Object.Faction)}>
                {WarbandMember.Name || ""}
                <FontAwesomeIcon icon={faPenToSquare} className="hovermouse" style={{fontSize:"0.75em",paddingLeft:"0.5em"}}  onClick={() => handleShowNameEdit()}/>
                    
                <div className="row float-end">
                                    <div className='col-12 float-end'>
                                        <Button style={{padding:"0em"}} variant="" onClick={() => handleShowExport()}>
                                            <FontAwesomeIcon icon={faFileLines} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                                        </Button>
                                    </div>
                                </div>
            </h1>
            <div className='modelInternalStructure'>
                <div>
                    {returnTags()}
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
                    <div className="separator">Equipment</div>
                </div> 
                <div className="verticalspacer"/>
                <div>
                    {returnEquipment()}
                </div>
                <div className="verticalspacer"/>
                <div>
                    <div className="row row-cols-md-2 row-cols-1">
                        <div className="col">
                            <div>
                                <div className="separator">Skills</div>
                            </div> 
                            {returnSkills()}
                            <div className="verticalspacer"/>
                        </div>
                        <div className="col">
                            <div>
                                <div className="separator">Scars</div>
                            </div> 
                            {returnScars()}
                            <div className="verticalspacer"/>
                        </div>
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
            <Modal onEnterKeyDown={() => handleCloseNameEdit()} show={showNameEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNameEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlepurple'}>
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

            <Modal onEnterKeyDown={() => handleCloseExport()} size="lg" show={showExport}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseExport} keyboard={true}  centered>
                
                <h1 className={'titleShape titlepurple'}>
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
                                <Form.Control as="textarea" aria-label="With textarea" readOnly defaultValue={modelExport} placeholder={""} style={{height:"20em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                            </InputGroup>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WarbandEliteMemberDisplay;