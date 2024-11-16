
import React, { useState } from 'react'
import { WarbandManager } from "../../../../../../classes/lists/warbandmanager"
import { Warband } from "../../../../../../classes/lists/Warband"
import { WarbandMember } from "../../../../../../classes/lists/WarbandMember"
import ItemEquipDisplay from '../ItemEquipDisplay'
import { Requester } from '../../../../../../factories/Requester'
import { FactionUpgrade } from '../../../../../../classes/feature/factions/FactionUpgrade'
import ItemUpgradeDisplay from '../ItemUpgradeDisplay'
import ItemMemberDisplay from '../ItemMemberDisplay'
import { GetDucatCost, GetGloryCost } from '../../../../../../classes/lists/warbandmanagerstatic'
import { makestringpresentable } from '../../../../../../utility/functions'

export interface ItemCost {
    type : string,
    value : number
}

export interface EditListType {
    title      : string,
    returnItemArray : (_warband : Warband | null, _member? : WarbandMember | null) => any[],
    returnShowSelector : (_warband : Warband | null, _member? : WarbandMember | null) => boolean,
    returnOptions : (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) => any[],
    displayOptions : (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) => JSX.Element,
    returnFilters : () => {[_name : string] : boolean},
    returnItem : (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) => JSX.Element,
    returnItemData : (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) => any,
    returnComment : (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) => string,
    returnCost : (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) => ItemCost,
    addNewItem : (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _cost : ItemCost, _member? : WarbandMember | null) => void,
    filterItem : (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean},  _member? : WarbandMember | null) => true | false,
    tossItem? : ( _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) => void,
    sellItem? : ( _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) => void,
    refundItem? : (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) => void
}

export interface EditListDataTable {[moveid: Lowercase<string>]: EditListType}

export const EditListDataDex : EditListDataTable = {
    warbandequipment: {
        title: 'Add To The Armoury',
        returnItemArray (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) { return [{"Armoury": _warband.Armoury}]; }
            return []
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        returnOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null,  _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if ((_filters['Restricted'] === true) && (_warband)) {
                return _warband.Faction.Equipment.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member))            
            } else { return _manager.Equipment.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member)) }
        },
        displayOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            return (
                <>
                    {(_filters['Restricted'] === true) && <option key={"modeloption"} value={(_item.Object)? _item.Object.ID : _item.ID}>{(_item.Object)? _item.Object.Name  + " (" + _item.Cost + " " + _item.CostID + ")" + ((_item.Limit > 0)? " (Limit " + _item.Limit + ")" : "") : _item.Name}</option> } 
                    {(_filters['Restricted'] === false) && <option key={"modeloption"} value={_item.ID}>{_item.Name}</option>}
                </>
            )
        },
        returnFilters () {
            const FilterList : {[_name : string] : boolean} = {}

            FilterList['Restricted'] = true;
            FilterList['Ranged'] = true;
            FilterList['Melee'] = true;
            FilterList['Armour'] = true;
            FilterList['Equipment'] = true;
            FilterList['Glory'] = true;
            FilterList['Ducats'] = true;

            return FilterList;
        },
        returnItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            return (
                <>
                    {Object.keys(_item).map((item) => (
                        <>
                            <div className="verticalspacerbig"/>
                            <div className="separator" style={{fontSize:"3em"}}>{item}</div>
                            {_item[item].map((_var : any) => (
                                <ItemEquipDisplay key={_var.ID} updater={update} manager={_manager} warband={_warband} data={_var} tossitem={_this.tossItem} sellitem={_this.sellItem} refunditem={_this.refundItem}/>
                            ))}
                        </>
                    ))}
                </>
            )
        },
        returnItemData (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if ((_filter['Restricted'] === true) && (_warband)) {
                const tempModel = _manager.GetEquipmentByID(_item)
                let temp : any = null;
                let i = 0;
                for (i = 0 ; i < _warband.Faction.Equipment.length ; i++) {
                    if (_warband.Faction.Equipment[i].ID == (tempModel? tempModel.ID : "")) {
                        temp = _warband.Faction.Equipment[i]
                        break;
                    }
                }
                return temp;
            } else {
                return _item;
            }
        },
        returnComment (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if (typeof _item === 'string') { return  ""
            } else if (_warband) {
                let rstrctnlst = "";
                let i = 0;
                let ModelEquip : any = null;
                
                for (i = 0; i < _warband.Faction.Equipment.length ; i++) {
                    if (_warband.Faction.Equipment[i].ID == _item.ID) { ModelEquip = _warband.Faction.Equipment[i] }
                }

                if (ModelEquip != null) {
                    if (ModelEquip.Limit > 0) {
                        rstrctnlst += "LIMIT: " + ModelEquip.Limit;
                        if (ModelEquip.Restrictions.length > 0) { rstrctnlst += ", " }
                    }

                    let i = 0;
                    for (i = 0; i < ModelEquip.Restrictions.length; i++) {
                        if ( i > 0) { rstrctnlst += ", " }
                        if (ModelEquip.Restrictions[i].type == "keyword") {
                            rstrctnlst += ModelEquip.Restrictions[i].val.toString().toUpperCase();
                        } else if (ModelEquip.Restrictions[i].type == "purchase") {
                            rstrctnlst += (ModelEquip.Restrictions[i].val === 'explore')? "Exploration Only" : "";
                        } else if (ModelEquip.Restrictions[i].type == "antikeyword") {
                            rstrctnlst += "Not " + ModelEquip.Restrictions[i].val.toString().toUpperCase();
                        } else if (ModelEquip.Restrictions[i].type == "model") {
                            rstrctnlst += (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'models', id: ModelEquip.Restrictions[i].val.toString()}})).name
                         } else if (ModelEquip.Restrictions[i].type == "model") {
                            rstrctnlst += (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'upgrade', id: ModelEquip.Restrictions[i].val.toString()}})).name
                         } else { rstrctnlst += ModelEquip.Restrictions[i].val.toString() }
                    }
                }

                if (rstrctnlst == "") { rstrctnlst = "-" }
                return rstrctnlst;
            }
            return "";
        },
        returnCost (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if (typeof _item === 'string') {
                return {type: 'ducats', value: 0}
            } else { return {type: _item.CostID, value: _item.Cost} }
        },
        addNewItem (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _cost : ItemCost, _member? : WarbandMember | null) {
            if (_warband) {
                if (_cost.type == "ducats") {
                    _warband.PayChest -= Math.floor(_cost.value)
                }
                const Result = _manager.NewEquipmentForWarband(_warband, itemName, _cost.value.toString(), _cost.type);
                update()
            }
            close();
        },
        filterItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean},  _member? : WarbandMember | null) {
            
            let ItemToCheck;

            if (_filter['Restricted'] === true) {
                if (_warband) {
                    if ((_filter['Glory'] === false) && (_item.CostID === 'glory')) { return false; }
                    if ((_filter['Ducats'] === false) && (_item.CostID === 'ducats')) { return false; }
                    ItemToCheck = _item.Object;
                } else { return false; }
            } else { ItemToCheck = _item; }

            if ((_filter['Ranged'] === false) && (ItemToCheck.Category === 'ranged')) { return false; }     
            if ((_filter['Melee'] === false) && (ItemToCheck.Category === 'melee')) { return false; }     
            if ((_filter['Armour'] === false) && (ItemToCheck.Category === 'armour')) { return false; }     
            if ((_filter['Equipment'] === false) && (ItemToCheck.Category === 'equipment')) { return false; }            

            return true;
        },
        tossItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                if (_item.CostType == "ducats") {
                    _warband.DucatLost += _item.Cost;
                } else {
                    _warband.GloryLost += _item.Cost;
                }
                _manager.DeleteEquipmentFromWarband(_item, _warband)
                update()
            }
        },
        sellItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                if (_item.CostType == "ducats") {
                    _warband.PayChest += Math.floor(_item.Cost * 0.5);
                    _warband.DucatLost += Math.floor(_item.Cost * 0.5);
                } else {
                    _warband.GloryLost += Math.floor(_item.Cost * 0.5)
                }
                _manager.DeleteEquipmentFromWarband(_item, _warband)
                update()
            }
        },
        refundItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                if (_item.CostType == "ducats") {
                    _warband.PayChest += Math.floor(_item.Cost);
                }
                _manager.DeleteEquipmentFromWarband(_item, _warband)
                update()
            }
        }

    },
    warbandmember: {
        title: 'Add New Warrior',
        returnItemArray (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) { return [{"Elite" : _warband.Members.filter(x => x.Elite === true && x.Reserve !== true), "Infantry" : _warband.Members.filter(x => x.Elite === false && x.Reserve !== true)}]; }
            return []
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        returnOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null,  _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if ((_filters['Restricted'] === true) && (_warband)) {
                return _warband.Faction.Models.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member))            
            } else { return _manager.Models.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member)) }
        },
        displayOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            return (
                <>
                    {(_filters['Restricted'] === true) && <option key={"modeloption"} value={(_item.Object)? _item.Object.ID : _item.ID}>{(_item.Object)? _item.Object.Name  + " (" + _item.Cost + " " + _item.CostID + ")"  + ((_item.LimitMax > 0)? " (Count " + ((_item.LimitMin === _item.LimitMax)? _item.LimitMin: _item.LimitMin + "-" + _item.LimitMax) + ")" : "") : _item.Name}</option> } 
                    {(_filters['Restricted'] === false) && <option key={"modeloption"} value={_item.ID}>{_item.Name}</option>}
                </>
            )
        },
        returnFilters () {
            const FilterList : {[_name : string] : boolean} = {}

            FilterList['Restricted'] = true;
            FilterList['Glory'] = true;
            FilterList['Ducats'] = true;

            return FilterList;
        },
        returnItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            return ( 
                <>
                    {Object.keys(_item).map((item) => ( 
                        <>
                            <div className="verticalspacerbig"/>
                            <div className="separator" style={{fontSize:"3em"}}>{item}</div>
                            {_item[item].map((_var : any) => (
                                <>
                                    <div className="verticalspacerbig"/>
                                    <ItemMemberDisplay updater={update} manager={_manager} warband={_warband} member={_var} tossitem={_this.tossItem} sellitem={_this.sellItem} refunditem={_this.refundItem}/>
                                </>
                            ))}
                        </>
                     ))}
                </> 
            )
        },
        returnItemData (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if ((_filter['Restricted'] === true) && (_warband)) {
                const tempModel = _manager.GetModelByID(_item)
                let temp : any = null;
                let i = 0;
                for (i = 0 ; i < _warband.Faction.Models.length ; i++) {
                    if (_warband.Faction.Models[i].ID == (tempModel? tempModel.ID : "")) {
                        temp = _warband.Faction.Models[i]
                        break;
                    }
                }
                return temp;
            } else {
                return _item;
            }
        },
        returnComment (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if (typeof _item === 'string') { return  ""
            } else if (_warband) {
                let rstrctnlst = "";
                let i = 0;
                for (i = 0; i < _item.Object.Tags.length; i++) {
                    if (i > 0) {
                        rstrctnlst += ', '
                    }
                    rstrctnlst += makestringpresentable( _item.Object.Tags[i].tag_name)
                }
                return rstrctnlst;
            }
            return "";
        },
        returnCost (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if (typeof _item === 'string') {
                return {type: 'ducats', value: 0}
            } else { return {type: _item.CostID, value: _item.Cost} }
        },
        addNewItem (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _cost : ItemCost, _member? : WarbandMember | null) {
            if (_warband) {
                if (_cost.type == "ducats") {
                    _warband.PayChest -= Math.floor(_cost.value)
                }
                const Result = _manager.NewMember(_warband, "", itemName, _cost.value.toString(), _cost.type);
                update()
            }
            close();
        },
        filterItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean},  _member? : WarbandMember | null) {

            if (_filter['Restricted'] === true) {
                if (_warband) {
                    if ((_filter['Glory'] === false) && (_item.CostID === 'glory')) { return false; }
                    if ((_filter['Ducats'] === false) && (_item.CostID === 'ducats')) { return false; }
                } else { return false; }
            }        

            return true;
        },
        tossItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.DucatLost += parseInt(GetDucatCost(_item));
                _warband.GloryLost += parseInt(GetGloryCost(_item));
                _manager.DeleteModelFromWarband(_item, _warband)
                update()
            }
        },
        sellItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.DucatLost +=  Math.floor(parseInt(GetDucatCost(_item)));
                _warband.GloryLost +=  Math.floor(parseInt(GetGloryCost(_item)));
                _manager.DeleteModelFromWarband(_item, _warband)
                update()
            }
        },
        refundItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.PayChest +=  Math.floor(parseInt(GetDucatCost(_item)));
                _manager.DeleteModelFromWarband(_item, _warband)
                update()
            }
        }

    },
    warbandreservemember: {
        title: 'Add New Reserve',
        returnItemArray (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_warband) { return [{"Reserve" : _warband.Members.filter(x =>x.Reserve == true)}]; }
            return []
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        returnOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null,  _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if ((_filters['Restricted'] === true) && (_warband)) {
                return _warband.Faction.Models.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member))            
            } else { return _manager.Models.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member)) }
        },
        displayOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            return (
                <>
                    {(_filters['Restricted'] === true) && <option key={"modeloption"} value={(_item.Object)? _item.Object.ID : _item.ID}>{(_item.Object)? _item.Object.Name  + " (" + _item.Cost + " " + _item.CostID + ")"  + ((_item.LimitMax > 0)? " (Count " + ((_item.LimitMin === _item.LimitMax)? _item.LimitMin: _item.LimitMin + "-" + _item.LimitMax) + ")" : "") : _item.Name}</option> } 
                    {(_filters['Restricted'] === false) && <option key={"modeloption"} value={_item.ID}>{_item.Name}</option>}
                </>
            )
        },
        returnFilters () {
            const FilterList : {[_name : string] : boolean} = {}

            FilterList['Restricted'] = true;
            FilterList['Glory'] = true;
            FilterList['Ducats'] = true;

            return FilterList;
        },
        returnItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            return ( 
                <>
                    {Object.keys(_item).map((item) => ( 
                        <>
                            <div className="verticalspacerbig"/>
                            <div className="separator" style={{fontSize:"3em"}}>{item}</div>
                            {_item[item].map((_var : any) => (
                                <>
                                    <div className="verticalspacerbig"/>
                                    <ItemMemberDisplay updater={update} manager={_manager} warband={_warband} member={_var} tossitem={_this.tossItem} sellitem={_this.sellItem} refunditem={_this.refundItem}/>
                                </>
                            ))}                            
                        </>
                     ))}
                </> 
            )
        },
        returnItemData (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if ((_filter['Restricted'] === true) && (_warband)) {
                const tempModel = _manager.GetModelByID(_item)
                let temp : any = null;
                let i = 0;
                for (i = 0 ; i < _warband.Faction.Models.length ; i++) {
                    if (_warband.Faction.Models[i].ID == (tempModel? tempModel.ID : "")) {
                        temp = _warband.Faction.Models[i]
                        break;
                    }
                }
                return temp;
            } else {
                return _item;
            }
        },
        returnComment (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if (typeof _item === 'string') { return  ""
            } else if (_warband) {
                let rstrctnlst = "";
                let i = 0;
                for (i = 0; i < _item.Object.Tags.length; i++) {
                    if (i > 0) {
                        rstrctnlst += ', '
                    }
                    rstrctnlst += makestringpresentable( _item.Object.Tags[i].tag_name)
                }
                return rstrctnlst;
            }
            return "";
        },
        returnCost (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if (typeof _item === 'string') {
                return {type: 'ducats', value: 0}
            } else { return {type: _item.CostID, value: _item.Cost} }
        },
        addNewItem (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _cost : ItemCost, _member? : WarbandMember | null) {
            if (_warband) {
                if (_cost.type == "ducats") {
                    _warband.PayChest -= Math.floor(_cost.value)
                }
                const Result = _manager.NewMember(_warband, "", itemName, _cost.value.toString(), _cost.type, true);
                update()
            }
            close();
        },
        filterItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean},  _member? : WarbandMember | null) {

            if (_filter['Restricted'] === true) {
                if (_warband) {
                    if ((_filter['Glory'] === false) && (_item.CostID === 'glory')) { return false; }
                    if ((_filter['Ducats'] === false) && (_item.CostID === 'ducats')) { return false; }
                } else { return false; }
            }        

            return true;
        },
        tossItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.DucatLost += parseInt(GetDucatCost(_item));
                _warband.GloryLost += parseInt(GetGloryCost(_item));
                _manager.DeleteModelFromWarband(_item, _warband)
                update()
            }
        },
        sellItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.DucatLost +=  Math.floor(parseInt(GetDucatCost(_item)));
                _warband.GloryLost +=  Math.floor(parseInt(GetGloryCost(_item)));
                _manager.DeleteModelFromWarband(_item, _warband)
                update()
            }
        },
        refundItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband) {
                _warband.PayChest +=  Math.floor(parseInt(GetDucatCost(_item)));
                _manager.DeleteModelFromWarband(_item, _warband)
                update()
            }
        }

    },
    memberequipment: {
        title      : 'Equip This Model',
        returnItemArray (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_member) { return _member.Equipment; }
            return []
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        returnOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null,  _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if ((_filters['Restricted'] === true) && (_warband)) {
                return _warband.Faction.Equipment.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member))            
            } else { return _manager.Equipment.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member)) }
        },
        displayOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            return (
                <>
                    {(_filters['Restricted'] === true) && <option key={"modeloption"} value={(_item.Object)? _item.Object.ID : _item.ID}>{(_item.Object)? _item.Object.Name  + " (" + _item.Cost + " " + _item.CostID + ")" + ((_item.Limit > 0)? " (Limit " + _item.Limit + ")" : ""): _item.Name}</option> } 
                    {(_filters['Restricted'] === false) && <option key={"modeloption"} value={_item.ID}>{_item.Name}</option>}
                </>
            )
        },
        returnFilters () {
            const FilterList : {[_name : string] : boolean} = {}

            FilterList['Restricted'] = true;
            FilterList['Ranged'] = true;
            FilterList['Melee'] = true;
            FilterList['Armour'] = true;
            FilterList['Equipment'] = true;
            FilterList['Glory'] = true;
            FilterList['Ducats'] = true;

            return FilterList;
        },
        returnItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            return ( <ItemEquipDisplay  updater={update} manager={_manager} warband={_warband} member={_member} data={_item} tossitem={_this.tossItem} sellitem={_this.sellItem} refunditem={_this.refundItem}/> )
        },
        returnItemData (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if ((_filter['Restricted'] === true) && (_warband)) {
                const tempModel = _manager.GetEquipmentByID(_item)
                let temp : any = null;
                let i = 0;
                for (i = 0 ; i < _warband.Faction.Equipment.length ; i++) {
                    if (_warband.Faction.Equipment[i].ID == (tempModel? tempModel.ID : "")) {
                        temp = _warband.Faction.Equipment[i]
                        break;
                    }
                }
                return temp;
            } else {
                return _item;
            }
        },
        returnComment (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if (typeof _item === 'string') { return  ""
            } else if (_warband) {
                let rstrctnlst = "";
                let i = 0;
                let ModelEquip : any = null;
                
                for (i = 0; i < _warband.Faction.Equipment.length ; i++) {
                    if (_warband.Faction.Equipment[i].ID == _item.ID) { ModelEquip = _warband.Faction.Equipment[i] }
                }

                if (ModelEquip != null) {
                    if (ModelEquip.Limit > 0) {
                        rstrctnlst += "LIMIT: " + ModelEquip.Limit;
                        if (ModelEquip.Restrictions.length > 0) { rstrctnlst += ", " }
                    }

                    let i = 0;
                    for (i = 0; i < ModelEquip.Restrictions.length; i++) {
                        if ( i > 0) { rstrctnlst += ", " }
                        if (ModelEquip.Restrictions[i].type == "keyword") {
                            rstrctnlst += ModelEquip.Restrictions[i].val.toString().toUpperCase();
                        } else if (ModelEquip.Restrictions[i].type == "purchase") {
                            rstrctnlst += (ModelEquip.Restrictions[i].val === 'explore')? "Exploration Only" : "";
                        }else if (ModelEquip.Restrictions[i].type == "antikeyword") {
                            rstrctnlst += "Not " + ModelEquip.Restrictions[i].val.toString().toUpperCase();
                        } else if (ModelEquip.Restrictions[i].type == "model") {
                            rstrctnlst += (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'models', id: ModelEquip.Restrictions[i].val.toString()}})).name
                         } else if (ModelEquip.Restrictions[i].type == "model") {
                            rstrctnlst += (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'upgrade', id: ModelEquip.Restrictions[i].val.toString()}})).name
                         }else { rstrctnlst += ModelEquip.Restrictions[i].val.toString() }
                    }
                }

                if (rstrctnlst == "") { rstrctnlst = "-" }
                return rstrctnlst;
            }
            return "";
        },
        returnCost (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if (typeof _item === 'string') {
                return {type: 'ducats', value: 0}
            } else { return {type: _item.CostID, value: _item.Cost} }
        },
        addNewItem (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _cost : ItemCost, _member? : WarbandMember | null) {
            if (_warband && _member) {
                if (_cost.type == "ducats") {
                    _warband.PayChest -= Math.floor(_cost.value)
                }
                const Result = _manager.NewEquipmentForMember(_member, itemName, _cost.value.toString(), _cost.type);
                update()
            }
            close();
        },
        filterItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean},  _member? : WarbandMember | null) {
            
            let ItemToCheck;

            if (_filter['Restricted'] === true) {
                if (_warband && _member) {

                    // Filter By Model Type ---------------------------------------

                    let HasModel = false;
                    let ModelMatch = false;
                    let HasAntiKeyword = false;
                    let AntiKeywordMatch = false;
                    
                    let j = 0;
                    let k = 0;
                    for (j = 0; j < _item.Restrictions.length ; j++) {
                        if (_item.Restrictions[j].type == "model") {
                            
                            HasModel = true;
                            if (_item.Restrictions[j].val == _member.Model.ID) {
                                ModelMatch = true;
                            }
                        }
                        if (_item.Restrictions[j].type == "upgrade") {
                            
                            HasModel = true;
                            for (let k = 0 ; k < _member.Upgrades.length; k++) {
                                if (_item.Restrictions[j].val == _member.Upgrades[k].ID) {
                                    ModelMatch = true;
                                }
                            }
                            
                        }
                        
                        if (_item.Restrictions[j].type == "keyword") {
                            HasModel = true;
                            if (_item.Restrictions[j].val.toString().toUpperCase() === 'ELITE') {
                                if (_member.Elite === true) {
                                    ModelMatch = true;
                                }
                            } else {
                                if ((_member.Model.Object.Tags != undefined) && (_member.Model.Object.Tags != null)){
                                    for (k = 0; k < (_member.Model.Object.Tags? _member.Model.Object.Tags.length : 0); k++) {
                                        const tag: any = _member.Model.Object.Tags[k]
                                        if ((tag.tag_name.toUpperCase()) == _item.Restrictions[j].val.toString().toUpperCase()) {
                                            ModelMatch = true;
                                        }
                                    }
                                }
                            }
                            
                        }
                        if (_item.Restrictions[j].type == "antikeyword") {
                            HasAntiKeyword = true;
                            if ((_member.Model.Object.Tags != undefined) && (_member.Model.Object.Tags != null)){
                                for (k = 0; k < (_member.Model.Object.Tags? _member.Model.Object.Tags.length : 0); k++) {
                                    const tag: any = _member.Model.Object.Tags[k]
                                    
                                    if ((tag.tag_name.toUpperCase()) == _item.Restrictions[j].val.toString().toUpperCase()) {
                                        AntiKeywordMatch = true;
                                    }
                                }
                            }
                        }
                        if (_item.Restrictions[j].type == "antikeyword") {
                            HasModel = true;
                            ModelMatch = true;
                        }
                    }

                    if ((_filter['Ranged'] === false) && (_item.Object.Category === 'ranged')) { return false; }     
                    if ((_filter['Melee'] === false) && (_item.Object.Category === 'melee')) { return false; }     
                    if ((_filter['Armour'] === false) && (_item.Object.Category === 'armour')) { return false; }     
                    if ((_filter['Equipment'] === false) && (_item.Object.Category === 'equipment')) { return false; }   

                    if ((_filter['Glory'] === false) && (_item.CostID === 'glory')) { return false; }
                    if ((_filter['Ducats'] === false) && (_item.CostID === 'ducats')) { return false; }

                    if (HasAntiKeyword) {
                        if (HasModel) {
                            return ModelMatch && !AntiKeywordMatch;
                        } else {
                            return !AntiKeywordMatch;
                        }
                    }
                    if (HasModel) {
                        return ModelMatch;
                    }

                    // ------------------------------------------------------------

                    if ((_filter['Glory'] === false) && (_item.CostID === 'glory')) { return false; }
                    if ((_filter['Ducats'] === false) && (_item.CostID === 'ducats')) { return false; }
                    if (_item.Object) {
                        ItemToCheck = _item.Object;
                    } else {
                        ItemToCheck = _item;
                    }
                } else { return false; }
            } else { ItemToCheck = _item; }

            if ((_filter['Ranged'] === false) && (ItemToCheck.Category === 'ranged')) { return false; }     
            if ((_filter['Melee'] === false) && (ItemToCheck.Category === 'melee')) { return false; }     
            if ((_filter['Armour'] === false) && (ItemToCheck.Category === 'armour')) { return false; }     
            if ((_filter['Equipment'] === false) && (ItemToCheck.Category === 'equipment')) { return false; }            

            return true;
        },
        tossItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband && _member) {
                if (_item.CostType == "ducats") {
                    _warband.DucatLost += _item.Cost
                } else {
                    _warband.GloryLost += _item.Cost
                }
                _manager.DeleteEquipmentFromModel(_item, _member, _warband)
                update()
            }
        },
        sellItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband && _member) {
                if (_item.CostType == "ducats") {
                    _warband.DucatLost += Math.floor(_item.Cost * 0.5)
                    _warband.PayChest += Math.floor(_item.Cost * 0.5)
                } else {
                    _warband.GloryLost += Math.floor(_item.Cost * 0.5)
                }
                _manager.DeleteEquipmentFromModel(_item, _member, _warband)
                update()
            }
        },
        refundItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband && _member) {
                if (_item.CostType == "ducats") {
                    _warband.PayChest += Math.floor(_item.Cost)
                }
                _manager.DeleteEquipmentFromModel(_item, _member, _warband)
                update()
            }
        }

    },
    memberupgrade: {
        title: 'Upgrade This Model',
        returnItemArray (_warband : Warband | null, _member? : WarbandMember | null) {
            if (_member) { return _member.Upgrades; }
            return []
        },
        returnShowSelector (_warband : Warband | null, _member? : WarbandMember | null) {
            return true;
        },
        returnOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null,  _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if ((_filters['Restricted'] === true) && (_warband) && (_member)) {
                const upgradeList: FactionUpgrade[] = [];
                let i = 0;
                for (i = 0; i < _warband.Faction.Models.length; i++) {
                    if (_warband.Faction.Models[i].ID == _member.Model.ID) {
                        let j = 0;
                        for (j = 0; j < _warband.Faction.Models[i].Upgrades.length; j++) {
                            upgradeList.push(_warband.Faction.Models[i].Upgrades[j])
                        }
                        break;
                    }
                }
                return upgradeList.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member))            
            } else { return _manager.Upgrades.filter((value : any) => _this.filterItem(_this, _manager, _warband, value, _filters,  _member)) }
        },
        displayOptions (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filters : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            return (
                <>
                    {(_filters['Restricted'] === true) && <option key={"modeloption"} value={_item.ID}>{_item.Name + " (" + _item.Cost + " " + _item.CostID + ")"+ ((_item.Limit > 0)? " (Limit " + _item.Limit + ")" : "")}</option> } 
                    {(_filters['Restricted'] === false) && <option key={"modeloption"} value={_item.ID}>{_item.Name}</option>}
                </>
            )
        },
        returnFilters () {
            const FilterList : {[_name : string] : boolean} = {}

            FilterList['Restricted'] = true;
            FilterList['Glory'] = true;
            FilterList['Ducats'] = true;

            return FilterList;
        },
        returnItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            return ( <ItemUpgradeDisplay  updater={update} manager={_manager} warband={_warband} member={_member} data={_item} tossitem={_this.tossItem} sellitem={_this.sellItem} refunditem={_this.refundItem}/> )
        },
        returnItemData (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            
            if ((_filter['Restricted'] === true) && (_warband) && (_member)) {
                const tempModel = _manager.GetEquipmentByID(_item)
                let temp : any = null;
                let i = 0;
                for (i = 0; i < _warband.Faction.Models.length; i++) {
                    if (_warband.Faction.Models[i].ID == _member.Model.ID) {
                        let j = 0;
                        for (j = 0; j < _warband.Faction.Models[i].Upgrades.length; j++) {
                            if (_warband.Faction.Models[i].Upgrades[j].ID === _item) {
                                temp = (_warband.Faction.Models[i].Upgrades[j])
                            }
                        }
                        break;
                    }
                }
                return temp;
            } else {
                return _item;
            }
        },
        returnComment (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            if (typeof _item === 'string') { return  ""
            } else if (_warband) {
                let rstrctnlst = "";

                if (_item != null) {
                    if (_item.Limit > 0) {
                        rstrctnlst += "LIMIT: " + _item.Limit;
                        if (_item.Restrictions.length > 0) { rstrctnlst += ", " }
                    }

                    let i = 0;
                    for (i = 0; i < _item.Restrictions.length; i++) {
                        if ( i > 0) { rstrctnlst += ", " }
                        if (_item.Restrictions[i].type == "keyword") {
                            rstrctnlst += _item.Restrictions[i].val.toString().toUpperCase();
                        } else if (_item.Restrictions[i].type == "purchase") {
                            rstrctnlst += (_item.Restrictions[i].val === 'explore')? "Exploration Only" : "";
                        } else if (_item.Restrictions[i].type == "model") {
                            rstrctnlst += (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'models', id: _item.Restrictions[i].val.toString()}})).name
                         } else { rstrctnlst += _item.Restrictions[i].val.toString() }
                    }
                }

                if (rstrctnlst == "") { rstrctnlst = "-" }
                return rstrctnlst;
            }
            return "";
        },
        returnCost (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean}, _member? : WarbandMember | null) {
            
            if (typeof _item === 'string') {
                return {type: 'ducats', value: 0}
            } else { return {type: _item.CostID, value: _item.Cost} }
        },
        addNewItem (_manager : WarbandManager, _warband : Warband | null, itemName : string, close : any, update: any, _cost : ItemCost, _member? : WarbandMember | null) {
            if (_warband && _member) {
                if (_cost.type == "ducats") {
                    _warband.PayChest -= Math.floor(_cost.value)
                }
                const Result = _manager.NewUpgradeForMember(_member, itemName, _cost.value.toString(), _cost.type);
                update()
            }
            close();
        },
        filterItem (_this : EditListType, _manager : WarbandManager, _warband : Warband | null, _item : any, _filter : {[_name : string] : boolean},  _member? : WarbandMember | null) {
            if (_filter['Restricted'] === true) {
                if (_warband && _member) {
                    if ((_filter['Glory'] === false) && (_item.CostID === 'glory')) { return false; }
                    if ((_filter['Ducats'] === false) && (_item.CostID === 'ducats')) { return false; }
                } else { return false; }
            }  

            return true;
        },
        tossItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband && _member) {
                _warband.DucatLost += _item.Cost
                _manager.DeleteUpgradeFromModel(_item, _member, _warband)
                update()
            }
        },
        sellItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband && _member) {
                _warband.DucatLost += Math.floor(_item.Cost * 0.5)
                _warband.PayChest += Math.floor(_item.Cost * 0.5)
                _manager.DeleteUpgradeFromModel(_item, _member, _warband)
                update()
            }
        },
        refundItem (_manager : WarbandManager, _warband : Warband | null, _item : any, update: any, _member? : WarbandMember | null) {
            if (_warband && _member) {
                _warband.PayChest += _item.Cost
                _manager.DeleteUpgradeFromModel(_item, _member, _warband)
                update()
            }
        }

    }
    
}