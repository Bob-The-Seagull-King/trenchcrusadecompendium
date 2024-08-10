import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { ListEquipment } from '../../../../../classes/lists/ListEquipment'
import { Warband } from '../../../../../classes/lists/Warband'
import { WarbandManager } from '../../../../../classes/lists/warbandmanager'
import { WarbandMember } from '../../../../../classes/lists/WarbandMember'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

import GenericPanel from '../../../../components/generics/GenericPanel'
import EquipmentDisplay from '../../../../components/features/equipment/EquipmentDisplay'

const ItemEquipDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember | null = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const ModelEquip: ListEquipment = props.data;

    const TossItem = props.tossitem;
    const SellItem = props.sellitem;
    const RefundItem = props.refunditem;

    return (
        <div className="row" style={{padding:"0.5em"}}>
            <div className="col-6 align-content-center">
                <div className="equipbody">
                    <GenericPanel titlename={ModelEquip.Object.Name} d_colour={"tc"} d_name={ModelEquip.Object.Name} d_type={""} d_method={() => <EquipmentDisplay data={ModelEquip.Object} />}/>
                </div>
            </div>
            <div className="col-3 align-content-center">
                <div className="equipbody">
                    <div className="equipbody">{ModelEquip.Cost.toString() + " " + ModelEquip.CostType}</div>
                </div>
            </div>
            <div className="col-1" style={{padding:"0.5em"}}>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em"}}   onClick={() => TossItem(Manager, WarbandItem, ModelEquip, UpdateFunction, WarbandMember)}>
                    <FontAwesomeIcon icon={faTrash} className="" style={{fontSize:"1em"}}/>
                </div>
            </div>
            <div className="col-1" style={{padding:"0.5em"}}>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em"}}   onClick={() => SellItem(Manager, WarbandItem, ModelEquip, UpdateFunction, WarbandMember)}>
                    <FontAwesomeIcon icon={faCoins} className="" style={{fontSize:"1em"}}/>
                </div>
            </div>
            <div className="col-1" style={{padding:"0.5em"}}>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em"}}   onClick={() => RefundItem(Manager, WarbandItem, ModelEquip, UpdateFunction, WarbandMember)}>
                    <FontAwesomeIcon icon={faDollarSign} className="" style={{fontSize:"1em"}}/>
                </div>
            </div>
            <div className="verticalspacer"/>
        </div>
    )
}


export default ItemEquipDisplay;