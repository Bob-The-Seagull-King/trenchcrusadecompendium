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

import { EditTextBoxType, EditTextBoxDataDex } from './StaticEditTextBox';

const GenericEditTextBoxDisplay = (props: any) => {
    const Manager : WarbandManager = props.manager;
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember | null = props.member;
    const EditStaticType : EditTextBoxType = EditTextBoxDataDex[props.statictype]

    const refValue = EditStaticType.returnBaseValue(WarbandItem, WarbandMember);

    return (
        <div>            
            <InputGroup>
                <Form.Control as="textarea" style={EditStaticType.returnStyle(Manager, WarbandItem, WarbandMember)} aria-label="With textarea" defaultValue={refValue} placeholder={EditStaticType.title} onChange={e => EditStaticType.updateText(Manager, WarbandItem, e.target.value, WarbandMember)}/>
            </InputGroup>
        </div>
    )
}

export default GenericEditTextBoxDisplay;