import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour } from '../../../../utility/functions';
import { ListItem } from '../../../../classes/feature/list/ListItem';
import {ITrenchCrusadeItemTag} from '../../../../classes/TrenchCrusadeItem'

import TagDisplay from '../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import ModelStat from '../../subcomponents/description/ModelStat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'

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
            <div className="row row-cols-3">
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-3'>
                    <div className="tableresult">
                        <FontAwesomeIcon icon={faDice} style={{paddingTop:"0.25em",paddingRight:"0.25em"}}/>
                        {returnRoll()}
                    </div>
                </div>
                <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3'>
                    <div className="tablename">{ModelObject.Name}</div>
                </div>
                <div className='col-lg-7 col-md-7 col-sm-7 col-xs-6'>
                    {returnDescription()}
                </div>
            </div>
    )
}

export default ListItemDisplay;