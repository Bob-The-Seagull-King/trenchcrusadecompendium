import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { containsTag } from '../../../../utility/functions';
import { PlayerFaction } from '../../../../classes/feature/factions/Faction';
import { makestringpresentable } from '../../../../utility/functions'

import AdvancedDescriptionItemDisplay from '../../subcomponents/description/AdvancedDescriptionItemDisplay';
import FactionEquipDisplay from './FactionEquipDisplay';
import FactionModelDisplay from './FactionModelDisplay';
import FactionLorePanel from '../../subcomponents/informationpanel/FactionLorePanel';

const FactionDisplay = (props: any) => {
    const ModelObject: PlayerFaction = props.data

    // Return a list of all Models a faction has available
    function returnModelList() {
        return (
            <>
                <div className="row row-cols-lg-1 row-cols-md-1 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                    {(ModelObject.Models.filter(item => (containsTag(item.Object.Tags, "elite"))).length > 0) &&
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div style={{marginBottom:"-0.25em"}} className="equipgrouptext">{makestringpresentable("ELITE")}</div>
                                </div>
                                <div className="row row-cols-5">
                                    <div className="col-3">
                                        <div className="equiptitle">Name</div>
                                    </div>
                                    <div className="col-2">
                                        <div className="equiptitle">Cost</div>
                                    </div>
                                    <div className="col-1">
                                        <div className="equiptitle">Limit</div>
                                    </div>
                                    <div className="col-3">
                                        <div className="equiptitle">Equipment</div>
                                    </div>
                                    <div className="col-3">
                                        <div className="equiptitle">Upgrades</div>
                                    </div>
                                </div>
                            </div>
                            {ModelObject.Models.filter(item => (containsTag(item.Object.Tags, "elite"))).map((item) => (
                                <div key={"flavourFaction"+(item.ID? item.ID : "")}>
                                    <FactionModelDisplay data={item}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    }
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div style={{marginBottom:"-0.25em"}} className="equipgrouptext">{makestringpresentable("INFANTRY")}</div>
                                </div>
                                <div className="row row-cols-5">
                                    <div className="col-3">
                                        <div className="equiptitle">Name</div>
                                    </div>
                                    <div className="col-2">
                                        <div className="equiptitle">Cost</div>
                                    </div>
                                    <div className="col-1">
                                        <div className="equiptitle">Limit</div>
                                    </div>
                                    <div className="col-3">
                                        <div className="equiptitle">Equipment</div>
                                    </div>
                                    <div className="col-3">
                                        <div className="equiptitle">Upgrades</div>
                                    </div>
                                </div>
                            </div>
                            {ModelObject.Models.filter(item => (!containsTag(item.Object.Tags, "elite"))).map((item) => (
                                <div key={"flavourFaction"+(item.ID? item.ID : "")}>
                                    <FactionModelDisplay data={item}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // Return list of all equipment available to a faction
    function returnEquipList() {
        return (
            <>
                <div className="row row-cols-lg-1 row-cols-md-1 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                    <div className="col">
                        {returnEquipTypeList("ranged")}
                        <div className="verticalspacer"/>
                        {returnEquipTypeList("armour")}
                    </div>
                    <div className="col">
                        {returnEquipTypeList("melee")}
                        <div className="verticalspacer"/>
                        {returnEquipTypeList("equipment")}
                    </div>
                </div>
            </>
        )
    }

    // Return a subset of the equipment available to a faction
    function returnEquipTypeList(type: string) {
        return (
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div style={{marginBottom:"-0.25em"}} className="equipgrouptext">{makestringpresentable(type)}</div>
                    </div>
                    <div className="row row-cols-4">
                    <div className="col-4">
                            <div className="equiptitle">Name</div>
                        </div>
                        <div className="col-2">
                            <div className="equiptitle">Cost</div>
                        </div>
                        <div className="col-3">
                            <div className="equiptitle">Restriction</div>
                        </div>
                        <div className="col-3">
                            <div className="equiptitle">Feature</div>
                        </div>
                    </div>
                </div>
                {ModelObject.Equipment.filter(item => (item.Object.Category == type)).map((item) => (
                    <div key={"flavourFaction"+(item.ID? item.ID : "")}>
                        <FactionEquipDisplay data={item}/>
                    </div>
                ))}
            </div>
        )
    }

    // Return the faction flavour
    function returnFlavour() {
        return (
            <div>
                <FactionLorePanel data={ModelObject}/>
            </div>
        )
    }

    // Return faction rules
    function returnRules() {
        return (
            <>
                {ModelObject.Rules.map((item) => (
                    <div key={"flavourFaction"+(item.Title? item.Title : "")}>
                        <div className="verticalspacer"/> 
                        <div>
                            <div className="separator">{item.Title}</div>
                        </div> 
                        <div>
                            {item.Description.map((descitem) => (
                                <div key={"flavourFaction"+(descitem.Content? descitem.Content : "")}>
                                    <AdvancedDescriptionItemDisplay data={descitem} parent={ModelObject}/>
                                </div>
                            ))}
                        </div>
                        <div className="verticalspacer"/>
                    </div>
                ))}
            </>
        )
    }

    return (
            <div className='modelInternalStructure'>
                <div>
                    {returnFlavour()}
                </div>
                <div className="verticalspacer"/>

                {(ModelObject.Rules.length > 0) &&
                    <>
                        <div>
                            {returnRules()}
                        </div>
                    </>
                }   

                <div>
                    <div className="separator">Equipment</div>
                </div>
                <div>
                    {returnEquipList()}
                </div>
                <div className="verticalspacer"/>    

                <div>
                    <div className="separator">Models</div>
                </div>
                <div>
                    {returnModelList()}
                </div>
                <div className="verticalspacer"/>          
            </div>
    )
}

export default FactionDisplay;