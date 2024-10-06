import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { Warband } from '../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../classes/lists/warbandmanager';
import { useGlobalState } from '../../../../utility/globalstate'
import { ExportDisplayText, ExportDisplayTextBasic } from '../../../../classes/lists/warbandmanagerstatic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

import WarbandFactionEditDisplay from './edit/WarbandEditFactionDisplay';
import { WarbandEditBankDisplay, WarbandEditDucatAndBattleBankDisplay } from './edit/WarbandEditBankDisplay';
import GenericEditListDisplay from './edit/GenericEditListDisplay';
import GenericEditComplexListDisplay from './edit/GenericEditComplexListDisplay';
import GenericEditTextDisplay from './edit/GenericEditTextDisplay';
import GenericEditTextBoxDisplay from './edit/GenericEditTextBoxDisplay';
import GenericPopup from '../../../components/generics/GenericPopup';
import Button from 'react-bootstrap/esm/Button';

const WarbandManageDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const [theme] = useGlobalState('theme');

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(WarbandItem, null, 4)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = WarbandItem.Name + ".json";
    
        link.click();
      };
    
    const navigate = useNavigate();

    function NavigateBack(dir: string) {
        navigate('/' + dir);
    }
    
    function ReturnReturner() {
        return (
            <div className="col-12" >
                <div className="hovermouse iconandtextbox" onClick={() => NavigateBack("tools/warband/")} style={{width:"fit-content"}}>
                    
                    <Button style={{padding:"0em"}} variant="" onClick={() => exportData()}>
                        <FontAwesomeIcon icon={faDownload} className="colortc" style={{fontSize:"2em",margin:"0em"}}/>
                    </Button>
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
                            <WarbandEditDucatAndBattleBankDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager}/>
                        </div>
                        <div className="row">
                            <div className="verticalspacerbig"/>
                            <WarbandEditBankDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} type={'paychest'}/>
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
                        <div className="col-lg-9 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <WarbandFactionEditDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-6" style={{marginTop: "0.5em"}}>
                                    <GenericEditTextDisplay manager={Manager} warband={WarbandItem} statictype={'warbandplayer'} updater={UpdateFunction}/>
                                </div>
                                <div className="col-md-6" style={{marginTop: "0.5em"}}>
                                    <GenericEditTextDisplay manager={Manager} warband={WarbandItem} statictype={'warbandcampaign'} updater={UpdateFunction}/>
                                </div>
                            </div>
                            <div>
                                <div className="verticalspacerbig"/>
                                <div className="separator">&#x27E1;</div>
                            </div>
                            {ReturnBank()}
                            <div className="verticalspacerbig"/>
                        </div>
                        <div className="col-lg-3 col-12">
                            <GenericEditTextDisplay manager={Manager} warband={WarbandItem} statictype={'warbandimage'} updater={UpdateFunction}/> 
                        </div>
                    </div>

                    <div className="verticalspacerbig"/>
                    <div className="separator" style={{fontSize:"3em"}}>&#x27E1;</div>
                    <div className="verticalspacerbig"/>

                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-8 col-12">
                            <div className="verticalspacer"/>
                            <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} statictype={'warbandmember'} updater={UpdateFunction}/>
                            <div className="verticalspacerbig"/>
                            <div className="separator" style={{fontSize:"3em"}}>&#x27E1;</div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="verticalspacer"/>
                            <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} statictype={'warbandequipment'} updater={UpdateFunction}/>
                            <div className="verticalspacerbig"/>
                            <div className="separator" style={{fontSize:"3em"}}>&#x27E1;</div>
                            <div className="verticalspacerbig"/>
                            <GenericEditComplexListDisplay manager={Manager} warband={WarbandItem} statictype={'warbandreservemember'} updater={UpdateFunction}/>
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