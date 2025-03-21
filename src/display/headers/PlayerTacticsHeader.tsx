import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom'
import { Route, Link, Routes, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { getRouteName } from "../../utility/functions"

import PalleteSwap from './components/PalleteSwap';

const PlayerTacticsHeader = (prop: any) => {
    const navigate = useNavigate();
    function NavigateHome() {
        navigate("/");
    }

    // Return result -----------------------------
    return (
        <>
        <div className='topbarCompendiumBase topbarCompendiumStructure hstack gap-3' style={{justifyContent:"center"}}>
            <span style={{paddingLeft:"0em"}}/>
            <h1 className='headertext'>Trench Crusade</h1>
            <p className='headersubtext'>v1.6.31a</p>
            <div className="vr headertext"></div>
            <Button style={{padding:"0em"}} variant="" onClick={() => NavigateHome()}>
                <FontAwesomeIcon icon={faHouse} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
            </Button>
            <div className="vr headertext"></div>
                <PalleteSwap/>
            <div className="vr headertext"></div>
            <div className="ms-lg-auto ms-md-auto">
                <h1 className="headertext">
                    {getRouteName(useLocation().pathname)}
                </h1>
            </div>
            <span style={{paddingLeft:"0em"}}/>
        </div>
        </>

    )
    // -------------------------------------------
}

export default PlayerTacticsHeader