import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from './resources/routes-constants'
import './resources/styles/_icon.scss'

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
    return (
        <div>
            <Router>
                <SuperHeader/>
                <Routes>
                    <Route path={ROUTES.COMPENDIUM_ROUTE} element={<CompendiumRoute />} />
                    <Route path={ROUTES.TOOLS_ROUTE} element={<ToolsRoute />} />
                    <Route path={ROUTES.HOME_ROUTE} element={<HomeRoute />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RootComponent
