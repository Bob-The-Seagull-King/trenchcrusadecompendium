import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { FactionEquip } from '../../../../classes/feature/factions/FactionEquip'
import EquipmentHover from '../../../components/subcomponents/informationpanel/hovermisc/EquipmentHover'
import { Requester } from '../../../../factories/Requester'

const FactionEquipDisplay = (props: any) => {

    const ModelEquip: FactionEquip = props.data;

    function getModelName(md : string) {
        const modelFound = (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'models', id: md}}));
        return modelFound.name;
    }

    function getRestrictionList() {
        let rstrctnlst = "";

        if (ModelEquip.Limit > 0) {
            rstrctnlst += "LIMIT: " + ModelEquip.Limit;
            if (ModelEquip.Restrictions.length > 0) {
                rstrctnlst += ", "
            }
        }

        let i = 0;
        for (i = 0; i < ModelEquip.Restrictions.length; i++) {
            if ( i > 0) {
                rstrctnlst += ", "
            }
            if (ModelEquip.Restrictions[i].type == "keyword") {
                rstrctnlst += ModelEquip.Restrictions[i].val.toString().toUpperCase();
            } else if (ModelEquip.Restrictions[i].type == "model") {
                rstrctnlst += getModelName(ModelEquip.Restrictions[i].val.toString());
            } else {
                rstrctnlst += ModelEquip.Restrictions[i].val.toString()
            }
        }

        if (rstrctnlst == "") {
            rstrctnlst = "-"
        }

        return rstrctnlst;
    }

    return (
        <div className="row row-cols-3">

            <div className="col-5">
                <div className="equipbody">
                    <EquipmentHover data={ModelEquip.Object} titlename={ModelEquip.Object.Name} />
                </div>
            </div>
            <div className="col-3">
                <div className="equipbody">
                    <div className="equipbody">{ModelEquip.Cost.toString() + " " + ModelEquip.CostID}</div>
                </div>
            </div>
            <div className="col-4">
                <div className="equipbody">
                    <div className="equipbody">{getRestrictionList()}</div>
                </div>
            </div>
        </div>
    )
}


export default FactionEquipDisplay;