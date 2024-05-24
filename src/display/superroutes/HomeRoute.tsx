import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'
import { useNavigate } from "react-router-dom";

import { AllAbilitiesListPage } from '../../classes/viewmodel/pages/AllAbilitiesListPage'

import logo from '../../resources/images/iconpendium_logo.png'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFistRaised } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

const HomeRoute: React.FC = () => {
    const navigate = useNavigate();

    // Initialize Controller //
    const AbilitiesCollectionController = new AllAbilitiesListPage()    

    function NavigateHome(dir: string) {
        navigate('/' + dir);
    }
    // Return result -----------------------------
    return (
        <div>
            <div className="row justify-content-center m-0 p-0">
                <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 col-12">
                    <div className="row">
                        <img src={logo} style={{maxWidth:"100%"}} />
                    </div>
                    <div className='row'><div className='col'><br/></div></div>
                    <div className="row">
                        <div className="separator"><h3 style={{fontFamily:"Libre Baskerville"}}>Compendium</h3></div>
                    </div>
                    <div className="row">
                        <div className="col row-cols-lg-1 row-cols-md-1 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                            <div className="col">
                                <div className="pageaccessbox bordersubpurple hovermouse" onClick={() => NavigateHome("compendium/abilities/")}>
                                    <FontAwesomeIcon icon={faFistRaised} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        ABILITIES
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="separator"><h3 style={{fontFamily:"Libre Baskerville"}}>Tools</h3></div>
                    </div>
                    <div className="row">
                        <div className="col row-cols-lg-1 row-cols-md-1 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                            <div className="col">
                                <div className="pageaccessbox bordersubpurple hovermouse" onClick={() => NavigateHome("tools/content/")}>
                                    <FontAwesomeIcon icon={faFileLines} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        CONTENT MANAGER
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="separator"></div>
                    </div>
                </div>
            </div>
        </div>
    )
    // -------------------------------------------
}

export default HomeRoute