import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../../classes/lists/WarbandMember';
import { ListModel } from '../../../../../../classes/lists/ListModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPersonMilitaryRifle } from '@fortawesome/free-solid-svg-icons'
import { FactionModel } from '../../../../../../classes/feature/factions/FactionModel';
import { PlayerModel } from '../../../../../../classes/feature/models/Model';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const WarbandEliteMemberDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    return (
        <>
            {WarbandMember.Name} : {WarbandMember.Model.ID}
        </>
    )
}

export default WarbandEliteMemberDisplay;