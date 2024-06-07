import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import WarbandEliteMemberDisplay from '../members/WarbandEliteMemberDisplay';
import WarbandInfantryMemberDisplay from '../members/WarbandInfantryMemberDisplay';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPersonMilitaryRifle } from '@fortawesome/free-solid-svg-icons'
import { FactionModel } from '../../../../../../classes/feature/factions/FactionModel';
import { PlayerModel } from '../../../../../../classes/feature/models/Model';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import WarbandEquipDisplay from './WarbandEquipDisplay';
import WarbandAddEquipDisplay from './WarbandAddEquipDisplay';

const WarbandArmouryDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    // Creation of New warband member ---------------------------

    
    function returnEquipment() {
        return (
            <>
                <div className="row" style={{width:"100%"}}>
                    <div className="col-12">
                        <ResponsiveMasonry columnsCountBreakPoints={{350: 1}} >
                            <Masonry gutter="20px">
                                {returnEquipTypeList("ranged")}
                            </Masonry>
                        </ResponsiveMasonry>
                    </div>
                </div>
                <div className="verticalspacerbig"/>
                <div className="row">
                    <WarbandAddEquipDisplay data={WarbandItem} updater={UpdateFunction} manager={Manager} />
                </div>
            </>
        )
    }
    
    function returnEquipTypeList(type: string) {
        return (
            <div className="col-12" style={{width:"100%"}}>
                {WarbandItem.Armoury.length > 0 &&
                <>
            <div className="row" style={{width:"100%"}}>

                        <div className="col-5">
                            <div className="equiptitle">Name</div>
                        </div>
                        <div className="col-3">
                            <div className="equiptitle">Cost</div>
                        </div>
                        <div className="col-2">
                            <div className="equiptitle">Toss</div>
                        </div>
                        <div className="col-2">
                            <div className="equiptitle">Resell</div>
                        </div>
            </div>
            <div className="row" style={{width:"100%"}}>
                {WarbandItem.Armoury.map((item : any) => (
                    <div key={"flavourFaction"+(item.ID? item.ID : "")}>
                        <WarbandEquipDisplay data={item} warband={WarbandItem} updater={UpdateFunction} manager={Manager} />
                    </div>
                ))}
            </div>
            </>
            }
            </div>
        )
    }



    // ----------------------------------------------------------

    return (
        <>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
        />         
            <div className="row justify-content-center">
                <div className="mediumfonttext" style={{width:"fit-content"}}>
                    Armoury
                </div>
                <div className="verticalspacerbig"/>
            </div>
            <div>
            {returnEquipment()}
            </div>
        </>
    )
}

export default WarbandArmouryDisplay;