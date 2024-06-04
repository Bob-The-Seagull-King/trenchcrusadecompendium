import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const WarbandFactionEditDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    let factionRef : any = null;

    let Warband_Faction = WarbandItem? WarbandItem.Faction : "";
    if (Warband_Faction == "") {
        Warband_Faction = "[No Faction Selected]";
    } 
    let NewFactionName = Warband_Faction;

    const [showNameEdit, setShowNameEdit] = useState(false);
    const handleCloseNameEdit = () => setShowNameEdit(false); 
    const handleShowNameEdit = () => setShowNameEdit(true);


    function updateFaction(value: string) {
        NewFactionName = value;
        if (factionRef != null) {
            factionRef.value = NewFactionName;
        }
    }

    function EditWarbandFaction() {
        if (WarbandItem != null && NewFactionName != "") {
            WarbandItem.Faction = NewFactionName;
        }
        UpdateFunction(WarbandItem)
        handleCloseNameEdit();
    }

    return (
        <>
            <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="d-none d-md-block">{Warband_Faction}</div>
                <FontAwesomeIcon icon={faPenToSquare} className="hovermouse" style={{fontSize:"0.75em"}}  onClick={() => handleShowNameEdit()}/>
            </div>
            <Modal onEnterKeyDown={() => handleCloseNameEdit()} show={showNameEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNameEdit} keyboard={true}  centered>
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" style={{height:"3em"}}>
                                <Form.Select style={{height:"100%",textAlign:"center"}} aria-label="Default select example" onChange={e => {
                                    factionRef = e.target;
                                     updateFaction(e.target.value)     
                                    } } >
                                    <option></option>
                                    {Manager.Factions.map((item) => (
                                        <option key="factionoption">{item.Name}</option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                        <FontAwesomeIcon icon={faSave} onClick={() => EditWarbandFaction()} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WarbandFactionEditDisplay;