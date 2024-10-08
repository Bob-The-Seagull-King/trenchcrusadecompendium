import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'

import Button from 'react-bootstrap/Button';

import { Warband } from '../../../../classes/lists/Warband';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faClone } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

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

    function copyContentPack() {
        parentView.DuplicateWarband(WarbandItem);
        updateHost();
    }

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(WarbandItem, null, 4)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = (
            WarbandItem.Name +
            (WarbandItem.Player? " - " + WarbandItem.Player : "") +
            (WarbandItem.Campaign? " - " + WarbandItem.Campaign: "") +
            (WarbandItem.BattleNo? " - Battle No " + WarbandItem.BattleNo: "") +
            ".json");
    
        link.click();
      };

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
                            {WarbandItem.Campaign != null && WarbandItem.Campaign != "" &&
                                <h2 className="packtitleminor">
                                    {WarbandItem.Campaign}
                                </h2>
                            }
                            {WarbandItem.BattleNo != null && WarbandItem.BattleNo != 0 && WarbandItem.BattleNo != 1 &&
                                <h2 className="packtitleminor">
                                    Battle Nº {WarbandItem.BattleNo}
                                </h2>
                            }
                            <span/>
                            <span className="packvrbox">
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => UpdateFunction(WarbandItem)}>
                                <FontAwesomeIcon icon={faPenToSquare} className="" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => copyContentPack()}>
                                <FontAwesomeIcon icon={faClone} className="" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => exportData()}>
                                <FontAwesomeIcon icon={faDownload} className="" style={{fontSize:"2em",margin:"0em"}}/>
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
                                <h1 className="packtitle" style={{textAlign:"center",width:"100%"}}>
                                    {WarbandItem.Name}
                                </h1>
                        </div>
                        <div className="row">
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                    <Button style={{padding:"0em"}} variant="" onClick={() => UpdateFunction(WarbandItem)}>
                                        <FontAwesomeIcon icon={faPenToSquare} className="" style={{fontSize:"2em",margin:"0em"}}/>
                                    </Button>
                                    <span className="packvrbox">
                                        <div className="vr packvr"/>
                                    </span>
                                    <Button style={{padding:"0em"}} variant="" onClick={() => copyContentPack()}>
                                        <FontAwesomeIcon icon={faClone} className="" style={{fontSize:"2em",margin:"0em"}}/>
                                    </Button>
                                    <span className="packvrbox">
                                        <div className="vr packvr"/>
                                    </span>
                                    <Button style={{padding:"0em"}} variant="" onClick={() => exportData()}>
                                        <FontAwesomeIcon icon={faDownload} className="" style={{fontSize:"2em",margin:"0em"}}/>
                                    </Button>
                                    <span className="packvrbox">
                                        <div className="vr packvr"/>
                                    </span>
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