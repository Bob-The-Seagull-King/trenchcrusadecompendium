import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';

import { capitalizeString } from '../../../../../utility/functions';
import WarbandItemEditNumberDisplay from './WarbandItemEditNumberDisplay';

const WarbandEditBankDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const type : string = props.type;

    return (
        <>            
            <div className="col-lg-2 col-md-2 col-12 align-content-center" style={{   textAlign:"center"}}>
                <div className="row justify-content-right" style={{height:"fit-content"}}>
                    <div className="mediumsubfonttext" style={{width:"fit-content",height:"fit-content"}}>
                        {capitalizeString(type)}
                    </div>
                </div>
            </div>
            <div className="col d-block d-md-none">
                <div className="verticalspacerbig"/>
            </div>
            <div className="col-lg-5 col-md-5 col-12">
                <WarbandItemEditNumberDisplay manager={Manager} warband={WarbandItem} statictype={type+'total'} updater={UpdateFunction}/>
            </div>    
            <div className="col-lg-5 col-md-5 col-12">
                <WarbandItemEditNumberDisplay manager={Manager} warband={WarbandItem} statictype={type+'lost'} updater={UpdateFunction}/>
            </div>
        </>

    )
}

export default WarbandEditBankDisplay;