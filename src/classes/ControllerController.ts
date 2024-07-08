import { AllModelsListPage } from '../classes/viewmodel/pages/AllModelsListPage'
import { AllEquipmentListPage } from '../classes/viewmodel/pages/AllEquipmentListPage'
import { AllFactionListPage } from '../classes/viewmodel/pages/AllFactionListPage'
import { AllScenarioListPage } from '../classes/viewmodel/pages/AllScenarioListPage'
import { AllInjuriesListPage } from '../classes/viewmodel/pages/AllInjuriesListPage'
import { AllTableReferenceListPage } from '../classes/viewmodel/pages/AllTableReferenceListPage'
import { AllSkillsListPage } from '../classes/viewmodel/pages/AllSkillsListPage'
import { AllQuickRulesPage } from '../classes/viewmodel/pages/AllQuickRulesListPage'


class ControllerController {
   
    ModelsCollectionController;
    EquipmentCollectionController;
    FactionCollectionController;
    ScenarioCollectionController;
    InjuryCollectionController;
    SkillCollectionController;
    TableReferenceCollectionController;
    QuickRulesCollectionController;

    constructor () {

        this.ModelsCollectionController = new AllModelsListPage()
        this.EquipmentCollectionController = new AllEquipmentListPage()
        this.FactionCollectionController = new AllFactionListPage()
        this.ScenarioCollectionController = new AllScenarioListPage()
        this.InjuryCollectionController = new AllInjuriesListPage()
        this.SkillCollectionController = new AllSkillsListPage()
        this.TableReferenceCollectionController = new AllTableReferenceListPage()
        this.QuickRulesCollectionController = new AllQuickRulesPage()
    }

}

export {ControllerController}