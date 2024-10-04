import { byPropertiesOf } from "../../../utility/functions";
import { ViewCollectionsModel } from "./ViewCollectionsModel";
import { ViewTableItem } from "./ViewTableItem";
import { getColour } from "../../../utility/functions";
import { IQuickRule, QuickRule } from "../../feature/rules/QuickRule";
import { EquipmentFactory } from "../../../factories/features/EquipmentFactory";
import { IPlayerEquipment } from "../../feature/equipment/Equipment";
import { IListGroup, ListGroup } from "../../feature/list/ListGroup";
import { PlayerFaction } from "../../feature/factions/Faction";
import { FactionFactory } from "../../../factories/features/FactionFactory";
import { IListItem, ListItem } from "../../feature/list/ListItem";
import { IPlayerModel } from "../../feature/models/Model";
import { ModelFactory } from "../../../factories/features/ModelFactory";
import { Scenario } from "../../feature/scenarios/Scenario";
import { ScenarioFactory } from "../../../factories/features/ScenarioFactory";

export interface CollectionType {
    searchId      : string,
    pageName      : string,
    sort          : string[],
    postSearch: (model : ViewCollectionsModel) => void;
}

export interface CollectionDataTable {[moveid: Lowercase<string>]: CollectionType}

export const CollectionDataDex : CollectionDataTable = {
    campaignrules: {
        searchId: 'campaignrules',
        pageName: 'Campaign Rules',
        sort: ['source', 'name', 'id'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<IQuickRule>(['source', 'name', 'id']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = new QuickRule(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, "tc");
                ItemNew.IsActive = true;
                model.itemcollection.push(ItemNew);
            }
            model.UpdateList();
        }
    },
    equipment: {
        searchId: 'equipment',
        pageName: 'Equipment',
        sort: ['source', 'equip_type', 'name', 'id'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<IPlayerEquipment>(['source', 'name', 'id']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = EquipmentFactory.CreateFactory(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, getColour("tc"));
                model.itemcollection.push(ItemNew);
            }
        }
    },
    exploration: {
        searchId: 'exploration',
        pageName: 'Exploration',
        sort: ['source', 'name', 'id'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<IListGroup>(['source', 'name', 'id']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = new ListGroup(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, "tc");
                model.itemcollection.push(ItemNew);
            }
        }
    },
    faction: {
        searchId: 'faction',
        pageName: 'Faction',
        sort: ['Name'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<PlayerFaction>(['Name']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = FactionFactory.CreateFactory(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, modelNew.Team);
                model.itemcollection.push(ItemNew);
                PlayerFaction.GetVariants(modelNew, model.itemcollection);
            }
        }
    },
    injuries: {
        searchId: 'injuries',
        pageName: 'Injuries',
        sort: ['roll_start','roll_end','source', 'name', 'id'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<IListItem>(['roll_start','roll_end','source', 'name', 'id']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = new ListItem(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, "tc");
                ItemNew.IsActive = true;
                model.itemcollection.push(ItemNew);
            }
            model.UpdateList();
        }
    },
    models: {
        searchId: 'models',
        pageName: 'Models',
        sort: ['name', 'faction_id','variant_id','source', 'id'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<IPlayerModel>(['name', 'faction_id','variant_id','source', 'id']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = ModelFactory.CreateModel(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, getColour(modelNew.Team));
                model.itemcollection.push(ItemNew);
            }
        }
    },
    quickrules: {
        searchId: 'quickrules',
        pageName: 'Rules',
        sort: ['source', 'name', 'id'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<IQuickRule>(['source', 'name', 'id']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = new QuickRule(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, "tc");
                ItemNew.IsActive = true;
                model.itemcollection.push(ItemNew);
            }
            model.UpdateList();
        }
    },
    scenario: {
        searchId: 'scenario',
        pageName: 'Scenario',
        sort: ['Name'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<Scenario>(['Name']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = ScenarioFactory.CreateFactory(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, "tc");
                model.itemcollection.push(ItemNew);
            }
        }
    },
    skills: {
        searchId: 'skillgroup',
        pageName: 'Skills',
        sort: ['source', 'name', 'id'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<IListGroup>(['source', 'name', 'id']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = new ListGroup(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, "tc");
                model.itemcollection.push(ItemNew);
            }
        }
    },
    tablereference: {
        searchId: 'tablechart',
        pageName: 'Tables',
        sort: ['source', 'name', 'id'],
        postSearch (model : ViewCollectionsModel) {
            model.CleanupModels();
            model.CleanupCollection();
            let i = 0;
            model.dataresults.sort(byPropertiesOf<IListGroup>(['source', 'name', 'id']))
            for (i = 0; i < model.dataresults.length; i++) {
                const modelNew = new ListGroup(model.dataresults[i]);
                const ItemNew = new ViewTableItem(modelNew, "tc");
                ItemNew.IsActive = true;
                model.itemcollection.push(ItemNew);
            }
            model.UpdateList();
        }
    }
}