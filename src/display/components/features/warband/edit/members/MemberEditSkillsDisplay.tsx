import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../../classes/lists/WarbandMember';
import { useGlobalState } from './../../../../../../utility/globalstate'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import WarbandItemAppendListDisplay from '../WarbandItemAppendListDisplay';

const MemberEditSkillsDisplay = (props: any) => {
    const [theme] = useGlobalState('theme');
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;


    let Warband_Faction = WarbandItem? WarbandItem.Faction.Name : "";
    if (Warband_Faction == "") {
        Warband_Faction = "[No Faction Selected]";
    }
    
    const [showDucatsEdit, setShowDucatsEdit] = useState(false);
    const handleCloseDucatsEdit = () => setShowDucatsEdit(false); 
    const handleShowDucatsEdit = () => setShowDucatsEdit(true);

    const inputRefDucatsEdit = useRef<HTMLInputElement>(null);

    const Warband_MaxCount = WarbandMember? WarbandMember.Experience : 0;
    let NewMaxCount = Warband_MaxCount;

    function updateDucats(value: number) {
        NewMaxCount = value;
    }

    function EditWarbandDucats() {
        if (WarbandMember != null) {
            WarbandMember.Experience = NewMaxCount;
        }
        UpdateFunction(WarbandItem)
        handleCloseDucatsEdit();
    }

    function experienceCount() {
        return (
            <>
                <div className="col-12">
                    <div onClick={() => handleShowDucatsEdit()} className="hovermouse generalbackgroundbuttonbox borderstyler bordertc" style={{justifyContent:"center",width:"100%"}} >
                        <div style={{textAlign:"center"}}>
                            {"Experience : " + Warband_MaxCount}
                        </div>
                    </div>
                </div>
                <Modal data-theme={theme} onEnterKeyDown={() => handleCloseDucatsEdit()} show={showDucatsEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseDucatsEdit} keyboard={true}  centered>
                    
                    <h1 className={'titleShape titlestyler backgroundtc'}>
                        {"Update Model Experience"}
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
            </>
        )
    }

    return (
        <>
            <div>
                {WarbandMember.Elite == true &&
                <div className="row">
                    {experienceCount()}
                </div>
                }
                <div className="verticalspacer"/>
                <WarbandItemAppendListDisplay manager={Manager} warband={WarbandItem} member={WarbandMember} statictype={'skills'} updater={UpdateFunction}/>
            </div>
        </>
    )
}

export default MemberEditSkillsDisplay;