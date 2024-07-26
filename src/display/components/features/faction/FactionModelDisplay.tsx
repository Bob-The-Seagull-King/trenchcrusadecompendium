import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { FactionModel } from '../../../../classes/feature/factions/FactionModel'
import { Requester } from '../../../../factories/Requester'
import { PlayerEquipment } from '../../../../classes/feature/equipment/Equipment'
import { FactionUpgrade } from '../../../../classes/feature/factions/FactionUpgrade'

import GenericHover from '../../../components/generics/GenericHover'
import ModelDisplay from '../models/ModelDisplay'
import UpgradeDisplay from '../../../../display/components/features/equipment/UpgradeDisplay'
import EquipmentDisplay from '../equipment/EquipmentDisplay'

const FactionModelDisplay = (props: any) => {

    const ModelEquip: FactionModel = props.data;
    const EquipmentList : PlayerEquipment[] = [];
    const UpgradeList : FactionUpgrade[] = [];

    function getUpgrades() {
        let i = 0;

        UpgradeList.splice(0);

        for (i = 0; i < ModelEquip.Upgrades.length ; i ++) {
            const newObject = new FactionUpgrade(Requester.MakeRequest({searchtype: "id", searchparam: {type: 'upgrade', id: ModelEquip.Upgrades[i].ID}}));
            UpgradeList.push(newObject);
        }
        return (
            <>
                {UpgradeList.length == 0 &&
                    <span>{"-"}</span>
                }
                {UpgradeList.length > 0 && UpgradeList.map((item) => (
                    <span key={"upgrades" + item.ID}> 
                    <GenericHover titlename={item.Name} d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <UpgradeDisplay data={item} />}/>
                 
                    <span>{", "}</span> 
                    </span>
                ))}
            </>
        )
    }

    function getEquipment() {
        let i = 0;

        EquipmentList.splice(0);

        for (i = 0; i < ModelEquip.Equipment.length ; i ++) {
            const newObject = new PlayerEquipment(Requester.MakeRequest({searchtype: "id", searchparam: {type: 'equipment', id: ModelEquip.Equipment[i]}}));
            EquipmentList.push(newObject);
        }

        return (
            <>
                {EquipmentList.length == 0 &&
                    <span>{"-"}</span>
                }
                {EquipmentList.length > 0 && EquipmentList.map((item) => (
                    <span key={"equipment" + item.ID}> 
                        <GenericHover titlename={item.Name} d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <EquipmentDisplay data={item} />}/>
                    <span>{", "}</span> </span>
                ))}
            </>
        )
    }

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
        <div className="row row-cols-5">

            <div className="col-3">
                <div className="equipbody">
                    <GenericHover titlename={ModelEquip.Object.Name} d_colour={ModelEquip.Object.Team} d_name={ModelEquip.Object.Name} d_type={""} d_method={() => <ModelDisplay data={ModelEquip.Object}/>}/>
                        
                </div>
            </div>
            <div className="col-2">
                <div className="equipbody">
                    <div className="equipbody">{ModelEquip.Cost.toString() + " " + ModelEquip.CostID}</div>
                </div>
            </div>
            <div className="col-1">
                <div className="equipbody">
                    <div className="equipbody">{getRestrictionList()}</div>
                </div>
            </div>
            <div className="col-3">
                <div className="equipbody">
                    <div className="equipbody">{getEquipment()}</div>
                </div>
            </div>
            <div className="col-3">
                <div className="equipbody">
                    <div className="equipbody">{getUpgrades()}</div>
                </div>
            </div>
        </div>
    )
}


export default FactionModelDisplay;