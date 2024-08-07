import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import { useGlobalState } from './../../utility/globalstate'

import ToolsContentManager from '../../display/pages/ToolsContentManager'
import ToolsWarbandBuilder from '../../display/pages/ToolsWarbandBuilder'
import ToolsScenarioGenerator from '../../display/pages/ToolsScenarioGenerator'

import {ToolsController} from '../../classes/_high_level_controllers/ToolsController'


interface IControllerProp {
    controller : ToolsController;
}

const ToolsRoute: React.FC<IControllerProp> = (prop) => {


    const [theme, setTheme] = useGlobalState('theme');

    if ((theme == "" ) || (theme == null)) {
        setTheme('light');
    }


    // Return result -----------------------------
    return (
        
        <div className="backgroundBaseColour" data-theme={theme}>
        <Routes>
            <Route path={ROUTES.TOOLS_CONTENT_UPLOAD_ROUTE} element={<ToolsContentManager manager={prop.controller.ContentManager}/>} />
            <Route path={ROUTES.TOOLS_WARBAND_BUILDER_ROUTE} element={<ToolsWarbandBuilder manager={prop.controller.ListManager}/>} />
            <Route path={ROUTES.TOOLS_SCENARIO_GENERATOR_ROUTE} element={<ToolsScenarioGenerator manager={prop.controller.ScenarioGen}/>} />
        </Routes>
        </div>
    )
    // -------------------------------------------
}

export default ToolsRoute