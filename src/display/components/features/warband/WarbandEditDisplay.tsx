import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Warband } from '../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../classes/lists/warbandmanager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import WarbandNameEditDisplay from './edit/WarbandEditNameDisplay';
import WarbandFactionEditDisplay from './edit/WarbandEditFactionDisplat';
import WarbandEditBankDucatDisplay from './edit/WarbandEditBankDucatDisplay';
import WarbandEditBankGloryDisplay from './edit/WarbandEditBankGloryDisplay';
import WarbandImageEditDisplay from './edit/WarbandEditImageDisplay';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import WarbandMembersDisplay from './edit/members/WarbandMembersDisplay';
import WarbandArmouryDisplay from './edit/armoury/WarbandArmouryDisplay';

const WarbandEditDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    let warbandNotes = WarbandItem.Notes;

    const Warband_Name = WarbandItem? WarbandItem.Name : "";

    
    function returnNotes() {
        return (
            <>
                <InputGroup>
                    <Form.Control as="textarea" style={{height:"10em"}} aria-label="With textarea" defaultValue={warbandNotes} placeholder={"Notes & Information on " + WarbandItem.Name} onChange={e => updateNotes(e.target.value)}/>
                </InputGroup>
            </>
        )
    }

    function updateNotes(_value : string) {
        warbandNotes = _value;
        WarbandItem.Notes = warbandNotes;
    }
    
    function ReturnReturner() {
        return (
            <>
            <div className="col-12" >
                <div className="hovermouse iconandtextbox" onClick={() => UpdateFunction(null)} style={{width:"fit-content"}}>
                    <FontAwesomeIcon icon={faAngleLeft} className="pageaccestextsmall" style={{paddingTop:"0.25em"}}/>
                    <h1 className="pageaccestextsmall">
                        Return
                    </h1>
                </div>
            </div>
            </>
        )
    }
    
    function ReturnPrinter() {
        return (
            <>
            </>
        )
    }
    

    function ReturnName() {
        return (
            <>
                { WarbandItem != null &&
                    <WarbandNameEditDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                }
            </>
        )
    }
    
    function ReturnFaction() {
        return (
            <div className="row">
                <div className="col-12">
                    { WarbandItem != null &&
                        <WarbandFactionEditDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                    }
                </div>
            </div>
        )
    }
    
    function ReturnBank() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row justify-content-center">

                        <div className="mediumfonttext" style={{width:"fit-content"}}>
                            Warband Vault
                        </div>
                        <div className="verticalspacerbig"/>
                    </div>
                    <div className="row">
                        <div className="verticalspacer"/>
                        {ReturnBankDucat()}
                    </div>
                    <div className="row">
                        <div className="verticalspacerbig"/>
                        {ReturnBankGlory()}
                    </div>
                </div>
            </div>
        )
    }
    
    function ReturnBankDucat() {
        return (
            <>
                { WarbandItem != null &&
                    <WarbandEditBankDucatDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                }
            </>
        )
    }
    
    function ReturnBankGlory() {
        return (
            <>
                { WarbandItem != null &&
                    <WarbandEditBankGloryDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                }
            </>
        )
    }
    
    function ReturnImage() {
        return (
            <>
                { WarbandItem != null &&
                    <WarbandImageEditDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                }
            </>
        )
    }
    
    function ReturnMembers() {
        return (
            <>
                { WarbandItem != null &&
                    <WarbandMembersDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                }
            </>
        )
    }
    
    function ReturnArmoury() {
        return (
            <>
                { WarbandItem != null &&
                    <WarbandArmouryDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                }
            </>
        )
    }

    Manager.ExportWarband(WarbandItem, true);

    return (
            <div className="row">
                <div className="col-12">

                    <div className="row">
                            {ReturnReturner()}
                    </div>

                    <div className="row">
                        {ReturnName()}
                    </div>

                    <div className="verticalspacerbig"/>

                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-9 col-12">
                            {ReturnFaction()}
                            <div>
                                <div className="verticalspacerbig"/>
                                <div className="separator">&#x27E1;</div>
                            </div>
                            {ReturnBank()}
                            <div className="verticalspacerbig"/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            {ReturnImage()}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div>
                            <div className="verticalspacerbig"/>
                            <div className="separator">&#x27E1;</div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-8 col-12">
                            {ReturnMembers()}
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            {ReturnArmoury()}                            
                        </div>
                    </div>
                    <div className="verticalspacerbig"/>
                    <div>
                        <div className="separator">&#x27E1;</div>
                    </div> 
                    <div>
                        <div className="verticalspacerbig"/>
                    </div>
                    <div>
                        {returnNotes()}
                    </div>
                    <div>
                        <div className="verticalspacerbig"/>
                    </div>
                    <div>
                        <div className="separator">&#x27E1;</div>
                    </div> 
                    <div>
                        <div className="verticalspacerbig" style={{paddingTop:"2em"}}/>
                    </div>
                </div>
            </div>
    )
}

export default WarbandEditDisplay;