import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import { useGlobalState } from './../../utility/globalstate'

import ToolsContentManager from '../../display/pages/ToolsContentManager'
import ToolsWarbandBuilder from '../../display/pages/ToolsWarbandBuilder'
import ToolsScenarioGenerator from '../../display/pages/ToolsScenarioGenerator'
import path from 'path'

import { ContentPackManager } from '../../classes/contentpacks/contentmanager'
import { WarbandManager } from '../../classes/lists/warbandmanager'
import { ScenarioGenerator } from '../../classes/feature/scenarios/ScenarioGenerator'

const ToolsRoute: React.FC = () => {


    const [theme, setTheme] = useGlobalState('theme');

    if ((theme == "" ) || (theme == null)) {
        setTheme('light');
    }

    // Initialize Controller //
    const ContentManager = new ContentPackManager;
    const ListManager = new WarbandManager;
    const ScenarioGen = new ScenarioGenerator;

    // Return result -----------------------------
    return (
        
        <div className="backgroundBaseColour" data-theme={theme}>
        <Routes>
            <Route path={ROUTES.TOOLS_CONTENT_UPLOAD_ROUTE} element={<ToolsContentManager manager={ContentManager}/>} />
            <Route path={ROUTES.TOOLS_WARBAND_BUILDER_ROUTE} element={<ToolsWarbandBuilder manager={ListManager}/>} />
            <Route path={ROUTES.TOOLS_SCENARIO_GENERATOR_ROUTE} element={<ToolsScenarioGenerator manager={ScenarioGen}/>} />
        </Routes>
        </div>
    )
    // -------------------------------------------
}

export default ToolsRoute