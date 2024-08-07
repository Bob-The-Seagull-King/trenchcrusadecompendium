import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Warband } from '../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../classes/lists/warbandmanager';
import { useGlobalState } from '../../../../utility/globalstate'
import { ExportDisplayText, ExportDisplayTextBasic } from '../../../../classes/lists/warbandmanagerstatic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import WarbandFactionEditDisplay from './edit/WarbandEditFactionDisplay';
import WarbandEditBankDisplay from './edit/WarbandEditBankDisplay';
import GenericEditListDisplay from './edit/GenericEditListDisplay';
import GenericEditComplexListDisplay from './edit/GenericEditComplexListDisplay';
import GenericEditTextDisplay from './edit/GenericEditTextDisplay';

const WarbandEditDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const [theme] = useGlobalState('theme');

    let warbandNotes = WarbandItem.Notes;
    
    function returnNotes() {
        return (
            <div>
                <InputGroup>
                    <Form.Control as="textarea" style={{height:"10em"}} aria-label="With textarea" defaultValue={warbandNotes} placeholder={"Notes & Information on " + WarbandItem.Name} onChange={e => updateNotes(e.target.value)}/>
                </InputGroup>
            </div>
        )
    }

    function updateNotes(_value : string) {
        warbandNotes = _value;
        WarbandItem.Notes = warbandNotes;
    }
    
    function ReturnReturner() {
        return (
            <div className="col-12" >
                <div className="hovermouse iconandtextbox" onClick={() => UpdateFunction(null)} style={{width:"fit-content"}}>
                    <FontAwesomeIcon icon={faAngleLeft} className="pageaccestextsmall" style={{paddingTop:"0.25em"}}/>
                    <h1 className="pageaccestextsmall">
                        Return
                    </h1>
                </div>
            </div>
        )
    }
    
    function ReturnBank() {
        return (
            <div className="row">
                { WarbandItem != null &&
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <div className="mediumfonttext" style={{width:"fit-content"}}>
                                Warband Vault
                            </div>
                            <div className="verticalspacerbig"/>
                        </div>
                        <div className="row">
                            <div className="verticalspacer"/>
                            <WarbandEditBankDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} type={'ducats'}/>
                        </div>
                        <div className="row">
                            <div className="verticalspacerbig"/>
                            <WarbandEditBankDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} type={'glory'}/>
                        </div>
                    </div>
                }   
            </div>
        )
    }    

    const [showExport, setShowExport] = useState(false);
    const handleCloseExport = () => setShowExport(false); 
    const handleShowExport = () => setShowExport(true);

    const modelExport = ExportDisplayText(WarbandItem, true)

    const [showExportBasic, setShowExportBasic] = useState(false);
    const handleCloseExportBasic = () => setShowExportBasic(false); 
    const handleShowExportBasic = () => setShowExportBasic(true);

    const modelExportBasic = ExportDisplayTextBasic(WarbandItem, true)

    function ReturnExport() {
        return (
            <div>
                { WarbandItem != null &&
                <>
                    <div className="row row-cols-md-2 row-cols-1">
                
                    <div className="col">
                            <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => handleShowExport()}>
                                    <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Export Warband Information</div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => handleShowExportBasic()}>
                                    <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Export Warband Basics</div>
                                </div>
                            </div>
                        </div>
        
        
                    </div>

                    <Modal data-theme={theme} onEnterKeyDown={() => handleCloseExport()} size="xl" show={showExport}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseExport} keyboard={true}  centered>
                        
                        <h1 className={'titleShape titlestyler backgroundtc'}>
                            {("Warband") + " Export"}
                                <div className="row float-end">
                                    <div className='col-12 float-end'>
                                        <Button style={{padding:"0em"}} variant="" onClick={() => handleCloseExport()}>
                                            <FontAwesomeIcon className="setWhite" icon={faCircleXmark} style={{fontSize:"2em",margin:"0em"}}/>
                                        </Button>
                                    </div>
                                </div>
                        </h1>
                        <Modal.Body >
                            <div className="row">
                                <div className="col-12">
                                    <InputGroup className="tagboxpad" >
                                        <Form.Control as="textarea" aria-label="With textarea" readOnly defaultValue={modelExport} placeholder={""} className="formparagraphtext" style={{height:"40em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                                    </InputGroup>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal data-theme={theme} onEnterKeyDown={() => handleCloseExportBasic()} size="xl" show={showExportBasic}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseExport} keyboard={true}  centered>
                        
                        <h1 className={'titleShape titlestyler backgroundtc'}>
                            {("Warband") + " Export"}
                                <div className="row float-end">
                                    <div className='col-12 float-end'>
                                        <Button style={{padding:"0em"}} variant="" onClick={() => handleCloseExportBasic()}>
                                            <FontAwesomeIcon className="setWhite" icon={faCircleXmark} style={{fontSize:"2em",margin:"0em"}}/>
                                        </Button>
                                    </div>
                                </div>
                        </h1>
                        <Modal.Body >
                            <div className="row">
                                <div className="col-12">
                                    <InputGroup className="tagboxpad" >
                                        <Form.Control as="textarea" aria-label="With textarea" readOnly defaultValue={modelExportBasic} placeholder={""} className="formparagraphtext" style={{height:"40em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                                    </InputGroup>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    </>
                }
            </div>
        )
    }

    return (
            <div className="row">
                
                { WarbandItem != null &&
                <div className="col-12" key={props.key}>

                    <div className="row">
                        {ReturnReturner()}
                    </div>

                    <div className="row">
                        <GenericEditTextDisplay manager={Manager} warband={WarbandItem} statictype={'warbandname'} updater={UpdateFunction}/> 
                    </div>

                    <div className="verticalspacerbig"/>

                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-9 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <WarbandFactionEditDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                                </div>
                            </div>
                            <div>
                                <div className="verticalspacerbig"/>
                                <div className="separator">&#x27E1;</div>
                            </div>
                            {ReturnBank()}
                            <div className="verticalspacerbig"/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            <GenericEditTextDisplay manager={Manager} warband={WarbandItem} statictype={'warbandimage'} updater={UpdateFunction}/> 
                        </div>
                    </div>

                    <div className="verticalspacerbig"/>
                    <div className="separator" style={{fontSize:"3em"}}>&#x27E1;</div>
                    <div className="verticalspacerbig"/>

                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-8 col-12">
                            <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} statictype={'warbandmember'} updater={UpdateFunction}/> 
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">     
                            <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} statictype={'warbandequipment'} updater={UpdateFunction}/> 
                        </div>
                    </div>

                    <div className="verticalspacerbig"/>
                    <div className="separator" style={{fontSize:"3em"}}>Exploration</div>
                    <div className="verticalspacerbig"/>

                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-12">
                            <GenericEditListDisplay manager={Manager} warband={WarbandItem} statictype={'locations'} updater={UpdateFunction}/> 
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <GenericEditListDisplay manager={Manager} warband={WarbandItem} statictype={'explorationmodifiers'} updater={UpdateFunction}/>                   
                        </div>
                    </div>
                    
                    <div className="verticalspacerbig"/>
                    <div className="separator">&#x27E1;</div>
                    <div className="verticalspacerbig"/>

                    {returnNotes()}

                    <div className="verticalspacerbig"/>
                    <div className="separator">&#x27E1;</div>
                    <div className="verticalspacerbig"/>

                    {ReturnExport()}

                    <div className="verticalspacerbig"/>
                    <div className="separator">&#x27E1;</div>
                    <div className="verticalspacerbig"/>
                </div>
                }
            </div>
    )
}

export default WarbandEditDisplay;