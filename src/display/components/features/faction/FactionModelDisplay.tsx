import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { PlayerModel } from '../../../../classes/feature/models/Model'
import { FactionModel } from '../../../../classes/feature/factions/FactionModel'
import ModelHover from '../../../components/subcomponents/informationpanel/hovermisc/ModelHover'
import { Requester } from '../../../../factories/Requester'

const FactionModelDisplay = (props: any) => {

    const ModelEquip: FactionModel = props.data;

    function getRestrictionList() {
        let rstrctnlst = "";

        if (ModelEquip.LimitMin == ModelEquip.LimitMax) {
            if (ModelEquip.LimitMax != 0) {
                rstrctnlst = ModelEquip.LimitMax.toString();
            }
        } else {
            rstrctnlst = ModelEquip.LimitMin.toString() + " - " + ModelEquip.LimitMax.toString();
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
                    <ModelHover data={ModelEquip.Object} titlename={ModelEquip.Object.Name} />
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


export default FactionModelDisplay;