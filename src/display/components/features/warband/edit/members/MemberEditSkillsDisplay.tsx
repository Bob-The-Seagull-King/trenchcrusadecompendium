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
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPersonMilitaryRifle } from '@fortawesome/free-solid-svg-icons'
import { FactionModel } from '../../../../../../classes/feature/factions/FactionModel';
import { PlayerModel } from '../../../../../../classes/feature/models/Model';
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

const MemberEditSkillsDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    const factionRef = useRef<HTMLSelectElement>(null);

    let Warband_Faction = WarbandItem? WarbandItem.Faction.Name : "";
    if (Warband_Faction == "") {
        Warband_Faction = "[No Faction Selected]";
    } 
    let NewFactionName = Warband_Faction;

    const [showNameEdit, setShowNameEdit] = useState(false);
    const handleCloseNameEdit = () => setShowNameEdit(false); 
    const handleShowNameEdit = () => setShowNameEdit(true);


    function updateFaction(value: string) {
        NewFactionName = value;
    }

    function AddNewSkill() {
        const skilldata : any = Manager.GetSkillByID(NewFactionName);

        if (skilldata != null) {
            WarbandMember.Skills.push(skilldata);
            UpdateFunction(WarbandItem);
        }
        handleCloseNameEdit();
    }

    function addSkill() {
        return (
            <>
            <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => handleShowNameEdit()}>
                    <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Add New Skill</div>
                    <FontAwesomeIcon icon={faPlus} className="" style={{fontSize:"0.75em"}}/>
                </div>
            </div>
            <Modal onEnterKeyDown={() => handleCloseNameEdit()} show={showNameEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNameEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlepurple'}>
                    {"Add New Skill"}
                </h1>
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                <Form.Control as="select" style={{height:"100%",textAlign:"center",fontSize:"0.85em",paddingTop:"0em",borderRadius:"0em"}} ref={factionRef} aria-label="Default select example"  placeholder="Member Type" onChange={e => { updateFaction(e.target.value)    } } >
                                    <option key="modeloption" value="[No Model Selected]">[No Skill Selected]</option>
                                    {
                                    <>{Manager.Skills.map((item) => ( <option key="modeloption" value={item.id}>{item.name}</option> ))}</>
                                    }
                                </Form.Control>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                        <FontAwesomeIcon icon={faPlus} onClick={() => AddNewSkill()} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            </>
        )
    }

    return (
        <>
            <div>
                
                <div className="row">
                    {
                    <>{WarbandMember.Skills.map((item) => ( 
                        <div key="modeloption">{item.name}</div> 
                    ))}</>
                    }
                </div>
                <div className="row">
                    {addSkill()}
                </div>
            </div>
        </>
    )
}

export default MemberEditSkillsDisplay;