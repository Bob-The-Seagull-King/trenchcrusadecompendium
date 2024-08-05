
import { ContentPackManager } from '../contentpacks/contentmanager'
import { WarbandManager } from '../lists/warbandmanager'
import { ScenarioGenerator } from '../feature/scenarios/ScenarioGenerator'


class ToolsController {
   
    ContentManager;
    ListManager;
    ScenarioGen;

    constructor () {
        this.ContentManager = new ContentPackManager()
        this.ListManager = new WarbandManager()
        this.ScenarioGen = new ScenarioGenerator()
    }

}

export {ToolsController}