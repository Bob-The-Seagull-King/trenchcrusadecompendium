import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import PlayerTacticsEquipment from '../../display/pages/PlayerTacticsEquipment'
import PlayerTacticsModels from '../../display/pages/PlayerTacticsModels'
import PlayerTacticsFaction from '../../display/pages/PlayerTacticsFaction'
import { AllModelsListPage } from '../../classes/viewmodel/pages/AllModelsListPage'
import { AllEquipmentListPage } from '../../classes/viewmodel/pages/AllEquipmentListPage'
import { AllFactionListPage } from '../../classes/viewmodel/pages/AllFactionListPage'
import path from 'path'

const CompendiumRoute: React.FC = () => {

    // Initialize Controller //
    const ModelsCollectionController = new AllModelsListPage()
    const EquipmentCollectionController = new AllEquipmentListPage()
    const FactionCollectionController = new AllFactionListPage()

    // Return result -----------------------------
    return (
        <Routes>
        <Route path={ROUTES.COMPENDIUM_ABILITY_ROUTE} element={<PlayerTacticsModels controller={ModelsCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_EQUIPMENT_ROUTE} element={<PlayerTacticsEquipment controller={EquipmentCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_FACTION_ROUTE} element={<PlayerTacticsFaction controller={FactionCollectionController}/>} />
        </Routes>
    )
    // -------------------------------------------
}

export default CompendiumRoute