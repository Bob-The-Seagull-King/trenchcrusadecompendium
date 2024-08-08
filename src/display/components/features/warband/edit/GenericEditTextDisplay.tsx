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
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { EditTextType, EditTextDataDex } from './static/StaticEditText';

const GenericEditListDisplay = (props: any) => {
    const Manager : WarbandManager = props.manager;
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember | null = props.member;
    const EditStaticType : EditTextType = EditTextDataDex[props.statictype]
    const UpdateFunction = props.updater;

    const refValue = EditStaticType.returnBaseValue(WarbandItem, WarbandMember);
    let textValue = refValue;

    const [theme] = useGlobalState('theme');

    const [showTextEdit, setShowTextEdit] = useState(false);
    const handleCloseTextEdit = () => setShowTextEdit(false); 
    const handleShowTextEdit = () => setShowTextEdit(true);

    const inputRefTextEdit = useRef<HTMLInputElement>(null);

    function updateText(value: string) {
        textValue = value;
    }

    function updateModel() {
        UpdateFunction(WarbandItem)
    }

    return (
        <>  <span>
            { EditStaticType.returnButton(Manager, WarbandItem, handleShowTextEdit, WarbandMember, textValue) }
            </span>
            
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseTextEdit()} show={showTextEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseTextEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {EditStaticType.title}
                </h1>
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" >
                                <Form.Control size="lg" className="no-margins" ref={inputRefTextEdit} style={{fontSize:"1.5em", height:"0.5em", textAlign:"center"}} onChange={e => updateText(e.target.value)} aria-label="Text input" defaultValue={refValue} placeholder=""/>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                            <FontAwesomeIcon icon={faPlus} onClick={() => EditStaticType.updateText(Manager, WarbandItem, textValue, handleCloseTextEdit, updateModel, WarbandMember )} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default GenericEditListDisplay;