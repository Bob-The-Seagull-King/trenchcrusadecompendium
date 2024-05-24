import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import PlayerTacticsModels from '../../display/pages/PlayerTacticsModels'
import { AllModelsListPage } from '../../classes/viewmodel/pages/AllModelsListPage'
import path from 'path'

const CompendiumRoute: React.FC = () => {

    // Initialize Controller //
    const ModelsCollectionController = new AllModelsListPage()

    // Return result -----------------------------
    return (
        <Routes>
            <Route path={ROUTES.COMPENDIUM_ABILITY_ROUTE} element={<PlayerTacticsModels controller={ModelsCollectionController}/>} />
        </Routes>
    )
    // -------------------------------------------
}

export default CompendiumRoute