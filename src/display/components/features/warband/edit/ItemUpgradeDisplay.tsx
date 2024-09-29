import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { Warband } from '../../../../../classes/lists/Warband'
import { WarbandManager } from '../../../../../classes/lists/warbandmanager'
import { WarbandMember } from '../../../../../classes/lists/WarbandMember'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

import GenericPanel from '../../../../components/generics/GenericPanel'
import UpgradeDisplay from '../../equipment/UpgradeDisplay'
import { FactionUpgrade } from '../../../../../classes/feature/factions/FactionUpgrade'

const ItemUpgradeDisplay = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const ModelUpgrade: FactionUpgrade = props.data;

    const TossItem = props.tossitem;
    const SellItem = props.sellitem;
    const RefundItem = props.refunditem;

    return (
        <div className="row" style={{padding:"0.5em"}}>
            <div className="col-6 align-content-center">
                <div className="equipbody">
                    <GenericPanel titlename={ModelUpgrade.Name} d_colour={WarbandMember.Model.Object.Team} d_name={ModelUpgrade.Name} d_type={""} d_method={() => <UpgradeDisplay data={ModelUpgrade} />}/>
                </div>
            </div>
            <div className="col-3 align-content-center">
                <div className="equipbody">
                    <div className="equipbody">{ModelUpgrade.Cost.toString() + " " + ModelUpgrade.CostID}</div>
                </div>
            </div>
            <div className="col-1" style={{padding:"0.5em"}}>
                <>
                            <OverlayTrigger overlay={
                            <Tooltip style={{ width: "30vw" }} className="overcomeTooltip" id="tooltip">
                                <div style={{ width: "30vw" }} className='popupBody'>
                                <div className={'modelStructure borderstyler bordertc'}>
                                    <h1 className={'titleShape titlebody titlestyler backgroundtc'}>
                                        {"Toss"}
                                    </h1>
                                    
                                    <div className='modelInternalStructure'>
                                        <div>
                                        {"Remove this item without getting any money back"}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Tooltip>
                            }>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em"}}   onClick={() => TossItem(Manager, WarbandItem, ModelUpgrade, UpdateFunction, WarbandMember)}>
                                <FontAwesomeIcon icon={faTrash} className="" style={{fontSize:"1em"}}/>
                                </div>
                            </OverlayTrigger>
                        </>
            </div>
            <div className="col-1" style={{padding:"0.5em"}}>
                <>
                            <OverlayTrigger overlay={
                            <Tooltip style={{ width: "30vw" }} className="overcomeTooltip" id="tooltip">
                                <div style={{ width: "30vw" }} className='popupBody'>
                                <div className={'modelStructure borderstyler bordertc'}>
                                    <h1 className={'titleShape titlebody titlestyler backgroundtc'}>
                                        {"Sell"}
                                    </h1>
                                    
                                    <div className='modelInternalStructure'>
                                        <div>
                                        {"Remove this item and gain half of its cost back"}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Tooltip>
                            }>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em"}}   onClick={() => SellItem(Manager, WarbandItem, ModelUpgrade, UpdateFunction, WarbandMember)}>
                            <FontAwesomeIcon icon={faCoins} className="" style={{fontSize:"1em"}}/>
                            </div>
                            </OverlayTrigger>
                        </>
            </div>
            <div className="col-1" style={{padding:"0.5em"}}>
                <>
                            <OverlayTrigger overlay={
                            <Tooltip style={{ width: "30vw" }} className="overcomeTooltip" id="tooltip">
                                <div style={{ width: "30vw" }} className='popupBody'>
                                <div className={'modelStructure borderstyler bordertc'}>
                                    <h1 className={'titleShape titlebody titlestyler backgroundtc'}>
                                        {"Sell"}
                                    </h1>
                                    
                                    <div className='modelInternalStructure'>
                                        <div>
                                        {"Remove this item and gain all its cost back"}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Tooltip>
                            }>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em"}}   onClick={() => RefundItem(Manager, WarbandItem, ModelUpgrade, UpdateFunction, WarbandMember)}>
                            <FontAwesomeIcon icon={faDollarSign} className="" style={{fontSize:"1em"}}/>
                            </div>
                            </OverlayTrigger>
                        </>
            </div>
        </div>
    )
}


export default ItemUpgradeDisplay;