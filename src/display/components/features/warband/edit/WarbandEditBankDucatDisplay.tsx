import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';
import { useGlobalState } from '../../../../../utility/globalstate'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const WarbandEditBankDucatDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    const Warband_MaxCount = WarbandItem? WarbandItem.DucatTotal : 0;
    let NewMaxCount = Warband_MaxCount;
    const Warband_LostCount = WarbandItem? WarbandItem.DucatLost : 0;
    let NewLostCount = Warband_LostCount;
    const [theme] = useGlobalState('theme');

    const CurrentCost = WarbandItem? Manager.TotalCostDucats(WarbandItem): 0;

    const [showDucatsEdit, setShowDucatsEdit] = useState(false);
    const handleCloseDucatsEdit = () => setShowDucatsEdit(false); 
    const handleShowDucatsEdit = () => setShowDucatsEdit(true);

    const inputRefDucatsEdit = useRef<HTMLInputElement>(null);

    const [showDucatsLostEdit, setShowDucatsLostEdit] = useState(false);
    const handleCloseDucatsLostEdit = () => setShowDucatsLostEdit(false); 
    const handleShowDucatsLostEdit = () => setShowDucatsLostEdit(true);

    const inputRefDucatsLostEdit = useRef<HTMLInputElement>(null);

    function updateDucats(value: number) {
        NewMaxCount = value;
    }

    function EditWarbandDucats() {
        if (WarbandItem != null) {
            WarbandItem.DucatTotal = NewMaxCount;
        }
        UpdateFunction(WarbandItem)
        handleCloseDucatsEdit();
    }

    function updateDucatsLost(value: number) {
        NewLostCount = value;
    }

    function EditWarbandDucatsLost() {
        if (WarbandItem != null) {
            WarbandItem.DucatLost = NewLostCount;
        }
        UpdateFunction(WarbandItem)
        handleCloseDucatsEdit();
    }

    return (
        <>            
            <div className="col-lg-2 col-md-2 col-12 align-content-center" style={{   textAlign:"center"}}>
                <div className="row justify-content-right" style={{height:"fit-content"}}>
                    <div className="mediumsubfonttext" style={{width:"fit-content",height:"fit-content"}}>
                        Ducats
                    </div>
                </div>
            </div>
            <div className="col d-block d-md-none">
                <div className="verticalspacerbig"/>
            </div>
            <div className="col-lg-5 col-md-5 col-12">
                    <div onClick={() => handleShowDucatsEdit()} className="hovermouse generalbackgroundbuttonbox borderstyler bordertc" style={{justifyContent:"center",width:"100%"}} >
                        <div style={{textAlign:"center"}}>
                            {CurrentCost + "/" + Warband_MaxCount + " (" + (Warband_MaxCount-CurrentCost) + " Available)"}
                        </div>
                    </div>
            </div>
            <div className="col-lg-5 col-md-5 col-12">
                    <div onClick={() => handleShowDucatsLostEdit()} className="hovermouse generalbackgroundbuttonbox borderstyler bordertc" style={{justifyContent:"center",width:"100%"}} >
                        <div style={{textAlign:"center"}}>
                            {Warband_LostCount + " Lost to War"}
                        </div>
                    </div>
            </div>
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseDucatsEdit()} show={showDucatsEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseDucatsEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {"Update Total Ducats"}
                </h1>
                
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" >
                                <Form.Control type="number" size="lg" className="no-margins" ref={inputRefDucatsEdit} style={{fontSize:"1.5em", height:"0.5em", textAlign:"center"}} onChange={e => updateDucats(parseInt( e.target.value))} aria-label="Text input" defaultValue={Warband_MaxCount} placeholder=""/>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                            <FontAwesomeIcon icon={faSave} onClick={() => EditWarbandDucats()} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseDucatsLostEdit()} show={showDucatsLostEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseDucatsLostEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {"Update Lost Ducats"}
                </h1>
                
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" >
                                <Form.Control type="number" size="lg" className="no-margins" ref={inputRefDucatsLostEdit} style={{fontSize:"1.5em", height:"0.5em", textAlign:"center"}} onChange={e => updateDucatsLost(parseInt( e.target.value))} aria-label="Text input" defaultValue={Warband_LostCount} placeholder=""/>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                            <FontAwesomeIcon icon={faSave} onClick={() => EditWarbandDucatsLost()} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default WarbandEditBankDucatDisplay;