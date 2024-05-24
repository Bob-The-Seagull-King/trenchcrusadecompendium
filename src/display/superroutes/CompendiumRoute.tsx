import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import PlayerTacticsAbilities from '../../display/pages/PlayerTacticsAbilities'
import { AllAbilitiesListPage } from '../../classes/viewmodel/pages/AllAbilitiesListPage'
import path from 'path'

const CompendiumRoute: React.FC = () => {

    // Initialize Controller //
    const AbilitiesCollectionController = new AllAbilitiesListPage()

    // Return result -----------------------------
    return (
        <Routes>
            <Route path={ROUTES.COMPENDIUM_ABILITY_ROUTE} element={<PlayerTacticsAbilities controller={AbilitiesCollectionController}/>} />
        </Routes>
    )
    // -------------------------------------------
}

export default CompendiumRoute