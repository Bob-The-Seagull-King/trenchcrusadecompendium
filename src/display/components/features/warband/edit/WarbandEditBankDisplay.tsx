import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';

import { capitalizeString } from '../../../../../utility/functions';
import GenericEditNumberDisplay from './GenericEditNumberDisplay';

const WarbandEditBankDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const type : string = props.type;

    return (
        <>
            <div className="col-md-2 align-content-center" style={{textAlign:"center"}}>
                <div className="row justify-content-right" style={{height:"fit-content"}}>
                    <div className="mediumsubfonttext" style={{width:"fit-content",height:"fit-content"}}>
                        {capitalizeString(type)}
                    </div>
                </div>
            </div>
            <div className="col d-block d-md-none">
                <div className="verticalspacerbig"/>
            </div>
            <div className="col-md-5">
                <GenericEditNumberDisplay manager={Manager} warband={WarbandItem} statictype={type+'total'} updater={UpdateFunction}/>
            </div>    
            <div className="col-md-5">
                <GenericEditNumberDisplay manager={Manager} warband={WarbandItem} statictype={type+'lost'} updater={UpdateFunction}/>
            </div>
        </>
    )
}

const WarbandEditBankDisplaySimple = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const type : string = props.type;

    return (
        <>
            <div className="col-md-2 align-content-center" style={{textAlign:"center"}}>
                <div className="row justify-content-right" style={{height:"fit-content"}}>
                    <div className="mediumsubfonttext" style={{width:"fit-content",height:"fit-content"}}>
                        {capitalizeString(type)}
                    </div>
                </div>
            </div>
            <div className="col d-block d-md-none">
                <div className="verticalspacerbig"/>
            </div>
            <div className="col-md-10">
                <GenericEditNumberDisplay manager={Manager} warband={WarbandItem} statictype={type} updater={UpdateFunction}/>
            </div>
        </>
    )
}

export {WarbandEditBankDisplay, WarbandEditBankDisplaySimple};