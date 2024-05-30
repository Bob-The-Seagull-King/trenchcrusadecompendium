import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour } from '../../../../utility/functions';
import { ListItem } from '../../../../classes/feature/list/ListItem';
import {ITrenchCrusadeItemTag} from '../../../../classes/TrenchCrusadeItem'

import TagDisplay from '../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import ModelStat from '../../subcomponents/description/ModelStat';

const ListItemDisplay = (props: any) => {
    const ModelObject: ListItem = props.data
    const bannedModelTags = ["inflict", "type"]

    function returnDescription() {
        return (
            <div>
                {ModelObject.Description.map((item) => (
                    <div key={"descriptionDisplay"+(item.Content? item.Content : "")}>
                        <ModelDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    function returnRoll() {
        let rstrctnlst = ""
        
        if (ModelObject.RollStart == ModelObject.RollEnd) {
            if (ModelObject.RollEnd != 0) {
                rstrctnlst = ModelObject.RollEnd.toString();
            }
        } else {
            rstrctnlst = ModelObject.RollStart.toString() + " - " + ModelObject.RollEnd.toString();
        }

        if (rstrctnlst == "") {
            rstrctnlst = "-"
        }

        return rstrctnlst;
    }

    return (
        <div className={'modelStructure bordermain'+getColour("purple")}>
            <h1 className={'titleShape title'+getColour("purple")}>{ModelObject.Name || ""}</h1>
            <div className='modelInternalStructure'>
                <div className="row row-cols-3">
                    <div className='col'>
                        {returnRoll()}
                    </div>
                    <div className='col'>
                        {ModelObject.Name}
                    </div>
                    <div className='col'>
                        {returnDescription()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItemDisplay;