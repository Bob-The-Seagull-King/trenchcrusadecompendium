import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React from 'react'

import { ListEquipment } from '../../../../../../classes/lists/ListEquipment'
import { Warband } from '../../../../../../classes/lists/Warband'
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

import GenericHover from '../../../../../components/generics/GenericHover'
import EquipmentDisplay from '../../../../../components/features/equipment/EquipmentDisplay'

const WarbandEquipDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const ModelEquip: ListEquipment = props.data;

    // Remove an item and lose the money spent
    function tossItem() {
        if (ModelEquip.CostType == "ducats") {
            WarbandItem.DucatLost += ModelEquip.Cost;
        } else {
            WarbandItem.GloryLost += ModelEquip.Cost;
        }
        Manager.DeleteEquipmentFromWarband(ModelEquip, WarbandItem)
        UpdateFunction(WarbandItem)
    }

    // Remove an item and get the money spent back 
    function sellItem() {
        Manager.DeleteEquipmentFromWarband(ModelEquip, WarbandItem)
        UpdateFunction(WarbandItem)
    }

    return (
        <div className="row">
            <div className="col-5 align-content-center">
                <div className="equipbody">
                    <GenericHover titlename={ModelEquip.Object.Name} d_colour={"tc"} d_name={ModelEquip.Object.Name} d_type={""} d_method={() => <EquipmentDisplay data={ModelEquip.Object} />}/>
                </div>
            </div>
            <div className="col-3 align-content-center">
                <div className="equipbody">
                    <div className="equipbody">{ModelEquip.Cost.toString() + " " + ModelEquip.CostType}</div>
                </div>
            </div>
            <div className="col-2" style={{padding:"0.5em"}}>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em"}}   onClick={() => tossItem()}>
                    <FontAwesomeIcon icon={faTrash} className="" style={{fontSize:"1em"}}/>
                </div>
            </div>
            <div className="col-2" style={{padding:"0.5em"}}>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em"}}   onClick={() => sellItem()}>
                    <FontAwesomeIcon icon={faCoins} className="" style={{fontSize:"1em"}}/>
                </div>
            </div>
            <div className="verticalspacer"/>
        </div>
    )
}


export default WarbandEquipDisplay;