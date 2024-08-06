
import React, { useState } from 'react'
import { WarbandManager } from "../../../../../classes/lists/warbandmanager"
import { Warband } from "../../../../../classes/lists/Warband"
import { WarbandMember } from "../../../../../classes/lists/WarbandMember"

export interface EditNumberType {
    title      : string,
    returnBaseValue : (_warband : Warband | null, _member? : WarbandMember | null) => number,
    returnDisplayValue : (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) => JSX.Element,
    returnShowSelector : (_warband : Warband | null, _member? : WarbandMember | null) => boolean,
    updateNumber : (_manager : WarbandManager, _warband : Warband | null, itemName : number, close : any, update: any, _member? : WarbandMember | null) => void
}

export interface EditNumberDataTable {[moveid: Lowercase<string>]: EditNumberType}

export const EditNumberDataDex : EditNumberDataTable = {
    experience : {
        title : 'Update Member Experience',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_member) { return _member.Experience }
            return 0;
        },
        returnDisplayValue (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return ( <span>{"Experience : " + ((_member)? _member.Experience : "NONE")}</span>)
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_member) {return _member.Elite}
            return false;
        },
        updateNumber (_manager : WarbandManager, _warband : Warband | null, itemName : number, close : any, update: any, _member? : WarbandMember | null) {
            if ((_member) && (_warband)) {
                _member.Experience = itemName;
                update()
            }
            close();            
        }
    },
    ducatstotal : {
        title      : 'Update Total Ducats',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) { return _warband.DucatTotal }
            return 0;          
        },
        returnDisplayValue (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return ( <span>{(_warband)? (_warband.DucatCost + "/" + _warband.DucatTotal + " (" + (_warband.DucatTotal - _warband.DucatCost) + " Available)") : ""}</span>)    
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        updateNumber (_manager : WarbandManager, _warband : Warband | null, itemName : number, close : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.DucatTotal = itemName;
                update()
            }
            close()
        }
    },
    ducatslost : {
        title      : 'Update Lost Ducats',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) { return _warband.DucatLost }
            return 0;    
        },
        returnDisplayValue (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return ( <span>{((_warband)? _warband.DucatLost : 0) + " Lost to War"}</span>)        
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        updateNumber (_manager : WarbandManager, _warband : Warband | null, itemName : number, close : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.DucatLost = itemName;
                update()
            }
            close()
        }
    },
    glorytotal : {
        title      : 'Update Total Glory',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) { return _warband.GloryTotal }
            return 0;    
        },
        returnDisplayValue (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return ( <span>{(_warband)? (_warband.GloryCost + "/" + _warband.GloryTotal + " (" + (_warband.GloryTotal - _warband.GloryCost) + " Available)") : ""}</span>)    
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        updateNumber (_manager : WarbandManager, _warband : Warband | null, itemName : number, close : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.GloryTotal = itemName;
                update()
            }
            close()
        }
    },
    glorylost : {
        title      : 'Update Lost Glory',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) { return _warband.GloryLost }
            return 0;        
        },
        returnDisplayValue (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return ( <span>{((_warband)? _warband.GloryLost : 0) + " Lost to War"}</span>)  
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        updateNumber (_manager : WarbandManager, _warband : Warband | null, itemName : number, close : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.GloryLost = itemName;
                update()
            }
            close()
        }
    }
}