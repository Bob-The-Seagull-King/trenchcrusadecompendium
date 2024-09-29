
import React, { useState } from 'react'


import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { WarbandManager } from "../../../../../../classes/lists/warbandmanager"
import { Warband } from "../../../../../../classes/lists/Warband"
import { WarbandMember } from "../../../../../../classes/lists/WarbandMember"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GenericPanel from "../../../../generics/GenericPanel"
import PartialItemDisplay from "../../../partialitem/PartialItemDisplay"
import FullItemDisplay from '../../../../features/list/FullItemDisplay'

export interface EditItemType {
    title      : string,
    returnItemArray : (_warband : Warband | null, _member? : WarbandMember | null) => any[],
    returnShowSelector : (_warband : Warband | null, _member? : WarbandMember | null) => boolean,
    returnOptions : (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) => JSX.Element,
    returnItem : (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) => JSX.Element,
    addNewItem : (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _member? : WarbandMember | null) => void,
    tossItem? : (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) => void,
    sellItem? : (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) => void,
    refundItem? : (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) => void
}

export interface EditItemDataTable {[moveid: Lowercase<string>]: EditItemType}

export const EditItemDataDex : EditItemDataTable = {
    skills: {
        title: 'Add new Skills',
        returnItemArray (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_member) { return _member.Skills }
            return []
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_member) { return _member.Elite }
            return false;
        },
        addNewItem (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _member? : WarbandMember | null) {
            
            const skilldata : any = _manager.GetSkillByID(itemName);

            if ((skilldata != null) && (_member) && (_warband)) {
                _member.Skills.push(skilldata);
                update();
            }
            close();
        },
        returnItem (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            return (
                <div className="row">
                    <div className="col-9 align-content-center">
                        <div className="equipbody">
                            <GenericPanel titlename={_item.name} d_colour={"tc"} d_name={_item.name} d_type={""} d_method={() => 
                                <PartialItemDisplay data={_item}/>
                            }/>
                        </div>
                    </div>
                    <div className="col-3 align-content-center">
                        <div className="row justify-content-center">
                        <div className="subfonttext" style={{display:"flex",alignItems:"center",width:"100%"}}  >
                        <>
                            <OverlayTrigger overlay={
                            <Tooltip style={{ width: "30vw" }} className="overcomeTooltip" id="tooltip">
                                <div style={{ width: "30vw" }} className='popupBody'>
                                <div className={'modelStructure borderstyler bordertc'}>
                                    <h1 className={'titleShape titlebody titlestyler backgroundtc'}>
                                        {"Toss"}
                                    </h1>
                                    
                                    <div className='modelInternalStructure'>
                                        <div>
                                        {"Remove this item without getting any money back"}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Tooltip>
                            }>
                            <FontAwesomeIcon icon={faTrash} className="hovermouse" style={{fontSize:"0.55em"}}  onClick={() => { if (_this.tossItem) {_this.tossItem(_this, _manager, _warband, _item, update, _member)}}}/>
                            </OverlayTrigger>
                        </>
                        </div>
                        </div>
                    </div>
                    <div className="verticalspacer"/>
                </div>
            )
        },
        returnOptions (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return ( <> {_manager.Skills.map((item) => ( <option key="modeloption" value={item.id}>{item.name}</option> ))} </> )
        },
        tossItem(_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_member && _warband) {
                _manager.DeleteSkillFromModel(_item, _member, _warband);
                update();
            }
        }
    },
    scars: {
        title : 'Add New Scar',
        returnItemArray (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_member) { return _member.Injuries }
            return [];
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_member) { return _member.Elite }
            return false;
        },
        returnOptions (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return (<>{_manager.Injuries.map((item) => ( <option key="modeloption" value={item.ID}>{item.Name}</option> ))}</>)
        },
        returnItem (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            return (
                <div className="row">
                    <div className="col-9 align-content-center">
                        <div className="equipbody">
                            <GenericPanel titlename={_item.Name} d_colour={"tc"} d_name={_item.Name} d_type={""} d_method={() => 
                                <FullItemDisplay data={_item}/>
                            }/>
                        </div>
                    </div>
                    <div className="col-3 align-content-center">
                        <div className="row justify-content-center">
                        <div className="subfonttext" style={{display:"flex",alignItems:"center",width:"100%"}}  >
                        <>
                            <OverlayTrigger overlay={
                            <Tooltip style={{ width: "30vw" }} className="overcomeTooltip" id="tooltip">
                                <div style={{ width: "30vw" }} className='popupBody'>
                                <div className={'modelStructure borderstyler bordertc'}>
                                    <h1 className={'titleShape titlebody titlestyler backgroundtc'}>
                                        {"Toss"}
                                    </h1>
                                    
                                    <div className='modelInternalStructure'>
                                        <div>
                                        {"Remove this item without getting any money back"}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Tooltip>
                            }>
                            <FontAwesomeIcon icon={faTrash} className="hovermouse" style={{fontSize:"0.55em"}}  onClick={() => { if (_this.tossItem) {_this.tossItem(_this, _manager, _warband, _item, update, _member)}}}/>
                            </OverlayTrigger>
                        </>
                        </div>
                        </div>
                    </div>
                    <div className="verticalspacer"/>
                </div>
            )
        },
        addNewItem (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _member? : WarbandMember | null) {
            const injurydata : any = _manager.GetScarByID(itemName);

            if ((injurydata != null) && (_member) && (_warband)) {
                _member.Injuries.push(injurydata);
                update();
            }
            close();
        },
        tossItem (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_member && _warband) {
                _manager.DeleteScarFromModel(_item, _member, _warband);
                update();
            }
        }
    },
    locations: {
        title : 'Add New Location',
        returnItemArray (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) {return _warband.Locations}
            return []
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        returnOptions (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return (<>{_manager.Locations.map((item) => ( <option key="modeloption" value={item.id}>{item.name}</option> ))}</>)
        },
        returnItem (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            return (
                <div className="row">
                    <div className="col-9 align-content-center">
                        <div className="equipbody">
                            <GenericPanel titlename={_item.name} d_colour={"tc"} d_name={_item.name} d_type={""} d_method={() => 
                                <PartialItemDisplay data={_item}/>
                            }/>
                        </div>
                    </div>
                    <div className="col-3 align-content-center">
                        <div className="row justify-content-center">
                            <div className="subfonttext" style={{display:"flex",alignItems:"center",width:"100%"}}  >
                            <>
                            <OverlayTrigger overlay={
                            <Tooltip style={{ width: "30vw" }} className="overcomeTooltip" id="tooltip">
                                <div style={{ width: "30vw" }} className='popupBody'>
                                <div className={'modelStructure borderstyler bordertc'}>
                                    <h1 className={'titleShape titlebody titlestyler backgroundtc'}>
                                        {"Toss"}
                                    </h1>
                                    
                                    <div className='modelInternalStructure'>
                                        <div>
                                        {"Remove this item without getting any money back"}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Tooltip>
                            }>
                            <FontAwesomeIcon icon={faTrash} className="hovermouse" style={{fontSize:"0.55em"}}  onClick={() => { if (_this.tossItem) {_this.tossItem(_this, _manager, _warband, _item, update, _member)}}}/>
                            </OverlayTrigger>
                        </>
                            </div>
                        </div>
                    </div>
                    <div className="verticalspacer"/>
                </div>
            )
        },
        addNewItem (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _member? : WarbandMember | null) {
            const locationdata : any = _manager.GetLocationByID(itemName);
            if ((locationdata != null) && (_warband)) {
                _warband.Locations.push(locationdata);
                update();
            }
            close();
        },
        tossItem (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _manager.DeleteLocationFromWarband(_item, _warband);
                update();
            }
        }
    },
    explorationmodifiers: {
        title : 'Add New Modifier',
        returnItemArray (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) {return _warband.Modifiers}
            return []
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        returnOptions (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return (<>{_manager.Modifiers.map((item) => ( <option key="modeloption" value={item.id}>{item.name}</option> ))}</>)
        },
        returnItem (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            return (
                <div className="row">
                    <div className="col-9 align-content-center">
                        <div className="equipbody">
                            <GenericPanel titlename={_item.name} d_colour={"tc"} d_name={_item.name} d_type={""} d_method={() => 
                                <PartialItemDisplay data={_item}/>
                            }/>
                        </div>
                    </div>
                    <div className="col-3 align-content-center">
                        <div className="row justify-content-center">
                            <div className="subfonttext" style={{display:"flex",alignItems:"center",width:"100%"}}  >
                            <>
                            <OverlayTrigger overlay={
                            <Tooltip style={{ width: "30vw" }} className="overcomeTooltip" id="tooltip">
                                <div style={{ width: "30vw" }} className='popupBody'>
                                <div className={'modelStructure borderstyler bordertc'}>
                                    <h1 className={'titleShape titlebody titlestyler backgroundtc'}>
                                        {"Toss"}
                                    </h1>
                                    
                                    <div className='modelInternalStructure'>
                                        <div>
                                        {"Remove this item without getting any money back"}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Tooltip>
                            }>
                            <FontAwesomeIcon icon={faTrash} className="hovermouse" style={{fontSize:"0.55em"}}  onClick={() => { if (_this.tossItem) {_this.tossItem(_this, _manager, _warband, _item, update, _member)}}}/>
                            </OverlayTrigger>
                        </>
                            </div>
                        </div>
                    </div>
                    <div className="verticalspacer"/>
                </div>
            )
        },
        addNewItem (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _member? : WarbandMember | null) {
            const Modifierdata : any = _manager.GetModifierByID(itemName);
    
            if ((Modifierdata != null) && (_warband)) {
                _warband.Modifiers.push(Modifierdata);
                update();
            }
            close();

        },
        tossItem (_this : EditItemType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _manager.DeleteModifierFromWarband(_item, _warband);
                update();
            }
        }
    }
}