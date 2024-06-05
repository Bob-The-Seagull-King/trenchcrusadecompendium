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

const WarbandEditBankGloryDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    const Warband_MaxCount = WarbandItem? WarbandItem.GloryTotal : 0;
    let NewMaxCount = Warband_MaxCount;

    const CurrentCost = WarbandItem? Manager.TotalCostGlory(WarbandItem): 0;

    const [showGlorysEdit, setShowGlorysEdit] = useState(false);
    const handleCloseGlorysEdit = () => setShowGlorysEdit(false); 
    const handleShowGlorysEdit = () => setShowGlorysEdit(true);

    const inputRefGlorysEdit = useRef<HTMLInputElement>(null);

    function updateGlorys(value: number) {
        NewMaxCount = value;
    }

    function EditWarbandGlorys() {
        if (WarbandItem != null) {
            WarbandItem.GloryTotal = NewMaxCount;
        }
        UpdateFunction(WarbandItem)
        handleCloseGlorysEdit();
    }

    return (
        <>            
            <div className="col-lg-5 col-md-5 col-12 align-content-center" style={{   textAlign:"center"}}>
                <div className="row justify-content-right" style={{height:"fit-content"}}>
                    <div className="mediumsubfonttext" style={{width:"fit-content",height:"fit-content"}}>
                        Glory Spent/Total
                    </div>
                </div>
            </div>
            <div className="col d-block d-md-none">
                <div className="verticalspacerbig"/>
            </div>
            <div className="col-lg-7 col-md-7 col-12">
                    <div onClick={() => handleShowGlorysEdit()} className="hovermouse generalbackgroundbuttonbox bordermainpurple" style={{justifyContent:"center",width:"100%"}} >
                        <div style={{textAlign:"center"}}>
                            {CurrentCost + "/" + Warband_MaxCount + " (" + (Warband_MaxCount-CurrentCost) + " Available)"}
                        </div>
                    </div>
            </div>
            <Modal onEnterKeyDown={() => handleCloseGlorysEdit()} show={showGlorysEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseGlorysEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlepurple'}>
                    {"Update Total Glory"}
                </h1>
                
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" >
                                <Form.Control type="number" size="lg" className="no-margins" ref={inputRefGlorysEdit} style={{fontSize:"1.5em", height:"0.5em", textAlign:"center"}} onChange={e => updateGlorys(parseInt( e.target.value))} aria-label="Text input" defaultValue={Warband_MaxCount} placeholder=""/>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                            <FontAwesomeIcon icon={faSave} onClick={() => EditWarbandGlorys()} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default WarbandEditBankGloryDisplay;