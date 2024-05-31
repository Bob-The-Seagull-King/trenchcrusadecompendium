import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import PlayerTacticsEquipment from '../../display/pages/PlayerTacticsEquipment'
import PlayerTacticsModels from '../../display/pages/PlayerTacticsModels'
import PlayerTacticsFaction from '../../display/pages/PlayerTacticsFaction'
import GeneralScenarios from '../../display/pages/GeneralScenario'
import GeneralInjuries from '../../display/pages/GeneralInjuries'
import GeneralSkills from '../../display/pages/GeneralSkills'
import GeneralTableReferences from '../../display/pages/GeneralTableReferences'

import { AllModelsListPage } from '../../classes/viewmodel/pages/AllModelsListPage'
import { AllEquipmentListPage } from '../../classes/viewmodel/pages/AllEquipmentListPage'
import { AllFactionListPage } from '../../classes/viewmodel/pages/AllFactionListPage'
import { AllScenarioListPage } from '../../classes/viewmodel/pages/AllScenarioListPage'
import { AllInjuriesListPage } from '../../classes/viewmodel/pages/AllInjuriesListPage'
import { AllTableReferenceListPage } from '../../classes/viewmodel/pages/AllTableReferenceListPage'
import { AllSkillsListPage } from '../../classes/viewmodel/pages/AllSkillsListPage'
import path from 'path'

const CompendiumRoute: React.FC = () => {

    // Initialize Controller //
    const ModelsCollectionController = new AllModelsListPage()
    const EquipmentCollectionController = new AllEquipmentListPage()
    const FactionCollectionController = new AllFactionListPage()
    const ScenarioCollectionController = new AllScenarioListPage()
    const InjuryCollectionController = new AllInjuriesListPage()
    const SkillCollectionController = new AllSkillsListPage()
    const TableReferenceCollectionController = new AllTableReferenceListPage()

    // Return result -----------------------------
    return (
        <Routes>
        <Route path={ROUTES.COMPENDIUM_ABILITY_ROUTE} element={<PlayerTacticsModels controller={ModelsCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_EQUIPMENT_ROUTE} element={<PlayerTacticsEquipment controller={EquipmentCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_FACTION_ROUTE} element={<PlayerTacticsFaction controller={FactionCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_SCENARIO_ROUTE} element={<GeneralScenarios controller={ScenarioCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_INJURY_ROUTE} element={<GeneralInjuries controller={InjuryCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_SKILLS_ROUTE} element={<GeneralSkills controller={SkillCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_TABLEREF_ROUTE} element={<GeneralTableReferences controller={TableReferenceCollectionController}/>} />
        </Routes>
    )
    // -------------------------------------------
}

export default CompendiumRoute