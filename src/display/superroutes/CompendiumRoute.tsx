import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import { ControllerController } from '../../classes/_high_level_controllers/ControllerController'

import { useGlobalState } from './../../utility/globalstate'
import CompendiumBaseDisplay from '../../display/pages/CompendiumBaseDisplay'
import CompendiumTiledDisplay from '../../display/pages/CompendiumTiledDisplay'
import CompendiumStrictListDisplay from '../../display/pages/CompendiumStrictListDisplay'

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
        <Route path={ROUTES.COMPENDIUM_ABILITY_ROUTE} element={<CompendiumBaseDisplay controller={prop.controller.ModelsCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_EQUIPMENT_ROUTE} element={<CompendiumBaseDisplay controller={prop.controller.EquipmentCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_FACTION_ROUTE} element={<CompendiumBaseDisplay controller={prop.controller.FactionCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_SCENARIO_ROUTE} element={<CompendiumBaseDisplay controller={prop.controller.ScenarioCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_INJURY_ROUTE} element={<CompendiumStrictListDisplay controller={prop.controller.InjuryCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_SKILLS_ROUTE} element={<CompendiumBaseDisplay controller={prop.controller.SkillCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_TABLEREF_ROUTE} element={<CompendiumTiledDisplay controller={prop.controller.TableReferenceCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_RULES_ROUTE} element={<CompendiumTiledDisplay controller={prop.controller.QuickRulesCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_CAMPAIGN_RULES_ROUTE} element={<CompendiumTiledDisplay controller={prop.controller.CampaignRulesCollectionController}/>} />
        <Route path={ROUTES.COMPENDIUM_EXPLORATION_ROUTE} element={<CompendiumBaseDisplay controller={prop.controller.ExplorationCollectionController}/>} />
        </Routes>
        </div>
    )
    // -------------------------------------------
}

export default CompendiumRoute