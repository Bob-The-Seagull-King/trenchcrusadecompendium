import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from './resources/routes-constants'
import './resources/styles/_icon.scss'

import { ControllerController } from './classes/_high_level_controllers/ControllerController'
import { ToolsController } from './classes/_high_level_controllers/ToolsController';

/* 
    Major routes are placed here.
    These routes have NO states, and are where the controllers/manager
    objects are created for Main routes.
*/
import HomeRoute from './display/superroutes/HomeRoute'
import CompendiumRoute from './display/superroutes/CompendiumRoute'
import SuperHeader from './display/headers/SuperHeader'
import ToolsRoute from './display/superroutes/ToolsRoute'

const RootComponent: React.FC = () => {

    const mastercontroller = new ControllerController();
    const toolcontroller = new ToolsController();

    return (
        <div>
            <Router>
                <SuperHeader/>
                <Routes>
                    <Route path={ROUTES.COMPENDIUM_ROUTE} element={<CompendiumRoute controller={mastercontroller} />} />
                    <Route path={ROUTES.TOOLS_ROUTE} element={<ToolsRoute controller={toolcontroller} />} />
                    <Route path={ROUTES.HOME_ROUTE} element={<HomeRoute />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RootComponent
