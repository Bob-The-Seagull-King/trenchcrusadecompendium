import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Warband } from '../../../../classes/lists/Warband';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { makestringpresentable } from '../../../../utility/functions'

const WarbandDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const parentView = props.parent;
    const updateHost = props.statefunction;
    const UpdateFunction = props.updater;
    
    const [stateWidth, setWidth] = useState(window.innerWidth);
    const ref = useRef<HTMLDivElement>(null);

    function removeContentPack() {
        parentView.DeletePack(WarbandItem);
        updateHost();
    }

    useEffect(() => {
        const setContentPackWidth = () => {
            if(ref.current) {
                setWidth(ref.current.clientWidth);
            }
        }
        window.addEventListener("load", setContentPackWidth, false);
        window.addEventListener("resize", setContentPackWidth, false);
        setContentPackWidth();
    }, [stateWidth])

    return (
        <>
            <div className='' ref={ref} >
                {stateWidth > 700 &&
                    <div className="contentpackcontainer smallbordersubpurple" >
                        <span className="contentsubnamecontainer">
                            <span/>
                            <h1 className="packtitle">
                                {WarbandItem.Name}
                            </h1>
                            <span/>
                            <span className="packvrbox">
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => UpdateFunction(WarbandItem)}>
                                <FontAwesomeIcon icon={faPenToSquare} className="" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                            </span>
                        </span>
                        <span className="packvrbox">
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => removeContentPack()}>
                                <FontAwesomeIcon icon={faTrash} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                        </span>
                    </div>
                }
                {stateWidth <= 700 &&
                    <div className="contentpacksmallcontainer smallbordersubpurple" >
                        
                        <div className="row" style={{width:"100%"}}>
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                <h1 className="packtitle" style={{width:"fit-content"}}>
                                    {WarbandItem.Name}
                                </h1>
                                <span/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                <Button style={{padding:"0em"}} variant="" onClick={() => removeContentPack()}>
                                    <FontAwesomeIcon icon={faTrash} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                </Button>
                                <span/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default WarbandDisplay;