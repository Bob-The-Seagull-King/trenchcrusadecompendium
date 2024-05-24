import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour } from '../../../../utility/functions';
import {PlayerAbility } from "../../../../classes/feature/abilities/Ability";
import {IIconpendiumItemTag} from '../../../../classes/IconpendiumItem'

import TagDisplay from '../../subcomponents/TagDisplay'
import AbilityDescriptionItemDisplay from '../../subcomponents/description/AbilityDescriptionItemDisplay';

const AbilityDisplay = (props: any) => {
    const AbilityObject: PlayerAbility = props.data
    const bannedAbilityTags = ["inflict", "type"]

    function returnDescription() {
        return (
            <div>
                {AbilityObject.Description.map((item) => (
                    <div key={"descriptionDisplay"}>
                        <AbilityDescriptionItemDisplay data={item} parent={AbilityObject}/>
                    </div>
                ))}
            </div>
        )
    }

    function returnTags() {
        const displaytags = sortTagsForDisplay()

        return (
            <div className="tagBox">
                    {displaytags.map((item) => (
                        <div key={"tagDisplay"+item.tag_name+item.val}>
                            <TagDisplay data={item}/>
                        </div>
                    ))}
            </div>
        )
    }

    function sortTagsForDisplay() {
        const tagarray: IIconpendiumItemTag[] = []

        let i = 0;
        for (i = 0; i < (AbilityObject.Tags?.length || 0); i++) {
            if (AbilityObject.Tags != undefined) {
                const temptag: IIconpendiumItemTag = AbilityObject.Tags[i]

                if ((temptag.tag_name == "blast_size") || (temptag.tag_name == "blast_distance")) {
                    temptag.tag_name = "blast"; }

                if (!bannedAbilityTags.includes(temptag.tag_name)) {
                    tagarray.push(temptag);
                }}}
        return tagarray;
    }

    return (
        <div className={'abilityStructure bordermain'+getColour(AbilityObject.Class)}>
            <h1 className={'titleShape title'+getColour(AbilityObject.Class)}>{AbilityObject.Name || ""}</h1>
            <div className='abilityInternalStructure'>
                <div>
                    {returnTags()}
                </div>
                <div className="verticalspacer"/>
                <div>
                    <i>{AbilityObject.Blurb || ""}</i>
                </div> 
                <div className="verticalspacer"/> 
                <div>
                    <div className="separator">&#x27E1;</div>
                </div> 
                <div className="verticalspacer"/>
                <div>
                    {returnDescription()}
                </div>
            </div>
        </div>
    )
}

export default AbilityDisplay;