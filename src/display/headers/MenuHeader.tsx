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

const MenuHeader = (prop: any) => {


    // Return result -----------------------------
    return (
        <>
        <div className={"floatingButton backgroundtc"}>
            <PalleteSwap/>
        </div>
        </>

    )
    // -------------------------------------------
}

export default MenuHeader