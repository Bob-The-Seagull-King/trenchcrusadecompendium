import { CollectionsListPage } from "../viewmodel/pages/CollectionsListPage"

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
        this.ModelsCollectionController =  new CollectionsListPage('models')
        this.EquipmentCollectionController = new CollectionsListPage('equipment')
        this.FactionCollectionController = new CollectionsListPage('faction')
        this.ScenarioCollectionController = new CollectionsListPage('scenario')
        this.InjuryCollectionController = new CollectionsListPage('injuries')
        this.SkillCollectionController = new CollectionsListPage('skills')
        this.TableReferenceCollectionController = new CollectionsListPage('tablereference')
        this.QuickRulesCollectionController = new CollectionsListPage('quickrules')
        this.CampaignRulesCollectionController = new CollectionsListPage('campaignrules')
        this.ExplorationCollectionController = new CollectionsListPage('exploration')
    }

}

export {ControllerController}