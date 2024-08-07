import 'bootstrap/dist/css/bootstrap.css'
import '../../../resources/styles/_icon.scss'
import React from 'react'

import {capitalizeString} from '../../../utility/functions'
import {ITrenchCrusadeItemTag} from '../../../classes/TrenchCrusadeItem'
import { GlossaryRule, IGlossaryRule } from '../../../classes/feature/glossary/Glossary'
import { Requester } from '../../../factories/Requester'

import GenericHover from '../generics/GenericHover'
import GlossaryDisplay from '../features/glossary/GlossaryDisplay'

const TagDisplay = (props: any) => {
    const tag: ITrenchCrusadeItemTag = props.data
    const name = capitalizeString(tag.tag_name.toString() || "")
    const val =  capitalizeString(tag.val.toString() || "")
    let GlossaryObject: GlossaryRule | null = null;
    const searchResult = Requester.MakeRequest( {searchtype: "id", searchparam: {type: "glossary", id: tag.val}} )
    if (JSON.stringify(searchResult) != "{}") {
        const GlossaryData: IGlossaryRule = searchResult as IGlossaryRule
        GlossaryObject = new GlossaryRule(GlossaryData)
    }

    return (
        <>
        {JSON.stringify(searchResult) == "{}" &&
        <div className="tagItem tagText">
            &#x2b9e; {name} {val}
        </div>}
        {JSON.stringify(searchResult) != "{}" &&
        <div className="tagItem tagText">
            <div style={{display:"flex"}}>&#x2b9e;
                    <GenericHover d_colour={'tc'} d_name={name} titlename={(GlossaryObject)? GlossaryObject.Name : ''} d_type={""} d_method={() => <GlossaryDisplay data={GlossaryObject} />}/>
                </div>
        </div>}
        </>
    )
}

export default TagDisplay;