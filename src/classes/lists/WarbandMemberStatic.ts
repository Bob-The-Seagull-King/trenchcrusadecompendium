import { PlayerAddon } from "../feature/addons/Addon";
import { AddonFactory } from "../../factories/features/AddonFactory";
import { getTagValue } from "../../utility/functions";
import { WarbandMember } from "./WarbandMember";

export function returnModelBase(_member : WarbandMember) {
    let str = "";
    let i = 0;

    const BaseCopy  = Object.assign([], _member.Model.Object.Movement);
    const SizeBaseSet = setValuesToTag(_member, BaseCopy, 'sizeset')
    const SizeBase = addValuesToTag(_member, SizeBaseSet, 'size')

    for (i = 0; i < SizeBase.length; i++) {
        if (i !== 0) { str += "x" }
        str += SizeBase[i]
    }
    str += "mm"
    return str;
}

export function returnModelMovement(_member : WarbandMember) {
    let str = "";
    let i = 0;

    const BaseCopy  = Object.assign([], _member.Model.Object.Movement);
    const MovementBaseSet = setValuesToTag(_member, BaseCopy, 'movementset')
    const MovementBase = addValuesToTag(_member, MovementBaseSet, 'movement')

    for (i = 0; i < MovementBase.length; i++) {
        if (i !== 0) {str += " "}
        str += MovementBase + "\""
    }
    if (_member.Model.Object.EventTags["flying"] || doesTagExist(_member, 'flying')) {
        str += " Flying"
    }
    return str;
}

export function returnModelArmour(_member : WarbandMember) {
    let str = "";
    let i = 0;

    const BaseCopy  = Object.assign([], _member.Model.Object.Armour);
    const ArmourBaseSet = setValuesToTag(_member, BaseCopy, 'armourset')
    const ArmourBase = addValuesToTag(_member, ArmourBaseSet, 'armour')

    for (i = 0; i < ArmourBase.length; i++) {
        if (i !== 0) {str += ", "}
        str += ArmourBase[i]
    }
    return str;
}

export function returnModelMelee(_member : WarbandMember) {
    let str = "";
    let i = 0;

    const BaseCopy  = Object.assign([], _member.Model.Object.Melee);
    const MeleeBaseSet = setValuesToTag(_member, BaseCopy, 'meleeset')
    const MeleeBase = addValuesToTag(_member, MeleeBaseSet, 'melee')

    for (i = 0; i < MeleeBase.length; i++) {
        if (i !== 0) {str += ", "}
        str += MeleeBase[i] + " Dice"
    }
    return str;
}

export function returnModelRanged(_member : WarbandMember) {
    let str = "";
    let i = 0;

    const BaseCopy  = Object.assign([], _member.Model.Object.Ranged);
    const RangeBaseSet = setValuesToTag(_member, BaseCopy, 'rangedset')
    const RangedBase = addValuesToTag(_member, RangeBaseSet, 'ranged')

    for (i = 0; i < RangedBase.length; i++) {
        if (i !== 0) {str += ", "}
        str += RangedBase[i] + " Dice"
    }
    return str;
}

export function addValuesToTag(_member : WarbandMember, _array : number[], _tag : string) {
    let i = 0;
    let j = 0;

    const Components = returnComponentsWithTag(_member, _tag);
    const ArrayBase = _array

    for (i = 0; i < Components['addon'].length; i++) {
        for (j = 0; j < ArrayBase.length; j++) { ArrayBase[j] += Components['addon'][i].EventTags[_tag]; } 
    }
    
    for (i = 0; i < Components['upgrade'].length; i++) {
        for (j = 0; j < ArrayBase.length; j++) { ArrayBase[j] += Components['upgrade'][i].EventTags[_tag]; } 
    }
    
    for (i = 0; i < Components['equipment'].length; i++) {
        for (j = 0; j < ArrayBase.length; j++) { ArrayBase[j] += Components['equipment'][i].EventTags[_tag]; } 
    }

    return ArrayBase;
}

export function setValuesToTag(_member : WarbandMember, _array : number[], _tag : string) {
    let i = 0;
    let j = 0;

    const Components = returnComponentsWithTag(_member, _tag);
    const ArrayBase = _array

    for (i = 0; i < Components['addon'].length; i++) {
        for (j = 0; j < ArrayBase.length; j++) { 
            if (Math.abs(ArrayBase[j]) < Math.abs(Components['addon'][i].EventTags[_tag])) {
                ArrayBase[j] = Components['addon'][i].EventTags[_tag];
            } 
        } 
    }
    
    for (i = 0; i < Components['upgrade'].length; i++) {
        for (j = 0; j < ArrayBase.length; j++) { 
            if (Math.abs(ArrayBase[j]) < Math.abs(Components['upgrade'][i].EventTags[_tag])) {
                ArrayBase[j] = Components['upgrade'][i].EventTags[_tag];
            } 
        } 
    }
    
    for (i = 0; i < Components['equipment'].length; i++) {
        for (j = 0; j < ArrayBase.length; j++) { 
            if (Math.abs(ArrayBase[j]) < Math.abs(Components['equipment'][i].EventTags[_tag])) {
                ArrayBase[j] = Components['equipment'][i].EventTags[_tag];
            }
         } 
    }

    return ArrayBase;
}

export function doesTagExist(_member : WarbandMember, _tag : string) {

    const Components = returnComponentsWithTag(_member, _tag);

    if ((Components['addon'].length > 0) || (Components['upgrade'].length > 0) || (Components['equipment'].length > 0)) {
        return true;
    } else {
        return false;
    }
}

export function returnComponentsWithTag(_member : WarbandMember, _tag : string) {
    const componentsReturn : {[_name : string] : any} = {}
    
    let i = 0

    const desc = _member.Model.Object.Abilities;

    const addons = []
    for (i = 0; i < desc.length; i ++) {
        if (getTagValue(desc[i].Tags, "desc_type") === 'addon') {
            const strID = desc[i].Content
            const item : PlayerAddon = AddonFactory.CreateNewAddon((typeof strID === 'string')? strID : "");
            if (item.EventTags[_tag]) { addons.push(item) }
        }
    }

    const upgrades = []
    for (i = 0; i < _member.Upgrades.length; i ++) {
        if (_member.Upgrades[i].EventTags[_tag]) { upgrades.push(_member.Upgrades[i]) }
    }

    const equipment = []
    for (i = 0; i < _member.Equipment.length; i ++) {
        if (_member.Equipment[i].Object.EventTags[_tag]) {
            equipment.push(_member.Equipment[i].Object) }
    }

    componentsReturn['addon'] = addons;
    componentsReturn['upgrade'] = upgrades;
    componentsReturn['equipment'] = equipment;
    
    return componentsReturn;
}