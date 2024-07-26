import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../../classes/lists/WarbandMember';
import { useGlobalState } from '../../../../../../utility/globalstate'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import GenericHover from '../../../../../../display/components/generics/GenericHover';
import SkillHover from '../../../../../../display/components/subcomponents/informationpanel/hovermisc/SkillHover';

const MemberEditScarsDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    
    const [theme] = useGlobalState('theme');


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
        const skilldata : any = Manager.GetScarByID(NewFactionName);

        if (skilldata != null) {
            WarbandMember.Injuries.push(skilldata);
            UpdateFunction(WarbandItem);
        }
        handleCloseNameEdit();
    }

    function addSkill() {
        return (
            <>
            <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => handleShowNameEdit()}>
                    <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Add New Scar</div>
                    <FontAwesomeIcon icon={faPlus} className="" style={{fontSize:"0.75em"}}/>
                </div>
            </div>
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseNameEdit()} show={showNameEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNameEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {"Add New Scar"}
                </h1>
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                <Form.Control as="select" style={{height:"100%",textAlign:"center",fontSize:"0.85em",paddingTop:"0em",borderRadius:"0em"}} ref={factionRef} aria-label="Default select example"  placeholder="Member Type" onChange={e => { updateFaction(e.target.value)    } } >
                                    <option key="modeloption" value="[No Model Selected]">[No Scar Selected]</option>
                                    {
                                    <>{Manager.Injuries.map((item) => ( <option key="modeloption" value={item.ID}>{item.Name}</option> ))}</>
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

    function tossItem(item : any) {
        Manager.DeleteScarFromModel(item, WarbandMember, WarbandItem);
        UpdateFunction(WarbandItem);
    }

    function returnSkillEntry(item : any) {
        
        return (
            
            <div className="row">

            <div className="col-9 align-content-center">
                <div className="equipbody">
                    <GenericHover titlename={item.name} d_colour={"tc"} d_name={item.name} d_type={""} d_method={() => 
                        <SkillHover data={item}/>
                    }/>
                    
                </div>
            </div>
            <div className="col-3 align-content-center">
                <div className="row justify-content-center">
                <div className="subfonttext" style={{display:"flex",alignItems:"center",width:"100%"}}  >
                    <FontAwesomeIcon icon={faTrash} className="hovermouse" style={{fontSize:"0.55em"}}  onClick={() => tossItem(item)}/>
                </div>
                </div>
            </div>
            <div className="verticalspacer"/>
        </div>
        )
    }

    return (
        <>
            <div>
                <div className="row">
                    {
                    <>{WarbandMember.Injuries.map((item) => ( 
                        <div key="modeloption">{returnSkillEntry(item)}</div> 
                    ))}</>
                    }
                </div>
                <div className="verticalspacer"/>
                {WarbandMember.Elite == true &&
                <div className="row">
                    {addSkill()}
                </div>
                }
            </div>
        </>
    )
}

export default MemberEditScarsDisplay;