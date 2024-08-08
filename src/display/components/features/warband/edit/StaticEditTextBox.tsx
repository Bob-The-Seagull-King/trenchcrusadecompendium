
import React, { useState } from 'react'
import { WarbandManager } from "../../../../../classes/lists/warbandmanager"
import { Warband } from "../../../../../classes/lists/Warband"
import { WarbandMember } from "../../../../../classes/lists/WarbandMember"

export interface EditTextBoxType {
    title      : string,
    returnBaseValue : (_warband : Warband | null, _member? : WarbandMember | null) => string,
    returnStyle : (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) => any,
    updateText : (_manager : WarbandManager, _warband : Warband | null, itemName : string, _member? : WarbandMember | null) => void
}

export interface EditTextBoxDataTable {[moveid: Lowercase<string>]: EditTextBoxType}

export const EditTextBoxDataDex : EditTextBoxDataTable = {
    warbandnotes : {
        title      : 'Notes & Information',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null){
            if (_warband) {
                return _warband.Notes;
            }
            return "";
        },
        returnStyle (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return {height:"10em"};
        },
        updateText (_manager : WarbandManager, _warband : Warband | null, itemName : string, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.Notes = itemName
            }
        }
    },
    membernotes : {
        title      : 'Warrior Notes',
        returnBaseValue (_warband : Warband | null, _member? : WarbandMember | null){
            if (_member) {
                return _member.Notes;
            }
            return "";
        },
        returnStyle (_manager : WarbandManager, _warband : Warband | null, _member? : WarbandMember | null) {
            return {};
        },
        updateText (_manager : WarbandManager, _warband : Warband | null, itemName : string, _member? : WarbandMember | null) {
            if (_member) {
                _member.Notes = itemName
            }
        }
    }
}