
import React, { useState } from 'react'
import { WarbandManager } from "../../../../../../classes/lists/warbandmanager"
import { Warband } from "../../../../../../classes/lists/Warband"
import { WarbandMember } from "../../../../../../classes/lists/WarbandMember"

export interface FacetTagsType {
    returnItems : ( _member : WarbandMember, _item : any) => {[_name : string] : any},
}

export interface FacetTagsDataTable {[moveid: Lowercase<string>]: FacetTagsType}

export const FacetTagsDataDex : FacetTagsDataTable = {
    addon: {
        returnItems(_member : WarbandMember, _item : any) {
            const Items : {[_name : string] : any} = {}
            Items['skill'] = _member.Skills;
            return Items;
        }
    },
    equipment: {
        returnItems(_member : WarbandMember, _item : any) {
            const Items : {[_name : string] : any} = {}
            Items['skill'] = _member.Skills;
            return Items;
        }
    },
    upgrade: {
        returnItems(_member : WarbandMember, _item : any) {
            const Items : {[_name : string] : any} = {}
            Items['skill'] = _member.Skills;
            return Items;
        }
    },
    skill: {
        returnItems(_member : WarbandMember, _item : any) {
            const Items : {[_name : string] : any} = {}
            Items['skill'] = _member.Skills;
            return Items;
        }
    },
    injury: {
        returnItems(_member : WarbandMember, _item : any) {
            const Items : {[_name : string] : any} = {}
            Items['skill'] = _member.Skills;
            return Items;
        }
    }
}