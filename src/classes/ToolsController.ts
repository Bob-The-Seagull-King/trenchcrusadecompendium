
import { ContentPackManager } from '../classes/contentpacks/contentmanager'
import { WarbandManager } from '../classes/lists/warbandmanager'
import { ScenarioGenerator } from '../classes/feature/scenarios/ScenarioGenerator'


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