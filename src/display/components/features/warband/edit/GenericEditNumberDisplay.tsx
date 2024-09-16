import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../classes/lists/WarbandMember';
import { useGlobalState } from '../../../../../utility/globalstate'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { EditNumberType, EditNumberDataDex } from './static/StaticEditNumber';

const GenericEditNumberDisplay = (props: any) => {
    const [theme] = useGlobalState('theme');
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember | null = props.member;
    const UpdateFunction = props.updater;
    const EditStaticType : EditNumberType = EditNumberDataDex[props.statictype]
    const Manager : WarbandManager = props.manager;
    
    const [showNumberEdit, setShowNumberEdit] = useState(false);
    const handleCloseNumberEdit = () => setShowNumberEdit(false); 
    const handleShowNumberEdit = () => setShowNumberEdit(true);

    const inputRefNumberEdit = useRef<HTMLInputElement>(null);

    const refCount = EditStaticType.returnBaseValue(WarbandItem, WarbandMember)
    let NewMaxCount = refCount;

    function updateNumber(value: number) {
        if (!Number.isNaN(value)) {
            NewMaxCount = value;
        }
    }

    function updateModel() {
        UpdateFunction(WarbandItem)
    }

    function numberCount() {
        return (
            <>
                <div className="col-12">
                    <div onClick={() => handleShowNumberEdit()} className="hovermouse generalbackgroundbuttonbox borderstyler bordertc" style={{justifyContent:"center",width:"100%"}} >
                        <div style={{textAlign:"center"}}>
                            {EditStaticType.returnDisplayValue(Manager, WarbandItem, WarbandMember)}
                        </div>
                    </div>
                </div>
                
                <Modal data-theme={theme} onEnterKeyDown={() => handleCloseNumberEdit()} show={showNumberEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNumberEdit} keyboard={true}  centered>
                    
                    <h1 className={'titleShape titlestyler backgroundtc'}>
                        {EditStaticType.title}
                    </h1>
                    
                    <Modal.Body >
                        <div className="row">
                            <div className="col-10">
                                <InputGroup className="tagboxpad" >
                                    <Form.Control type="number" size="lg" className="no-margins" ref={inputRefNumberEdit} style={{fontSize:"1.5em", height:"0.5em", textAlign:"center"}} onChange={e => updateNumber(parseInt( e.target.value))} aria-label="Text input" defaultValue={EditStaticType.returnBaseValue(WarbandItem, WarbandMember)} placeholder=""/>
                                </InputGroup>
                            </div>
                            <div className="col-2">
                                <FontAwesomeIcon icon={faSave} onClick={() => EditStaticType.updateNumber(Manager, WarbandItem, NewMaxCount, updateModel, handleCloseNumberEdit, WarbandMember)} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    return (
        <>
            {EditStaticType.returnShowSelector(WarbandItem, WarbandMember) == true &&
                <div className="row">
                    {numberCount()}
                </div>
            }
        </>
    )
}

export default GenericEditNumberDisplay;