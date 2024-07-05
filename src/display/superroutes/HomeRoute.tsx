import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'
import { useNavigate } from "react-router-dom";

import { AllModelsListPage } from  '../../classes/viewmodel/pages/AllModelsListPage'

import logo from '../../resources/images/trenchcrusade_logo.png'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShapes } from '@fortawesome/free-solid-svg-icons'
import { faPersonRifle } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { faUserInjured } from '@fortawesome/free-solid-svg-icons'
import { faHandFist } from '@fortawesome/free-solid-svg-icons'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { faDice } from '@fortawesome/free-solid-svg-icons'
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

const HomeRoute: React.FC = () => {
    const navigate = useNavigate();

    // Initialize Controller //
    const ModelsCollectionController = new AllModelsListPage()    

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
                        <div className="separator"><h3 >Compendium</h3></div>
                    </div>
                    <div className="row row-cols-lg-2 row-cols-md-2 row-cols-sx-1 row-cols-xs-1 row-cols-1 form-group">
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("compendium/models/")}>
                                    <FontAwesomeIcon icon={faShapes} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        MODELS
                                    </h1>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("compendium/equipment/")}>
                                    <FontAwesomeIcon icon={faPersonRifle} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        EQUIPMENT
                                    </h1>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("compendium/factions/")}>
                                    <FontAwesomeIcon icon={faPeopleGroup} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        FACTIONS
                                    </h1>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("compendium/scenarios/")}>
                                    <FontAwesomeIcon icon={faCrosshairs} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        SCENARIOS
                                    </h1>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("compendium/injuries/")}>
                                    <FontAwesomeIcon icon={faUserInjured} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        INJURIES
                                    </h1>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("compendium/skills/")}>
                                    <FontAwesomeIcon icon={faHandFist} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        SKILLS
                                    </h1>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("compendium/tables/")}>
                                    <FontAwesomeIcon icon={faTable} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        RESULT TABLES
                                    </h1>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("compendium/rules/")}>
                                    <FontAwesomeIcon icon={faScaleBalanced} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        RULES GUIDE
                                    </h1>
                                </div>
                            </div>
                    </div>
                    <div className="row">
                        <div className="separator"><h3 >Tools</h3></div>
                    </div>
                    <div className="row">
                        <div className="col row-cols-lg-1 row-cols-md-1 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("tools/content/")}>
                                    <FontAwesomeIcon icon={faFileLines} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        CONTENT MANAGER
                                    </h1>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("tools/warband/")}>
                                    <FontAwesomeIcon icon={faScrewdriverWrench} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        WARBAND BUILDER
                                    </h1>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="pageaccessbox borderstyler subbordertc hovermouse" onClick={() => NavigateHome("tools/randomscenario/")}>
                                    <FontAwesomeIcon icon={faDice} className="pageaccestext"/>
                                    <h1 className="pageaccestext">
                                        SCENARIO GENERATOR
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
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