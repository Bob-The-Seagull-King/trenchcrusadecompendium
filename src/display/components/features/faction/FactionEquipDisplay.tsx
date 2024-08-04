import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { FactionEquip } from '../../../../classes/feature/factions/FactionEquip'
import { Requester } from '../../../../factories/Requester'

import GenericHover from '../../../components/generics/GenericHover'
import EquipmentDisplay from '../equipment/EquipmentDisplay'

const FactionEquipDisplay = (props: any) => {

    const ModelEquip: FactionEquip = props.data;

    // Get the name of the equipment item by ID
    function getModelName(md : string) {
        const modelFound = (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'models', id: md}}));
        return modelFound.name;
    }

    // Get a list of features an equipment item has.
    function getFeatureList() {
        let ftrlst = "";

        let i = 0;
        for (i = 0; i < ModelEquip.Features.length; i++) {
            if ( i > 0) { ftrlst += ", " }
            ftrlst += ModelEquip.Features[i].toString().toUpperCase();
        }

        if (ftrlst == "") { ftrlst = "-" }

        return ftrlst;
    }

    // Get a list of restrictions on an equipment item.
    function getRestrictionList() {
        let rstrctnlst = "";

        if (ModelEquip.Limit > 0) {
            rstrctnlst += "LIMIT: " + ModelEquip.Limit;
            if (ModelEquip.Restrictions.length > 0) { rstrctnlst += ", " }
        }

        let i = 0;
        for (i = 0; i < ModelEquip.Restrictions.length; i++) {
            if ( i > 0) { rstrctnlst += ", " }
            if (ModelEquip.Restrictions[i].type == "keyword") {
                rstrctnlst += ModelEquip.Restrictions[i].val.toString().toUpperCase();
            } else if (ModelEquip.Restrictions[i].type == "model") {
                rstrctnlst += getModelName(ModelEquip.Restrictions[i].val.toString());
            } else if (ModelEquip.Restrictions[i].type == "purchase") {
                rstrctnlst += (ModelEquip.Restrictions[i].val === 'explore')? "Exploration Only" : "";
            } else if (ModelEquip.Restrictions[i].type == "antikeyword") {
                rstrctnlst += "Non-" + ModelEquip.Restrictions[i].val.toString().toUpperCase();
            } else {
                rstrctnlst += ModelEquip.Restrictions[i].val.toString()
            }
        }

        if (rstrctnlst == "") { rstrctnlst = "-" }

        return rstrctnlst;
    }

    return (
        <div className="row row-cols-4">
            <div className="col-4">
                <div className="equipbody">
                    <GenericHover titlename={ModelEquip.Object.Name} d_colour={"tc"} d_name={ModelEquip.Object.Name} d_type={""} d_method={() => <EquipmentDisplay data={ModelEquip.Object} />}/>
                    
                </div>
            </div>
            <div className="col-2">
                <div className="equipbody">
                    <div className="equipbody">{ModelEquip.Cost.toString() + " " + ModelEquip.CostID}</div>
                </div>
            </div>
            <div className="col-3">
                <div className="equipbody">
                    <div className="equipbody">{getRestrictionList()}</div>
                </div>
            </div>
            <div className="col-3">
                <div className="equipbody">
                    <div className="equipbody">{getFeatureList()}</div>
                </div>
            </div>
        </div>
    )
}


export default FactionEquipDisplay;