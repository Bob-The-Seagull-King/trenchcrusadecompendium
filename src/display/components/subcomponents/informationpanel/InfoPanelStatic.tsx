import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChess, faCircleInfo, faFileLines, faQuoteLeft } from "@fortawesome/free-solid-svg-icons"
import { PlayerFaction } from '../../../../classes/feature/factions/Faction'
import { returnDescription } from '../../../../utility/util'
import { Warband } from '../../../../classes/lists/Warband'
import { WarbandMember } from '../../../../classes/lists/WarbandMember'
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import Form from 'react-bootstrap/Form';

export interface PanelType {
    id      : string,
    returnButton: ( open : NoneToNoneFunction) => JSX.Element
    returnModal: (_obj? : any) => JSX.Element,
    returnTitle: (_obj? : any) => string
}

export interface PanelDataTable {[moveid: Lowercase<string>]: PanelType}

type NoneToNoneFunction = () => void;

export const PanelDataDex : PanelDataTable = {
    contentpack: {
        id : "Content Pack",
        returnButton(open : NoneToNoneFunction) {
            return (
                <FontAwesomeIcon icon={faCircleInfo} onClick={() => open()} className="pageaccestext hovermouse" style={{fontSize:"3em"}}/>
            )
        },
        returnModal() {
            return (
                <div className="row p-3 overflow-auto flex-grow-1">
                    <div style={{"maxHeight": "calc(70vh"}}>
                        <div className="col-12">
                            <div className="row textHolder">
                                <p className="bodytext">
                                    Content packs are structured JSON files that allow people to make their Trench Crusade content accessable in
                                    Trench Compendium. Here, you can add or delete content packs to include them in the Trench Compendium. You can
                                    hold up to 5MB of content packs at any given time.
                                </p>
                                <p className="bodytext">
                                    Once uploaded you can activate or deactive a content pack. Deactivating it removes it from the Trench Compendium,
                                    but still keeps the file stored on your browser and can be turned on again at any time.
                                </p>
                                <div className="separator"><p style={{fontSize:"0.8em"}}>Incombatability</p></div>
                                <p className="bodytext">
                                    If two pieces of data across your uploaded content packs share the same ID value, this can cause issues
                                    when searching and constructing information. When this incompatability is detected, you will be notified.
                                    and are encouraged to remove the offending content pack.
                                </p>
                                <div className="separator"><p style={{fontSize:"0.8em"}}>Custom Packs</p></div>
                                <p className="bodytext">
                                    Building your own content pack is easy. View the <a className='homelink' href='https://github.com/Bob-The-Seagull-King/trenchcrusadecompendium/blob/main/README.md' rel="noreferrer" target='_blank'>README</a> documentation for the Trench Compendium to learn more
                                    about how to structure your content pack, then fill out the information as you need it. Once
                                    everything{"'"}s in order, you{"'"}re good to go!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        returnTitle() {
            return "Content Pack Information";
        }
    },
    factionlore: {
        id : "Faction Lore",
        returnTitle(_obj : PlayerFaction) {
            const ModelObject : PlayerFaction =_obj
            return ModelObject.Name;
        },
        returnButton(open : NoneToNoneFunction) {
            return (
                <div className="pageaccessbox hovermouse" onClick={() => open()}>
                    <p className="loreaccesstext">
                        Click to Expand Assorted Historical Accounts and Information
                    </p>
                </div>
            )
        },
        returnModal(_obj : PlayerFaction) {
            const ModelObject : PlayerFaction =_obj
            
            return (
                <div className="row p-3 overflow-auto flex-grow-1">
                    <div style={{"maxHeight": "calc(70vh"}}>
                        <div className="col-12">
                            <div className="row textHolder">
                                {returnDescription(ModelObject, ModelObject.Flavour)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    },
    exportwarbandbasic: {
        id : "Faction Lore",
        returnTitle(_obj : Warband) {
            return "Warband Basic Export";
        },
        returnButton(open : NoneToNoneFunction) {
            return (
                <div className="col">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => open()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Export Basic Information</div>
                        </div>
                    </div>
                </div>
            )
        },
        returnModal(_obj : string) {
            return (
                <div className="row">
                    <div className="col-12">
                        <InputGroup className="tagboxpad" >
                            <Form.Control as="textarea" aria-label="With textarea" readOnly defaultValue={_obj} placeholder={""} className="formparagraphtext" style={{height:"40em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                        </InputGroup>
                    </div>
                </div>
            )
        }
    },
    exportwarbandexpanded: {
        id : "Faction Lore",
        returnTitle(_obj : string) {
            return "Warband Export";
        },
        returnButton(open : NoneToNoneFunction) {
            return (
                <div className="col">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => open()}>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Export Warband Information</div>
                        </div>
                    </div>
                </div>
            )
        },
        returnModal(_obj : string) {
            return (
                <div className="row">
                    <div className="col-12">
                        <InputGroup className="tagboxpad" >
                            <Form.Control as="textarea" aria-label="With textarea" readOnly defaultValue={_obj} placeholder={""} className="formparagraphtext" style={{height:"40em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                        </InputGroup>
                    </div>
                </div>
            )
        }
    },
    exportmemberbasic: {
        id : "Faction Lore",
        returnTitle(_obj : string) {
            return "Warband Export";
        },
        returnButton(open : NoneToNoneFunction) {
            return (
                <Button style={{padding:"0em",paddingLeft:"0.5em"}} variant="" onClick={() => open()}>
                    <FontAwesomeIcon icon={faQuoteLeft} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                </Button>
            )
        },
        returnModal(_obj : string) {
            return (
                <div className="row">
                    <div className="col-12">
                        <InputGroup className="tagboxpad" >
                            <Form.Control as="textarea" aria-label="With textarea" readOnly defaultValue={_obj} placeholder={""} className="formparagraphtext" style={{height:"20em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                        </InputGroup>
                    </div>
                </div>
            )
        }
    },
    exportmemberexpanded: {
        id : "Faction Lore",
        returnTitle(_obj : string) {
            return "Expanded Member Information";
        },
        returnButton(open : NoneToNoneFunction) {
            return (
                <Button style={{padding:"0em"}} variant="" onClick={() => open()}>
                    <FontAwesomeIcon icon={faFileLines} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                </Button>
            )
        },
        returnModal(_obj : string) {
            return (
                <div className="row">
                    <div className="col-12">
                        <InputGroup className="tagboxpad" >
                            <Form.Control as="textarea" aria-label="With textarea" readOnly defaultValue={_obj} placeholder={""} className="formparagraphtext" style={{height:"20em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                        </InputGroup>
                    </div>
                </div>
            )
        }
    },
    exportmembertts: {
        id : "Faction Lore",
        returnTitle(_obj : string) {
            return "Table Top Simulator Formated Model Description";
        },
        returnButton(open : NoneToNoneFunction) {
            return (
                <Button style={{padding:"0em"}} variant="" onClick={() => open()}>
                    <FontAwesomeIcon icon={faChess} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                </Button>
            )
        },
        returnModal(_obj : string) {
            return (
                <div className="row">
                    <div className="col-12">
                        <InputGroup className="tagboxpad" >
                            <Form.Control as="textarea" aria-label="With textarea" readOnly defaultValue={_obj} placeholder={""} className="formparagraphtext" style={{height:"20em",fontFamily:"'Courier-New', Courier, monospace"}}/>
                        </InputGroup>
                    </div>
                </div>
            )
        }
    }
}