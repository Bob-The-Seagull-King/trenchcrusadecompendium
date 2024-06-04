import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Warband } from '../../../../classes/lists/Warband';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { makestringpresentable } from '../../../../utility/functions'

import WarbandNameEditDisplay from './edit/WarbandEditNameDisplay';

const WarbandEditDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;

    const Warband_Name = WarbandItem? WarbandItem.Name : "";

    console.log(Warband_Name);
    
    function ReturnReturner() {
        return (
            <>
            <div className="col-12" >
                <div className="hovermouse iconandtextbox" onClick={() => UpdateFunction(null)} style={{width:"fit-content"}}>
                    <FontAwesomeIcon icon={faAngleLeft} className="pageaccestextsmall" style={{paddingTop:"0.25em"}}/>
                    <h1 className="pageaccestextsmall">
                        Return
                    </h1>
                </div>
            </div>
            </>
        )
    }
    

    function ReturnName() {
        return (
            <>
                { WarbandItem != null &&
                    <WarbandNameEditDisplay data={WarbandItem} updater={UpdateFunction} />
                }
            </>
        )
    }
    
    function ReturnFaction() {
        return (
            <>
            </>
        )
    }
    
    function ReturnImage() {
        return (
            <>
            </>
        )
    }
    
    function ReturnBank() {
        return (
            <>
            </>
        )
    }
    
    function ReturnBankDucat() {
        return (
            <>
            </>
        )
    }
    
    function ReturnBankGlory() {
        return (
            <>
            </>
        )
    }

    return (
            <div className="row">
                <div className="col-12">

                    <div className="row">
                        {ReturnReturner()}
                    </div>

                    <div className="row">
                        {ReturnName()}
                    </div>

                </div>
            </div>
    )
}

export default WarbandEditDisplay;