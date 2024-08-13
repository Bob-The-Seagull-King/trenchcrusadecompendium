
import React, { useState } from 'react'
import { WarbandMember } from "../../../../../../classes/lists/WarbandMember"
import { returnComponentsWithinParams } from '../../../../../../classes/lists/WarbandMemberStatic'
import { PlayerAddon } from '../../../../../../classes/feature/addons/Addon'
import { FactionUpgrade } from '../../../../../../classes/feature/factions/FactionUpgrade'
import { IItemPartial } from '../../../../../../classes/feature/list/ListGroup'
import { ListItem } from '../../../../../../classes/feature/list/ListItem'
import { PlayerEquipment } from '../../../../../../classes/feature/equipment/Equipment'

export interface FacetTagsType {
    returnItems : ( _member : WarbandMember, _item : any) => {[_name : string] : any},
}

export interface FacetTagsDataTable {[moveid: Lowercase<string>]: FacetTagsType}

export const FacetTagsDataDex : FacetTagsDataTable = {
    addon: {
        returnItems(_member : WarbandMember, _item : PlayerAddon) {
            const taglist : string[] = [];
            if (_item.EventTags) {
                if (_item.EventTags['include']) {
                    let i = 0;
                    for (i = 0; i < _item.EventTags['include'].length; i++) {
                        taglist.push(_item.EventTags['include'][i]);
                    }
                }
            }
            let i = 0;
            for (i = 0; i < ((_item.Tags)? _item.Tags.length : 0) ; i++) {
                if (_item.Tags) {
                    taglist.push("tag_" + _item.Tags[i].tag_name);
                }
            }
            const Items : {[_name : string] : any} = returnComponentsWithinParams(_member, taglist)
            return Items;
        }
    },
    equipment: {
        returnItems(_member : WarbandMember, _item : PlayerEquipment) {
            const taglist : string[] = [];
            if (_item.EventTags) {
                if (_item.EventTags['include']) {
                    let i = 0;
                    for (i = 0; i < _item.EventTags['include'].length; i++) {
                        taglist.push(_item.EventTags['include'][i]);
                    }
                }
            }
            taglist.push("category_" + _item.Category);
            taglist.push("equiptype_" + _item.EquipType);
            let i = 0;
            for (i = 0; i < ((_item.Tags)? _item.Tags.length : 0) ; i++) {
                if (_item.Tags) {
                    taglist.push("tag_" + _item.Tags[i].tag_name);
                }
            }
            const Items : {[_name : string] : any} = returnComponentsWithinParams(_member, taglist)
            return Items;
        }
    },
    upgrade: {
        returnItems(_member : WarbandMember, _item : FactionUpgrade) {
            const taglist : string[] = [];
            if (_item.EventTags) {
                if (_item.EventTags['include']) {
                    let i = 0;
                    for (i = 0; i < _item.EventTags['include'].length; i++) {
                        taglist.push(_item.EventTags['include'][i]);
                    }
                }
            }
            const Items : {[_name : string] : any} = returnComponentsWithinParams(_member, taglist)
            return Items;
        }
    },
    skill: {
        returnItems(_member : WarbandMember, _item : IItemPartial) {
            const taglist : string[] = [];
            if (_item.eventtags) {
                if (_item.eventtags['include']) {
                    let i = 0;
                    for (i = 0; i < _item.eventtags['include'].length; i++) {
                        taglist.push(_item.eventtags['include'][i]);
                    }
                }
            }
            const Items : {[_name : string] : any} = returnComponentsWithinParams(_member, taglist)
            return Items;
        }
    },
    injury: {
        returnItems(_member : WarbandMember, _item : ListItem) {
            const taglist : string[] = [];
            if (_item.EventTags) {
                if (_item.EventTags['include']) {
                    let i = 0;
                    for (i = 0; i < _item.EventTags['include'].length; i++) {
                        taglist.push(_item.EventTags['include'][i]);
                    }
                }
            }
            const Items : {[_name : string] : any} = returnComponentsWithinParams(_member, taglist)
            return Items;
        }
    }
}