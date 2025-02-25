import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { ListItem } from '../../../../classes/feature/list/ListItem';
import { returnDescription } from '../../../../utility/util';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'

const ListItemDisplay = (props: any) => {
    const ModelObject: ListItem = props.data

    // Return the formatted roll-requirements
    function returnRoll() {
        let rstrctnlst = ""
        
        if (ModelObject.RollStart == ModelObject.RollEnd) {
            if (ModelObject.RollEnd != 0) {
                rstrctnlst = ModelObject.RollEnd.toString();
            }
        } else { rstrctnlst = ModelObject.RollStart.toString() + " - " + ModelObject.RollEnd.toString(); }

        if (rstrctnlst == "") { rstrctnlst = "-" }

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
                <div className='col-lg-2 col-md-2 col-sm-2 col-xs-3'>
                    <div className="tablename">{ModelObject.Name}</div>
                </div>
                <div className='col-lg-8 col-md-8 col-sm-8 col-xs-6'>
                    {returnDescription(ModelObject, ModelObject.Description)}
                </div>
            </div>
    )
}

export default ListItemDisplay;