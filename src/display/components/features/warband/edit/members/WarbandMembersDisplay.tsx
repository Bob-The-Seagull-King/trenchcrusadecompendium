import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const WarbandMembersDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    const Warband_Name = WarbandItem? WarbandItem.Name : "";
    let NewBandName = Warband_Name;

    const [showNameEdit, setShowNameEdit] = useState(false);
    const handleCloseNameEdit = () => setShowNameEdit(false); 
    const handleShowNameEdit = () => setShowNameEdit(true);

    const inputRefNameEdit = useRef<HTMLInputElement>(null);

    function updateName(value: string) {
        NewBandName = value;
    }

    function EditWarbandName() {
        if (WarbandItem != null) {
            WarbandItem.Name = NewBandName;
        }
        UpdateFunction(WarbandItem)
        handleCloseNameEdit();
    }

    return (
        <>
            <div className="largefonttext" style={{display:"flex",alignItems:"center"}}>
                <div style={{width:"fit-content"}}>
                    <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="d-none d-md-block">{Warband_Name}</div>
                    <div style={{marginRight:"0.1em",fontSize:"0.7em",lineHeight:"0.75em",textAlign:"center",width:"fit-content"}} className="d-block d-md-none">{Warband_Name}</div>
                </div>
                <FontAwesomeIcon icon={faPenToSquare} className="hovermouse" style={{fontSize:"0.5em"}}  onClick={() => handleShowNameEdit()}/>
            </div>
            <Modal onEnterKeyDown={() => handleCloseNameEdit()} show={showNameEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNameEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlepurple'}>
                    {"Update Warband Name"}
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
        </>
    )
}

export default WarbandMembersDisplay;