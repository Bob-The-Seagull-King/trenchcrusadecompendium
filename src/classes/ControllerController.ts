import { AllModelsListPage } from '../classes/viewmodel/pages/AllModelsListPage'
import { AllEquipmentListPage } from '../classes/viewmodel/pages/AllEquipmentListPage'
import { AllFactionListPage } from '../classes/viewmodel/pages/AllFactionListPage'
import { AllScenarioListPage } from '../classes/viewmodel/pages/AllScenarioListPage'
import { AllInjuriesListPage } from '../classes/viewmodel/pages/AllInjuriesListPage'
import { AllTableReferenceListPage } from '../classes/viewmodel/pages/AllTableReferenceListPage'
import { AllSkillsListPage } from '../classes/viewmodel/pages/AllSkillsListPage'
import { AllQuickRulesPage } from '../classes/viewmodel/pages/AllQuickRulesListPage'
import { AllExplorationListPage } from './viewmodel/pages/AllExplorationListPage'
import { AllCampaignRulesPage } from './viewmodel/pages/AllCampaignRulesListPage'

/**
 * Holds all controllers at the base level of the
 * website so that state changes don't reset anything.
 */
class ControllerController {
   
    ModelsCollectionController;
    EquipmentCollectionController;
    FactionCollectionController;
    ScenarioCollectionController;
    InjuryCollectionController;
    SkillCollectionController;
    TableReferenceCollectionController;
    QuickRulesCollectionController;
    ExplorationCollectionController;
    CampaignRulesCollectionController;

    constructor () {
        this.ModelsCollectionController = new AllModelsListPage()
        this.EquipmentCollectionController = new AllEquipmentListPage()
        this.FactionCollectionController = new AllFactionListPage()
        this.ScenarioCollectionController = new AllScenarioListPage()
        this.InjuryCollectionController = new AllInjuriesListPage()
        this.SkillCollectionController = new AllSkillsListPage()
        this.TableReferenceCollectionController = new AllTableReferenceListPage()
        this.QuickRulesCollectionController = new AllQuickRulesPage()
        this.CampaignRulesCollectionController = new AllCampaignRulesPage()
        this.ExplorationCollectionController = new AllExplorationListPage()
    }

}

export {ControllerController}