import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React from 'react'

import { FactionUpgrade } from '../../../../../../classes/feature/factions/FactionUpgrade'
import EquipmentHover from '../../../../../components/subcomponents/informationpanel/hovermisc/EquipmentHover'
import UpgradeHover from '../../../../..//components/subcomponents/informationpanel/hovermisc/UpgradeHover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { Warband } from '../../../../../../classes/lists/Warband'
import { WarbandMember } from '../../../../../../classes/lists/WarbandMember'
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager'

const ModelUpgradeDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    const ModelEquip: FactionUpgrade = props.data;

    function tossItem() {
        if (ModelEquip.CostID == "ducats") {
            WarbandItem.DucatLost += ModelEquip.Cost;
        } else {
            WarbandItem.GloryLost += ModelEquip.Cost;
        }
        Manager.DeleteUpgradeFromModel(ModelEquip, WarbandMember, WarbandItem)
        UpdateFunction(WarbandItem)
    }

    function sellItem() {
        Manager.DeleteUpgradeFromModel(ModelEquip, WarbandMember, WarbandItem)
        UpdateFunction(WarbandItem)
    }

    return (
        <div className="row">

            <div className="col-5 align-content-center">
                <div className="equipbody">
                    <UpgradeHover data={ModelEquip} titlename={ModelEquip.Name} />
                </div>
            </div>
            <div className="col-3 align-content-center">
                <div className="equipbody">
                    <div className="equipbody">{ModelEquip.Cost.toString() + " " + ModelEquip.CostID}</div>
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


export default ModelUpgradeDisplay;