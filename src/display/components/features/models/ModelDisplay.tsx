import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import {PlayerModel } from "../../../../classes/feature/models/Model";
import { returnTags } from '../../../../utility/util';

import AdvancedDescriptionItemDisplay from '../../subcomponents/description/AdvancedDescriptionItemDisplay';
import ItemStat from '../../subcomponents/description/ItemStat';

const ModelDisplay = (props: any) => {
    const ModelObject: PlayerModel = props.data
    const bannedModelTags = ["empty"]

    // Equipment information
    function returnEquipment() {
        return (
            <div>
                {ModelObject.Equipment.map((item) => (
                    <div key={"equipmentDisplay"+(item.Content? item.Content : "")}>
                        <AdvancedDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    // Formatted model statistics
    function returnStats() {
        return (
            <div>
                <div className="row row-cols-lg-5 row-cols-md-5 row-cols-sx-5 row-cols-xs-3 row-cols-3 justify-content-center">
                    <ItemStat title={"Base"} value={ModelObject.Base + "mm"}/>
                    <ItemStat title={"Movement"} value={ModelObject.Movement}/>
                    <ItemStat title={"Armour"} value={ModelObject.Armour}/>
                    <ItemStat title={"Ranged"} value={(ModelObject.Ranged.length > 0)? ModelObject.Ranged + " DICE" : "N/A"}/>
                    <ItemStat title={"Melee"} value={(ModelObject.Melee.length > 0)? ModelObject.Melee + " DICE" : "N/A"}/>
                </div>
            </div>
        )
    }

    // List of a model's abilities
    function returnAbilities() {
        return (
            <div>
                {ModelObject.Abilities.map((item) => (
                    <div key={"abilitiesDisplay"+(item.Content? item.Content : "")}>
                        <AdvancedDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    // Return model lore information
    function returnBlurb() {
        return (
            <div>
                {ModelObject.Blurb.map((item) => (
                    <div key={"blurbdisplay"+(item.Content? item.Content : "")}>
                        <AdvancedDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='modelInternalStructure'>
            <div>
                {returnTags(ModelObject.Tags, bannedModelTags)}
            </div>
            <div className="verticalspacer"/>
            <div>
                {returnBlurb()}
            </div> 
            <div className="verticalspacer"/> 
            <div>
                <div className="separator">&#x27E1;</div>
            </div> 
            
            <div className="verticalspacer"/>
            <div>
                {returnStats()}
            </div>
            <div className="verticalspacer"/>
            <div>
                <div className="separator">&#x27E1;</div>
            </div> 
            
            <div className="verticalspacer"/>
            <div>
                {returnEquipment()}
            </div>
            <div className="verticalspacer"/>
            <div>
                <div className="separator">&#x27E1;</div>
            </div> 
            <div className="verticalspacer"/>
            <div>
                {returnAbilities()}
            </div>
        </div>
    )
}

export default ModelDisplay;