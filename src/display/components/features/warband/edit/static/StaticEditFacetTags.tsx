
import React, { useState } from 'react'
import { WarbandManager } from "../../../../../../classes/lists/warbandmanager"
import { Warband } from "../../../../../../classes/lists/Warband"
import { WarbandMember } from "../../../../../../classes/lists/WarbandMember"

export interface FacetTagsType {
    title      : string,
    returnItems : ( _member : WarbandMember, _item : any) => {[_name : string] : any},
}

export interface FacetTagsDataTable {[moveid: Lowercase<string>]: FacetTagsType}

export const FacetTagsDataDex : FacetTagsDataTable = {
    
}