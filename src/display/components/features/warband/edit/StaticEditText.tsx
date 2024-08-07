
import React, { useState } from 'react'
import Image from 'react-bootstrap/Image';
import { WarbandManager } from "../../../../../classes/lists/warbandmanager"
import { Warband } from "../../../../../classes/lists/Warband"
import { WarbandMember } from "../../../../../classes/lists/WarbandMember"
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface EditTextType {
    title      : string,
    returnBaseValue : (_warband : Warband | null, _member? : WarbandMember | null) => string,
    returnButton : (_manager : WarbandManager, _warband : Warband | null, open : any, _member? : WarbandMember | null, _item? : string | null) => JSX.Element,
    updateText : (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _member? : WarbandMember | null) => void
}

export interface EditTextDataTable {[moveid: Lowercase<string>]: EditTextType}

export const EditTextDataDex : EditTextDataTable = {
    membername : {
        title : 'Update Member Name',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_member) {return _member.Name}
            return ""
        },
        returnButton (_manager : WarbandManager, _warband : Warband | null, open : any, _member? : WarbandMember | null) {
            return (
                <>
                    {((_member)? _member.Name : "")}
                    <FontAwesomeIcon icon={faPenToSquare} className="hovermouse" style={{fontSize:"0.75em",paddingLeft:"0.5em"}}  onClick={() => open()}/>
                </>
            )
        },
        updateText (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                if (_member) {
                    _member.Name = itemName;
                }
                update()
            }
            close();
        }
    },
    warbandname : {
        title : 'Update Warband Name',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) {return _warband.Name}
            return ""
        },
        returnButton (_manager : WarbandManager, _warband : Warband | null, open : any, _member? : WarbandMember | null) {
            const Warband_Name = (_warband)? _warband.Name : "";

            return (
                <div className="largefonttext" style={{display:"flex",alignItems:"center"}}>
                    <div style={{width:"fit-content"}}>
                        <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="d-none d-md-block">{Warband_Name}</div>
                        <div style={{marginRight:"0.1em",fontSize:"0.7em",lineHeight:"0.75em",textAlign:"center",width:"fit-content"}} className="d-block d-md-none">{Warband_Name}</div>
                    </div>
                    <FontAwesomeIcon icon={faPenToSquare} className="hovermouse" style={{fontSize:"0.5em"}}  onClick={() => open()}/>
                </div>
            )
        },
        updateText (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _member? : WarbandMember | null) {    
            if (_warband != null) {
                _warband.Name = itemName.trim();
                update()
            }
            close();
        }
    },
    warbandimage : {
        title : 'Update Warband Image URL',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) {return _warband.Image}
            return ""
        },
        returnButton (_manager : WarbandManager, _warband : Warband | null, open : any, _member? : WarbandMember | null, _item? : string | null) {
            const srcVal = (_item)? _item : "";
            
            return (
                <div className={" hovermouse borderstyler bordertc"} style={{width:"100%", maxHeight: "calc(40vh)"}} onClick={() => open()} >
                    <Image src={srcVal} fluid />
                </div>
            )
        },
        updateText (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _member? : WarbandMember | null) { 
            if (_warband) {
                _warband.Image = itemName;
            }
            update()
            close();
        }
    }
}