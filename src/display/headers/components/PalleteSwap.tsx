import 'bootstrap/dist/css/bootstrap.css'
import '../../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom'
import { Route, Link, Routes, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { useGlobalState } from '../../../utility/globalstate'

const PalleteSwap = (prop: any) => {

    const [theme, setTheme] = useGlobalState('theme');
    
    function SetPallete(theme: string) {
        localStorage.setItem('theme', theme);
        setTheme(theme)
    }

    function returnCurrentPallete(themeval: string | null) {

        switch (themeval) {
            case "light": {
                return (
                    <>
                        <FontAwesomeIcon icon={faSun} style={{fontSize:"2em",color:"white",margin:"0em"}}/>
                    </>
                )
            }
            case "dark": {
                return (
                    <>
                        <FontAwesomeIcon icon={faMoon} style={{fontSize:"2em",color:"white",margin:"0em"}}/>
                    </>
                )
            }
            default : {
                return (
                    <>
                        <FontAwesomeIcon icon={faSun} style={{fontSize:"2em",color:"white",margin:"0em"}}/>
                    </>
                )
            }
        }
    }
      
    return (
        <Dropdown style={{margin:"0em"}} onSelect={(e,obj) => SetPallete(e? e : "")}>
            <Dropdown.Toggle bsPrefix="dropdownClean" style={{width:"3em"}} id="dropdown-custom-components">
                {returnCurrentPallete(theme)}
            </Dropdown.Toggle>
        
            <Dropdown.Menu>
                <Dropdown.Item eventKey="light" >Light</Dropdown.Item>
                <Dropdown.Item eventKey="dark" >Dark</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      );
}

export default PalleteSwap

