import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../classes/lists/WarbandMember';
import { useGlobalState } from './../../../../../utility/globalstate'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import SkillHover from '../../../../components/subcomponents/informationpanel/hovermisc/SkillHover';
import GenericHover from '../../../../components/generics/GenericHover'

const WarbandExplorationModDisplay = (props: any) => {
    const [theme] = useGlobalState('theme');
    const WarbandItem: Warband = props.data;
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

    function AddNewModifier() {
        const Modifierdata : any = Manager.GetModifierByID(NewFactionName);

        if (Modifierdata != null) {
            WarbandItem.Modifiers.push(Modifierdata);
            UpdateFunction(WarbandItem);
        }
        handleCloseNameEdit();
    }

    function addModifier() {
        return (
            <>
            <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => handleShowNameEdit()}>
                    <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Add New Modifier</div>
                    <FontAwesomeIcon icon={faPlus} className="" style={{fontSize:"0.75em"}}/>
                </div>
            </div>
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseNameEdit()} show={showNameEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNameEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {"Add New Modifier"}
                </h1>
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                <Form.Control as="select" style={{height:"100%",textAlign:"center",fontSize:"0.85em",paddingTop:"0em",borderRadius:"0em"}} ref={factionRef} aria-label="Default select example"  placeholder="Member Type" onChange={e => { updateFaction(e.target.value)    } } >
                                    <option key="modeloption" value="[No Model Selected]">[No Modifier Selected]</option>
                                    {
                                    <>{Manager.Modifiers.map((item) => ( <option key="modeloption" value={item.id}>{item.name}</option> ))}</>
                                    }
                                </Form.Control>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                        <FontAwesomeIcon icon={faPlus} onClick={() => AddNewModifier()} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            </>
        )
    }

    function tossItem(item : any) {
        Manager.DeleteModifierFromWarband(item, WarbandItem);
        UpdateFunction(WarbandItem);
    }

    function returnModifierEntry(item : any) {
        
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
    
    const [showDucatsEdit, setShowDucatsEdit] = useState(false);
    const handleCloseDucatsEdit = () => setShowDucatsEdit(false); 
    const handleShowDucatsEdit = () => setShowDucatsEdit(true);

    const inputRefDucatsEdit = useRef<HTMLInputElement>(null);

    const Warband_MaxCount = 0;
    let NewMaxCount = Warband_MaxCount;

    function updateDucats(value: number) {
        NewMaxCount = value;
    }

    function EditWarbandDucats() {
        UpdateFunction(WarbandItem)
    }

    
    return (
        <>
            <div>
                <div className="verticalspacerbig"/>
                <div className="row">
                    {addModifier()}
                </div>
                <div className="verticalspacerbig"/>
                <div className="row">
                    {
                    <>{WarbandItem.Modifiers.map((item) => ( 
                        <div key="modeloption">{returnModifierEntry(item)}</div> 
                    ))}</>
                    }
                </div>
            </div>
        </>
    )
}

export default WarbandExplorationModDisplay;