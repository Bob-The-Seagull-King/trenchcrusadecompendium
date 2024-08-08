import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { Warband } from '../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../classes/lists/warbandmanager';
import { useGlobalState } from '../../../../utility/globalstate'
import { ExportDisplayText, ExportDisplayTextBasic } from '../../../../classes/lists/warbandmanagerstatic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import WarbandFactionEditDisplay from './edit/WarbandEditFactionDisplay';
import WarbandEditBankDisplay from './edit/WarbandEditBankDisplay';
import GenericEditListDisplay from './edit/GenericEditListDisplay';
import GenericEditComplexListDisplay from './edit/GenericEditComplexListDisplay';
import GenericEditTextDisplay from './edit/GenericEditTextDisplay';
import GenericEditTextBoxDisplay from './edit/GenericEditTextBoxDisplay';
import GenericPopup from '../../../components/generics/GenericPopup';

const WarbandManageDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const [theme] = useGlobalState('theme');
    
    const navigate = useNavigate();

    function NavigateBack(dir: string) {
        navigate('/' + dir);
    }
    
    function ReturnReturner() {
        return (
            <div className="col-12" >
                <div className="hovermouse iconandtextbox" onClick={() => NavigateBack("tools/warband/")} style={{width:"fit-content"}}>
                    <FontAwesomeIcon icon={faAngleLeft} className="pageaccestextsmall" style={{paddingTop:"0.25em"}}/>
                    <h1 className="pageaccestextsmall">
                        Return
                    </h1>
                </div>
            </div>
        )
    }
    
    function ReturnBank() {
        return (
            <div className="row">
                { WarbandItem != null &&
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <div className="mediumfonttext" style={{width:"fit-content"}}>
                                Warband Vault
                            </div>
                            <div className="verticalspacerbig"/>
                        </div>
                        <div className="row">
                            <div className="verticalspacer"/>
                            <WarbandEditBankDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} type={'ducats'}/>
                        </div>
                        <div className="row">
                            <div className="verticalspacerbig"/>
                            <WarbandEditBankDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} type={'glory'}/>
                        </div>
                    </div>
                }   
            </div>
        )
    }

    const modelExport = ExportDisplayText(WarbandItem, true)
    const modelExportBasic = ExportDisplayTextBasic(WarbandItem, true)

    return (
            <div className="row">
                
                { WarbandItem != null &&
                <div className="col-12" key={props.key}>

                    <div className="row">
                        {ReturnReturner()}
                    </div>

                    <div className="row">
                        <GenericEditTextDisplay manager={Manager} warband={WarbandItem} statictype={'warbandname'} updater={UpdateFunction}/> 
                    </div>

                    <div className="verticalspacerbig"/>

                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-9 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <WarbandFactionEditDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                                </div>
                            </div>
                            <div>
                                <div className="verticalspacerbig"/>
                                <div className="separator">&#x27E1;</div>
                            </div>
                            {ReturnBank()}
                            <div className="verticalspacerbig"/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            <GenericEditTextDisplay manager={Manager} warband={WarbandItem} statictype={'warbandimage'} updater={UpdateFunction}/> 
                        </div>
                    </div>

                    <div className="verticalspacerbig"/>
                    <div className="separator" style={{fontSize:"3em"}}>&#x27E1;</div>
                    <div className="verticalspacerbig"/>

                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-8 col-12">
                            <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} statictype={'warbandmember'} updater={UpdateFunction}/> 
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">     
                            <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} statictype={'warbandequipment'} updater={UpdateFunction}/> 
                        </div>
                    </div>

                    <div className="verticalspacerbig"/>
                    <div className="separator" style={{fontSize:"3em"}}>Exploration</div>
                    <div className="verticalspacerbig"/>

                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-12">
                            <GenericEditListDisplay manager={Manager} warband={WarbandItem} statictype={'locations'} updater={UpdateFunction}/> 
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <GenericEditListDisplay manager={Manager} warband={WarbandItem} statictype={'explorationmodifiers'} updater={UpdateFunction}/>                   
                        </div>
                    </div>
                    
                    <div className="verticalspacerbig"/>
                    <div className="separator">&#x27E1;</div>
                    <div className="verticalspacerbig"/>

                    <GenericEditTextBoxDisplay manager={Manager} warband={WarbandItem} statictype={'warbandnotes'} updater={UpdateFunction}/> 

                    <div className="verticalspacerbig"/>
                    <div className="separator">&#x27E1;</div>
                    <div className="verticalspacerbig"/>

                    <div className="row row-cols-md-2 row-cols-1">
                        <div className="col">
                            <GenericPopup d_colour={'tc'} d_type={''} panelname={"exportwarbandbasic"} panelObj={modelExport}/>
                        </div>
                        <div className="col">
                            <GenericPopup d_colour={'tc'} d_type={''} panelname={"exportwarbandexpanded"} panelObj={modelExportBasic}/>
                        </div>
                    </div>

                    <div className="verticalspacerbig"/>
                    <div className="separator">&#x27E1;</div>
                    <div className="verticalspacerbig"/>
                </div>
                }
            </div>
    )
}

export default WarbandManageDisplay;