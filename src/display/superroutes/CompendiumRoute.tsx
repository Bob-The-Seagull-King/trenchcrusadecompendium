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
import GeneralQuickRules from '../../display/pages/GeneralQuickRules'

import { AllModelsListPage } from '../../classes/viewmodel/pages/AllModelsListPage'
import { AllEquipmentListPage } from '../../classes/viewmodel/pages/AllEquipmentListPage'
import { AllFactionListPage } from '../../classes/viewmodel/pages/AllFactionListPage'
import { AllScenarioListPage } from '../../classes/viewmodel/pages/AllScenarioListPage'
import { AllInjuriesListPage } from '../../classes/viewmodel/pages/AllInjuriesListPage'
import { AllTableReferenceListPage } from '../../classes/viewmodel/pages/AllTableReferenceListPage'
import { AllSkillsListPage } from '../../classes/viewmodel/pages/AllSkillsListPage'
import { AllQuickRulesPage } from '../../classes/viewmodel/pages/AllQuickRulesListPage'
import { ControllerController } from '../../classes/ControllerController'

import { useGlobalState } from './../../utility/globalstate'
import path from 'path'

interface IControllerProp {
    controller : ControllerController;
}

const CompendiumRoute: React.FC<IControllerProp> = (prop) => {


    const [theme, setTheme] = useGlobalState('theme');

    if ((theme == "" ) || (theme == null)) {
        setTheme('light');
    }

    // Return result -----------------------------
    return (
        <div className="backgroundBaseColour" data-theme={theme}>
        <Routes>
        <Route path={ROUTES.COMPENDIUM_ABILITY_ROUTE} element={<PlayerTacticsModels controller={prop.controller.ModelsCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_EQUIPMENT_ROUTE} element={<PlayerTacticsEquipment controller={prop.controller.EquipmentCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_FACTION_ROUTE} element={<PlayerTacticsFaction controller={prop.controller.FactionCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_SCENARIO_ROUTE} element={<GeneralScenarios controller={prop.controller.ScenarioCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_INJURY_ROUTE} element={<GeneralInjuries controller={prop.controller.InjuryCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_SKILLS_ROUTE} element={<GeneralSkills controller={prop.controller.SkillCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_TABLEREF_ROUTE} element={<GeneralTableReferences controller={prop.controller.TableReferenceCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_RULES_ROUTE} element={<GeneralQuickRules controller={prop.controller.QuickRulesCollectionController}/>} />
        </Routes>
        </div>
    )
    // -------------------------------------------
}

export default CompendiumRoute